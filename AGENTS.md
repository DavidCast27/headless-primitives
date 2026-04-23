# Guía para Agentes de IA en `headless-primitives`

¡Hola, compañero agente IA (Gemini, Claude, Cursor, o cualquier otro)! Al escribir, sugerir o modificar código en este repositorio, DEBES seguir estrictamente las siguientes reglas arquitectónicas y de diseño.

## 1. Base Tecnológica: Lit 3 + HeadlessElement

> **Actualización (ADR 0010, ADR 0011):** El proyecto migró de Vanilla JS puro a **Lit 3** como base para todos los componentes. La clase `HeadlessElement` (en `@headless-primitives/utils`) extiende `LitElement` con Light DOM garantizado y es la única base permitida para nuevos componentes.

- **Todos los componentes extienden `HeadlessElement`**, no `HTMLElement` directamente.
- **Usa `@customElement("hp-nombre")`** del decorador de `@headless-primitives/utils` para registrar el elemento. Este decorador incluye el guard de SSR y la verificación de duplicados — no uses `customElements.define()` manualmente.
- **Usa `@property()` de `lit/decorators.js`** para propiedades reactivas observadas desde atributos HTML.
- **Usa `this.emit("nombre", detail?)`** de `HeadlessElement` para emitir eventos. El prefijo `hp-` se añade automáticamente. No uses `new CustomEvent(...)` directamente.
- **Usa `this.hpId`** para IDs únicos por instancia (basado en `uuid`). No uses `Math.random()`.
- **Sin frameworks de UI:** React, Vue, Svelte, Angular, Astro siguen prohibidos en el código fuente de los primitivos.

### Patrón de un componente nuevo

```typescript
import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-mi-componente")
export class HeadlessMiComponente extends HeadlessElement {
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback(); // SIEMPRE llamar super primero
    this.setAttribute("data-hp-component", "mi-componente");
    this._sync();
    requestAnimationFrame(() => this._sync()); // para SSR/VitePress
  }

  disconnectedCallback() {
    super.disconnectedCallback(); // SIEMPRE llamar super
  }

  private _sync() {
    // Actualiza atributos ARIA y data-state síncronamente
  }
}
```

### Patrón `@property` + setter + `_sync()` (ADR 0011)

happy-dom (entorno de test) no ejecuta el ciclo async de Lit. Para propiedades que deben actualizar el DOM síncronamente, usa setter explícito:

```typescript
private _value: number | null = null;

@property({ type: Number })
get value(): number | null { return this._value; }
set value(v: number | null) {
  this._value = v;
  this._sync(); // DOM se actualiza síncronamente
}
```

**No uses `updated()` ni `willUpdate()`** para sincronizar atributos ARIA o `data-state` — no corren en happy-dom.

### `index.ts` — solo re-exportaciones

```typescript
// CORRECTO — @customElement ya registró el elemento
export { HeadlessMiComponente } from "./mi-componente";

// INCORRECTO — no hagas esto
if (typeof window !== "undefined") {
  customElements.define("hp-mi-componente", HeadlessMiComponente);
}
```

### Tests — importar desde `index.ts`

```typescript
// CORRECTO
import "./index"; // activa el decorador @customElement
import type { HeadlessMiComponente } from "./mi-componente";

// INCORRECTO
import { HeadlessMiComponente } from "./mi-componente";
if (!customElements.get("hp-mi-componente")) customElements.define(...);
```

---

## 2. Web Components y API Headless

- **API Basada en Slots:** Usa `<slot>` para inyección de contenido. No uses patrones de props similares a React.
- **Visibilidad via `data-state`:** Controla visibilidad con `data-state="open|closed"` + CSS. Nunca con `style.display`, `style.visibility`, `style.opacity` o `style.zIndex` para visibilidad.
- **Inline styles permitidos solo para coordenadas:** `style.top`, `style.left` para posicionamiento computado (popover) y `style.top/left/transform` para centrado (dialog) son los únicos casos válidos.

---

## 3. Filosofía 100% "Headless"

- **Sin Estilos visuales:** No introduzcas colores, bordes, sombras ni clases de utilidad (Tailwind) en los componentes.
- Solo son válidos estilos de **comportamiento funcional** (posicionamiento de overlay, layout de container).
- El consumidor aplica sus propios estilos via `data-state`, `data-hp-*` y atributos ARIA.

---

## 4. Accesibilidad (a11y) ante todo

- Añade y manipula correctamente los atributos `aria-*` según los estándares W3C.
- Agrega atributos `role` apropiados.
- Implementa manejo estricto del foco (Focus Management) en modales, popovers y menús.
- Implementa navegación completa por teclado (Tab, Esc, Enter, Espacio, flechas).

---

## 5. Diseño de API y Estado

- Los componentes se controlan mediante **atributos HTML** (`@property` con `reflect: true`) y **propiedades/métodos JS**.
- Prefijo `hp-` para etiquetas de custom elements: `<hp-dialog>`, `<hp-popover>`, etc.
- Prefijo `hp-` para eventos personalizados: `hp-change`, `hp-open`, `hp-close`, `hp-dismiss`.
- Emite eventos con `this.emit("nombre", detail)` — nunca con `new CustomEvent("hp-nombre", ...)`.

---

