# Fieldset <span class="hp-badge">Nuevo</span>

El componente `hp-fieldset` agrupa controles de formulario relacionados con una leyenda accesible, análogo al `<fieldset>/<legend>` nativo. Propaga `disabled` a todos los controles hijos (nativos y ARIA), preservando el estado previo de cada uno.

## Demostración

### Sin estilos (solo base.css)

<div class="hp-demo-card">
  <hp-fieldset id="demo-fieldset">
    <hp-fieldset-legend>Información de contacto</hp-fieldset-legend>
    <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
      <input type="text" placeholder="Nombre completo" style="padding: 6px 10px; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg); color: var(--vp-c-text-1);" />
      <input type="email" placeholder="correo@ejemplo.com" style="padding: 6px 10px; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg); color: var(--vp-c-text-1);" />
      <button style="padding: 6px 14px; border: 1px solid var(--vp-c-brand-1); border-radius: 6px; background: var(--vp-c-brand-1); color: #fff; cursor: pointer;">Enviar</button>
    </div>
  </hp-fieldset>
  <button id="toggle-disabled-btn" style="margin-top: 12px; padding: 6px 14px; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg); color: var(--vp-c-text-1); cursor: pointer;">Deshabilitar grupo</button>
</div>

<script>
(function () {
  const btn = document.getElementById("toggle-disabled-btn");
  const fs = document.getElementById("demo-fieldset");
  if (btn && fs) {
    btn.addEventListener("click", function () {
      fs.disabled = !fs.disabled;
      btn.textContent = fs.disabled ? "Habilitar grupo" : "Deshabilitar grupo";
    });
  }
})();
</script>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-fieldset class="contact-group">
  <hp-fieldset-legend>Información de contacto</hp-fieldset-legend>
  <div class="fields">
    <input type="text" placeholder="Nombre completo" />
    <input type="email" placeholder="correo@ejemplo.com" />
    <button type="submit">Enviar</button>
  </div>
</hp-fieldset>

<button id="toggle">Deshabilitar grupo</button>

<script>
  const btn = document.getElementById("toggle");
  const fs = document.querySelector("hp-fieldset");
  btn.addEventListener("click", () => {
    fs.disabled = !fs.disabled;
    btn.textContent = fs.disabled ? "Habilitar grupo" : "Deshabilitar grupo";
  });
</script>
```

```css [style.css]
.contact-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

hp-fieldset[data-state="disabled"] {
  opacity: 0.5;
  pointer-events: none;
}

hp-fieldset-legend {
  font-weight: 600;
  font-size: 0.9rem;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-fieldset id="contact-group" class="flex flex-col gap-1 p-4 border border-gray-200 rounded-lg">
  <hp-fieldset-legend class="font-semibold text-sm">Información de contacto</hp-fieldset-legend>
  <div class="flex flex-col gap-2 mt-2">
    <input type="text" placeholder="Nombre completo" class="border rounded px-3 py-2" />
    <input type="email" placeholder="correo@ejemplo.com" class="border rounded px-3 py-2" />
    <button type="submit" class="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
      Enviar
    </button>
  </div>
</hp-fieldset>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/fieldset
```

```bash [npm]
npm install @headless-primitives/fieldset
```

```bash [yarn]
yarn add @headless-primitives/fieldset
```

```bash [bun]
bun add @headless-primitives/fieldset
```

:::

## Features

- ♿️ `role="group"`, `aria-disabled` y `aria-labelledby` gestionados automáticamente.
- 🔒 Propagación inteligente de `disabled` a controles nativos e interactivos.
- 🎨 Sin estilos visuales (Headless).
- 🔄 Eventos `hp-disable` / `hp-enable` en cada transición de estado.

## Anatomía

```html
<hp-fieldset>
  <hp-fieldset-legend></hp-fieldset-legend>
  <!-- controles de formulario -->
</hp-fieldset>
```

## API Reference

### `hp-fieldset`

Contenedor raíz con `role="group"` y propagación de `disabled`.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción                                                                |
| -------------------- | --------- | ----------- | -------------------------------------------------------------------------- |
| `disabled`           | `boolean` | `false`     | Propaga `disabled` a controles nativos y `aria-disabled` a controles ARIA. |

#### Propiedades de solo lectura

| Propiedad | Tipo     | Descripción                   |
| --------- | -------- | ----------------------------- |
| `baseId`  | `string` | Prefijo único para IDs hijos. |

#### Eventos

| Evento       | Detalle | Descripción                                        |
| ------------ | ------- | -------------------------------------------------- |
| `hp-disable` | —       | Cuando `disabled` transiciona de `false` a `true`. |
| `hp-enable`  | —       | Cuando `disabled` transiciona de `true` a `false`. |

#### Atributos ARIA gestionados automáticamente

- `role="group"` — Asignado si no se especifica.
- `aria-disabled` — Sincronizado con `disabled`.
- `data-state` — `"disabled"` | `"enabled"`.
- `aria-labelledby` — Asignado por `hp-fieldset-legend`.

### `hp-fieldset-legend`

Leyenda accesible del grupo.

#### Atributos gestionados automáticamente

- `id` — Se asigna `{baseId}-legend` si no se especifica.

## Accesibilidad

Adhiere al patrón WAI-ARIA `group`. La propagación de `disabled` respeta el estado preexistente de cada control: si un control ya estaba deshabilitado antes, permanecerá deshabilitado al re-habilitar el fieldset.

<style>
hp-fieldset,
hp-fieldset-legend {
  display: block;
}
</style>
