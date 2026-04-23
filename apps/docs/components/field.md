# Field <span class="hp-badge">Nuevo</span>

El componente `hp-field` orquesta automáticamente la accesibilidad entre etiquetas, descripciones, mensajes de error y controles de formulario. Genera IDs únicos y vincula `aria-labelledby`, `aria-describedby` y `for` sin intervención manual.

## Demostración

### Sin estilos (solo base.css)

<div class="hp-demo-card">
  <hp-field>
    <hp-field-label>Email</hp-field-label>
    <hp-field-description>No enviamos spam.</hp-field-description>
    <hp-field-control><input type="email" placeholder="tu@email.com" /></hp-field-control>
    <hp-field-error>Email inválido.</hp-field-error>
  </hp-field>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <div style="width: 100%; max-width: 320px;">
    <hp-field>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <hp-field-label style="font-weight: 600; font-size: 0.9rem;">Nombre de Usuario</hp-field-label>
        <hp-field-description style="font-size: 0.8rem; opacity: 0.7;">Este es el nombre público en tu perfil.</hp-field-description>
        <hp-field-control>
          <input type="text" placeholder="Ej: david_c" style="width: 100%; padding: 8px; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg);">
        </hp-field-control>
        <hp-field-error style="font-size: 0.8rem; color: #ff4d4d;">El nombre ya está en uso.</hp-field-error>
      </div>
    </hp-field>
  </div>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-field class="field-container">
  <hp-field-label>Email</hp-field-label>
  <hp-field-description>No enviamos spam.</hp-field-description>
  <hp-field-control>
    <input type="email" />
  </hp-field-control>
  <hp-field-error>Email inválido.</hp-field-error>
</hp-field>
```

```css [style.css]
.field-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

hp-field-label {
  font-weight: bold;
}
hp-field-description {
  font-size: 12px;
  color: gray;
}
hp-field-error {
  color: red;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-field class="flex flex-col gap-1">
  <hp-field-label class="font-bold">Email</hp-field-label>
  <hp-field-description class="text-xs text-gray-500">No enviamos spam.</hp-field-description>
  <hp-field-control>
    <input
      type="email"
      class="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </hp-field-control>
  <hp-field-error class="text-sm text-red-500">Email inválido.</hp-field-error>
</hp-field>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/field
```

```bash [npm]
npm install @headless-primitives/field
```

```bash [yarn]
yarn add @headless-primitives/field
```

```bash [bun]
bun add @headless-primitives/field
```

:::

## Features

- ♿️ `aria-labelledby`, `aria-describedby` y `for` gestionados automáticamente.
- 🔗 Contexto por proximidad — los sub-componentes coordinan IDs con el `hp-field` ancestro.
- 🎨 Sin estilos visuales (Headless).
- 📋 Soporte para label, description, error y control.

## Anatomía

```html
<hp-field>
  <hp-field-label></hp-field-label>
  <hp-field-description></hp-field-description>
  <hp-field-control>
    <input type="text" />
  </hp-field-control>
  <hp-field-error></hp-field-error>
</hp-field>
```

## API Reference

### `hp-field`

Contenedor raíz que genera un `baseId` estable para coordinar IDs.

#### Propiedades de solo lectura

| Propiedad | Tipo     | Descripción                                                    |
| --------- | -------- | -------------------------------------------------------------- |
| `baseId`  | `string` | Prefijo único para IDs de label, control, descripción y error. |

#### Atributos ARIA gestionados automáticamente

- `role="group"` — Asignado si no se especifica.

### `hp-field-label`

Label accesible para el control.

#### Atributos gestionados automáticamente

- `for` — Apunta a `{baseId}-control` si no se especifica.
- `id` — Se asigna `{baseId}-label` si no se especifica.

### `hp-field-description`

Descripción del campo.

#### Atributos gestionados automáticamente

- `id` — Se asigna `{baseId}-description`. Incluido en `aria-describedby` del control.

### `hp-field-error`

Mensaje de error del campo.

#### Atributos ARIA gestionados automáticamente

- `role="alert"` — Asignado si no se especifica.
- `id` — Se asigna `{baseId}-error`. Incluido en `aria-describedby` del control.

### `hp-field-control`

Wrapper del control real. Inyecta `id`, `aria-labelledby` y `aria-describedby` automáticamente.

## Accesibilidad

`hp-field` garantiza vinculación semántica automática entre label, description, error y control, cumpliendo los estándares WAI-ARIA para Labels and Descriptions.
