---
badge: Nuevo
---

# Tooltip

<span class="hp-badge">Nuevo</span>

Información flotante que aparece al hacer hover o focus en un elemento.

## Instalación

```bash
pnpm add @headless-primitives/tooltip
```

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-tooltip` usando únicamente `@headless-primitives/utils/base.css`. El hover/focus, `aria-describedby` y visibilidad funcionan completamente.

<div class="hp-demo-card" style="overflow: visible; min-height: 100px;">
  <hp-tooltip>
    <hp-tooltip-trigger><button>Hover aquí</button></hp-tooltip-trigger>
    <hp-tooltip-content>Texto del tooltip sin estilos</hp-tooltip-content>
  </hp-tooltip>
</div>

### Con estilos personalizados

<div class="hp-demo-card" style="overflow: visible; min-height: 120px;">
  <hp-tooltip class="demo-tooltip">
    <hp-tooltip-trigger>
      <button class="demo-btn">Hover me</button>
    </hp-tooltip-trigger>
    <hp-tooltip-content class="demo-tooltip-content">
      Este es un tooltip de ejemplo
    </hp-tooltip-content>
  </hp-tooltip>
</div>

<style>
hp-tooltip { display: inline-block; position: relative; }
hp-tooltip-trigger { display: inline-block; }
.demo-btn {
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
  background: var(--vp-c-brand-1);
  color: white;
}
.demo-tooltip-content {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--vp-c-bg-inverse, #1f2937);
  color: var(--vp-c-text-inverse, #fff);
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  white-space: nowrap;
  z-index: 1000;
  pointer-events: none;
}
.demo-tooltip-content::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: var(--vp-c-bg-inverse, #1f2937);
}
</style>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-tooltip>
  <hp-tooltip-trigger>
    <button class="tooltip-trigger">Hover me</button>
  </hp-tooltip-trigger>
  <hp-tooltip-content class="tooltip-content"> Información adicional </hp-tooltip-content>
</hp-tooltip>
```

```css [style.css]
hp-tooltip {
  display: inline-block;
  position: relative;
}
hp-tooltip-trigger {
  display: inline-block;
}
/* hp-tooltip-content visibility via base.css: [data-hp-tooltip-content][data-state="closed"] */

.tooltip-trigger {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.tooltip-content {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: #1f2937;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.875rem;
  white-space: nowrap;
  z-index: 1000;
  pointer-events: none;
}

.tooltip-content::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #1f2937;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-tooltip class="inline-block relative">
  <hp-tooltip-trigger class="inline-block">
    <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Hover me</button>
  </hp-tooltip-trigger>
  <hp-tooltip-content
    class="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-gray-800 text-white px-3 py-1.5 rounded text-sm whitespace-nowrap z-50 pointer-events-none"
  >
    Información adicional
  </hp-tooltip-content>
</hp-tooltip>
```

:::

</Flavor>

</CodeSnippet>

## API Reference

### `hp-tooltip`

Contenedor principal que coordina el trigger y el content.

| Evento     | Descripción                           |
| :--------- | :------------------------------------ |
| `hp-open`  | Se emite cuando el tooltip se muestra |
| `hp-close` | Se emite cuando el tooltip se oculta  |

### `hp-tooltip-trigger`

El elemento que activa el tooltip al hacer hover o focus.

| Atributo   | Descripción                                            |
| :--------- | :----------------------------------------------------- |
| `tabindex` | Establecido a `"0"` automáticamente si no es focusable |

### `hp-tooltip-content`

El contenido flotante del tooltip.

| Atributo      | Valor gestionado                    |
| :------------ | :---------------------------------- |
| `role`        | `"tooltip"`                         |
| `aria-hidden` | `"true"` oculto / `"false"` visible |
| `id`          | Generado automáticamente            |

## Accesibilidad

- ✅ `role="tooltip"` en el content
- ✅ `aria-describedby` en el trigger apunta al content cuando visible
- ✅ Activación por hover (300ms delay) y focus (inmediato)
- ✅ Se oculta al perder el foco o al salir con el mouse
- ✅ `Escape` cierra el tooltip

## Notas

- La visibilidad del content se controla via `data-state="open|closed"` — usa `base.css` o tus propios estilos basados en `[data-hp-tooltip-content][data-state="closed"]`.
- Usa `position: relative` en `hp-tooltip` y `position: absolute` en `hp-tooltip-content` para posicionamiento relativo al trigger.
- Para posicionamiento dinámico (flip, collision detection), aplica las coordenadas desde JS escuchando el evento `hp-open`.
