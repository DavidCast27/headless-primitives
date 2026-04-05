---
badge: Nuevo
---

# Popover

<span class="hp-badge">Nuevo</span>

Contenido flotante que se abre al hacer click, con manejo de foco y teclado.

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

### Alineamiento

El atributo `align` controla el borde horizontal desde el que se abre el contenido, siempre hacia abajo.

<div class="hp-demo-card" style="gap: 1rem; display: flex; flex-wrap: wrap; justify-content: space-between;">
  <hp-popover align="start">
    <hp-popover-trigger>
      <button class="demo-btn">align="start" (izquierda)</button>
    </hp-popover-trigger>
    <hp-popover-content class="demo-popover-content">
      <p style="margin: 0; font-size: 0.875rem; color: var(--vp-c-text-2);">Alineado al borde izquierdo del trigger.</p>
    </hp-popover-content>
  </hp-popover>

  <hp-popover align="end">
    <hp-popover-trigger>
      <button class="demo-btn">align="end" (derecha)</button>
    </hp-popover-trigger>
    <hp-popover-content class="demo-popover-content">
      <p style="margin: 0; font-size: 0.875rem; color: var(--vp-c-text-2);">Alineado al borde derecho del trigger.</p>
    </hp-popover-content>
  </hp-popover>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-popover align="start">
    <hp-popover-trigger>
      <button class="demo-btn">Abrir Popover</button>
    </hp-popover-trigger>
    <hp-popover-content class="demo-popover-content">
      <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600; color: var(--vp-c-text-1);">Título del Popover</h3>
      <p style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--vp-c-text-2); line-height: 1.5;">Contenido del popover flotante con información adicional.</p>
      <button class="demo-btn secondary" onclick="this.closest('hp-popover').close()">Cerrar</button>
    </hp-popover-content>
  </hp-popover>
</div>

<style>
hp-popover { display: inline-block; }
hp-popover-trigger { display: inline-block; }
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
.demo-btn.secondary {
  background: transparent;
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-1);
}
.demo-btn.secondary:hover { border-color: var(--vp-c-brand-1); }
.demo-popover-content {
  background: var(--vp-c-bg);
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--vp-c-divider);
  min-width: 220px;
}
</style>

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
  position: relative; /* hp-popover es el containing block */
}
hp-popover-trigger {
  display: inline-block;
}
/* hp-popover-content visibility via base.css: [data-hp-overlay-content][data-state="closed"] */
/* El componente gestiona position:absolute y coordenadas top/left automáticamente.
   Solo necesitas estilos visuales: */
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

## API Reference

### `hp-popover`

Contenedor principal que coordina el trigger y el content.

#### Atributos

| Atributo | Tipo                 | Por defecto | Descripción                                                                                                                          |
| :------- | :------------------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `align`  | `"start"` \| `"end"` | `"start"`   | Alineamiento horizontal del contenido respecto al trigger. `start` = borde izquierdo del trigger, `end` = borde derecho del trigger. |

#### Métodos

| Método     | Descripción                   |
| :--------- | :---------------------------- |
| `open()`   | Abre el popover               |
| `close()`  | Cierra el popover             |
| `toggle()` | Alterna el estado del popover |

#### Eventos

| Evento     | Descripción                          |
| :--------- | :----------------------------------- |
| `hp-open`  | Se emite cuando el popover se abre   |
| `hp-close` | Se emite cuando el popover se cierra |

### `hp-popover-trigger`

El elemento que abre/cierra el popover al hacer click.

| Atributo        | Valor gestionado                         |
| :-------------- | :--------------------------------------- |
| `tabindex`      | `"0"` automáticamente si no es focusable |
| `aria-expanded` | `"true"` abierto / `"false"` cerrado     |
| `aria-controls` | ID del content cuando abierto            |

### `hp-popover-content`

El contenido flotante con focus trap.

| Atributo      | Valor gestionado                     |
| :------------ | :----------------------------------- |
| `role`        | `"dialog"`                           |
| `aria-modal`  | `"false"`                            |
| `aria-hidden` | `"true"` cerrado / `"false"` abierto |
| `id`          | Generado automáticamente             |

## Comportamiento

- Click en el trigger abre/cierra el popover
- Click fuera del popover lo cierra
- `Escape` cierra el popover y devuelve el foco al trigger
- Focus trap activo mientras está abierto

## Accesibilidad

- ✅ `role="dialog"` en el content
- ✅ `aria-expanded` en el trigger
- ✅ `aria-controls` vincula trigger con content
- ✅ Focus trap implementado
- ✅ `Escape` para cerrar
- ✅ Click fuera para cerrar

## Notas

- El componente gestiona `data-state` para visibilidad — usa `base.css` o tus propios estilos basados en `[data-hp-overlay-content][data-state="closed"]`.
- Usa `position: relative` en `hp-popover` (el containing block) y el componente gestiona `position: absolute` + coordenadas `top`/`left` en `hp-popover-content` automáticamente.
- Para cerrar desde dentro del content, usa `this.closest('hp-popover').close()`.
