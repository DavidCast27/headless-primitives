# Scroll Area

<span class="hp-badge">Nuevo</span>

El componente `hp-scroll-area` es un primitivo que reemplaza los scrollbars nativos del navegador con scrollbars personalizados y accesibles. Implementa el patrón WAI-ARIA `role="scrollbar"` con soporte completo de teclado.

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/scroll-area
```

```bash [npm]
npm install @headless-primitives/scroll-area
```

```bash [yarn]
yarn add @headless-primitives/scroll-area
```

```bash [bun]
bun add @headless-primitives/scroll-area
```

:::

## Anatomía

```html
<hp-scroll-area>
  <hp-scroll-area-viewport>
    <hp-scroll-area-content>
      <!-- contenido scrollable -->
    </hp-scroll-area-content>
  </hp-scroll-area-viewport>
  <hp-scroll-area-scrollbar orientation="vertical">
    <hp-scroll-area-thumb></hp-scroll-area-thumb>
  </hp-scroll-area-scrollbar>
  <hp-scroll-area-scrollbar orientation="horizontal">
    <hp-scroll-area-thumb></hp-scroll-area-thumb>
  </hp-scroll-area-scrollbar>
  <hp-scroll-area-corner></hp-scroll-area-corner>
</hp-scroll-area>
```

## Demostración

### Sin estilos (solo base.css)

<div class="hp-demo-card">
  <hp-scroll-area style="width:300px;height:150px;overflow:hidden;position:relative;">
    <hp-scroll-area-viewport style="width:100%;height:100%;overflow:scroll;scrollbar-width:none;">
      <hp-scroll-area-content>
        <p style="margin:0;padding:8px 12px;border-bottom:1px solid var(--vp-c-divider);">Línea 1</p>
        <p style="margin:0;padding:8px 12px;border-bottom:1px solid var(--vp-c-divider);">Línea 2</p>
        <p style="margin:0;padding:8px 12px;border-bottom:1px solid var(--vp-c-divider);">Línea 3</p>
        <p style="margin:0;padding:8px 12px;border-bottom:1px solid var(--vp-c-divider);">Línea 4</p>
        <p style="margin:0;padding:8px 12px;border-bottom:1px solid var(--vp-c-divider);">Línea 5</p>
        <p style="margin:0;padding:8px 12px;">Línea 6</p>
      </hp-scroll-area-content>
    </hp-scroll-area-viewport>
    <hp-scroll-area-scrollbar orientation="vertical" style="position:absolute;top:0;right:0;bottom:0;width:8px;display:flex;flex-direction:column;padding:2px;">
      <hp-scroll-area-thumb style="flex:1;background:var(--vp-c-divider);border-radius:9999px;min-height:20px;"></hp-scroll-area-thumb>
    </hp-scroll-area-scrollbar>
  </hp-scroll-area>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-scroll-area class="demo-scroll-area">
    <hp-scroll-area-viewport class="demo-viewport">
      <hp-scroll-area-content>
        <p class="demo-item">Elemento 1 — Scroll para ver más</p>
        <p class="demo-item">Elemento 2</p>
        <p class="demo-item">Elemento 3</p>
        <p class="demo-item">Elemento 4</p>
        <p class="demo-item">Elemento 5</p>
        <p class="demo-item">Elemento 6</p>
        <p class="demo-item">Elemento 7</p>
        <p class="demo-item">Elemento 8 — Fin del contenido</p>
      </hp-scroll-area-content>
    </hp-scroll-area-viewport>
    <hp-scroll-area-scrollbar class="demo-scrollbar" orientation="vertical">
      <hp-scroll-area-thumb class="demo-thumb"></hp-scroll-area-thumb>
    </hp-scroll-area-scrollbar>
  </hp-scroll-area>
</div>

<style>
hp-scroll-area,
hp-scroll-area-viewport,
hp-scroll-area-content,
hp-scroll-area-scrollbar,
hp-scroll-area-thumb,
hp-scroll-area-corner {
  display: block;
}
.demo-scroll-area {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 360px;
  height: 200px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}
.demo-viewport {
  width: 100%;
  height: 100%;
  overflow: scroll;
  scrollbar-width: none;
}
.demo-viewport::-webkit-scrollbar { display: none; }
.demo-item {
  margin: 0;
  padding: 10px 14px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
}
.demo-item:last-child { border-bottom: none; }
.demo-scrollbar {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 8px;
  display: flex;
  flex-direction: column;
  padding: 2px;
  opacity: 0;
  transition: opacity 0.2s;
}
.demo-scroll-area:hover .demo-scrollbar { opacity: 1; }
.demo-thumb {
  flex: 1;
  background: var(--vp-c-brand-1);
  border-radius: 9999px;
  min-height: 20px;
  cursor: grab;
}
</style>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-scroll-area class="scroll-area">
  <hp-scroll-area-viewport class="viewport">
    <hp-scroll-area-content>
      <!-- contenido -->
    </hp-scroll-area-content>
  </hp-scroll-area-viewport>
  <hp-scroll-area-scrollbar class="scrollbar" orientation="vertical">
    <hp-scroll-area-thumb class="thumb"></hp-scroll-area-thumb>
  </hp-scroll-area-scrollbar>
  <hp-scroll-area-scrollbar class="scrollbar" orientation="horizontal">
    <hp-scroll-area-thumb class="thumb"></hp-scroll-area-thumb>
  </hp-scroll-area-scrollbar>
  <hp-scroll-area-corner class="corner"></hp-scroll-area-corner>
</hp-scroll-area>
```

