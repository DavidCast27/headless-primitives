---
title: Slider
badge: Nuevo
---

# Slider <span class="hp-badge">Nuevo</span>

Control deslizante accesible para seleccionar un valor dentro de un rango. Soporta label y valor integrados, teclado completo, arrastrar, orientación vertical y paso personalizable.

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

```ts
import "@headless-primitives/slider";
```

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-slider` usando únicamente `@headless-primitives/utils/base.css`. El valor, teclado y drag funcionan completamente. El label y el valor mostrado son parte del componente.

<div class="hp-demo-card">
  <div style="display:flex;flex-direction:column;gap:1.5rem;width:100%;">
    <hp-slider value="40" min="0" max="100" label="Volumen" show-value value-suffix="%"></hp-slider>
    <hp-slider value="60" min="0" max="100" label="Deshabilitado" show-value value-suffix="%" disabled></hp-slider>
  </div>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <div style="display:flex;flex-direction:column;gap:2rem;width:100%;">
    <hp-slider id="docs-vol" class="demo-slider" value="60" min="0" max="100" label="Volumen" show-value value-suffix="%"></hp-slider>
    <hp-slider id="docs-temp" class="demo-slider" value="22" min="16" max="30" step="0.5" label="Temperatura" show-value value-suffix="°C"></hp-slider>
    <div style="display:flex;gap:2.5rem;align-items:flex-start;">
      <hp-slider id="docs-vert" class="demo-slider" value="50" min="0" max="100" orientation="vertical" label="Canal" show-value value-suffix="%"></hp-slider>
      <hp-slider class="demo-slider" value="40" min="0" max="100" label="Deshabilitado" show-value value-suffix="%" disabled></hp-slider>
    </div>
  </div>
</div>

<style>
/* ── Demo sin estilos — apariencia mínima (base.css) ── */
.hp-demo-card hp-slider:not(.demo-slider) {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  touch-action: none;
  user-select: none;
}
.hp-demo-card hp-slider:not(.demo-slider) [data-hp-slider-header] {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
}
.hp-demo-card hp-slider:not(.demo-slider) [data-hp-slider-rail] {
  position: relative;
  height: 18px;
  width: 100%;
}
.hp-demo-card hp-slider:not(.demo-slider) [data-hp-slider-track] {
  position: absolute;
  left: 0; right: 0; top: 50%;
  transform: translateY(-50%);
  height: 6px;
  background: currentColor;
  opacity: 0.15;
  border-radius: 9999px;
  cursor: pointer;
}
.hp-demo-card hp-slider:not(.demo-slider) [data-hp-slider-range] {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: var(--hp-slider-percentage, 0%);
  background: currentColor;
  opacity: 1;
  border-radius: inherit;
}
.hp-demo-card hp-slider:not(.demo-slider) [data-hp-slider-thumb] {
  position: absolute;
  top: 50%;
  left: var(--hp-slider-percentage, 0%);
  transform: translate(-50%, -50%);
  width: 18px; height: 18px;
  border-radius: 50%;
  background: currentColor;
  cursor: grab;
  z-index: 1;
}
.hp-demo-card hp-slider:not(.demo-slider)[data-disabled] {
  opacity: 0.45;
  pointer-events: none;
}

/* ── Demo con estilos personalizados ── */
.demo-slider {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  touch-action: none;
  user-select: none;
  cursor: default;
}
.demo-slider [data-hp-slider-header] {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.demo-slider [data-hp-slider-label] {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}
.demo-slider [data-hp-slider-output] {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}
.demo-slider [data-hp-slider-rail] {
  position: relative;
  height: 20px;
}
.demo-slider [data-hp-slider-track] {
  position: absolute;
  left: 0; right: 0; top: 50%;
  transform: translateY(-50%);
  height: 6px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 9999px;
  cursor: pointer;
  overflow: visible;
  box-sizing: border-box;
}
.demo-slider [data-hp-slider-range] {
  position: absolute;
  left: -1px; top: -1px; bottom: -1px;
  width: calc(var(--hp-slider-percentage, 0%) + 1px);
  background: var(--vp-c-brand-1);
  border-radius: inherit;
  transition: width 60ms linear;
}
.demo-slider [data-hp-slider-thumb] {
  position: absolute;
  top: 50%;
  left: var(--hp-slider-percentage, 0%);
  transform: translate(-50%, -50%) scale(1);
  width: 18px; height: 18px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  border: 2.5px solid var(--vp-c-bg);
  box-shadow:
    0 1px 4px rgba(0,0,0,0.2),
    0 0 0 0 color-mix(in srgb, var(--vp-c-brand-1) 30%, transparent);
  cursor: grab;
  z-index: 1;
  transition:
    left 60ms linear,
    transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 200ms ease;
  will-change: left, transform;
}
.demo-slider [data-hp-slider-thumb]:hover {
  transform: translate(-50%, -50%) scale(1.18);
  box-shadow:
    0 3px 8px rgba(0,0,0,0.2),
    0 0 0 6px color-mix(in srgb, var(--vp-c-brand-1) 15%, transparent);
}
.demo-slider [data-hp-slider-thumb]:active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(0.9);
  box-shadow:
    0 1px 3px rgba(0,0,0,0.2),
    0 0 0 9px color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  transition:
    left 60ms linear,
    transform 100ms cubic-bezier(0.25, 0, 0.5, 1),
    box-shadow 150ms ease;
}
.demo-slider [data-hp-slider-thumb]:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--vp-c-bg),
    0 0 0 4px var(--vp-c-brand-1),
    0 0 0 8px color-mix(in srgb, var(--vp-c-brand-1) 20%, transparent);
}
/* Vertical */
.demo-slider[data-orientation="vertical"] {
  flex-direction: row;
  align-items: flex-start;
  width: fit-content;
}
.demo-slider[data-orientation="vertical"] [data-hp-slider-rail] {
  width: 20px;
  height: 120px;
}
.demo-slider[data-orientation="vertical"] [data-hp-slider-track] {
  left: 50%; right: auto; top: 0; bottom: 0;
  width: 6px; height: auto;
  transform: translateX(-50%);
}
.demo-slider[data-orientation="vertical"] [data-hp-slider-range] {
  left: -1px; right: -1px; top: auto;
  bottom: -1px; width: auto;
  height: calc(var(--hp-slider-percentage, 0%) + 1px);
  transition: height 60ms linear;
}
.demo-slider[data-orientation="vertical"] [data-hp-slider-thumb] {
  top: auto; left: 50%;
  bottom: var(--hp-slider-percentage, 0%);
  transform: translate(-50%, 50%) scale(1);
  transition:
    bottom 60ms linear,
    transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 200ms ease;
  will-change: bottom, transform;
}
.demo-slider[data-orientation="vertical"] [data-hp-slider-thumb]:hover {
  transform: translate(-50%, 50%) scale(1.18);
}
.demo-slider[data-orientation="vertical"] [data-hp-slider-thumb]:active {
  transform: translate(-50%, 50%) scale(0.9);
  transition:
    bottom 60ms linear,
    transform 100ms cubic-bezier(0.25, 0, 0.5, 1),
    box-shadow 150ms ease;
}
/* Disabled */
.demo-slider[data-disabled] { opacity: 0.45; pointer-events: none; }
</style>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<!-- Con label y valor integrados -->
<hp-slider
  id="volume"
  class="my-slider"
  value="60"
  min="0"
  max="100"
  label="Volumen"
  show-value
  value-suffix="%"
></hp-slider>

<!-- Sin label (uso simple) -->
<hp-slider id="volume-simple" class="my-slider" value="60" min="0" max="100"></hp-slider>
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

.my-slider [data-hp-slider-output] {
  color: #64748b;
  font-variant-numeric: tabular-nums;
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
  overflow: visible;
}

.my-slider [data-hp-slider-range] {
  position: absolute;
  left: -1px;
  top: -1px;
  bottom: -1px;
  width: calc(var(--hp-slider-percentage, 0%) + 1px);
  background: #0369a1;
  border-radius: inherit;
  transition: width 60ms linear;
}

.my-slider [data-hp-slider-thumb] {
  position: absolute;
  top: 50%;
  left: var(--hp-slider-percentage, 0%);
  transform: translate(-50%, -50%) scale(1);
  width: 18px;
  height: 18px;
  background: #0369a1;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: grab;
  z-index: 1;
  transition:
    left 60ms linear,
    transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 200ms ease;
}

.my-slider [data-hp-slider-thumb]:hover {
  transform: translate(-50%, -50%) scale(1.18);
  box-shadow: 0 0 0 6px rgba(3, 105, 161, 0.15);
}

.my-slider [data-hp-slider-thumb]:active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(0.9);
  transition:
    left 60ms linear,
    transform 100ms cubic-bezier(0.25, 0, 0.5, 1);
}

.my-slider[data-disabled] {
  opacity: 0.45;
  pointer-events: none;
}
```

