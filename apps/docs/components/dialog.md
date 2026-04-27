# Dialog <span class="hp-badge">Nuevo</span>

Modal overlay con focus trap, scroll lock y backdrop. Implementa el patrón [WAI-ARIA Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) con soporte para modo `alertdialog`.

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-dialog` usando únicamente `@headless-primitives/utils/base.css`. El focus trap, scroll lock, ESC para cerrar y todos los atributos ARIA funcionan completamente sin ningún estilo visual.

<div class="hp-demo-card">
  <hp-dialog id="bare-dialog">
    <hp-dialog-trigger><button>Abrir Dialog (sin estilos)</button></hp-dialog-trigger>
    <hp-dialog-backdrop></hp-dialog-backdrop>
    <hp-dialog-content>
      <p>Contenido del dialog sin estilos. El foco queda atrapado aquí.</p>
      <button onclick="this.closest('hp-dialog').close()">Cerrar</button>
    </hp-dialog-content>
  </hp-dialog>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-dialog>
    <hp-dialog-trigger>
      <button class="btn">Abrir Diálogo</button>
    </hp-dialog-trigger>
    <hp-dialog-backdrop class="dialog-backdrop"></hp-dialog-backdrop>
    <hp-dialog-content class="dialog-content">
      <h2>Título del Diálogo</h2>
      <p>Este es el contenido del diálogo modal. Puedes poner cualquier cosa aquí.</p>
      <div class="demo-dlg-footer">
        <button class="btn" onclick="this.closest('hp-dialog').close()">Cancelar</button>
        <button class="btn btn-secondary" onclick="this.closest('hp-dialog').close()">Confirmar</button>
      </div>
    </hp-dialog-content>
  </hp-dialog>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-dialog>
  <hp-dialog-trigger>
    <button class="open-dialog">Abrir Diálogo</button>
  </hp-dialog-trigger>
  <hp-dialog-backdrop class="backdrop"></hp-dialog-backdrop>
  <hp-dialog-content class="dialog-content">
    <h2>Título</h2>
    <p>Contenido del diálogo.</p>
    <button onclick="this.closest('hp-dialog').close()">Cerrar</button>
  </hp-dialog-content>
</hp-dialog>
```

```css [style.css]
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.dialog-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
}

.open-dialog {
  padding: 10px 20px;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-dialog>
  <hp-dialog-trigger>
    <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Abrir Diálogo
    </button>
  </hp-dialog-trigger>
  <hp-dialog-backdrop class="fixed inset-0 bg-black bg-opacity-50"></hp-dialog-backdrop>
  <hp-dialog-content
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg shadow-xl max-w-md w-full"
  >
    <h2 class="text-xl font-bold mb-4">Título</h2>
    <p class="mb-4">Contenido del diálogo.</p>
    <button
      class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      onclick="this.closest('hp-dialog').close()"
    >
      Cerrar
    </button>
  </hp-dialog-content>
</hp-dialog>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/dialog
```

```bash [npm]
npm install @headless-primitives/dialog
```

```bash [yarn]
yarn add @headless-primitives/dialog
```

```bash [bun]
bun add @headless-primitives/dialog
```

:::

## Features

- ⌨️ `Escape` cierra el dialog (deshabilitado en modo alert).
- ♿️ Focus trap automático, `role="dialog"` / `role="alertdialog"` y `aria-modal`.
- 🎨 Sin estilos visuales (Headless) — posicionamiento y backdrop via `base.css`.
- 🔒 Scroll lock del body mientras el dialog está abierto.
- 🖱️ Click en backdrop cierra el dialog (deshabilitado en modo alert).

## Anatomía

```html
<hp-dialog>
  <hp-dialog-trigger></hp-dialog-trigger>
  <hp-dialog-backdrop></hp-dialog-backdrop>
  <hp-dialog-content>
    <hp-dialog-title></hp-dialog-title>
    <hp-dialog-close></hp-dialog-close>
  </hp-dialog-content>
</hp-dialog>
```