## 6. Documentación y Registro de Decisiones (ADR)

- **Architecture Decision Records:** Cada decisión de diseño profundo, arquitectura o cambio tecnológico importante **DEBE** documentarse en `docs/adr/` con el formato `[numero-secuencial]-[nombre-decision].md`.
- **Documentación del Componente:** Cada componente nuevo **DEBE** tener su página en `apps/docs/components/[nombre].md` siguiendo el **Estándar Premium v2** ([ADR 0012](docs/adr/0012-premium-documentation-template-v2.md)):
  - **Identidad**: Badge "Nuevo" y guía de instalación con bloque multi-gestor (pnpm...).
  - **Features**: Lista rápida destacando teclado, accesibilidad, etc.
  - **Demos y Code Flavors**: Demo principal y código CSS/Tailwind.
  - **Anatomía**: Snippet único en bloque de HTML con el árbol de etiquetas `hp-*`.
  - **API Reference**: Una subsección `### \`hp-parte\`` por cada custom element.
  - **Accesibilidad**: Tabla interactiva de teclas.

---

## 7. Playground-Driven Development

Ningún primitivo puede darse por concluido sin integrarse al `apps/playground` ([ADR 0007](docs/adr/0007-modular-playground-architecture.md)):

1. Registrar como dependencia en `apps/playground/package.json`.
2. Crear `apps/playground/src/demos/[nombre].demo.ts`.
3. Crear `apps/playground/src/demos/[nombre].css` e importarlo en la demo.
4. Registrar en el objeto `ROUTES` de `apps/playground/src/main.ts`.
5. Añadir botón de navegación en `apps/playground/index.html`.

---

## 8. Calidad de Código

- **Linting:** Usamos **Oxlint** (no ESLint). Configuración en `.oxlintrc.json`.
- **Formatting:** Usamos **Oxfmt** (no Prettier). Ejecuta `pnpm run format` antes de hacer commit.
- **Testing:** Todo componente **DEBE** tener `[nombre].test.ts` con Vitest + happy-dom cubriendo: atributos ARIA, estados disabled, interacción con teclado y eventos custom.
- **Commits:** Seguimos **Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:`). Commitlint los valida automáticamente.

---

## 9. Estructura de un Nuevo Componente

```
packages/vanilla/mi-componente/
├── package.json          # name: @headless-primitives/mi-componente
│                         # dependencies: @headless-primitives/utils, lit
│                         # peerDependencies: lit
├── tsconfig.json         # extends: ../../../tsconfig.base.json
├── vite.config.ts        # Library mode + happy-dom test env
└── src/
    ├── mi-componente.ts  # Implementación con HeadlessElement + @customElement
    ├── mi-componente.test.ts  # Tests (import "./index", type-only imports)
    ├── types.ts          # Interfaces y tipos (si aplica)
    └── index.ts          # Solo re-exportaciones (sin customElements.define)
```

**`package.json` mínimo:**

```json
{
  "dependencies": {
    "@headless-primitives/utils": "workspace:*",
    "lit": "^3.3.2"
  },
  "peerDependencies": {
    "lit": "^3.3.2"
  }
}
```

---

## 10. Lecciones Aprendidas: Compatibilidad con VitePress

### Inicialización del componente raíz

Llama `_sync()` síncronamente en `connectedCallback` **y** en un `requestAnimationFrame` para cubrir el caso SSR/VitePress donde los hijos pueden llegar después del padre:

```typescript
connectedCallback() {
  super.connectedCallback();
  this._sync();
  requestAnimationFrame(() => this._sync());
}
```

**Nunca uses** `Promise.resolve().then()` — en VitePress/Vue la hydration puede no ejecutar la microtask en el momento correcto.

### Nombres de atributos

- Usa atributos simples: `value`, `open`, `selected`.
- Evita `default-value` — VitePress puede ignorar atributos desconocidos durante SSR.

### Visibilidad de paneles/contenido

Usa `data-state` + CSS, nunca el atributo nativo `hidden`:

```css
hp-tab-panel[data-state="unselected"] {
  display: none;
}
```

### Demos en Markdown de VitePress

- Sin líneas en blanco entre elementos custom dentro de `<div class="hp-demo-card">`.
- Contenido en una sola línea cuando sea posible.
- Usa variables CSS de VitePress: `--vp-c-divider`, `--vp-c-brand-1`, etc.
- Declara `display: block` para todos los custom elements en el `<style>` local.

### Configuración de VitePress

El archivo `apps/docs/.vitepress/config.ts` debe tener:

```typescript
export default defineConfig({
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith("hp-"),
      },
    },
  },
});
```

---

## ADRs de referencia

| ADR                                                         | Decisión                                          |
| ----------------------------------------------------------- | ------------------------------------------------- |
| [0001](docs/adr/0001-vanilla-vs-lit.md)                     | Contexto histórico: por qué se empezó con Vanilla |
| [0002](docs/adr/0002-light-dom-vs-shadow-dom.md)            | Light DOM sobre Shadow DOM                        |
| [0010](docs/adr/0010-headlesselement-lit-migration.md)      | Migración completa a HeadlessElement + Lit        |
| [0011](docs/adr/0011-uuid-uid-and-property-sync-pattern.md) | UUID para IDs y patrón @property + \_sync()       |