```css [style.css]
hp-scroll-area,
hp-scroll-area-viewport,
hp-scroll-area-content,
hp-scroll-area-scrollbar,
hp-scroll-area-thumb,
hp-scroll-area-corner {
  display: block;
}

.scroll-area {
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 200px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.viewport {
  width: 100%;
  height: 100%;
  overflow: scroll;
  scrollbar-width: none;
}
.viewport::-webkit-scrollbar {
  display: none;
}

.scrollbar {
  position: absolute;
  padding: 2px;
  display: flex;
  opacity: 0;
  transition: opacity 0.2s;
}
.scroll-area:hover .scrollbar {
  opacity: 1;
}

.scrollbar[orientation="vertical"] {
  top: 0;
  right: 0;
  bottom: 0;
  width: 8px;
  flex-direction: column;
}

.scrollbar[orientation="horizontal"] {
  left: 0;
  right: 0;
  bottom: 0;
  height: 8px;
  flex-direction: row;
}

.thumb {
  flex: 1;
  background: #94a3b8;
  border-radius: 9999px;
  min-height: 20px;
  min-width: 20px;
  cursor: grab;
}
.thumb:hover {
  background: #64748b;
}

.corner {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 8px;
  height: 8px;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-scroll-area class="relative overflow-hidden w-72 h-48 rounded-lg border border-gray-200">
  <hp-scroll-area-viewport
    class="w-full h-full overflow-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  >
    <hp-scroll-area-content>
      <!-- contenido -->
    </hp-scroll-area-content>
  </hp-scroll-area-viewport>
  <hp-scroll-area-scrollbar
    class="absolute top-0 right-0 bottom-0 w-2 flex flex-col p-0.5 opacity-0 transition-opacity group-hover:opacity-100"
    orientation="vertical"
  >
    <hp-scroll-area-thumb
      class="flex-1 bg-slate-400 hover:bg-slate-500 rounded-full min-h-5 cursor-grab"
    ></hp-scroll-area-thumb>
  </hp-scroll-area-scrollbar>
</hp-scroll-area>
```

:::

</Flavor>

</CodeSnippet>

## API Reference

### `hp-scroll-area`

Contenedor raíz que agrupa todas las partes del scroll area.

#### Atributos

| Atributo      | Tipo                                   | Por defecto  | Descripción                                            |
| :------------ | :------------------------------------- | :----------- | :----------------------------------------------------- |
| `orientation` | `"vertical" \| "horizontal" \| "both"` | `"vertical"` | Orientación del scroll. Refleja en `data-orientation`. |

