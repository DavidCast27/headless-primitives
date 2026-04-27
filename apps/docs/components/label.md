# Label <span class="hp-badge">Nuevo</span>

El componente `hp-label` asocia etiquetas de texto con elementos de formulario de manera accesible, superando las limitaciones de `<label>` nativo con Custom Elements.

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-label` usando únicamente `@headless-primitives/utils/base.css`. El click-to-focus y `aria-labelledby` funcionan completamente.

<div class="hp-demo-card">
  <hp-label for="bare-input">Nombre</hp-label>
  <input id="bare-input" type="text" placeholder="Escribe algo..." />
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <div class="demo-lbl-stack">
    <div class="demo-lbl-field">
      <hp-label for="input-demo">Nombre de usuario</hp-label>
      <input id="input-demo" type="text" placeholder="Escribe algo..." />
    </div>
    <div class="demo-lbl-row">
      <hp-label for="switch-label-demo">Notificaciones</hp-label>
      <hp-switch id="switch-label-demo" class="switch"></hp-switch>
    </div>
  </div>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-label for="first-name" class="my-label">Nombre</hp-label>
<input id="first-name" type="text" />

<!-- Con otros primitivos -->
<hp-label for="toggle-id" class="my-label">Aceptar términos</hp-label>
<hp-switch id="toggle-id"></hp-switch>
```

```css [style.css]
.my-label {
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.my-label:hover {
  color: #3b82f6;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-label for="first-name" class="text-sm font-medium cursor-pointer hover:text-blue-600">
  Nombre
</hp-label>
<input id="first-name" type="text" class="border rounded px-2 py-1 ml-2" />

<div class="flex items-center gap-2 mt-4">
  <hp-label for="toggle-id" class="text-sm font-medium cursor-pointer hover:text-blue-600">
    Aceptar términos
  </hp-label>
  <hp-switch id="toggle-id"></hp-switch>
</div>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/label
```

```bash [npm]
npm install @headless-primitives/label
```

```bash [yarn]
yarn add @headless-primitives/label
```

```bash [bun]
bun add @headless-primitives/label
```

:::

## Features

- ♿️ `aria-labelledby` gestionado automáticamente en el control destino.
- 🖱️ Click-to-focus: traslada el foco al control referenciado por `for`.
- 🎨 Sin estilos visuales (Headless).
- 🔒 Prevención de selección accidental en doble-click.

## Anatomía

```html
<hp-label for="mi-control">Etiqueta</hp-label>
```

## API Reference

### `hp-label`

Asocia texto al control con ID `for`: en click enfoca y dispara `click` en el destino.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo             | Por Defecto | Descripción                                           |
| -------------------- | ---------------- | ----------- | ----------------------------------------------------- |
| `for` / `htmlFor`    | `string \| null` | `null`      | ID del elemento objetivo en el documento.             |
| `id`                 | `string`         | auto        | Generado automáticamente si falta y hay `for` válido. |

## Accesibilidad

`hp-label` resuelve una limitación crítica: `<label>` nativo no puede transferir el foco a Custom Elements. El componente:

- **Click to Focus**: Traslada el foco al control referenciado por `for`.
- **aria-labelledby**: Si el destino no tiene `aria-labelledby`, lo vincula automáticamente con el `id` de la etiqueta.
- **No Selection**: Previene selección accidental de texto en doble-click.
