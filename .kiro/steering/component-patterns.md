---
inclusion: auto
description: Patrones de HeadlessElement, estructura de archivos, convenciones de nombres, eventos, compatibilidad VitePress y checklist de playground para nuevos componentes.
---

# Patrones de Componentes — headless-primitives

## Stack tecnológico

Lit 3, HeadlessElement, TypeScript, Vite, Vitest (happy-dom), Oxlint/Oxfmt, pnpm workspaces.

## Estructura de archivos de un componente nuevo

```
packages/vanilla/<name>/
├── package.json          # name: @headless-primitives/<name>
│                         # dependencies: @headless-primitives/utils, lit
│                         # peerDependencies: lit
├── tsconfig.json         # extends: ../../../tsconfig.base.json
├── vite.config.ts        # library mode + happy-dom test env
└── src/
    ├── <name>.ts         # implementación con HeadlessElement + @customElement
    ├── <name>.test.ts    # tests (import "./index", type-only imports)
    ├── types.ts          # interfaces y tipos públicos (si aplica)
    └── index.ts          # solo re-exportaciones
```

`index.ts` solo re-exporta. **Nunca** llamar `customElements.define()` manualmente.

## Patrón base de componente

```typescript
import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-<name>")
export class Headless<Name> extends HeadlessElement {
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback(); // SIEMPRE llamar super primero
    this.setAttribute("data-hp-component", "<name>");
    this._sync();
    requestAnimationFrame(() => this._sync()); // seguridad SSR/VitePress
  }

  disconnectedCallback() {
    super.disconnectedCallback(); // SIEMPRE llamar super
  }

  private _sync() {
    // Actualiza atributos ARIA y data-state síncronamente
  }
}
```

## Patrón `@property` + setter + `_sync()` (crítico para tests)

happy-dom no ejecuta el ciclo async de Lit. Para propiedades que deben actualizar el DOM síncronamente:

```typescript
private _value = "";

@property({ type: String })
get value() { return this._value; }
set value(v: string) {
  this._value = v;
  this._sync(); // DOM se actualiza síncronamente
}
```

**No usar** `updated()` ni `willUpdate()` para sincronizar atributos ARIA o `data-state`.

## Eventos, estado y atributos

- **Eventos**: `this.emit("change", { value })` → dispara `hp-change` (prefijo `hp-` automático)
- **IDs únicos**: `this.hpId` (UUID) — nunca usar `Math.random()`
- **Visibilidad**: SIEMPRE usar `data-state="open|closed"` + CSS. NUNCA `style.display`, `style.visibility`, `style.opacity` para show/hide
- **Inline styles permitidos SOLO para**: `top`, `left`, `transform` (valores de posicionamiento computado)

## Convenciones de nombres

| Elemento        | Patrón                               | Ejemplo                                        |
| --------------- | ------------------------------------ | ---------------------------------------------- |
| Custom Elements | `hp-<name>`                          | `hp-button`, `hp-dialog-content`               |
| Eventos         | `hp-<action>`                        | `hp-change`, `hp-open`, `hp-close`             |
| Data attributes | `data-hp-<purpose>`                  | `data-hp-component`, `data-hp-overlay-content` |
| State enum      | `data-state="<enum>"`                | `data-state="open"`, `data-state="on"`         |
| CSS variables   | `--hp-<role>` / `--hp-<comp>-<prop>` | `--hp-accent`, `--hp-button-bg`                |

## Compatibilidad con VitePress

- Llamar `_sync()` síncronamente en `connectedCallback` Y en `requestAnimationFrame` para cubrir SSR
- Usar atributos simples: `value`, `open`, `selected` — evitar `default-value`
- Visibilidad de paneles con `data-state` + CSS, nunca el atributo nativo `hidden`
- En demos Markdown: sin líneas en blanco entre elementos custom dentro de `<div class="hp-demo-card">`

## Componentes compuestos (padre–hijo)

- Cada parte es su propia clase: `HeadlessAccordion`, `HeadlessAccordionItem`, etc.
- Cada parte registra su propio custom element
- Comunicación padre–hijo via custom events
- Exportar todo desde `index.ts`

## Tests — convenciones

```typescript
import "./index";  // CRÍTICO: activa el decorador @customElement
import type { Headless<Name> } from "./<name>"; // import solo de tipo
```

## Playground — checklist al crear componente nuevo

1. Registrar como dependencia en `apps/playground/package.json`
2. Crear `apps/playground/src/demos/<name>.demo.ts`
3. Crear `apps/playground/src/demos/<name>.css`
4. Registrar en `ROUTES` de `apps/playground/src/main.ts`
5. Añadir botón en `apps/playground/index.html`
6. Registrar también en `apps/docs/package.json`

## CSS Custom Properties expuestas por componente (patrón viewport)

Algunos componentes calculan valores dinámicos y los exponen como CSS custom properties en el elemento para que el consumidor pueda usarlos en estilos (ej: efectos de fade). Se establecen con `this.style.setProperty(...)` en el elemento correspondiente.

Ejemplo en `hp-scroll-area-viewport`:

```typescript
this.style.setProperty("--scroll-area-overflow-y-start", `${this.scrollTop}px`);
this.style.setProperty("--scroll-area-overflow-y-end", `${overflowYEnd}px`);
```

Estas variables **no heredan por defecto** (para rendimiento). El consumidor debe declararlas como `inherit` en los hijos que las necesiten.
