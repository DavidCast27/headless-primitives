# Stepper

<span class="hp-badge">Nuevo</span>

El componente `hp-stepper` es un primitivo de asistente por pasos (_step wizard_) accesible que sigue el patrón WAI-ARIA Tabs. Muestra una secuencia de pasos con navegación hacia adelante y atrás, estados diferenciados (`pending`, `active`, `completed`), y soporte completo de teclado.

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

## Demostración

<div class="hp-demo-card">
  <hp-stepper value="0" class="demo-stepper">
    <hp-stepper-list class="demo-stepper-list">
      <hp-stepper-item class="demo-stepper-item">Account</hp-stepper-item>
      <hp-stepper-item class="demo-stepper-item">Profile</hp-stepper-item>
      <hp-stepper-item class="demo-stepper-item">Review</hp-stepper-item>
    </hp-stepper-list>
    <hp-stepper-panel class="demo-stepper-panel"><p>Step 1 — Enter your account details.</p></hp-stepper-panel>
    <hp-stepper-panel class="demo-stepper-panel"><p>Step 2 — Tell us about yourself.</p></hp-stepper-panel>
    <hp-stepper-panel class="demo-stepper-panel"><p>Step 3 — Review and submit.</p></hp-stepper-panel>
    <div style="display:flex;gap:0.5rem;margin-top:0.75rem;">
      <hp-stepper-prev class="demo-stepper-btn">← Previous</hp-stepper-prev>
      <hp-stepper-next class="demo-stepper-btn">Next →</hp-stepper-next>
      <hp-stepper-finish class="demo-stepper-btn demo-stepper-finish">Finish ✓</hp-stepper-finish>
    </div>
  </hp-stepper>
</div>

<style>
.demo-stepper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 520px;
}
.demo-stepper-list {
  display: flex;
  align-items: center;
  counter-reset: hp-step;
}
.demo-stepper-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  cursor: pointer;
  flex: 1;
  white-space: nowrap;
  counter-increment: hp-step;
}
.demo-stepper-item::before {
  content: counter(hp-step);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  min-width: 26px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-size: 0.75rem;
  font-weight: 600;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}