```js [script.js]
// El valor se actualiza automáticamente en [data-hp-slider-output]
// cuando se usan los atributos show-value y value-suffix.

// Para reaccionar al cambio desde JS:
const slider = document.getElementById("volume");
slider.addEventListener("hp-change", (e) => {
  console.log("Nuevo valor:", e.detail.value);
});
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-slider
  id="volume"
  value="60"
  min="0"
  max="100"
  label="Volumen"
  show-value
  value-suffix="%"
  class="
    flex flex-col gap-1.5 touch-none select-none
    [&_[data-hp-slider-header]]:flex
    [&_[data-hp-slider-header]]:justify-between
    [&_[data-hp-slider-header]]:text-sm
    [&_[data-hp-slider-header]]:font-medium
    [&_[data-hp-slider-output]]:text-slate-500
    [&_[data-hp-slider-rail]]:relative
    [&_[data-hp-slider-rail]]:h-5
    [&_[data-hp-slider-track]]:absolute
    [&_[data-hp-slider-track]]:left-0
    [&_[data-hp-slider-track]]:right-0
    [&_[data-hp-slider-track]]:top-1/2
    [&_[data-hp-slider-track]]:-translate-y-1/2
    [&_[data-hp-slider-track]]:h-1.5
    [&_[data-hp-slider-track]]:rounded-full
    [&_[data-hp-slider-track]]:bg-slate-200
    [&_[data-hp-slider-track]]:cursor-pointer
    [&_[data-hp-slider-range]]:absolute
    [&_[data-hp-slider-range]]:inset-0
    [&_[data-hp-slider-range]]:bg-sky-600
    [&_[data-hp-slider-range]]:rounded-full
    [&_[data-hp-slider-thumb]]:absolute
    [&_[data-hp-slider-thumb]]:top-1/2
    [&_[data-hp-slider-thumb]]:size-[18px]
    [&_[data-hp-slider-thumb]]:rounded-full
    [&_[data-hp-slider-thumb]]:bg-sky-600
    [&_[data-hp-slider-thumb]]:border-2
    [&_[data-hp-slider-thumb]]:border-white
    [&_[data-hp-slider-thumb]]:cursor-grab
    [&_[data-hp-slider-thumb]]:z-10
  "
></hp-slider>
```

