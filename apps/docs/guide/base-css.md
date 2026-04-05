# base.css — Capa estructural

`@headless-primitives/utils/base.css` es la **base estructural** de todos los componentes de esta librería. Se ocupa del layout, la visibilidad, el posicionamiento y el mínimo funcional que hace que los componentes funcionen, sin ningún color, decisión de marca o theming.

---

## Qué pertenece a `base.css`

La capa estructural solo contiene reglas que controlan la forma y el comportamiento, nunca la apariencia visual. La siguiente tabla resume las categorías que sí tienen cabida aquí:

| Categoría                   | Ejemplos                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------- |
| Estado de visibilidad       | `display: none` para paneles cerrados, `visibility: hidden` para overlays cerrados |
| Posicionamiento             | `position: fixed` para backdrops y contenido de overlay, `z-index` en capas        |
| Primitivas de layout        | `display: inline-flex`, `align-items: center`, `flex-direction: column`            |
| Geometría estructural       | `width: 100%`, `min-width: 0`, `overflow: hidden`, `box-sizing`                    |
| Cursor y puntero            | `cursor: pointer`, `pointer-events: none` para estados deshabilitados/cerrados     |
| Transiciones funcionales    | Transiciones de opacidad/visibilidad para mostrar/ocultar overlays                 |
| Animaciones                 | `@keyframes` para movimiento de entrada/salida (solo `transform` + `opacity`)      |
| Utilidades de accesibilidad | `.hp-visually-hidden`, base del anillo de foco                                     |
| Tokens de z-index           | `--hp-z-index-backdrop`, `--hp-z-index-overlay-content`, etc.                      |

### Qué NO pertenece a `base.css`

Los siguientes elementos son responsabilidad exclusiva de la capa `@styles`:

- Colores (fondos, bordes, texto)
- Escala tipográfica (font-size, font-weight como valores de tema)
- Sombras más allá del mínimo estructural
- Border-radius (decorativo)
- Tokens de marca o acento

---

## Propiedades CSS personalizadas definidas en `base.css`

Estas propiedades están disponibles sin necesidad de cargar `@styles`. Pueden ser sobreescritas en tu propio `:root` o en cualquier selector:

| Propiedad                      | Valor por defecto               | Propósito                                                         |
| ------------------------------ | ------------------------------- | ----------------------------------------------------------------- |
| `--hp-focus-outline-color`     | `#2563eb`                       | Color del anillo de foco por teclado                              |
| `--hp-focus-outline-width`     | `2px`                           | Grosor del anillo de foco por teclado                             |
| `--hp-z-index-backdrop`        | `1000`                          | Z-index para backdrops de diálogos/overlays                       |
| `--hp-z-index-overlay-content` | `1100`                          | Z-index para contenido de diálogos/alertas y contenedor de toasts |
| `--hp-z-index-popover`         | `1200`                          | Z-index para contenido de popovers                                |
| `--hp-z-index-tooltip`         | `1300`                          | Z-index para contenido de tooltips                                |
| `--hp-duration-fast`           | `100ms`                         | Duración de animación rápida (tooltip)                            |
| `--hp-duration`                | `150ms`                         | Duración de animación predeterminada                              |
| `--hp-duration-slow`           | `200ms`                         | Duración de animación lenta (diálogo)                             |
| `--hp-ease`                    | `ease`                          | Función de easing predeterminada                                  |
| `--hp-ease-out`                | `cubic-bezier(0.16, 1, 0.3, 1)` | Easing con efecto muelle para overlays que entran                 |

---

## Reglas de comportamiento por capa

`base.css` usa dos tipos de selectores:

1. **Selectores de atributos de datos** — apuntan al estado funcional gestionado por el JavaScript del componente, por ejemplo `[data-hp-panel][data-state="closed"]`, `[data-hp-overlay-content]`, `[data-hp-backdrop]`.
2. **Selectores de elementos personalizados** — apuntan directamente al nombre del elemento para el layout estructural, por ejemplo `hp-toast-container`, `hp-tooltip`.

La capa de estilos (`@styles`) usa los mismos selectores con reglas decorativas de mayor especificidad que sobreescriben `base.css` cuando es necesario.

---

## Contratos estructurales por componente

### Paneles — `hp-tabs`, `hp-accordion`, `hp-collapsible`

**Mecanismo:** atributo de datos `[data-hp-panel]` + atributo `data-state`.

