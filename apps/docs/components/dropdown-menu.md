# Dropdown Menu

<span class="hp-badge">Nuevo</span>

El componente `hp-dropdown-menu` es un primitivo que implementa el patron WAI-ARIA **Menu Button**, permitiendo crear menus de acciones accesibles con popup anclado, navegacion por teclado completa, separadores y labels de grupo. A diferencia de Select, este componente no es un control de formulario — los items disparan acciones.

## Instalacion

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

## Demostracion

### Sin estilos (solo base.css)

Asi se ve `hp-dropdown-menu` usando unicamente `@headless-primitives/utils/base.css`. La navegacion por teclado, `aria-expanded`, `aria-haspopup` y la visibilidad del popup funcionan completamente.

<div class="hp-demo-card">
  <hp-dropdown-menu>
    <hp-dropdown-menu-trigger>Actions</hp-dropdown-menu-trigger>
    <hp-dropdown-menu-content>
      <hp-dropdown-menu-item value="copy">Copy</hp-dropdown-menu-item>
      <hp-dropdown-menu-item value="paste">Paste</hp-dropdown-menu-item>
      <hp-dropdown-menu-item value="delete">Delete</hp-dropdown-menu-item>
    </hp-dropdown-menu-content>
  </hp-dropdown-menu>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-dropdown-menu class="demo-dm">
    <hp-dropdown-menu-trigger class="demo-dm-trigger">
      Actions ▾
    </hp-dropdown-menu-trigger>
    <hp-dropdown-menu-content class="demo-dm-content">
      <hp-dropdown-menu-label>Edit</hp-dropdown-menu-label>
      <hp-dropdown-menu-item value="cut">✂️ Cut</hp-dropdown-menu-item>
      <hp-dropdown-menu-item value="copy">📋 Copy</hp-dropdown-menu-item>
      <hp-dropdown-menu-item value="paste">📌 Paste</hp-dropdown-menu-item>
      <hp-dropdown-menu-separator></hp-dropdown-menu-separator>
      <hp-dropdown-menu-label>Danger Zone</hp-dropdown-menu-label>
      <hp-dropdown-menu-item value="delete">����️ Delete</hp-dropdown-menu-item>
      <hp-dropdown-menu-item value="archive" disabled>📦 Archive (deshabilitado)</hp-dropdown-menu-item>
    </hp-dropdown-menu-content>
  </hp-dropdown-menu>
</div>

<style>
hp-dropdown-menu,
hp-dropdown-menu-trigger,
hp-dropdown-menu-content,
hp-dropdown-menu-item,
hp-dropdown-menu-separator,
hp-dropdown-menu-label {
  display: block;
}
.demo-dm {
  position: relative;
  display: inline-block;
}
.demo-dm-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.demo-dm-trigger:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}
.demo-dm-trigger[aria-expanded="true"] {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px var(--vp-c-brand-1);
}
.demo-dm-content {
  position: absolute;
  z-index: 50;
  min-width: 12rem;
  overflow-y: auto;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.25rem 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.15s ease, visibility 0.15s ease;
}
.demo-dm-content[data-state="open"] {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
hp-dropdown-menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  color: var(--vp-c-text-1);
  background: transparent;
  border: none;
  cursor: pointer;
  user-select: none;
  text-align: left;
  transition: background 0.1s ease;
  min-height: 2rem;
}
hp-dropdown-menu-item:hover:not([aria-disabled="true"]) {
  background: var(--vp-c-bg-soft);
}
hp-dropdown-menu-item[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
hp-dropdown-menu-separator {
  height: 1px;
  margin: 0.25rem 0;
  background: var(--vp-c-divider);
}
hp-dropdown-menu-label {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  user-select: none;
}

@media (prefers-reduced-motion: reduce) {
  .demo-dm-trigger,
  .demo-dm-content,
  hp-dropdown-menu-item {
    transition: none;
  }
}
</style>

## Anatomia

```html
<hp-dropdown-menu>
  <hp-dropdown-menu-trigger>Actions</hp-dropdown-menu-trigger>
  <hp-dropdown-menu-content>
    <hp-dropdown-menu-label>Group Label</hp-dropdown-menu-label>
    <hp-dropdown-menu-item value="action-1">Action 1</hp-dropdown-menu-item>
    <hp-dropdown-menu-item value="action-2">Action 2</hp-dropdown-menu-item>
    <hp-dropdown-menu-separator></hp-dropdown-menu-separator>
    <hp-dropdown-menu-item value="action-3">Action 3</hp-dropdown-menu-item>
  </hp-dropdown-menu-content>
</hp-dropdown-menu>
```

## Ejemplos de Codigo

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-dropdown-menu>
  <hp-dropdown-menu-trigger> Actions ▾ </hp-dropdown-menu-trigger>
  <hp-dropdown-menu-content>
    <hp-dropdown-menu-label>Edit</hp-dropdown-menu-label>
    <hp-dropdown-menu-item value="cut">Cut</hp-dropdown-menu-item>
    <hp-dropdown-menu-item value="copy">Copy</hp-dropdown-menu-item>
    <hp-dropdown-menu-item value="paste">Paste</hp-dropdown-menu-item>
    <hp-dropdown-menu-separator></hp-dropdown-menu-separator>
    <hp-dropdown-menu-item value="delete">Delete</hp-dropdown-menu-item>
    <hp-dropdown-menu-item value="archive" disabled>Archive</hp-dropdown-menu-item>
  </hp-dropdown-menu-content>
</hp-dropdown-menu>
```

```css [style.css]
@import "@headless-primitives/utils/base.css";
@import "@headless-primitives/styles/dropdown-menu.css";

hp-dropdown-menu {
  position: relative;
  display: inline-block;
}

hp-dropdown-menu-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
}

