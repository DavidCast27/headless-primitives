# Switch

<span class="hp-badge">Nuevo</span>

El componente `hp-switch` provee un control interactivo que permite alternar entre dos estados (prendido/apagado) siguiendo el patrón de accesibilidad de un interruptor físico.

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/switch
```

```bash [npm]
npm install @headless-primitives/switch
```

```bash [yarn]
yarn add @headless-primitives/switch
```

```bash [bun]
bun add @headless-primitives/switch
```

:::

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-switch` usando únicamente `@headless-primitives/utils/base.css`. El toggle, `aria-checked` y teclado funcionan completamente.

<div class="hp-demo-card">
  <hp-switch></hp-switch>
  <hp-switch aria-checked="true"></hp-switch>
  <hp-switch disabled></hp-switch>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
    <hp-label for="sw-demo">Activar modo oscuro</hp-label>
    <hp-switch id="sw-demo" class="demo-switch"></hp-switch>
  </div>
</div>

<style>
.demo-switch {
  width: 44px;
  height: 24px;
  background: var(--vp-c-divider);
  border-radius: 999px;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
  border: 1px solid transparent;
}
.demo-switch[data-state="checked"] {
  background: var(--vp-c-brand-1);
}
.demo-switch::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
}
.demo-switch[data-state="checked"]::after {
  transform: translateX(20px);
}
.demo-switch:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
</style>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<div class="field-group">
  <hp-label for="airplane-mode">Modo Avión</hp-label>
  <hp-switch id="airplane-mode" class="my-switch"></hp-switch>
</div>
```

```css [style.css]
.field-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.my-switch {
  /* Contenedor */
  width: 40px;
  height: 20px;
  background: gray;
  border-radius: 999px;
  position: relative;
  cursor: pointer;
  display: inline-block;
}

.my-switch[data-state="checked"] {
  background: green;
}

/* El círculo se puede estilizar con pseudo-elementos */
.my-switch::after {
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

.my-switch[data-state="checked"]::after {
  transform: translateX(20px);
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<div class="flex items-center gap-2">
  <hp-label for="airplane-mode">Modo Avión</hp-label>
  <hp-switch
    id="airplane-mode"
    class="group relative h-5 w-10 cursor-pointer rounded-full bg-gray-400 transition-colors [&[data-state=checked]]:bg-green-600"
  >
    <span
      class="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform group-[&[data-state=checked]]:translate-x-5"
    ></span>
  </hp-switch>
</div>
```

:::

</Flavor>

</CodeSnippet>

## Anatomía

El estado `checked` y la interacción (ratón y teclado) viven en el elemento raíz.

```html
<hp-switch> ... </hp-switch>
```

## API Reference

### `hp-switch`

Rol `switch`, `aria-checked` sincronizado con `checked`, foco por teclado y activación con `Enter` / `Espacio`.

#### Atributos

| Atributo   | Tipo                  | Por defecto | Descripción                                                   |
| :--------- | :-------------------- | :---------- | :------------------------------------------------------------ |
| `checked`  | _boolean (presencia)_ | ausente     | Estado activado. Observado.                                   |
| `disabled` | _boolean (presencia)_ | ausente     | Quita `tabindex`, añade `aria-disabled`. Observado.           |
| `required` | _boolean (presencia)_ | ausente     | Añade `aria-required="true"` cuando está presente. Observado. |
| `role`     | `string`              | `"switch"`  | Si no se indica, se asigna `switch`.                          |
| `tabindex` | `string`              | `"0"`       | Con `disabled`, se elimina.                                   |

#### Propiedades

| Propiedad  | Tipo      | Descripción                                            |
| :--------- | :-------- | :----------------------------------------------------- |
| `checked`  | `boolean` | Getter/setter sincronizado con el atributo `checked`.  |
| `disabled` | `boolean` | Getter/setter sincronizado con el atributo `disabled`. |

#### Métodos

| Método     | Descripción                                                  |
| :--------- | :----------------------------------------------------------- |
| `toggle()` | Alterna `checked` si no está `disabled` y emite `hp-change`. |

#### Eventos

| Evento      | Detalle                | Descripción                                           |
| :---------- | :--------------------- | :---------------------------------------------------- |
| `hp-change` | `{ checked: boolean }` | Tras `toggle()` por clic o teclado (`bubbles: true`). |

## Accesibilidad

`hp-switch` implementa el patrón **WAI-ARIA Switch**:

- Maneja automáticamente el rol `switch`.
- Sincroniza `aria-checked` basándose en el estado interno.
- Soporta las teclas `Espacio` y `Enter` para alternar el valor.
- Manejo de foco consistente.
