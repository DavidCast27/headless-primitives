# Navigation Menu

<span class="hp-badge">Nuevo</span>

El componente `hp-navigation-menu` implementa el patrón WAI-ARIA Navigation Landmark. Proporciona una barra de navegación horizontal donde algunos ítems despliegan un panel flotante (flyout), con soporte para hover intent, teclado completo y gestión de estado en el elemento raíz.

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/navigation-menu
```

```bash [npm]
npm install @headless-primitives/navigation-menu
```

```bash [yarn]
yarn add @headless-primitives/navigation-menu
```

```bash [bun]
bun add @headless-primitives/navigation-menu
```

:::

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-navigation-menu` usando únicamente `@headless-primitives/utils/base.css`. El comportamiento (hover intent, teclado, ARIA) funciona completamente sin ningún estilo visual adicional.

<div class="hp-demo-card" style="overflow:visible;align-items:flex-start;min-height:220px;">
<hp-navigation-menu class="nmb-nav" aria-label="Demo sin estilos">
<hp-navigation-menu-list class="nmb-list">
<hp-navigation-menu-item value="productos" class="nmb-item">
<hp-navigation-menu-trigger class="nmb-trigger">Productos ▾</hp-navigation-menu-trigger>
<hp-navigation-menu-content class="nmb-content">
<a href="." class="nmb-link"><strong class="nmb-link-title">Button</strong><span class="nmb-link-desc">Accesible con variantes y estados.</span></a>
<a href="." class="nmb-link"><strong class="nmb-link-title">Checkbox</strong><span class="nmb-link-desc">Tri-state con indeterminate.</span></a>
<a href="." class="nmb-link"><strong class="nmb-link-title">Select</strong><span class="nmb-link-desc">Selector con búsqueda integrada.</span></a>
</hp-navigation-menu-content>
</hp-navigation-menu-item>
<hp-navigation-menu-item value="docs" class="nmb-item">
<hp-navigation-menu-trigger class="nmb-trigger">Docs ▾</hp-navigation-menu-trigger>
<hp-navigation-menu-content class="nmb-content">
<a href="." class="nmb-link"><strong class="nmb-link-title">Quick Start</strong><span class="nmb-link-desc">Empieza en menos de 5 minutos.</span></a>
<a href="." class="nmb-link"><strong class="nmb-link-title">API Reference</strong><span class="nmb-link-desc">Propiedades, eventos y slots.</span></a>
</hp-navigation-menu-content>
</hp-navigation-menu-item>
<hp-navigation-menu-item class="nmb-item">
<hp-navigation-menu-link class="nmb-trigger" active>Blog</hp-navigation-menu-link>
</hp-navigation-menu-item>
</hp-navigation-menu-list>
<hp-navigation-menu-indicator class="nmb-indicator"></hp-navigation-menu-indicator>
</hp-navigation-menu>
</div>

<style>
.nmb-nav { position: relative; display: block; }
.nmb-list { display: flex !important; flex-direction: row; align-items: center; gap: 0.25rem; list-style: none !important; padding: 0 !important; margin: 0 !important; }
.nmb-item { position: static; }
.nmb-trigger { display: inline-flex; align-items: center; gap: 0.25rem; padding: 0.5rem 0.875rem; font: inherit; font-size: 0.875rem; font-weight: 500; background: transparent; border: none; border-radius: 6px; cursor: pointer; color: var(--vp-c-text-1); text-decoration: none; transition: background-color 0.15s; }
.nmb-trigger:hover { background: var(--vp-c-bg-soft); }
.nmb-trigger[aria-expanded="true"] { background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); }
.nmb-trigger[data-active] { color: var(--vp-c-brand-1); text-decoration: underline; text-underline-offset: 3px; }
.nmb-trigger:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: -1px; }
.nmb-content { position: absolute; top: calc(100% + 6px); left: 0; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); border-radius: 8px; box-shadow: 0 8px 24px rgb(0 0 0 / 0.1); padding: 0.375rem; min-width: 200px; z-index: 50; }
.nmb-content[data-state="closed"] { display: none; }
.nmb-link { display: flex; flex-direction: column; padding: 0.4375rem 0.625rem; border-radius: 6px; text-decoration: none; color: inherit; transition: background-color 0.12s; }
.nmb-link:hover { background: var(--vp-c-bg-soft); }
.nmb-link-title { font-size: 0.875rem; font-weight: 500; color: var(--vp-c-text-1); }
.nmb-link-desc { font-size: 0.75rem; color: var(--vp-c-text-3); margin-top: 0.0625rem; }
.nmb-indicator { position: absolute; bottom: -2px; height: 2px; background: var(--vp-c-brand-1); border-radius: 1px; transition: left 0.2s ease, width 0.2s ease; }
.nmb-indicator[data-state="hidden"] { opacity: 0; }
</style>