## API Reference

### `hp-dialog`

Contenedor principal que coordina trigger, backdrop y content.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción                                                            |
| -------------------- | --------- | ----------- | ---------------------------------------------------------------------- |
| `data-alert`         | `boolean` | `false`     | Activa modo `alertdialog`: ESC no cierra, click en backdrop no cierra. |

#### Eventos

| Evento     | Detalle | Descripción                          |
| ---------- | ------- | ------------------------------------ |
| `hp-open`  | —       | Se emite cuando el dialog se abre.   |
| `hp-close` | —       | Se emite cuando el dialog se cierra. |

#### Métodos

| Método    | Descripción                         |
| --------- | ----------------------------------- |
| `open()`  | Abre el dialog programáticamente.   |
| `close()` | Cierra el dialog programáticamente. |

### `hp-dialog-trigger`

El elemento que abre el dialog al hacer click.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción             |
| -------------------- | --------- | ----------- | ----------------------- |
| `disabled`           | `boolean` | `false`     | Deshabilita el trigger. |

#### Atributos ARIA gestionados automáticamente

- `role="button"` — Asignado si no se especifica.
- `tabindex="0"` — Habilitado cuando no está deshabilitado.
- `aria-expanded` — `"true"` cuando el dialog está abierto, `"false"` cuando cerrado.
- `aria-controls` — ID del content cuando abierto.
- `aria-disabled` — Sincronizado con el estado `disabled`.

### `hp-dialog-content`

El contenido modal con focus trap.

#### Atributos ARIA gestionados automáticamente

- `role="dialog"` — O `"alertdialog"` si `hp-dialog` tiene `data-alert`.
- `aria-modal="true"` — Siempre presente.
- `aria-hidden` — `"true"` cuando cerrado, ausente cuando abierto.
- `data-state` — `"open"` | `"closed"`.
- `data-hp-overlay-content` — Presente siempre (usado por `base.css` para posicionamiento fijo).
- `id` — Generado automáticamente si no proporcionado.

### `hp-dialog-backdrop`

Overlay visual que bloquea interacción fuera del dialog.

#### Atributos ARIA gestionados automáticamente

- `data-hp-backdrop` — Presente siempre.
- `data-state` — `"open"` | `"closed"`.

### `hp-dialog-title`

Título semántico del dialog.

### `hp-dialog-close`

Botón de cierre que emite `hp-close` al activarse.

#### Atributos ARIA gestionados automáticamente

- `role="button"` — Asignado si no se especifica.
- `tabindex="0"` — Siempre focusable.

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

### Navegación por teclado

| Tecla             | Acción                                                            |
| ----------------- | ----------------------------------------------------------------- |
| `Escape`          | Cierra el dialog (deshabilitado en modo `alertdialog`).           |
| `Tab`             | Navega entre elementos focusables dentro del dialog (focus trap). |
| `Shift + Tab`     | Navega en reversa dentro del focus trap.                          |
| `Enter` / `Space` | Activa el trigger para abrir, o el botón de cierre para cerrar.   |

## Ejemplos

### Alert Dialog (No Dismissable)

```html
<hp-dialog data-alert>
  <hp-dialog-trigger><button>Eliminar cuenta</button></hp-dialog-trigger>
  <hp-dialog-backdrop></hp-dialog-backdrop>
  <hp-dialog-content>
    <hp-dialog-title>¿Estás seguro?</hp-dialog-title>
    <p>Esta acción no se puede deshacer.</p>
    <hp-dialog-close>Cancelar</hp-dialog-close>
  </hp-dialog-content>
</hp-dialog>
```

### Control Programático

```javascript
const dialog = document.querySelector("hp-dialog");

// Abrir
dialog.open();

// Cerrar
dialog.close();

// Escuchar eventos
dialog.addEventListener("hp-open", () => console.log("Abierto"));
dialog.addEventListener("hp-close", () => console.log("Cerrado"));
```
