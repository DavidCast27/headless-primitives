---
badge: Nuevo
---

# Toast / Alert

<span class="hp-badge">Nuevo</span>

Notificación no-modal que se muestra temporalmente y desaparece automáticamente. Perfecta para feedback de usuario sobre acciones completadas, errores, o cambios en estado.

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

## Demostración

<div class="hp-demo-card">
  <hp-toast-container id="demo-toast-container" data-position="bottom-right"></hp-toast-container>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
    <button class="demo-btn success" onclick="(function(){ var t = document.getElementById('demo-toast-container').addToast('✓ Cambios guardados correctamente', {duration:3000}); t.style.background='#16a34a'; t.style.color='#fff'; t.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'; })()">Mostrar Éxito</button>
    <button class="demo-btn error" onclick="(function(){ var t = document.getElementById('demo-toast-container').addToast('✗ Error al guardar los cambios', {duration:4000}); t.style.background='#dc2626'; t.style.color='#fff'; t.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'; })()">Mostrar Error</button>
    <button class="demo-btn info" onclick="(function(){ var t = document.getElementById('demo-toast-container').addToast('ℹ Información importante', {duration:5000}); t.style.background='#2563eb'; t.style.color='#fff'; t.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'; })()">Mostrar Info</button>
  </div>
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
.demo-btn.success { background: #16a34a; color: white; }
.demo-btn.error { background: #dc2626; color: white; }
.demo-btn.info { background: #2563eb; color: white; }
.demo-btn:hover { opacity: 0.9; transform: translateY(-1px); }
</style>

### Sin estilos (solo base.css)

Así se ve `hp-toast` usando únicamente `@headless-primitives/utils/base.css`. El posicionamiento del container, el auto-dismiss y los eventos funcionan completamente sin ningún estilo visual.

<div class="hp-demo-card">
  <hp-toast-container id="demo-toast-bare" data-position="bottom-right"></hp-toast-container>
  <button class="demo-btn info" onclick="document.getElementById('demo-toast-bare').addToast('Notificación sin estilos', {duration:3000})">Mostrar Toast (sin estilos)</button>
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
    const toast = container.addToast("✓ Cambios guardados", { duration: 3000 });
    toast.style.background = "#16a34a";
    toast.style.color = "#fff";
  });

  document.getElementById("show-error").addEventListener("click", () => {
    const toast = container.addToast("✗ Error al guardar", { duration: 4000 });
    toast.style.background = "#dc2626";
    toast.style.color = "#fff";
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

## API Reference

### `hp-toast`

Elemento individual que representa una notificación.

#### Atributos

| Atributo        | Tipo     | Default | Descripción                                 |
| :-------------- | :------- | :------ | :------------------------------------------ |
| `data-duration` | `number` | `3000`  | Ms antes de auto-dismiss (0 = manual close) |

#### Atributos ARIA gestionados

| Atributo      | Valor    | Descripción                       |
| :------------ | :------- | :-------------------------------- |
| `role`        | `alert`  | Accesibilidad para screen readers |
| `aria-live`   | `polite` | Notifica cambios a assistive tech |
| `aria-atomic` | `true`   | Anuncia el contenido completo     |

#### Métodos

| Método    | Descripción                       |
| :-------- | :-------------------------------- |
| `close()` | Cierra el toast programáticamente |

#### Eventos

| Evento       | Descripción                                       |
| :----------- | :------------------------------------------------ |
| `hp-dismiss` | Se dispara cuando el toast se ha cerrado/removido |

### `hp-toast-container`

Contenedor que maneja múltiples toasts y su layout.

#### Atributos

| Atributo        | Tipo                                                                                                        | Default       | Descripción          |
| :-------------- | :---------------------------------------------------------------------------------------------------------- | :------------ | :------------------- |
| `data-position` | `"top-left"` \| `"top-center"` \| `"top-right"` \| `"bottom-left"` \| `"bottom-center"` \| `"bottom-right"` | `"top-right"` | Posición en viewport |

#### Métodos

| Método                        | Descripción                             |
| :---------------------------- | :-------------------------------------- |
| `addToast(content, options?)` | Crea y añade un toast nuevo             |
| `clearAll()`                  | Cierra todos los toasts en el container |

#### ToastOptions

```typescript
interface ToastOptions {
  duration?: number; // ms antes auto-dismiss (0 = manual)
  id?: string; // ID único para el toast
}
```

## Comportamiento

- Auto-dismiss después de `data-duration` ms (default 3000ms)
- El cierre se señaliza con `data-state="closed"` — define la animación de salida en CSS con `[data-hp-component="toast"][data-state="closed"]`
- El toast se elimina del DOM tras cerrarse (después de 200ms para que la transición CSS complete)
- El container gestiona el stacking de múltiples toasts

## Accesibilidad

- ✅ `role="alert"` para screen readers
- ✅ `aria-live="polite"` notifica cambios sin interrumpir
- ✅ `aria-atomic="true"` anuncia el contenido completo

## Notas

- Como componente headless, `hp-toast` no incluye estilos visuales. Aplica background, color y box-shadow desde CSS usando `[data-hp-component="toast"]`.
- La animación de salida se controla via `data-state="closed"` — define tu propia transición CSS en `[data-hp-component="toast"][data-state="closed"]`.
- Para cerrar desde dentro del toast, usa un botón `hp-toast-close` o llama `this.closest('hp-toast').close()`.
