# Navigation Menu <span class="hp-badge">Nuevo</span>

El componente `hp-navigation-menu` implementa una barra de navegación con flyouts accesibles, indicador visual animado, hover con delays inteligentes y navegación completa por teclado. Sigue el patrón [WAI-ARIA Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/).

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-navigation-menu` usando únicamente `@headless-primitives/utils/base.css`. Los flyouts, delays y navegación por teclado funcionan completamente.

<div class="hp-demo-card">
  <hp-navigation-menu aria-label="Demo Nav Bare">
    <hp-navigation-menu-list style="display: flex; gap: 1rem; list-style: none; padding: 0;">
      <hp-navigation-menu-item value="1">
        <hp-navigation-menu-trigger><button>Menú 1</button></hp-navigation-menu-trigger>
        <hp-navigation-menu-content>Contenido 1</hp-navigation-menu-content>
      </hp-navigation-menu-item>
      <hp-navigation-menu-item value="2">
        <hp-navigation-menu-trigger><button>Menú 2</button></hp-navigation-menu-trigger>
        <hp-navigation-menu-content>Contenido 2</hp-navigation-menu-content>
      </hp-navigation-menu-item>
    </hp-navigation-menu-list>
  </hp-navigation-menu>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-navigation-menu class="demo-nav" aria-label="Demo Nav">
    <hp-navigation-menu-list class="demo-nav-list">
      <hp-navigation-menu-item value="products">
        <hp-navigation-menu-trigger class="demo-nav-trigger">Productos</hp-navigation-menu-trigger>
        <hp-navigation-menu-content class="demo-nav-content">
          <div style="padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <hp-navigation-menu-link class="demo-nav-link">Componentes</hp-navigation-menu-link>
            <hp-navigation-menu-link class="demo-nav-link">Templates</hp-navigation-menu-link>
          </div>
        </hp-navigation-menu-content>
      </hp-navigation-menu-item>
      <hp-navigation-menu-item value="docs">
        <hp-navigation-menu-trigger class="demo-nav-trigger">Docs</hp-navigation-menu-trigger>
        <hp-navigation-menu-content class="demo-nav-content">
          <div style="padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <hp-navigation-menu-link class="demo-nav-link">Guía</hp-navigation-menu-link>
            <hp-navigation-menu-link class="demo-nav-link">API Reference</hp-navigation-menu-link>
          </div>
        </hp-navigation-menu-content>
      </hp-navigation-menu-item>
      <hp-navigation-menu-item value="about">
        <hp-navigation-menu-link class="demo-nav-trigger" style="cursor: pointer;">About</hp-navigation-menu-link>
      </hp-navigation-menu-item>
    </hp-navigation-menu-list>
    <hp-navigation-menu-indicator class="demo-nav-indicator"></hp-navigation-menu-indicator>
  </hp-navigation-menu>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-navigation-menu aria-label="Main">
  <hp-navigation-menu-list>
    <hp-navigation-menu-item value="products">
      <hp-navigation-menu-trigger>Productos</hp-navigation-menu-trigger>
      <hp-navigation-menu-content>
        <hp-navigation-menu-link>Componentes</hp-navigation-menu-link>
        <hp-navigation-menu-link>Templates</hp-navigation-menu-link>
      </hp-navigation-menu-content>
    </hp-navigation-menu-item>
    <hp-navigation-menu-item value="about">
      <hp-navigation-menu-link>About</hp-navigation-menu-link>
    </hp-navigation-menu-item>
  </hp-navigation-menu-list>
  <hp-navigation-menu-indicator></hp-navigation-menu-indicator>
</hp-navigation-menu>
```

```css [style.css]
hp-navigation-menu-content[data-state="closed"] {
  display: none;
}
hp-navigation-menu-content[data-state="open"] {
  position: absolute;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
hp-navigation-menu-indicator[data-state="hidden"] {
  opacity: 0;
}
hp-navigation-menu-indicator[data-state="visible"] {
  position: absolute;
  bottom: 0;
  height: 2px;
  background: #3b82f6;
  transition:
    left 0.2s,
    width 0.2s;
}
```

:::

</Flavor>

</CodeSnippet>

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

## Features

- ⌨️ Flechas (`ArrowLeft`/`Right`), `Enter`/`Space`, `Escape`, `Tab`.
- ♿️ `role="navigation"`, `role="menubar"`, `aria-expanded`, `aria-controls` automáticos.
- 🎨 Sin estilos visuales (Headless).
- ⏱️ Delays configurables para open/close en hover.
- 📌 Indicador visual posicionado bajo el trigger activo.
- 🔗 Links con `aria-current="page"` para la ruta activa.

## Anatomía

