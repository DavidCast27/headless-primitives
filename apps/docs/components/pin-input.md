# Pin Input

<span class="hp-badge">Nuevo</span>

El componente `hp-pin-input` permite capturar un código PIN u OTP de longitud fija, con un campo individual por carácter. Auto-avanza el foco al siguiente slot al escribir, retrocede al anterior con Backspace, y distribuye el texto pegado automáticamente.

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

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-pin-input` usando únicamente `@headless-primitives/utils/base.css`. Los inputs funcionan: auto-avance, backspace, pegado y `data-state` están activos.

> **¿Quieres agregar estilos?** Usa `hp-pin-input[data-state="complete"] input { border-color: green; }` o importa `@headless-primitives/styles`.

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
    <p style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--vp-c-text-2); margin-bottom: 0.75rem;">OTP — 6 dígitos (estado completo en verde)</p>
    <hp-pin-input class="demo-pin" length="6" type="numeric" placeholder="·"></hp-pin-input>
  </div>

  <div>
    <p style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--vp-c-text-2); margin-bottom: 0.75rem;">Alfanumérico — código de invitación</p>
    <hp-pin-input class="demo-pin" length="6" type="alphanumeric" placeholder="–"></hp-pin-input>
  </div>

  <div>
    <p style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--vp-c-text-2); margin-bottom: 0.75rem;">Deshabilitado</p>
    <hp-pin-input class="demo-pin" length="4" type="numeric" disabled placeholder="·"></hp-pin-input>
  </div>

</div>

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
  box-sizing: border-box;
  outline: none;
  padding: 0;
  caret-color: var(--vp-c-brand-1);
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
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
    // e.g. enviar al servidor para verificar
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
  background: #f8fafc;
  color: #0f172a;
  box-sizing: border-box;
  outline: none;
  padding: 0;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

hp-pin-input input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

hp-pin-input[data-state="complete"] input {
  border-color: #16a34a;
  box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.2);
}

hp-pin-input[aria-disabled="true"] input {
  opacity: 0.4;
  cursor: not-allowed;
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
           outline-none transition-all duration-150
           focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50;
  }
  #my-pin[data-state="complete"] input {
    @apply border-green-500 ring-2 ring-green-200/50;
  }
  #my-pin[aria-disabled="true"] input {
    @apply opacity-40 cursor-not-allowed;
  }
</style>
```

:::

</Flavor>

</CodeSnippet>

## Anatomía

`hp-pin-input` genera dinámicamente un `<input>` por cada slot. El número de slots se controla con la propiedad `length`.

```html
<hp-pin-input length="4" type="numeric"></hp-pin-input>
```

DOM resultante:

```html
<hp-pin-input
  data-hp-component="pin-input"
  role="group"
  aria-label="PIN input"
  aria-disabled="false"
  data-state="incomplete"
  data-type="numeric"
>
  <input
    data-hp-pin-slot="0"
    aria-label="Digit 1"
    maxlength="1"
    inputmode="numeric"
    autocomplete="one-time-code"
  />
  <input
    data-hp-pin-slot="1"
    aria-label="Digit 2"
    maxlength="1"
    inputmode="numeric"
    autocomplete="one-time-code"
  />
  <input
    data-hp-pin-slot="2"
    aria-label="Digit 3"
    maxlength="1"
    inputmode="numeric"
    autocomplete="one-time-code"
  />
  <input
    data-hp-pin-slot="3"
    aria-label="Digit 4"
    maxlength="1"
    inputmode="numeric"
    autocomplete="one-time-code"
  />
</hp-pin-input>
```

## API Reference

### `hp-pin-input`

#### Propiedades y atributos

| Propiedad / Atributo     | Tipo                            | Por defecto | Descripción                                                                             |
| :----------------------- | :------------------------------ | :---------- | :-------------------------------------------------------------------------------------- |
| `length`                 | `number`                        | `4`         | Número de slots (inputs) a renderizar.                                                  |
| `type`                   | `"numeric"` \| `"alphanumeric"` | `"numeric"` | Modo de entrada. `"numeric"` acepta solo 0–9; `"alphanumeric"` acepta letras y dígitos. |
| `placeholder`            | `string`                        | `"○"`       | Carácter de placeholder en cada slot vacío. Solo se usa el primer carácter.             |
| `disabled`               | `boolean`                       | `false`     | Deshabilita todos los inputs.                                                           |
| `value` _(solo lectura)_ | `string`                        | `""`        | Valor combinado de todos los slots.                                                     |

#### Métodos

| Método    | Descripción                                                               |
| :-------- | :------------------------------------------------------------------------ |
| `clear()` | Vacía todos los slots, actualiza `data-state` y mueve el foco al primero. |

#### Eventos

| Evento        | Detalle             | Cuándo se emite                                                                                 |
| :------------ | :------------------ | :---------------------------------------------------------------------------------------------- |
| `hp-change`   | `{ value: string }` | Cada vez que el valor de cualquier slot cambia (escritura, borrado, pegado).                    |
| `hp-complete` | `{ value: string }` | Cuando todos los slots quedan rellenos con exactamente un carácter (`value.length === length`). |

#### Estados ARIA del elemento raíz

