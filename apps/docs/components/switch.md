# Switch <span class="hp-badge">Nuevo</span>

El componente `hp-switch` implementa el patrón [WAI-ARIA Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/), proveyendo un control interactivo para alternar entre dos estados (encendido/apagado) siguiendo la semántica de un interruptor físico.

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
  <div class="demo-sw-wrap">
    <hp-label for="sw-demo">Activar modo oscuro</hp-label>
    <hp-switch id="sw-demo" class="switch"></hp-switch>
  </div>
</div>

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

## Features

- ⌨️ Activación por teclado con `Space` y `Enter`.
- ♿️ `role="switch"` y `aria-checked` gestionados automáticamente.
- 🎨 Sin estilos visuales (Headless).
- ⚡️ `data-state` sincronizado (`checked` / `unchecked`) para estilizado CSS.

## Anatomía

```html
<hp-switch></hp-switch>
```

## API Reference

### `hp-switch`

Control con `role="switch"`, activable con click, `Enter` y `Space`.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción                              |
| -------------------- | --------- | ----------- | ---------------------------------------- |
| `checked`            | `boolean` | `false`     | Estado activado del switch.              |
| `disabled`           | `boolean` | `false`     | Quita `tabindex`, añade `aria-disabled`. |
| `required`           | `boolean` | `false`     | Añade `aria-required="true"`.            |

#### Métodos

| Método     | Descripción                                                  |
| ---------- | ------------------------------------------------------------ |
| `toggle()` | Alterna `checked` si no está `disabled` y emite `hp-change`. |

#### Eventos

| Evento      | Detalle                | Descripción                                                  |
| ----------- | ---------------------- | ------------------------------------------------------------ |
| `hp-change` | `{ checked: boolean }` | Se emite cuando el estado cambia por interacción de usuario. |

#### Atributos ARIA gestionados automáticamente

- `role="switch"` — Asignado si no se especifica.
- `aria-checked` — Sincronizado con `checked`.
- `aria-disabled` — Sincronizado con `disabled`.
- `aria-required` — Sincronizado con `required`.
- `tabindex="0"` — Habilitado cuando no está deshabilitado.
- `data-state` — `"checked"` | `"unchecked"`.

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/).

### Navegación por teclado

| Tecla   | Acción                        |
| ------- | ----------------------------- |
| `Space` | Alterna el estado del switch. |
| `Enter` | Alterna el estado del switch. |

## Ejemplos

### Control Programático

```javascript
const sw = document.querySelector("hp-switch");

// Cambiar estado
sw.checked = true;

// Escuchar cambios
sw.addEventListener("hp-change", (e) => {
  console.log("Checked:", e.detail.checked);
});
```
