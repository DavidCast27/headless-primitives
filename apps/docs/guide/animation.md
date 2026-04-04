# Animaciones

`base.css` incluye un sistema de animaciones completo. Todos los `@keyframes` están centralizados allí y los archivos de `@headless-primitives/styles` los reutilizan sin duplicarlos.

## Variables de timing

Las duraciones y curvas están expuestas como CSS custom properties con fallback incorporado:

| Variable             | Valor por defecto               | Uso                                   |
| :------------------- | :------------------------------ | :------------------------------------ |
| `--hp-duration-fast` | `100ms`                         | Tooltip                               |
| `--hp-duration`      | `150ms`                         | Popover, close animations             |
| `--hp-duration-slow` | `200ms`                         | Dialog, backdrop, toast entrada       |
| `--hp-ease`          | `ease`                          | Animaciones de salida y fade          |
| `--hp-ease-out`      | `cubic-bezier(0.16, 1, 0.3, 1)` | Entradas (spring suave, estilo Radix) |

Puedes sobrescribir cualquier variable en `:root`:

```css
:root {
  --hp-duration-slow: 300ms; /* entradas más lentas */
  --hp-ease-out: cubic-bezier(0.34, 1.56, 0.64, 1); /* spring más pronunciado */
}
```

---

## Animaciones por componente

### Overlays: Dialog

La entrada usa `scale(0.95 → 1)` + fade, preservando el `translate(-50%, -50%)` del centrado estructural. La salida es la inversa.

```css
/* Keyframes definidos en base.css */
@keyframes hp-dialog-in {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes hp-dialog-out {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.96);
  }
}
```

El backdrop hace fade independiente:

```css
@keyframes hp-backdrop-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes hp-backdrop-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```

### Overlays: Popover

Slide vertical + scale leve. Salida es más rápida que la entrada (patrón estándar):

```css
@keyframes hp-overlay-in {
  from {
    opacity: 0;
    transform: translateY(-6px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes hp-overlay-out {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-4px) scale(0.97);
  }
}
```

### Tooltip

Igual que el popover pero más corto y preserva el `translateX(-50%)` del centrado horizontal:

```css
@keyframes hp-tooltip-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
```

### Toast

El slide adapta su dirección según la posición del contenedor usando una custom property heredable:

```css
/* El contenedor define la dirección de slide */
hp-toast-container {
  --hp-toast-slide: 110%;
} /* derecha (default) */
hp-toast-container[data-position*="left"] {
  --hp-toast-slide: -110%;
} /* izquierda */
hp-toast-container[data-position*="center"] {
  --hp-toast-slide: 0px;
} /* centrado → scale */

@keyframes hp-toast-in {
  from {
    opacity: 0;
    transform: translateX(var(--hp-toast-slide, 110%));
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

Los toasts centrados usan animación diferente (scale en lugar de slide):

```css
@keyframes hp-toast-in-center {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Paneles (Accordion, Tabs, Collapsible)

Los paneles se muestran/ocultan con `display: none`. Para animar la entrada se usa `@starting-style`, que captura el estado inicial justo después de que `display: none` es removido:

```css
[data-hp-panel][data-state="open"],
[data-hp-panel][data-state="selected"] {
  transition: opacity var(--hp-duration) var(--hp-ease);
}

@starting-style {
  [data-hp-panel][data-state="open"],
  [data-hp-panel][data-state="selected"] {
    opacity: 0;
  }
}
```

> `@starting-style` requiere Chrome 117+, Safari 17.5+, Firefox 129+. En navegadores sin soporte los paneles simplemente aparecen sin animación.

---

## Visibilidad con transición suave

Los overlays usan una técnica de `visibility` con delay para que la animación de salida pueda completarse antes de que el elemento desaparezca del árbol de accesibilidad:

```css
/* Base: cuando cierra, opacity primero, visibility después */
[data-hp-overlay-content] {
  transition:
    opacity var(--hp-duration) var(--hp-ease),
    visibility 0s linear var(--hp-duration); /* delay = duración de la animación */
}

/* Al abrir: visibility es inmediata (sin delay) */
[data-hp-overlay-content][data-state="open"] {
  transition:
    opacity var(--hp-duration) var(--hp-ease),
    visibility 0s; /* sin delay */
}
```

---

## Desactivar animaciones

### Respetar `prefers-reduced-motion`

Añade esto a tu CSS global para usuarios que prefieren menos movimiento:

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --hp-duration-fast: 0ms;
    --hp-duration: 0ms;
    --hp-duration-slow: 0ms;
  }
}
```

Al poner las duraciones a `0ms`, las transiciones y animaciones son instantáneas sin eliminar el estado final correcto.

### Desactivar completamente

```css
:root {
  --hp-duration-fast: 0ms;
  --hp-duration: 0ms;
  --hp-duration-slow: 0ms;
}
```

---

## Personalizar una animación específica

Dado que los `@keyframes` tienen nombres globales (`hp-dialog-in`, `hp-overlay-in`, etc.), puedes reemplazar la animación de un componente puntual sobreescribiendo solo la regla de aplicación:

```css
/* Reemplazar la entrada del dialog con un flip vertical */
@keyframes my-dialog-in {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) rotateX(-8deg) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) rotateX(0deg) scale(1);
  }
}

[data-hp-overlay-content][role="dialog"][data-state="open"] {
  animation: my-dialog-in 250ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
```

```css
/* Hacer que el toast entre desde abajo */
@keyframes my-toast-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

hp-toast {
  animation: my-toast-in var(--hp-duration-slow) var(--hp-ease-out) both;
}
```