#### Data attributes gestionados

| Atributo                | Descripción                                                |
| :---------------------- | :--------------------------------------------------------- |
| `data-orientation`      | Refleja el valor de `orientation`.                         |
| `data-has-overflow-y`   | Presente cuando el contenido es más alto que el viewport.  |
| `data-has-overflow-x`   | Presente cuando el contenido es más ancho que el viewport. |
| `data-overflow-y-start` | Presente cuando hay overflow por encima del scroll actual. |
| `data-overflow-y-end`   | Presente cuando hay overflow por debajo del scroll actual. |
| `data-overflow-x-start` | Presente cuando hay overflow a la izquierda del scroll.    |
| `data-overflow-x-end`   | Presente cuando hay overflow a la derecha del scroll.      |

### `hp-scroll-area-viewport`

El contenedor scrollable real. Oculta los scrollbars nativos del navegador.

#### CSS Custom Properties expuestas

| Variable                         | Descripción                                           |
| :------------------------------- | :---------------------------------------------------- |
| `--scroll-area-overflow-y-start` | Píxeles de overflow por encima del scroll actual.     |
| `--scroll-area-overflow-y-end`   | Píxeles de overflow por debajo del scroll actual.     |
| `--scroll-area-overflow-x-start` | Píxeles de overflow a la izquierda del scroll actual. |
| `--scroll-area-overflow-x-end`   | Píxeles de overflow a la derecha del scroll actual.   |

#### Eventos

| Evento      | Detalle                                                                           | Descripción                          |
| :---------- | :-------------------------------------------------------------------------------- | :----------------------------------- |
| `hp-scroll` | `{ scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth }` | Se dispara en cada evento de scroll. |

### `hp-scroll-area-scrollbar`

Scrollbar personalizado. Implementa `role="scrollbar"` con navegación por teclado completa.

#### Atributos

| Atributo      | Tipo                         | Por defecto  | Descripción                                                                    |
| :------------ | :--------------------------- | :----------- | :----------------------------------------------------------------------------- |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Orientación del scrollbar. Refleja en `data-orientation` y `aria-orientation`. |

#### Atributos ARIA gestionados

- `role="scrollbar"` — asignado automáticamente
- `aria-orientation` — sincronizado con `orientation`
- `aria-controls` — referencia al ID del viewport
- `aria-valuemin="0"` — valor mínimo de scroll
- `aria-valuenow` — posición actual de scroll en píxeles
- `aria-valuemax` — máximo de scroll en píxeles

#### Data attributes gestionados

| Atributo        | Descripción                                        |
| :-------------- | :------------------------------------------------- |
| `data-state`    | `"visible"` cuando hay overflow, `"hidden"` si no. |
| `data-dragging` | Presente mientras el thumb está siendo arrastrado. |

#### Navegación por teclado

| Tecla             | Acción                                 |
| :---------------- | :------------------------------------- |
| `ArrowDown/Up`    | Scroll vertical en pasos de 40px       |
| `ArrowLeft/Right` | Scroll horizontal en pasos de 40px     |
| `PageDown/Up`     | Scroll por altura/anchura del viewport |
| `Home`            | Ir al inicio del contenido             |
| `End`             | Ir al final del contenido              |

### `hp-scroll-area-thumb`

Indicador de posición dentro del scrollbar. Su tamaño y posición se calculan dinámicamente.

### `hp-scroll-area-corner`

Esquina donde se intersectan los dos scrollbars. Solo visible cuando ambos están activos (`data-state="visible"`).

## Accesibilidad

`hp-scroll-area` implementa el patrón **WAI-ARIA Scrollbar**:

- `role="scrollbar"` con `aria-controls`, `aria-valuemin`, `aria-valuenow` y `aria-valuemax`
- Navegación completa por teclado (flechas, Page Up/Down, Home, End)
- `aria-hidden="true"` en la esquina (elemento decorativo)
- Los scrollbars son focusables (`tabindex="0"`)
