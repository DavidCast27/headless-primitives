# Tree View

<span class="hp-badge">Nuevo</span>

El componente `hp-tree` implementa el patrón WAI-ARIA Tree View, permitiendo navegar y seleccionar nodos en una jerarquía de datos. Soporta navegación completa por teclado, estados de deshabilitado, expansión/colapso de nodos, selección única y selección múltiple.

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

## Anatomía

```html
<hp-tree>
  <!-- Nodo padre (expandable) -->
  <hp-tree-item value="folder">
    Nombre del nodo
    <hp-tree-group>
      <!-- Nodos hijo -->
      <hp-tree-item value="child-1">Hijo 1</hp-tree-item>
      <hp-tree-item value="child-2">Hijo 2</hp-tree-item>
    </hp-tree-group>
  </hp-tree-item>

  <!-- Nodo hoja (sin hijos) -->
  <hp-tree-item value="leaf">Hoja</hp-tree-item>
</hp-tree>
```

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-tree` usando únicamente `@headless-primitives/utils/base.css`. La navegación por teclado, `aria-expanded`, `aria-selected` y la visibilidad de grupos funcionan completamente.

> **¿Quieres agregar colores?** Usa el atributo `data-state` y `aria-selected` que el componente setea automáticamente.
> Por ejemplo: `hp-tree-item[aria-selected="true"] { background: #eff6ff; color: #2563eb; }`.
> O importa `@headless-primitives/styles` para obtener el tema completo con tokens CSS.

<div class="hp-demo-card">
  <hp-tree id="docs-tree-1">
    <hp-tree-item value="docs-documents">
      Documentos
      <hp-tree-group>
        <hp-tree-item value="docs-reports">Reportes</hp-tree-item>
        <hp-tree-item value="docs-invoices">Facturas</hp-tree-item>
      </hp-tree-group>
    </hp-tree-item>
    <hp-tree-item value="docs-images">
      Imágenes
      <hp-tree-group>
        <hp-tree-item value="docs-photos">Fotos</hp-tree-item>
        <hp-tree-item value="docs-screenshots">Capturas</hp-tree-item>
      </hp-tree-group>
    </hp-tree-item>
    <hp-tree-item value="docs-readme">README.md</hp-tree-item>
  </hp-tree>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-tree class="demo-tree" id="docs-tree-2">
    <hp-tree-item class="demo-item" value="demo-src" expanded>
      src
      <hp-tree-group class="demo-group">
        <hp-tree-item class="demo-item" value="demo-components" expanded>
          components
          <hp-tree-group class="demo-group">
            <hp-tree-item class="demo-item" value="demo-button">Button.ts</hp-tree-item>
            <hp-tree-item class="demo-item" value="demo-dialog">Dialog.ts</hp-tree-item>
          </hp-tree-group>
        </hp-tree-item>
        <hp-tree-item class="demo-item" value="demo-main">main.ts</hp-tree-item>
      </hp-tree-group>
    </hp-tree-item>
    <hp-tree-item class="demo-item" value="demo-package">package.json</hp-tree-item>
  </hp-tree>
</div>

<style>
.demo-tree {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  max-width: 320px;
  font-family: inherit;
}
.demo-item {
  display: block;
  padding: 0.3rem 0.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s;
}
.demo-item:hover:not([aria-disabled="true"]) {
  background: var(--vp-c-bg-mute);
}
.demo-item:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}
.demo-item[aria-selected="true"] {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
.demo-item[aria-expanded]::before {
  content: "▶";
  display: inline-block;
  margin-right: 0.375rem;
  font-size: 0.6rem;
  transition: transform 0.15s;
  color: var(--vp-c-text-2);
  vertical-align: middle;
}
.demo-item[aria-expanded="true"]::before {
  transform: rotate(90deg);
}
.demo-item[data-state="leaf"]::before {
  content: "•";
  display: inline-block;
  margin-right: 0.375rem;
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  vertical-align: middle;
}
.demo-item[aria-disabled="true"] {
  opacity: 0.45;
  cursor: not-allowed;
}
/* .demo-group inherits display:none from hp-tree-group in docs-demos.css */
.demo-group {
  padding-left: 1.25rem;
  border-left: 1px solid var(--vp-c-divider);
  margin-left: 0.75rem;
}
.demo-item[data-state="open"] > .demo-group {
  display: block;
}
.demo-hint {
  margin: 0.75rem 0 0;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}
.demo-hint code {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand-1);
}
.demo-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}
.demo-btn {
  padding: 0.3rem 0.75rem;
  font-size: 0.8125rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: background 0.15s;
}
.demo-btn:hover {
  background: var(--vp-c-bg-mute);
}
</style>

