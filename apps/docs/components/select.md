# Select <span class="hp-badge">Nuevo</span>

El componente `hp-select` implementa el patrón [WAI-ARIA Select-only Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/), con popup anchored, navegación completa por teclado, roving tabindex y soporte nativo de formularios HTML.

## Demostración

### Sin estilos (solo base.css)

<div class="hp-demo-card">
  <hp-select>
    <hp-select-trigger>
      <hp-select-value></hp-select-value>
    </hp-select-trigger>
    <hp-select-content>
      <hp-select-item value="apple">Apple</hp-select-item>
      <hp-select-item value="banana">Banana</hp-select-item>
      <hp-select-item value="cherry">Cherry</hp-select-item>
    </hp-select-content>
  </hp-select>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-select class="demo-select" placeholder="Selecciona una fruta">
    <hp-select-trigger class="demo-trigger">
      <hp-select-value class="demo-value"></hp-select-value>
      <span class="demo-icon">▼</span>
    </hp-select-trigger>
    <hp-select-content class="demo-content">
      <hp-select-item value="apple">🍎 Apple</hp-select-item>
      <hp-select-item value="banana">🍌 Banana</hp-select-item>
      <hp-select-item value="cherry">🍒 Cherry</hp-select-item>
      <hp-select-item value="date" disabled>📅 Date (deshabilitado)</hp-select-item>
      <hp-select-item value="elderberry">🫐 Elderberry</hp-select-item>
    </hp-select-content>
  </hp-select>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-select name="fruit" placeholder="Elige una fruta">
  <hp-select-trigger>
    <hp-select-value></hp-select-value>
    <span aria-hidden="true">▼</span>
  </hp-select-trigger>
  <hp-select-content>
    <hp-select-item value="apple">Manzana</hp-select-item>
    <hp-select-item value="banana">Plátano</hp-select-item>
    <hp-select-item value="date" disabled>Dátil</hp-select-item>
  </hp-select-content>
</hp-select>
```

```css [style.css]
hp-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
}

