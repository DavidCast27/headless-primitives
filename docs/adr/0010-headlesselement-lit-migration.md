# ADR 0010 — Migración de Custom Elements a HeadlessElement (Lit)

**Estado:** Aceptado  
**Fecha:** 2026-04-04  
**Autores:** Equipo headless-primitives

---

## Contexto

El proyecto inició con componentes que extendían `HTMLElement` directamente (ADR 0001), aprovechando la API nativa de Custom Elements sin dependencias externas. Esta decisión fue deliberada para mantener la superficie de dependencias mínima en el Tier 1 y Tier 2.

Con el crecimiento del proyecto a 18 componentes, surgieron fricciones repetidas:

1. **Boilerplate de eventos**: Cada componente duplicaba `new CustomEvent("hp-X", { bubbles: true, composed: true, cancelable: true })`.
2. **Gestión de IDs únicos**: Cada componente tenía su propia lógica para generar IDs (`Math.random().toString(36)`).
3. **Sin reactividad declarativa**: Cambios de propiedades requerían lógica manual en `attributeChangedCallback` y `updated`.
4. **Light DOM sin garantía formal**: Cada componente que necesitaba Shadow DOM habría tenido que implementar `createRenderRoot()` manualmente.

La clase `HeadlessElement` ya existía en `@headless-primitives/utils` como solución a estos problemas, pero los tres componentes más complejos (dialog, popover, toast) aún extendían `HTMLElement` directamente.

---

## Decisión

**Migrar todos los 18 componentes para que extiendan `HeadlessElement`** en lugar de `HTMLElement` directamente.

`HeadlessElement` provee:

- **Light DOM garantizado** mediante `createRenderRoot() { return this; }` (consistente con ADR 0002).
- **Método `emit(name, detail?)`**: Elimina el boilerplate de `CustomEvent`. El prefijo `hp-` se añade automáticamente.
- **ID único por instancia** (`this.hpId`) mediante `uid()` de la utilidad compartida.
- **Base LitElement**: Habilita `@property()`, `@state()`, y el ciclo de actualización reactiva para uso futuro.

### Componentes migrados en este ADR

| Componente                        | Extensión anterior | Extensión nueva   | Cambios                                                                                |
| --------------------------------- | ------------------ | ----------------- | -------------------------------------------------------------------------------------- |
| `hp-dialog` y sub-elementos       | `HTMLElement`      | `HeadlessElement` | `super.connectedCallback/disconnectedCallback`, `emit()`                               |
| `hp-popover` y sub-elementos      | `HTMLElement`      | `HeadlessElement` | `super.connectedCallback/disconnectedCallback`, `emit()`                               |
| `hp-toast` y `hp-toast-container` | `HTMLElement`      | `HeadlessElement` | `super.connectedCallback/disconnectedCallback`, `emit()`, añadida dependencia de utils |

Los 15 componentes restantes ya habían sido migrados anteriormente (ver commits `feat: migrate a lot of components`, `feat: migrate tabs component to lit`).

---

## Consecuencias

### Positivas

- **Unificación completa**: Los 18 componentes del proyecto comparten la misma base de clase. El patrón es consistente y predecible.
- **Eliminación de boilerplate**: `this.emit("open")` reemplaza 6 líneas de `new CustomEvent(...)`.
- **IDs únicos centralizados**: `this.hpId` usa `uuid` internamente; no hay más `Math.random().toString(36)`.
- **Preparado para reactividad**: Los componentes pueden adoptar `@property()` y `@state()` sin cambios arquitecturales.
- **Herencia de LitElement lifecycle**: `connectedCallback`, `disconnectedCallback`, `attributeChangedCallback` siguen funcionando; es necesario llamar `super.*` en cada override.

### Negativas / Trade-offs

- **Dependencia en Lit**: Los componentes ahora dependen transitivamente de `lit@^3.3.2`. Esto añade ~13kB (minificado + comprimido) al bundle de un Consumer que no use Lit directamente.  
  _Mitigación_: Lit está en `peerDependencies` para que el Consumer que ya lo use no lo descargue dos veces.
- **Overhead del ciclo de actualización**: LitElement programa micro-updates incluso cuando no hay `render()`. En componentes sin plantilla, el overhead es negligible (< 0.1ms).
- **Ruptura de contrato en sub-clases**: Cualquier componente que override `connectedCallback` debe llamar `super.connectedCallback()`. Esto se documenta como invariante de la clase.

### Neutras

- **Light DOM**: No cambia. `createRenderRoot()` en `HeadlessElement` retorna `this`, por lo que el comportamiento del DOM es idéntico al de `HTMLElement`.
- **Tests existentes**: Los tests de Vitest no requieren modificaciones. Vitest usa `happy-dom` para simular el DOM; los Custom Elements basados en `HeadlessElement` se comportan igual que los de `HTMLElement` en ese entorno.
- **Eventos**: Los consumidores siguen escuchando `hp-open`, `hp-close`, `hp-dismiss`, etc. El método `emit()` garantiza el mismo prefijo, `bubbles: true`, `composed: true` y `cancelable: true`.

---

## Alternativas consideradas

| Alternativa                                              | Motivo de rechazo                                                                 |
| -------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Mantener `HTMLElement` en dialog/popover/toast           | Inconsistencia con el resto de componentes; no hay beneficio de mantenimiento     |
| Migrar solo la emisión de eventos (sin HeadlessElement)  | No resuelve la duplicación de IDs ni prepara para reactividad                     |
| Usar otra librería (Stencil, Lit 3 Reactive Controllers) | Complejidad innecesaria; ya tenemos `HeadlessElement` como abstracción suficiente |

---

## Criterios de "componente migrado"

Un componente se considera migrado cuando:

- [ ] Extiende `HeadlessElement` de `@headless-primitives/utils`.
- [ ] Todos los `connectedCallback/disconnectedCallback` llaman a `super.*`.
- [ ] Los `dispatchEvent(new CustomEvent("hp-X", ...))` se reemplazan por `this.emit("X")`.
- [ ] Los tests existentes pasan sin modificaciones (`vitest run`).
- [ ] `typecheck` pasa sin errores (`tsc --noEmit`).
