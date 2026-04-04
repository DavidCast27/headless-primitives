---
badge: Nuevo
---

# Alert Dialog

<span class="hp-badge">Nuevo</span>

Variante especializada de Dialog para situaciones que requieren confirmación o alerta urgente del usuario. Usa `role="alertdialog"` para máxima accesibilidad.

## Instalación

AlertDialog utiliza el componente Dialog existente. Asegúrate de tener instalado:

```bash
pnpm add @headless-primitives/dialog
```

## Anatomía

```html
<hp-dialog data-alert="true" aria-labelledby="alert-title" aria-describedby="alert-body">
  <hp-dialog-backdrop></hp-dialog-backdrop>

  <hp-dialog-content role="alertdialog" aria-modal="true">
    <h2 id="alert-title">Confirmar acción</h2>
    <p id="alert-body">¿Deseas continuar? Esta acción es irreversible.</p>

    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
      <button id="cancel">Cancelar</button>
      <button id="confirm">Confirmar</button>
    </div>
  </hp-dialog-content>
</hp-dialog>
```

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
        <button class="demo-btn danger" onclick="alert('Elemento eliminado'); document.getElementById('demo-alert-dialog').close()">Eliminar</button>
      </div>
    </hp-dialog-content>
  </hp-dialog>
  <button class="demo-btn primary" onclick="document.getElementById('demo-alert-dialog').open()">Mostrar Alert Dialog</button>
</div>

<style>
/* hp-* display:block via base.css [data-hp-component] */
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
    alert("¡Confirmado!");
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

```html
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

<script>
  const dialog = document.getElementById("alert-dialog");
  const openBtn = document.getElementById("open-alert");
  const cancelBtn = document.getElementById("cancel-alert");
  const confirmBtn = document.getElementById("confirm-alert");

  openBtn.addEventListener("click", () => dialog.open());
  cancelBtn.addEventListener("click", () => dialog.close());
  confirmBtn.addEventListener("click", () => {
    alert("¡Confirmado!");
    dialog.close();
  });
</script>
```

</Flavor>
</CodeSnippet>

## API Reference

AlertDialog reutiliza la API de [`hp-dialog`](./dialog.md) con diferencias semánticas en ARIA:

### Key Attributes

| Attribute          | Value         | Purpose                               |
| :----------------- | :------------ | :------------------------------------ |
| `role`             | `alertdialog` | Señala al screen reader que es alerta |
| `aria-modal`       | `true`        | Indica comportamiento modal           |
| `aria-labelledby`  | ID del título | Vincula el título para accesibilidad  |
| `aria-describedby` | ID del body   | Vincula la descripción                |

### Methods (inherited from Dialog)

| Method     | Description            |
| :--------- | :--------------------- |
| `.open()`  | Abre el alert dialog   |
| `.close()` | Cierra el alert dialog |

### Events (inherited from Dialog)

| Event      | Description              |
| :--------- | :----------------------- |
| `hp-open`  | Se dispara cuando abre   |
| `hp-close` | Se dispara cuando cierra |

## Behavior

- **Modal**: Bloquea interacción con el resto de la página
- **Focus Trap**: El foco se atrapa dentro del diálogo
- **Escape Key**: Presionar ESC **no** cierra el alert dialog (requiere acción explícita)
- **Backdrop**: Click en el backdrop **no** cierra el alert dialog
- **No Scroll**: Deshabilita el scroll de la página mientras está abierto

## Accessibility

- ✅ `role="alertdialog"` para alertas urgentes
- ✅ `aria-labelledby` vincula el título
- ✅ `aria-describedby` vincula la descripción
- ✅ Focus trap implementado
- ✅ ESC key para cerrar (con manejo de foco)
- ✅ ARIA Live region optional para que screen readers anuncien cambios

## ARIA Patterns

AlertDialog sigue el patrón `alertdialog` de WAI-ARIA:
https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/

Las diferencias clave vs. Dialog estándar:

- AlertDialog es más urgente (role="alertdialog" vs role="dialog")
- Generalmente NO se puede dismissar con ESC (solo en ciertos casos)
- El backdrop usualmente no cierra el diálogo

## Examples

### Delete Confirmation

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

### Warning Alert

```html
<hp-dialog id="warning-dialog" data-alert="true">
  <hp-dialog-backdrop></hp-dialog-backdrop>
  <hp-dialog-content
    role="alertdialog"
    aria-labelledby="warning-title"
    aria-describedby="warning-body"
  >
    <h2 id="warning-title">Unsaved Changes</h2>
    <p id="warning-body">You have unsaved changes. Leave anyway?</p>
    <button>Discard Changes</button>
    <button>Keep Editing</button>
  </hp-dialog-content>
</hp-dialog>
```

## Notes

- AlertDialog NO debe ser usado para simples confirmaciones. Para eso usa [`Popover`](./popover.md)
- AlertDialog es para situaciones donde la acción es **irreversible** o **crítica**
- Si el usuario puede simplicemente ignorar la alerta, usa un [`Toast`](./toast.md) en su lugar
- Respeta `prefers-reduced-motion` opcionalmente mediante CSS keyframes
