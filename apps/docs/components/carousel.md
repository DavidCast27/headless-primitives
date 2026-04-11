# Carousel

<span class="hp-badge">Nuevo</span>

The `hp-carousel` component is a primitive that implements the WAI-ARIA Carousel pattern, enabling accessible slideshow interfaces with navigation controls, autoplay, pagination dots, and both horizontal and vertical orientations.

## Installation

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

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-carousel` con solo `base.css`. La navegación, `data-state` y los atributos ARIA funcionan — el consumidor solo necesita añadir sus propios estilos visuales.

<div class="hp-demo-card">
<hp-carousel label="Demo carousel" id="demo-carousel-plain" style="max-width:480px;border:1px solid var(--vp-c-divider);border-radius:8px;overflow:hidden;">
<hp-carousel-content>
<hp-carousel-item style="padding:2rem 4rem;min-height:80px;align-items:center;">Slide 1 — Unleash Power</hp-carousel-item>
<hp-carousel-item style="padding:2rem 4rem;min-height:80px;align-items:center;">Slide 2 — Headless Architecture</hp-carousel-item>
<hp-carousel-item style="padding:2rem 4rem;min-height:80px;align-items:center;">Slide 3 — Accessibility First</hp-carousel-item>
</hp-carousel-content>
<hp-carousel-previous style="padding:0.5rem;">←</hp-carousel-previous>
<hp-carousel-next style="padding:0.5rem;">→</hp-carousel-next>
</hp-carousel>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
<hp-carousel class="dmc" label="Demo carousel styled" id="demo-carousel-styled" loop>
<hp-carousel-content class="dmc__content">
<hp-carousel-item class="dmc__item dmc__item--1"><span class="dmc__label">Unleash Power</span></hp-carousel-item>
<hp-carousel-item class="dmc__item dmc__item--2"><span class="dmc__label">Headless Architecture</span></hp-carousel-item>
<hp-carousel-item class="dmc__item dmc__item--3"><span class="dmc__label">Accessibility First</span></hp-carousel-item>
</hp-carousel-content>
<hp-carousel-previous class="dmc__btn dmc__btn--prev">&#8592;</hp-carousel-previous>
<hp-carousel-next class="dmc__btn dmc__btn--next">&#8594;</hp-carousel-next>
<div class="dmc__dots">
<hp-carousel-dot class="dmc__dot" data-index="0">&#8203;</hp-carousel-dot>
<hp-carousel-dot class="dmc__dot" data-index="1">&#8203;</hp-carousel-dot>
<hp-carousel-dot class="dmc__dot" data-index="2">&#8203;</hp-carousel-dot>
</div>
</hp-carousel>
</div>

<style>
/* styled demo — scoped via .dmc */
.dmc {
  position: relative;
  max-width: 480px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}
.dmc__content { overflow: hidden; }
.dmc__item {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dmc__item[data-state="inactive"] { display: none; }
.dmc__item--1 { background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); }
.dmc__item--2 { background: linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%); }
.dmc__item--3 { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); }
.dmc__label {
  color: #fff;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-shadow: 0 1px 4px rgba(0,0,0,0.25);
}
.dmc__btn {
  position: absolute;
  top: 90px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.35);
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  border: none;
  backdrop-filter: blur(4px);
  transition: background 0.15s;
}
.dmc__btn:hover { background: rgba(0,0,0,0.55); }
.dmc__btn:focus { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; }
.dmc__btn--prev { left: 10px; }
.dmc__btn--next { right: 10px; }
.dmc__dots {
  display: flex;
  justify-content: center;
  gap: 7px;
  padding: 12px 0;
  background: var(--vp-c-bg-soft);
}
.dmc__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.dmc__dot[data-state="active"] {
  background: var(--vp-c-brand-1);
  transform: scale(1.35);
}
</style>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const nav = (el, idx) => {
    if (el && el['goTo']) el['goTo'](idx)
  }

  requestAnimationFrame(() => {
    nav(document.querySelector('#demo-carousel-plain'), 0)
    nav(document.querySelector('#demo-carousel-styled'), 0)
  })

  const carousel = document.querySelector('#demo-carousel-styled')
  if (!carousel) return

  const dots = carousel.querySelectorAll('hp-carousel-dot')
  if (dots[0]) dots[0].setAttribute('data-state', 'active')
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index') || '0', 10)
      nav(carousel, idx)
    })
  })
  carousel.addEventListener('hp-carousel-change', (e) => {
    const { activeIndex } = e.detail
    dots.forEach((dot, i) => {
      dot.setAttribute('data-state', i === activeIndex ? 'active' : 'inactive')
    })
  })
})
</script>

## Anatomy

The Carousel follows a nested structure that establishes the correct ARIA relationships:

```html
<hp-carousel label="Feature slides">
  <hp-carousel-content>
    <hp-carousel-item>Slide 1</hp-carousel-item>
    <hp-carousel-item>Slide 2</hp-carousel-item>
    <hp-carousel-item>Slide 3</hp-carousel-item>
  </hp-carousel-content>

  <hp-carousel-previous>&#8592;</hp-carousel-previous>
  <hp-carousel-next>&#8594;</hp-carousel-next>

  <hp-carousel-dot index="0"></hp-carousel-dot>
  <hp-carousel-dot index="1"></hp-carousel-dot>
  <hp-carousel-dot index="2"></hp-carousel-dot>
