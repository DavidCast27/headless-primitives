# Alert Dialog <span class="hp-badge">Nuevo</span>

Variante especializada de Dialog para situaciones que requieren confirmación o alerta urgente del usuario. Usa `role="alertdialog"` y bloquea tanto `Escape` como click en backdrop para forzar una acción explícita. Implementa el patrón [WAI-ARIA Alert Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/).

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-dialog` con `data-alert` usando únicamente `@headless-primitives/utils/base.css`. El focus trap, bloqueo de ESC y backdrop sin cierre funcionan completamente.

<div class="hp-demo-card">
  <hp-dialog id="bare-alert-dialog" data-alert>
    <hp-dialog-backdrop></hp-dialog-backdrop>
    <hp-dialog-content aria-labelledby="bare-alert-title">
      <p id="bare-alert-title">¿Confirmar acción irreversible?</p>
      <button onclick="document.getElementById('bare-alert-dialog').close()">Cancelar</button>
      <button onclick="document.getElementById('bare-alert-dialog').close()">Confirmar</button>
    </hp-dialog-content>
  </hp-dialog>
  <button onclick="document.getElementById('bare-alert-dialog').open()">Abrir Alert Dialog (sin estilos)</button>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-dialog id="demo-alert-dialog" data-alert="true" aria-labelledby="demo-alert-title" aria-describedby="demo-alert-body">
    <hp-dialog-trigger style="display:none;" tabindex="-1"></hp-dialog-trigger>
    <hp-dialog-backdrop class="demo-alert-backdrop"></hp-dialog-backdrop>
    <hp-dialog-content class="demo-alert-content" role="alertdialog" aria-modal="true">
      <h2 id="demo-alert-title">Confirmar eliminación</h2>
      <p id="demo-alert-body">¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.</p>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1.5rem;">
        <button class="demo-btn secondary" onclick="document.getElementById('demo-alert-dialog').close()">Cancelar</button>
        <button class="demo-btn danger" onclick="document.getElementById('demo-alert-dialog').close()">Eliminar</button>
      </div>
    </hp-dialog-content>
  </hp-dialog>
  <button class="demo-btn primary" onclick="document.getElementById('demo-alert-dialog').open()">Mostrar Alert Dialog</button>
</div>

<CodeSnippet>
<Flavor only="css">

::: code-group

```html [index.html]
<hp-dialog
  id="alert-dialog"
  data-alert="true"
  aria-labelledby="alert-title"
  aria-describedby="alert-body"
>
  <hp-dialog-backdrop class="backdrop"></hp-dialog-backdrop>
  <hp-dialog-content class="dialog-content" role="alertdialog" aria-modal="true">
    <h2 id="alert-title">Confirmar eliminación</h2>
    <p id="alert-body">¿Estás seguro? Esta acción no se puede deshacer.</p>
    <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1.5rem;">
      <button id="cancel-alert">Cancelar</button>
      <button id="confirm-alert" class="danger">Eliminar</button>
    </div>
  </hp-dialog-content>
</hp-dialog>

<button id="open-alert">Mostrar Alert Dialog</button>

<script>
  const dialog = document.getElementById("alert-dialog");
  document.getElementById("open-alert").addEventListener("click", () => dialog.open());
  document.getElementById("cancel-alert").addEventListener("click", () => dialog.close());
  document.getElementById("confirm-alert").addEventListener("click", () => {
    console.log("Confirmado");
    dialog.close();
  });
</script>
```

```css [style.css]
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.dialog-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 400px;
  width: 90%;
}

