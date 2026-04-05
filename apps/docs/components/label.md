# Label

<span class="hp-badge">Nuevo</span>

El componente `hp-label` permite asociar etiquetas de texto con elementos de formulario de manera accesible, superando las limitaciones nativas de HTML al trabajar con Custom Elements.

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
  color: var(--vp-c-brand-1);
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<!-- Usando utilidades de Tailwind CSS -->
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

## Anatomía

Un único custom element envuelve el texto y gestiona la vinculación con el control referenciado por `for`.

```html
<hp-label for="mi-control"> Etiqueta </hp-label>
```

## API Reference

### `hp-label`

Asocia el texto al control con ID `for`: en click enfoca y, si aplica, dispara `click` en el destino. Si el control carece de `aria-labelledby`, lo sincroniza con el `id` de esta etiqueta.

#### Atributos

| Atributo | Tipo     | Por defecto | Descripción                                                                                                        |
| :------- | :------- | :---------- | :----------------------------------------------------------------------------------------------------------------- |
| `for`    | `string` | —           | ID del elemento objetivo en el documento. Observado.                                                               |
| `id`     | `string` | auto        | Si falta y hay `for` válido, se genera un id estable (`hp-label-…`) para `aria-labelledby` del destino. Observado. |

#### Propiedades

| Propiedad | Tipo             | Descripción                            |
| :-------- | :--------------- | :------------------------------------- |
| `htmlFor` | `string \| null` | Refleja / establece el atributo `for`. |

## Accesibilidad

`hp-label` soluciona una limitación crítica del navegador: la etiqueta `<label>` nativa no puede transferir el foco a elementos que no sean "labelables" por defecto (como los Custom Elements).

- **Click to Focus**: Traslada manualmente el foco al elemento referenciado por `for`.
- **Aria-Labelledby**: Si el destino no tiene un `aria-labelledby`, el componente lo vincula automáticamente.
- **No Selection**: Evita la selección accidental de texto al hacer doble click, igual que un label nativo.