</hp-carousel>
```

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-carousel class="my-carousel" label="Product highlights">
  <hp-carousel-content class="carousel-content">
    <hp-carousel-item class="carousel-item">
      <img src="slide1.jpg" alt="Slide 1" />
    </hp-carousel-item>
    <hp-carousel-item class="carousel-item">
      <img src="slide2.jpg" alt="Slide 2" />
    </hp-carousel-item>
    <hp-carousel-item class="carousel-item">
      <img src="slide3.jpg" alt="Slide 3" />
    </hp-carousel-item>
  </hp-carousel-content>

  <hp-carousel-previous class="carousel-btn carousel-btn--prev">&#8592;</hp-carousel-previous>
  <hp-carousel-next class="carousel-btn carousel-btn--next">&#8594;</hp-carousel-next>

  <div class="carousel-dots">
    <hp-carousel-dot class="carousel-dot" index="0"></hp-carousel-dot>
    <hp-carousel-dot class="carousel-dot" index="1"></hp-carousel-dot>
    <hp-carousel-dot class="carousel-dot" index="2"></hp-carousel-dot>
  </div>
</hp-carousel>
```

```css [style.css]
.my-carousel {
  display: block;
  position: relative;
  overflow: hidden;
  max-width: 600px;
}

.carousel-content {
  display: block;
  overflow: hidden;
}

.carousel-item {
  display: block;
}

hp-carousel-item[data-state="inactive"] {
  display: none;
}

.carousel-btn {
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 4px;
}

.carousel-btn--prev {
  left: 8px;
}

.carousel-btn--next {
  right: 8px;
}

.carousel-btn:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
}

.carousel-dot {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #cbd5e1;
  cursor: pointer;
}

hp-carousel-dot[data-state="active"] {
  background: #3b82f6;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-carousel class="relative block overflow-hidden max-w-xl" label="Product highlights">
  <hp-carousel-content class="block overflow-hidden">
    <hp-carousel-item class="block">
      <img src="slide1.jpg" alt="Slide 1" class="w-full" />
    </hp-carousel-item>
    <hp-carousel-item class="block">
      <img src="slide2.jpg" alt="Slide 2" class="w-full" />
    </hp-carousel-item>
    <hp-carousel-item class="block">
      <img src="slide3.jpg" alt="Slide 3" class="w-full" />
    </hp-carousel-item>
  </hp-carousel-content>

  <hp-carousel-previous
    class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded text-lg cursor-pointer focus:outline focus:outline-2 focus:outline-blue-500"
    >&#8592;</hp-carousel-previous
  >
  <hp-carousel-next
    class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded text-lg cursor-pointer focus:outline focus:outline-2 focus:outline-blue-500"
    >&#8594;</hp-carousel-next
  >

  <div class="flex justify-center gap-2 mt-3">
    <hp-carousel-dot
      class="block w-2.5 h-2.5 rounded-full bg-slate-300 cursor-pointer"
      index="0"
    ></hp-carousel-dot>
    <hp-carousel-dot
      class="block w-2.5 h-2.5 rounded-full bg-slate-300 cursor-pointer"
      index="1"
    ></hp-carousel-dot>
    <hp-carousel-dot
      class="block w-2.5 h-2.5 rounded-full bg-slate-300 cursor-pointer"
      index="2"
    ></hp-carousel-dot>
  </div>
</hp-carousel>
```

```css [styles.css]
/* Hide inactive slides */
hp-carousel-item[data-state="inactive"] {
  display: none;
}

/* Active dot indicator */
hp-carousel-dot[data-state="active"] {
  @apply bg-blue-500;
}
```

:::

</Flavor>

</CodeSnippet>

## API Reference

### `hp-carousel`

Root container that coordinates all carousel sub-elements, manages navigation state, and exposes autoplay controls.

#### Properties

