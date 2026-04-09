# Context Menu

<span class="hp-badge">Nuevo</span>

El componente `hp-context-menu` es un primitivo que implementa el patron WAI-ARIA **Menu** activado por clic derecho (o Shift+F10), permitiendo crear menus contextuales accesibles posicionados en las coordenadas del cursor, con navegacion por teclado completa, separadores y labels de grupo.

## Instalacion

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/context-menu
```

```bash [npm]
npm install @headless-primitives/context-menu
```

```bash [yarn]
yarn add @headless-primitives/context-menu
```

```bash [bun]
bun add @headless-primitives/context-menu
```

:::

## Demostracion

### Sin estilos (solo base.css)

Asi se ve `hp-context-menu` usando unicamente `@headless-primitives/utils/base.css`. La navegacion por teclado, la visibilidad del popup y los roles ARIA funcionan completamente.

<div class="hp-demo-card">
  <hp-context-menu>
    <hp-context-menu-trigger>Haz clic derecho aqui</hp-context-menu-trigger>
    <hp-context-menu-content>
      <hp-context-menu-item value="copy">Copy</hp-context-menu-item>
      <hp-context-menu-item value="paste">Paste</hp-context-menu-item>
      <hp-context-menu-item value="delete">Delete</hp-context-menu-item>
    </hp-context-menu-content>
  </hp-context-menu>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-context-menu class="demo-cm">
    <hp-context-menu-trigger class="demo-cm-trigger">
      <div class="demo-cm-area">🖱️ Haz clic derecho aqui (o Shift+F10)</div>
    </hp-context-menu-trigger>
    <hp-context-menu-content class="demo-cm-content">
      <hp-context-menu-label>Edit</hp-context-menu-label>
      <hp-context-menu-item value="cut">✂️ Cut</hp-context-menu-item>
      <hp-context-menu-item value="copy">📋 Copy</hp-context-menu-item>
      <hp-context-menu-item value="paste">📌 Paste</hp-context-menu-item>
      <hp-context-menu-separator></hp-context-menu-separator>
      <hp-context-menu-label>Danger Zone</hp-context-menu-label>
      <hp-context-menu-item value="delete">🗑️ Delete</hp-context-menu-item>
      <hp-context-menu-item value="archive" disabled>📦 Archive (deshabilitado)</hp-context-menu-item>
    </hp-context-menu-content>
  </hp-context-menu>
</div>

<style>
hp-context-menu,
hp-context-menu-trigger,
hp-context-menu-content,
hp-context-menu-item,
hp-context-menu-separator,
hp-context-menu-label {
  display: block;
}
.demo-cm {
  position: relative;
  display: block;
}
.demo-cm-trigger {
  display: block;
}
.demo-cm-area {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 100px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 2px dashed var(--vp-c-divider);
  border-radius: 8px;
  cursor: context-menu;
  user-select: none;
  transition: all 0.15s ease;
}
.demo-cm-area:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}
hp-context-menu-trigger[data-state="open"] .demo-cm-area {
  border-color: var(--vp-c-brand-1);
  border-style: solid;
  background: var(--vp-c-bg);
}
.demo-cm-content {
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
.demo-cm-content[data-state="open"] {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
hp-context-menu-item {
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
hp-context-menu-item:hover:not([aria-disabled="true"]) {
  background: var(--vp-c-bg-soft);
}
hp-context-menu-item[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
hp-context-menu-separator {
  height: 1px;
  margin: 0.25rem 0;
  background: var(--vp-c-divider);
}
hp-context-menu-label {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  user-select: none;
}

@media (prefers-reduced-motion: reduce) {
  .demo-cm-area,
  .demo-cm-content,
  hp-context-menu-item {
    transition: none;
  }
}
</style>

## Anatomia

```html
<hp-context-menu>
  <hp-context-menu-trigger>Right-click area</hp-context-menu-trigger>
  <hp-context-menu-content>
    <hp-context-menu-label>Group Label</hp-context-menu-label>
    <hp-context-menu-item value="action-1">Action 1</hp-context-menu-item>
    <hp-context-menu-item value="action-2">Action 2</hp-context-menu-item>
    <hp-context-menu-separator></hp-context-menu-separator>
    <hp-context-menu-item value="action-3">Action 3</hp-context-menu-item>
  </hp-context-menu-content>