### Con estilos personalizados

<div class="hp-demo-card" style="overflow: visible;">
  <NavigationMenuDemo />
</div>

<CodeSnippet>
<Flavor only="css">

**Demo 1 — Basic (grid + list)**

```html
<hp-navigation-menu aria-label="Main navigation">
  <hp-navigation-menu-list class="nav-list">
    <hp-navigation-menu-item value="overview" class="nav-item">
      <hp-navigation-menu-trigger class="nav-trigger"> Overview ▾ </hp-navigation-menu-trigger>
      <hp-navigation-menu-content class="nav-content">
        <div class="nav-grid">
          <a href="." class="nav-card">
            <strong class="nav-card-title">Quick Start</strong>
            <span class="nav-card-desc">Install and assemble your first component.</span>
          </a>
          <a href="." class="nav-card">
            <strong class="nav-card-title">Accessibility</strong>
            <span class="nav-card-desc">Learn how we build accessible components.</span>
          </a>
        </div>
      </hp-navigation-menu-content>
    </hp-navigation-menu-item>

    <hp-navigation-menu-item value="handbook" class="nav-item">
      <hp-navigation-menu-trigger class="nav-trigger"> Handbook ▾ </hp-navigation-menu-trigger>
      <hp-navigation-menu-content class="nav-content">
        <div class="nav-list-panel">
          <a href="." class="nav-card">
            <strong class="nav-card-title">Styling</strong>
            <span class="nav-card-desc">Plain CSS, Tailwind, CSS-in-JS, or CSS Modules.</span>
          </a>
          <a href="." class="nav-card">
            <strong class="nav-card-title">Animation</strong>
            <span class="nav-card-desc">CSS transitions, animations, or JS libraries.</span>
          </a>
        </div>
      </hp-navigation-menu-content>
    </hp-navigation-menu-item>

    <hp-navigation-menu-item class="nav-item">
      <hp-navigation-menu-link class="nav-trigger" href=".">GitHub</hp-navigation-menu-link>
    </hp-navigation-menu-item>
  </hp-navigation-menu-list>
  <hp-navigation-menu-indicator class="nav-indicator"></hp-navigation-menu-indicator>
</hp-navigation-menu>

<style>
  hp-navigation-menu {
    position: relative;
    display: block;
  }

  .nav-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.125rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .nav-item {
    position: static;
  }

  .nav-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.875rem;
    font: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.15s;
  }
  .nav-trigger:hover {
    background: #f1f5f9;
  }
  .nav-trigger[aria-expanded="true"] {
    background: #eff6ff;
    color: #2563eb;
  }
  .nav-trigger:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: -1px;
  }

  .nav-content {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    box-shadow: 0 6px 24px rgb(0 0 0 / 0.1);
    padding: 0.5rem;
    z-index: 50;
  }
  .nav-content[data-state="closed"] {
    display: none;
  }

  .nav-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.25rem;
    min-width: 380px;
  }

  .nav-list-panel {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-width: 240px;
  }

  .nav-card {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0.75rem;
    border-radius: 7px;
    text-decoration: none;
    color: inherit;
    transition: background-color 0.12s;
  }
  .nav-card:hover {
    background: #f8fafc;
  }

  .nav-card-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: #0f172a;
  }
  .nav-card-desc {
    font-size: 0.8125rem;
    color: #64748b;
    margin-top: 0.125rem;
  }

  .nav-indicator {
    position: absolute;
    bottom: -2px;
    height: 2px;
    background: #2563eb;
    border-radius: 1px;
    transition:
      left 0.2s ease,
      width 0.2s ease;
  }
  .nav-indicator[data-state="hidden"] {
    opacity: 0;
  }
</style>
```

