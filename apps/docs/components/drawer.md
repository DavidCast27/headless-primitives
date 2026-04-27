# Drawer <span class="hp-badge">Nuevo</span>

El componente `hp-drawer` implementa un panel deslizante desde cualquier borde del viewport, con backdrop, focus trap y scroll lock. Sigue el patrón [WAI-ARIA Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-drawer` usando únicamente `@headless-primitives/utils/base.css`. El focus trap, scroll lock, ESC para cerrar y todos los atributos ARIA funcionan completamente sin ningún estilo visual.

<div class="hp-demo-card">
  <hp-drawer id="bare-drawer">
    <hp-drawer-trigger><button>Abrir Drawer (sin estilos)</button></hp-drawer-trigger>
    <hp-drawer-backdrop></hp-drawer-backdrop>
    <hp-drawer-content>
      <hp-drawer-title>Panel lateral</hp-drawer-title>
      <hp-drawer-close>&times;</hp-drawer-close>
      <p class="demo-drw-bare-text">
        Solo <code>base.css</code>. Focus trap, scroll lock y Escape funcionan sin CSS adicional.
      </p>
    </hp-drawer-content>
  </hp-drawer>
</div>

### Con estilos personalizados

<div class="hp-demo-card demo-drw-card">
  <hp-drawer>
    <hp-drawer-trigger>
      <button class="btn">Left Drawer</button>
    </hp-drawer-trigger>
    <hp-drawer-backdrop class="drawer-backdrop"></hp-drawer-backdrop>
    <hp-drawer-content class="drawer-content" data-position="left">
      <div class="drawer-header">
        <h2>Navegación</h2>
        <hp-drawer-close><button class="drawer-close-icon" aria-label="Cerrar">&times;</button></hp-drawer-close>
      </div>
      <div class="drawer-body"><p>Panel deslizante desde la izquierda. Usa Escape o haz click fuera para cerrar.</p></div>
    </hp-drawer-content>
  </hp-drawer>
  <hp-drawer position="right">
    <hp-drawer-trigger>
      <button class="btn">Right Drawer</button>
    </hp-drawer-trigger>
    <hp-drawer-backdrop class="drawer-backdrop"></hp-drawer-backdrop>
    <hp-drawer-content class="drawer-content" data-position="right">
      <div class="drawer-header">
        <h2>Ajustes</h2>
        <hp-drawer-close><button class="drawer-close-icon" aria-label="Cerrar">&times;</button></hp-drawer-close>
      </div>
      <div class="drawer-body"><p>Panel deslizante desde la derecha.</p></div>
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

## Features

- ⌨️ `Escape` cierra el drawer.
- ♿️ Focus trap, `role="dialog"`, `aria-modal` y `aria-expanded` gestionados automáticamente.
- 🎨 Sin estilos visuales (Headless) — posicionamiento via `data-position`.
- 📐 Posición configurable: `left`, `right`, `top`, `bottom`.
- 🔒 Scroll lock del body mientras el drawer está abierto.

## Anatomía

```html
<hp-drawer>
  <hp-drawer-trigger></hp-drawer-trigger>
  <hp-drawer-backdrop></hp-drawer-backdrop>
  <hp-drawer-content>
    <hp-drawer-title></hp-drawer-title>
    <hp-drawer-close></hp-drawer-close>
  </hp-drawer-content>
</hp-drawer>
```

## API Reference

### `hp-drawer`

Contenedor principal que coordina trigger, backdrop y content.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo                                           | Por Defecto | Descripción                          |
| -------------------- | ---------------------------------------------- | ----------- | ------------------------------------ |
| `position`           | `"left"` \| `"right"` \| `"top"` \| `"bottom"` | `"left"`    | Borde desde el que desliza el panel. |

#### Eventos

| Evento    | Detalle | Descripción                          |
| --------- | ------- | ------------------------------------ |
| `hp-show` | —       | Se emite cuando el drawer se abre.   |
| `hp-hide` | —       | Se emite cuando el drawer se cierra. |

#### Métodos

| Método     | Descripción                        |
| ---------- | ---------------------------------- |
| `show()`   | Abre el drawer.                    |
| `hide()`   | Cierra el drawer.                  |
| `toggle()` | Alterna el estado.                 |
| `isOpen`   | Getter booleano del estado actual. |

### `hp-drawer-trigger`

Elemento que abre el drawer al hacer click.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción             |
| -------------------- | --------- | ----------- | ----------------------- |
| `disabled`           | `boolean` | `false`     | Deshabilita el trigger. |

#### Atributos ARIA gestionados automáticamente

- `role="button"` — Asignado si no se especifica.
- `tabindex="0"` — Habilitado cuando no está deshabilitado.
- `aria-expanded` — `"true"` cuando abierto, `"false"` cuando cerrado.
- `aria-controls` — ID del content cuando abierto.
- `aria-disabled` — Sincronizado con `disabled`.

### `hp-drawer-content`

Panel deslizante con focus trap.

#### Atributos ARIA gestionados automáticamente

- `role="dialog"` — Siempre presente.
- `aria-modal="true"` — Siempre presente.
- `aria-hidden` — `"true"` cuando cerrado, ausente cuando abierto.
- `data-state` — `"open"` | `"closed"`.
- `data-position` — Sincronizado desde el `position` del padre.
- `data-hp-overlay-content` — Presente siempre.
- `data-hp-drawer-content` — Presente siempre.
- `id` — Generado automáticamente si no proporcionado.

### `hp-drawer-backdrop`

Overlay que bloquea interacción y cierra el drawer al hacer click.

#### Atributos ARIA gestionados automáticamente

- `data-hp-backdrop` — Presente siempre.
- `data-hp-drawer-backdrop` — Presente siempre.
- `data-state` — `"open"` | `"closed"`.

### `hp-drawer-title`

Título semántico del drawer.

### `hp-drawer-close`

Botón de cierre que emite `hp-hide` al activarse.

#### Atributos ARIA gestionados automáticamente

- `role="button"` — Asignado si no se especifica.
- `tabindex="0"` — Siempre focusable.

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

### Navegación por teclado

| Tecla             | Acción                                                            |
| ----------------- | ----------------------------------------------------------------- |
| `Escape`          | Cierra el drawer.                                                 |
| `Tab`             | Navega entre elementos focusables dentro del drawer (focus trap). |
| `Shift + Tab`     | Navega en reversa dentro del focus trap.                          |
| `Enter` / `Space` | Activa el trigger o el botón de cierre.                           |
