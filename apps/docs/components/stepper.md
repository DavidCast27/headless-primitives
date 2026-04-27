# Stepper <span class="hp-badge">Nuevo</span>

El componente `hp-stepper` implementa un wizard multi-paso con indicadores de estado, paneles de contenido y navegación programática. Soporta modo lineal (no se puede saltar pasos) y estado de completado global.

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-stepper` usando únicamente `@headless-primitives/utils/base.css`. La navegación lineal, los paneles y el estado de completado funcionan completamente.

<div class="hp-demo-card">
  <hp-stepper value="0">
    <hp-stepper-list class="demo-stp-list">
      <hp-stepper-item>1</hp-stepper-item>
      <hp-stepper-item>2</hp-stepper-item>
    </hp-stepper-list>
    <hp-stepper-panel>Paso 1 (sin estilos)</hp-stepper-panel>
    <hp-stepper-panel>Paso 2 (sin estilos)</hp-stepper-panel>
    <div class="demo-stp-actions">
      <hp-stepper-prev><button>Anterior</button></hp-stepper-prev>
      <hp-stepper-next><button>Siguiente</button></hp-stepper-next>
    </div>
  </hp-stepper>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-stepper value="0" class="stepper">
    <hp-stepper-list class="stepper-list">
      <hp-stepper-item class="stepper-item">Paso 1</hp-stepper-item>
      <hp-stepper-item class="stepper-item">Paso 2</hp-stepper-item>
      <hp-stepper-item class="stepper-item">Paso 3</hp-stepper-item>
    </hp-stepper-list>
    <hp-stepper-panel class="stepper-panel">Contenido del paso 1</hp-stepper-panel>
    <hp-stepper-panel class="stepper-panel">Contenido del paso 2</hp-stepper-panel>
    <hp-stepper-panel class="stepper-panel">Contenido del paso 3</hp-stepper-panel>
    <div class="stepper-actions">
      <hp-stepper-prev class="stepper-prev">← Anterior</hp-stepper-prev>
      <hp-stepper-next class="stepper-next">Siguiente →</hp-stepper-next>
      <hp-stepper-finish class="stepper-next">✓ Finalizar</hp-stepper-finish>
    </div>
  </hp-stepper>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-stepper value="0">
  <hp-stepper-list>
    <hp-stepper-item>Paso 1</hp-stepper-item>
    <hp-stepper-item>Paso 2</hp-stepper-item>
    <hp-stepper-item>Paso 3</hp-stepper-item>
  </hp-stepper-list>
  <hp-stepper-panel>Contenido 1</hp-stepper-panel>
  <hp-stepper-panel>Contenido 2</hp-stepper-panel>
  <hp-stepper-panel>Contenido 3</hp-stepper-panel>
  <hp-stepper-prev>Anterior</hp-stepper-prev>
  <hp-stepper-next>Siguiente</hp-stepper-next>
  <hp-stepper-finish>Finalizar</hp-stepper-finish>
</hp-stepper>
```

```css [style.css]
hp-stepper-panel[data-state="hidden"] {
  display: none;
}
hp-stepper-item[data-state="active"] {
  font-weight: bold;
  color: #3b82f6;
}
hp-stepper-item[data-state="completed"] {
  color: #16a34a;
}
hp-stepper-item[data-state="pending"] {
  opacity: 0.5;
}
hp-stepper-prev[disabled],
hp-stepper-next[disabled],
hp-stepper-finish[disabled] {
  opacity: 0.4;
  cursor: not-allowed;
}
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/stepper
```

```bash [npm]
npm install @headless-primitives/stepper
```

```bash [yarn]
yarn add @headless-primitives/stepper
```

```bash [bun]
bun add @headless-primitives/stepper
```

:::

## Features

- ⌨️ Flechas, `Home`, `End` para navegar entre pasos.
- ♿️ `role="tablist"` / `role="tab"` / `role="tabpanel"` con `aria-selected` y `aria-disabled` automáticos.
- 🎨 Sin estilos visuales (Headless).
- 📐 Orientación configurable (`horizontal` / `vertical`).
- 🔒 Modo lineal: impide saltar pasos no completados.
- ✅ Estado global de completado con `complete()`.

## Anatomía

```html
<hp-stepper>
  <hp-stepper-list>
    <hp-stepper-item></hp-stepper-item>
    <hp-stepper-item></hp-stepper-item>
  </hp-stepper-list>
  <hp-stepper-panel></hp-stepper-panel>
  <hp-stepper-panel></hp-stepper-panel>
  <hp-stepper-prev></hp-stepper-prev>
  <hp-stepper-next></hp-stepper-next>
  <hp-stepper-finish></hp-stepper-finish>
</hp-stepper>
```

## API Reference

### `hp-stepper`

Contenedor raíz del wizard.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo                           | Por Defecto    | Descripción                                |
| -------------------- | ------------------------------ | -------------- | ------------------------------------------ |
| `value`              | `number`                       | `0`            | Índice del paso activo (0-based).          |
| `steps`              | `number`                       | `0`            | Total de pasos (auto-detectado por hijos). |
| `orientation`        | `"horizontal"` \| `"vertical"` | `"horizontal"` | Orientación del stepper.                   |
| `linear`             | `boolean`                      | `false`        | Impide saltar pasos no completados.        |

#### Métodos

| Método        | Descripción                             |
| ------------- | --------------------------------------- |
| `next()`      | Avanza al siguiente paso.               |
| `prev()`      | Retrocede al paso anterior.             |
| `goTo(index)` | Navega al paso por índice.              |
| `complete()`  | Marca todos los pasos como completados. |

#### Eventos

| Evento        | Detalle                           | Descripción                   |
| ------------- | --------------------------------- | ----------------------------- |
| `hp-change`   | `{ value: number, prev: number }` | Cuando cambia el paso.        |
| `hp-complete` | `{ steps: number }`               | Cuando se completa el wizard. |

#### Atributos ARIA gestionados automáticamente

- `role="group"` — Siempre presente.
- `data-orientation` — Sincronizado con `orientation`.
- `data-state` — `"completed"` cuando `complete()` es invocado.

### `hp-stepper-list`

Lista de indicadores de paso.

#### Atributos ARIA gestionados automáticamente

- `role="tablist"` — Siempre presente.
- `aria-orientation` — Sincronizado con el root.

### `hp-stepper-item`

Indicador individual de paso.

#### Atributos ARIA gestionados automáticamente

- `role="tab"` — Siempre presente.
- `aria-selected` — `"true"` para el paso activo.
- `aria-disabled` — `"true"` en modo lineal para pasos inalcanzables.
- `data-state` — `"completed"` | `"active"` | `"pending"`.
- `data-index` — Índice del paso.
- `tabindex` — `0` para el activo, `-1` para los demás.

### `hp-stepper-panel`

Panel de contenido de un paso.

#### Atributos ARIA gestionados automáticamente

- `role="tabpanel"` — Siempre presente.
- `aria-hidden` — `"true"` cuando no activo.
- `data-state` — `"active"` | `"hidden"`.

### `hp-stepper-prev` / `hp-stepper-next` / `hp-stepper-finish`

Botones de navegación. Automáticamente deshabilitados según el estado.

## Accesibilidad

Usa el patrón `tablist`/`tab`/`tabpanel` del W3C.

### Navegación por teclado

| Tecla                      | Acción          |
| -------------------------- | --------------- |
| `ArrowRight` / `ArrowDown` | Siguiente paso. |
| `ArrowLeft` / `ArrowUp`    | Paso anterior.  |
| `Home`                     | Primer paso.    |
| `End`                      | Último paso.    |
