# Toggle Group

<span class="hp-badge">Nuevo</span>

El componente `hp-toggle-group` agrupa un conjunto de botones de dos estados que pueden ser activados o desactivados. Soporta tanto selección simple (solo uno activo) como selección múltiple (varios activos), con navegación completa por teclado y accesibilidad WAI-ARIA incorporada.

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/toggle-group
```

```bash [npm]
npm install @headless-primitives/toggle-group
```

```bash [yarn]
yarn add @headless-primitives/toggle-group
```

```bash [bun]
bun add @headless-primitives/toggle-group
```

:::

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-toggle-group` usando únicamente `@headless-primitives/utils/base.css`. La selección, `aria-pressed` y navegación por teclado funcionan completamente.

<div class="hp-demo-card">
  <hp-toggle-group type="single" value="b">
    <hp-toggle value="b">B</hp-toggle>
    <hp-toggle value="i">I</hp-toggle>
    <hp-toggle value="u">U</hp-toggle>
  </hp-toggle-group>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-toggle-group type="single" value="bold" class="demo-group">
    <hp-toggle value="bold" class="demo-toggle">
      <span>B</span>
    </hp-toggle>
    <hp-toggle value="italic" class="demo-toggle">
      <span>I</span>
    </hp-toggle>
    <hp-toggle value="underline" class="demo-toggle">
      <span>U</span>
    </hp-toggle>
  </hp-toggle-group>

  <hp-toggle-group type="multiple" value="left,right" class="demo-group">
    <hp-toggle value="left" class="demo-toggle">
      <span>←</span>
    </hp-toggle>
    <hp-toggle value="center" class="demo-toggle">
      <span>↔</span>
    </hp-toggle>
    <hp-toggle value="right" class="demo-toggle">
      <span>→</span>
    </hp-toggle>
  </hp-toggle-group>
</div>

<style>
.hp-demo-card .demo-group {
  display: flex;
  gap: 2px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  padding: 2px;
  margin: 0.5rem 0;
}

.hp-demo-card .demo-group[orientation="vertical"] {
  flex-direction: column;
  width: fit-content;
}

.hp-demo-card .demo-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.15s ease;
}

.hp-demo-card .demo-toggle:hover {
  background: var(--vp-c-bg-soft);
}

.hp-demo-card .demo-toggle:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

/* Máxima especificidad para asegurar que se aplique */
.hp-demo-card .demo-toggle[data-state="on"] {
  background: var(--vp-c-brand-1) !important;
  color: white !important;
  border-color: var(--vp-c-brand-2) !important;
}

.hp-demo-card .demo-toggle[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<!-- Selección simple -->
<hp-toggle-group type="single">
  <hp-toggle value="bold">B</hp-toggle>
  <hp-toggle value="italic">I</hp-toggle>
  <hp-toggle value="underline">U</hp-toggle>
</hp-toggle-group>

<!-- Selección múltiple -->
<hp-toggle-group type="multiple">
  <hp-toggle value="left">←</hp-toggle>
  <hp-toggle value="center">↔</hp-toggle>
  <hp-toggle value="right">→</hp-toggle>
</hp-toggle-group>

<!-- Orientación vertical -->
<hp-toggle-group type="multiple" orientation="vertical">
  <hp-toggle value="top">↑</hp-toggle>
  <hp-toggle value="middle">↕</hp-toggle>
  <hp-toggle value="bottom">↓</hp-toggle>
</hp-toggle-group>
```

```css [style.css]
.toggle-group {
  display: flex;
  gap: 2px;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 2px;
}

.toggle-group[orientation="vertical"] {
  flex-direction: column;
  width: fit-content;
}

.toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  font-weight: 600;
}

.toggle:hover {
  background: #f5f5f5;
}

.toggle:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* El componente setea data-state="on" cuando está activo */
.toggle[data-state="on"] {
  background: #3b82f6;
  color: white;
}

