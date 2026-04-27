# Popover <span class="hp-badge">Nuevo</span>

El componente `hp-popover` implementa un contenido flotante anclado a un trigger, con posicionamiento computado, focus trap y cierre automático. Sigue el patrón [WAI-ARIA Dialog (Non-modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-popover` usando únicamente `@headless-primitives/utils/base.css`. El click, focus trap, ESC y `aria-expanded` funcionan completamente.

<div class="hp-demo-card">
  <hp-popover>
    <hp-popover-trigger><button>Abrir Popover</button></hp-popover-trigger>
    <hp-popover-content>
      <p>Contenido del popover sin estilos.</p>
      <button onclick="this.closest('hp-popover').close()">Cerrar</button>
    </hp-popover-content>
  </hp-popover>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-popover align="start">
    <hp-popover-trigger>
      <button class="btn btn-primary">Abrir Popover</button>
    </hp-popover-trigger>
    <hp-popover-content class="popover-content">
      <h3 class="demo-pop-title">Título del Popover</h3>
      <p class="demo-pop-body">Contenido del popover flotante con información adicional.</p>
      <button class="btn btn-secondary" onclick="this.closest('hp-popover').close()">Cerrar</button>
    </hp-popover-content>
  </hp-popover>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-popover>
  <hp-popover-trigger>
    <button class="open-popover">Abrir Popover</button>
  </hp-popover-trigger>
  <hp-popover-content class="popover-content">
    <h3>Título</h3>
    <p>Contenido del popover.</p>
    <button onclick="this.closest('hp-popover').close()">Cerrar</button>
  </hp-popover-content>
</hp-popover>
```

```css [style.css]
hp-popover {
  display: inline-block;
  position: relative;
}
hp-popover-trigger {
  display: inline-block;
}

.popover-content {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #e2e8f0;
  min-width: 200px;
}

.open-popover {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-popover class="inline-block">
  <hp-popover-trigger class="inline-block">
    <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Abrir Popover
    </button>
  </hp-popover-trigger>
  <hp-popover-content class="bg-white p-4 rounded-lg shadow-lg border border-gray-200 min-w-48">
    <h3 class="font-semibold mb-2 text-gray-900">Título</h3>
    <p class="mb-3 text-sm text-gray-600">Contenido del popover.</p>
    <button
      class="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
      onclick="this.closest('hp-popover').close()"
    >
      Cerrar
    </button>
  </hp-popover-content>
</hp-popover>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/popover
```

```bash [npm]
npm install @headless-primitives/popover
```

```bash [yarn]
yarn add @headless-primitives/popover
```

```bash [bun]
bun add @headless-primitives/popover
```

:::

## Features

- ⌨️ `Escape` cierra el popover y devuelve el foco al trigger.
- ♿️ `role="dialog"`, `aria-expanded` y `aria-controls` gestionados automáticamente.
- 🎨 Sin estilos visuales (Headless) — posicionamiento computado automático.
- 📐 Alineamiento horizontal configurable (`start` / `end`) con flip vertical automático.
- 🖱️ Click fuera cierra el popover.

## Anatomía

```html
<hp-popover>
  <hp-popover-trigger></hp-popover-trigger>
  <hp-popover-content></hp-popover-content>
</hp-popover>
```

## API Reference

### `hp-popover`

Contenedor principal que coordina trigger y content con posicionamiento computado.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo                 | Por Defecto | Descripción                                              |
| -------------------- | -------------------- | ----------- | -------------------------------------------------------- |
| `align`              | `"start"` \| `"end"` | `"start"`   | Alineamiento horizontal del content respecto al trigger. |

#### Eventos

| Evento     | Detalle | Descripción                           |
| ---------- | ------- | ------------------------------------- |
| `hp-open`  | —       | Se emite cuando el popover se abre.   |
| `hp-close` | —       | Se emite cuando el popover se cierra. |

#### Métodos

| Método     | Descripción                    |
| ---------- | ------------------------------ |
| `open()`   | Abre el popover.               |
| `close()`  | Cierra el popover.             |
| `toggle()` | Alterna el estado del popover. |

### `hp-popover-trigger`

Elemento que abre/cierra el popover al hacer click.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción             |
| -------------------- | --------- | ----------- | ----------------------- |
| `disabled`           | `boolean` | `false`     | Deshabilita el trigger. |

#### Atributos ARIA gestionados automáticamente

- `tabindex="0"` — Habilitado cuando no está deshabilitado.
- `aria-expanded` — `"true"` abierto / `"false"` cerrado.
- `aria-controls` — ID del content cuando abierto.

### `hp-popover-content`

Contenido flotante con focus trap y posicionamiento computado.

#### Atributos ARIA gestionados automáticamente

- `role="dialog"` — Siempre presente.
- `aria-modal="false"` — No es modal (permite interacción fuera).
- `aria-hidden` — `"true"` cerrado / `"false"` abierto.
- `data-state` — `"open"` | `"closed"`.
- `data-side` — `"bottom"` | `"top"` (calculado automáticamente).
- `data-align` — Refleja el valor de `align`.
- `data-hp-overlay-content` — Presente siempre.
- `id` — Generado automáticamente si no proporcionado.

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Dialog (Non-modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

### Navegación por teclado

| Tecla             | Acción                                                             |
| ----------------- | ------------------------------------------------------------------ |
| `Enter` / `Space` | Abre/cierra el popover desde el trigger.                           |
| `Escape`          | Cierra el popover y devuelve el foco al trigger.                   |
| `Tab`             | Navega entre elementos focusables dentro del popover (focus trap). |