```css
/* base.css oculta los paneles cuando están cerrados/no seleccionados */
[data-hp-panel][data-state="closed"],
[data-hp-panel][data-state="unselected"] {
  display: none;
}
```

Esto significa que no necesitas gestionar la visibilidad de los paneles de pestañas ni del contenido del acordeón. El componente establece `data-state` de forma automática. Puedes usar `@starting-style` para animar la entrada sin JavaScript.

```html
<!-- Estos paneles son mostrados/ocultados por base.css mediante data-state -->
<hp-tab-panel data-hp-panel data-state="selected">...</hp-tab-panel>
<hp-tab-panel data-hp-panel data-state="unselected">...</hp-tab-panel>
<hp-accordion-content data-hp-panel data-state="open">...</hp-accordion-content>
<hp-accordion-content data-hp-panel data-state="closed">...</hp-accordion-content>
```

---

### Overlays — `hp-dialog`, `hp-popover`

**Mecanismo:** atributos de datos `[data-hp-overlay-content]` + `[data-hp-backdrop]` + `data-state`.

```css
/* base.css controla la visibilidad del overlay mediante transición de opacidad+visibilidad */
[data-hp-overlay-content][data-state="closed"],
[data-hp-backdrop][data-state="closed"] {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
}

[data-hp-overlay-content][data-state="open"],
[data-hp-backdrop][data-state="open"] {
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
}
```

**Posicionamiento (siempre en `base.css`):**

```css
/* Los backdrops cubren el viewport */
[data-hp-backdrop] {
  position: fixed;
  inset: 0;
  z-index: var(--hp-z-index-backdrop);
}

/* Los diálogos modales (aria-modal="true") se centran */
[data-hp-overlay-content][role="dialog"][aria-modal="true"],
[data-hp-overlay-content][role="alertdialog"] {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* El contenido flotante (popovers) es posicionado por el JS del componente */
[data-hp-popover-content],
[data-hp-tooltip-content] {
  position: absolute;
  z-index: var(--hp-z-index-popover);
}
```

> No añadas `position`, `top`, `left` ni `transform` a `hp-dialog-content` en tu propio CSS: ya están gestionados por `base.css` a través del selector `[data-hp-overlay-content]`.

---

### Tooltip — `hp-tooltip`, `hp-tooltip-content`

**Mecanismo:** `[data-hp-tooltip-content]` + atributo `data-state`.

```css
/* base.css usa una temporización más rápida para tooltips */
[data-hp-tooltip-content] {
  transition:
    opacity var(--hp-duration-fast, 100ms) ease,
    visibility 0s linear var(--hp-duration-fast, 100ms);
}

[data-hp-tooltip-content][data-state="closed"] {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
}
```

---

### Contenedor de toast — `hp-toast-container`

**Mecanismo:** el atributo `data-position` controla el posicionamiento en la esquina.

```css
/* base.css provee todas las posiciones de esquina */
hp-toast-container {
  position: fixed;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: var(--hp-z-index-overlay-content, 1100);
}

hp-toast-container[data-position="top-right"] {
  top: 0;
  right: 0;
}
hp-toast-container[data-position="top-left"] {
  top: 0;
  left: 0;
}
hp-toast-container[data-position="top-center"] {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
/* … variantes de bottom de igual forma */
```

---

### Controles interactivos — `hp-button`, `hp-switch`, `hp-checkbox`, `hp-radio`, `hp-toggle`

La sección de "apariencia mínima" en `base.css` provee una base visual funcional que funciona **sin `@styles`** cargado. Usa únicamente `currentColor`, `Canvas` y `CanvasText` — palabras clave de color del sistema del navegador que se adaptan automáticamente al modo oscuro/claro — junto con `color-mix()` para estados translúcidos.

```css
/* Todos los triggers interactivos comparten una base estructural */
hp-button,
hp-toggle,
hp-accordion-trigger,
hp-collapsible-trigger,
hp-tab,
hp-dialog-trigger,
hp-dialog-close,
hp-popover-trigger,
hp-tooltip-trigger,
hp-toast-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.75rem;
  border: 1px solid currentColor;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
  user-select: none;
  box-sizing: border-box;
}
```

Cuando `@styles` está cargado, sus selectores de mayor especificidad sobreescriben estos valores de reserva con valores correctos basados en tokens.

---

### Anillos de foco

```css
/* base.css provee el anillo de foco universal */
[data-hp-component]:focus-visible {
  outline: var(--hp-focus-outline-width) solid var(--hp-focus-outline-color);
  outline-offset: 2px;
}
```

