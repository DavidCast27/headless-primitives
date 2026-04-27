# Context Menu <span class="hp-badge">Nuevo</span>

El componente `hp-context-menu` muestra un menú contextual posicionado en el cursor al hacer clic derecho o con `Shift+F10`. Implementa el patrón [WAI-ARIA Menu](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/).

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-context-menu` usando únicamente `@headless-primitives/utils/base.css`. El clic derecho, la navegación por teclado y la visibilidad funcionan completamente sin estilos adicionales.

<div class="hp-demo-card">
  <hp-context-menu id="bare-context-menu">
    <hp-context-menu-trigger>
      <div class="demo-cm-bare-area">
        Haz clic derecho aquí (sin estilos)
      </div>
    </hp-context-menu-trigger>
    <hp-context-menu-content>
      <hp-context-menu-item value="1">Opción 1</hp-context-menu-item>
      <hp-context-menu-item value="2">Opción 2</hp-context-menu-item>
    </hp-context-menu-content>
  </hp-context-menu>
</div>

### Con estilos personalizados

El componente estilizado usando clases CSS y variables de tema.

<div class="hp-demo-card">
  <hp-context-menu class="demo-context-menu">
    <hp-context-menu-trigger class="demo-cm-trigger">
      <div class="demo-cm-trigger-area">
        Haz clic derecho aquí
      </div>
    </hp-context-menu-trigger>
    <hp-context-menu-content class="demo-cm-content">
      <hp-context-menu-label>Acciones</hp-context-menu-label>
      <hp-context-menu-item value="copy">📋 Copiar</hp-context-menu-item>
      <hp-context-menu-item value="cut">✂️ Cortar</hp-context-menu-item>
      <hp-context-menu-item value="paste">📎 Pegar</hp-context-menu-item>
      <hp-context-menu-separator></hp-context-menu-separator>
      <hp-context-menu-item value="delete" disabled>🗑️ Eliminar</hp-context-menu-item>
    </hp-context-menu-content>
  </hp-context-menu>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-context-menu>
  <hp-context-menu-trigger>
    <div class="trigger-area">Clic derecho aquí</div>
  </hp-context-menu-trigger>
  <hp-context-menu-content class="menu-content">
    <hp-context-menu-label>Acciones</hp-context-menu-label>
    <hp-context-menu-item value="copy">Copiar</hp-context-menu-item>
    <hp-context-menu-item value="cut">Cortar</hp-context-menu-item>
    <hp-context-menu-separator></hp-context-menu-separator>
    <hp-context-menu-item value="delete" disabled>Eliminar</hp-context-menu-item>
  </hp-context-menu-content>
</hp-context-menu>
```

```css [style.css]
hp-context-menu-content[data-state="closed"] {
  display: none;
}
hp-context-menu-content[data-state="open"] {
  position: absolute;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 160px;
  padding: 4px 0;
  z-index: 100;
}
hp-context-menu-item {
  padding: 6px 12px;
  cursor: pointer;
}
hp-context-menu-item:hover {
  background: var(--vp-c-bg-soft);
}
hp-context-menu-item[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
hp-context-menu-separator {
  height: 1px;
  background: var(--vp-c-divider);
  margin: 4px 0;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-context-menu>
  <hp-context-menu-trigger>
    <div class="p-8 border-2 border-dashed rounded-lg text-center">Clic derecho aquí</div>
  </hp-context-menu-trigger>
  <hp-context-menu-content
    class="absolute z-50 bg-white border rounded-md shadow-lg min-w-[160px] py-1 data-[state=closed]:hidden"
  >
    <hp-context-menu-item value="copy" class="px-3 py-1.5 cursor-pointer hover:bg-gray-100"
      >Copiar</hp-context-menu-item
    >
    <hp-context-menu-item value="cut" class="px-3 py-1.5 cursor-pointer hover:bg-gray-100"
      >Cortar</hp-context-menu-item
    >
  </hp-context-menu-content>
</hp-context-menu>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

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

## Features

- ⌨️ Soporte completo de navegación por teclado (`Shift+F10`, flechas, Enter, Escape, Home, End).
- ♿️ Accesibilidad WAI-ARIA incorporada (`role="menu"`, `aria-activedescendant`).
- 🎨 Sin estilos visuales (Headless) — posicionamiento dinámico en coordenadas del cursor.
- 📏 Soporte para separadores y etiquetas de sección para organizar opciones.
- 🔒 Gestión de estados deshabilitados por ítem o para el menú completo.

## Anatomía

```html
<hp-context-menu>
  <hp-context-menu-trigger></hp-context-menu-trigger>
  <hp-context-menu-content>
    <hp-context-menu-label></hp-context-menu-label>
    <hp-context-menu-item value="action1"></hp-context-menu-item>
    <hp-context-menu-separator></hp-context-menu-separator>
    <hp-context-menu-item value="action2"></hp-context-menu-item>
  </hp-context-menu-content>
