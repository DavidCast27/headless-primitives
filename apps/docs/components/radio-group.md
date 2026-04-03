# Radio Group

<span class="hp-badge">Nuevo</span>

El componente `hp-radio-group` permite al usuario seleccionar una sola opción de un conjunto de opciones mutuamente excluyentes. Implementa el patrón de accesibilidad **Radio Group** con navegación por teclado (roving tabindex).

## Instalación

```bash
pnpm add @headless-primitives/radio-group
```

## Demostración

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
    >
      <div class="h-2.5 w-2.5 rounded-full bg-blue-600 hidden group-aria-checked:block"></div>
    </hp-radio>
    <hp-label for="r1">Opción 1</hp-label>
  </div>
</hp-radio-group>
```

:::

</Flavor>

</CodeSnippet>

## Anatomía

```html
<hp-radio-group>
  <hp-radio value="1"></hp-radio>
  <hp-radio value="2"></hp-radio>
</hp-radio-group>
```

## API Reference

### `hp-radio-group`

#### Atributos

| Atributo      | Tipo                         | Por defecto  | Descripción                                    |
| :------------ | :--------------------------- | :----------- | :--------------------------------------------- |
| `value`       | `string`                     | `""`         | Valor de la opción seleccionada.               |
| `disabled`    | _boolean (presencia)_        | ausente      | Deshabilita todo el grupo.                     |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | Define la orientación para `aria-orientation`. |

#### Eventos

| Evento      | Detalle             | Descripción                                   |
| :---------- | :------------------ | :-------------------------------------------- |
| `hp-change` | `{ value: string }` | Tras cambiar la selección por clic o teclado. |

### `hp-radio`

#### Atributos

| Atributo   | Tipo                  | Por defecto | Descripción                                             |
| :--------- | :-------------------- | :---------- | :------------------------------------------------------ |
| `value`    | `string`              | `""`        | Valor único de esta opción.                             |
| `checked`  | _boolean (presencia)_ | ausente     | Indica si está seleccionada. Sincronizado por el grupo. |
| `disabled` | _boolean (presencia)_ | ausente     | Deshabilita esta opción individualmente.                |

## Accesibilidad

`hp-radio-group` implementa el patrón **WAI-ARIA Radio Group**:

- Roving tabindex: Solo el elemento seleccionado (o el primero) es enfocable.
- Navegación con flechas: `ArrowDown`/`ArrowRight` para la siguiente, `ArrowUp`/`ArrowLeft` para la anterior.
- Selección automática al navegar con flechas.
- Rol `radiogroup` para el contenedor y `radio` para los items.
