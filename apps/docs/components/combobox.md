# Combobox

<span class="hp-badge">Nuevo</span>

El componente `hp-combobox` es un primitivo que implementa el patrón WAI-ARIA **Combobox** completo, permitiendo crear interfaces de selección con entrada editable, filtrado/autocomplete, popup anchored, navegación por teclado completa, y soporte para valores deshabilitados. Compatible con formularios HTML nativos.

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/combobox
```

```bash [npm]
npm install @headless-primitives/combobox
```

```bash [yarn]
yarn add @headless-primitives/combobox
```

```bash [bun]
bun add @headless-primitives/combobox
```

:::

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-combobox` usando únicamente `@headless-primitives/utils/base.css`. La navegación por teclado, `aria-expanded`, `aria-selected` y el filtrado funcionan completamente.

<div class="hp-demo-card">
  <hp-combobox>
    <hp-combobox-input></hp-combobox-input>
    <hp-combobox-content>
      <hp-combobox-option value="apple">Apple</hp-combobox-option>
      <hp-combobox-option value="banana">Banana</hp-combobox-option>
      <hp-combobox-option value="cherry">Cherry</hp-combobox-option>
    </hp-combobox-content>
  </hp-combobox>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-combobox class="demo-combobox" placeholder="Escribe para filtrar...">
    <hp-combobox-input class="demo-input"></hp-combobox-input>
    <hp-combobox-content class="demo-content">
      <hp-combobox-option value="apple">🍎 Apple</hp-combobox-option>
      <hp-combobox-option value="banana">🍌 Banana</hp-combobox-option>
      <hp-combobox-option value="cherry">🍒 Cherry</hp-combobox-option>
      <hp-combobox-option value="date" disabled>📅 Date (deshabilitado)</hp-combobox-option>
      <hp-combobox-option value="elderberry">🫐 Elderberry</hp-combobox-option>
    </hp-combobox-content>
  </hp-combobox>
</div>