</hp-context-menu>
```

## API Reference

### `hp-context-menu`

Contenedor raíz del menú contextual.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción                             |
| -------------------- | --------- | ----------- | --------------------------------------- |
| `open`               | `boolean` | `false`     | Estado abierto/cerrado del menú.        |
| `disabled`           | `boolean` | `false`     | Deshabilita la interacción con el menú. |

#### Métodos

| Método            | Descripción                                   |
| ----------------- | --------------------------------------------- |
| `openMenu(edge?)` | Abre el menú. `edge`: `"first"` \| `"last"`.  |
| `close()`         | Cierra el menú y restaura el foco al trigger. |
| `toggle()`        | Alterna entre abierto y cerrado.              |

#### Eventos

| Evento         | Detalle                  | Descripción                                             |
| -------------- | ------------------------ | ------------------------------------------------------- |
| `hp-select`    | `{ value, label, item }` | Se emite al seleccionar una opción.                     |
| `hp-highlight` | `{ value, label, item }` | Se emite al navegar/destacar una opción con el teclado. |
| `hp-open`      | —                        | Se emite cuando el menú se abre.                        |
| `hp-close`     | —                        | Se emite cuando el menú se cierra.                      |

### `hp-context-menu-trigger`

Área sensible al clic derecho que dispara el menú.

### `hp-context-menu-content`

Contenedor flotante que alberga los ítems del menú.

#### Atributos ARIA gestionados automáticamente

- `role="menu"` — Identifica el elemento como un menú de acciones.
- `data-state` — `"open"` | `"closed"` para animaciones CSS.
- `aria-hidden` — Sincronizado con el estado de visibilidad.
- `aria-activedescendant` — ID del ítem que tiene el foco virtual.

### `hp-context-menu-item`

Opción individual dentro del menú.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción                   |
| -------------------- | --------- | ----------- | ----------------------------- |
| `value`              | `string`  | `""`        | Identificador único del ítem. |
| `disabled`           | `boolean` | `false`     | Deshabilita el ítem.          |

#### Atributos ARIA gestionados automáticamente

- `role="menuitem"` — Identifica el elemento como un ítem de menú.
- `aria-disabled` — Sincronizado con la propiedad `disabled`.

### `hp-context-menu-separator`

Línea divisoria para separar grupos de ítems (`role="separator"`).

### `hp-context-menu-label`

Encabezado de sección para agrupar ítems (`role="presentation"`).

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Menu](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/).

### Navegación por teclado

| Tecla                        | Acción                                         |
| ---------------------------- | ---------------------------------------------- |
| `Clic derecho` / `Shift+F10` | Abre el menú en la posición exacta del cursor. |
| `ArrowDown` / `ArrowRight`   | Mueve el foco al siguiente ítem.               |
| `ArrowUp` / `ArrowLeft`      | Mueve el foco al ítem anterior.                |
| `Home`                       | Salta al primer ítem del menú.                 |
| `End`                        | Salta al último ítem del menú.                 |
| `Enter` / `Space`            | Selecciona el ítem destacado y cierra el menú. |
| `Escape`                     | Cierra el menú y devuelve el foco al trigger.  |
| `Tab`                        | Cierra el menú inmediatamente.                 |