```html
<hp-navigation-menu>
  <hp-navigation-menu-list>
    <hp-navigation-menu-item value="section">
      <hp-navigation-menu-trigger></hp-navigation-menu-trigger>
      <hp-navigation-menu-content>
        <hp-navigation-menu-link></hp-navigation-menu-link>
      </hp-navigation-menu-content>
    </hp-navigation-menu-item>
  </hp-navigation-menu-list>
  <hp-navigation-menu-indicator></hp-navigation-menu-indicator>
</hp-navigation-menu>
```

## API Reference

### `hp-navigation-menu`

Contenedor raíz de la navegación.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo     | Por Defecto | Descripción                            |
| -------------------- | -------- | ----------- | -------------------------------------- |
| `value`              | `string` | `""`        | Valor del item abierto actualmente.    |
| `delay`              | `number` | `50`        | Delay en ms al abrir por hover.        |
| `close-delay`        | `number` | `300`       | Delay en ms al cerrar por mouse leave. |

#### Métodos

| Método              | Descripción                       |
| ------------------- | --------------------------------- |
| `open(itemValue)`   | Abre el flyout del item.          |
| `close()`           | Cierra el flyout activo.          |
| `toggle(itemValue)` | Alterna abierto/cerrado del item. |

#### Eventos

| Evento     | Detalle             | Descripción                 |
| ---------- | ------------------- | --------------------------- |
| `hp-open`  | `{ value: string }` | Cuando se abre un flyout.   |
| `hp-close` | `{ value: string }` | Cuando se cierra un flyout. |

#### Atributos ARIA gestionados automáticamente

- `role="navigation"` — Siempre presente.
- `aria-label` — `"Main"` por defecto.

### `hp-navigation-menu-list`

Lista de items.

#### Atributos ARIA gestionados automáticamente

- `role="menubar"` — Siempre presente.
- `aria-orientation="horizontal"` — Siempre presente.

### `hp-navigation-menu-item`

Item de navegación.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo     | Por Defecto | Descripción             |
| -------------------- | -------- | ----------- | ----------------------- |
| `value`              | `string` | `""`        | Identificador del item. |

### `hp-navigation-menu-trigger`

Botón que abre un flyout.

#### Atributos ARIA gestionados automáticamente

- `role="button"` — Siempre presente.
- `aria-haspopup="true"` — Siempre presente.
- `aria-expanded` — Sincronizado con estado.
- `aria-controls` — ID del content.

### `hp-navigation-menu-content`

Flyout panel.

#### Atributos ARIA gestionados automáticamente

- `role="region"` — Siempre presente.
- `data-state` — `"open"` | `"closed"`.
- `aria-hidden` — Sincronizado con estado.

### `hp-navigation-menu-link`

Link de navegación.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción             |
| -------------------- | --------- | ----------- | ----------------------- |
| `active`             | `boolean` | `false`     | Marca como ruta activa. |

#### Atributos ARIA gestionados automáticamente

- `aria-current="page"` — Presente cuando `active` es `true`.
- `data-active` — Presente cuando `active` es `true`.

### `hp-navigation-menu-indicator`

Indicador visual posicionado bajo el trigger activo.

#### Atributos ARIA gestionados automáticamente

- `aria-hidden="true"` — Siempre presente.
- `data-state` — `"visible"` | `"hidden"` | `"idle"`.

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/).

### Navegación por teclado

| Tecla             | Acción                                      |
| ----------------- | ------------------------------------------- |
| `Enter` / `Space` | Abre/cierra el flyout del trigger activo.   |
| `ArrowRight`      | Foco al siguiente trigger.                  |
| `ArrowLeft`       | Foco al trigger anterior.                   |
| `Escape`          | Cierra el flyout y foco al trigger.         |
| `Tab`             | Cierra el flyout y avanza foco normalmente. |

<style>
hp-navigation-menu,
hp-navigation-menu-list,
hp-navigation-menu-item,
hp-navigation-menu-trigger,
hp-navigation-menu-content,
hp-navigation-menu-link,
hp-navigation-menu-indicator {
  display: block;
}
.demo-nav { position: relative; }
.demo-nav-list { display: flex; gap: 0; align-items: center; }
.demo-nav-trigger {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background: transparent;
  color: var(--vp-c-text-1);
}
.demo-nav-trigger:hover { color: var(--vp-c-brand-1); }
.demo-nav-trigger[data-state="open"] { color: var(--vp-c-brand-1); }
.demo-nav-content {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 50;
}
.demo-nav-content[data-state="closed"] { display: none; }
.demo-nav-link {
  padding: 0.4rem 0;
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}
.demo-nav-link:hover { color: var(--vp-c-brand-1); }
.demo-nav-indicator {
  position: absolute;
  bottom: 0;
  height: 2px;
  background: var(--vp-c-brand-1);
  transition: left 0.2s ease, width 0.2s ease;
}
.demo-nav-indicator[data-state="hidden"],
.demo-nav-indicator[data-state="idle"] { opacity: 0; }
.demo-nav-indicator[data-state="visible"] { opacity: 1; }
</style>