## Selección múltiple

Añade el atributo `multi-select` para permitir seleccionar varios ítems a la vez. El evento `hp-select` incluirá `selectedValues` con el array de valores activos. Hacer clic en un ítem ya seleccionado lo deselecciona.

### Selección básica múltiple

<div class="hp-demo-card">
  <hp-tree class="demo-tree" id="docs-tree-ms1" multi-select>
    <hp-tree-item class="demo-item" value="ms-docs">
      Documentos
      <hp-tree-group class="demo-group">
        <hp-tree-item class="demo-item" value="ms-reports">Reportes</hp-tree-item>
        <hp-tree-item class="demo-item" value="ms-invoices">Facturas</hp-tree-item>
        <hp-tree-item class="demo-item" value="ms-contracts">Contratos</hp-tree-item>
      </hp-tree-group>
    </hp-tree-item>
    <hp-tree-item class="demo-item" value="ms-images">
      Imágenes
      <hp-tree-group class="demo-group">
        <hp-tree-item class="demo-item" value="ms-photos">Fotos</hp-tree-item>
        <hp-tree-item class="demo-item" value="ms-screenshots">Capturas</hp-tree-item>
      </hp-tree-group>
    </hp-tree-item>
    <hp-tree-item class="demo-item" value="ms-readme">README.md</hp-tree-item>
    <hp-tree-item class="demo-item" value="ms-license">LICENSE</hp-tree-item>
  </hp-tree>
  <p class="demo-hint">Seleccionados: <code id="ms1-output">ninguno</code></p>
</div>

### Con ítems deshabilitados

Algunos nodos pueden estar deshabilitados y no participar en la selección múltiple.

<div class="hp-demo-card">
  <hp-tree class="demo-tree" id="docs-tree-ms2" multi-select>
    <hp-tree-item class="demo-item" value="ms2-active1">Elemento activo 1</hp-tree-item>
    <hp-tree-item class="demo-item" value="ms2-disabled" disabled>Elemento deshabilitado</hp-tree-item>
    <hp-tree-item class="demo-item" value="ms2-folder">
      Carpeta
      <hp-tree-group class="demo-group">
        <hp-tree-item class="demo-item" value="ms2-child1">Hijo 1</hp-tree-item>
        <hp-tree-item class="demo-item" value="ms2-child2" disabled>Hijo deshabilitado</hp-tree-item>
        <hp-tree-item class="demo-item" value="ms2-child3">Hijo 3</hp-tree-item>
      </hp-tree-group>
    </hp-tree-item>
    <hp-tree-item class="demo-item" value="ms2-active2">Elemento activo 2</hp-tree-item>
  </hp-tree>
  <p class="demo-hint">Seleccionados: <code id="ms2-output">ninguno</code></p>
</div>

### Controlado: selección programática

Puedes leer y modificar la selección desde JS usando `getSelectedValues()`. Los botones de abajo demuestran cómo seleccionar o limpiar ítems programáticamente.

<div class="hp-demo-card">
  <hp-tree class="demo-tree" id="docs-tree-ms3" multi-select>
    <hp-tree-item class="demo-item" value="ctrl-a">Opción A</hp-tree-item>
    <hp-tree-item class="demo-item" value="ctrl-b">Opción B</hp-tree-item>
    <hp-tree-item class="demo-item" value="ctrl-c">
      Grupo C
      <hp-tree-group class="demo-group">
        <hp-tree-item class="demo-item" value="ctrl-c1">C — Hijo 1</hp-tree-item>
        <hp-tree-item class="demo-item" value="ctrl-c2">C — Hijo 2</hp-tree-item>
      </hp-tree-group>
    </hp-tree-item>
    <hp-tree-item class="demo-item" value="ctrl-d">Opción D</hp-tree-item>
  </hp-tree>
  <div class="demo-actions">
    <button class="demo-btn" id="ms3-select-all">Seleccionar hojas</button>
    <button class="demo-btn" id="ms3-clear">Limpiar</button>
    <button class="demo-btn" id="ms3-read">Leer selección</button>
  </div>
  <p class="demo-hint">Seleccionados: <code id="ms3-output">ninguno</code></p>