</hp-context-menu>
```

## Ejemplos de Codigo

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-context-menu>
  <hp-context-menu-trigger>
    <div class="my-area">Right-click here</div>
  </hp-context-menu-trigger>
  <hp-context-menu-content>
    <hp-context-menu-label>Edit</hp-context-menu-label>
    <hp-context-menu-item value="cut">Cut</hp-context-menu-item>
    <hp-context-menu-item value="copy">Copy</hp-context-menu-item>
    <hp-context-menu-item value="paste">Paste</hp-context-menu-item>
    <hp-context-menu-separator></hp-context-menu-separator>
    <hp-context-menu-item value="delete">Delete</hp-context-menu-item>
    <hp-context-menu-item value="archive" disabled>Archive</hp-context-menu-item>
  </hp-context-menu-content>
</hp-context-menu>
```

```css [style.css]
@import "@headless-primitives/utils/base.css";

hp-context-menu {
  position: relative;
  display: block;
}

hp-context-menu-trigger {
  display: block;
}

.my-area {
  padding: 2rem;
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  cursor: context-menu;
  user-select: none;
}

.my-area:hover {
  border-color: #3b82f6;
}

hp-context-menu-trigger[data-state="open"] .my-area {
  border-color: #3b82f6;
  border-style: solid;
}

hp-context-menu-content[data-state="open"] {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

hp-context-menu-content[data-state="closed"] {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

hp-context-menu-item[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-context-menu class="relative block">
  <hp-context-menu-trigger class="block">
    <div
      class="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-context-menu select-none hover:border-blue-500"
    >
      Right-click here
    </div>
  </hp-context-menu-trigger>
  <hp-context-menu-content
    class="absolute z-50 min-w-48 bg-white border border-gray-300 rounded-md shadow-lg py-1 opacity-0 invisible pointer-events-none data-[state=open]:opacity-100 data-[state=open]:visible data-[state=open]:pointer-events-auto transition-all"
  >
    <hp-context-menu-label class="block px-3 py-1 text-xs font-semibold text-gray-500">
      Edit
    </hp-context-menu-label>
    <hp-context-menu-item
      value="cut"
      class="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
    >
      Cut
    </hp-context-menu-item>
    <hp-context-menu-item
      value="copy"
      class="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
    >
      Copy
    </hp-context-menu-item>
    <hp-context-menu-separator class="block h-px my-1 bg-gray-200"></hp-context-menu-separator>
    <hp-context-menu-item
      value="delete"
      class="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
    >
      Delete
    </hp-context-menu-item>
  </hp-context-menu-content>
</hp-context-menu>
```

:::

</Flavor>
</CodeSnippet>

## API Reference

### `hp-context-menu`

Contenedor raiz del Context Menu. Maneja el estado abierto/cerrado, el posicionamiento y la navegacion por teclado.

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
| `close()`         | `method`  | Cierra el menu; restaura foco al elemento previo            |
| `toggle()`        | `method`  | Alterna entre abierto y cerrado                             |

#### Eventos

| Evento         | Detalle                                                                       | Descripcion                                              |
| -------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------- |
| `hp-select`    | `{ value: string, label: string \| null, item: HTMLElement }`                 | Emitido cuando el usuario activa un item                 |
| `hp-highlight` | `{ value: string \| null, label: string \| null, item: HTMLElement \| null }` | Emitido cuando el usuario destaca un item con el teclado |
| `hp-open`      | —                                                                             | Emitido cuando el popup se abre                          |
| `hp-close`     | —                                                                             | Emitido cuando el popup se cierra                        |

#### Estados ARIA

| Atributo            | Valores          | Descripcion                 |
| ------------------- | ---------------- | --------------------------- |
| `data-hp-component` | `"context-menu"` | Identificador de componente |

---

### `hp-context-menu-trigger`

Area que activa el menu contextual al hacer clic derecho. No es un boton — es un contenedor de contenido.

#### Estados ARIA