**Demo 2 — Nested submenus (card → side panel)**

```html
<hp-navigation-menu aria-label="Nested navigation">
  <hp-navigation-menu-list class="nav-list">
    <hp-navigation-menu-item value="overview" class="nav-item">
      <hp-navigation-menu-trigger class="nav-trigger">Overview ▾</hp-navigation-menu-trigger>
      <hp-navigation-menu-content class="nav-content">
        <div class="nav-grid">
          <a href="." class="nav-card">
            <strong class="nav-card-title">Quick Start</strong>
            <span class="nav-card-desc">Install and assemble your first component.</span>
          </a>
          <!-- Card que abre un panel lateral al hacer hover -->
          <div class="nav-nested" id="nested-wrapper">
            <button class="nav-card nav-nested-btn" aria-expanded="false" aria-haspopup="true">
              <strong class="nav-card-title">Handbook</strong>
              <span class="nav-card-desc">How to use headless-primitives effectively.</span>
              <svg class="nav-nested-arrow" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M3.5 1L7.5 5L3.5 9" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </button>
            <div class="nav-side-panel" role="region" aria-label="Handbook">
              <a href="." class="nav-card"><strong class="nav-card-title">Styling</strong></a>
              <a href="." class="nav-card"><strong class="nav-card-title">Animation</strong></a>
            </div>
          </div>
        </div>
      </hp-navigation-menu-content>
    </hp-navigation-menu-item>
  </hp-navigation-menu-list>
  <hp-navigation-menu-indicator class="nav-indicator"></hp-navigation-menu-indicator>
</hp-navigation-menu>

<style>
  /* Reutiliza los estilos del Demo 1, añade: */
  .nav-nested {
    position: relative;
  }

  .nav-nested-btn {
    width: 100%;
    text-align: left;
    font-family: inherit;
    padding-right: 2rem;
  }

  .nav-nested-arrow {
    position: absolute;
    top: 50%;
    right: 0.625rem;
    transform: translateY(-50%);
    opacity: 0.4;
    transition:
      opacity 0.12s,
      transform 0.12s;
  }
  .nav-nested-btn:hover .nav-nested-arrow,
  .nav-nested-btn[aria-expanded="true"] .nav-nested-arrow {
    opacity: 1;
    transform: translateY(-50%) translateX(2px);
  }

  .nav-side-panel {
    display: none;
    position: absolute;
    top: 0;
    left: calc(100% + 0.5rem);
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    box-shadow: 0 6px 24px rgb(0 0 0 / 0.1);
    padding: 0.5rem;
    min-width: 220px;
    z-index: 110;
  }
  .nav-side-panel.is-open {
    display: block;
  }
</style>

<script>
  const wrapper = document.getElementById("nested-wrapper");
  const btn = wrapper.querySelector(".nav-nested-btn");
  const panel = wrapper.querySelector(".nav-side-panel");

  wrapper.addEventListener("mouseenter", () => {
    btn.setAttribute("aria-expanded", "true");
    panel.classList.add("is-open");
  });
  wrapper.addEventListener("mouseleave", () => {
    btn.setAttribute("aria-expanded", "false");
    panel.classList.remove("is-open");
  });
</script>
```

