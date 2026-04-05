---
badge: Nuevo
---

# Drawer

<span class="hp-badge">Nuevo</span>

Panel deslizante desde cualquier borde del viewport, con backdrop, focus trap y scroll lock.

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/drawer
```

```bash [npm]
npm install @headless-primitives/drawer
```

```bash [yarn]
yarn add @headless-primitives/drawer
```

```bash [bun]
bun add @headless-primitives/drawer
```

:::

## Demostración

<div class="hp-demo-card" style="display:flex;gap:0.75rem;flex-wrap:wrap;padding:2rem;">
  <hp-drawer>
    <hp-drawer-trigger>
      <button class="drw-btn">Left Drawer</button>
    </hp-drawer-trigger>
    <hp-drawer-backdrop class="drw-backdrop"></hp-drawer-backdrop>
    <hp-drawer-content class="drw-content" data-position="left">
      <div class="drw-header">
        <h2 class="drw-title">Navegación</h2>
        <hp-drawer-close><button class="drw-close" aria-label="Cerrar">&times;</button></hp-drawer-close>
      </div>
      <div class="drw-body"><p>Panel deslizante desde la izquierda. Usa Escape o haz click fuera para cerrar.</p></div>
    </hp-drawer-content>
  </hp-drawer>

  <hp-drawer position="right">
    <hp-drawer-trigger>
      <button class="drw-btn">Right Drawer</button>
    </hp-drawer-trigger>
    <hp-drawer-backdrop class="drw-backdrop"></hp-drawer-backdrop>
    <hp-drawer-content class="drw-content" data-position="right">
      <div class="drw-header">
        <h2 class="drw-title">Ajustes</h2>
        <hp-drawer-close><button class="drw-close" aria-label="Cerrar">&times;</button></hp-drawer-close>
      </div>
      <div class="drw-body"><p>Panel deslizante desde la derecha.</p></div>
    </hp-drawer-content>
  </hp-drawer>

  <hp-drawer position="bottom">
    <hp-drawer-trigger>
      <button class="drw-btn">Bottom Drawer</button>
    </hp-drawer-trigger>
    <hp-drawer-backdrop class="drw-backdrop"></hp-drawer-backdrop>
    <hp-drawer-content class="drw-content" data-position="bottom">
      <div class="drw-header">
        <h2 class="drw-title">Acciones</h2>
        <hp-drawer-close><button class="drw-close" aria-label="Cerrar">&times;</button></hp-drawer-close>
      </div>
      <div class="drw-body"><p>Panel deslizante desde abajo.</p></div>
    </hp-drawer-content>
  </hp-drawer>
</div>

<style>
.drw-btn {
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  background: var(--vp-c-brand-1);
  color: #fff;
  border: none;
  transition: opacity 0.15s;
}
.drw-btn:hover { opacity: 0.85; }
.drw-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(4px);
  z-index: 999;
}
.drw-content {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 24px 48px -12px rgba(0,0,0,0.25);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.drw-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
.drw-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.drw-body {
  padding: 1.25rem 1.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.6;
}
.drw-body p { margin: 0; }
.drw-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  padding: 4px 8px;
  border-radius: 6px;
  line-height: 1;
}
.drw-close:hover { background: var(--vp-c-default-soft); }
</style>

### Sin estilos (solo base.css)

Así se ve `hp-drawer` usando únicamente `@headless-primitives/utils/base.css`. El focus trap, scroll lock, ESC para cerrar y todos los atributos ARIA funcionan completamente sin ningún estilo visual.

<div class="hp-demo-card">
  <hp-drawer id="bare-drawer">
    <hp-drawer-trigger><button>Abrir Drawer (sin estilos)</button></hp-drawer-trigger>
    <hp-drawer-backdrop></hp-drawer-backdrop>
    <hp-drawer-content>
      <hp-drawer-title>Panel lateral</hp-drawer-title>
      <hp-drawer-close>&times;</hp-drawer-close>
      <p style="padding: 0 1.5rem 1rem; margin: 0; font-size: 0.875rem; opacity: 0.7;">
        Solo <code>base.css</code>. Focus trap, scroll lock y Escape funcionan sin CSS adicional.
      </p>
    </hp-drawer-content>
  </hp-drawer>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-drawer position="left">
  <hp-drawer-trigger>
    <button class="open-btn">Abrir Drawer</button>
  </hp-drawer-trigger>
  <hp-drawer-backdrop class="backdrop"></hp-drawer-backdrop>
  <hp-drawer-content class="drawer-panel" data-position="left">
    <div class="drawer-header">
      <h2>Título</h2>
      <hp-drawer-close><button aria-label="Cerrar">&times;</button></hp-drawer-close>
    </div>
    <div class="drawer-body">
      <p>Contenido del panel.</p>
    </div>
  </hp-drawer-content>
</hp-drawer>
```

```css [style.css]
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.drawer-panel {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 320px;
  background: white;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.open-btn {
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
<hp-drawer position="right">
  <hp-drawer-trigger>
    <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Abrir Drawer</button>
  </hp-drawer-trigger>
  <hp-drawer-backdrop class="fixed inset-0 bg-black/50 backdrop-blur-sm"></hp-drawer-backdrop>
  <hp-drawer-content
    class="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl flex flex-col"
    data-position="right"
  >
    <div class="flex items-center justify-between p-6 border-b">
      <h2 class="text-lg font-semibold">Título</h2>
      <hp-drawer-close>
        <button class="text-gray-400 hover:text-gray-600">&times;</button>
      </hp-drawer-close>
    </div>
    <div class="p-6 flex-1 overflow-y-auto">
      <p>Contenido del panel.</p>
    </div>
  </hp-drawer-content>
</hp-drawer>
```

:::

</Flavor>

</CodeSnippet>

## API Reference

### `hp-drawer`

Contenedor principal que coordina trigger, backdrop y content.

**Atributos:**

| Atributo   | Tipo                                     | Default  | Descripción                         |
| ---------- | ---------------------------------------- | -------- | ----------------------------------- |
| `position` | `"left" \| "right" \| "top" \| "bottom"` | `"left"` | Borde desde el que desliza el panel |

**Métodos:**

- `show()`: Abre el drawer
- `hide()`: Cierra el drawer
- `toggle()`: Alterna el estado abierto/cerrado
- `isOpen`: Getter booleano del estado actual

**Eventos:**

- `hp-show`: Se emite cuando el drawer se abre
- `hp-hide`: Se emite cuando el drawer se cierra

### `hp-drawer-trigger`

El elemento que abre el drawer al hacer click.

**Atributos:**

- `disabled`: Deshabilita el trigger
- `aria-expanded`: "true" cuando abierto, "false" cuando cerrado
- `aria-controls`: ID del content cuando abierto

### `hp-drawer-content`

El panel deslizante con focus trap.

**Atributos gestionados:**

- `role`: `"dialog"`
- `aria-modal`: `"true"`
- `aria-hidden`: `"true"` cuando cerrado, ausente cuando abierto
- `data-state`: `"closed"` / `"open"`
- `data-position`: Sincronizado desde el `position` del padre
- `data-hp-overlay-content`: Presente siempre (usado por `base.css` para `position: fixed` y `z-index`)

**Comportamiento:**

- Focus trap activado cuando abierto
- Escape cierra el drawer
- Scroll lock del body

### `hp-drawer-backdrop`

El overlay que bloquea interacción con el contenido subyacente.

**Comportamiento:**

- Click cierra el drawer
- `data-state`: `"closed"` / `"open"` (gestionado por el padre)

### `hp-drawer-close`

Elemento que cierra el drawer al hacer click o al pulsar Enter / Espacio.
