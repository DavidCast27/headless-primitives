# Pin Input <span class="hp-badge">Nuevo</span>

El componente `hp-pin-input` captura un código PIN u OTP de longitud fija, con un campo individual por carácter. Auto-avanza el foco, retrocede con Backspace y distribuye texto pegado automáticamente.

## Demostración

### Sin estilos (solo base.css)

<div class="hp-demo-card">
  <hp-pin-input length="4" type="numeric"></hp-pin-input>
</div>

### Con estilos personalizados

<div class="hp-demo-card" style="display: flex; flex-direction: column; gap: 2rem; align-items: flex-start;">
  <div>
    <p style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--vp-c-text-2); margin-bottom: 0.75rem;">Numérico — 4 dígitos</p>
    <hp-pin-input class="demo-pin" length="4" type="numeric" placeholder="·"></hp-pin-input>
  </div>
  <div>
    <p style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--vp-c-text-2); margin-bottom: 0.75rem;">OTP — 6 dígitos</p>
    <hp-pin-input class="demo-pin" length="6" type="numeric" placeholder="·"></hp-pin-input>
  </div>
  <div>
    <p style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--vp-c-text-2); margin-bottom: 0.75rem;">Alfanumérico</p>
    <hp-pin-input class="demo-pin" length="6" type="alphanumeric" placeholder="–"></hp-pin-input>
  </div>
  <div>
    <p style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--vp-c-text-2); margin-bottom: 0.75rem;">Deshabilitado</p>
    <hp-pin-input class="demo-pin" length="4" type="numeric" disabled placeholder="·"></hp-pin-input>
  </div>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-pin-input id="my-pin" length="6" type="numeric"></hp-pin-input>

<script type="module">
  import "@headless-primitives/pin-input";

  const pin = document.getElementById("my-pin");

  pin.addEventListener("hp-change", (e) => {
    console.log("Valor actual:", e.detail.value);
  });

  pin.addEventListener("hp-complete", (e) => {
    console.log("PIN completo:", e.detail.value);
  });
</script>
```

```css [style.css]
hp-pin-input {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

hp-pin-input input {
  width: 2.75rem;
  height: 2.75rem;
  text-align: center;
  font-family: monospace;
  font-size: 1.25rem;
  font-weight: 700;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  outline: none;
}

hp-pin-input input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

hp-pin-input[data-state="complete"] input {
  border-color: #16a34a;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-pin-input
  id="my-pin"
  length="6"
  type="numeric"
  class="inline-flex items-center gap-2"
></hp-pin-input>

<style>
  #my-pin input {
    @apply w-11 h-11 text-center font-mono text-xl font-bold
           border-2 border-slate-200 rounded-lg bg-slate-50 text-slate-900 p-0
           outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50;
  }
  #my-pin[data-state="complete"] input {
    @apply border-green-500 ring-2 ring-green-200/50;
  }
</style>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/pin-input
```

```bash [npm]
npm install @headless-primitives/pin-input
```

```bash [yarn]
yarn add @headless-primitives/pin-input
```

```bash [bun]
bun add @headless-primitives/pin-input
```

:::

## Features

- ⌨️ Auto-avance, Backspace inteligente, `ArrowLeft`/`Right`, `Home`/`End`.
- ♿️ `role="group"`, `aria-label` por slot y `autocomplete="one-time-code"` automáticos.
- 🎨 Sin estilos visuales (Headless).
- 📋 Soporte de pegado con distribución automática.
- 🔢 Tipos: `numeric` (solo dígitos) o `alphanumeric`.

## Anatomía

```html
<hp-pin-input length="4" type="numeric">
  <!-- Generado automáticamente: -->
  <!-- <input data-hp-pin-slot="0" aria-label="Digit 1" ... /> -->
  <!-- <input data-hp-pin-slot="1" aria-label="Digit 2" ... /> -->
  <!-- <input data-hp-pin-slot="2" aria-label="Digit 3" ... /> -->
  <!-- <input data-hp-pin-slot="3" aria-label="Digit 4" ... /> -->
</hp-pin-input>
```

## API Reference

### `hp-pin-input`

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo                            | Por Defecto | Descripción                       |
| -------------------- | ------------------------------- | ----------- | --------------------------------- |
| `length`             | `number`                        | `4`         | Número de slots.                  |
| `type`               | `"numeric"` \| `"alphanumeric"` | `"numeric"` | Caracteres permitidos.            |
| `placeholder`        | `string`                        | `"○"`       | Carácter de placeholder por slot. |
| `disabled`           | `boolean`                       | `false`     | Deshabilita todos los inputs.     |

#### Propiedades de solo lectura

| Propiedad | Tipo     | Descripción                         |
| --------- | -------- | ----------------------------------- |
| `value`   | `string` | Valor combinado de todos los slots. |

#### Métodos

| Método    | Descripción                                    |
| --------- | ---------------------------------------------- |
| `clear()` | Vacía todos los slots y mueve foco al primero. |

#### Eventos

| Evento        | Detalle             | Descripción                          |
| ------------- | ------------------- | ------------------------------------ |
| `hp-change`   | `{ value: string }` | Cada vez que cambia algún slot.      |
| `hp-complete` | `{ value: string }` | Cuando todos los slots están llenos. |

#### Atributos ARIA gestionados automáticamente

- `role="group"` — Siempre presente.
- `aria-label` — `"PIN input"` por defecto.
- `aria-disabled` — Sincronizado con `disabled`.
- `data-state` — `"complete"` | `"incomplete"`.
- `data-type` — Espejo del `type`.

#### Atributos de cada slot (`<input>`)

- `aria-label` — `"Digit N"` (1-based).
- `maxlength="1"` — Solo un carácter.
- `inputmode` — `"numeric"` o `"text"`.
- `autocomplete="one-time-code"` — OTP en dispositivos móviles.

## Accesibilidad

Implementa el patrón OTP Input Group con `role="group"`.

### Navegación por teclado

| Tecla            | Acción                                       |
| ---------------- | -------------------------------------------- |
| Carácter válido  | Ingresa y avanza al siguiente slot.          |
| `Backspace`      | Borra y retrocede al slot anterior si vacío. |
| `ArrowLeft`      | Mueve foco al slot anterior.                 |
| `ArrowRight`     | Mueve foco al slot siguiente.                |
| `Home`           | Mueve foco al primer slot.                   |
| `End`            | Mueve foco al último slot.                   |
| `Ctrl+V` / Pegar | Distribuye texto desde el slot activo.       |

<style>
.demo-pin {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.demo-pin input[data-hp-pin-slot] {
  width: 2.75rem;
  height: 2.75rem;
  text-align: center;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 1.25rem;
  font-weight: 700;
  border: 2px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  outline: none;
  padding: 0;
  caret-color: var(--vp-c-brand-1);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.demo-pin input[data-hp-pin-slot]::placeholder {
  color: var(--vp-c-text-3);
  font-size: 1rem;
}
.demo-pin input[data-hp-pin-slot]:hover:not(:disabled) {
  border-color: var(--vp-c-text-3);
}
.demo-pin input[data-hp-pin-slot]:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
  background: var(--vp-c-bg);
}
.demo-pin[data-state="complete"] input[data-hp-pin-slot] {
  border-color: #16a34a;
  box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.2);
}
.demo-pin[aria-disabled="true"] input[data-hp-pin-slot] {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