.danger {
  background: #dc2626;
  color: white;
  padding: 8px 16px;
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
<hp-dialog
  id="alert-dialog"
  data-alert="true"
  aria-labelledby="alert-title"
  aria-describedby="alert-body"
>
  <hp-dialog-backdrop class="fixed inset-0 bg-black/50 backdrop-blur-sm"></hp-dialog-backdrop>
  <hp-dialog-content
    role="alertdialog"
    aria-modal="true"
    class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-[90%]"
  >
    <h2 id="alert-title" class="text-lg font-semibold mb-2">Confirmar eliminación</h2>
    <p id="alert-body" class="text-gray-600 mb-6">Esta acción no se puede deshacer.</p>
    <div class="flex justify-end gap-2">
      <button
        id="cancel-alert"
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        Cancelar
      </button>
      <button id="confirm-alert" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        Eliminar
      </button>
    </div>
  </hp-dialog-content>
</hp-dialog>

<button id="open-alert" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
  Open Alert
</button>
```

:::

</Flavor>
</CodeSnippet>

## Instalación

AlertDialog reutiliza `hp-dialog`. Asegúrate de tener instalado:

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

- ♿️ `role="alertdialog"` con `aria-modal`, `aria-labelledby` y `aria-describedby`.
- 🔒 ESC **NO** cierra el dialog — requiere acción explícita del usuario.
- 🖱️ Click en backdrop **NO** cierra el dialog.
- ⌨️ Focus trap automático dentro del dialog.
- 🎨 Sin estilos visuales (Headless) — reutiliza `hp-dialog` con `data-alert`.

## Anatomía

```html
<hp-dialog data-alert>
  <hp-dialog-backdrop></hp-dialog-backdrop>
  <hp-dialog-content>
    <!-- Título y descripción con aria-labelledby / aria-describedby -->
    <!-- Botones de acción (sin hp-dialog-close para forzar decisión) -->
  </hp-dialog-content>
</hp-dialog>
```

## API Reference

Alert Dialog reutiliza la API completa de [`hp-dialog`](./dialog.md) con las siguientes diferencias semánticas:

### `hp-dialog` (con `data-alert`)

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción                                                 |
| -------------------- | --------- | ----------- | ----------------------------------------------------------- |
| `data-alert`         | `boolean` | `false`     | Activa modo alertdialog: ESC no cierra, backdrop no cierra. |

#### Métodos

| Método    | Descripción             |
| --------- | ----------------------- |
| `open()`  | Abre el alert dialog.   |
| `close()` | Cierra el alert dialog. |

#### Eventos

| Evento     | Detalle | Descripción                          |
| ---------- | ------- | ------------------------------------ |
| `hp-open`  | —       | Se emite cuando el dialog se abre.   |
| `hp-close` | —       | Se emite cuando el dialog se cierra. |

#### Atributos ARIA clave

- `role="alertdialog"` — En el `hp-dialog-content`.
- `aria-modal="true"` — Siempre presente.
- `aria-labelledby` — Debe apuntar al ID del título.
- `aria-describedby` — Debe apuntar al ID de la descripción.

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Alert Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/).

### Navegación por teclado

| Tecla             | Acción                                                            |
| ----------------- | ----------------------------------------------------------------- |
| `Escape`          | **NO** cierra el alert dialog (requiere acción explícita).        |
| `Tab`             | Navega entre elementos focusables dentro del dialog (focus trap). |
| `Shift + Tab`     | Navega en reversa dentro del focus trap.                          |
| `Enter` / `Space` | Activa los botones de acción.                                     |

## Ejemplos

### Confirmación de Eliminación

```html
<button id="delete-btn">Delete Item</button>

<hp-dialog id="delete-dialog" data-alert="true">
  <hp-dialog-backdrop></hp-dialog-backdrop>
  <hp-dialog-content role="alertdialog" aria-labelledby="delete-title">
    <h2 id="delete-title">Delete this item?</h2>
    <p>This cannot be undone.</p>
    <button id="do-delete">Delete</button>
    <button id="cancel-delete">Cancel</button>
  </hp-dialog-content>
</hp-dialog>

<script>
  const dialog = document.getElementById("delete-dialog");
  document.getElementById("delete-btn").addEventListener("click", () => dialog.open());
  document.getElementById("do-delete").addEventListener("click", () => {
    console.log("Item deleted");
    dialog.close();
  });
  document.getElementById("cancel-delete").addEventListener("click", () => dialog.close());
</script>
```

<style>
.demo-btn {
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}
.demo-btn.primary { background: var(--vp-c-brand-1); color: white; }
.demo-btn.secondary { background: transparent; border-color: var(--vp-c-divider); color: var(--vp-c-text-1); }
.demo-btn.danger { background: #dc2626; color: white; }
.demo-btn:hover { opacity: 0.9; transform: translateY(-1px); }
.demo-alert-backdrop {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
.demo-alert-content {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.demo-alert-content h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.demo-alert-content p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
