# Progress

<span class="hp-badge">Nuevo</span>

El componente `hp-progress` informa al usuario sobre el estado de avance de un proceso largo, como una descarga o una carga de datos, siguiendo el estándar de accesibilidad `progressbar`.

## Instalación

```bash
pnpm add @headless-primitives/progress
```

## Demostración

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
.demo-progress {
  display: block;
  height: 8px;
  background: var(--vp-c-divider);
  border-radius: 999px;
  overflow: hidden;
  position: relative;
}
.demo-progress::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--vp-c-brand-1);
  width: var(--hp-progress-percentage, 0%);
  transition: width 0.3s ease;
}
.demo-progress:not([aria-valuenow])::after {
  width: 30%;
  animation: hp-progress-ind 1.5s infinite linear;
}
@keyframes hp-progress-ind {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
</style>

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
  position: relative;
  overflow: hidden;
}

.my-progress::after {
  content: "";
  position: absolute;
  height: 100%;
  background: blue;
  /* La variable se calcula automáticamente */
  width: var(--hp-progress-percentage, 0%);
}
```

:::

## Anatomía

El raíz aplica los atributos ARIA y expone el avance como variable CSS (`--hp-progress-percentage`).

```html
<hp-progress value="50" min="0" max="100"></hp-progress>
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
