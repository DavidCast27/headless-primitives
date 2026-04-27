# Dropdown Menu <span class="hp-badge">Nuevo</span>

El componente `hp-dropdown-menu` muestra un menú de acciones al hacer clic en un trigger. Implementa el patrón [WAI-ARIA Menu Button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) con popup anchored, roving tabindex y separadores.

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-dropdown-menu` usando únicamente `@headless-primitives/utils/base.css`. El trigger, navegación por teclado y visibilidad funcionan completamente.

<div class="hp-demo-card">
  <hp-dropdown-menu>
    <hp-dropdown-menu-trigger><button>Opciones (sin estilos)</button></hp-dropdown-menu-trigger>
    <hp-dropdown-menu-content>
      <hp-dropdown-menu-item value="1">Opción 1</hp-dropdown-menu-item>
      <hp-dropdown-menu-item value="2">Opción 2</hp-dropdown-menu-item>
    </hp-dropdown-menu-content>
  </hp-dropdown-menu>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-dropdown-menu class="demo-dropdown-menu">
    <hp-dropdown-menu-trigger class="demo-dm-trigger">Opciones ▼</hp-dropdown-menu-trigger>
    <hp-dropdown-menu-content class="demo-dm-content">
      <hp-dropdown-menu-label>Cuenta</hp-dropdown-menu-label>
      <hp-dropdown-menu-item value="profile">👤 Perfil</hp-dropdown-menu-item>
      <hp-dropdown-menu-item value="settings">⚙️ Ajustes</hp-dropdown-menu-item>
      <hp-dropdown-menu-separator></hp-dropdown-menu-separator>
      <hp-dropdown-menu-item value="logout">🚪 Cerrar sesión</hp-dropdown-menu-item>
    </hp-dropdown-menu-content>
  </hp-dropdown-menu>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-dropdown-menu>
  <hp-dropdown-menu-trigger class="trigger">Opciones ▼</hp-dropdown-menu-trigger>
  <hp-dropdown-menu-content class="content">
    <hp-dropdown-menu-item value="profile">Perfil</hp-dropdown-menu-item>
    <hp-dropdown-menu-item value="settings">Ajustes</hp-dropdown-menu-item>
    <hp-dropdown-menu-separator></hp-dropdown-menu-separator>
    <hp-dropdown-menu-item value="logout">Cerrar sesión</hp-dropdown-menu-item>
  </hp-dropdown-menu-content>
</hp-dropdown-menu>
```

```css [style.css]
hp-dropdown-menu-content[data-state="closed"] {
  display: none;
}
hp-dropdown-menu-content[data-state="open"] {
  position: absolute;
  min-width: 160px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 4px 0;
  z-index: 50;
}
hp-dropdown-menu-item {
  padding: 6px 12px;
  cursor: pointer;
}
hp-dropdown-menu-item:hover {
  background: #f3f4f6;
}
hp-dropdown-menu-separator {
  height: 1px;
  background: #e5e7eb;
  margin: 4px 0;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-dropdown-menu>
  <hp-dropdown-menu-trigger class="px-4 py-2 border rounded-md cursor-pointer"
    >Opciones ▼</hp-dropdown-menu-trigger
  >
  <hp-dropdown-menu-content
    class="absolute z-50 min-w-[160px] bg-white border rounded-md shadow-lg py-1 data-[state=closed]:hidden"
  >
    <hp-dropdown-menu-item value="profile" class="px-3 py-1.5 cursor-pointer hover:bg-gray-100"
      >Perfil</hp-dropdown-menu-item
    >
    <hp-dropdown-menu-item value="settings" class="px-3 py-1.5 cursor-pointer hover:bg-gray-100"
      >Ajustes</hp-dropdown-menu-item
    >
  </hp-dropdown-menu-content>
</hp-dropdown-menu>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/dropdown-menu
```

```bash [npm]
npm install @headless-primitives/dropdown-menu
```

```bash [yarn]
yarn add @headless-primitives/dropdown-menu
```

