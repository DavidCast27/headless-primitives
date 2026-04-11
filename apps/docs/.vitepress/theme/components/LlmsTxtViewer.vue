<template>
  <div class="llms-viewer">
    <div class="llms-toolbar">
      <span class="llms-filename">llms.txt</span>
      <div class="llms-actions">
        <a
          href="https://github.com/DavidCast27/headless-primitives/blob/main/llms.txt"
          target="_blank"
          rel="noopener noreferrer"
          class="llms-btn"
        >
          Ver en GitHub ↗
        </a>
        <button class="llms-btn llms-btn--primary" @click="copy">
          {{ copied ? "¡Copiado!" : "Copiar todo" }}
        </button>
      </div>
    </div>
    <pre class="llms-pre"><code>{{ content }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const copied = ref(false);

const content = `# headless-primitives

> Librería de Web Components headless (sin estilos visuales por defecto) construida con Lit 3 + HeadlessElement. Arquitectura de dos capas CSS: \`base.css\` estructural + paquete \`@styles\` con tokens \`--hp-*\`. Monorepo pnpm con apps de playground y documentación VitePress.

## Arquitectura

- **Stack**: Lit 3, HeadlessElement (extiende LitElement con Light DOM garantizado), TypeScript, Vite, Vitest + happy-dom, pnpm workspaces
- **Sin Shadow DOM**: todos los componentes usan Light DOM. Sin \`static styles\`, sin \`:host\`, sin \`css\` tagged literals.
- **Filosofía headless**: cero estilos visuales en los primitivos. El consumidor aplica sus propios estilos via \`data-state\`, \`data-hp-*\` y atributos ARIA.

## Estructura del monorepo

\`\`\`
packages/vanilla/
  utils/          # @headless-primitives/utils — HeadlessElement, base.css, utilidades
  styles/         # @headless-primitives/styles — tokens --hp-*, CSS por componente
  accordion/      # @headless-primitives/accordion
  avatar/         # @headless-primitives/avatar
  badge/          # @headless-primitives/badge
  breadcrumb/     # @headless-primitives/breadcrumb
  button/         # @headless-primitives/button
  checkbox/       # @headless-primitives/checkbox
  collapsible/    # @headless-primitives/collapsible
  combobox/       # @headless-primitives/combobox
  context-menu/   # @headless-primitives/context-menu
  dialog/         # @headless-primitives/dialog
  drawer/         # @headless-primitives/drawer
  dropdown-menu/  # @headless-primitives/dropdown-menu
  field/          # @headless-primitives/field
  label/          # @headless-primitives/label
  navigation-menu/ # @headless-primitives/navigation-menu
  pin-input/      # @headless-primitives/pin-input
  popover/        # @headless-primitives/popover
  progress/       # @headless-primitives/progress
  radio-group/    # @headless-primitives/radio-group
  select/         # @headless-primitives/select
  separator/      # @headless-primitives/separator
  slider/         # @headless-primitives/slider
  stepper/        # @headless-primitives/stepper
  switch/         # @headless-primitives/switch
  tabs/           # @headless-primitives/tabs
  toast/          # @headless-primitives/toast
  toggle-group/   # @headless-primitives/toggle-group
  tooltip/        # @headless-primitives/tooltip
  tree/           # @headless-primitives/tree

apps/
  playground/     # App de desarrollo con demos interactivos
  docs/           # Documentación VitePress
\`\`\`

## Sistema CSS de dos capas

### Capa 1 — base.css (@headless-primitives/utils)
- Layout estructural, visibilidad, posicionamiento, z-index, animaciones
- Solo usa: currentColor, Canvas, CanvasText, color-mix() — sin colores hardcodeados
- Tokens: --hp-z-index-*, --hp-focus-outline-*, --hp-duration-*, --hp-ease*
- Contiene sección "apariencia mínima" (~línea 203+) como fallback zero-dependency — es intencional

### Capa 2 — @styles (@headless-primitives/styles)
- Colores, sombras, border-radius, tipografía via tokens --hp-*
- Dark mode via theme.css con @media (prefers-color-scheme: dark)
- Cada componente tiene su propio archivo CSS

## Tokens CSS (--hp-*)

\`\`\`css
/* Accent */
--hp-accent, --hp-accent-hover, --hp-accent-active, --hp-accent-foreground

/* Fondos */
--hp-bg, --hp-bg-subtle, --hp-bg-muted, --hp-surface, --hp-surface-raised

/* Bordes */
--hp-border, --hp-border-strong

/* Texto */
--hp-text, --hp-text-secondary, --hp-text-disabled, --hp-text-on-accent
--hp-text-error, --hp-backdrop-bg

/* Radius */
--hp-radius-sm: 4px, --hp-radius: 6px, --hp-radius-md: 8px
--hp-radius-lg: 12px, --hp-radius-full: 9999px

/* Sombras */
--hp-shadow-sm, --hp-shadow, --hp-shadow-md, --hp-shadow-lg

/* Tipografía */
--hp-font-size-xs: 0.75rem, --hp-font-size-sm: 0.875rem
--hp-font-size-base: 1rem, --hp-font-size-lg: 1.125rem
--hp-font-weight-normal: 400, --hp-font-weight-medium: 500
--hp-font-weight-semibold: 600

/* Espaciado */
--hp-space-1: 0.25rem, --hp-space-2: 0.5rem
--hp-space-3: 0.75rem, --hp-space-4: 1rem

/* Transiciones */
--hp-transition-fast: 100ms ease, --hp-transition: 150ms ease
--hp-transition-slow: 200ms ease

/* Z-index */
--hp-z-index-backdrop: 1000, --hp-z-index-overlay-content: 1100
--hp-z-index-popover: 1200, --hp-z-index-tooltip: 1300

/* Misc */
--hp-opacity-disabled: 0.5
--hp-focus-outline-color: #2563eb, --hp-focus-outline-width: 2px
\`\`\`

## Patrón de componente

\`\`\`typescript
import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-mi-componente")
export class HeadlessMiComponente extends HeadlessElement {
  @property({ type: Boolean, reflect: true }) disabled = false;

  // Setter explícito para sync DOM en happy-dom (tests)
  private _value = "";
  @property({ type: String })
  get value() { return this._value; }
  set value(v: string) { this._value = v; this._sync(); }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "mi-componente");
    this._sync();
    requestAnimationFrame(() => this._sync()); // SSR/VitePress safety
  }

  disconnectedCallback() { super.disconnectedCallback(); }

  private _sync() {
    // Actualiza atributos ARIA y data-state síncronamente
  }
}
\`\`\`

## Convenciones

- Custom elements: hp-<nombre> (ej: hp-button, hp-dialog-content)
- Eventos: this.emit("change", detail) → dispara hp-change (prefijo automático)
- IDs únicos: this.hpId (UUID, nunca Math.random())
- Visibilidad: data-state="open|closed" + CSS (nunca style.display para show/hide)
- Inline styles solo para: top, left, transform (posicionamiento computado)

## Data attributes

- [data-hp-panel][data-state] — tabs, accordion, collapsible
- [data-hp-overlay-content][data-state] — dialog, popover, alert
- [data-hp-backdrop][data-state] — backdrop de dialog
- [data-hp-tooltip-content][data-state] — tooltip
- [data-hp-component="<nombre>"] — identificador de componente

## Estructura de archivos por componente

\`\`\`
packages/vanilla/<name>/
├── package.json       # name: @headless-primitives/<name>
├── tsconfig.json      # extends: ../../../tsconfig.base.json
├── vite.config.ts     # library mode + happy-dom
└── src/
    ├── <name>.ts      # implementación
    ├── <name>.test.ts # tests Vitest
    ├── types.ts       # interfaces públicas
    └── index.ts       # solo re-exportaciones
\`\`\`

## Documentación de componente (apps/docs/components/<name>.md)

Estructura estándar:
1. Título + Badge
2. Instalación (pnpm/npm/yarn/bun)
3. Demostración — "Sin estilos (solo base.css)" primero, luego con estilos
4. Anatomía (árbol HTML de etiquetas hp-*)
5. API Reference por custom element
6. Ejemplos de código: <CodeSnippet> con <Flavor only="css">, <Flavor only="tailwind">, <Flavor only="base-css">

## Herramientas de calidad

- Linting: Oxlint (.oxlintrc.json)
- Formatting: Oxfmt
- Testing: Vitest + happy-dom
- Commits: Conventional Commits (feat/fix/chore/docs)
- Changesets para versionado

## Comandos principales

\`\`\`bash
pnpm run docs:dev          # servidor de documentación
pnpm run dev               # playground de desarrollo
pnpm run build             # build de todos los paquetes
pnpm run test              # tests de todos los paquetes
pnpm run lint              # oxlint
pnpm run format            # oxfmt
\`\`\`

## Archivos de referencia

- packages/vanilla/utils/src/base.css — Capa 1 CSS
- packages/vanilla/styles/src/theme.css — Tokens --hp-*
- packages/vanilla/styles/src/index.css — Barrel @styles
- apps/playground/src/style.css — Override dark theme completo
- apps/docs/.vitepress/theme/index.ts — Registro de componentes Vue en docs
- AGENTS.md — Guía completa para agentes IA
- docs/adr/ — Architecture Decision Records`;

function copy() {
  navigator.clipboard.writeText(content).then(() => {
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  });
}
</script>

<style scoped>
.llms-viewer {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  margin: 1.5rem 0;
  font-family: var(--vp-font-family-mono);
}

.llms-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  gap: 0.75rem;
}

.llms-filename {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}

.llms-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.llms-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.3125rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: var(--vp-font-family-base);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  text-decoration: none;
  transition:
    border-color 0.15s,
    color 0.15s,
    background-color 0.15s;
  white-space: nowrap;
}

.llms-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.llms-btn--primary {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}

.llms-btn--primary:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
  color: #fff;
}

.llms-pre {
  margin: 0;
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg);
  overflow-x: auto;
  max-height: 600px;
  overflow-y: auto;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.llms-pre code {
  font-family: var(--vp-font-family-mono);
  background: none;
  padding: 0;
  border-radius: 0;
  font-size: inherit;
  color: inherit;
}
</style>
