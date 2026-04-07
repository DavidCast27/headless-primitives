# Select

<span class="hp-badge">Nuevo</span>

El componente `hp-select` es un primitivo que implementa el patrón WAI-ARIA **Select-only Combobox** (ListBox), permitiendo crear interfaces de selección accesibles con popup anchored, navegación por teclado completa, y soporte para valores deshabilitados. Compatible con formularios HTML nativos.

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

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-select` usando únicamente `@headless-primitives/utils/base.css`. La navegación por teclado, `aria-expanded`, `aria-selected` y la visibilidad del popup funcionan completamente.

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
  background: var(--vp-c-bg-soft);
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
.demo-trigger[data-placeholder] .demo-value {
  color: var(--vp-c-text-2);
}
.demo-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
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
  transition: opacity 0.15s ease, visibility 0.15s ease;
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
  color: var(--vp-c-text-1);
  background: transparent;
  border: none;
  cursor: pointer;
  user-select: none;
  text-align: left;
  transition: background 0.1s ease;
  min-height: 2rem;
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


@media (prefers-reduced-motion: reduce) {
  .demo-trigger,
  .demo-content,
  hp-select-item {
    transition: none;
  }
}
</style>

## Anatomía

```html
<hp-select>
  <hp-select-trigger>
    <hp-select-value></hp-select-value>
  </hp-select-trigger>
  <hp-select-content>
    <hp-select-item value="option-1">Option 1</hp-select-item>
    <hp-select-item value="option-2">Option 2</hp-select-item>
  </hp-select-content>
</hp-select>
```

## Ejemplos de Código

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-select name="fruit" placeholder="Elige una fruta">
  <hp-select-trigger id="fruit-trigger">
    <hp-select-value></hp-select-value>
    <span aria-hidden="true">▼</span>
  </hp-select-trigger>
  <hp-select-content>
    <hp-select-item value="apple">Manzana</hp-select-item>
    <hp-select-item value="banana">Plátano</hp-select-item>
    <hp-select-item value="cherry">Cereza</hp-select-item>
    <hp-select-item value="date" disabled>Dátil</hp-select-item>
  </hp-select-content>
</hp-select>
```

```css [style.css]
@import "@headless-primitives/utils/base.css";
@import "@headless-primitives/styles/select.css";

hp-select {
  width: 100%;
  max-width: 300px;
}

hp-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
}

hp-select-trigger:hover {
  border-color: #3b82f6;
  background: #f9fafb;
}

hp-select-trigger[aria-expanded="true"] {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

hp-select-content[data-state="open"] {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

hp-select-content[data-state="closed"] {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
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
    class="flex items-center justify-between gap-2 w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-md cursor-pointer hover:border-blue-500 hover:bg-gray-50 data-[aria-expanded=true]:border-blue-500 data-[aria-expanded=true]:ring-1 data-[aria-expanded=true]:ring-blue-500 transition-all"
  >
    <hp-select-value class="flex-1 truncate"></hp-select-value>
    <span
      aria-hidden="true"
      class="inline-flex items-center justify-center w-5 h-5 text-xs data-[aria-expanded=true]:rotate-180 transition-transform"
      >▼</span
    >
  </hp-select-trigger>
  <hp-select-content
    class="absolute z-50 min-w-full max-h-48 overflow-y-auto mt-1.5 bg-white border border-gray-300 rounded-md shadow-lg opacity-0 visibility-hidden pointer-events-none data-[state=open]:opacity-100 data-[state=open]:visibility-visible data-[state=open]:pointer-events-auto transition-all"
  >
    <hp-select-item
      value="apple"
      class="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 data-[aria-selected=true]:bg-blue-50 data-[aria-selected=true]:text-blue-600 data-[aria-selected=true]:font-medium data-[aria-disabled=true]:opacity-50 data-[aria-disabled=true]:cursor-not-allowed"
    >
      Manzana
    </hp-select-item>
    <hp-select-item
      value="banana"
      class="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 data-[aria-selected=true]:bg-blue-50 data-[aria-selected=true]:text-blue-600 data-[aria-selected=true]:font-medium data-[aria-disabled=true]:opacity-50 data-[aria-disabled=true]:cursor-not-allowed"
    >
      Plátano
    </hp-select-item>
    <hp-select-item
      value="cherry"
      class="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 data-[aria-selected=true]:bg-blue-50 data-[aria-selected=true]:text-blue-600 data-[aria-selected=true]:font-medium data-[aria-disabled=true]:opacity-50 data-[aria-disabled=true]:cursor-not-allowed"
    >
      Cereza
    </hp-select-item>
    <hp-select-item
      value="date"
      disabled
      class="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 data-[aria-selected=true]:bg-blue-50 data-[aria-selected=true]:text-blue-600 data-[aria-selected=true]:font-medium data-[aria-disabled=true]:opacity-50 data-[aria-disabled=true]:cursor-not-allowed"
    >
      Dátil
    </hp-select-item>
  </hp-select-content>
</hp-select>
```

