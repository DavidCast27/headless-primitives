# Plan Maestro de Migración a Lit (v2.5)

Estrategia de ingeniería para la transición de `headless-primitives` a **Lit 3.x**, priorizando la compatibilidad con SSR, estabilidad de eventos y el Light DOM.

## 1. Clase Base: `HeadlessElement` [COMPLETADO]

Unificada en `@headless-primitives/utils` para automatizar comportamientos comunes.

```typescript
import { LitElement } from "lit";
import { uid } from "./index"; // Reutilizar helper existente

export class HeadlessElement extends LitElement {
  // Garantiza Light DOM (ADR 0002)
  override createRenderRoot() {
    return this;
  }

  // Utilidad para emitir eventos con prefijo hp-*
  protected emit(name: string, detail?: any) {
    const event = new CustomEvent(`hp-${name}`, {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
    return event;
  }

  // Gestión de IDs única por instancia
  protected readonly hpId = uid();
}
```

## 2. Guía de Implementación Crítica

### A. SSR y Timing

Para evitar parpadeos y fallos en entornos como VitePress/Astro:

- **Guard de Registro**: Envolver `customElements.define` con una comprobación de entorno. Mantener en `apps/docs` la opción `vue.template.compilerOptions.isCustomElement` para tags `hp-*`.
- **Estado Inicial**: Leer atributos directamente en `connectedCallback` para sincronizar estados internos antes del primer renderizado.
- **Updated**: Realizar efectos secundarios que dependan del DOM en `updated` o `firstUpdated`, nunca en el constructor.

### B. Propiedades y Slots

- Usar `@property({ reflect: true })` para estados visibles (open, disabled, checked).
- Usar `@queryAssignedElements` para obtener listas iniciales y escuchar `slotchange` para reaccionar a cambios dinámicos en contenido proyectado (Tabs, Accordion, RadioGroup, etc.).

### C. Nomenclatura y Datos

Asegurar que el render de Lit inyecte los atributos que `base.css` espera:

- `data-hp-overlay-content`, `data-hp-backdrop`, `data-hp-panel`.
- Estados canónicos: `open/closed`, `checked/unchecked`, `selected/unselected`.
- Marcar el elemento raíz de cada componente con `data-hp-component` para habilitar estilos base (focus ring, display opcional) en `base.css`.

### D. Overlays: ARIA + Foco

- Alternar `aria-hidden` en contenido y `aria-expanded` en el trigger según `data-state`.
- Mantener `aria-controls` del trigger apuntando al ID del contenido.
- Restaurar foco al elemento que lo tenía al cerrar (o al trigger) y bloquear scroll cuando aplique.

## 3. Definition of Done (DoD) Refinada

- [x] **Arquitectura Base**: Clase `HeadlessElement` implementada en `utils`.
- [ ] **Migración Individual**: Extiende de `HeadlessElement` y usa decoradores de Lit.
- [ ] **Zero Runtime Styles**: Prohibido usar `this.style.*` para lógica (excepto cálculos dinámicos de posición como Floating UI).
- [ ] **Compatibilidad**: Mantiene las etiquetas, atributos y eventos actuales.
- [ ] **Eventos**: Los eventos emitidos usan el prefijo `hp-*`.
- [ ] **A11y**: Gestión de foco completa y roles ARIA dinámicos.
- [ ] **Base CSS**: El componente funciona correctamente estructuralmente solo con `base.css`.
- [ ] **Tests**: Los tests validan comportamiento en el DOM, no internals de Lit.
- [ ] **Slots Dinámicos**: Casos `slotchange` cubiertos para alta/ baja de hijos sloteados.
- [ ] **Pure Headless**: Caso en playground que verifica funcionalidad con solo `base.css`.
- [ ] **Mapeo data-hp-\***: Tabla por componente con partes → `data-hp-*`, `data-state`, roles y ARIA.
- [ ] **Docs – Estados y Selectores**: La página `apps/docs/components/[nombre].md` incluye una sección que lista atributos públicos, roles ARIA y todos los selectores `data-hp-*`/`data-state` del componente.
- [ ] **Demos – base.css + transiciones**: Las demos importan `base.css` y muestran snippets de transiciones basadas en `data-state` en dos sabores: `<Flavor only="css">` y `<Flavor only="tailwind">`.

## 4. Pilotos de Migración (Fase 1)

1. **Tabs**: Validación de navegación con roving focus (keyboard nav complex).
2. **Dialog**: Validación de overlays (foco, scroll lock y estados open/closed).

## 5. Empaquetado [INICIADO]

- [x] `lit` declarado como `peerDependency` + `dependency` en `utils`.
- [ ] Replicar configuración de dependencias en cada paquete migrado.
- [ ] Mantener el `library mode` de Vite para generar bundles CJS/ESM limpios.
- [ ] Verificar que las apps consumidoras no bundlean múltiples copias de `lit` y documentar estrategia de dedupe.

## 6. Template de Plan Individual (Ampliado)

```markdown
# Migración: [Nombre del Componente]

## 1. Análisis de Estado Actual

- Propiedades/Atributos: [lista]
- Eventos: [lista]

## 2. Mapa de Estados (State Machine)

- `data-state`: [open | closed | selected | unselected | checked | unchecked]
- Transiciones: [clic -> toggle, esc -> close, etc]

## 3. Especificación ARIA & Teclado

| Elemento | Rol    | Atributos ARIA               | Tecla       | Acción |
| :------- | :----- | :--------------------------- | :---------- | :----- |
| Trigger  | button | aria-expanded, aria-controls | Space/Enter | Toggle |

## 4. Mapeo de Selectores `data-hp-*`

| Parte         | `data-hp-*`                                 | `data-state` | Rol/ARIA                                         |
| :------------ | :------------------------------------------ | :----------- | :----------------------------------------------- | ------------------------------------------- | ----------------------------------- |
| Root          | `data-hp-component`                         | —            | —                                                |
| Trigger       | `data-hp-trigger` (si aplica)               | `open        | closed` (reflejado en trigger via aria-expanded) | `button` + `aria-expanded`, `aria-controls` |
| Panel/Content | `data-hp-panel` / `data-hp-overlay-content` | `open        | closed`o`selected                                | unselected`                                 | `tabpanel`/`dialog` + `aria-hidden` |
| Backdrop      | `data-hp-backdrop`                          | `open        | closed`                                          | `presentation`                              |

## 5. Tareas

1. [ ] Definir `@property` y `@state` (reflect:true donde aplique).
2. [ ] Implementar `render()` con slots y `data-hp-*`.
3. [ ] Sincronizar ARIA + `data-state` en `updated()`.
4. [ ] Manejar `slotchange` para contenido sloteado.
5. [ ] Tests (A11y, teclado, eventos, pure headless).
```