**Demo 3 — Nested inline submenus (sidebar + viewport)**

```html
<hp-navigation-menu aria-label="Product navigation" id="nav-inline">
  <hp-navigation-menu-list class="nav-list">
    <hp-navigation-menu-item value="product" class="nav-item">
      <hp-navigation-menu-trigger class="nav-trigger">Product ▾</hp-navigation-menu-trigger>
      <hp-navigation-menu-content class="nav-content nav-content--flush">
        <div class="nav-inline-sub">
          <ul class="nav-sub-sidebar" role="list" id="nav-tabs">
            <li class="nav-sub-tab is-active" data-value="developers">
              <button class="nav-sub-btn" aria-expanded="true">
                <span class="nav-sub-label">Developers</span>
                <span class="nav-sub-hint">Go from idea to UI faster.</span>
              </button>
            </li>
            <li class="nav-sub-tab" data-value="systems">
              <button class="nav-sub-btn" aria-expanded="false">
                <span class="nav-sub-label">Design Systems</span>
                <span class="nav-sub-hint">Keep patterns aligned across teams.</span>
              </button>
            </li>
          </ul>
          <div class="nav-sub-viewport" id="nav-viewport">
            <!-- El contenido del tab activo se renderiza aquí -->
          </div>
        </div>
      </hp-navigation-menu-content>
    </hp-navigation-menu-item>
  </hp-navigation-menu-list>
  <hp-navigation-menu-indicator class="nav-indicator"></hp-navigation-menu-indicator>
</hp-navigation-menu>

<style>
  /* Reutiliza los estilos del Demo 1, añade: */
  .nav-content--flush {
    padding: 0;
    overflow: hidden;
  }

  .nav-inline-sub {
    display: grid;
    grid-template-columns: 12rem minmax(0, 1fr);
    min-width: 520px;
    min-height: 220px;
    overflow: hidden;
    border-radius: 10px;
  }

  .nav-sub-sidebar {
    list-style: none;
    margin: 0;
    padding: 0.625rem;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    background: #f8fafc;
    border-right: 1px solid #e2e8f0;
  }

  .nav-sub-btn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.1875rem;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: 7px;
    background: transparent;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.12s;
  }
  .nav-sub-btn:hover {
    background: #f1f5f9;
  }
  .nav-sub-tab.is-active .nav-sub-btn {
    background: #fff;
    box-shadow: 0 1px 3px rgb(0 0 0 / 0.08);
  }

  .nav-sub-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #0f172a;
  }
  .nav-sub-hint {
    font-size: 0.8125rem;
    color: #64748b;
  }

  .nav-sub-viewport {
    padding: 1.25rem;
    background: #fff;
  }
</style>

<script>
  const tabs = document.querySelectorAll("#nav-tabs .nav-sub-tab");
  const viewport = document.getElementById("nav-viewport");

  const content = {
    developers:
      "<h4>Build product UI without giving up control</h4><p>Start with accessible parts and shape them to your app.</p>",
    systems:
      "<h4>Turn shared standards into working components</h4><p>Connect tokens, states, and accessibility rules once.</p>",
  };

  function activate(value) {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.value === value;
      tab.classList.toggle("is-active", isActive);
      tab.querySelector(".nav-sub-btn").setAttribute("aria-expanded", String(isActive));
    });
    viewport.innerHTML = content[value] || "";
  }

  tabs.forEach((tab) => {
    const btn = tab.querySelector(".nav-sub-btn");
    btn.addEventListener("mouseenter", () => activate(tab.dataset.value));
    btn.addEventListener("focus", () => activate(tab.dataset.value));
    btn.addEventListener("click", () => activate(tab.dataset.value));
  });

  // Activar el primero al abrir el panel
  document.getElementById("nav-inline").addEventListener("hp-open", (e) => {
    if (e.detail.value === "product") activate("developers");
  });
</script>
```

