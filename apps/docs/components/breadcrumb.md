# Breadcrumb <span class="hp-badge">Nuevo</span>

El componente `hp-breadcrumb` implementa el patrón [WAI-ARIA Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/), proporcionando una estructura de navegación accesible con soporte para separadores, elipsis y página actual.

## Demostración

### Sin estilos (solo base.css)

<div class="hp-demo-card">
  <hp-breadcrumb>
    <hp-breadcrumb-list style="display: flex; list-style: none; padding: 0; margin: 0; gap: 0.5rem; align-items: center;">
      <hp-breadcrumb-item style="display: flex; align-items: center; gap: 0.5rem;">
        <hp-breadcrumb-link href="/">Inicio</hp-breadcrumb-link>
        <hp-breadcrumb-separator>/</hp-breadcrumb-separator>
      </hp-breadcrumb-item>
      <hp-breadcrumb-item style="display: flex; align-items: center; gap: 0.5rem;">
        <hp-breadcrumb-link href="/componentes">Componentes</hp-breadcrumb-link>
        <hp-breadcrumb-separator>/</hp-breadcrumb-separator>
      </hp-breadcrumb-item>
      <hp-breadcrumb-item>
        <hp-breadcrumb-page>Breadcrumb</hp-breadcrumb-page>
      </hp-breadcrumb-item>
    </hp-breadcrumb-list>
  </hp-breadcrumb>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-breadcrumb class="demo-breadcrumb">
    <hp-breadcrumb-list class="demo-list">
      <hp-breadcrumb-item class="demo-item">
        <hp-breadcrumb-link href="/" class="demo-link">Inicio</hp-breadcrumb-link>
        <hp-breadcrumb-separator class="demo-separator">/</hp-breadcrumb-separator>
      </hp-breadcrumb-item>
      <hp-breadcrumb-item class="demo-item">
        <hp-breadcrumb-link href="/componentes" class="demo-link">Componentes</hp-breadcrumb-link>
        <hp-breadcrumb-separator class="demo-separator">/</hp-breadcrumb-separator>
      </hp-breadcrumb-item>
      <hp-breadcrumb-item class="demo-item">
        <hp-breadcrumb-ellipsis class="demo-ellipsis">...</hp-breadcrumb-ellipsis>
        <hp-breadcrumb-separator class="demo-separator">/</hp-breadcrumb-separator>
      </hp-breadcrumb-item>
      <hp-breadcrumb-item class="demo-item">
        <hp-breadcrumb-page class="demo-page">Breadcrumb</hp-breadcrumb-page>
      </hp-breadcrumb-item>
    </hp-breadcrumb-list>
  </hp-breadcrumb>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-breadcrumb class="breadcrumb">
  <hp-breadcrumb-list class="breadcrumb-list">
    <hp-breadcrumb-item class="breadcrumb-item">
      <hp-breadcrumb-link href="/" class="link">Home</hp-breadcrumb-link>
      <hp-breadcrumb-separator class="separator">/</hp-breadcrumb-separator>
    </hp-breadcrumb-item>
    <hp-breadcrumb-item class="breadcrumb-item">
      <hp-breadcrumb-page class="page">Breadcrumb</hp-breadcrumb-page>
    </hp-breadcrumb-item>
  </hp-breadcrumb-list>
