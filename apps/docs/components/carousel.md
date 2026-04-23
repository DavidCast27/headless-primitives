# Carousel <span class="hp-badge">Nuevo</span>

El componente `hp-carousel` permite mostrar una serie de slides navegables con controles de anterior/siguiente, indicadores (dots) y autoplay opcional. Implementa el patrón [WAI-ARIA Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/).

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-carousel` usando únicamente `@headless-primitives/utils/base.css`. La navegación, el autoplay y la gestión de estados funcionan completamente sin estilos adicionales.

<div class="hp-demo-card">
  <hp-carousel label="Demo carousel bare" style="max-width:400px; border:1px solid var(--vp-c-divider); border-radius:8px; overflow:hidden;">
    <hp-carousel-content>
      <hp-carousel-item style="padding:3rem 2rem; text-align:center; background:var(--vp-c-bg-soft);">Slide 1</hp-carousel-item>
      <hp-carousel-item style="padding:3rem 2rem; text-align:center; background:var(--vp-c-bg-soft);">Slide 2</hp-carousel-item>
      <hp-carousel-item style="padding:3rem 2rem; text-align:center; background:var(--vp-c-bg-soft);">Slide 3</hp-carousel-item>
    </hp-carousel-content>
    <div style="display:flex; justify-content:center; gap:1rem; padding:1rem; border-top:1px solid var(--vp-c-divider);">
      <hp-carousel-previous><button>←</button></hp-carousel-previous>
      <div style="display:flex; gap:0.5rem; align-items:center;">
        <hp-carousel-dot index="0"><button style="width:8px;height:8px;border-radius:50%;border:1px solid currentColor;padding:0;"></button></hp-carousel-dot>
        <hp-carousel-dot index="1"><button style="width:8px;height:8px;border-radius:50%;border:1px solid currentColor;padding:0;"></button></hp-carousel-dot>
        <hp-carousel-dot index="2"><button style="width:8px;height:8px;border-radius:50%;border:1px solid currentColor;padding:0;"></button></hp-carousel-dot>
      </div>
      <hp-carousel-next><button>→</button></hp-carousel-next>
    </div>
  </hp-carousel>
</div>

### Con estilos personalizados

El componente estilizado usando clases CSS y variables de tema.

<div class="hp-demo-card">
  <hp-carousel loop class="demo-carousel">
    <hp-carousel-content class="demo-carousel-content">
      <hp-carousel-item class="demo-carousel-item" style="background: var(--vp-c-brand-soft);">Slide 1</hp-carousel-item>
      <hp-carousel-item class="demo-carousel-item" style="background: var(--vp-c-indigo-soft);">Slide 2</hp-carousel-item>
      <hp-carousel-item class="demo-carousel-item" style="background: var(--vp-c-green-soft);">Slide 3</hp-carousel-item>
    </hp-carousel-content>
    <div class="demo-carousel-controls">
      <hp-carousel-previous class="demo-carousel-btn">←</hp-carousel-previous>
      <div class="demo-carousel-dots">
        <hp-carousel-dot index="0" class="demo-dot"></hp-carousel-dot>
        <hp-carousel-dot index="1" class="demo-dot"></hp-carousel-dot>
        <hp-carousel-dot index="2" class="demo-dot"></hp-carousel-dot>
      </div>
      <hp-carousel-next class="demo-carousel-btn">→</hp-carousel-next>
    </div>
  </hp-carousel>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-carousel loop autoplay interval="3000">
  <hp-carousel-content>
    <hp-carousel-item>Slide 1</hp-carousel-item>
    <hp-carousel-item>Slide 2</hp-carousel-item>
  </hp-carousel-content>
  <hp-carousel-previous>←</hp-carousel-previous>
  <hp-carousel-next>→</hp-carousel-next>
  <hp-carousel-dot index="0"></hp-carousel-dot>
  <hp-carousel-dot index="1"></hp-carousel-dot>
</hp-carousel>
```

```css [style.css]
hp-carousel-item[data-state="inactive"] {
  display: none;
}
hp-carousel-dot[data-state="active"] {
  background: var(--vp-c-brand-1);
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-carousel loop class="relative w-full max-w-md">
  <hp-carousel-content>
    <hp-carousel-item class="data-[state=inactive]:hidden p-8 text-center bg-blue-50"
      >Slide 1</hp-carousel-item
    >
    <hp-carousel-item class="data-[state=inactive]:hidden p-8 text-center bg-indigo-50"
      >Slide 2</hp-carousel-item
    >
  </hp-carousel-content>
  <hp-carousel-previous class="absolute left-2 top-1/2">←</hp-carousel-previous>
  <hp-carousel-next class="absolute right-2 top-1/2">→</hp-carousel-next>
</hp-carousel>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/carousel
```

```bash [npm]
npm install @headless-primitives/carousel
```

```bash [yarn]
yarn add @headless-primitives/carousel
```

```bash [bun]
bun add @headless-primitives/carousel
```

:::

## Features