</Flavor>
<Flavor only="tailwind">

```html
<hp-navigation-menu aria-label="Main navigation" class="relative block">
  <hp-navigation-menu-list class="flex flex-row items-center gap-0.5 list-none p-0 m-0">
    <hp-navigation-menu-item value="overview" class="static">
      <hp-navigation-menu-trigger
        class="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-gray-700
               rounded-md bg-transparent border-0 font-[inherit] cursor-pointer
               hover:bg-slate-100 aria-expanded:bg-blue-50 aria-expanded:text-blue-600
               focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:-outline-offset-1
               transition-colors"
      >
        Overview ▾
      </hp-navigation-menu-trigger>
      <hp-navigation-menu-content
        class="absolute top-[calc(100%+8px)] left-0 bg-white border border-gray-200
               rounded-xl shadow-lg p-2 z-50 [&[data-state=closed]]:hidden"
      >
        <div class="grid grid-cols-2 gap-1 min-w-[380px]">
          <a
            href="."
            class="flex flex-col p-3 rounded-lg no-underline text-inherit hover:bg-slate-50"
          >
            <strong class="text-sm font-medium text-slate-900">Quick Start</strong>
            <span class="text-xs text-slate-500 mt-0.5"
              >Install and assemble your first component.</span
            >
          </a>
          <a
            href="."
            class="flex flex-col p-3 rounded-lg no-underline text-inherit hover:bg-slate-50"
          >
            <strong class="text-sm font-medium text-slate-900">Accessibility</strong>
            <span class="text-xs text-slate-500 mt-0.5"
              >Learn how we build accessible components.</span
            >
          </a>
        </div>
      </hp-navigation-menu-content>
    </hp-navigation-menu-item>

    <hp-navigation-menu-item class="static">
      <hp-navigation-menu-link
        href="."
        class="inline-flex px-3.5 py-2 text-sm font-medium text-gray-700 rounded-md
               no-underline hover:bg-slate-100 transition-colors
               [&[data-active]]:text-blue-600 [&[data-active]]:underline [&[data-active]]:underline-offset-4"
      >
        GitHub
      </hp-navigation-menu-link>
    </hp-navigation-menu-item>
  </hp-navigation-menu-list>

  <hp-navigation-menu-indicator
    class="absolute -bottom-0.5 h-0.5 bg-blue-600 rounded-sm transition-all duration-200
           [&[data-state=hidden]]:opacity-0"
  ></hp-navigation-menu-indicator>
</hp-navigation-menu>
```

</Flavor>
<Flavor only="base-css">

```html
<link rel="stylesheet" href="node_modules/@headless-primitives/utils/base.css" />

<hp-navigation-menu aria-label="Main navigation">
  <hp-navigation-menu-list>
    <hp-navigation-menu-item value="products">
      <hp-navigation-menu-trigger>Products ▾</hp-navigation-menu-trigger>
      <hp-navigation-menu-content>
        <a href="/components">Components</a>
        <a href="/theming">Theming</a>
      </hp-navigation-menu-content>
    </hp-navigation-menu-item>

    <hp-navigation-menu-item>
      <hp-navigation-menu-link href="/docs">Docs</hp-navigation-menu-link>
    </hp-navigation-menu-item>

    <hp-navigation-menu-item>
      <hp-navigation-menu-link href="/blog" active>Blog</hp-navigation-menu-link>
    </hp-navigation-menu-item>
  </hp-navigation-menu-list>
  <hp-navigation-menu-indicator></hp-navigation-menu-indicator>
</hp-navigation-menu>

<style>
  hp-navigation-menu {
    position: relative;
    display: block;
  }

  hp-navigation-menu-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  hp-navigation-menu-item {
    position: static;
  }

  hp-navigation-menu-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.875rem;
    font: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    color: inherit;
  }
  hp-navigation-menu-trigger:hover {
    background: #f1f5f9;
  }
  hp-navigation-menu-trigger[aria-expanded="true"] {
    background: #eff6ff;
    color: #2563eb;
  }

  hp-navigation-menu-content {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 10px 30px -5px rgb(0 0 0 / 0.1);
    padding: 0.5rem;
    min-width: 200px;
    z-index: 50;
  }
  hp-navigation-menu-content[data-state="closed"] {
    display: none;
  }

  hp-navigation-menu-link {
    display: inline-flex;
    padding: 0.5rem 0.875rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: inherit;
    text-decoration: none;
    border-radius: 6px;
  }
  hp-navigation-menu-link:hover {
    background: #f1f5f9;
  }
  hp-navigation-menu-link[data-active] {
    color: #2563eb;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  hp-navigation-menu-indicator {
    position: absolute;
    bottom: -2px;
    height: 2px;
    background: #2563eb;
    border-radius: 1px;
    transition:
      left 0.2s ease,
      width 0.2s ease;
  }
  hp-navigation-menu-indicator[data-state="hidden"] {
    opacity: 0;
  }
</style>
```

