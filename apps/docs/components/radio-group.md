# Radio Group <span class="hp-badge">Nuevo</span>

El componente `hp-radio-group` permite seleccionar una sola opción de un conjunto mutuamente excluyente. Implementa el patrón [WAI-ARIA Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) con roving tabindex.

## Demostración

### Sin estilos (solo base.css)

<div class="hp-demo-card">
  <hp-radio-group value="op1">
    <hp-radio value="op1"></hp-radio> Opción 1
    <hp-radio value="op2"></hp-radio> Opción 2
    <hp-radio value="op3" disabled></hp-radio> Deshabilitada
  </hp-radio-group>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <hp-radio-group value="op1" class="demo-radio-group">
      <div class="demo-radio-item">
        <hp-radio value="op1" id="r-op1" class="demo-radio"></hp-radio>
        <hp-label for="r-op1">Opción Uno</hp-label>
      </div>
      <div class="demo-radio-item">
        <hp-radio value="op2" id="r-op2" class="demo-radio"></hp-radio>
        <hp-label for="r-op2">Opción Dos</hp-label>
      </div>
    </hp-radio-group>
  </div>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-radio-group value="1" name="options">
  <div class="field-group">
    <hp-radio value="1" id="r1" class="my-radio"></hp-radio>
    <hp-label for="r1">Opción 1</hp-label>
  </div>
  <div class="field-group">
    <hp-radio value="2" id="r2" class="my-radio"></hp-radio>
    <hp-label for="r2">Opción 2</hp-label>
  </div>
</hp-radio-group>
```

```css [style.css]
.my-radio {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.my-radio[aria-checked="true"] {
  border-color: #0070f3;
}

.my-radio[aria-checked="true"]::after {
  content: "";
  width: 12px;
  height: 12px;
  background: #0070f3;
  border-radius: 50%;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-radio-group class="flex flex-col gap-2">
  <div class="flex items-center gap-2">
    <hp-radio
      value="1"
      id="r1"
      class="h-5 w-5 rounded-full border-2 border-gray-300 aria-checked:border-blue-600 flex items-center justify-center"
    ></hp-radio>
    <hp-label for="r1">Opción 1</hp-label>
  </div>
</hp-radio-group>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/radio-group
```

```bash [npm]
npm install @headless-primitives/radio-group
```

```bash [yarn]
yarn add @headless-primitives/radio-group
```

```bash [bun]
bun add @headless-primitives/radio-group
```

:::

## Features

- ⌨️ Navegación con flechas, `Home`, `End` — selección automática al navegar.
- ♿️ `role="radiogroup"`, `role="radio"`, `aria-checked` y `aria-orientation` automáticos.
- 🎨 Sin estilos visuales (Headless).
- 🔒 Soporte para items individuales deshabilitados y grupo completo deshabilitado.
- 📐 Orientación configurable (`horizontal` / `vertical`).

## Anatomía

```html
<hp-radio-group>
  <hp-radio value="1"></hp-radio>
  <hp-radio value="2"></hp-radio>
</hp-radio-group>
```

## API Reference

### `hp-radio-group`

Contenedor raíz con roving tabindex.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo                           | Por Defecto  | Descripción                      |
| -------------------- | ------------------------------ | ------------ | -------------------------------- |
| `value`              | `string`                       | `""`         | Valor de la opción seleccionada. |
| `disabled`           | `boolean`                      | `false`      | Deshabilita todo el grupo.       |
| `required`           | `boolean`                      | `false`      | Marca el grupo como requerido.   |
| `orientation`        | `"horizontal"` \| `"vertical"` | `"vertical"` | Orientación del grupo.           |

#### Eventos

| Evento      | Detalle             | Descripción                 |
| ----------- | ------------------- | --------------------------- |
| `hp-change` | `{ value: string }` | Cuando cambia la selección. |

#### Atributos ARIA gestionados automáticamente

- `role="radiogroup"` — Asignado si no se especifica.
- `aria-orientation` — Sincronizado con `orientation`.
- `aria-required` — Presente cuando `required` es `true`.

### `hp-radio`

Opción individual dentro del grupo.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción                 |
| -------------------- | --------- | ----------- | --------------------------- |
| `value`              | `string`  | `""`        | Valor único de esta opción. |
| `disabled`           | `boolean` | `false`     | Deshabilita esta opción.    |

#### Atributos ARIA gestionados automáticamente

- `role="radio"` — Asignado si no se especifica.
- `aria-checked` — `"true"` | `"false"`.
- `aria-disabled` — Sincronizado con `disabled`.
- `tabindex` — `0` para el seleccionado, `-1` para los demás (roving).

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/).

### Navegación por teclado

| Tecla                      | Acción                          |
| -------------------------- | ------------------------------- |
| `ArrowDown` / `ArrowRight` | Selecciona la siguiente opción. |
| `ArrowUp` / `ArrowLeft`    | Selecciona la opción anterior.  |
| `Home`                     | Selecciona la primera opción.   |
| `End`                      | Selecciona la última opción.    |

<style>
.demo-radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.demo-radio-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.demo-radio {
  width: 18px;
  height: 18px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}
.demo-radio[aria-checked="true"] {
  border-color: var(--vp-c-brand-1);
}
.demo-radio[aria-checked="true"]::after {
  content: "";
  width: 10px;
  height: 10px;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
}
.demo-radio:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
</style>