<style>
hp-combobox,
hp-combobox-input,
hp-combobox-content,
hp-combobox-option {
  display: block;
}
.demo-combobox {
  position: relative;
  width: 100%;
  max-width: 300px;
}
.demo-input {
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  transition: all 0.15s ease;
}
.demo-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px var(--vp-c-brand-1);
}
.demo-input::placeholder {
  color: var(--vp-c-text-3);
}
.demo-content {
  position: absolute;
  z-index: 50;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 12rem;
  overflow-y: auto;
  margin-top: 0.375rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.15s ease, visibility 0.15s ease;
}
.demo-content[data-state="open"] {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
.demo-content hp-combobox-option {
  display: block;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.15s ease;
}
.demo-content hp-combobox-option:hover:not([aria-disabled="true"]) {
  background: var(--vp-c-bg-soft);
}
.demo-content hp-combobox-option[aria-selected="true"] {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
.demo-content hp-combobox-option[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
.demo-content hp-combobox-option[data-state="hidden"] {
  display: none;
}
</style>

## Anatomía

```html
<hp-combobox>
  <hp-combobox-input></hp-combobox-input>
  <hp-combobox-content>
    <hp-combobox-option value="option-1">Option 1</hp-combobox-option>
    <hp-combobox-option value="option-2">Option 2</hp-combobox-option>
  </hp-combobox-content>
</hp-combobox>
```

### `hp-combobox`

Elemento raíz que coordina el estado del componente.

**Propiedades:**

- `value` — Valor seleccionado actual
- `placeholder` — Placeholder para el input
- `disabled` — Deshabilita el componente

**Eventos:**

- `hp-change` — Se dispara cuando cambia la selección
- `hp-open` — Se dispara cuando se abre el popup
- `hp-close` — Se dispara cuando se cierra el popup
- `hp-highlight` — Se dispara cuando cambia el elemento destacado

### `hp-combobox-input`

Campo de entrada editable con `role="combobox"`.

**Atributos ARIA:**

- `role="combobox"`
- `aria-expanded="true|false"`
- `aria-controls="<content-id>"`
- `aria-activedescendant="<option-id>"`
- `aria-autocomplete="list"`
- `aria-disabled="true|false"`

### `hp-combobox-content`

Contenedor del popup con `role="listbox"`.

**Atributos ARIA:**

- `role="listbox"`
- `aria-hidden="true|false"`
- `data-state="open|closed"`

### `hp-combobox-option`

Opción individual con `role="option"`.

**Propiedades:**

- `value` — Valor único de la opción
- `disabled` — Deshabilita la opción

**Atributos ARIA:**

- `role="option"`
- `aria-selected="true|false"`
- `aria-disabled="true|false"`
- `aria-hidden="true|false"`

## API Programática

```javascript
const combobox = document.querySelector("hp-combobox");

// Seleccionar programáticamente
combobox.select("banana");

// Limpiar selección
combobox.clear();

// Abrir/cerrar
combobox.openCombobox();
combobox.close();

// Escuchar cambios
combobox.addEventListener("hp-change", (event) => {
  console.log("Seleccionado:", event.detail.value, event.detail.label);
});
```

## Estados y Selectores

| Elemento              | Atributos de datos             | Estados posibles | Roles ARIA           | Atributos ARIA                                                                                  |
| :-------------------- | :----------------------------- | :--------------- | :------------------- | :---------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `hp-combobox`         | `data-hp-component="combobox"` | —                | —                    | —                                                                                               |
| `hp-combobox-input`   | —                              | —                | `combobox`           | `aria-expanded`, `aria-controls`, `aria-activedescendant`, `aria-autocomplete`, `aria-disabled` |
| `hp-combobox-content` | `data-state="open              | closed"`         | `open` / `closed`    | `listbox`                                                                                       | `aria-hidden`                                   |
| `hp-combobox-option`  | `data-state="visible           | hidden"`         | `visible` / `hidden` | `option`                                                                                        | `aria-selected`, `aria-disabled`, `aria-hidden` |

### Selectores CSS útiles

```css
/* Popup abierto */
hp-combobox-content[data-state="open"] {
  opacity: 1;
  visibility: visible;
}

/* Opción seleccionada */
hp-combobox-option[aria-selected="true"] {
  background-color: #eff6ff;
  color: #1d4ed8;
}

/* Opción oculta por filtro */
hp-combobox-option[data-state="hidden"] {
  display: none;
}

/* Opción deshabilitada */
hp-combobox-option[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## Navegación por teclado

| Tecla             | Acción                              |
| :---------------- | :---------------------------------- |
| `↓` / `↑`         | Navegar entre opciones visibles     |
| `Home` / `End`    | Ir al primero/último                |
| `Enter` / `Space` | Seleccionar opción destacada        |
| `Escape`          | Cerrar popup                        |
| `Tab`             | Cerrar popup y continuar navegación |

## Formularios

El `hp-combobox` se integra automáticamente con formularios HTML nativos. El valor seleccionado se incluye en el envío del formulario.

```html
<form>
  <hp-combobox name="fruit">
    <hp-combobox-input></hp-combobox-input>
    <hp-combobox-content>
      <hp-combobox-option value="apple">Apple</hp-combobox-option>
      <hp-combobox-option value="banana">Banana</hp-combobox-option>
    </hp-combobox-content>
  </hp-combobox>
  <button type="submit">Enviar</button>
</form>
```

## Accesibilidad

- ✅ Implementa WAI-ARIA **Combobox** pattern completo
- ✅ Roles ARIA correctos: `combobox` (input), `listbox` (content), `option` (items)
- ✅ Atributos ARIA dinámicos: `aria-expanded`, `aria-activedescendant`, `aria-selected`
- ✅ Navegación por teclado completa
- ✅ Soporte para screen readers
- ✅ Manejo de foco apropiado
- ✅ Filtrado accesible sin ocultar opciones del DOM

## Compatibilidad

- ✅ Navegadores modernos con soporte de Custom Elements
- ✅ Server-side rendering (SSR) con VitePress
- ✅ Frameworks: React, Vue, Angular, Svelte
- ✅ Formularios HTML nativos
- ✅ TypeScript completo

## Ejemplos avanzados

### Con valor inicial

```html
<hp-combobox value="banana">
  <hp-combobox-input placeholder="Selecciona una fruta"></hp-combobox-input>
  <hp-combobox-content>
    <hp-combobox-option value="apple">Apple</hp-combobox-option>
    <hp-combobox-option value="banana">Banana</hp-combobox-option>
  </hp-combobox-content>
</hp-combobox>
```

### Deshabilitado

```html
<hp-combobox disabled>
  <hp-combobox-input></hp-combobox-input>
  <hp-combobox-content>
    <hp-combobox-option value="apple">Apple</hp-combobox-option>
  </hp-combobox-content>
</hp-combobox>
```

### Con opciones deshabilitadas

```html
<hp-combobox>
  <hp-combobox-input></hp-combobox-input>
  <hp-combobox-content>
    <hp-combobox-option value="apple">Apple</hp-combobox-option>
    <hp-combobox-option value="banana" disabled>Banana (no disponible)</hp-combobox-option>
  </hp-combobox-content>
</hp-combobox>
```