.toggle[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<!-- Selección simple con Tailwind -->
<hp-toggle-group type="single" class="flex gap-0.5 border border-gray-300 rounded-md p-0.5">
  <hp-toggle
    value="bold"
    class="flex items-center justify-center min-w-[2rem] h-8 px-2 rounded font-semibold text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 data-[state=on]:bg-blue-600 data-[state=on]:text-white disabled:opacity-50 disabled:cursor-not-allowed"
  >
    B
  </hp-toggle>
  <hp-toggle
    value="italic"
    class="flex items-center justify-center min-w-[2rem] h-8 px-2 rounded font-semibold text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 data-[state=on]:bg-blue-600 data-[state=on]:text-white disabled:opacity-50 disabled:cursor-not-allowed"
  >
    I
  </hp-toggle>
  <hp-toggle
    value="underline"
    class="flex items-center justify-center min-w-[2rem] h-8 px-2 rounded font-semibold text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 data-[state=on]:bg-blue-600 data-[state=on]:text-white disabled:opacity-50 disabled:cursor-not-allowed"
  >
    U
  </hp-toggle>
</hp-toggle-group>

<!-- Orientación vertical -->
<hp-toggle-group
  type="multiple"
  orientation="vertical"
  class="flex flex-col gap-0.5 border border-gray-300 rounded-md p-0.5 w-fit"
>
  <hp-toggle
    value="top"
    class="flex items-center justify-center min-w-[2rem] h-8 px-2 rounded font-semibold text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 data-[state=on]:bg-blue-600 data-[state=on]:text-white disabled:opacity-50 disabled:cursor-not-allowed"
  >
    ↑
  </hp-toggle>
  <hp-toggle
    value="middle"
    class="flex items-center justify-center min-w-[2rem] h-8 px-2 rounded font-semibold text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 data-[state=on]:bg-blue-600 data-[state=on]:text-white disabled:opacity-50 disabled:cursor-not-allowed"
  >
    ↕
  </hp-toggle>
  <hp-toggle
    value="bottom"
    class="flex items-center justify-center min-w-[2rem] h-8 px-2 rounded font-semibold text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 data-[state=on]:bg-blue-600 data-[state=on]:text-white disabled:opacity-50 disabled:cursor-not-allowed"
  >
    ↓
  </hp-toggle>
</hp-toggle-group>
```

:::

</Flavor>

</CodeSnippet>

## Anatomía

El componente toggle-group consiste en un contenedor y múltiples elementos toggle anidados:

```html
<hp-toggle-group>
  <hp-toggle value="option1">Opción 1</hp-toggle>
  <hp-toggle value="option2">Opción 2</hp-toggle>
  <hp-toggle value="option3">Opción 3</hp-toggle>
</hp-toggle-group>
```

## API Reference

### `hp-toggle-group`

Contenedor que gestiona el estado y la navegación del grupo de toggles.

#### Atributos

| Atributo      | Tipo                           | Por defecto    | Descripción                                           |
| :------------ | :----------------------------- | :------------- | :---------------------------------------------------- |
| `type`        | `"single"` \| `"multiple"`     | `"single"`     | Define si solo un toggle puede estar activo o varios. |
| `value`       | `string` (separado por comas)  | `""`           | Valores actualmente seleccionados.                    |
| `disabled`    | _boolean (presencia)_          | ausente        | Deshabilita todos los toggles del grupo.              |
| `required`    | _boolean (presencia)_          | ausente        | Indica que se requiere selección.                     |
| `orientation` | `"horizontal"` \| `"vertical"` | `"horizontal"` | Dirección de navegación por teclado.                  |
| `role`        | `string`                       | `"group"`      | Rol de accesibilidad del contenedor.                  |

#### Eventos

| Evento      | Detalle               | Descripción                                                  |
| :---------- | :-------------------- | :----------------------------------------------------------- |
| `hp-change` | `{ value: string[] }` | Se dispara cuando cambia la selección del grupo (`bubbles`). |

### `hp-toggle`

Botón individual que puede estar activado o desactivado.

#### Atributos

| Atributo   | Tipo                  | Por defecto | Descripción                                         |
| :--------- | :-------------------- | :---------- | :-------------------------------------------------- |
| `value`    | `string`              | —           | Identificador único del toggle (requerido).         |
| `disabled` | _boolean (presencia)_ | ausente     | Deshabilita el toggle individual.                   |
| `role`     | `string`              | `"button"`  | Rol de accesibilidad.                               |
| `tabindex` | `string`              | dinámico    | Se gestiona automáticamente según el estado y foco. |

#### Atributos de estado gestionados

- `data-state` — `"on"` / `"off"` (para estilos CSS)
- `aria-pressed` — `"true"` / `"false"`

#### Eventos

| Evento            | Detalle             | Descripción                                                |
| :---------------- | :------------------ | :--------------------------------------------------------- |
| `hp-toggle-press` | `{ value: string }` | Se dispara cuando el usuario activa el toggle (`bubbles`). |

## Accesibilidad

`hp-toggle-group` implementa los patrones WAI-ARIA:

- **Contenedor**: Rol `group` con `aria-orientation` según la orientación.
- **Toggles**: Rol `button` con `aria-pressed` sincronizado.
- **Navegación**: Soporte completo de teclado (flechas, Home, End, Enter, Espacio).
- **Foco**: Gestión inteligente del `tabindex` y foco programático.
- **Estados**: Sincronización automática de `aria-disabled` y `aria-required`.

## Comportamiento del Teclado

Cuando un toggle tiene foco:

| Tecla             | Acción                                           |
| :---------------- | :----------------------------------------------- |
| `Enter`/`Espacio` | Activa/desactiva el toggle actual.               |
| `Flechas`         | Navega entre toggles según la orientación.       |
| `Home`            | Mueve foco al primer toggle.                     |
| `End`             | Mueve foco al último toggle.                     |
| `Tab`             | Sale del grupo y continúa navegación por página. |
