# Badge

<span class="hp-badge">Nuevo</span>

El componente `hp-badge` es una etiqueta compacta para mostrar estados, contadores o texto corto. Provee una base semántica y accesible para indicadores visuales, con soporte de variantes (`variant`) y tamaños (`size`) controlados por atributos.

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/badge
```

```bash [npm]
npm install @headless-primitives/badge
```

```bash [yarn]
yarn add @headless-primitives/badge
```

```bash [bun]
bun add @headless-primitives/badge
```

:::

## Demostración

<div class="hp-demo-card" style="display: flex; flex-direction: column; gap: 1.5rem;">
  <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
    <hp-badge class="demo-badge" variant="default" style="background: var(--vp-c-bg-mute); color: var(--vp-c-text-2); border: 1px solid var(--vp-c-divider);">Default</hp-badge>
    <hp-badge class="demo-badge" variant="success" style="background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0;">Success</hp-badge>
    <hp-badge class="demo-badge" variant="warning" style="background: #fffbeb; color: #d97706; border: 1px solid #fde68a;">Warning</hp-badge>
    <hp-badge class="demo-badge" variant="danger" style="background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;">Danger</hp-badge>
    <hp-badge class="demo-badge" variant="info" style="background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe;">Info</hp-badge>
  </div>
  <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
    <hp-badge class="demo-badge demo-badge--sm" variant="default" style="background: var(--vp-c-bg-mute); color: var(--vp-c-text-2); border: 1px solid var(--vp-c-divider);">Small</hp-badge>
    <hp-badge class="demo-badge" variant="default" style="background: var(--vp-c-bg-mute); color: var(--vp-c-text-2); border: 1px solid var(--vp-c-divider);">Medium</hp-badge>
    <hp-badge class="demo-badge demo-badge--lg" variant="default" style="background: var(--vp-c-bg-mute); color: var(--vp-c-text-2); border: 1px solid var(--vp-c-divider);">Large</hp-badge>
  </div>
</div>

<style>
.demo-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-family: inherit;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  box-sizing: border-box;
  vertical-align: middle;
}
.demo-badge--sm { font-size: 0.6875rem; padding: 0.125rem 0.5rem; }
.demo-badge--lg { font-size: 0.875rem; padding: 0.375rem 0.75rem; }
</style>

### Sin estilos (solo base.css)

Así se ve `hp-badge` usando únicamente `@headless-primitives/utils/base.css` — sin ningún estilo visual adicional. Los atributos `data-variant` y `data-size` están presentes en el DOM listos para estilizarse.

> **¿Quieres agregar colores?** Usa el atributo `data-variant` que el componente setea automáticamente. Por ejemplo: `hp-badge[data-variant="success"] { background: #f0fdf4; color: #16a34a; }`. O importa `@headless-primitives/styles` para obtener todos los variantes con tokens CSS.

<div class="hp-demo-card">
  <hp-badge variant="default">Default</hp-badge>
  <hp-badge variant="success">Success</hp-badge>
  <hp-badge variant="danger">Danger</hp-badge>
  <hp-badge variant="info" size="sm">Small</hp-badge>
  <hp-badge variant="warning" size="lg">Large</hp-badge>
</div><CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-badge variant="success">Activo</hp-badge>
<hp-badge variant="danger" size="sm">3</hp-badge>
<hp-badge variant="info" size="lg">Información</hp-badge>
```

```css [style.css]
hp-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-weight: 600;
  white-space: nowrap;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  border: 1px solid transparent;
}

hp-badge[data-size="sm"] {
  font-size: 0.6875rem;
  padding: 0.125rem 0.5rem;
}

hp-badge[data-size="lg"] {
  font-size: 0.875rem;
  padding: 0.375rem 0.75rem;
}

hp-badge[data-variant="success"] {
  background: #f0fdf4;
  color: #16a34a;
  border-color: #bbf7d0;
}

hp-badge[data-variant="warning"] {
  background: #fffbeb;
  color: #d97706;
  border-color: #fde68a;
}

