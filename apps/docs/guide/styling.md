# Styling

Headless Primitives tiene una arquitectura de estilos en **dos capas independientes**. Puedes usar una, ambas, o ninguna.

> Guías detalladas por capa:
>
> - [base.css — Structural Layer](./base-css.md) — qué hace exactamente cada regla estructural
> - [@styles Theming Layer](./styles-theming.md) — referencia completa de todos los tokens CSS Custom Properties

## Las dos capas

```
┌─────────────────────────────────────────────────┐
│  @headless-primitives/styles                    │
│  Colores · Sombras · Tipografía · Dark mode     │  ← Opcional
├─────────────────────────────────────────────────┤
│  @headless-primitives/utils/base.css            │
│  Layout · Show/hide · Posicionamiento · Forma   │  ← Recomendado
└─────────────────────────────────────────────────┘
```

### Capa 1 — `base.css` (funcional)

Contiene únicamente lo estructural: qué elementos son `display: none` cuando están cerrados, cómo se posicionan los overlays, el z-index de cada capa, y la apariencia mínima para que cada componente sea reconocible sin CSS adicional.

**No tiene colores hardcodeados.** Usa `currentColor`, `Canvas`, `CanvasText` y `color-mix()` para adaptarse a cualquier contexto.

```css
@import "@headless-primitives/utils/base.css";
```

### Capa 2 — `@headless-primitives/styles` (visual)

Añade el sistema de tokens, colores, sombras, dark mode automático y todos los estados visuales (hover, focus, pressed, disabled). Esta capa sobreescribe la Capa 1 donde sea necesario.

```css
@import "@headless-primitives/styles/index.css";
```

---

## Importación selectiva

No necesitas cargar todos los estilos si solo usas algunos componentes:

```css
/* Siempre primero */
@import "@headless-primitives/styles/theme.css";

/* Solo los que usas */
@import "@headless-primitives/styles/button.css";
@import "@headless-primitives/styles/dialog.css";
@import "@headless-primitives/styles/tabs.css";
```

---

## Especificidad mínima

Todos los selectores del paquete usan **un único selector de elemento** (`hp-button`, `hp-tabs`, etc.), con especificidad `(0,0,1)`. Cualquier clase CSS en tu proyecto gana automáticamente:

```css
/* Especificidad (0,0,1) — el paquete */
hp-button {
  background: var(--hp-surface);
}

/* Especificidad (0,1,0) — tu clase, siempre gana */
.btn-primary {
  background: #7c3aed;
}
```

El paquete no usa `!important` en ninguna regla excepto `.hp-visually-hidden` (requisito de accesibilidad).

---

## Sobreescribir con tokens

La forma más limpia de personalizar es cambiar las CSS custom properties:

```css
:root {
  --hp-accent: #7c3aed;
  --hp-accent-hover: #6d28d9;
  --hp-accent-active: #5b21b6;
  --hp-accent-foreground: #ffffff;
  --hp-radius: 2px; /* estilo más cuadrado */
}
```

Los tokens se pueden redefinir en cualquier selector — no solo en `:root`:

```css
/* Solo dentro de una sección específica */
.dashboard {
  --hp-accent: #0ea5e9;
}

/* Solo dentro de un formulario */
form.checkout {
  --hp-radius: 8px;
  --hp-border-strong: #374151;
}
```

---

## Sobreescribir con clases

Para cambios puntuales en un componente específico, añade una clase directamente:

```html
<hp-button class="btn-danger">Eliminar</hp-button>
```

```css
.btn-danger {
  background: #dc2626;
  color: white;
  border-color: #dc2626;
}

.btn-danger:hover {
  background: #b91c1c;
  border-color: #b91c1c;
}
```

---

## Estructura de apariencia por componente

Cada componente solo necesita CSS de elementos descendientes. No hay clases BEM internas ni shadow DOM que bloquee tus estilos:

```html
<!-- Toda esta estructura es estilizable directamente -->
<hp-accordion class="my-accordion">
  <hp-accordion-item>
    <hp-accordion-trigger class="my-trigger">Título</hp-accordion-trigger>
    <hp-accordion-content class="my-content">Contenido</hp-accordion-content>
  </hp-accordion-item>
</hp-accordion>
```

```css
.my-accordion {
  border-radius: 0;
}
.my-trigger {
  font-size: 1rem;
  font-weight: 700;
}
.my-content {
  color: #374151;
  line-height: 1.75;
}
```

---

## Sin estilos externos (CSS de usuario puro)

Si prefieres no usar ninguna de las dos capas, los componentes siguen funcionando. Deberás gestionar manualmente la visibilidad de los paneles y la posición de los overlays. Las dos reglas mínimas que casi siempre necesitas:

```css
/* Ocultar paneles cerrados */
[data-hp-panel][data-state="closed"],
[data-hp-panel][data-state="unselected"] {
  display: none;
}

/* Ocultar overlays cerrados */
[data-hp-overlay-content][data-state="closed"],
[data-hp-backdrop][data-state="closed"] {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
}
```

---

## Tailwind CSS

Los componentes son completamente compatibles con Tailwind. Usa clases utilitarias directamente en el markup:

```html
<hp-button
  class="px-4 py-2 bg-violet-600 text-white rounded-lg
                   hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed
                   focus-visible:outline-2 focus-visible:outline-violet-600"
>
  Acción
</hp-button>

<hp-tabs class="w-full">
  <hp-tab-list class="flex border-b border-slate-200">
    <hp-tab
      class="px-4 py-2 text-sm font-medium text-slate-600
                   aria-selected:text-violet-600 aria-selected:border-b-2
                   aria-selected:border-violet-600"
    >
      Tab 1
    </hp-tab>
  </hp-tab-list>
</hp-tabs>
```

> Con Tailwind puedes ignorar completamente ambas capas de estilos y construir todo desde las utilidades.

---

## Theme Builder

Prefiere editar los tokens visualmente? El **[Theme Builder](./theme-builder.md)** te permite
ajustar cada `--hp-*` token con color pickers y sliders, ver todos los componentes actualizarse en tiempo real
y copiar el CSS generado listo para pegar en tu proyecto.
