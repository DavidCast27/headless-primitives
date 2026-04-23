# Tree <span class="hp-badge">Nuevo</span>

El componente `hp-tree` implementa el patrón [WAI-ARIA TreeView](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) para visualizar datos jerárquicos con nodos expandibles, selección simple o múltiple y navegación completa por teclado.

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-tree` usando únicamente `@headless-primitives/utils/base.css`. La expansión de nodos, navegación por teclado y selección funcionan completamente.

<div class="hp-demo-card">
  <hp-tree>
    <hp-tree-item value="1">
      Item 1
      <hp-tree-group style="padding-left: 1rem;">
        <hp-tree-item value="1.1">Hijo 1.1</hp-tree-item>
      </hp-tree-group>
    </hp-tree-item>
    <hp-tree-item value="2">Item 2</hp-tree-item>
  </hp-tree>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-tree class="demo-tree">
    <hp-tree-item value="src" class="demo-tree-item">
      📁 src
      <hp-tree-group class="demo-tree-group">
        <hp-tree-item value="components" class="demo-tree-item">
          📁 components
          <hp-tree-group class="demo-tree-group">
            <hp-tree-item value="button" class="demo-tree-item">📄 button.ts</hp-tree-item>
            <hp-tree-item value="dialog" class="demo-tree-item">📄 dialog.ts</hp-tree-item>
          </hp-tree-group>
        </hp-tree-item>
        <hp-tree-item value="utils" class="demo-tree-item">📄 utils.ts</hp-tree-item>
      </hp-tree-group>
    </hp-tree-item>
    <hp-tree-item value="readme" class="demo-tree-item">📄 README.md</hp-tree-item>
    <hp-tree-item value="pkg" class="demo-tree-item">📄 package.json</hp-tree-item>
  </hp-tree>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-tree>
  <hp-tree-item value="src">
    📁 src
    <hp-tree-group>
      <hp-tree-item value="index">📄 index.ts</hp-tree-item>
      <hp-tree-item value="utils">📄 utils.ts</hp-tree-item>
    </hp-tree-group>
  </hp-tree-item>
  <hp-tree-item value="readme">📄 README.md</hp-tree-item>
</hp-tree>
```

```css [style.css]
hp-tree-group {
  display: block;
  padding-left: 1.25rem;
}
hp-tree-group[aria-hidden="true"] {
  display: none;
}
hp-tree-item {
  display: block;
  padding: 4px 8px;
  cursor: pointer;
}
hp-tree-item[aria-selected="true"] {
  background: #eff6ff;
  color: #3b82f6;
}
hp-tree-item:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-tree class="text-sm">
  <hp-tree-item
    value="src"
    class="block px-2 py-1 cursor-pointer aria-selected:bg-blue-50 aria-selected:text-blue-600 focus-visible:outline-2 focus-visible:outline-blue-500"
  >
    📁 src
    <hp-tree-group class="pl-5">
      <hp-tree-item value="index" class="block px-2 py-1 cursor-pointer">📄 index.ts</hp-tree-item>
    </hp-tree-group>
  </hp-tree-item>
</hp-tree>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/tree
```

```bash [npm]
npm install @headless-primitives/tree
```

```bash [yarn]
yarn add @headless-primitives/tree
```

```bash [bun]
bun add @headless-primitives/tree
```

:::

## Features

- ⌨️ Flechas para navegar y expandir/colapsar, `Home`, `End`, `Enter`/`Space`.
- ♿️ `role="tree"`, `role="treeitem"`, `aria-expanded`, `aria-selected` automáticos.
- 🎨 Sin estilos visuales (Headless).
- 🔀 Selección simple o múltiple (`multi-select`).
- 🌳 Anidamiento ilimitado con `hp-tree-group`.

## Anatomía

```html
<hp-tree>
  <hp-tree-item value="parent">
    Parent
    <hp-tree-group>
      <hp-tree-item value="child-1">Child 1</hp-tree-item>
      <hp-tree-item value="child-2">Child 2</hp-tree-item>
    </hp-tree-group>
  </hp-tree-item>
  <hp-tree-item value="leaf">Leaf Item</hp-tree-item>
</hp-tree>
```

