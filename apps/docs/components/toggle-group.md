# Toggle Group <span class="hp-badge">Nuevo</span>

El componente `hp-toggle-group` permite seleccionar una o múltiples opciones de un conjunto con interacción de tipo "presionar". Soporta modo `single` y `multiple`, orientación y roving tabindex.

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-toggle-group` usando únicamente `@headless-primitives/utils/base.css`. La selección, el estado `data-state="on/off"` y el teclado funcionan completamente.

<div class="hp-demo-card">
  <hp-toggle-group value="a">
    <hp-toggle value="a">Toggle A</hp-toggle>
    <hp-toggle value="b">Toggle B</hp-toggle>
  </hp-toggle-group>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <div class="demo-tg-stack">
    <div>
      <p class="demo-tg-label">Single</p>
      <hp-toggle-group value="center" class="demo-group">
        <hp-toggle value="left" class="demo-toggle">Left</hp-toggle>
        <hp-toggle value="center" class="demo-toggle">Center</hp-toggle>
        <hp-toggle value="right" class="demo-toggle">Right</hp-toggle>
      </hp-toggle-group>
    </div>
    <div>
      <p class="demo-tg-label">Multiple</p>
      <hp-toggle-group type="multiple" value="bold" class="demo-group">
        <hp-toggle value="bold" class="demo-toggle"><b>B</b></hp-toggle>
        <hp-toggle value="italic" class="demo-toggle"><i>I</i></hp-toggle>
        <hp-toggle value="underline" class="demo-toggle"><u>U</u></hp-toggle>
      </hp-toggle-group>
    </div>
  </div>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<!-- Single mode -->
<hp-toggle-group value="center" type="single">
  <hp-toggle value="left" class="my-toggle">Left</hp-toggle>
  <hp-toggle value="center" class="my-toggle">Center</hp-toggle>
  <hp-toggle value="right" class="my-toggle">Right</hp-toggle>
</hp-toggle-group>

<!-- Multiple mode -->
<hp-toggle-group type="multiple" value="bold,italic">
  <hp-toggle value="bold" class="my-toggle">B</hp-toggle>
  <hp-toggle value="italic" class="my-toggle">I</hp-toggle>
  <hp-toggle value="underline" class="my-toggle">U</hp-toggle>
</hp-toggle-group>
```

```css [style.css]
hp-toggle-group {
  display: inline-flex;
  gap: 0;
}
.my-toggle {
  padding: 6px 12px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
}
.my-toggle[data-state="on"] {
  background: #3b82f6;
  color: #fff;
  border-color: #3b82f6;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-toggle-group
  value="center"
  class="inline-flex rounded-md border border-gray-200 overflow-hidden"
>
  <hp-toggle
    value="left"
    class="px-3 py-1.5 text-sm cursor-pointer data-[state=on]:bg-blue-600 data-[state=on]:text-white"
    >Left</hp-toggle
  >
  <hp-toggle
    value="center"
    class="px-3 py-1.5 text-sm cursor-pointer data-[state=on]:bg-blue-600 data-[state=on]:text-white"
    >Center</hp-toggle
  >
  <hp-toggle
    value="right"
    class="px-3 py-1.5 text-sm cursor-pointer data-[state=on]:bg-blue-600 data-[state=on]:text-white"
    >Right</hp-toggle
  >
</hp-toggle-group>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/toggle-group
```

```bash [npm]
npm install @headless-primitives/toggle-group
```

```bash [yarn]
yarn add @headless-primitives/toggle-group
```

```bash [bun]
bun add @headless-primitives/toggle-group
```

:::

## Features

- ⌨️ Flechas (según orientación), `Home`, `End`, `Enter`/`Space`.
- ♿️ `role="group"`, `role="button"`, `aria-pressed`, `aria-orientation` automáticos.
- 🎨 Sin estilos visuales (Headless).
- 🔀 Modo `single` (exclusivo) o `multiple`.
- 📐 Orientación configurable (`horizontal` / `vertical`).

## Anatomía

```html
<hp-toggle-group>
  <hp-toggle value="opt1"></hp-toggle>
  <hp-toggle value="opt2"></hp-toggle>
</hp-toggle-group>
```

## API Reference

### `hp-toggle-group`

Contenedor raíz con gestión de selección.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo                           | Por Defecto    | Descripción                    |
| -------------------- | ------------------------------ | -------------- | ------------------------------ |
| `type`               | `"single"` \| `"multiple"`     | `"single"`     | Modo de selección.             |
| `orientation`        | `"horizontal"` \| `"vertical"` | `"horizontal"` | Orientación del grupo.         |
| `disabled`           | `boolean`                      | `false`        | Deshabilita todo el grupo.     |
| `required`           | `boolean`                      | `false`        | Marca el grupo como requerido. |

#### Propiedades

| Propiedad | Tipo       | Descripción                     |
| --------- | ---------- | ------------------------------- |
| `value`   | `string[]` | Array de valores seleccionados. |

#### Eventos

| Evento      | Detalle               | Descripción                 |
| ----------- | --------------------- | --------------------------- |
| `hp-change` | `{ value: string[] }` | Cuando cambia la selección. |

#### Atributos ARIA gestionados automáticamente

- `role="group"` — Asignado si no se especifica.
- `aria-orientation` — Sincronizado con `orientation`.
- `aria-required` — Presente cuando `required` es `true`.

### `hp-toggle`

Toggle individual.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción             |
| -------------------- | --------- | ----------- | ----------------------- |
| `value`              | `string`  | `""`        | Valor único del toggle. |
| `disabled`           | `boolean` | `false`     | Deshabilita el toggle.  |

#### Propiedades de solo lectura

| Propiedad | Tipo      | Descripción                   |
| --------- | --------- | ----------------------------- |
| `pressed` | `boolean` | Si el toggle está presionado. |

#### Atributos ARIA gestionados automáticamente

- `role="button"` — Asignado si no se especifica.
- `aria-pressed` — `"true"` | `"false"`.
- `aria-disabled` — Sincronizado con `disabled`.
- `data-state` — `"on"` | `"off"`.
- `tabindex` — `0` para el presionado, `-1` para los demás (roving).

## Accesibilidad

Implementa roving tabindex y gestión de foco según orientación.

### Navegación por teclado

| Tecla                                              | Acción                                 |
| -------------------------------------------------- | -------------------------------------- |
| `ArrowRight` (horizontal) / `ArrowDown` (vertical) | Siguiente toggle.                      |
| `ArrowLeft` (horizontal) / `ArrowUp` (vertical)    | Toggle anterior.                       |
| `Home`                                             | Primer toggle.                         |
| `End`                                              | Último toggle.                         |
| `Enter` / `Space`                                  | Alterna el estado del toggle con foco. |