:::

</Flavor>
</CodeSnippet>

## API Reference

### `hp-select`

Contenedor raíz del Select. Maneja el estado abierto/cerrado, valor seleccionado, y navegación por teclado.

#### Atributos

| Atributo      | Tipo             | Descripción                                  |
| ------------- | ---------------- | -------------------------------------------- |
| `value`       | `string \| null` | Valor actualmente seleccionado               |
| `disabled`    | `boolean`        | Deshabilita el select completamente          |
| `name`        | `string`         | Nombre para integración con formularios HTML |
| `placeholder` | `string`         | Texto de placeholder cuando no hay selección |
| `required`    | `boolean`        | Marca el campo como requerido en formularios |
| `open`        | `boolean`        | Estado abierto/cerrado del popup             |

#### Propiedades

| Propiedad           | Tipo             | Descripción                                                   |
| ------------------- | ---------------- | ------------------------------------------------------------- |
| `value`             | `string \| null` | Getter/setter del valor seleccionado                          |
| `open`              | `boolean`        | Getter/setter del estado abierto/cerrado                      |
| `openSelect(edge?)` | `method`         | Abre el select; opcionalmente mueve foco a primer/último item |
| `close()`           | `method`         | Cierra el select; devuelve foco al trigger                    |
| `toggle()`          | `method`         | Alterna entre abierto y cerrado                               |
| `select(value)`     | `method`         | Selecciona un item por valor                                  |
| `clear()`           | `method`         | Limpia la selección (value = null)                            |

#### Eventos

| Evento         | Detalle                                                                       | Descripción                                              |
| -------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------- |
| `hp-change`    | `{ value: string \| null, label: string \| null, item: HTMLElement \| null }` | Emitido cuando el usuario selecciona un item             |
| `hp-highlight` | `{ value: string \| null, label: string \| null, item: HTMLElement \| null }` | Emitido cuando el usuario destaca un item con el teclado |
| `hp-open`      | —                                                                             | Emitido cuando el popup se abre                          |
| `hp-close`     | —                                                                             | Emitido cuando el popup se cierra                        |

#### Estados ARIA

| Atributo            | Valores         | Descripción                            |
| ------------------- | --------------- | -------------------------------------- |
| `role`              | `presentation`  | No expone un rol semántico directo     |
| `aria-disabled`     | `true \| false` | Indica si el select está deshabilitado |
| `data-hp-component` | `"select"`      | Identificador de componente            |

---

### `hp-select-trigger`

Botón que abre/cierra el popup del Select. Actúa como combobox button según WAI-ARIA.

#### Atributos

| Atributo   | Tipo      | Descripción            |
| ---------- | --------- | ---------------------- |
| `disabled` | `boolean` | Deshabilita el trigger |

#### Estados ARIA

| Atributo                | Valores            | Descripción                                        |
| ----------------------- | ------------------ | -------------------------------------------------- |
| `role`                  | `combobox`         | Según W3C Select-only Combobox pattern             |
| `aria-expanded`         | `true \| false`    | Indica si el popup está abierto                    |
| `aria-disabled`         | `true \| false`    | Indica si el trigger está deshabilitado            |
| `aria-controls`         | `string`           | ID del elemento `hp-select-content`                |
| `aria-activedescendant` | `string`           | ID del item actualmente destacado (cuando abierto) |
| `data-hp-component`     | `"select-trigger"` | Identificador de componente                        |

