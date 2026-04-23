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
  <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%; max-width: 300px;">
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <hp-label for="input-demo" class="demo-label">Nombre de usuario</hp-label>
      <input id="input-demo" type="text" placeholder="Escribe algo..." />
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
      <hp-label for="switch-label-demo" class="demo-label">Notificaciones</hp-label>
      <hp-switch id="switch-label-demo" class="demo-switch"></hp-switch>
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

<style>
.demo-label {
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
}
.demo-switch {
  width: 40px;
  height: 20px;
  background: var(--vp-c-divider);
  border-radius: 999px;
  cursor: pointer;
  position: relative;
}
.demo-switch[data-state="checked"] { background: var(--vp-c-brand-1); }
.demo-switch::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
}
.demo-switch[data-state="checked"]::after { transform: translateX(20px); }
</style>