.demo-stepper-item:not(:last-child)::after {
  content: "";
  flex: 1;
  height: 2px;
  background: var(--vp-c-divider);
  margin-left: 0.5rem;
  order: 99;
}
.demo-stepper-item[data-state="active"] { color: var(--vp-c-brand-1); }
.demo-stepper-item[data-state="active"]::before {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}
.demo-stepper-item[data-state="completed"] { color: var(--vp-c-text-1); }
.demo-stepper-item[data-state="completed"]::before {
  content: "✓";
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}
.demo-stepper-item[aria-disabled="true"] { opacity: 0.4; cursor: not-allowed; }
.demo-stepper-panel {
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  min-height: 80px;
}
.demo-stepper-panel p { margin: 0; color: var(--vp-c-text-2); font-size: 0.9rem; }
.demo-stepper-btn {
  padding: 0.4rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.15s;
}
.demo-stepper-btn:hover:not([disabled]) { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.demo-stepper-btn[disabled], .demo-stepper-btn[aria-disabled="true"] { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
.demo-stepper-finish { background: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); color: #fff; }
.demo-stepper-finish:hover:not([disabled]) { filter: brightness(1.1); color: #fff; border-color: var(--vp-c-brand-1); }
.demo-stepper[data-state="completed"] .demo-stepper-list { opacity: 0.7; pointer-events: none; }
</style>

### Sin estilos (solo base.css)

Con únicamente `@headless-primitives/utils/base.css`, los paneles ya respetan la visibilidad a través del selector `[data-hp-stepper-panel][data-state="hidden"]`.

> **¿Quieres agregar colores?** Usa los atributos `data-state` y `data-index` que el componente setea automáticamente.
> Por ejemplo: `hp-stepper-item[data-state="active"] { color: #3b82f6; }`.
> O importa `@headless-primitives/styles` para obtener el tema completo con tokens CSS.

<div class="hp-demo-card">
  <hp-stepper value="0">
    <hp-stepper-list>
      <hp-stepper-item>Step A</hp-stepper-item>
      <hp-stepper-item>Step B</hp-stepper-item>
      <hp-stepper-item>Step C</hp-stepper-item>
    </hp-stepper-list>
    <hp-stepper-panel><p>Panel A</p></hp-stepper-panel>
    <hp-stepper-panel><p>Panel B</p></hp-stepper-panel>
    <hp-stepper-panel><p>Panel C</p></hp-stepper-panel>
    <hp-stepper-prev>Prev</hp-stepper-prev>
    <hp-stepper-next>Next</hp-stepper-next>
  </hp-stepper>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-stepper value="0" class="stepper">
  <hp-stepper-list class="stepper-list">
    <hp-stepper-item class="stepper-item">Account</hp-stepper-item>
    <hp-stepper-item class="stepper-item">Profile</hp-stepper-item>
    <hp-stepper-item class="stepper-item">Review</hp-stepper-item>
  </hp-stepper-list>

  <hp-stepper-panel class="stepper-panel">
    <p>Step 1 — Account details</p>
  </hp-stepper-panel>
  <hp-stepper-panel class="stepper-panel">
    <p>Step 2 — Profile information</p>
  </hp-stepper-panel>
  <hp-stepper-panel class="stepper-panel">
    <p>Step 3 — Review and submit</p>
  </hp-stepper-panel>

  <div class="stepper-actions" data-hp-stepper-actions>
    <hp-stepper-prev class="stepper-btn">← Previous</hp-stepper-prev>
    <hp-stepper-next class="stepper-btn">Next →</hp-stepper-next>
    <hp-stepper-finish class="stepper-btn stepper-finish">Finish ✓</hp-stepper-finish>
  </div>
</hp-stepper>
```

```css [style.css]
.stepper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stepper-list {
  display: flex;
  align-items: center;
  counter-reset: hp-step;
}

.stepper-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  flex: 1;
  white-space: nowrap;
  counter-increment: hp-step;
}

.stepper-item::before {
  content: counter(hp-step);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  min-width: 28px;
  border-radius: 50%;
  border: 2px solid #e2e8f0;
  background: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  transition:
    background 0.2s,
    border-color 0.2s,
    color 0.2s;
}

/* Connector line */
.stepper-item:not(:last-child)::after {
  content: "";
  flex: 1;
  height: 2px;
  background: #e2e8f0;
  margin-left: 0.5rem;
  order: 99;
}

.stepper-item[data-state="active"] {
  color: #3b82f6;
}
.stepper-item[data-state="active"]::before {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #fff;
}

.stepper-item[data-state="completed"] {
  color: #1e293b;
}
.stepper-item[data-state="completed"]::before {
  content: "✓";
  background: #3b82f6;
  border-color: #3b82f6;
  color: #fff;
}

.stepper-item[data-state="completed"]:not(:last-child)::after {
  background: #3b82f6;
  opacity: 0.4;
}

.stepper-item[aria-disabled="true"] {
  opacity: 0.4;
  cursor: not-allowed;
}

.stepper-panel {
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  min-height: 100px;
}

.stepper-actions {
  display: flex;
  gap: 0.5rem;
}

.stepper-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background: #fff;
  font-size: 0.875rem;
  cursor: pointer;
}

.stepper-btn:hover:not([disabled]) {
  border-color: #3b82f6;
  color: #3b82f6;
}
.stepper-btn[disabled] {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.stepper-finish {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #fff;
}
.stepper-finish:hover:not([disabled]) {
  filter: brightness(1.1);
  color: #fff;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-stepper value="0" class="flex flex-col gap-4">
  <hp-stepper-list class="flex items-center [counter-reset:hp-step]">
    <hp-stepper-item
      class="
        inline-flex items-center gap-2 text-sm font-medium text-slate-500 cursor-pointer flex-1
        [counter-increment:hp-step]
        before:[content:counter(hp-step)] before:inline-flex before:items-center before:justify-center
        before:w-7 before:h-7 before:min-w-7 before:rounded-full before:border-2 before:border-slate-200
        before:text-xs before:font-semibold
        after:content-[''] after:flex-1 after:h-0.5 after:bg-slate-200 after:ml-2 after:order-[99]
        [&:last-child]:after:hidden
        [&[data-state=active]]:text-blue-600
        [&[data-state=active]]:before:bg-blue-600 [&[data-state=active]]:before:border-blue-600 [&[data-state=active]]:before:text-white
        [&[data-state=completed]]:text-slate-900
        [&[data-state=completed]]:before:content-['✓'] [&[data-state=completed]]:before:bg-blue-600 [&[data-state=completed]]:before:border-blue-600 [&[data-state=completed]]:before:text-white
        [&[aria-disabled=true]]:opacity-40 [&[aria-disabled=true]]:cursor-not-allowed
      "
    >
      Account
    </hp-stepper-item>
    <hp-stepper-item
      class="
        inline-flex items-center gap-2 text-sm font-medium text-slate-500 cursor-pointer flex-1
        [counter-increment:hp-step]
        before:[content:counter(hp-step)] before:inline-flex before:items-center before:justify-center
        before:w-7 before:h-7 before:min-w-7 before:rounded-full before:border-2 before:border-slate-200
        before:text-xs before:font-semibold
        [&[data-state=active]]:text-blue-600
        [&[data-state=active]]:before:bg-blue-600 [&[data-state=active]]:before:border-blue-600 [&[data-state=active]]:before:text-white
        [&[data-state=completed]]:text-slate-900
        [&[data-state=completed]]:before:content-['✓'] [&[data-state=completed]]:before:bg-blue-600 [&[data-state=completed]]:before:border-blue-600 [&[data-state=completed]]:before:text-white
        [&[aria-disabled=true]]:opacity-40 [&[aria-disabled=true]]:cursor-not-allowed
      "
    >
      Review
    </hp-stepper-item>
  </hp-stepper-list>

  <hp-stepper-panel
    class="p-5 border border-slate-200 rounded-md min-h-24 [&[data-state=hidden]]:hidden"
  >
    <p class="m-0 text-slate-600 text-sm">Step 1 content</p>
  </hp-stepper-panel>
  <hp-stepper-panel
    class="p-5 border border-slate-200 rounded-md min-h-24 [&[data-state=hidden]]:hidden"
  >
    <p class="m-0 text-slate-600 text-sm">Step 2 content</p>
  </hp-stepper-panel>

  <div class="flex gap-2">
    <hp-stepper-prev
      class="px-4 py-2 text-sm border border-slate-200 rounded-md bg-white cursor-pointer hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
    >
      ← Previous
    </hp-stepper-prev>
    <hp-stepper-next
      class="px-4 py-2 text-sm border border-slate-200 rounded-md bg-white cursor-pointer hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
    >
      Next →
    </hp-stepper-next>
  </div>
</hp-stepper>
```

:::

</Flavor>

</CodeSnippet>

## Anatomía

```html
<hp-stepper value="0" orientation="horizontal">
  <!-- Step indicators -->
  <hp-stepper-list>
    <hp-stepper-item>Step 1</hp-stepper-item>
    <hp-stepper-item>Step 2</hp-stepper-item>
    <hp-stepper-item>Step 3</hp-stepper-item>
  </hp-stepper-list>

  <!-- Content panels (matched by DOM order) -->
  <hp-stepper-panel>Content for step 1</hp-stepper-panel>
  <hp-stepper-panel>Content for step 2</hp-stepper-panel>
  <hp-stepper-panel>Content for step 3</hp-stepper-panel>

  <!-- Navigation — finish only enabled on the last step -->
  <div data-hp-stepper-actions>
    <hp-stepper-prev>Previous</hp-stepper-prev>
    <hp-stepper-next>Next →</hp-stepper-next>
    <hp-stepper-finish>Finish ✓</hp-stepper-finish>
  </div>
</hp-stepper>
```

> **Nota:** Los paneles y los items se asocian por orden en el DOM (índice 0, 1, 2…). No hace falta un atributo `value`; el root distribuye el estado en ambos por posición.

## API Reference

### `hp-stepper`

Elemento raíz que coordina el estado de todos los sub-elementos.

#### Atributos

| Atributo      | Tipo                          | Por defecto    | Descripción                                              |
| :------------ | :---------------------------- | :------------- | :------------------------------------------------------- |
| `value`       | _number_                      | `0`            | Índice 0-based del paso activo.                          |
| `linear`      | _boolean_                     | ausente        | Fuerza navegación secuencial (no se puede saltar pasos). |
| `orientation` | `"horizontal"` / `"vertical"` | `"horizontal"` | Orientación visual de la lista de pasos.                 |

#### Propiedades

| Propiedad     | Tipo      | Descripción                                                          |
| :------------ | :-------- | :------------------------------------------------------------------- |
| `value`       | `number`  | Getter/setter del paso activo.                                       |
| `linear`      | `boolean` | Getter/setter del modo lineal.                                       |
| `orientation` | `string`  | Getter/setter de la orientación (`"horizontal"` / `"vertical"`).     |
| `next()`      | `void`    | Avanza al siguiente paso.                                            |
| `prev()`      | `void`    | Retrocede al paso anterior.                                          |
| `goTo(n)`     | `void`    | Salta al paso con índice `n`. Respeta `linear` al avanzar.           |
| `complete()`  | `void`    | Marca el wizard como terminado. Todos los pasos pasan a `completed`. |

#### Eventos

| Evento        | Detalle                           | Descripción                                       |
| :------------ | :-------------------------------- | :------------------------------------------------ |
| `hp-change`   | `{ value: number, prev: number }` | Disparado al cambiar el paso activo.              |
| `hp-complete` | `{ steps: number }`               | Disparado al llamar `complete()` o pulsar Finish. |

#### Atributos de estado

| Atributo     | Valor         | Descripción                                         |
| :----------- | :------------ | :-------------------------------------------------- |
| `data-state` | `"completed"` | Presente en el root después de llamar `complete()`. |

#### Atributos ARIA gestionados

- `role="group"`

---

### `hp-stepper-list`

Contenedor del listado de indicadores de paso.

#### Atributos ARIA gestionados

- `role="tablist"`
- `aria-orientation` — sincronizado con `orientation` del root

---

### `hp-stepper-item`

Indicador individual de paso. La navegación por teclado se gestiona desde `hp-stepper`.

#### Atributos de estado

| Atributo     | Valores                            | Descripción                          |
| :----------- | :--------------------------------- | :----------------------------------- |
| `data-state` | `pending` / `active` / `completed` | Estado del paso.                     |
| `data-index` | _number_                           | Índice 0-based asignado por el root. |

#### Atributos ARIA gestionados

- `role="tab"`
- `aria-selected` — `true` / `false`
- `aria-disabled` — `true` cuando `linear=true` y el paso no es alcanzable
- `tabindex` — `0` (activo) / `-1` (inactivo)

---

### `hp-stepper-panel`

Panel de contenido para un paso. Se muestra cuando su posición coincide con `value`.

#### Atributos de estado

| Atributo     | Valores             | Descripción            |
| :----------- | :------------------ | :--------------------- |
| `data-state` | `active` / `hidden` | Visibilidad del panel. |
| `data-index` | _number_            | Índice 0-based.        |

#### Atributos ARIA gestionados

- `role="tabpanel"`
- `aria-hidden` — `true` / `false`
- `tabindex="0"`

---

### `hp-stepper-prev`

Botón para ir al paso anterior. Se deshabilita automáticamente en el primer paso.

#### Atributos gestionados

- `disabled` (presencia) — cuando `value === 0`
- `aria-disabled` — `"true"` / `"false"`

---

### `hp-stepper-next`

Botón para avanzar al siguiente paso. Se deshabilita automáticamente en el último paso.

#### Atributos gestionados

- `disabled` (presencia) — cuando `value === total - 1`
- `aria-disabled` — `"true"` / `"false"`

---

### `hp-stepper-finish`

Botón de finalización del wizard. Solo se habilita cuando el usuario está en el **último paso** y el stepper no ha sido completado todavía. Al hacer click llama `complete()` internamente.

```html
<hp-stepper-finish>Finish ✓</hp-stepper-finish>
```

#### Atributos gestionados

- `disabled` (presencia) — habilitado únicamente cuando `value === total - 1` y el wizard no está completado
- `aria-disabled` — `"true"` / `"false"`

> **Patrón recomendado:** incluir `hp-stepper-prev`, `hp-stepper-next` y `hp-stepper-finish` juntos dentro de un `<div data-hp-stepper-actions>`. El componente gestiona la habilitación de cada uno automáticamente según el paso actual.

---

## Accesibilidad

`hp-stepper` implementa el patrón **WAI-ARIA Tabs** adaptado para wizards:

- **`role="group"`** en el root, **`role="tablist"`** en la lista, **`role="tab"`** en cada indicador, **`role="tabpanel"`** en cada panel.
- **Navegación por teclado**: flechas direccionales, `Home`, `End`.
- **Gestión de foco**: `tabindex` dinámico — el item activo recibe `0`, los demás `-1`.
- **Modo lineal**: `aria-disabled="true"` en los pasos no alcanzables.
- Los botones de navegación se deshabilitan en los extremos del stepper.

## Navegación por Teclado

| Tecla                      | Acción                                 |
| :------------------------- | :------------------------------------- |
| `ArrowRight` / `ArrowDown` | Paso siguiente (con wrap en no-lineal) |
| `ArrowLeft` / `ArrowUp`    | Paso anterior (con wrap)               |
| `Home`                     | Primer paso                            |
| `End`                      | Último paso                            |
| `Tab`                      | Siguiente elemento enfocable           |

## Estados y Selectores

| Parte               | `data-hp-*`                                                          | `data-state`                       | Rol ARIA   | Atributos ARIA                                             |
| :------------------ | :------------------------------------------------------------------- | :--------------------------------- | :--------- | :--------------------------------------------------------- |
| `hp-stepper`        | `data-hp-component="stepper"`                                        | `completed` (tras `complete()`)    | `group`    | —                                                          |
| `hp-stepper-list`   | `data-hp-component="stepper-list"`, `data-hp-stepper-list`           | —                                  | `tablist`  | `aria-orientation`                                         |
| `hp-stepper-item`   | `data-hp-component="stepper-item"`, `data-hp-stepper-item`           | `pending` / `active` / `completed` | `tab`      | `aria-selected`, `aria-disabled`, `tabindex`, `data-index` |
| `hp-stepper-panel`  | `data-hp-component="stepper-panel"`, `data-hp-stepper-panel`         | `active` / `hidden`                | `tabpanel` | `aria-hidden`, `tabindex`, `data-index`                    |
| `hp-stepper-prev`   | `data-hp-component="stepper-prev"`, `data-hp-stepper-nav="prev"`     | —                                  | —          | `aria-disabled`, `disabled`                                |
| `hp-stepper-next`   | `data-hp-component="stepper-next"`, `data-hp-stepper-nav="next"`     | —                                  | —          | `aria-disabled`, `disabled`                                |
| `hp-stepper-finish` | `data-hp-component="stepper-finish"`, `data-hp-stepper-nav="finish"` | —                                  | —          | `aria-disabled`, `disabled`                                |

### Selectores CSS útiles

```css
/* Panel activo */
hp-stepper-panel[data-state="active"] {
}

/* Panel oculto — ya incluido en base.css */
[data-hp-stepper-panel][data-state="hidden"] {
  display: none;
}

/* Indicadores por estado */
hp-stepper-item[data-state="pending"] {
}
hp-stepper-item[data-state="active"] {
}
hp-stepper-item[data-state="completed"] {
}

/* Paso deshabilitado (modo lineal) */
hp-stepper-item[aria-disabled="true"] {
}

/* Botones deshabilitados */
hp-stepper-prev[disabled],
hp-stepper-next[disabled],
hp-stepper-finish[disabled] {
}

/* Stepper completado — el root recibe data-state="completed" */
hp-stepper[data-state="completed"] {
}

/* Orientación vertical */
hp-stepper[data-orientation="vertical"] hp-stepper-list {
}
```