---

### `hp-select-value`

Contenedor que muestra el texto del valor seleccionado o placeholder.

#### Atributos

Ninguno. Es un elemento de visualización puro.

#### Estados ARIA

| Atributo            | Valores          | Descripción                 |
| ------------------- | ---------------- | --------------------------- |
| `data-hp-component` | `"select-value"` | Identificador de componente |

---

### `hp-select-content`

Contenedor del popup que aloja los items. Se posiciona absolutamente debajo del trigger.

#### Atributos

Ninguno (posicionamiento gestionado por JS).

#### Estados ARIA

| Atributo                  | Valores            | Descripción                               |
| ------------------------- | ------------------ | ----------------------------------------- |
| `role`                    | `listbox`          | Según WAI-ARIA ListBox pattern            |
| `data-state`              | `open \| closed`   | Estado de visibilidad del popup           |
| `aria-hidden`             | `true \| false`    | Oculto para screen readers cuando cerrado |
| `data-hp-overlay-content` | `""`               | Marca como contenedor de overlay          |
| `data-hp-component`       | `"select-content"` | Identificador de componente               |

---

### `hp-select-item`

Opción individual dentro del Select.

#### Atributos

| Atributo   | Tipo                | Descripción                        |
| ---------- | ------------------- | ---------------------------------- |
| `value`    | `string` (required) | Identificador único del item       |
| `disabled` | `boolean`           | Deshabilita el item para selección |

#### Estados ARIA

| Atributo            | Valores         | Descripción                          |
| ------------------- | --------------- | ------------------------------------ |
| `role`              | `option`        | Según WAI-ARIA ListBox pattern       |
| `aria-selected`     | `true \| false` | Indica si el item está seleccionado  |
| `aria-disabled`     | `true \| false` | Indica si el item está deshabilitado |
| `data-hp-component` | `"select-item"` | Identificador de componente          |

---

## Comportamiento del Teclado

| Tecla                 | Contexto   | Acción                                             |
| --------------------- | ---------- | -------------------------------------------------- |
| **Enter** / **Space** | Trigger    | Abre el select; foco en primer item o seleccionado |
| **↓ ArrowDown**       | Trigger    | Abre el select; foco en primer item                |
| **↑ ArrowUp**         | Trigger    | Abre el select; foco en último item                |
| **↓ ArrowDown**       | Content    | Mueve foco al siguiente item (válido)              |
| **↑ ArrowUp**         | Content    | Mueve foco al anterior item (válido)               |
| **Home**              | Content    | Mueve foco al primer item (válido)                 |
| **End**               | Content    | Mueve foco al último item (válido)                 |
| **Enter** / **Space** | Item       | Selecciona el item y cierra el popup               |
| **Escape**            | Cualquiera | Cierra el popup; foco vuelve a trigger             |
| **Typeahead**         | Content    | Salta al próximo item que comienza con el carácter |

## Integración con Formularios

El Select genera automáticamente un `<input type="hidden">` interno para integración con formularios HTML nativos:

```html
<form>
  <hp-select name="fruit">
    <hp-select-trigger>
      <hp-select-value></hp-select-value>
    </hp-select-trigger>
    <hp-select-content>
      <hp-select-item value="apple">Apple</hp-select-item>
      <hp-select-item value="banana">Banana</hp-select-item>
    </hp-select-content>
  </hp-select>
  <button type="submit">Enviar</button>
</form>

<script>
  const select = document.querySelector("hp-select");
  select.addEventListener("hp-change", (e) => {
    console.log("Nuevo valor:", e.detail.value);
  });
</script>
```

## Accesibilidad

- ✅ Implementa WAI-ARIA **Select-only Combobox** pattern
- ✅ Navegación completa por teclado (Enter, Space, Arrows, Escape, Typeahead)
- ✅ Roles ARIA correctos: `combobox` (trigger), `listbox` (content), `option` (items)
- ✅ Focus management automático
- ✅ Atributos `aria-expanded`, `aria-selected`, `aria-disabled`
- ✅ Indicador visual de foco (`outline-2`)
- ✅ Soporte para `prefers-reduced-motion`