- ⌨️ Soporte completo de navegación por teclado (flechas, Enter, Space).
- ♿️ Accesibilidad WAI-ARIA incorporada (`role="region"`, `aria-roledescription`).
- 🎨 Sin estilos visuales (Headless) — control total sobre la transición.
- 🔁 Autoplay configurable con intervalos y modo loop circular.
- 📐 Orientación configurable (`horizontal` / `vertical`) para sliders complejos.

## Anatomía

```html
<hp-carousel>
  <hp-carousel-content>
    <hp-carousel-item></hp-carousel-item>
  </hp-carousel-content>
  <hp-carousel-previous></hp-carousel-previous>
  <hp-carousel-next></hp-carousel-next>
  <hp-carousel-dot index="0"></hp-carousel-dot>
</hp-carousel>
```

## API Reference

### `hp-carousel`

Contenedor raíz del carrusel.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo                           | Por Defecto    | Descripción                                   |
| -------------------- | ------------------------------ | -------------- | --------------------------------------------- |
| `orientation`        | `"horizontal"` \| `"vertical"` | `"horizontal"` | Orientación de la navegación.                 |
| `loop`               | `boolean`                      | `false`        | Habilita la navegación circular infinita.     |
| `autoplay`           | `boolean`                      | `false`        | Activa el avance automático de slides.        |
| `interval`           | `number`                       | `5000`         | Tiempo de espera entre slides en ms.          |
| `label`              | `string`                       | `"Carousel"`   | Etiqueta accesible para el área del carrusel. |

#### Propiedades

| Propiedad     | Tipo     | Descripción                                     |
| ------------- | -------- | ----------------------------------------------- |
| `activeIndex` | `number` | Índice del slide actualmente visible (0-based). |

#### Métodos

| Método        | Descripción                                         |
| ------------- | --------------------------------------------------- |
| `next()`      | Avanza al siguiente slide disponible.               |
| `previous()`  | Retrocede al slide anterior disponible.             |
| `goTo(index)` | Salta directamente al slide con el índice indicado. |
| `start()`     | Inicia el temporizador de autoplay.                 |
| `stop()`      | Detiene el temporizador de autoplay.                |

#### Eventos

| Evento      | Detalle                   | Descripción                             |
| ----------- | ------------------------- | --------------------------------------- |
| `hp-change` | `{ activeIndex: number }` | Se emite cuando el slide activo cambia. |

#### Atributos ARIA gestionados automáticamente

- `role="region"` — Define el carrusel como una sección significativa de la página.
- `aria-roledescription="carousel"` — Indica la naturaleza del componente a screen readers.
- `aria-label` — Sincronizado con la propiedad `label`.

### `hp-carousel-content`

Wrapper estructural para los slides.

#### Atributos ARIA gestionados automáticamente

- `aria-live="polite"` — Anuncia cambios de slide de manera no intrusiva.

### `hp-carousel-item`

Contenedor individual para cada slide.

#### Atributos ARIA gestionados automáticamente

- `role="group"` — Identifica el slide dentro del conjunto.
- `aria-roledescription="slide"` — Describe el elemento como un slide.
- `aria-hidden` — `"true"` si el slide no está activo.
- `data-state` — `"active"` | `"inactive"` para estilizado CSS.

### `hp-carousel-previous` / `hp-carousel-next`

Botones de control para navegar entre slides.

#### Atributos ARIA gestionados automáticamente

- `role="button"` — Identifica los elementos como botones accionables.
- `aria-label` — Etiquetas descriptivas ("Previous slide", "Next slide").
- `tabindex="0"` — Asegura que sean accesibles mediante el teclado.

### `hp-carousel-dot`

Indicador de paginación individual.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo     | Por Defecto | Descripción                     |
| -------------------- | -------- | ----------- | ------------------------------- |
| `index`              | `number` | `0`         | Índice del slide al que apunta. |

#### Atributos ARIA gestionados automáticamente

- `role="button"` — Identifica el indicador como un botón.
- `aria-label` — Etiqueta dinámica ("Go to slide N").
- `aria-pressed` — `"true"` si es el slide activo actual.
- `data-state` — `"active"` | `"inactive"` para estilizado CSS.

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/).

### Navegación por teclado

| Tecla                      | Acción                                                |
| -------------------------- | ----------------------------------------------------- |
| `ArrowRight` / `ArrowDown` | Mueve el foco al siguiente slide (según orientación). |
| `ArrowLeft` / `ArrowUp`    | Mueve el foco al slide anterior (según orientación).  |
| `Enter` / `Space`          | Activa botones de navegación o indicadores de puntos. |

<style>
/* Reset estructural */
hp-carousel,
hp-carousel-content,
hp-carousel-item,
hp-carousel-previous,
hp-carousel-next,
hp-carousel-dot {
  display: block;
}

hp-carousel-item[data-state="inactive"] { 
  display: none; 
}

.demo-carousel {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.demo-carousel-content {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}

.demo-carousel-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.demo-carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.25rem;
}

.demo-carousel-btn {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: background 0.2s;
}

.demo-carousel-btn:hover {
  background: var(--vp-c-bg-mute);
}

.demo-carousel-dots {
  display: flex;
  gap: 8px;
}

.demo-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
}

.demo-dot[data-state="active"] {
  background: var(--vp-c-brand-1);
  transform: scale(1.2);
}
</style>