| Atributo            | Valores                         | Descripción                                                |
| :------------------ | :------------------------------ | :--------------------------------------------------------- |
| `role`              | `"group"`                       | Agrupa semánticamente los inputs de PIN como unidad.       |
| `aria-label`        | `string`                        | `"PIN input"` por defecto; personalizable con el atributo. |
| `aria-disabled`     | `"true"` \| `"false"`           | Sincronizado automáticamente con la propiedad `disabled`.  |
| `data-hp-component` | `"pin-input"`                   | Identificador del componente. Siempre presente.            |
| `data-state`        | `"complete"` \| `"incomplete"`  | Refleja si todos los slots están rellenos.                 |
| `data-type`         | `"numeric"` \| `"alphanumeric"` | Espejo del tipo de entrada actual.                         |

#### Estados ARIA de cada slot (`<input>`)

| Atributo       | Valor                   | Descripción                                                       |
| :------------- | :---------------------- | :---------------------------------------------------------------- |
| `aria-label`   | `"Digit N"`             | Posición 1-based del slot para screen readers.                    |
| `maxlength`    | `1`                     | Solo acepta un carácter por slot.                                 |
| `inputmode`    | `"numeric"` \| `"text"` | Muestra el teclado adecuado en móviles según el `type` del padre. |
| `autocomplete` | `"one-time-code"`       | Activa el autocompletado OTP por SMS en dispositivos móviles.     |
| `disabled`     | booleano                | Sincronizado con la propiedad `disabled` del elemento raíz.       |

#### Selectores CSS útiles

```css
/* Estado completo */
hp-pin-input[data-state="complete"] input {
  border-color: green;
}

/* Deshabilitado */
hp-pin-input[aria-disabled="true"] input {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Slot individual por índice (0-based) */
hp-pin-input input[data-hp-pin-slot="0"] {
  /* primer slot */
}

/* Modo alfanumérico */
hp-pin-input[data-type="alphanumeric"] input {
  text-transform: uppercase;
}
```

## Comportamiento de teclado

| Tecla              | Acción                                                                             |
| :----------------- | :--------------------------------------------------------------------------------- |
| Cualquier carácter | Ingresa el carácter en el slot activo y avanza el foco al siguiente slot.          |
| `Backspace`        | Si el slot tiene valor, lo borra. Si está vacío, retrocede al anterior y lo borra. |
| `ArrowLeft`        | Mueve el foco al slot anterior.                                                    |
| `ArrowRight`       | Mueve el foco al slot siguiente.                                                   |
| `Home`             | Mueve el foco al primer slot.                                                      |
| `End`              | Mueve el foco al último slot.                                                      |
| `Ctrl+V` / Pegar   | Distribuye el texto pegado desde el slot activo hacia adelante.                    |

## API programática

```js
const pin = document.querySelector("hp-pin-input");

// Leer el valor combinado en cualquier momento
console.log(pin.value); // "1234"

// Escuchar cambios en tiempo real
pin.addEventListener("hp-change", (e) => {
  console.log("Valor actual:", e.detail.value); // "1", "12", "123", "1234"
});

// Actuar cuando el usuario completa todos los slots
pin.addEventListener("hp-complete", (e) => {
  console.log("PIN completo:", e.detail.value); // "1234"
  verificarConServidor(e.detail.value);
});

// Limpiar programáticamente (vacía slots, actualiza data-state, mueve foco al primero)
pin.clear();

// Deshabilitar/habilitar
pin.disabled = true;
pin.disabled = false;
```

## Accesibilidad

- ✅ Implementa el patrón **OTP Input Group** con `role="group"` en el contenedor raíz
- ✅ Cada slot tiene `aria-label="Digit N"` para identificar su posición a screen readers
- ✅ `autocomplete="one-time-code"` en cada slot activa el autocompletado OTP por SMS en iOS y Android
- ✅ `inputmode="numeric"` muestra el teclado numérico en dispositivos táctiles cuando `type="numeric"`
- ✅ `aria-disabled` se sincroniza automáticamente con la propiedad `disabled`
- ✅ Navegación completa por teclado: `Backspace`, `ArrowLeft/Right`, `Home`, `End`
- ✅ Foco visible en cada slot mediante `:focus` (personalizable con CSS)
- ✅ Soporte de pegado con distribución automática de caracteres

Para asociar una etiqueta externa visible al grupo:

```html
<label id="pin-label">Código de verificación</label>
<hp-pin-input aria-labelledby="pin-label" length="6" type="numeric"></hp-pin-input>
```

Para describir el propósito con texto adicional:

```html
<hp-pin-input
  aria-label="Código de verificación de 6 dígitos enviado por SMS"
  length="6"
  type="numeric"
></hp-pin-input>
```

## Theming

`hp-pin-input` expone custom properties para controlar layout y tamaño:

```css
:root {
  --hp-pin-input-slot-size: 2.75rem; /* ancho y alto de cada input */
  --hp-pin-input-font-size: 1.25rem; /* tamaño de fuente dentro del slot */
  --hp-pin-input-gap: 0.5rem; /* separación entre slots */
  --hp-pin-input-radius: 0.5rem; /* border-radius de cada slot */
}
```

Con `@headless-primitives/styles`, los tokens `--hp-border`, `--hp-surface`, `--hp-accent` y `--hp-color-success` ya están definidos con soporte automático para dark mode.