Para cambiar el color sin modificar nada más:

```css
:root {
  --hp-focus-outline-color: #7c3aed; /* violeta */
}
```

---

### Estados deshabilitados

```css
/* base.css desactiva la interacción por puntero en controles deshabilitados */
[data-hp-component="switch"][disabled],
[data-hp-component="checkbox"][disabled],
[data-hp-component="radio"][disabled] {
  pointer-events: none;
}
```

La reducción visual de opacidad para los estados deshabilitados proviene de `@styles` (mediante `--hp-opacity-disabled`).

---

## Animaciones en `base.css`

Todas las definiciones de `@keyframes` viven en `base.css` porque son reglas de movimiento estructural, independientes del color o el tema. Los archivos de componentes de `@styles` activan estas animaciones mediante declaraciones `animation:`.

| `@keyframes`                             | Usado por                                                    |
| ---------------------------------------- | ------------------------------------------------------------ |
| `hp-backdrop-in` / `hp-backdrop-out`     | `hp-dialog-backdrop`                                         |
| `hp-dialog-in` / `hp-dialog-out`         | `hp-dialog-content`                                          |
| `hp-overlay-in` / `hp-overlay-out`       | `hp-popover-content` (lado: abajo)                           |
| `hp-overlay-in-up` / `hp-overlay-out-up` | `hp-popover-content` (lado: arriba)                          |
| `hp-tooltip-in` / `hp-tooltip-out`       | `hp-tooltip-content`                                         |
| `hp-toast-in` / `hp-toast-out`           | `hp-toast`                                                   |
| `hp-toast-in-center`                     | `hp-toast` (contenedor arriba/abajo centrado)                |
| `hp-panel-in`                            | Reservado para fade-in de paneles mediante `@starting-style` |
| `hp-progress-indeterminate`              | `hp-progress-indicator[data-indeterminate]`                  |

Todas las animaciones apuntan **únicamente a `transform` y `opacity`** — sin propiedades que disparen reflow — garantizando un rendimiento de 60fps compuesto por GPU.

### `prefers-reduced-motion`

`base.css` incluye un bloque global de sobreescritura de `prefers-reduced-motion` que desactiva todas las animaciones y transiciones para los usuarios que han indicado que prefieren movimiento reducido:

```css
@media (prefers-reduced-motion: reduce) {
  [data-hp-overlay-content],
  [data-hp-backdrop],
  hp-dialog-backdrop,
  hp-toast,
  [data-hp-tooltip-content] {
    animation: none !important;
    transition: none !important;
  }
  /* … y todas las transiciones de controles interactivos */
}
```

Cada archivo de componente individual de `@styles` también tiene su propio bloque `prefers-reduced-motion`.

---

## Uso sin `@styles`

Si decides no cargar `@styles`, `base.css` por sí solo es suficiente para que los componentes sean completamente funcionales y razonablemente visibles. Los componentes usan colores del sistema del navegador, por lo que se adaptan automáticamente al modo oscuro/claro mediante el esquema de colores del sistema operativo.

```css
/* Importación mínima viable — todo funciona, sin tema visual */
@import "@headless-primitives/utils/base.css";
```

Las siguientes reglas ya están en `base.css` y no necesitas añadirlas manualmente:

```css
/* Ya incluidas en base.css — no es necesario agregarlas */
[data-hp-panel][data-state="closed"] {
  display: none;
}
[data-hp-overlay-content][data-state="closed"] {
  visibility: hidden;
  opacity: 0;
}
```

---

## Diagrama de decisión por capa

Ante cada regla CSS que vayas a escribir, recorre este árbol para saber dónde colocarla:

```
¿El estilo trata únicamente de MOSTRAR u OCULTAR un elemento según su estado?
  → SÍ  →  base.css
  → NO  ↓

¿Trata del POSICIONAMIENTO (fixed, absolute, z-index, inset)?
  → SÍ  →  base.css
  → NO  ↓

¿Es una decisión de COLOR, SOMBRA, RADIO o TIPOGRAFÍA?
  → SÍ  →  @styles (tokens de tema)
  → NO  ↓

¿Es una PRIMITIVA de LAYOUT (flex, grid, display, align)?
  → SÍ  →  base.css
  → NO  ↓

¿Es un KEYFRAME de animación?
  → SÍ  →  base.css (@keyframes) + @styles (declaración animation:)
```
