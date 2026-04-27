# Slider <span class="hp-badge">Nuevo</span>

Control deslizante accesible para seleccionar un valor dentro de un rango. Implementa el patrón [WAI-ARIA Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) con teclado completo, arrastre, orientación vertical y label/output integrados.

## Demostración

### Sin estilos (solo base.css)

<div class="hp-demo-card">
  <div class="demo-sld-stack">
    <hp-slider value="40" min="0" max="100" label="Volumen" show-value value-suffix="%"></hp-slider>
    <hp-slider value="60" min="0" max="100" label="Deshabilitado" show-value value-suffix="%" disabled></hp-slider>
  </div>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <div class="demo-sld-stack">
    <hp-slider class="demo-sld" value="60" min="0" max="100" label="Volumen" show-value value-suffix="%"></hp-slider>
    <hp-slider class="demo-sld" value="22" min="16" max="30" step="0.5" label="Temperatura" show-value value-suffix="°C"></hp-slider>
    <hp-slider class="demo-sld" value="40" min="0" max="100" label="Deshabilitado" show-value value-suffix="%" disabled></hp-slider>
  </div>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-slider
  class="my-slider"
  value="60"
  min="0"
  max="100"
  label="Volumen"
  show-value
  value-suffix="%"
></hp-slider>
```

```css [style.css]
.my-slider {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  touch-action: none;
  user-select: none;
}

.my-slider [data-hp-slider-header] {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  font-weight: 500;
}

.my-slider [data-hp-slider-rail] {
  position: relative;
  height: 20px;
}

.my-slider [data-hp-slider-track] {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 6px;
  background: #e2e8f0;
  border-radius: 9999px;
  cursor: pointer;
}

.my-slider [data-hp-slider-range] {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: var(--hp-slider-percentage, 0%);
  background: #0369a1;
  border-radius: inherit;
}

.my-slider [data-hp-slider-thumb] {
  position: absolute;
  top: 50%;
  left: var(--hp-slider-percentage, 0%);
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  background: #0369a1;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: grab;
  z-index: 1;
}

.my-slider[data-disabled] {
  opacity: 0.45;
  pointer-events: none;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-slider
  value="60"
  min="0"
  max="100"
  label="Volumen"
  show-value
  value-suffix="%"
  class="flex flex-col gap-1.5 touch-none select-none"
></hp-slider>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/slider
```

```bash [npm]
npm install @headless-primitives/slider
```

```bash [yarn]
yarn add @headless-primitives/slider
```

```bash [bun]
bun add @headless-primitives/slider
```

:::

## Features

- ⌨️ Flechas, `Home`, `End`, `PageUp`/`PageDown` para control preciso.
- ♿️ `role="slider"`, `aria-valuenow`, `aria-valuetext`, `aria-labelledby` automáticos.
- 🎨 Sin estilos visuales (Headless) — genera la estructura interna (track, range, thumb).
- 📐 Orientación configurable (`horizontal` / `vertical`).
- 🏷️ Label y output integrados opcionales (`label`, `show-value`, `value-suffix`).

## Anatomía

```html
<hp-slider value="50" min="0" max="100">
  <!-- Generado automáticamente: -->
  <!-- [data-hp-slider-header] → [data-hp-slider-label] + [data-hp-slider-output] -->
  <!-- [data-hp-slider-rail] → [data-hp-slider-track] → [data-hp-slider-range] -->
  <!--                        → [data-hp-slider-thumb] -->
</hp-slider>
```

## API Reference

### `hp-slider`

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo                           | Por Defecto    | Descripción                       |
| -------------------- | ------------------------------ | -------------- | --------------------------------- |
| `value`              | `number`                       | `0`            | Valor actual.                     |
| `min`                | `number`                       | `0`            | Valor mínimo.                     |
| `max`                | `number`                       | `100`          | Valor máximo.                     |
| `step`               | `number`                       | `1`            | Incremento por paso.              |
| `orientation`        | `"horizontal"` \| `"vertical"` | `"horizontal"` | Orientación del slider.           |
| `disabled`           | `boolean`                      | `false`        | Deshabilita el slider.            |
| `label`              | `string`                       | `""`           | Texto del label integrado.        |
| `show-value`         | `boolean`                      | `false`        | Muestra el valor actual.          |
| `value-suffix`       | `string`                       | `""`           | Sufijo del valor (ej: `%`, `°C`). |

#### Propiedades de solo lectura

| Propiedad    | Tipo     | Descripción                    |
| ------------ | -------- | ------------------------------ |
| `percentage` | `number` | Valor como porcentaje (0–100). |

#### Eventos

| Evento      | Detalle             | Descripción                                 |
| ----------- | ------------------- | ------------------------------------------- |
| `hp-input`  | `{ value: number }` | Emitido continuamente mientras se arrastra. |
| `hp-change` | `{ value: number }` | Emitido al soltar el thumb o usar teclado.  |

#### Variables CSS

| Variable                 | Descripción                 |
| ------------------------ | --------------------------- |
| `--hp-slider-percentage` | Porcentaje actual del fill. |

#### Elementos internos generados

| Selector                  | Descripción                    |
| ------------------------- | ------------------------------ |
| `[data-hp-slider-header]` | Fila con label + output.       |
| `[data-hp-slider-label]`  | `<span>` con texto del label.  |
| `[data-hp-slider-output]` | `<output>` con valor + sufijo. |
| `[data-hp-slider-rail]`   | Container de track y thumb.    |
| `[data-hp-slider-track]`  | Track de fondo.                |
| `[data-hp-slider-range]`  | Porción activa (fill).         |
| `[data-hp-slider-thumb]`  | Thumb con `role="slider"`.     |

#### Atributos ARIA gestionados automáticamente (en el thumb)

- `role="slider"` — Siempre presente.
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` — Sincronizados.
- `aria-valuetext` — Incluye `value-suffix`.
- `aria-orientation` — Sincronizado con `orientation`.
- `aria-labelledby` — Apunta al label cuando existe.

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/).

### Navegación por teclado

| Tecla                     | Acción                    |
| ------------------------- | ------------------------- |
| `ArrowRight` / `ArrowUp`  | Aumenta en `step`.        |
| `ArrowLeft` / `ArrowDown` | Disminuye en `step`.      |
| `Home`                    | Salta al valor mínimo.    |
| `End`                     | Salta al valor máximo.    |
| `PageUp`                  | Aumenta en `step × 10`.   |
| `PageDown`                | Disminuye en `step × 10`. |
