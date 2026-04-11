# Fieldset

<span class="hp-badge">Nuevo</span>

El componente `hp-fieldset` implementa el patrón WAI-ARIA [`group`](https://www.w3.org/WAI/ARIA/apg/patterns/) para agrupar controles de formulario relacionados bajo una leyenda accesible. Propaga el estado `disabled` a todos los controles nativos e interactivos que contiene, análogo al elemento nativo `<fieldset>/<legend>` pero como Web Component headless sin estilos visuales.

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

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-fieldset` usando únicamente `@headless-primitives/utils/base.css`. La propagación de `disabled` a controles nativos y la vinculación `aria-labelledby` funcionan completamente.

<div class="hp-demo-card">
  <hp-fieldset id="demo-fieldset">
    <hp-fieldset-legend>Información de contacto</hp-fieldset-legend>
    <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
      <input type="text" placeholder="Nombre completo" style="padding: 6px 10px; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg); color: var(--vp-c-text-1);" />
      <input type="email" placeholder="correo@ejemplo.com" style="padding: 6px 10px; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg); color: var(--vp-c-text-1);" />
      <select style="padding: 6px 10px; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg); color: var(--vp-c-text-1);">
        <option>País</option>
        <option>México</option>
        <option>España</option>
        <option>Argentina</option>
      </select>
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
    <select>
      <option>País</option>
    </select>
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
    <input
      type="text"
      placeholder="Nombre completo"
      class="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    />
    <input
      type="email"
      placeholder="correo@ejemplo.com"
      class="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    />
    <select class="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
      <option>País</option>
    </select>
    <button type="submit" class="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
      Enviar
    </button>
  </div>
</hp-fieldset>

<button id="toggle" class="mt-3 border rounded px-4 py-2 hover:bg-gray-100">
  Deshabilitar grupo
</button>

<script>
  const btn = document.getElementById("toggle");
  const fs = document.getElementById("contact-group");
  btn.addEventListener("click", () => {
    fs.disabled = !fs.disabled;
    btn.textContent = fs.disabled ? "Habilitar grupo" : "Deshabilitar grupo";
    fs.classList.toggle("opacity-50", fs.disabled);
    fs.classList.toggle("pointer-events-none", fs.disabled);
  });
</script>
```

:::

</Flavor>

</CodeSnippet>

## Anatomía

El `hp-fieldset` raíz genera el `baseId` que la leyenda usa para coordinar `aria-labelledby` automáticamente.

```html
<hp-fieldset>
  <hp-fieldset-legend>Nombre del grupo</hp-fieldset-legend>
  <!-- controles de formulario -->
  <input type="text" />
  <input type="email" />
  <select>
    ...
  </select>
  <button>Enviar</button>
</hp-fieldset>
```

## API Reference

### `hp-fieldset`

Contenedor raíz con `role="group"`. Propaga `disabled` a todos los controles hijos y emite eventos en cada transición de estado.

#### Atributos

| Atributo   | Tipo      | Por defecto | Descripción                                                                |
| :--------- | :-------- | :---------- | :------------------------------------------------------------------------- |
| `disabled` | `boolean` | `false`     | Propaga `disabled` a controles nativos y `aria-disabled` a controles ARIA. |
| `role`     | `string`  | `"group"`   | Si no está definido al conectarse, se asigna `group`.                      |

#### Propiedades (solo lectura)

| Propiedad | Tipo     | Descripción                                                                      |
| :-------- | :------- | :------------------------------------------------------------------------------- |
| `baseId`  | `string` | Prefijo único derivado de `hpId`, usado por `hp-fieldset-legend` para IDs hijos. |

#### Eventos

| Evento       | Cuándo se emite                                    |
| :----------- | :------------------------------------------------- |
| `hp-disable` | Cuando `disabled` transiciona de `false` a `true`. |
| `hp-enable`  | Cuando `disabled` transiciona de `true` a `false`. |

#### Estados ARIA

| Atributo          | Valores                    | Descripción                                        |
| :---------------- | :------------------------- | :------------------------------------------------- |
| `data-state`      | `"disabled"` / `"enabled"` | Estado actual del fieldset, útil como hook CSS.    |
| `aria-disabled`   | `"true"` / ausente         | Estado ARIA para tecnologías asistivas.            |
| `aria-labelledby` | `string`                   | Asignado automáticamente por `hp-fieldset-legend`. |

---

### `hp-fieldset-legend`

Leyenda accesible del grupo. Al conectarse, asigna su propio `id` y establece `aria-labelledby` en el `hp-fieldset` padre.

#### Atributos

| Atributo | Tipo     | Por defecto        | Descripción                                                                     |
| :------- | :------- | :----------------- | :------------------------------------------------------------------------------ |
| `id`     | `string` | `${baseId}-legend` | Si no está presente, se asigna automáticamente derivado del `baseId` del padre. |

#### Estados ARIA

| Atributo            | Valor               | Descripción                                  |
| :------------------ | :------------------ | :------------------------------------------- |
| `data-hp-component` | `"fieldset-legend"` | Identificador de componente para selectores. |

## Accesibilidad

`hp-fieldset` implementa el patrón WAI-ARIA [`group`](https://www.w3.org/WAI/ARIA/apg/patterns/) garantizando que el grupo de controles esté correctamente etiquetado mediante `aria-labelledby`. La propagación de `disabled` respeta el estado preexistente de cada control individual: si un control ya estaba deshabilitado antes de que el fieldset se deshabilitara, permanecerá deshabilitado al re-habilitar el fieldset.

<style>
hp-fieldset,
hp-fieldset-legend {
  display: block;
}
</style>