| Atributo            | Valores                  | Descripcion                    |
| ------------------- | ------------------------ | ------------------------------ |
| `data-state`        | `open \| closed`         | Indica si el menu esta abierto |
| `data-hp-component` | `"context-menu-trigger"` | Identificador de componente    |

---

### `hp-context-menu-content`

Contenedor del popup que aloja los items, separadores y labels. Se posiciona en las coordenadas del cursor.

#### Estados ARIA

| Atributo                | Valores                  | Descripcion                               |
| ----------------------- | ------------------------ | ----------------------------------------- |
| `role`                  | `menu`                   | Segun WAI-ARIA Menu pattern               |
| `data-state`            | `open \| closed`         | Estado de visibilidad del popup           |
| `aria-hidden`           | `true \| false`          | Oculto para screen readers cuando cerrado |
| `aria-activedescendant` | `string`                 | ID del item actualmente destacado         |
| `data-hp-component`     | `"context-menu-content"` | Identificador de componente               |

---

### `hp-context-menu-item`

Item de accion individual dentro del menu.

#### Atributos

| Atributo   | Tipo                | Descripcion                  |
| ---------- | ------------------- | ---------------------------- |
| `value`    | `string` (required) | Identificador unico del item |
| `disabled` | `boolean`           | Deshabilita el item          |

#### Estados ARIA

| Atributo            | Valores               | Descripcion                          |
| ------------------- | --------------------- | ------------------------------------ |
| `role`              | `menuitem`            | Segun WAI-ARIA Menu pattern          |
| `aria-disabled`     | `true \| false`       | Indica si el item esta deshabilitado |
| `data-hp-component` | `"context-menu-item"` | Identificador de componente          |

---

### `hp-context-menu-separator`

Separador visual entre grupos de items.

#### Estados ARIA

| Atributo            | Valores                    | Descripcion                 |
| ------------------- | -------------------------- | --------------------------- |
| `role`              | `separator`                | Separador segun WAI-ARIA    |
| `data-hp-component` | `"context-menu-separator"` | Identificador de componente |

---

### `hp-context-menu-label`

Label no interactivo para agrupar items visualmente.

#### Estados ARIA

| Atributo            | Valores                | Descripcion                 |
| ------------------- | ---------------------- | --------------------------- |
| `role`              | `presentation`         | No interactivo              |
| `data-hp-component` | `"context-menu-label"` | Identificador de componente |

---

## Comportamiento del Teclado

| Tecla                 | Contexto   | Accion                                                     |
| --------------------- | ---------- | ---------------------------------------------------------- |
| **Clic derecho**      | Trigger    | Abre el menu en las coordenadas del cursor                 |
| **Shift+F10**         | Trigger    | Abre el menu en el centro del elemento con foco            |
| **↓ ArrowDown**       | Menu       | Mueve foco al siguiente item (valido)                      |
| **↑ ArrowUp**         | Menu       | Mueve foco al anterior item (valido)                       |
| **Home**              | Menu       | Mueve foco al primer item (valido)                         |
| **End**               | Menu       | Mueve foco al ultimo item (valido)                         |
| **Enter** / **Space** | Item       | Activa el item y cierra el menu                            |
| **Escape**            | Cualquiera | Cierra el menu; foco vuelve al elemento previamente activo |
| **Tab**               | Menu       | Cierra el menu (comportamiento natural del foco)           |

## Accesibilidad

- ✅ Implementa WAI-ARIA **Menu** pattern con activacion por clic derecho
- ✅ Navegacion completa por teclado (Shift+F10, Arrows, Home, End, Enter, Space, Escape, Tab)
- ✅ Roles ARIA correctos: `menu` (content), `menuitem` (items), `separator`, `presentation` (labels)
- ✅ Focus management automatico con RovingTabindex
- ✅ Atributos `aria-hidden`, `aria-disabled`, `aria-activedescendant`
- ✅ Posicionamiento en coordenadas del cursor
- ✅ Indicador visual de foco (`outline-2`)
- ✅ Soporte para `prefers-reduced-motion`
- ✅ Items deshabilitados excluidos de la navegacion por teclado
- ✅ Singleton: solo un context menu abierto a la vez