hp-dropdown-menu-trigger:hover {
  border-color: #3b82f6;
  background: #f9fafb;
}

hp-dropdown-menu-trigger[aria-expanded="true"] {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

hp-dropdown-menu-content[data-state="open"] {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

hp-dropdown-menu-content[data-state="closed"] {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

hp-dropdown-menu-item[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-dropdown-menu class="relative inline-block">
  <hp-dropdown-menu-trigger
    class="inline-flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-md cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition-all"
  >
    Actions ▾
  </hp-dropdown-menu-trigger>
  <hp-dropdown-menu-content
    class="absolute z-50 min-w-48 mt-1 bg-white border border-gray-300 rounded-md shadow-lg py-1 opacity-0 invisible pointer-events-none data-[state=open]:opacity-100 data-[state=open]:visible data-[state=open]:pointer-events-auto transition-all"
  >
    <hp-dropdown-menu-label class="block px-3 py-1 text-xs font-semibold text-gray-500">
      Edit
    </hp-dropdown-menu-label>
    <hp-dropdown-menu-item
      value="cut"
      class="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
    >
      Cut
    </hp-dropdown-menu-item>
    <hp-dropdown-menu-item
      value="copy"
      class="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
    >
      Copy
    </hp-dropdown-menu-item>
    <hp-dropdown-menu-separator class="block h-px my-1 bg-gray-200"></hp-dropdown-menu-separator>
    <hp-dropdown-menu-item
      value="delete"
      class="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
    >
      Delete
    </hp-dropdown-menu-item>
  </hp-dropdown-menu-content>
</hp-dropdown-menu>
```

:::

</Flavor>
</CodeSnippet>

## API Reference

### `hp-dropdown-menu`

Contenedor raiz del Dropdown Menu. Maneja el estado abierto/cerrado y la navegacion por teclado.

#### Atributos

| Atributo   | Tipo      | Descripcion                       |
| ---------- | --------- | --------------------------------- |
| `disabled` | `boolean` | Deshabilita el menu completamente |
| `open`     | `boolean` | Estado abierto/cerrado del popup  |

#### Propiedades

| Propiedad         | Tipo      | Descripcion                                                 |
| ----------------- | --------- | ----------------------------------------------------------- |
| `open`            | `boolean` | Getter/setter del estado abierto/cerrado                    |
| `openMenu(edge?)` | `method`  | Abre el menu; opcionalmente mueve foco a primer/ultimo item |
| `close()`         | `method`  | Cierra el menu; devuelve foco al trigger                    |
| `toggle()`        | `method`  | Alterna entre abierto y cerrado                             |

#### Eventos

| Evento         | Detalle                                                                       | Descripcion                                              |
| -------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------- |
| `hp-select`    | `{ value: string, label: string \| null, item: HTMLElement }`                 | Emitido cuando el usuario activa un item                 |
| `hp-highlight` | `{ value: string \| null, label: string \| null, item: HTMLElement \| null }` | Emitido cuando el usuario destaca un item con el teclado |
| `hp-open`      | —                                                                             | Emitido cuando el popup se abre                          |
| `hp-close`     | —                                                                             | Emitido cuando el popup se cierra                        |

#### Estados ARIA

| Atributo            | Valores           | Descripcion                 |
| ------------------- | ----------------- | --------------------------- |
| `data-hp-component` | `"dropdown-menu"` | Identificador de componente |

---

### `hp-dropdown-menu-trigger`

Boton que abre/cierra el menu. Implementa el patron WAI-ARIA Menu Button.

#### Atributos

| Atributo   | Tipo      | Descripcion            |
| ---------- | --------- | ---------------------- |
| `disabled` | `boolean` | Deshabilita el trigger |

#### Estados ARIA

| Atributo                | Valores                   | Descripcion                                        |
| ----------------------- | ------------------------- | -------------------------------------------------- |
| `role`                  | `button`                  | Segun W3C Menu Button pattern                      |
| `aria-haspopup`         | `menu`                    | Indica que controla un menu                        |
| `aria-expanded`         | `true \| false`           | Indica si el popup esta abierto                    |
| `aria-disabled`         | `true \| false`           | Indica si el trigger esta deshabilitado            |
| `aria-controls`         | `string`                  | ID del elemento `hp-dropdown-menu-content`         |
| `aria-activedescendant` | `string`                  | ID del item actualmente destacado (cuando abierto) |
| `data-hp-component`     | `"dropdown-menu-trigger"` | Identificador de componente                        |

---

### `hp-dropdown-menu-content`

Contenedor del popup que aloja los items, separadores y labels.

#### Estados ARIA

| Atributo            | Valores                   | Descripcion                               |
| ------------------- | ------------------------- | ----------------------------------------- |
| `role`              | `menu`                    | Segun WAI-ARIA Menu pattern               |
| `data-state`        | `open \| closed`          | Estado de visibilidad del popup           |
| `aria-hidden`       | `true \| false`           | Oculto para screen readers cuando cerrado |
| `data-hp-component` | `"dropdown-menu-content"` | Identificador de componente               |

---

### `hp-dropdown-menu-item`

Item de accion individual dentro del menu.

#### Atributos

| Atributo   | Tipo                | Descripcion                  |
| ---------- | ------------------- | ---------------------------- |
| `value`    | `string` (required) | Identificador unico del item |
| `disabled` | `boolean`           | Deshabilita el item          |

#### Estados ARIA

| Atributo            | Valores                | Descripcion                          |
| ------------------- | ---------------------- | ------------------------------------ |
| `role`              | `menuitem`             | Segun WAI-ARIA Menu pattern          |
| `aria-disabled`     | `true \| false`        | Indica si el item esta deshabilitado |
| `data-hp-component` | `"dropdown-menu-item"` | Identificador de componente          |

---

### `hp-dropdown-menu-separator`

Separador visual entre grupos de items.

#### Estados ARIA

| Atributo            | Valores                     | Descripcion                 |
| ------------------- | --------------------------- | --------------------------- |
| `role`              | `separator`                 | Separador segun WAI-ARIA    |
| `data-hp-component` | `"dropdown-menu-separator"` | Identificador de componente |

---

### `hp-dropdown-menu-label`

Label no interactivo para agrupar items visualmente.

#### Estados ARIA

| Atributo            | Valores                 | Descripcion                 |
| ------------------- | ----------------------- | --------------------------- |
| `role`              | `presentation`          | No interactivo              |
| `data-hp-component` | `"dropdown-menu-label"` | Identificador de componente |

---

## Comportamiento del Teclado

| Tecla                 | Contexto   | Accion                                           |
| --------------------- | ---------- | ------------------------------------------------ |
| **Enter** / **Space** | Trigger    | Abre el menu                                     |
| **↓ ArrowDown**       | Trigger    | Abre el menu; foco en primer item                |
| **↑ ArrowUp**         | Trigger    | Abre el menu; foco en ultimo item                |
| **↓ ArrowDown**       | Menu       | Mueve foco al siguiente item (valido)            |
| **↑ ArrowUp**         | Menu       | Mueve foco al anterior item (valido)             |
| **Home**              | Menu       | Mueve foco al primer item (valido)               |
| **End**               | Menu       | Mueve foco al ultimo item (valido)               |
| **Enter** / **Space** | Item       | Activa el item y cierra el menu                  |
| **Escape**            | Cualquiera | Cierra el menu; foco vuelve a trigger            |
| **Tab**               | Menu       | Cierra el menu (comportamiento natural del foco) |

## Accesibilidad

- ✅ Implementa WAI-ARIA **Menu Button** pattern
- ✅ Navegacion completa por teclado (Enter, Space, Arrows, Home, End, Escape, Tab)
- ✅ Roles ARIA correctos: `button` (trigger), `menu` (content), `menuitem` (items), `separator`, `presentation` (labels)
- ✅ Focus management automatico con RovingTabindex
- ✅ Atributos `aria-expanded`, `aria-haspopup`, `aria-disabled`, `aria-activedescendant`
- ✅ Indicador visual de foco (`outline-2`)
- ✅ Soporte para `prefers-reduced-motion`
- ✅ Items deshabilitados excluidos de la navegacion por teclado
