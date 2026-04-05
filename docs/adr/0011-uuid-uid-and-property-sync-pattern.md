# ADR 0011 — UUID para IDs únicos y patrón @property + \_sync()

**Estado:** Aceptado  
**Fecha:** 2026-04-05  
**Autores:** Equipo headless-primitives

---

## Contexto

Tras la migración completa a `HeadlessElement` (ADR 0010), surgieron dos decisiones técnicas recurrentes que merecen documentación explícita:

1. **Generación de IDs únicos por instancia** — necesarios para vincular elementos ARIA (`aria-controls`, `aria-labelledby`, `aria-describedby`).
2. **Sincronización del DOM con propiedades reactivas** — cómo actualizar atributos ARIA y `data-state` cuando una propiedad cambia, dado que el entorno de test (happy-dom) no ejecuta el ciclo async de Lit.

---

## Decisión 1: UUID para IDs únicos (`this.hpId`)

### Problema

Cada componente necesita IDs únicos para vincular elementos ARIA. La solución anterior usaba `Math.random().toString(36).slice(2, 9)`, que:

- No garantiza unicidad en colisiones (probabilidad baja pero real).
- No es reproducible ni testeable.
- Duplicaba lógica en cada componente.

### Solución

`HeadlessElement` expone `this.hpId` — un ID único por instancia generado con `uuid` (v4) de la librería `uuid@^13.0.0`, instalada en `@headless-primitives/utils`.

```typescript
// En HeadlessElement
protected readonly hpId = uid(); // uid() llama a uuidv4() internamente

// En cualquier componente
connectedCallback() {
  if (!this.id) this.id = `hp-dialog-content-${this.hpId}`;
}
```

### Por qué `uuid` y no `crypto.randomUUID()`

| Aspecto         | `crypto.randomUUID()`            | `uuid`           |
| --------------- | -------------------------------- | ---------------- |
| Disponibilidad  | Solo HTTPS + Node 19+            | Universal        |
| SSR / VitePress | Puede fallar en algunos entornos | Funciona siempre |
| Bundle size     | 0 KB (nativo)                    | ~1.5 KB          |

La compatibilidad con SSR (VitePress) fue el factor decisivo. `crypto.randomUUID()` no está disponible en todos los contextos de build.

---

## Decisión 2: Patrón `@property` + setter + `_sync()`

### Problema

Lit's `@property` schedula actualizaciones del DOM de forma asíncrona (microtask). Los hooks `updated()` y `willUpdate()` corren después de que Lit resuelve su ciclo reactivo. En happy-dom (el entorno de test del proyecto), este ciclo **no se ejecuta**, lo que hace que los tests síncronos fallen al asignar una propiedad y esperar el DOM inmediatamente.

```typescript
// Esto NO funciona en happy-dom:
progress.value = 50;
expect(progress.getAttribute("aria-valuenow")).toBe("50"); // null ❌
```

### Solución

El patrón establecido en el proyecto combina `@property` (para la observación de atributos HTML y la API pública) con un setter explícito que llama `_sync()` síncronamente:

```typescript
@property({ type: Number })
get value(): number | null { return this._value; }
set value(v: number | null) {
  this._value = v;
  this._sync(); // actualiza el DOM síncronamente
}

private _sync() {
  if (this._value !== null) {
    this.setAttribute("aria-valuenow", String(this._value));
  } else {
    this.removeAttribute("aria-valuenow");
  }
}
```

### Por qué no `updated()` / `willUpdate()`

| Hook               | Cuándo corre                     | Funciona en happy-dom |
| ------------------ | -------------------------------- | --------------------- |
| `updated()`        | Después del ciclo async de Lit   | ❌ No                 |
| `willUpdate()`     | Antes del render, pero aún async | ❌ No                 |
| Setter + `_sync()` | Síncronamente al asignar         | ✅ Sí                 |

### Por qué mantener `@property` si usamos setters

`@property` sigue siendo necesario porque:

1. **Observa atributos HTML**: cuando el HTML tiene `value="50"`, Lit lo convierte a propiedad automáticamente.
2. **Reflexión de atributos**: `reflect: true` mantiene el atributo HTML sincronizado con la propiedad.
3. **API pública tipada**: el decorador documenta la propiedad como parte de la API del componente.

El setter explícito no reemplaza `@property` — lo complementa añadiendo sincronización síncrona del DOM.

### Cuándo NO usar este patrón

Para propiedades que solo afectan al comportamiento interno (no al DOM), `@property` sin setter es suficiente:

```typescript
// Solo afecta comportamiento, no DOM — @property solo es suficiente
@property({ type: Number, attribute: "show-delay" }) showDelay = 300;
```

---

## Consecuencias

### Positivas

- Tests síncronos funcionan correctamente con happy-dom.
- La API pública (`element.value = 50`) actualiza el DOM inmediatamente, igual que en un browser real.
- `@property` sigue gestionando la observación de atributos HTML.

### Negativas / Trade-offs

- Ligera duplicación: el estado vive en `_value` (privado) y el atributo HTML (DOM). Son la misma fuente de verdad pero en dos lugares.
- Si en el futuro se migra a jsdom (que sí ejecuta el ciclo de Lit), el patrón sigue funcionando — no hay regresión.

### Neutras

- El patrón es consistente con cómo accordion, collapsible, switch y otros componentes del proyecto ya manejaban su estado antes de la migración.

---

## Alternativas consideradas

| Alternativa                              | Motivo de rechazo                                                    |
| ---------------------------------------- | -------------------------------------------------------------------- |
| Migrar a jsdom                           | Afecta todos los paquetes; jsdom es más pesado y lento que happy-dom |
| `await element.updateComplete` en tests  | `updateComplete` no resuelve en happy-dom                            |
| `fakeTimers` para microtasks             | Frágil; no garantiza que el ciclo de Lit complete                    |
| Eliminar `@property` y usar solo setters | Pierde la observación automática de atributos HTML                   |
