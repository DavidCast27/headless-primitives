# Breadcrumb

<span class="hp-badge">Nuevo</span>

El componente `hp-breadcrumb` es un primitivo que implementa el patrón WAI-ARIA Breadcrumb, ayudando a los usuarios a seguir su ubicación dentro de un sitio web. Proporciona una estructura accesible con navegación por teclado y soporte para separadores y elipsis.

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

## Anatomía

El componente Breadcrumb sigue una estructura anidada para establecer la navegación:

```html
<hp-breadcrumb>
  <hp-breadcrumb-list>
    <hp-breadcrumb-item>
      <hp-breadcrumb-link href="/">Inicio</hp-breadcrumb-link>
      <hp-breadcrumb-separator>/</hp-breadcrumb-separator>
    </hp-breadcrumb-item>
    <hp-breadcrumb-item>
      <hp-breadcrumb-ellipsis>...</hp-breadcrumb-ellipsis>
      <hp-breadcrumb-separator>/</hp-breadcrumb-separator>
    </hp-breadcrumb-item>
    <hp-breadcrumb-item>
      <hp-breadcrumb-page>Actual</hp-breadcrumb-page>
    </hp-breadcrumb-item>
  </hp-breadcrumb-list>
</hp-breadcrumb>
```

## API Reference

### `hp-breadcrumb`

Contenedor principal que actúa como un elemento de navegación.

#### Atributos

| Atributo     | Tipo     | Por defecto  | Descripción                              |
| :----------- | :------- | :----------- | :--------------------------------------- |
| `aria-label` | _string_ | "Breadcrumb" | Etiqueta de accesibilidad para el `nav`. |

#### Propiedades

| Propiedad | Tipo     | Descripción                               |
| :-------- | :------- | :---------------------------------------- |
| `label`   | `string` | Obtiene o establece el `aria-label` (nav) |

### `hp-breadcrumb-link`

Enlace de navegación dentro del breadcrumb.

#### Atributos

| Atributo | Tipo     | Descripción                    |
| :------- | :------- | :----------------------------- |
| `href`   | _string_ | URL a la que apunta el enlace. |

### `hp-breadcrumb-page`

Representa la página actual en el breadcrumb.

#### Atributos ARIA gestionados

- `role="link"` - Asignado automáticamente
- `aria-current="page"` - Indica que es el elemento actual

### `hp-breadcrumb-separator`

Elemento decorativo entre items.

#### Atributos ARIA gestionados

- `aria-hidden="true"` - Oculto para screen readers
- `role="presentation"` - Semánticamente decorativo

### `hp-breadcrumb-ellipsis`

Representa un estado colapsado.

#### Atributos ARIA gestionados

- `aria-hidden="true"`
- `role="presentation"`

## Accesibilidad

`hp-breadcrumb` implementa el patrón **WAI-ARIA Breadcrumb**:

- **Navegación**: Utiliza `role="navigation"` y `aria-label` para identificar el área.
- **Página Actual**: Identifica el último elemento con `aria-current="page"`.
- **Separadores**: Oculta los separadores visuales mediante `aria-hidden="true"`.
- **Keyboard**: Soporta navegación por teclado estándar para enlaces.