hp-select-trigger[aria-expanded="true"] {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

hp-select-content[data-state="closed"] {
  display: none;
}

hp-select-item[aria-selected="true"] {
  background: #eff6ff;
  color: #3b82f6;
  font-weight: 500;
}

hp-select-item[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-select name="fruit" placeholder="Elige una fruta" class="w-full max-w-xs">
  <hp-select-trigger
    class="flex items-center justify-between gap-2 w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-md cursor-pointer hover:border-blue-500"
  >
    <hp-select-value class="flex-1 truncate"></hp-select-value>
    <span aria-hidden="true">▼</span>
  </hp-select-trigger>
  <hp-select-content
    class="absolute z-50 min-w-full max-h-48 overflow-y-auto mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
  >
    <hp-select-item value="apple" class="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
      >Manzana</hp-select-item
    >
    <hp-select-item value="banana" class="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
      >Plátano</hp-select-item
    >
  </hp-select-content>
</hp-select>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/select
```

```bash [npm]
npm install @headless-primitives/select
```

```bash [yarn]
yarn add @headless-primitives/select
```

```bash [bun]
bun add @headless-primitives/select
```

:::

## Features

- ⌨️ Navegación completa: flechas, `Home`, `End`, `Escape`, `Enter`/`Space`.
- ♿️ `role="combobox"`, `role="listbox"`, `role="option"`, `aria-expanded` y `aria-selected` automáticos.
- 🎨 Sin estilos visuales (Headless) — posicionamiento computado automático.
- 📋 Integración con formularios HTML via `<input type="hidden">` generado.
- 🔒 Items deshabilitados individualmente.

## Anatomía

```html
<hp-select>
  <hp-select-trigger>
    <hp-select-value></hp-select-value>
  </hp-select-trigger>
  <hp-select-content>
    <hp-select-item value="option-1"></hp-select-item>
    <hp-select-item value="option-2"></hp-select-item>
  </hp-select-content>
</hp-select>
```

## API Reference

### `hp-select`

Contenedor raíz con gestión de estado y formularios.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo             | Por Defecto | Descripción                              |
| -------------------- | ---------------- | ----------- | ---------------------------------------- |
| `value`              | `string \| null` | `null`      | Valor seleccionado.                      |
| `open`               | `boolean`        | `false`     | Estado abierto/cerrado.                  |
| `disabled`           | `boolean`        | `false`     | Deshabilita el select.                   |
| `name`               | `string`         | `""`        | Nombre para integración con formularios. |
| `placeholder`        | `string`         | `""`        | Texto cuando no hay selección.           |
| `required`           | `boolean`        | `false`     | Campo requerido en formularios.          |

#### Métodos

| Método              | Descripción                                    |
| ------------------- | ---------------------------------------------- |
| `openSelect(edge?)` | Abre el select. `edge`: `"first"` \| `"last"`. |
| `close()`           | Cierra el select y devuelve foco al trigger.   |
| `toggle()`          | Alterna abierto/cerrado.                       |
| `select(value)`     | Selecciona un item por valor.                  |
| `clear()`           | Limpia la selección (`value = null`).          |

#### Eventos

| Evento         | Detalle                  | Descripción                            |
| -------------- | ------------------------ | -------------------------------------- |
| `hp-change`    | `{ value, label, item }` | Cuando el usuario selecciona un item.  |
| `hp-highlight` | `{ value, label, item }` | Cuando un item se destaca con teclado. |
| `hp-open`      | —                        | Cuando el popup se abre.               |
| `hp-close`     | —                        | Cuando el popup se cierra.             |

### `hp-select-trigger`

Botón que abre/cierra el popup.

#### Atributos ARIA gestionados automáticamente

- `role="combobox"` — Siempre presente.
- `aria-expanded` — `"true"` | `"false"`.
- `aria-disabled` — Sincronizado con `disabled`.
- `aria-controls` — ID del content.
- `aria-activedescendant` — ID del item activo.
- `tabindex="0"` — Siempre focusable.

### `hp-select-value`

Muestra el texto del valor seleccionado o placeholder.

### `hp-select-content`

Popup listbox con los items.

#### Atributos ARIA gestionados automáticamente

- `role="listbox"` — Siempre presente.
- `data-state` — `"open"` | `"closed"`.
- `aria-hidden` — Sincronizado con estado.

### `hp-select-item`

Opción individual.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción                   |
| -------------------- | --------- | ----------- | ----------------------------- |
| `value`              | `string`  | `""`        | Identificador único del item. |
| `disabled`           | `boolean` | `false`     | Deshabilita el item.          |

#### Atributos ARIA gestionados automáticamente

- `role="option"` — Siempre presente.
- `aria-selected` — `"true"` | `"false"`.
- `aria-disabled` — Sincronizado con `disabled`.

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Select-only Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).

### Navegación por teclado

| Tecla             | Acción                                                            |
| ----------------- | ----------------------------------------------------------------- |
| `Enter` / `Space` | Abre el select (trigger) o selecciona el item activo (content).   |
| `ArrowDown`       | Abre y mueve al primer item (trigger) o siguiente item (content). |
| `ArrowUp`         | Abre y mueve al último item (trigger) o anterior item (content).  |
| `Home`            | Mueve al primer item habilitado.                                  |
| `End`             | Mueve al último item habilitado.                                  |
| `Escape`          | Cierra el popup y devuelve foco al trigger.                       |

<style>
hp-select,
hp-select-trigger,
hp-select-value,
hp-select-content,
hp-select-item {
  display: block;
}
.demo-select {
  width: 100%;
  max-width: 300px;
}
.demo-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.demo-trigger:hover {
  border-color: var(--vp-c-brand-1);
}
.demo-trigger[aria-expanded="true"] {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px var(--vp-c-brand-1);
}
.demo-value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.demo-icon {
  font-size: 0.75rem;
  transition: transform 0.15s ease;
}
.demo-trigger[aria-expanded="true"] .demo-icon {
  transform: rotate(180deg);
}
.demo-content {
  position: absolute;
  z-index: 50;
  min-width: 100%;
  max-height: 12rem;
  overflow-y: auto;
  margin-top: 0.375rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.demo-content[data-state="open"] {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
hp-select-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  user-select: none;
  transition: background 0.1s ease;
}
hp-select-item:hover:not([aria-disabled="true"]) {
  background: var(--vp-c-bg-soft);
}
hp-select-item[aria-selected="true"] {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
hp-select-item[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