hp-badge[data-variant="danger"] {
  background: #fef2f2;
  color: #dc2626;
  border-color: #fecaca;
}

hp-badge[data-variant="info"] {
  background: #eff6ff;
  color: #2563eb;
  border-color: #bfdbfe;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<!-- Variante success -->
<hp-badge
  variant="success"
  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border border-green-200 bg-green-50 text-green-700"
>
  Activo
</hp-badge>

<!-- Variante danger, tamaño pequeño -->
<hp-badge
  variant="danger"
  size="sm"
  class="inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold border border-red-200 bg-red-50 text-red-600"
>
  3
</hp-badge>
```

:::

</Flavor>

</CodeSnippet>

## Anatomía

`hp-badge` es un elemento de un solo nodo. Acepta contenido ranurado (slot) para el texto o ícono que muestra.

```html
<hp-badge variant="success" size="md"> Activo </hp-badge>
```

El DOM resultante incluye los atributos de estado sincronizados:

```html
<hp-badge
  data-hp-component="badge"
  variant="success"
  size="md"
  data-variant="success"
  data-size="md"
>
  Activo
</hp-badge>
```

## API Reference

### `hp-badge`

Custom element inline que envuelve contenido ranurado. No emite eventos propios; su función es meramente semántica y estilística.

#### Atributos

| Atributo  | Tipo                                                                | Por defecto | Descripción                                                                               |
| :-------- | :------------------------------------------------------------------ | :---------- | :---------------------------------------------------------------------------------------- |
| `variant` | `"default"` \| `"success"` \| `"warning"` \| `"danger"` \| `"info"` | `"default"` | Controla el significado semántico. Se refleja en `data-variant` para estilizarse con CSS. |
| `size`    | `"sm"` \| `"md"` \| `"lg"`                                          | `"md"`      | Controla el tamaño tipográfico y de padding. Se refleja en `data-size`.                   |

#### Atributos de datos (solo lectura)

| Atributo            | Valor sincronizado desde | Descripción                                         |
| :------------------ | :----------------------- | :-------------------------------------------------- |
| `data-hp-component` | `"badge"`                | Identificador del componente. Siempre presente.     |
| `data-variant`      | `variant`                | Espejo de `variant`; usado para los selectores CSS. |
| `data-size`         | `size`                   | Espejo de `size`; usado para los selectores CSS.    |

#### Slots

| Slot        | Descripción                                     |
| :---------- | :---------------------------------------------- |
| _(default)_ | Contenido del badge: texto, número o ícono SVG. |

## Accesibilidad

`hp-badge` es un elemento de presentación. Por defecto no tiene `role` ni atributos ARIA propios, ya que su significado debe comunicarse mediante el contexto circundante o mediante un `aria-label` en el elemento padre si la información es crítica.

Para contadores o estados visualmente diferenciados que son la única fuente de información, considera rodear el badge con un `span` con `aria-label` descriptivo:

```html
<button>
  Notificaciones
  <hp-badge variant="danger" size="sm" aria-label="3 notificaciones sin leer">3</hp-badge>
</button>
```

## Theming

`hp-badge` expone sus variantes a través de custom properties que puedes redefinir:

```css
:root {
  /* Variante success */
  --hp-color-success-bg: #f0fdf4;
  --hp-color-success: #16a34a;
  --hp-color-success-border: #bbf7d0;

  /* Variante danger */
  --hp-color-danger-bg: #fef2f2;
  --hp-color-danger: #dc2626;
  --hp-color-danger-border: #fecaca;

  /* Variante warning */
  --hp-color-warning-bg: #fffbeb;
  --hp-color-warning: #d97706;
  --hp-color-warning-border: #fde68a;

  /* Variante info */
  --hp-color-info-bg: #eff6ff;
  --hp-color-info: #2563eb;
  --hp-color-info-border: #bfdbfe;
}
```

Usando `@headless-primitives/styles`, todos estos tokens ya están definidos. Solo necesitas sobrescribir los que quieras personalizar.