</hp-breadcrumb>
```

```css [style.css]
.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.link {
  color: #2563eb;
  text-decoration: none;
}
.page {
  color: #64748b;
  font-weight: 500;
}
.separator {
  color: #94a3b8;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-breadcrumb>
  <hp-breadcrumb-list class="flex items-center gap-2">
    <hp-breadcrumb-item class="flex items-center gap-2">
      <hp-breadcrumb-link href="/" class="text-blue-600 hover:underline">Home</hp-breadcrumb-link>
      <hp-breadcrumb-separator class="text-gray-400">/</hp-breadcrumb-separator>
    </hp-breadcrumb-item>
    <hp-breadcrumb-item>
      <hp-breadcrumb-page class="text-gray-500 font-medium">Breadcrumb</hp-breadcrumb-page>
    </hp-breadcrumb-item>
  </hp-breadcrumb-list>
</hp-breadcrumb>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/breadcrumb
```

```bash [npm]
npm install @headless-primitives/breadcrumb
```

```bash [yarn]
yarn add @headless-primitives/breadcrumb
```

```bash [bun]
bun add @headless-primitives/breadcrumb
```

:::

## Features

- ♿️ `role="navigation"`, `aria-label` y `aria-current="page"` gestionados automáticamente.
- ⌨️ Navegación por teclado con `Enter` y `Space` en los links.
- 🎨 Sin estilos visuales (Headless).
- 📐 Soporte para separadores decorativos y elipsis colapsables.

## Anatomía

```html
<hp-breadcrumb>
  <hp-breadcrumb-list>
    <hp-breadcrumb-item>
      <hp-breadcrumb-link href="/"></hp-breadcrumb-link>
      <hp-breadcrumb-separator>/</hp-breadcrumb-separator>
    </hp-breadcrumb-item>
    <hp-breadcrumb-item>
      <hp-breadcrumb-ellipsis>...</hp-breadcrumb-ellipsis>
      <hp-breadcrumb-separator>/</hp-breadcrumb-separator>
    </hp-breadcrumb-item>
    <hp-breadcrumb-item>
      <hp-breadcrumb-page></hp-breadcrumb-page>
    </hp-breadcrumb-item>
  </hp-breadcrumb-list>
</hp-breadcrumb>
```

## API Reference

### `hp-breadcrumb`

Contenedor principal con semántica de navegación.

#### Atributos / Propiedades

| Atributo / Propiedad   | Tipo     | Por Defecto    | Descripción                              |
| ---------------------- | -------- | -------------- | ---------------------------------------- |
| `aria-label` / `label` | `string` | `"Breadcrumb"` | Etiqueta de accesibilidad para el `nav`. |

#### Atributos ARIA gestionados automáticamente

- `role="navigation"` — Asignado si no se especifica.
- `aria-label` — Sincronizado con la propiedad `label`.

### `hp-breadcrumb-list`

Contenedor de lista para los items.

### `hp-breadcrumb-item`

Wrapper de cada item del breadcrumb.

### `hp-breadcrumb-link`

Enlace de navegación.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo     | Por Defecto | Descripción     |
| -------------------- | -------- | ----------- | --------------- |
| `href`               | `string` | `""`        | URL del enlace. |

#### Eventos

| Evento     | Detalle            | Descripción                         |
| ---------- | ------------------ | ----------------------------------- |
| `hp-click` | `{ href: string }` | Se emite al hacer click en el link. |

#### Atributos ARIA gestionados automáticamente

- `role="link"` — Asignado si no se especifica.
- `tabindex="0"` — Habilitado cuando tiene `href`.

### `hp-breadcrumb-page`

Página actual en el breadcrumb.

#### Atributos ARIA gestionados automáticamente

- `role="link"` — Asignado si no se especifica.
- `aria-current="page"` — Siempre presente.

### `hp-breadcrumb-separator`

Separador decorativo entre items.

#### Atributos ARIA gestionados automáticamente

- `aria-hidden="true"` — Oculto para screen readers.
- `role="presentation"` — Semánticamente decorativo.

### `hp-breadcrumb-ellipsis`

Indicador de estado colapsado.

#### Atributos ARIA gestionados automáticamente

- `aria-hidden="true"` — Oculto para screen readers.
- `role="presentation"` — Semánticamente decorativo.

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/).

### Navegación por teclado

| Tecla   | Acción                         |
| ------- | ------------------------------ |
| `Enter` | Activa el link bajo foco.      |
| `Space` | Activa el link bajo foco.      |
| `Tab`   | Navega entre links focusables. |

<style>
.demo-breadcrumb {
  font-family: var(--vp-font-family-base);
}
.demo-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.demo-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.demo-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-size: 14px;
}
.demo-link:hover {
  text-decoration: underline;
}
.demo-page {
  color: var(--vp-c-text-2);
  font-weight: 500;
  font-size: 14px;
}
.demo-separator {
  color: var(--vp-c-divider);
  font-size: 14px;
}
.demo-ellipsis {
  color: var(--vp-c-text-3);
  font-size: 14px;
}
</style>
