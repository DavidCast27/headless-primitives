# Checkbox <span class="hp-badge">Nuevo</span>

El componente `hp-checkbox` implementa el patrón [WAI-ARIA Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/), permitiendo al usuario seleccionar una o más opciones de un conjunto. Soporta un estado indeterminado (`mixed`).

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-checkbox` usando únicamente `@headless-primitives/utils/base.css`. Los estados `checked`, `mixed` y `disabled` funcionan completamente.

<div class="hp-demo-card">
  <hp-checkbox></hp-checkbox>
  <hp-checkbox aria-checked="true"></hp-checkbox>
  <hp-checkbox aria-checked="mixed"></hp-checkbox>
  <hp-checkbox disabled></hp-checkbox>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <div class="demo-chk-list">
    <div class="demo-chk-row">
      <hp-checkbox id="check-demo"></hp-checkbox>
      <hp-label for="check-demo">Acepto los términos</hp-label>
    </div>
    <div class="demo-chk-row">
      <hp-checkbox id="check-mixed" checked="mixed"></hp-checkbox>
      <hp-label for="check-mixed">Estado mixto (indeterminado)</hp-label>
    </div>
  </div>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<div class="field-group">
  <hp-checkbox id="terms" class="my-checkbox"></hp-checkbox>
  <hp-label for="terms">Acepto los términos</hp-label>
</div>
```

```css [style.css]
.field-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.my-checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.my-checkbox[aria-checked="true"] {
  background: #0070f3;
  border-color: #0070f3;
}

.my-checkbox[aria-checked="true"]::after {
  content: "✓";
  color: white;
  font-size: 12px;
}

.my-checkbox[aria-checked="mixed"]::after {
  content: "";
  width: 8px;
  height: 2px;
  background: #0070f3;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<div class="flex items-center gap-2">
  <hp-checkbox
    id="terms"
    class="h-5 w-5 rounded border-2 border-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 aria-checked:bg-blue-600 aria-checked:border-blue-600 flex items-center justify-center"
  >
  </hp-checkbox>
  <hp-label for="terms" class="text-sm font-medium">Acepto los términos</hp-label>
</div>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/checkbox
```

```bash [npm]
npm install @headless-primitives/checkbox
```

```bash [yarn]
yarn add @headless-primitives/checkbox
```

```bash [bun]
bun add @headless-primitives/checkbox
```

:::

## Features

- ⌨️ Activación por teclado con `Space`.
- ♿️ `role="checkbox"` y `aria-checked` gestionados automáticamente (incluye estado `mixed`).
- 🎨 Sin estilos visuales (Headless).
- ✅ Soporte para estados `checked`, `unchecked` y `mixed` (indeterminado).
- 📋 Atributo `required` con `aria-required` automático.

## Anatomía

```html
<hp-checkbox></hp-checkbox>
```

## API Reference

### `hp-checkbox`

Control con `role="checkbox"`, soporte para estados `true`, `false` y `mixed`, activable con `Space`.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo                 | Por Defecto | Descripción                                                  |
| -------------------- | -------------------- | ----------- | ------------------------------------------------------------ |
| `checked`            | `boolean \| "mixed"` | `false`     | Estado del checkbox. Puede ser `"mixed"` para indeterminado. |
| `disabled`           | `boolean`            | `false`     | Quita `tabindex`, añade `aria-disabled`.                     |
| `required`           | `boolean`            | `false`     | Añade `aria-required="true"`.                                |

#### Métodos

| Método     | Descripción                                                  |
| ---------- | ------------------------------------------------------------ |
| `toggle()` | Alterna `checked` si no está `disabled` y emite `hp-change`. |

#### Eventos

| Evento      | Detalle                           | Descripción                                                  |
| ----------- | --------------------------------- | ------------------------------------------------------------ |
| `hp-change` | `{ checked: boolean \| "mixed" }` | Se emite cuando el estado cambia por interacción de usuario. |

#### Atributos ARIA gestionados automáticamente

- `role="checkbox"` — Asignado si no se especifica.
- `aria-checked` — Sincronizado con `checked` (`"true"`, `"false"`, `"mixed"`).
- `aria-disabled` — Sincronizado con `disabled`.
- `aria-required` — Sincronizado con `required`.
- `tabindex="0"` — Habilitado cuando no está deshabilitado.
- `data-state` — `"checked"` | `"unchecked"` | `"mixed"`.

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/).

### Navegación por teclado

| Tecla   | Acción                          |
| ------- | ------------------------------- |
| `Space` | Alterna el estado del checkbox. |

## Ejemplos

### Estado Mixto (Indeterminado)

```html
<hp-checkbox checked="mixed">Seleccionar todos</hp-checkbox>
```

### Control Programático

```javascript
const checkbox = document.querySelector("hp-checkbox");

// Cambiar estado
checkbox.checked = true;

// Escuchar cambios
checkbox.addEventListener("hp-change", (e) => {
  console.log("Checked:", e.detail.checked);
});
```
