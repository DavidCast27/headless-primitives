# Progress

<span class="hp-badge">Nuevo</span>

El componente `hp-progress` informa al usuario sobre el estado de avance de un proceso largo, como una descarga o una carga de datos, siguiendo el estándar de accesibilidad `progressbar`.

## Instalación

```bash
pnpm add @headless-primitives/progress
```

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-progress` usando únicamente `@headless-primitives/utils/base.css`. Los atributos ARIA y la variable CSS `--hp-progress-percentage` funcionan completamente.

<div class="hp-demo-card">
  <hp-progress value="65"></hp-progress>
  <hp-progress></hp-progress>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <div style="width: 100%; max-width: 300px; display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <p style="font-size: 0.85rem; margin-bottom: 8px;">Determinado (75%)</p>
      <hp-progress value="75" class="demo-progress"></hp-progress>
    </div>
    <div>
      <p style="font-size: 0.85rem; margin-bottom: 8px;">Indeterminado</p>
      <hp-progress class="demo-progress"></hp-progress>
    </div>
  </div>
</div>

<style>
hp-progress-indicator { display: block; }
.demo-progress {
  display: block;
  height: 8px;
  background: var(--vp-c-divider);
  border-radius: 999px;
  overflow: hidden;
}
.demo-progress hp-progress-indicator {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.3s ease;
}
.demo-progress hp-progress-indicator[data-indeterminate] {
  width: 30% !important;
  animation: hp-progress-ind 1.5s infinite linear;
}
@keyframes hp-progress-ind {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
</style>

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

/* El componente crea hp-progress-indicator internamente */
.my-progress hp-progress-indicator {
  display: block;
  height: 100%;
  background: blue;
  transition: width 0.3s ease;
  /* El width lo setea el componente via style inline */
}

.my-progress hp-progress-indicator[data-indeterminate] {
  width: 30% !important;
  animation: progress-ind 1.5s infinite linear;
}

@keyframes progress-ind {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
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

```css [style.css]
/* El componente crea hp-progress-indicator internamente */
hp-progress hp-progress-indicator {
  display: block;
  height: 100%;
  @apply bg-blue-600 transition-all duration-300;
}

hp-progress hp-progress-indicator[data-indeterminate] {
  width: 30% !important;
  animation: progress-ind 1.5s infinite linear;
}

@keyframes progress-ind {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}
```

:::

</Flavor>

</CodeSnippet>

## Anatomía

El componente crea internamente un `hp-progress-indicator` que recibe el `width` via `style` inline. La variable CSS `--hp-progress-percentage` también se expone en el host para usos avanzados.

```html
<hp-progress value="50" min="0" max="100">
  <!-- hp-progress-indicator se crea automáticamente -->
  <hp-progress-indicator style="width: 50%"></hp-progress-indicator>
</hp-progress>
```

## API Reference

### `hp-progress`

Rol `progressbar`. Con `value` definido expone el porcentaje en una variable CSS; sin `value`, el progreso es indeterminado (`aria-valuenow` omitido).

#### Atributos

| Atributo | Tipo     | Por defecto     | Descripción                                                 |
| :------- | :------- | :-------------- | :---------------------------------------------------------- |
| `value`  | `number` | —               | Progreso actual; si falta, estado indeterminado. Observado. |
| `min`    | `number` | `0`             | Límite inferior. Observado.                                 |
| `max`    | `number` | `100`           | Límite superior. Observado.                                 |
| `role`   | `string` | `"progressbar"` | Si no se indica, se asigna `progressbar`.                   |

#### Propiedades

| Propiedad    | Tipo             | Descripción                                                         |
| :----------- | :--------------- | :------------------------------------------------------------------ |
| `value`      | `number \| null` | Refleja el atributo `value` (`null` si no está definido).           |
| `min`        | `number`         | Refleja `min`.                                                      |
| `max`        | `number`         | Refleja `max`.                                                      |
| `percentage` | `number`         | Porcentaje 0–100 derivado de `value`, `min` y `max` (solo lectura). |

#### Variables CSS (en el host)

| Variable                   | Descripción                                                                                                           |
| :------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `--hp-progress-percentage` | Porcentaje calculado (p. ej. `50%`) aplicado en `style` cuando hay `value`; se elimina si el estado es indeterminado. |

#### ARIA (gestionado por el primitivo)

| Atributo                          | Descripción                                 |
| :-------------------------------- | :------------------------------------------ |
| `aria-valuemin` / `aria-valuemax` | Sincronizados con `min` y `max`.            |
| `aria-valuenow`                   | Presente solo cuando `value` está definido. |

## Accesibilidad

`hp-progress` implementa el patrón **WAI-ARIA Progressbar**:

- Maneja automáticamente el rol `progressbar`.
- Gestiona `aria-valuenow`, `aria-valuemin` y `aria-valuemax`.
- Remueve `aria-valuenow` cuando el estado es indeterminado.
