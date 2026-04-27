# Tooltip <span class="hp-badge">Nuevo</span>

El componente `hp-tooltip` implementa el patrón [WAI-ARIA Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/), mostrando información flotante accesible al hacer hover o focus en un elemento trigger.

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-tooltip` usando únicamente `@headless-primitives/utils/base.css`. El hover/focus, `aria-describedby` y visibilidad funcionan completamente.

<div class="hp-demo-card demo-tip-card">
  <hp-tooltip>
    <hp-tooltip-trigger><button>Hover aquí</button></hp-tooltip-trigger>
    <hp-tooltip-content>Texto del tooltip sin estilos</hp-tooltip-content>
  </hp-tooltip>
</div>

### Con estilos personalizados

<div class="hp-demo-card demo-tip-card">
  <hp-tooltip>
    <hp-tooltip-trigger>
      <button class="btn btn-primary">Hover me</button>
    </hp-tooltip-trigger>
    <hp-tooltip-content class="tooltip-content">
      Este es un tooltip de ejemplo
    </hp-tooltip-content>
  </hp-tooltip>
</div>

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

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/tooltip
```

```bash [npm]
npm install @headless-primitives/tooltip
```

```bash [yarn]
yarn add @headless-primitives/tooltip
```

```bash [bun]
bun add @headless-primitives/tooltip
```

:::

## Features

- ♿️ `role="tooltip"` y `aria-describedby` gestionados automáticamente.
- 🎨 Sin estilos visuales (Headless) — posicionamiento libre.
- ⏱️ Delays configurables para show/hide (`show-delay`, `hide-delay`).
- 🔍 Activación por hover (con delay) y focus (inmediato).

## Anatomía

```html
<hp-tooltip>
  <hp-tooltip-trigger></hp-tooltip-trigger>
  <hp-tooltip-content></hp-tooltip-content>
</hp-tooltip>
```

## API Reference

### `hp-tooltip`

Contenedor principal que coordina trigger y content con delays de hover.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo     | Por Defecto | Descripción                                                 |
| -------------------- | -------- | ----------- | ----------------------------------------------------------- |
| `show-delay`         | `number` | `300`       | Delay en ms antes de mostrar el tooltip al hacer hover.     |
| `hide-delay`         | `number` | `150`       | Delay en ms antes de ocultar el tooltip al salir del hover. |

#### Eventos

| Evento     | Detalle | Descripción                            |
| ---------- | ------- | -------------------------------------- |
| `hp-open`  | —       | Se emite cuando el tooltip se muestra. |
| `hp-close` | —       | Se emite cuando el tooltip se oculta.  |

#### Métodos

| Método   | Descripción                           |
| -------- | ------------------------------------- |
| `show()` | Muestra el tooltip programáticamente. |
| `hide()` | Oculta el tooltip programáticamente.  |

### `hp-tooltip-trigger`

Elemento que activa el tooltip al hacer hover o recibir focus.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción             |
| -------------------- | --------- | ----------- | ----------------------- |
| `disabled`           | `boolean` | `false`     | Deshabilita el trigger. |

#### Atributos ARIA gestionados automáticamente

- `tabindex="0"` — Habilitado cuando no está deshabilitado.
- `aria-describedby` — Referencia al ID del content cuando el tooltip es visible.

### `hp-tooltip-content`

Contenido flotante del tooltip.

#### Atributos ARIA gestionados automáticamente

- `role="tooltip"` — Siempre presente.
- `aria-hidden` — `"true"` cuando oculto, `"false"` cuando visible.
- `data-state` — `"open"` | `"closed"`.
- `data-hp-tooltip-content` — Presente siempre (usado por `base.css`).
- `id` — Generado automáticamente si no proporcionado.

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/).

### Navegación por teclado

| Tecla         | Acción                                                  |
| ------------- | ------------------------------------------------------- |
| `Tab` (focus) | Muestra el tooltip inmediatamente al recibir foco.      |
| `Tab` (blur)  | Oculta el tooltip al perder el foco (con `hide-delay`). |

## Ejemplos

### Delays Personalizados

```html
<hp-tooltip show-delay="500" hide-delay="200">
  <hp-tooltip-trigger><button>Hover lento</button></hp-tooltip-trigger>
  <hp-tooltip-content>Aparece después de 500ms</hp-tooltip-content>
</hp-tooltip>
```

### Control Programático

```javascript
const tooltip = document.querySelector("hp-tooltip");

tooltip.show(); // Muestra inmediatamente
tooltip.hide(); // Oculta inmediatamente
```