</Flavor>
</CodeSnippet>

## Anatomía

```html
<hp-navigation-menu aria-label="Main">
  <hp-navigation-menu-list>
    <!-- Item with trigger + flyout content -->
    <hp-navigation-menu-item value="products">
      <hp-navigation-menu-trigger>Products</hp-navigation-menu-trigger>
      <hp-navigation-menu-content>
        <!-- flyout content here -->
      </hp-navigation-menu-content>
    </hp-navigation-menu-item>

    <!-- Plain link item -->
    <hp-navigation-menu-item>
      <hp-navigation-menu-link href="/docs">Docs</hp-navigation-menu-link>
    </hp-navigation-menu-item>
  </hp-navigation-menu-list>

  <!-- Optional indicator underline -->
  <hp-navigation-menu-indicator></hp-navigation-menu-indicator>
</hp-navigation-menu>
```

## API Reference

### `hp-navigation-menu`

Elemento raíz. Gestiona el estado abierto/cerrado de todos los ítems.

| Propiedad     | Tipo     | Por defecto | Descripción                                                      |
| ------------- | -------- | ----------- | ---------------------------------------------------------------- |
| `value`       | `string` | `""`        | Valor del ítem actualmente abierto. Cadena vacía = todo cerrado. |
| `delay`       | `number` | `50`        | Milisegundos antes de abrir en hover.                            |
| `close-delay` | `number` | `50`        | Milisegundos antes de cerrar en hover-out.                       |

| Método          | Descripción                                              |
| --------------- | -------------------------------------------------------- |
| `open(value)`   | Abre el ítem con el valor indicado.                      |
| `close()`       | Cierra el ítem actualmente abierto.                      |
| `toggle(value)` | Alterna el ítem: lo abre si estaba cerrado, y viceversa. |

| Evento     | Detalle             | Descripción                        |
| ---------- | ------------------- | ---------------------------------- |
| `hp-open`  | `{ value: string }` | Emitido cuando un panel se abre.   |
| `hp-close` | `{ value: string }` | Emitido cuando un panel se cierra. |

| Atributo ARIA | Valor        | Descripción                               |
| ------------- | ------------ | ----------------------------------------- |
| `role`        | `navigation` | Landmark de navegación.                   |
| `aria-label`  | string       | Nombre accesible (por defecto: `"Main"`). |

### `hp-navigation-menu-list`

Contenedor de ítems de navegación.

| Atributo ARIA      | Valor        | Descripción               |
| ------------------ | ------------ | ------------------------- |
| `role`             | `menubar`    | Barra de menú horizontal. |
| `aria-orientation` | `horizontal` | Orientación de la barra.  |

### `hp-navigation-menu-item`

Envoltorio de cada entrada de navegación.