## API Reference

### `hp-tree`

Contenedor raíz del árbol.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción                                                     |
| -------------------- | --------- | ----------- | --------------------------------------------------------------- |
| `selected`           | `string`  | `""`        | Valor(es) seleccionado(s). En multi-select, separados por coma. |
| `multi-select`       | `boolean` | `false`     | Habilita selección múltiple.                                    |

#### Métodos

| Método                | Descripción                                             |
| --------------------- | ------------------------------------------------------- |
| `getSelectedValues()` | Retorna un `Set<string>` con los valores seleccionados. |

#### Eventos

| Evento      | Detalle                            | Descripción                   |
| ----------- | ---------------------------------- | ----------------------------- |
| `hp-select` | `{ value, item, selectedValues? }` | Cuando se selecciona un item. |

#### Atributos ARIA gestionados automáticamente

- `role="tree"` — Asignado si no se especifica.
- `aria-multiselectable` — Presente cuando `multi-select` es `true`.

### `hp-tree-item`

Nodo del árbol (hoja o padre expandible).

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción                                          |
| -------------------- | --------- | ----------- | ---------------------------------------------------- |
| `value`              | `string`  | `""`        | Identificador único del nodo.                        |
| `disabled`           | `boolean` | `false`     | Deshabilita el nodo.                                 |
| `selected`           | `boolean` | `false`     | Estado de selección.                                 |
| `expanded`           | `boolean` | `false`     | Estado de expansión (solo si tiene `hp-tree-group`). |

#### Métodos

| Método            | Descripción                              |
| ----------------- | ---------------------------------------- |
| `isExpandable()`  | `true` si tiene un `hp-tree-group` hijo. |
| `getGroup()`      | Retorna el `hp-tree-group` hijo.         |
| `getParentItem()` | Retorna el `hp-tree-item` padre.         |

#### Eventos

| Evento        | Detalle           | Descripción                |
| ------------- | ----------------- | -------------------------- |
| `hp-expand`   | `{ value, item }` | Cuando el nodo se expande. |
| `hp-collapse` | `{ value, item }` | Cuando el nodo se colapsa. |

#### Atributos ARIA gestionados automáticamente

- `role="treeitem"` — Asignado si no se especifica.
- `aria-expanded` — Presente solo en nodos expandibles.
- `aria-selected` — `"true"` | `"false"`.
- `aria-disabled` — Sincronizado con `disabled`.
- `data-state` — `"open"` | `"closed"` | `"leaf"`.
- `tabindex` — Roving: `0` para seleccionado, `-1` para los demás.

### `hp-tree-group`

Contenedor de nodos hijos (sub-tree). Renderizado por el nodo padre.

#### Atributos ARIA gestionados automáticamente

- `role="group"` — Siempre presente.

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para TreeView](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/).

### Navegación por teclado

| Tecla             | Acción                                                  |
| ----------------- | ------------------------------------------------------- |
| `ArrowDown`       | Mueve al siguiente nodo visible.                        |
| `ArrowUp`         | Mueve al nodo visible anterior.                         |
| `ArrowRight`      | Expande (cerrado) o mueve al primer hijo (abierto).     |
| `ArrowLeft`       | Colapsa (abierto) o mueve al nodo padre (cerrado/hoja). |
| `Home`            | Mueve al primer nodo.                                   |
| `End`             | Mueve al último nodo visible.                           |
| `Enter` / `Space` | Selecciona y/o expande/colapsa.                         |

<style>
hp-tree,
hp-tree-item,
hp-tree-group {
  display: block;
}
.demo-tree {
  width: 100%;
  max-width: 280px;
  font-size: 0.875rem;
}
.demo-tree-item {
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.1s;
}
.demo-tree-item:hover { background: var(--vp-c-bg-soft); }
.demo-tree-item[aria-selected="true"] {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
.demo-tree-item:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}
.demo-tree-group {
  padding-left: 1.25rem;
}
hp-tree-item[data-state="closed"] > hp-tree-group { display: none; }
</style>