| Property      | Type                         | Default        | Description                                        |
| :------------ | :--------------------------- | :------------- | :------------------------------------------------- |
| `label`       | `string`                     | `"Carousel"`   | Accessible label for the carousel region.          |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout orientation of the slides.                  |
| `loop`        | `boolean`                    | `false`        | Wraps navigation at the first and last boundaries. |
| `interval`    | `number`                     | `5000`         | Autoplay interval in milliseconds.                 |
| `autoplay`    | `boolean`                    | `false`        | Starts or stops the autoplay timer.                |
| `activeIndex` | `number`                     | `0`            | Gets or sets the current slide index.              |

#### Methods

| Method        | Description                                 |
| :------------ | :------------------------------------------ |
| `next()`      | Advances to the next slide.                 |
| `previous()`  | Goes back to the previous slide.            |
| `goTo(index)` | Navigates directly to the slide at `index`. |
| `start()`     | Starts the autoplay timer.                  |
| `stop()`      | Stops the autoplay timer.                   |

#### ARIA-managed attributes

- `role="region"` — identifies the carousel as a landmark region
- `aria-roledescription="carousel"` — announces the widget type to screen readers
- `aria-label` — synchronized with the `label` property
- `data-hp-component="carousel"`

#### Events

| Event                | Detail                    | Description                      |
| :------------------- | :------------------------ | :------------------------------- |
| `hp-carousel-change` | `{ activeIndex: number }` | Fired on every slide transition. |

---

### `hp-carousel-content`

Wrapper element for all `hp-carousel-item` children. Provides the live region announcement for screen readers.

#### ARIA-managed attributes

- `aria-live="polite"` — announces slide changes to screen readers without interrupting
- `data-hp-component="carousel-content"`

---

### `hp-carousel-item`

Individual slide container. Visibility is controlled via `data-state` so consumers can apply their own CSS.

#### ARIA-managed attributes

- `role="group"` — groups slide content as a logical unit
- `aria-roledescription="slide"` — announces each item as a slide
- `aria-hidden` — set to `"true"` on inactive slides to hide them from the accessibility tree
- `data-state="active" | "inactive"` — reflects the current visibility state; use `hp-carousel-item[data-state="inactive"] { display: none }` to hide inactive slides
- `data-hp-component="carousel-item"`

---

### `hp-carousel-previous`

Interactive element that navigates to the previous slide. Responds to both click and keyboard events.

#### ARIA-managed attributes

- `role="button"` — exposes the element as an interactive button
- `aria-label="Previous slide"` — descriptive label for screen readers
- `tabindex="0"` — included in the tab order
- `data-hp-component="carousel-previous"`

#### Keyboard interaction

| Key               | Action                                           |
| :---------------- | :----------------------------------------------- |
| `Enter` / `Space` | Calls `previous()` on the closest `hp-carousel`. |

---

### `hp-carousel-next`

Interactive element that navigates to the next slide. Responds to both click and keyboard events.

#### ARIA-managed attributes

- `role="button"` — exposes the element as an interactive button
- `aria-label="Next slide"` — descriptive label for screen readers
- `tabindex="0"` — included in the tab order
- `data-hp-component="carousel-next"`

#### Keyboard interaction

| Key               | Action                                       |
| :---------------- | :------------------------------------------- |
| `Enter` / `Space` | Calls `next()` on the closest `hp-carousel`. |

---

### `hp-carousel-dot`

Pagination indicator that navigates directly to a specific slide when activated.

#### Properties

| Property | Type     | Default | Description                            |
| :------- | :------- | :------ | :------------------------------------- |
| `index`  | `number` | `0`     | The slide index this dot navigates to. |

#### ARIA-managed attributes

- `role="button"` — exposes the element as an interactive button
- `aria-label="Go to slide N"` — dynamically set based on the `index` value
- `tabindex="0"` — included in the tab order
- `data-state="active" | "inactive"` — reflects whether this dot's slide is currently active
- `data-hp-component="carousel-dot"`

#### Keyboard interaction

| Key               | Action                                            |
| :---------------- | :------------------------------------------------ |
| `Enter` / `Space` | Calls `goTo(index)` on the closest `hp-carousel`. |

---

## Accessibility

`hp-carousel` implements the **WAI-ARIA Carousel Pattern**:

- **Live region**: `hp-carousel-content` uses `aria-live="polite"` to announce slide changes without interrupting the user.
- **Landmark region**: `hp-carousel` is a `role="region"` with a descriptive `aria-label`.
- **Slide groups**: Each `hp-carousel-item` is a `role="group"` with `aria-roledescription="slide"`.
- **Hidden slides**: Inactive items receive `aria-hidden="true"` to remove them from the accessibility tree.
- **Interactive controls**: Previous, next, and dot elements all have `role="button"`, `tabindex="0"`, and descriptive `aria-label` values.
- **Keyboard navigation**: All controls respond to `Enter` and `Space` keydown events.