</div>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // Demo 1 — selección básica múltiple
  const tree1 = document.getElementById("docs-tree-ms1");
  const out1 = document.getElementById("ms1-output");
  if (tree1 && out1) {
    tree1.addEventListener("hp-select", (e) => {
      const vals = e.detail.selectedValues;
      out1.textContent = vals.length ? vals.join(", ") : "ninguno";
    });
  }

  // Demo 2 — con ítems deshabilitados
  const tree2 = document.getElementById("docs-tree-ms2");
  const out2 = document.getElementById("ms2-output");
  if (tree2 && out2) {
    tree2.addEventListener("hp-select", (e) => {
      const vals = e.detail.selectedValues;
      out2.textContent = vals.length ? vals.join(", ") : "ninguno";
    });
  }

  // Demo 3 — controlado / programático
  const tree3 = document.getElementById("docs-tree-ms3");
  const out3 = document.getElementById("ms3-output");
  if (!tree3 || !out3) return;

  function updateOutput() {
    const vals = Array.from(tree3.getSelectedValues());
    out3.textContent = vals.length ? vals.join(", ") : "ninguno";
  }

  tree3.addEventListener("hp-select", updateOutput);

  document.getElementById("ms3-select-all")?.addEventListener("click", () => {
    ["ctrl-a", "ctrl-b", "ctrl-c1", "ctrl-c2", "ctrl-d"].forEach(v => {
      const item = tree3.querySelector(`[value="${v}"]`);
      if (item && item.getAttribute("aria-selected") !== "true") {
        item.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }
    });
  });

  document.getElementById("ms3-clear")?.addEventListener("click", () => {
    tree3.querySelectorAll("[aria-selected='true']").forEach(item => {
      item.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
  });

  document.getElementById("ms3-read")?.addEventListener("click", updateOutput);
});
</script>

## Ejemplos de código

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-tree class="file-tree" id="my-tree" multi-select>
  <hp-tree-item class="tree-item" value="src">
    src
    <hp-tree-group class="tree-group">
      <hp-tree-item class="tree-item" value="components">
        components
        <hp-tree-group class="tree-group">
          <hp-tree-item class="tree-item" value="button">Button.ts</hp-tree-item>
          <hp-tree-item class="tree-item" value="dialog">Dialog.ts</hp-tree-item>
        </hp-tree-group>
      </hp-tree-item>
      <hp-tree-item class="tree-item" value="main">main.ts</hp-tree-item>
    </hp-tree-group>
  </hp-tree-item>
  <hp-tree-item class="tree-item" value="package-json">package.json</hp-tree-item>
  <hp-tree-item class="tree-item" value="tsconfig">tsconfig.json</hp-tree-item>
</hp-tree>

<p>Seleccionados: <span id="selected-output">ninguno</span></p>
```

```css [style.css]
hp-tree,
hp-tree-item,
hp-tree-group {
  display: block;
}

.file-tree {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem;
  background: #f8fafc;
  width: 280px;
}

.tree-item {
  padding: 0.3rem 0.5rem;
  font-size: 0.875rem;
  color: #1a202c;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s;
}

.tree-item:hover:not([aria-disabled="true"]) {
  background: #f1f5f9;
}

.tree-item:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
}

/* Cada ítem seleccionado recibe fondo azul */
.tree-item[aria-selected="true"] {
  background: #eff6ff;
  color: #2563eb;
  font-weight: 500;
}

/* Checkmark visual opcional */
.tree-item[aria-selected="true"]::after {
  content: "✓";
  float: right;
  font-size: 0.75rem;
  color: #2563eb;
}