| Propiedad | Tipo     | Por defecto | Descripción                                                        |
| --------- | -------- | ----------- | ------------------------------------------------------------------ |
| `value`   | `string` | `""`        | Identificador único del ítem. Requerido si tiene contenido flyout. |

| Atributo ARIA | Valor  | Descripción                                   |
| ------------- | ------ | --------------------------------------------- |
| `role`        | `none` | Neutraliza la semántica del `<li>` para ARIA. |

### `hp-navigation-menu-trigger`

Botón que activa/desactiva el flyout del ítem padre.

| Propiedad  | Tipo      | Por defecto | Descripción             |
| ---------- | --------- | ----------- | ----------------------- |
| `disabled` | `boolean` | `false`     | Deshabilita el trigger. |

| Atributo ARIA   | Valor            | Descripción                                      |
| --------------- | ---------------- | ------------------------------------------------ |
| `role`          | `button`         | Rol de botón interactivo.                        |
| `aria-haspopup` | `true`           | Indica que tiene un panel asociado.              |
| `aria-expanded` | `true` / `false` | Refleja si el panel está abierto.                |
| `aria-controls` | ID del panel     | Apunta al `hp-navigation-menu-content` asociado. |
| `aria-disabled` | `true` / `false` | Refleja el estado disabled.                      |

Teclado:

- `Enter` / `Space` — abre o cierra el panel.
- `ArrowLeft` / `ArrowRight` — navega entre triggers.
- `Escape` — cierra el panel activo y devuelve el foco.
- `Tab` — cierra el panel activo.

### `hp-navigation-menu-content`

Panel flyout que se muestra cuando su ítem padre está activo.

| Atributo ARIA | Valor             | Descripción                                            |
| ------------- | ----------------- | ------------------------------------------------------ |
| `role`        | `region`          | Región de contenido.                                   |
| `aria-hidden` | `true` / `false`  | Oculta el panel a lectores de pantalla cuando cerrado. |
| `data-state`  | `open` / `closed` | Estado CSS del panel.                                  |

### `hp-navigation-menu-link`

Enlace de navegación simple (sin flyout).

| Propiedad | Tipo      | Por defecto | Descripción                                            |
| --------- | --------- | ----------- | ------------------------------------------------------ |
| `active`  | `boolean` | `false`     | Indica que este enlace corresponde a la página actual. |

| Atributo       | Valor  | Descripción                         |
| -------------- | ------ | ----------------------------------- |
| `data-active`  | vacío  | Presente cuando `active` es `true`. |
| `aria-current` | `page` | Presente cuando `active` es `true`. |

### `hp-navigation-menu-indicator`

Indicador visual (línea inferior) que sigue el trigger activo. Completamente opcional.

| Atributo      | Valor                | Descripción                            |
| ------------- | -------------------- | -------------------------------------- |
| `data-state`  | `visible` / `hidden` | Visibilidad del indicador.             |
| `aria-hidden` | `true`               | Siempre oculto a tecnologías de apoyo. |

## Estilos con `@headless-primitives/styles`

Importa el paquete de estilos opcionales para obtener un tema completo con tokens CSS:

```css
@import "@headless-primitives/styles/navigation-menu.css";
/* o todo el paquete: */
@import "@headless-primitives/styles";
```

Los tokens que controlan el aspecto son los mismos `--hp-*` globales. Ejemplos:

```css
:root {
  --hp-accent: #2563eb; /* Color del trigger activo e indicador */
  --hp-surface: #ffffff; /* Fondo del panel flyout */
  --hp-border: #e2e8f0; /* Borde del panel */
  --hp-shadow-lg: 0 10px 30px -5px rgb(0 0 0 / 0.1); /* Sombra del panel */
  --hp-bg-muted: #f1f5f9; /* Fondo hover del trigger */
  --hp-radius-md: 0.625rem; /* Radio de esquinas del panel */
}
```

Los estados `data-state="open"` y `aria-expanded="true"` están ya declarados en el CSS del paquete y no requieren reglas adicionales.
