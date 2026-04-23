# Toast <span class="hp-badge">Nuevo</span>

El componente `hp-toast` proporciona notificaciones no-modales que se muestran temporalmente y desaparecen automáticamente. Implementa `role="alert"` con `aria-live="polite"` para máxima accesibilidad con screen readers.

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-toast` usando únicamente `@headless-primitives/utils/base.css`. El auto-dismiss y los eventos funcionan completamente sin ningún estilo visual.

<div class="hp-demo-card">
  <hp-toast-container id="demo-toast-bare" data-position="bottom-right"></hp-toast-container>
  <button class="demo-btn" onclick="document.getElementById('demo-toast-bare').addToast('Notificación sin estilos', {duration:3000})">Mostrar Toast (sin estilos)</button>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-toast-container id="demo-toast-container" data-position="bottom-right"></hp-toast-container>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
    <button class="demo-btn success" onclick="(function(){ var t = document.getElementById('demo-toast-container').addToast('✓ Cambios guardados correctamente', {duration:3000}); t.style.background='#16a34a'; t.style.color='#fff'; t.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'; })()">Mostrar Éxito</button>
    <button class="demo-btn error" onclick="(function(){ var t = document.getElementById('demo-toast-container').addToast('✗ Error al guardar los cambios', {duration:4000}); t.style.background='#dc2626'; t.style.color='#fff'; t.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'; })()">Mostrar Error</button>
    <button class="demo-btn info" onclick="(function(){ var t = document.getElementById('demo-toast-container').addToast('ℹ Información importante', {duration:5000}); t.style.background='#2563eb'; t.style.color='#fff'; t.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'; })()">Mostrar Info</button>
  </div>
</div>

<CodeSnippet>
<Flavor only="css">

::: code-group

```html [index.html]
<hp-toast-container data-position="bottom-right"></hp-toast-container>

<button id="show-success">Éxito</button>
<button id="show-error">Error</button>

<script>
  const container = document.querySelector("hp-toast-container");

  document.getElementById("show-success").addEventListener("click", () => {
    container.addToast("✓ Cambios guardados", { duration: 3000 });
  });

  document.getElementById("show-error").addEventListener("click", () => {
    container.addToast("✗ Error al guardar", { duration: 4000 });
  });
</script>
```

```css [style.css]
hp-toast {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 0.875rem;
  min-width: 220px;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-toast-container data-position="bottom-right"></hp-toast-container>

<button id="show-toast" class="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
  Show Toast
</button>

<script>
  const container = document.querySelector("hp-toast-container");

  document.getElementById("show-toast").addEventListener("click", () => {
    const toast = container.addToast("✓ Cambios guardados", { duration: 3000 });
    toast.classList.add("bg-green-600", "text-white", "rounded-lg", "shadow-lg");
  });
</script>
```

:::

</Flavor>
</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/toast
```

```bash [npm]
npm install @headless-primitives/toast
```

```bash [yarn]
yarn add @headless-primitives/toast
```

```bash [bun]
bun add @headless-primitives/toast
```

:::

## Features

- ♿️ `role="alert"`, `aria-live="polite"` y `aria-atomic="true"` automáticos.
- ⏱️ Auto-dismiss configurable con `data-duration` (default 3000ms, 0 = manual).
- 🎨 Sin estilos visuales (Headless).
- 📐 Container con posicionamiento configurable (`data-position`).
- 🔄 API programática para agregar y limpiar toasts dinámicamente.

## Anatomía

```html
<hp-toast-container>
  <hp-toast>
    <hp-toast-title></hp-toast-title>
    <hp-toast-description></hp-toast-description>
    <hp-toast-close></hp-toast-close>
  </hp-toast>
</hp-toast-container>
```

## API Reference

### `hp-toast`

Elemento individual que representa una notificación.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo     | Por Defecto | Descripción                                                    |
| -------------------- | -------- | ----------- | -------------------------------------------------------------- |
| `data-duration`      | `number` | `3000`      | Milisegundos antes del auto-dismiss. `0` = solo cierre manual. |

#### Métodos

| Método    | Descripción                        |
| --------- | ---------------------------------- |
| `close()` | Cierra el toast programáticamente. |

#### Eventos

| Evento       | Detalle | Descripción                                                  |
| ------------ | ------- | ------------------------------------------------------------ |
| `hp-dismiss` | —       | Se dispara cuando el toast se ha cerrado y removido del DOM. |

#### Atributos ARIA gestionados automáticamente

- `role="alert"` — Siempre presente.
- `aria-live="polite"` — Notifica cambios a assistive technology.
- `aria-atomic="true"` — Anuncia el contenido completo.
- `data-state` — `"open"` | `"closed"`.

### `hp-toast-container`

Contenedor para múltiples toasts con layout y posicionamiento.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo     | Por Defecto      | Descripción                                                                                                  |
| -------------------- | -------- | ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `data-position`      | `string` | `"bottom-right"` | Posición en viewport: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`. |

#### Métodos

| Método                        | Descripción                                              |
| ----------------------------- | -------------------------------------------------------- |
| `addToast(content, options?)` | Crea y añade un toast nuevo. Retorna el `HeadlessToast`. |
| `clearAll()`                  | Cierra todos los toasts en el container.                 |

### `hp-toast-title`

Título del toast.

### `hp-toast-description`

Descripción del toast.

### `hp-toast-close`

Botón de cierre del toast.

#### Atributos ARIA gestionados automáticamente

- `role="button"` — Asignado si no se especifica.
- `tabindex="0"` — Siempre focusable.

## Accesibilidad

Adhiere al patrón [WAI-ARIA Alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/).

### Navegación por teclado

| Tecla             | Acción                                        |
| ----------------- | --------------------------------------------- |
| `Enter` / `Space` | Activa el botón de cierre (`hp-toast-close`). |

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
  background: var(--vp-c-brand-1);
  color: white;
}
.demo-btn.success { background: #16a34a; color: white; }
.demo-btn.error { background: #dc2626; color: white; }
.demo-btn.info { background: #2563eb; color: white; }
.demo-btn:hover { opacity: 0.9; transform: translateY(-1px); }
</style>