.tree-item[aria-expanded]::before {
  content: "▶";
  display: inline-block;
  margin-right: 0.375rem;
  font-size: 0.6rem;
  transition: transform 0.15s;
  color: #64748b;
  vertical-align: middle;
}

.tree-item[aria-expanded="true"]::before {
  transform: rotate(90deg);
}

.tree-item[data-state="leaf"]::before {
  content: "•";
  display: inline-block;
  margin-right: 0.375rem;
  font-size: 0.7rem;
  color: #64748b;
  vertical-align: middle;
}

.tree-group {
  display: none;
  padding-left: 1.25rem;
  border-left: 1px solid #e2e8f0;
  margin-left: 0.75rem;
}

.tree-item[data-state="open"] > .tree-group {
  display: block;
}

.tree-item[aria-disabled="true"] {
  opacity: 0.45;
  cursor: not-allowed;
}
```

```js [main.js]
import "@headless-primitives/tree";

const tree = document.getElementById("my-tree");
const output = document.getElementById("selected-output");

tree.addEventListener("hp-select", (e) => {
  const { value, selectedValues } = e.detail;

  output.textContent = selectedValues.length ? selectedValues.join(", ") : "ninguno";

  console.log("Último clic:", value);
  console.log("Todos seleccionados:", selectedValues);
});

// Leer la selección en cualquier momento
console.log(tree.getSelectedValues()); // Set<string>
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-tree id="my-tree" multi-select>
  <hp-tree-item
    class="block px-2 py-1 rounded cursor-pointer text-sm
           hover:bg-gray-100
           focus-visible:outline-2 focus-visible:outline-blue-500
           [&[aria-selected=true]]:bg-blue-50
           [&[aria-selected=true]]:text-blue-600
           [&[aria-selected=true]]:font-medium"
    value="documents"
  >
    Documents
    <hp-tree-group
      class="block pl-5 ml-3 border-l border-gray-200
             [hp-tree-item[data-state=closed]_&]:hidden
             [hp-tree-item[data-state=leaf]_&]:hidden"
    >
      <hp-tree-item
        class="block px-2 py-1 rounded cursor-pointer text-sm
               hover:bg-gray-100
               [&[aria-selected=true]]:bg-blue-50
               [&[aria-selected=true]]:text-blue-600"
        value="reports"
        >Reports</hp-tree-item
      >
      <hp-tree-item
        class="block px-2 py-1 rounded cursor-pointer text-sm
               hover:bg-gray-100
               [&[aria-selected=true]]:bg-blue-50
               [&[aria-selected=true]]:text-blue-600"
        value="invoices"
        >Invoices</hp-tree-item
      >
    </hp-tree-group>
  </hp-tree-item>
  <hp-tree-item
    class="block px-2 py-1 rounded cursor-pointer text-sm
           hover:bg-gray-100
           [&[aria-selected=true]]:bg-blue-50
           [&[aria-selected=true]]:text-blue-600"
    value="readme"
    >README.md</hp-tree-item
  >
</hp-tree>

<p class="mt-3 text-sm text-gray-500">
  Seleccionados: <span id="selected-output" class="font-mono text-blue-600">ninguno</span>
</p>
```

```js [main.js]
import "@headless-primitives/tree";

const tree = document.getElementById("my-tree");
const output = document.getElementById("selected-output");

