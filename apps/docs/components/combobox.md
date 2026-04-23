# Combobox <span class="hp-badge">Nuevo</span>

El componente `hp-combobox` implementa el patrón [WAI-ARIA Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) con filtrado en tiempo real, popup anchored y navegación completa por teclado.

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-combobox` usando únicamente `@headless-primitives/utils/base.css`. El filtrado, la navegación por teclado y la gestión de estados funcionan completamente sin estilos adicionales.

<div class="hp-demo-card">
  <hp-combobox placeholder="Busca una fruta...">
    <hp-combobox-input><input type="text" placeholder="Escribe para filtrar..." /></hp-combobox-input>
    <hp-combobox-content>
      <hp-combobox-option value="apple">Apple</hp-combobox-option>
      <hp-combobox-option value="banana">Banana</hp-combobox-option>
      <hp-combobox-option value="cherry">Cherry</hp-combobox-option>
    </hp-combobox-content>
  </hp-combobox>
</div>

### Con estilos personalizados

El componente estilizado usando clases CSS y variables de tema.

<div class="hp-demo-card">
  <hp-combobox placeholder="Busca una fruta..." class="demo-combobox">
    <hp-combobox-input class="demo-combobox-input">
      <input type="text" placeholder="Busca una fruta..." />
    </hp-combobox-input>
    <hp-combobox-content class="demo-combobox-content">
      <hp-combobox-option value="apple" class="demo-combobox-option">🍎 Apple</hp-combobox-option>
      <hp-combobox-option value="banana" class="demo-combobox-option">🍌 Banana</hp-combobox-option>
      <hp-combobox-option value="cherry" class="demo-combobox-option">🍒 Cherry</hp-combobox-option>
      <hp-combobox-option value="date" class="demo-combobox-option" disabled>📅 Date (deshabilitado)</hp-combobox-option>
      <hp-combobox-option value="elderberry" class="demo-combobox-option">🫐 Elderberry</hp-combobox-option>
    </hp-combobox-content>
  </hp-combobox>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-combobox placeholder="Busca...">
  <hp-combobox-input>
    <input type="text" placeholder="Escribe aquí..." />
  </hp-combobox-input>
  <hp-combobox-content class="my-content">
    <hp-combobox-option value="apple">Apple</hp-combobox-option>
    <hp-combobox-option value="banana">Banana</hp-combobox-option>
  </hp-combobox-content>
</hp-combobox>
```

```css [style.css]
hp-combobox-content[data-state="closed"] {
  display: none;
}
hp-combobox-option[data-state="hidden"] {
  display: none;
}
hp-combobox-option[aria-selected="true"] {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
hp-combobox-option[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-combobox placeholder="Busca..." class="w-full max-w-xs relative">
  <hp-combobox-input>
    <input
      type="text"
      class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
    />
  </hp-combobox-input>
  <hp-combobox-content
    class="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg data-[state=closed]:hidden"
  >
    <hp-combobox-option
      value="apple"
      class="px-3 py-2 cursor-pointer hover:bg-gray-100 aria-selected:bg-blue-50"
    >
      Apple
    </hp-combobox-option>
  </hp-combobox-content>
</hp-combobox>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/combobox
```

```bash [npm]
npm install @headless-primitives/combobox
```

```bash [yarn]
yarn add @headless-primitives/combobox
```

```bash [bun]
bun add @headless-primitives/combobox
```

:::

## Features

- ⌨️ Soporte completo de navegación por teclado (flechas, Enter, Escape, Home, End).
- ♿️ Accesibilidad WAI-ARIA incorporada (`role="combobox"`, `aria-autocomplete`, `aria-activedescendant`).
- 🎨 Sin estilos visuales (Headless) — posicionamiento computado automático.
- 🔍 Filtrado en tiempo real basado en el input del usuario.
- 🔒 Soporte para opciones deshabilitadas y estados de carga.

## Anatomía

```html
<hp-combobox>
  <hp-combobox-input>
    <input type="text" />
  </hp-combobox-input>
  <hp-combobox-content>
    <hp-combobox-option value="opt1"></hp-combobox-option>
    <hp-combobox-option value="opt2"></hp-combobox-option>
  </hp-combobox-content>
</hp-combobox>
```

## API Reference

### `hp-combobox`

