# Navigation Menu <span class="hp-badge">Nuevo</span>

El componente `hp-navigation-menu` implementa una barra de navegación con flyouts accesibles, indicador visual animado, hover con delays inteligentes y navegación completa por teclado. Sigue el patrón [WAI-ARIA Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/).

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-navigation-menu` usando únicamente `@headless-primitives/utils/base.css`. Los flyouts, delays y navegación por teclado funcionan completamente.

<div class="hp-demo-card">
  <hp-navigation-menu aria-label="Demo Nav Bare">
    <hp-navigation-menu-list class="demo-nm-bare-list">
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
  <hp-navigation-menu aria-label="Demo Nav">
    <hp-navigation-menu-list class="nm-list">
      <hp-navigation-menu-item class="nm-item" value="products">
        <hp-navigation-menu-trigger class="nm-trigger">Productos</hp-navigation-menu-trigger>
        <hp-navigation-menu-content class="nm-content">
          <div class="demo-nm-content-body">
            <hp-navigation-menu-link class="nm-link-card">Componentes</hp-navigation-menu-link>
            <hp-navigation-menu-link class="nm-link-card">Templates</hp-navigation-menu-link>
          </div>
        </hp-navigation-menu-content>
      </hp-navigation-menu-item>
      <hp-navigation-menu-item class="nm-item" value="docs">
        <hp-navigation-menu-trigger class="nm-trigger">Docs</hp-navigation-menu-trigger>
        <hp-navigation-menu-content class="nm-content">
          <div class="demo-nm-content-body">
            <hp-navigation-menu-link class="nm-link-card">Guía</hp-navigation-menu-link>
            <hp-navigation-menu-link class="nm-link-card">API Reference</hp-navigation-menu-link>
          </div>
        </hp-navigation-menu-content>
      </hp-navigation-menu-item>
      <hp-navigation-menu-item class="nm-item" value="about">
        <hp-navigation-menu-link class="nm-trigger demo-nm-plain-link">About</hp-navigation-menu-link>
      </hp-navigation-menu-item>
    </hp-navigation-menu-list>
    <hp-navigation-menu-indicator class="nm-indicator"></hp-navigation-menu-indicator>
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
