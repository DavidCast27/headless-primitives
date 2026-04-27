# Toolbar

<span class="hp-badge">Nuevo</span>

El componente `hp-toolbar` implementa el patrón WAI-ARIA [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) para agrupar controles relacionados (botones, toggles, separadores, inputs) con navegación por teclado eficiente. Usa **roving tabindex**: solo un elemento está en la secuencia de Tab en cada momento; las flechas de cursor mueven el foco entre los items.

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/toolbar
```

```bash [npm]
npm install @headless-primitives/toolbar
```

```bash [yarn]
yarn add @headless-primitives/toolbar
```

```bash [bun]
bun add @headless-primitives/toolbar
```

:::

## Anatomía

```html
<hp-toolbar label="Text formatting">
  <button type="button">Bold</button>
  <button type="button">Italic</button>
  <div role="separator" aria-orientation="vertical"></div>
  <button type="button">Align left</button>
  <button type="button">Align center</button>
</hp-toolbar>
```

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-toolbar` usando únicamente `@headless-primitives/utils/base.css`. La navegación por teclado con roving tabindex funciona completamente.

> **¿Quieres agregar colores?** Usa `role="toolbar"` y los atributos `aria-orientation` para tus selectores CSS.
> Por ejemplo: `hp-toolbar { border: 1px solid #e2e8f0; border-radius: 6px; padding: 4px; }`.
> O importa `@headless-primitives/styles` para obtener un tema completo con tokens CSS.

<div class="hp-demo-card">
  <hp-toolbar id="demo-toolbar-h" label="Formatting" class="demo-tb demo-tb--gap-sm">
    <button type="button" id="demo-btn-bold" aria-pressed="false" class="demo-tb-btn demo-tb-btn--bold">B</button>
    <button type="button" id="demo-btn-italic" aria-pressed="false" class="demo-tb-btn demo-tb-btn--italic">I</button>
    <button type="button" id="demo-btn-underline" aria-pressed="false" class="demo-tb-btn demo-tb-btn--underline">U</button>
    <div role="separator" aria-orientation="vertical" class="demo-tb-sep demo-tb-sep--sm"></div>
    <button type="button" class="demo-tb-btn">&#8676;</button>
    <button type="button" class="demo-tb-btn">&#8596;</button>
    <button type="button" class="demo-tb-btn">&#8677;</button>
  </hp-toolbar>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-toolbar class="toolbar" label="Text formatting">
  <button type="button" class="toolbar-btn" aria-pressed="false" id="btn-bold">B</button>
  <button type="button" class="toolbar-btn" aria-pressed="false" id="btn-italic">I</button>
  <button type="button" class="toolbar-btn" aria-pressed="false" id="btn-underline">U</button>
  <div role="separator" aria-orientation="vertical" class="toolbar-sep"></div>
  <button type="button" class="toolbar-btn">&#8676;</button>
  <button type="button" class="toolbar-btn">&#8596;</button>
  <button type="button" class="toolbar-btn">&#8677;</button>
</hp-toolbar>

<script>
  ["btn-bold", "btn-italic", "btn-underline"].forEach((id) => {
    const btn = document.getElementById(id);
    btn.addEventListener("click", () => {
      const pressed = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", String(!pressed));
    });
  });
</script>
```

```css [style.css]
hp-toolbar.toolbar {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px 6px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
}

.toolbar-btn {
  padding: 4px 10px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
  transition: background 0.15s;
}

.toolbar-btn:hover:not([disabled]) {
  background: #f1f5f9;
}

.toolbar-btn:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 1px;
}

.toolbar-btn[aria-pressed="true"] {
  background: #eff6ff;
  border-color: #2563eb;
  color: #2563eb;
}