Contenedor raíz con filtrado y gestión de estado.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo             | Por Defecto | Descripción              |
| -------------------- | ---------------- | ----------- | ------------------------ |
| `value`              | `string \| null` | `null`      | Valor seleccionado.      |
| `open`               | `boolean`        | `false`     | Estado abierto/cerrado.  |
| `disabled`           | `boolean`        | `false`     | Deshabilita el combobox. |
| `placeholder`        | `string`         | `""`        | Placeholder del input.   |

#### Métodos

| Método                | Descripción                                   |
| --------------------- | --------------------------------------------- |
| `openCombobox(edge?)` | Abre el popup. `edge`: `"first"` \| `"last"`. |
| `close()`             | Cierra el popup y devuelve foco al input.     |
| `toggle()`            | Alterna abierto/cerrado.                      |
| `select(value)`       | Selecciona una opción por valor.              |
| `clear()`             | Limpia la selección y el input.               |

#### Eventos

| Evento         | Detalle                  | Descripción                               |
| -------------- | ------------------------ | ----------------------------------------- |
| `hp-change`    | `{ value, label, item }` | Cuando se selecciona una opción.          |
| `hp-highlight` | `{ value, label, item }` | Cuando se destaca una opción con teclado. |
| `hp-open`      | —                        | Cuando el popup se abre.                  |
| `hp-close`     | —                        | Cuando el popup se cierra.                |

### `hp-combobox-input`

Wrapper del input nativo. Gestiona la vinculación ARIA con el listbox.

#### Atributos ARIA gestionados automáticamente (en el `<input>` interno)

- `role="combobox"` — Identifica el elemento como un combobox.
- `aria-expanded` — Sincronizado con el estado abierto/cerrado.
- `aria-autocomplete="list"` — Indica que el combobox ofrece una lista de sugerencias.
- `aria-controls` — Vincula el input con el `hp-combobox-content`.
- `aria-activedescendant` — ID de la opción actualmente destacada.

### `hp-combobox-content`

Popup listbox que contiene las opciones filtrables.

#### Atributos ARIA gestionados automáticamente

- `role="listbox"` — Identifica el contenedor como una lista de opciones.
- `data-state` — `"open"` | `"closed"` para estilizado CSS.
- `aria-hidden` — Sincronizado con la visibilidad.

### `hp-combobox-option`

Opción individual dentro del listbox.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción                       |
| -------------------- | --------- | ----------- | --------------------------------- |
| `value`              | `string`  | `""`        | Identificador único de la opción. |
| `disabled`           | `boolean` | `false`     | Deshabilita la opción.            |

#### Atributos ARIA gestionados automáticamente

- `role="option"` — Identifica el elemento como una opción de lista.
- `aria-selected` — Sincronizado con el estado de selección.
- `aria-disabled` — Refleja el estado deshabilitado.
- `data-state` — `"visible"` | `"hidden"` basado en el filtrado.

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).

### Navegación por teclado

| Tecla             | Acción                                               |
| ----------------- | ---------------------------------------------------- |
| `ArrowDown`       | Abre el popup o mueve el foco a la siguiente opción. |
| `ArrowUp`         | Abre el popup o mueve el foco a la opción anterior.  |
| `Home`            | Mueve el foco a la primera opción.                   |
| `End`             | Mueve el foco a la última opción.                    |
| `Enter`           | Selecciona la opción destacada y cierra el popup.    |
| `Escape`          | Cierra el popup y devuelve el foco al input.         |
| `Cualquier texto` | Filtra las opciones disponibles en el listbox.       |

<style>
/* Reset estructural */
hp-combobox,
hp-combobox-input,
hp-combobox-content,
hp-combobox-option {
  display: block;
}

.demo-combobox {
  width: 100%;
  max-width: 320px;
  position: relative;
}

.demo-combobox-input input {
  width: 100%;
  padding: 0.625rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.demo-combobox-input input:focus {
  border-color: var(--vp-c-brand-1);
  outline: none;
}

.demo-combobox-content {
  position: absolute;
  z-index: 50;
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
  margin-top: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 4px;
}

.demo-combobox-content[data-state="closed"] {
  display: none;
}

.demo-combobox-option {
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.15s;
}

.demo-combobox-option:hover:not([aria-disabled="true"]) {
  background: var(--vp-c-bg-mute);
}

.demo-combobox-option[aria-selected="true"] {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.demo-combobox-option[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}

.demo-combobox-option[data-state="hidden"] {
  display: none;
}
</style>