:::

</Flavor>

</CodeSnippet>

## API Reference

### `<hp-slider>`

Elemento raíz del slider. Gestiona el estado, la accesibilidad y el comportamiento interactivo.

| Atributo       | Tipo                         | Default        | Descripción                                       |
| -------------- | ---------------------------- | -------------- | ------------------------------------------------- |
| `value`        | `number`                     | `0`            | Valor actual del slider                           |
| `min`          | `number`                     | `0`            | Valor mínimo                                      |
| `max`          | `number`                     | `100`          | Valor máximo                                      |
| `step`         | `number`                     | `1`            | Incremento por paso de teclado                    |
| `orientation`  | `"horizontal" \| "vertical"` | `"horizontal"` | Orientación del slider                            |
| `disabled`     | `boolean`                    | `false`        | Deshabilita el slider                             |
| `label`        | `string`                     | `""`           | Texto del label integrado (opcional)              |
| `show-value`   | `boolean`                    | `false`        | Muestra el valor actual junto al label (opcional) |
| `value-suffix` | `string`                     | `""`           | Sufijo del valor mostrado (p.ej. `%`, `°C`, `px`) |

**Propiedad de solo lectura:**

| Propiedad    | Tipo     | Descripción                          |
| ------------ | -------- | ------------------------------------ |
| `percentage` | `number` | Valor actual como porcentaje (0–100) |

