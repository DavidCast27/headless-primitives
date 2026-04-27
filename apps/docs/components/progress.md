# Progress <span class="hp-badge">Nuevo</span>

El componente `hp-progress` implementa el patrón [WAI-ARIA Progressbar](https://www.w3.org/WAI/ARIA/apg/patterns/meter/), informando al usuario sobre el estado de avance de un proceso. Soporta estados determinado e indeterminado.

## Demostración

### Sin estilos (solo base.css)

<div class="hp-demo-card">
  <hp-progress value="65"></hp-progress>
  <hp-progress></hp-progress>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <div class="demo-prg-stack">
    <div>
      <p class="demo-prg-label">Determinado (75%)</p>
      <hp-progress value="75" class="progress"></hp-progress>
    </div>
    <div>
      <p class="demo-prg-label">Indeterminado</p>
      <hp-progress class="progress"></hp-progress>
    </div>
  </div>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<!-- Determinado -->
<hp-progress value="60" class="my-progress"></hp-progress>

<!-- Indeterminado -->
<hp-progress class="my-progress"></hp-progress>
```

```css [style.css]
.my-progress {
  display: block;
  height: 10px;
  background: #eee;
  overflow: hidden;
  border-radius: 999px;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<!-- Determinado -->
<hp-progress
  value="60"
  class="block h-2 w-full bg-gray-200 rounded-full overflow-hidden"
></hp-progress>

<!-- Indeterminado -->
<hp-progress class="block h-2 w-full bg-gray-200 rounded-full overflow-hidden"></hp-progress>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/progress
```

```bash [npm]
npm install @headless-primitives/progress
```

```bash [yarn]
yarn add @headless-primitives/progress
```

```bash [bun]
bun add @headless-primitives/progress
```

:::

## Features

- ♿️ `role="progressbar"`, `aria-valuenow`, `aria-valuemin` y `aria-valuemax` gestionados automáticamente.
- 📊 Estado determinado (`value` definido) e indeterminado (`value` ausente).
- 🎨 Sin estilos visuales (Headless).
- 📐 Variable CSS `--hp-progress-percentage` para estilizado avanzado.

## Anatomía

```html
<hp-progress value="50" min="0" max="100"></hp-progress>
```

## API Reference

### `hp-progress`

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo             | Por Defecto | Descripción                              |
| -------------------- | ---------------- | ----------- | ---------------------------------------- |
| `value`              | `number \| null` | `null`      | Progreso actual. `null` = indeterminado. |
| `min`                | `number`         | `0`         | Límite inferior.                         |
| `max`                | `number`         | `100`       | Límite superior.                         |

#### Propiedades de solo lectura

| Propiedad    | Tipo     | Descripción                                          |
| ------------ | -------- | ---------------------------------------------------- |
| `percentage` | `number` | Porcentaje 0–100 derivado de `value`, `min` y `max`. |

#### Métodos

| Método          | Descripción                           |
| --------------- | ------------------------------------- |
| `setValue(val)` | Establece el valor programáticamente. |

#### Variables CSS

| Variable                   | Descripción                                                      |
| -------------------------- | ---------------------------------------------------------------- |
| `--hp-progress-percentage` | Porcentaje calculado (ej: `50%`). Vacío en estado indeterminado. |

#### Atributos ARIA gestionados automáticamente

- `role="progressbar"` — Asignado si no se especifica.
- `aria-valuemin` — Sincronizado con `min`.
- `aria-valuemax` — Sincronizado con `max`.
- `aria-valuenow` — Presente solo cuando `value` está definido.
- `data-state` — `"determinate"` | `"indeterminate"`.

## Accesibilidad

Adhiere al patrón [WAI-ARIA Progressbar](https://www.w3.org/WAI/ARIA/apg/patterns/meter/).

- `aria-valuenow` se elimina en estado indeterminado.
- `aria-valuemin` y `aria-valuemax` siempre presentes.