```bash [bun]
bun add @headless-primitives/dropdown-menu
```

:::

## Features

- ⌨️ `Enter`/`Space`, flechas, `Home`, `End`, `Escape`, `Tab`.
- ♿️ `role="button"` + `aria-haspopup="menu"` en trigger, `role="menu"` + `role="menuitem"` automáticos.
- 🎨 Sin estilos visuales (Headless) — posicionamiento computado automático.
- 📏 Separadores y labels de sección disponibles.
- 🔒 Items deshabilitables individualmente.

## Anatomía

```html
<hp-dropdown-menu>
  <hp-dropdown-menu-trigger></hp-dropdown-menu-trigger>
  <hp-dropdown-menu-content>
    <hp-dropdown-menu-label></hp-dropdown-menu-label>
    <hp-dropdown-menu-item value="action1"></hp-dropdown-menu-item>
    <hp-dropdown-menu-separator></hp-dropdown-menu-separator>
    <hp-dropdown-menu-item value="action2"></hp-dropdown-menu-item>
  </hp-dropdown-menu-content>
</hp-dropdown-menu>
```

## API Reference

### `hp-dropdown-menu`

Contenedor raíz.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción             |
| -------------------- | --------- | ----------- | ----------------------- |
| `open`               | `boolean` | `false`     | Estado abierto/cerrado. |
| `disabled`           | `boolean` | `false`     | Deshabilita el menú.    |

#### Métodos

| Método            | Descripción                                  |
| ----------------- | -------------------------------------------- |
| `openMenu(edge?)` | Abre el menú. `edge`: `"first"` \| `"last"`. |
| `close()`         | Cierra y devuelve foco al trigger.           |
| `toggle()`        | Alterna abierto/cerrado.                     |

#### Eventos

| Evento         | Detalle                  | Descripción                            |
| -------------- | ------------------------ | -------------------------------------- |
| `hp-select`    | `{ value, label, item }` | Cuando se activa un item.              |
| `hp-highlight` | `{ value, label, item }` | Cuando un item se destaca con teclado. |
| `hp-open`      | —                        | El menú se abre.                       |
| `hp-close`     | —                        | El menú se cierra.                     |

### `hp-dropdown-menu-trigger`

Botón que abre/cierra el menú.

#### Atributos ARIA gestionados automáticamente

- `role="button"` — Siempre presente.
- `aria-haspopup="menu"` — Siempre presente.
- `aria-expanded` — `"true"` | `"false"`.
- `aria-disabled` — Sincronizado con `disabled`.
- `aria-controls` — ID del content.
- `tabindex="0"`.

### `hp-dropdown-menu-content`

Popup del menú.

#### Atributos ARIA gestionados automáticamente

- `role="menu"` — Siempre presente.
- `data-state` — `"open"` | `"closed"`.
- `aria-hidden` — Sincronizado con estado.

### `hp-dropdown-menu-item`

Item de acción.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción             |
| -------------------- | --------- | ----------- | ----------------------- |
| `value`              | `string`  | `""`        | Identificador del item. |
| `disabled`           | `boolean` | `false`     | Deshabilita el item.    |

#### Atributos ARIA gestionados automáticamente

- `role="menuitem"` — Siempre presente.
- `aria-disabled` — Sincronizado con `disabled`.

### `hp-dropdown-menu-separator`

Separator visual (`role="separator"`).

### `hp-dropdown-menu-label`

Label de sección (`role="presentation"`).

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Menu Button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/).

### Navegación por teclado

| Tecla             | Acción                                                      |
| ----------------- | ----------------------------------------------------------- |
| `Enter` / `Space` | Abre el menú (trigger) o activa el item (content).          |
| `ArrowDown`       | Abre y foco en primer item (trigger) o siguiente (content). |
| `ArrowUp`         | Abre y foco en último item (trigger) o anterior (content).  |
| `Home`            | Primer item.                                                |
| `End`             | Último item.                                                |
| `Escape`          | Cierra y foco al trigger.                                   |
| `Tab`             | Cierra el menú.                                             |