tree.addEventListener("hp-select", (e) => {
  const { selectedValues } = e.detail;
  output.textContent = selectedValues.length ? selectedValues.join(", ") : "ninguno";
});
```

:::

</Flavor>

</CodeSnippet>

## API

### `hp-tree`

Contenedor raíz del árbol. Gestiona la selección y el tabindex de sus ítems.

| Propiedad      | Tipo      | Por defecto | Descripción                                                                            |
| -------------- | --------- | ----------- | -------------------------------------------------------------------------------------- |
| `selected`     | `string`  | `""`        | Valor del ítem actualmente seleccionado (o valores separados por coma en multi-select) |
| `multi-select` | `boolean` | `false`     | Habilita selección múltiple de ítems                                                   |

| Método                | Retorno       | Descripción                                  |
| --------------------- | ------------- | -------------------------------------------- |
| `getSelectedValues()` | `Set<string>` | Retorna el conjunto de valores seleccionados |

| Evento      | Detalle                                                                              | Descripción                           |
| ----------- | ------------------------------------------------------------------------------------ | ------------------------------------- |
| `hp-select` | `{ value: string, item: HTMLElement }` / `{ value, item, selectedValues: string[] }` | Se emite cuando se selecciona un ítem |

| Atributo ARIA          | Valor  | Descripción                                     |
| ---------------------- | ------ | ----------------------------------------------- |
| `role`                 | `tree` | Rol semántico del widget                        |
| `aria-multiselectable` | `true` | Presente solo cuando `multi-select` está activo |

---

### `hp-tree-item`

Nodo individual del árbol. Puede ser hoja (sin hijos) o padre (con `hp-tree-group`).

| Propiedad  | Tipo      | Por defecto | Descripción                                      |
| ---------- | --------- | ----------- | ------------------------------------------------ |
| `value`    | `string`  | Auto (UUID) | Identificador único del ítem                     |
| `expanded` | `boolean` | `false`     | Estado de expansión del nodo padre               |
| `selected` | `boolean` | `false`     | Si el ítem está seleccionado                     |
| `disabled` | `boolean` | `false`     | Deshabilita interacción y navegación por teclado |

| Evento        | Detalle                                | Descripción                  |
| ------------- | -------------------------------------- | ---------------------------- |
| `hp-expand`   | `{ value: string, item: HTMLElement }` | Se emite al expandir el nodo |
| `hp-collapse` | `{ value: string, item: HTMLElement }` | Se emite al colapsar el nodo |

| Atributo ARIA   | Valor                  | Descripción                        |
| --------------- | ---------------------- | ---------------------------------- |
| `role`          | `treeitem`             | Rol semántico                      |
| `aria-expanded` | `true / false`         | Presente solo en nodos expandibles |
| `aria-selected` | `true / false`         | Estado de selección                |
| `aria-disabled` | `true / false`         | Estado de deshabilitado            |
| `data-state`    | `open / closed / leaf` | Estado visual del nodo             |

---

### `hp-tree-group`

Contenedor de nodos hijos. Se muestra u oculta según el estado `data-state` del `hp-tree-item` padre.

| Atributo ARIA | Valor   | Descripción             |
| ------------- | ------- | ----------------------- |
| `role`        | `group` | Rol semántico del grupo |

## Navegación por teclado

| Tecla        | Acción                                                                 |
| ------------ | ---------------------------------------------------------------------- |
| `ArrowDown`  | Mueve el foco al siguiente ítem visible                                |
| `ArrowUp`    | Mueve el foco al ítem visible anterior                                 |
| `ArrowRight` | Expande el nodo si está cerrado; si está abierto, mueve al primer hijo |
| `ArrowLeft`  | Colapsa el nodo si está abierto; si está cerrado, sube al padre        |
| `Home`       | Mueve el foco al primer ítem visible del árbol                         |
| `End`        | Mueve el foco al último ítem visible del árbol                         |
| `Enter`      | Selecciona el ítem (y expande/colapsa si es padre)                     |
| `Space`      | Selecciona el ítem (y expande/colapsa si es padre)                     |

## Estilos con `@headless-primitives/styles`

```css
@import "@headless-primitives/styles/tree.css";
```

Los tokens CSS disponibles:

| Token                 | Uso                                                 |
| --------------------- | --------------------------------------------------- |
| `--hp-tree-indent`    | Ancho de indentación por nivel (default: `1.25rem`) |
| `--hp-tree-depth`     | Profundidad actual (gestionado por CSS)             |
| `--hp-text`           | Color del texto de los ítems                        |
| `--hp-text-secondary` | Color del indicador de expansión                    |
| `--hp-bg-muted`       | Fondo al hacer hover                                |
| `--hp-bg-subtle`      | Fondo del ítem seleccionado                         |
| `--hp-accent`         | Color de texto del ítem seleccionado                |
| `--hp-border`         | Color del borde del grupo                           |
