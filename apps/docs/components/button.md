# Button <span class="hp-badge">Nuevo</span>

El componente `hp-button` es el elemento básico de interacción. Provee una base sólida y accesible ([WAI-ARIA Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)) para crear botones, enlaces que parecen botones o interruptores binarios, con total libertad creativa en el diseño visual.

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-button` usando únicamente `@headless-primitives/utils/base.css` — sin ningún estilo visual adicional. El comportamiento (foco, disabled, teclado) funciona completamente.

<div class="hp-demo-card">
  <hp-button>Botón</hp-button>
  <hp-button disabled>Deshabilitado</hp-button>
  <hp-button aria-pressed="false">Toggle</hp-button>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-button class="demo-btn primary">Botón Primario</hp-button>
  <hp-button class="demo-btn secondary">Secundario</hp-button>
  <hp-button class="demo-btn" disabled>Deshabilitado</hp-button>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-button class="my-btn"> Click me </hp-button>

<hp-button class="my-btn" disabled> Can't click </hp-button>
```

```css [style.css]
.my-btn {
  padding: 10px 20px;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.my-btn:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.my-btn[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-button
  class="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
>
  Click me
</hp-button>

<hp-button
  class="px-5 py-2.5 bg-blue-600 text-white rounded-lg opacity-50 cursor-not-allowed"
  disabled
>
  Can't click
</hp-button>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/button
```

```bash [npm]
npm install @headless-primitives/button
```

```bash [yarn]
yarn add @headless-primitives/button
```

```bash [bun]
bun add @headless-primitives/button
```

:::

## Features

- ⌨️ Activación por teclado con `Enter` y `Space`.
- ♿️ `role="button"` y `aria-disabled` gestionados automáticamente.
- 🎨 Sin estilos visuales (Headless).
- 🔄 Modo Toggle integrado (`aria-pressed`) con emisión de `hp-change`.

## Anatomía

```html
<hp-button></hp-button>
```

## API Reference

### `hp-button`

Custom element de un solo nodo con rol `button` por defecto, activable con teclado (`Enter` / `Space`). Si existe `aria-pressed`, actúa como interruptor y emite `hp-change`.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo                  | Por Defecto | Descripción                                                                        |
| -------------------- | --------------------- | ----------- | ---------------------------------------------------------------------------------- |
| `disabled`           | `boolean`             | `false`     | Si está presente, quita el foco por tabulación y establece `aria-disabled="true"`. |
| `aria-pressed`       | `"true"` \| `"false"` | —           | Si está definido, cada activación alterna el valor y dispara `hp-change`.          |

#### Eventos

| Evento      | Detalle                | Descripción                                        |
| ----------- | ---------------------- | -------------------------------------------------- |
| `hp-change` | `{ pressed: boolean }` | Solo cuando hay `aria-pressed` y cambia el estado. |

#### Atributos ARIA gestionados automáticamente

- `role="button"` — Asignado automáticamente si no se especifica.
- `aria-disabled` — Sincronizado con el atributo `disabled`.
- `tabindex="0"` — Forzado cuando no está deshabilitado.
- `data-state` — `"on"` | `"off"` cuando opera en modo toggle.

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/).

### Navegación por teclado

| Tecla   | Acción           |
| ------- | ---------------- |
| `Enter` | Activa el botón. |
| `Space` | Activa el botón. |

## Ejemplos

### Modo Toggle (Interruptor)

```html
<hp-button aria-pressed="false">Favorito ♡</hp-button>

<script>
  const btn = document.querySelector("hp-button");
  btn.addEventListener("hp-change", (e) => {
    btn.textContent = e.detail.pressed ? "Favorito ♥" : "Favorito ♡";
  });
</script>
```

### Botón Deshabilitado

```html
<hp-button disabled>No disponible</hp-button>
```

<style>
.demo-btn {
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}
.primary { background: var(--vp-c-brand-1); color: white; }
.primary:hover { background: var(--vp-c-brand-2); }
.secondary { background: transparent; border-color: var(--vp-c-divider); }
.secondary:hover { border-color: var(--vp-c-brand-1); }
.demo-btn[disabled] { opacity: 0.5; cursor: not-allowed; }
</style>
