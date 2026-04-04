# Checkbox

<span class="hp-badge">Nuevo</span>

El componente `hp-checkbox` es un control que permite al usuario seleccionar una o más opciones de un conjunto, o alternar entre dos estados. Soporta un estado "indeterminado" o mixto.

## Instalación

```bash
pnpm add @headless-primitives/checkbox
```

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
  <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
    <div style="display: flex; align-items: center; gap: 0.75rem;">
      <hp-checkbox id="check-demo" class="demo-checkbox"></hp-checkbox>
      <hp-label for="check-demo">Acepto los términos</hp-label>
    </div>
    <div style="display: flex; align-items: center; gap: 0.75rem;">
      <hp-checkbox id="check-mixed" checked="mixed" class="demo-checkbox"></hp-checkbox>
      <hp-label for="check-mixed">Estado mixto (indeterminado)</hp-label>
    </div>
  </div>
</div>

<style>
.demo-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  background: transparent;
}

.demo-checkbox[aria-checked="true"],
.demo-checkbox[aria-checked="mixed"] {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.demo-checkbox:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
</style>

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
    <!-- El checkmark se puede añadir mediante pseudo-clases en CSS o como hijo -->
  </hp-checkbox>
  <hp-label for="terms" class="text-sm font-medium">Acepto los términos</hp-label>
</div>
```

:::

</Flavor>

</CodeSnippet>

## Anatomía

El estado `checked` y la interacción (ratón y teclado) viven en el elemento raíz.

```html
<hp-checkbox> ... </hp-checkbox>
```

## API Reference

### `hp-checkbox`

Rol `checkbox`, `aria-checked` sincronizado con `checked`, foco por teclado y activación con `Espacio`.

#### Atributos

| Atributo   | Tipo                  | Por defecto  | Descripción                                                         |
| :--------- | :-------------------- | :----------- | :------------------------------------------------------------------ |
| `checked`  | `boolean \| "mixed"`  | ausente      | Estado del checkbox. Puede ser `mixed` para estados indeterminados. |
| `disabled` | _boolean (presencia)_ | ausente      | Quita `tabindex`, añade `aria-disabled`. Observado.                 |
| `required` | _boolean (presencia)_ | ausente      | Añade `aria-required="true"` cuando está presente. Observado.       |
| `role`     | `string`              | `"checkbox"` | Si no se indica, se asigna `checkbox`.                              |
| `tabindex` | `string`              | `"0"`        | Con `disabled`, se elimina.                                         |

#### Propiedades

| Propiedad  | Tipo                 | Descripción                                            |
| :--------- | :------------------- | :----------------------------------------------------- |
| `checked`  | `boolean \| "mixed"` | Getter/setter sincronizado con el atributo `checked`.  |
| `disabled` | `boolean`            | Getter/setter sincronizado con el atributo `disabled`. |

#### Métodos

| Método     | Descripción                                                  |
| :--------- | :----------------------------------------------------------- |
| `toggle()` | Alterna `checked` si no está `disabled` y emite `hp-change`. |

#### Eventos

| Evento      | Detalle                           | Descripción                                           |
| :---------- | :-------------------------------- | :---------------------------------------------------- |
| `hp-change` | `{ checked: boolean \| "mixed" }` | Tras `toggle()` por clic o teclado (`bubbles: true`). |

## Accesibilidad

`hp-checkbox` implementa el patrón **WAI-ARIA Checkbox**:

- Maneja automáticamente el rol `checkbox`.
- Sincroniza `aria-checked` basándose en el estado interno (`true`, `false`, `mixed`).
- Soporta la tecla `Espacio` para alternar el valor.
- Manejo de foco consistente.