.toolbar-btn[disabled] {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.toolbar-sep {
  width: 1px;
  height: 18px;
  background: #e2e8f0;
  margin: 0 4px;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-toolbar
  class="inline-flex items-center gap-0.5 px-1.5 py-1 border border-gray-200 rounded-lg bg-white"
  label="Text formatting"
>
  <button
    type="button"
    id="btn-bold"
    aria-pressed="false"
    class="px-2.5 py-1 rounded border border-transparent hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 aria-pressed:bg-blue-50 aria-pressed:border-blue-500 aria-pressed:text-blue-600 font-bold"
  >
    B
  </button>
  <button
    type="button"
    id="btn-italic"
    aria-pressed="false"
    class="px-2.5 py-1 rounded border border-transparent hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 aria-pressed:bg-blue-50 aria-pressed:border-blue-500 aria-pressed:text-blue-600 italic"
  >
    I
  </button>
  <div class="w-px h-4 bg-gray-200 mx-1"></div>
  <button
    type="button"
    class="px-2.5 py-1 rounded border border-transparent hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
  >
    &#8676;
  </button>
  <button
    type="button"
    class="px-2.5 py-1 rounded border border-transparent hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
  >
    &#8596;
  </button>
</hp-toolbar>

<script>
  ["btn-bold", "btn-italic"].forEach((id) => {
    const btn = document.getElementById(id);
    btn.addEventListener("click", () => {
      const pressed = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", String(!pressed));
    });
  });
</script>
```

:::

</Flavor>

</CodeSnippet>

## Con estilos personalizados

### Editor de texto con grupos

Toolbar de formato con dos grupos lógicos separados: estilo de texto (toggle) y alineación (selección exclusiva). Cada grupo comunica su propósito con `aria-label`.

<div class="hp-demo-card">
  <hp-toolbar id="toolbar-editor" label="Formato de texto" class="demo-tb">
    <div role="group" aria-label="Estilo" class="demo-tb-group">
      <button type="button" id="tb-bold" aria-pressed="false" title="Negrita" class="demo-tb-btn demo-tb-btn--bold">B</button>
      <button type="button" id="tb-italic" aria-pressed="false" title="Cursiva" class="demo-tb-btn demo-tb-btn--italic">I</button>
      <button type="button" id="tb-underline" aria-pressed="false" title="Subrayado" class="demo-tb-btn demo-tb-btn--underline">U</button>
      <button type="button" id="tb-strike" aria-pressed="false" title="Tachado" class="demo-tb-btn demo-tb-btn--strike">S</button>
    </div>
    <div role="separator" aria-orientation="vertical" class="demo-tb-sep"></div>
    <div role="group" aria-label="Alineación" class="demo-tb-group">
      <button type="button" id="tb-align-left" aria-pressed="true" title="Alinear a la izquierda" class="demo-tb-btn">&#8676;</button>
      <button type="button" id="tb-align-center" aria-pressed="false" title="Centrar" class="demo-tb-btn">&#8596;</button>
      <button type="button" id="tb-align-right" aria-pressed="false" title="Alinear a la derecha" class="demo-tb-btn">&#8677;</button>
      <button type="button" id="tb-align-justify" aria-pressed="false" title="Justificar" class="demo-tb-btn">&#8644;</button>
    </div>
    <div role="separator" aria-orientation="vertical" class="demo-tb-sep"></div>
    <button type="button" disabled title="Deshacer (deshabilitado)" class="demo-tb-btn" aria-disabled="true">↩</button>
    <button type="button" title="Rehacer" class="demo-tb-btn">↪</button>
  </hp-toolbar>
</div>

<CodeSnippet>
<Flavor only="css">

::: code-group

```html [index.html]
<hp-toolbar class="toolbar" label="Formato de texto">
  <div role="group" aria-label="Estilo">
    <button type="button" class="toolbar-btn" aria-pressed="false" id="btn-bold">B</button>
    <button type="button" class="toolbar-btn" aria-pressed="false" id="btn-italic">I</button>
    <button type="button" class="toolbar-btn" aria-pressed="false" id="btn-underline">U</button>
    <button type="button" class="toolbar-btn" aria-pressed="false" id="btn-strike">S</button>
  </div>
  <div role="separator" aria-orientation="vertical" class="toolbar-sep"></div>
  <div role="group" aria-label="Alineación">
    <button type="button" class="toolbar-btn" aria-pressed="true" id="btn-align-left">
      &#8676;
    </button>
    <button type="button" class="toolbar-btn" aria-pressed="false" id="btn-align-center">
      &#8596;
    </button>
    <button type="button" class="toolbar-btn" aria-pressed="false" id="btn-align-right">
      &#8677;
    </button>
  </div>
  <div role="separator" aria-orientation="vertical" class="toolbar-sep"></div>
  <button type="button" class="toolbar-btn" disabled aria-disabled="true">↩</button>
  <button type="button" class="toolbar-btn">↪</button>
</hp-toolbar>

<script>
  const toggleBtns = ["btn-bold", "btn-italic", "btn-underline", "btn-strike"];
  toggleBtns.forEach((id) => {
    const btn = document.getElementById(id);
    btn.addEventListener("click", () => {
      const active = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", String(!active));
    });
  });

  const alignBtns = ["btn-align-left", "btn-align-center", "btn-align-right"];
  alignBtns.forEach((id) => {
    const btn = document.getElementById(id);
    btn.addEventListener("click", () => {
      alignBtns.forEach((otherId) => {
        document.getElementById(otherId).setAttribute("aria-pressed", "false");
      });
      btn.setAttribute("aria-pressed", "true");
    });
  });
</script>
```

```css [style.css]
hp-toolbar.toolbar {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

[role="group"] {
  display: contents;
}

.toolbar-btn {
  width: 32px;
  height: 32px;
  border: 1px solid transparent;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.1s;
}

.toolbar-btn:hover:not([disabled]) {
  background: #f1f5f9;
}

.toolbar-btn:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 1px;
}

.toolbar-btn[aria-pressed="true"] {
  background: #eff6ff;
  border-color: #2563eb;
  color: #2563eb;
}

.toolbar-btn[disabled],
.toolbar-btn[aria-disabled="true"] {
  opacity: 0.35;
  cursor: not-allowed;
  pointer-events: none;
}

.toolbar-sep {
  width: 1px;
  height: 20px;
  background: #e2e8f0;
  margin: 0 4px;
  flex-shrink: 0;
}
```

:::

</Flavor>
<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-toolbar
  class="inline-flex items-center gap-0.5 p-1 bg-white border border-gray-200 rounded-lg"
  label="Formato de texto"
>
  <div role="group" aria-label="Estilo" class="contents">
    <button
      type="button"
      id="btn-bold"
      aria-pressed="false"
      class="w-8 h-8 inline-flex items-center justify-content-center rounded border border-transparent font-bold font-serif text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 aria-pressed:bg-blue-50 aria-pressed:border-blue-500 aria-pressed:text-blue-600"
    >
      B
    </button>
    <button
      type="button"
      id="btn-italic"
      aria-pressed="false"
      class="w-8 h-8 inline-flex items-center justify-content-center rounded border border-transparent italic font-serif text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 aria-pressed:bg-blue-50 aria-pressed:border-blue-500 aria-pressed:text-blue-600"
    >
      I
    </button>
    <button
      type="button"
      id="btn-underline"
      aria-pressed="false"
      class="w-8 h-8 inline-flex items-center justify-content-center rounded border border-transparent underline font-serif text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 aria-pressed:bg-blue-50 aria-pressed:border-blue-500 aria-pressed:text-blue-600"
    >
      U
    </button>
  </div>
  <div
    role="separator"
    aria-orientation="vertical"
    class="w-px h-5 bg-gray-200 mx-1 shrink-0"
  ></div>
  <div role="group" aria-label="Alineación" class="contents">
    <button
      type="button"
      id="btn-left"
      aria-pressed="true"
      class="w-8 h-8 inline-flex items-center justify-content-center rounded border text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 aria-pressed:bg-blue-50 aria-pressed:border-blue-500 aria-pressed:text-blue-600"
    >
      &#8676;
    </button>
    <button
      type="button"
      id="btn-center"
      aria-pressed="false"
      class="w-8 h-8 inline-flex items-center justify-content-center rounded border border-transparent text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 aria-pressed:bg-blue-50 aria-pressed:border-blue-500 aria-pressed:text-blue-600"
    >
      &#8596;
    </button>
    <button
      type="button"
      id="btn-right"
      aria-pressed="false"
      class="w-8 h-8 inline-flex items-center justify-content-center rounded border border-transparent text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 aria-pressed:bg-blue-50 aria-pressed:border-blue-500 aria-pressed:text-blue-600"
    >
      &#8677;
    </button>
  </div>
</hp-toolbar>

<script>
  ["btn-bold", "btn-italic", "btn-underline"].forEach((id) => {
    const btn = document.getElementById(id);
    btn.addEventListener("click", () => {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("aria-pressed") !== "true"));
    });
  });
  const alignIds = ["btn-left", "btn-center", "btn-right"];
  alignIds.forEach((id) => {
    const btn = document.getElementById(id);
    btn.addEventListener("click", () => {
      alignIds.forEach((oid) => document.getElementById(oid).setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
    });
  });
</script>
```

:::

</Flavor>
</CodeSnippet>

---

### Con menú desplegable

Un botón del toolbar abre un menú de opciones adicionales. El menú es controlado manualmente: se abre con clic, se cierra con Escape o clic exterior, y sus items son accesibles con flechas.

<div class="hp-demo-card">
  <hp-toolbar id="toolbar-menu" label="Acciones" class="demo-tb demo-tb--relative">
    <button type="button" class="demo-tb-btn demo-tb-btn--wide">
      ✂ Cortar
    </button>
    <button type="button" class="demo-tb-btn demo-tb-btn--wide">
      ⎘ Copiar
    </button>
    <button type="button" class="demo-tb-btn demo-tb-btn--wide">
      ⎗ Pegar
    </button>
    <div role="separator" aria-orientation="vertical" class="demo-tb-sep"></div>
    <div class="demo-tb-menu-wrap">
      <button type="button" id="tb-more-btn" aria-haspopup="menu" aria-expanded="false" aria-controls="tb-more-menu" class="demo-tb-btn demo-tb-btn--wide">
        Más ▾
      </button>
      <ul id="tb-more-menu" role="menu" aria-label="Más opciones" hidden class="demo-tb-menu">
        <li role="menuitem" tabindex="-1" class="demo-tb-menu-item">Buscar y reemplazar</li>
        <li role="menuitem" tabindex="-1" class="demo-tb-menu-item">Insertar imagen</li>
        <li role="separator" class="demo-tb-menu-sep"></li>
        <li role="menuitem" tabindex="-1" class="demo-tb-menu-item demo-tb-menu-item--danger">Eliminar</li>
      </ul>
    </div>
  </hp-toolbar>
</div>

<CodeSnippet>
<Flavor only="css">

::: code-group

```html [index.html]
<hp-toolbar class="toolbar" label="Acciones">
  <button type="button" class="toolbar-btn">✂ Cortar</button>
  <button type="button" class="toolbar-btn">⎘ Copiar</button>
  <button type="button" class="toolbar-btn">⎗ Pegar</button>
  <div role="separator" aria-orientation="vertical" class="toolbar-sep"></div>

  <!-- Menú desplegable -->
  <div class="toolbar-menu-wrap">
    <button
      type="button"
      id="more-btn"
      class="toolbar-btn"
      aria-haspopup="menu"
      aria-expanded="false"
      aria-controls="more-menu"
    >
      Más ▾
    </button>
    <ul id="more-menu" role="menu" aria-label="Más opciones" hidden class="toolbar-menu">
      <li role="menuitem" tabindex="-1" class="toolbar-menu-item">Buscar y reemplazar</li>
      <li role="menuitem" tabindex="-1" class="toolbar-menu-item">Insertar imagen</li>
      <li role="separator" class="toolbar-menu-sep"></li>
      <li role="menuitem" tabindex="-1" class="toolbar-menu-item toolbar-menu-item--danger">
        Eliminar
      </li>
    </ul>
  </div>
</hp-toolbar>

<script>
  const btn = document.getElementById("more-btn");
  const menu = document.getElementById("more-menu");
  const items = [...menu.querySelectorAll('[role="menuitem"]')];

  const open = () => {
    menu.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    items[0]?.focus();
  };
  const close = () => {
    menu.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    btn.focus();
  };

  btn.addEventListener("click", () => (menu.hidden ? open() : close()));
  items.forEach((item, i) => {
    item.addEventListener("click", close);
    item.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        (items[i + 1] ?? items[0]).focus();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        (items[i - 1] ?? items.at(-1)).focus();
      }
      if (e.key === "Escape" || e.key === "Tab") close();
    });
  });
  document.addEventListener("click", (e) => {
    if (!menu.hidden && !btn.contains(e.target) && !menu.contains(e.target)) close();
  });
</script>
```

```css [style.css]
hp-toolbar.toolbar {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.toolbar-btn {
  height: 32px;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;
  font-size: 13px;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.toolbar-btn:hover {
  background: #f1f5f9;
}

.toolbar-btn:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 1px;
}

.toolbar-sep {
  width: 1px;
  height: 20px;
  background: #e2e8f0;
  margin: 0 4px;
  flex-shrink: 0;
}

.toolbar-menu-wrap {
  position: relative;
  display: inline-block;
}

.toolbar-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  margin: 0;
  padding: 4px;
  list-style: none;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 160px;
  z-index: 10;
}

.toolbar-menu-item {
  padding: 7px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
}

.toolbar-menu-item:hover,
.toolbar-menu-item:focus {
  background: #f1f5f9;
  outline: none;
}

.toolbar-menu-item--danger {
  color: #dc2626;
}

.toolbar-menu-sep {
  height: 1px;
  background: #e2e8f0;
  margin: 4px 0;
}
```

:::

</Flavor>
</CodeSnippet>

---

### Con tooltip en los botones

Patrón accesible para mostrar tooltips en los items del toolbar. Cada botón usa `aria-describedby` apuntando a su tooltip, que se muestra con `:focus-visible` y `:hover` vía CSS puro — sin JavaScript.

<div class="hp-demo-card">
  <hp-toolbar id="toolbar-tooltip" label="Herramientas de dibujo" class="demo-tb demo-tb--gap-sm">
    <div class="demo-tb-tip-wrap">
      <button type="button" aria-pressed="false" aria-describedby="tip-pencil" class="demo-tb-btn demo-tb-btn--icon">✏️</button>
      <span id="tip-pencil" role="tooltip" class="demo-tb-tip">Lápiz</span>
    </div>
    <div class="demo-tb-tip-wrap">
      <button type="button" aria-pressed="false" aria-describedby="tip-brush" class="demo-tb-btn demo-tb-btn--icon">🖌️</button>
      <span id="tip-brush" role="tooltip" class="demo-tb-tip">Pincel</span>
    </div>
    <div class="demo-tb-tip-wrap">
      <button type="button" aria-pressed="false" aria-describedby="tip-eraser" class="demo-tb-btn demo-tb-btn--icon">🧹</button>
      <span id="tip-eraser" role="tooltip" class="demo-tb-tip">Borrador</span>
    </div>
    <div role="separator" aria-orientation="vertical" class="demo-tb-sep demo-tb-sep--tall"></div>
    <div class="demo-tb-tip-wrap">
      <button type="button" aria-pressed="false" aria-describedby="tip-fill" class="demo-tb-btn demo-tb-btn--icon">🪣</button>
      <span id="tip-fill" role="tooltip" class="demo-tb-tip">Relleno</span>
    </div>
    <div class="demo-tb-tip-wrap">
      <button type="button" aria-pressed="false" aria-describedby="tip-eyedrop" class="demo-tb-btn demo-tb-btn--icon">🔬</button>
      <span id="tip-eyedrop" role="tooltip" class="demo-tb-tip">Cuentagotas</span>
    </div>
  </hp-toolbar>
</div>

<CodeSnippet>
<Flavor only="css">

::: code-group

```html [index.html]
<hp-toolbar class="toolbar" label="Herramientas de dibujo">
  <div class="tip-wrap">
    <button type="button" class="toolbar-btn" aria-pressed="false" aria-describedby="tip-pencil">
      ✏️
    </button>
    <span id="tip-pencil" role="tooltip" class="tooltip">Lápiz</span>
  </div>
  <div class="tip-wrap">
    <button type="button" class="toolbar-btn" aria-pressed="false" aria-describedby="tip-brush">
      🖌️
    </button>
    <span id="tip-brush" role="tooltip" class="tooltip">Pincel</span>
  </div>
  <div class="tip-wrap">
    <button type="button" class="toolbar-btn" aria-pressed="false" aria-describedby="tip-eraser">
      🧹
    </button>
    <span id="tip-eraser" role="tooltip" class="tooltip">Borrador</span>
  </div>
  <div role="separator" aria-orientation="vertical" class="toolbar-sep"></div>
  <div class="tip-wrap">
    <button type="button" class="toolbar-btn" aria-pressed="false" aria-describedby="tip-fill">
      🪣
    </button>
    <span id="tip-fill" role="tooltip" class="tooltip">Relleno</span>
  </div>
</hp-toolbar>

<script>
  document.querySelectorAll(".tip-wrap button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const active = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", String(!active));
    });
  });
</script>
```

```css [style.css]
hp-toolbar.toolbar {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.tip-wrap {
  position: relative;
  display: inline-block;
}

/* Mostrar tooltip en hover y focus-visible (CSS puro) */
.tip-wrap:hover .tooltip,
.tip-wrap:focus-within .tooltip {
  opacity: 1;
}

.toolbar-btn {
  width: 36px;
  height: 36px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  font-size: 17px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.toolbar-btn:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 1px;
}

.toolbar-btn[aria-pressed="true"] {
  background: #eff6ff;
  border-color: #2563eb;
}

.tooltip {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  padding: 4px 8px;
  background: #1e293b;
  color: #fff;
  font-size: 11px;
  border-radius: 4px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s;
}

.toolbar-sep {
  width: 1px;
  height: 22px;
  background: #e2e8f0;
  margin: 0 2px;
  flex-shrink: 0;
}
```

:::

</Flavor>
</CodeSnippet>

---

### Orientación vertical

Cambia a `orientation="vertical"` para toolbars laterales. La navegación se invierte: `ArrowUp`/`ArrowDown` mueven el foco, `ArrowLeft`/`ArrowRight` no hacen nada dentro del toolbar.

<div class="hp-demo-card">
  <div class="demo-tb-vertical-wrap">
    <hp-toolbar orientation="vertical" label="Capas" class="demo-tb demo-tb--vertical">
      <button type="button" aria-pressed="true" title="Mover" class="demo-tb-btn">⬆</button>
      <button type="button" aria-pressed="false" title="Escalar" class="demo-tb-btn">⤡</button>
      <button type="button" aria-pressed="false" title="Rotar" class="demo-tb-btn">↻</button>
      <div role="separator" aria-orientation="horizontal" class="demo-tb-sep"></div>
      <button type="button" aria-pressed="false" title="Bloquear" class="demo-tb-btn">🔒</button>
      <button type="button" aria-pressed="false" title="Ocultar" class="demo-tb-btn">👁</button>
    </hp-toolbar>
    <div class="demo-tb-tip-text">
      <strong>Tip:</strong> Con orientación vertical,<br>usa <kbd>↑</kbd> / <kbd>↓</kbd> para navegar<br>entre los items del toolbar.
    </div>
  </div>
</div>

<CodeSnippet>
<Flavor only="css">

::: code-group

```html [index.html]
<hp-toolbar class="toolbar toolbar--vertical" orientation="vertical" label="Capas">
  <button type="button" class="toolbar-btn" aria-pressed="true" title="Mover">⬆</button>
  <button type="button" class="toolbar-btn" aria-pressed="false" title="Escalar">⤡</button>
  <button type="button" class="toolbar-btn" aria-pressed="false" title="Rotar">↻</button>
  <div role="separator" aria-orientation="horizontal" class="toolbar-sep--h"></div>
  <button type="button" class="toolbar-btn" aria-pressed="false" title="Bloquear">🔒</button>
  <button type="button" class="toolbar-btn" aria-pressed="false" title="Ocultar">👁</button>
</hp-toolbar>
```

```css [style.css]
hp-toolbar.toolbar--vertical {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 4px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  width: 48px;
}

.toolbar-btn {
  width: 36px;
  height: 36px;
  border: 1px solid transparent;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.1s;
}

.toolbar-btn:hover {
  background: #f1f5f9;
}

.toolbar-btn:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 1px;
}

.toolbar-btn[aria-pressed="true"] {
  background: #eff6ff;
  border-color: #2563eb;
  color: #2563eb;
}

/* Separador horizontal para toolbar vertical */
.toolbar-sep--h {
  width: 80%;
  height: 1px;
  background: #e2e8f0;
  margin: 2px 0;
  align-self: center;
}
```

:::

</Flavor>
<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-toolbar
  class="inline-flex flex-col items-center gap-0.5 p-1 bg-white border border-gray-200 rounded-lg w-12"
  orientation="vertical"
  label="Capas"
>
  <button
    type="button"
    aria-pressed="true"
    class="w-9 h-9 flex items-center justify-center rounded border text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 aria-pressed:bg-blue-50 aria-pressed:border-blue-500 aria-pressed:text-blue-600"
  >
    ⬆
  </button>
  <button
    type="button"
    aria-pressed="false"
    class="w-9 h-9 flex items-center justify-center rounded border border-transparent text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 aria-pressed:bg-blue-50 aria-pressed:border-blue-500 aria-pressed:text-blue-600"
  >
    ⤡
  </button>
  <button
    type="button"
    aria-pressed="false"
    class="w-9 h-9 flex items-center justify-center rounded border border-transparent text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 aria-pressed:bg-blue-50 aria-pressed:border-blue-500 aria-pressed:text-blue-600"
  >
    ↻
  </button>
  <div
    role="separator"
    aria-orientation="horizontal"
    class="w-4/5 h-px bg-gray-200 my-0.5 self-center"
  ></div>
  <button
    type="button"
    aria-pressed="false"
    class="w-9 h-9 flex items-center justify-center rounded border border-transparent text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
  >
    🔒
  </button>
  <button
    type="button"
    aria-pressed="false"
    class="w-9 h-9 flex items-center justify-center rounded border border-transparent text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
  >
    👁
  </button>
</hp-toolbar>
```

:::

</Flavor>
</CodeSnippet>

---

### Con input integrado

Un input dentro del toolbar participa en el roving tabindex como cualquier otro item. Útil para toolbars de búsqueda o filtrado con acciones adjuntas.

<div class="hp-demo-card">
  <hp-toolbar id="toolbar-input" label="Búsqueda y filtros" class="demo-tb demo-tb--gap-sm">
    <input type="search" placeholder="Buscar…" aria-label="Buscar" class="demo-tb-search" />
    <div role="separator" aria-orientation="vertical" class="demo-tb-sep"></div>
    <button type="button" aria-pressed="false" class="demo-tb-btn demo-tb-btn--sm">Nombre ↕</button>
    <button type="button" aria-pressed="false" class="demo-tb-btn demo-tb-btn--sm">Fecha ↕</button>
    <div role="separator" aria-orientation="vertical" class="demo-tb-sep"></div>
    <button type="button" id="tb-filter-btn" aria-pressed="false" class="demo-tb-btn demo-tb-btn--sm">⚙ Filtros</button>
  </hp-toolbar>
</div>

<CodeSnippet>
<Flavor only="css">

::: code-group

```html [index.html]
<hp-toolbar class="toolbar" label="Búsqueda y filtros">
  <input type="search" class="toolbar-search" placeholder="Buscar…" aria-label="Buscar" />
  <div role="separator" aria-orientation="vertical" class="toolbar-sep"></div>
  <button type="button" class="toolbar-btn" aria-pressed="false">Nombre ↕</button>
  <button type="button" class="toolbar-btn" aria-pressed="false">Fecha ↕</button>
  <div role="separator" aria-orientation="vertical" class="toolbar-sep"></div>
  <button type="button" class="toolbar-btn" id="btn-filters" aria-pressed="false">⚙ Filtros</button>
</hp-toolbar>

<script>
  const btn = document.getElementById("btn-filters");
  btn.addEventListener("click", () => {
    btn.setAttribute("aria-pressed", String(btn.getAttribute("aria-pressed") !== "true"));
  });
</script>
```

```css [style.css]
hp-toolbar.toolbar {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.toolbar-search {
  height: 30px;
  padding: 0 10px;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 13px;
  font-family: inherit;
  background: transparent;
  color: inherit;
  width: 180px;
}

.toolbar-search:focus-visible {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

.toolbar-btn {
  height: 30px;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;
  font-size: 12px;
  font-family: inherit;
  white-space: nowrap;
}

.toolbar-btn:hover {
  background: #f1f5f9;
}

.toolbar-btn:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 1px;
}

.toolbar-btn[aria-pressed="true"] {
  background: #eff6ff;
  border-color: #2563eb;
  color: #2563eb;
}

.toolbar-sep {
  width: 1px;
  height: 20px;
  background: #e2e8f0;
  margin: 0 2px;
  flex-shrink: 0;
}
```

:::

</Flavor>
<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-toolbar
  class="inline-flex items-center gap-1 px-1.5 py-1 bg-white border border-gray-200 rounded-lg"
  label="Búsqueda y filtros"
>
  <input
    type="search"
    placeholder="Buscar…"
    aria-label="Buscar"
    class="h-8 px-2.5 w-44 border border-gray-200 rounded text-sm bg-transparent focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  />
  <div
    role="separator"
    aria-orientation="vertical"
    class="w-px h-5 bg-gray-200 mx-1 shrink-0"
  ></div>
  <button
    type="button"
    aria-pressed="false"
    class="h-8 px-2.5 text-xs border border-transparent rounded whitespace-nowrap hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 aria-pressed:bg-blue-50 aria-pressed:border-blue-500 aria-pressed:text-blue-600"
  >
    Nombre ↕
  </button>
  <button
    type="button"
    aria-pressed="false"
    class="h-8 px-2.5 text-xs border border-transparent rounded whitespace-nowrap hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 aria-pressed:bg-blue-50 aria-pressed:border-blue-500 aria-pressed:text-blue-600"
  >
    Fecha ↕
  </button>
  <div
    role="separator"
    aria-orientation="vertical"
    class="w-px h-5 bg-gray-200 mx-1 shrink-0"
  ></div>
  <button
    type="button"
    id="btn-filters"
    aria-pressed="false"
    class="h-8 px-2.5 text-xs border border-transparent rounded hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 aria-pressed:bg-blue-50 aria-pressed:border-blue-500 aria-pressed:text-blue-600"
  >
    ⚙ Filtros
  </button>
</hp-toolbar>
```

:::

</Flavor>
</CodeSnippet>

## API Reference

### `hp-toolbar`

Contenedor raíz con `role="toolbar"`. Gestiona roving tabindex en todos sus items focusables e intercepta las teclas de navegación.

#### Propiedades

| Propiedad     | Tipo                           | Por defecto    | Descripción                                                                |
| :------------ | :----------------------------- | :------------- | :------------------------------------------------------------------------- |
| `orientation` | `"horizontal"` \| `"vertical"` | `"horizontal"` | Controla qué teclas de flecha navegan entre items y el `aria-orientation`. |
| `label`       | `string`                       | `"Toolbar"`    | Texto accesible para `aria-label`. Usar cuando no hay `aria-labelledby`.   |

#### Eventos

| Evento            | Cuándo se emite                                                 | `detail`                               |
| :---------------- | :-------------------------------------------------------------- | :------------------------------------- |
| `hp-focus-change` | Cada vez que la navegación por teclado mueve el foco a un item. | `{ index: number, item: HTMLElement }` |

#### Atributos ARIA

| Atributo            | Valores                       | Descripción                                                       |
| :------------------ | :---------------------------- | :---------------------------------------------------------------- |
| `role`              | `"toolbar"`                   | Asignado automáticamente en `connectedCallback`.                  |
| `aria-orientation`  | `"horizontal"` / `"vertical"` | Sincronizado con la propiedad `orientation`.                      |
| `aria-label`        | `string`                      | Sincronizado con la propiedad `label`.                            |
| `aria-labelledby`   | `string`                      | Alternativa a `aria-label`; si está presente, no se sobreescribe. |
| `data-hp-component` | `"toolbar"`                   | Identificador de componente para selectores CSS.                  |

## Teclado

| Tecla        | Acción (horizontal)             | Acción (vertical)               |
| :----------- | :------------------------------ | :------------------------------ |
| `ArrowRight` | Mueve el foco al item siguiente | —                               |
| `ArrowLeft`  | Mueve el foco al item anterior  | —                               |
| `ArrowDown`  | —                               | Mueve el foco al item siguiente |
| `ArrowUp`    | —                               | Mueve el foco al item anterior  |
| `Home`       | Mueve el foco al primer item    | Mueve el foco al primer item    |
| `End`        | Mueve el foco al último item    | Mueve el foco al último item    |
| `Tab`        | Sale del toolbar                | Sale del toolbar                |

## Accesibilidad

`hp-toolbar` implementa el patrón WAI-ARIA [Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) con las siguientes garantías:

- `role="toolbar"` con `aria-label` o `aria-labelledby` para identificar el propósito del toolbar.
- **Roving tabindex**: solo un item tiene `tabindex="0"` en cada momento. El resto tienen `tabindex="-1"`. Esto evita que el usuario tenga que hacer Tab por cada control del toolbar.
- Las teclas de flecha correctas para cada orientación navegarán secuencialmente; las flechas en la dirección opuesta no hacen nada, preservando el comportamiento esperado.
- El foco de teclado actualiza roving tabindex de forma síncrona, sin necesidad de async.
- Los separadores deben tener `role="separator"` con `aria-orientation` apropiada para comunicar la división a tecnologías asistivas.

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // --- Demo básica: toggle bold/italic/underline ---
  ;["demo-btn-bold", "demo-btn-italic", "demo-btn-underline"].forEach((id) => {
    const btn = document.getElementById(id)
    if (!btn) return
    btn.addEventListener("click", () => {
      const pressed = btn.getAttribute("aria-pressed") === "true"
      btn.setAttribute("aria-pressed", String(!pressed))
      btn.style.background = !pressed ? "color-mix(in srgb,var(--hp-accent) 10%,transparent)" : "transparent"
      btn.style.borderColor = !pressed ? "var(--hp-accent)" : "transparent"
      btn.style.color = !pressed ? "var(--hp-accent)" : ""
    })
  })

  // --- Editor con grupos: estilo (toggle) + alineación (exclusiva) ---
  ;["tb-bold", "tb-italic", "tb-underline", "tb-strike"].forEach((id) => {
    const btn = document.getElementById(id)
    if (!btn) return
    btn.addEventListener("click", () => {
      const active = btn.getAttribute("aria-pressed") === "true"
      btn.setAttribute("aria-pressed", String(!active))
      btn.style.background = !active ? "color-mix(in srgb,var(--hp-accent) 10%,transparent)" : "transparent"
      btn.style.borderColor = !active ? "var(--hp-accent)" : "transparent"
      btn.style.color = !active ? "var(--hp-accent)" : ""
    })
  })
  const alignIds = ["tb-align-left", "tb-align-center", "tb-align-right", "tb-align-justify"]
  alignIds.forEach((id) => {
    const btn = document.getElementById(id)
    if (!btn) return
    btn.addEventListener("click", () => {
      alignIds.forEach((oid) => {
        const other = document.getElementById(oid)
        if (!other) return
        other.setAttribute("aria-pressed", "false")
        other.style.background = "transparent"
        other.style.borderColor = "transparent"
        other.style.color = ""
      })
      btn.setAttribute("aria-pressed", "true")
      btn.style.background = "#eff6ff"
      btn.style.borderColor = "#2563eb"
      btn.style.color = "#2563eb"
    })
  })

  // --- Menú desplegable ---
  const triggerBtn = document.getElementById("tb-more-btn")
  const menu = document.getElementById("tb-more-menu")
  if (triggerBtn && menu) {
    const items = Array.from(menu.querySelectorAll('[role="menuitem"]'))
    const openMenu = () => {
      menu.hidden = false
      triggerBtn.setAttribute("aria-expanded", "true")
      items[0]?.focus()
    }
    const closeMenu = () => {
      menu.hidden = true
      triggerBtn.setAttribute("aria-expanded", "false")
      triggerBtn.focus()
    }
    triggerBtn.addEventListener("click", () => (menu.hidden ? openMenu() : closeMenu()))
    items.forEach((item, i) => {
      item.addEventListener("mouseover", () => { item.style.background = "var(--hp-bg-muted,var(--vp-c-bg-mute))" })
      item.addEventListener("mouseout",  () => { item.style.background = "" })
      item.addEventListener("click", closeMenu)
      item.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") { e.preventDefault(); (items[i + 1] ?? items[0]).focus() }
        if (e.key === "ArrowUp")   { e.preventDefault(); (items[i - 1] ?? items[items.length - 1]).focus() }
        if (e.key === "Escape" || e.key === "Tab") closeMenu()
      })
    })
    document.addEventListener("click", (e) => {
      if (!menu.hidden && !triggerBtn.contains(e.target) && !menu.contains(e.target)) closeMenu()
    })
  }

  // --- Tooltips en herramientas de dibujo ---
  document.querySelectorAll("#toolbar-tooltip .demo-tb-tip-wrap").forEach((wrap) => {
    const btn = wrap.querySelector("button")
    const tip = wrap.querySelector("[role='tooltip']")
    if (!btn || !tip) return
    const show = () => { tip.style.opacity = "1" }
    const hide = () => { tip.style.opacity = "0" }
    btn.addEventListener("mouseenter", show)
    btn.addEventListener("mouseleave", hide)
    btn.addEventListener("focus", show)
    btn.addEventListener("blur", hide)
    btn.addEventListener("click", () => {
      const active = btn.getAttribute("aria-pressed") === "true"
      btn.setAttribute("aria-pressed", String(!active))
      btn.style.background = !active ? "color-mix(in srgb,var(--hp-accent) 10%,transparent)" : "transparent"
      btn.style.borderColor = !active ? "var(--hp-accent)" : "transparent"
    })
  })

  // --- Búsqueda con filtros ---
  const filterBtn = document.getElementById("tb-filter-btn")
  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      const active = filterBtn.getAttribute("aria-pressed") === "true"
      filterBtn.setAttribute("aria-pressed", String(!active))
      filterBtn.style.background = !active ? "color-mix(in srgb,var(--hp-accent) 10%,transparent)" : "transparent"
      filterBtn.style.borderColor = !active ? "var(--hp-accent)" : "transparent"
      filterBtn.style.color = !active ? "var(--hp-accent)" : ""
    })
  }
  const searchInput = document.querySelector("#toolbar-input input[type='search']")
  if (searchInput) {
    searchInput.addEventListener("focus", () => {
      searchInput.style.borderColor = "var(--hp-accent)"
      searchInput.style.boxShadow = "0 0 0 2px color-mix(in srgb,var(--hp-accent) 20%,transparent)"
    })
    searchInput.addEventListener("blur", () => {
      searchInput.style.borderColor = "var(--hp-border,var(--vp-c-divider))"
      searchInput.style.boxShadow = ""
    })
  }
})
</script>