**Data attributes (hooks de estilo):**

| Atributo           | Valores                       | Descripción                   |
| ------------------ | ----------------------------- | ----------------------------- |
| `data-orientation` | `"horizontal"` / `"vertical"` | Orientación actual            |
| `data-value`       | `string`                      | Valor actual como string      |
| `data-disabled`    | `"true"` / ausente            | Estado deshabilitado          |
| `aria-disabled`    | `"true"` / ausente            | ARIA para tecnología asistiva |

**CSS Custom Properties:**

| Propiedad                  | Descripción                                  |
| -------------------------- | -------------------------------------------- |
| `--hp-slider-percentage`   | Porcentaje actual (establecido por JS)       |
| `--hp-slider-track-height` | Grosor del track (default `6px`)             |
| `--hp-slider-thumb-size`   | Tamaño del thumb (default `18px`)            |
| `--hp-slider-height`       | Altura del slider vertical (default `200px`) |

### Elementos internos generados

| Selector                  | Descripción                                              |
| ------------------------- | -------------------------------------------------------- |
| `[data-hp-slider-header]` | Fila con label + output (solo si `label` o `show-value`) |
| `[data-hp-slider-label]`  | `<span>` con el texto del label                          |
| `[data-hp-slider-output]` | `<output>` con el valor actual + sufijo                  |
| `[data-hp-slider-rail]`   | Contenedor de posicionamiento para track y thumb         |
| `[data-hp-slider-track]`  | Track de fondo (área de interacción de clic)             |
| `[data-hp-slider-range]`  | Porción activa del track (fill)                          |
| `[data-hp-slider-thumb]`  | Thumb deslizable con `role="slider"`                     |

### Eventos

| Evento      | Detail              | Descripción                                |
| ----------- | ------------------- | ------------------------------------------ |
| `hp-input`  | `{ value: number }` | Emitido continuamente mientras se arrastra |
| `hp-change` | `{ value: number }` | Emitido al soltar el thumb o usar teclado  |

::: tip Valor automático
Cuando se usa `show-value`, el `[data-hp-slider-output]` se actualiza automáticamente sin JS. Los eventos son necesarios solo cuando se quiere reaccionar al cambio desde el exterior.
:::

```ts
// Solo necesario cuando show-value no es suficiente
// (p.ej. sincronizar con otro elemento o hacer una petición)
slider.addEventListener("hp-input", (e) => {
  const { value } = (e as CustomEvent<{ value: number }>).detail;
  console.log("Moviendo:", value);
});

slider.addEventListener("hp-change", (e) => {
  const { value } = (e as CustomEvent<{ value: number }>).detail;
  console.log("Cambio confirmado:", value);
  // guardar en servidor, actualizar estado, etc.
});
```

### Teclado

El thumb (`[data-hp-slider-thumb]`) recibe el foco y responde a:

| Tecla                     | Comportamiento           |
| ------------------------- | ------------------------ |
| `ArrowRight` / `ArrowUp`  | Aumenta en `step`        |
| `ArrowLeft` / `ArrowDown` | Disminuye en `step`      |
| `Home`                    | Salta al valor mínimo    |
| `End`                     | Salta al valor máximo    |
| `PageUp`                  | Aumenta en `step × 10`   |
| `PageDown`                | Disminuye en `step × 10` |

## Accesibilidad

`hp-slider` implementa el patrón [ARIA Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) del APG:

- El thumb tiene `role="slider"` con `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` y `aria-orientation` sincronizados automáticamente.
- `aria-valuetext` incluye el `value-suffix` cuando está definido (p.ej. `"60%"`).
- Cuando se usa `label`, el thumb recibe `aria-labelledby` apuntando al `[data-hp-slider-label]`.
- El track tiene `aria-hidden="true"` para evitar anuncio redundante por lectores de pantalla.
- Con `disabled`: `aria-disabled="true"` en el root y `tabindex="-1"` en el thumb.
- `prefers-reduced-motion`: todas las transiciones se eliminan cuando el usuario prefiere movimiento reducido.
