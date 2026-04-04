---
badge: Nuevo
---

# Dialog

<span class="hp-badge">Nuevo</span>

Modal overlay con focus trap, scroll lock y backdrop.

## Instalación

```bash
pnpm add @headless-primitives/dialog
```

## Demostración

<div class="hp-demo-card">
  <hp-dialog>
    <hp-dialog-trigger>
      <button class="dlg-btn">Abrir Diálogo</button>
    </hp-dialog-trigger>
    <hp-dialog-backdrop class="dlg-backdrop"></hp-dialog-backdrop>
    <hp-dialog-content class="dlg-content">
      <h2 class="dlg-title">Título del Diálogo</h2>
      <p class="dlg-body">Este es el contenido del diálogo modal. Puedes poner cualquier cosa aquí.</p>
      <div class="dlg-footer">
        <button class="dlg-btn secondary" onclick="this.closest('hp-dialog').close()">Cancelar</button>
        <button class="dlg-btn primary" onclick="this.closest('hp-dialog').close()">Confirmar</button>
      </div>
    </hp-dialog-content>
  </hp-dialog>
</div>

<style>
/* hp-* display:block via base.css [data-hp-component] */
.dlg-btn {
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.15s;
  border: 1px solid transparent;
}
.dlg-btn:not(.secondary):not(.primary) {
  background: var(--vp-c-brand-1);
  color: #fff;
}
.dlg-btn.primary {
  background: var(--vp-c-brand-1);
  color: #fff;
}
.dlg-btn.secondary {
  background: transparent;
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-1);
}
.dlg-btn:hover { opacity: 0.85; }
.dlg-backdrop {
  backdrop-filter: blur(4px);
}
.dlg-content {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 0;
  max-width: 420px;
  width: 90%;
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.25);
}
.dlg-title {
  margin: 0;
  padding: 1.5rem 1.5rem 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.dlg-body {
  margin: 0;
  padding: 0 1.5rem 1.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.dlg-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}
</style>

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
    <button onclick="this.closest('hp-dialog').dispatchEvent(new CustomEvent('hp-close'))">
      Cerrar
    </button>
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
<!-- Usando utilidades de Tailwind CSS -->
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
      onclick="this.closest('hp-dialog').dispatchEvent(new CustomEvent('hp-close'))"
    >
      Cerrar
    </button>
  </hp-dialog-content>
</hp-dialog>
```

:::

</Flavor>

</CodeSnippet>

## API Reference

### `hp-dialog`

Contenedor principal que coordina el trigger, backdrop y content.

**Eventos:**

- `hp-open`: Se emite cuando el dialog se abre
- `hp-close`: Se emite cuando el dialog se cierra

### `hp-dialog-trigger`

El elemento que abre el dialog al hacer click.

**Atributos:**

- `tabindex`: Automáticamente establecido a "0" si no es focusable
- `aria-expanded`: "true" cuando abierto, "false" cuando cerrado
- `aria-controls`: ID del content cuando abierto

### `hp-dialog-content`

El contenido modal con focus trap.

**Atributos:**

- `role`: "dialog"
- `aria-modal`: "true"
- `aria-hidden`: "true" cuando cerrado, "false" cuando abierto
- `id`: Generado automáticamente si no proporcionado

**Propiedades CSS:**

- `display`: "none" cuando cerrado, "" cuando abierto

**Comportamiento:**

- Focus trap activado cuando abierto
- Escape cierra el dialog
- Scroll lock del body

### `hp-dialog-backdrop`

El overlay que bloquea interacción y clicks fuera.

**Comportamiento:**

- Click cierra el dialog
