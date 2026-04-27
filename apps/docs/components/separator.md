# Separator <span class="hp-badge">Nuevo</span>

El componente `hp-separator` provee una división visual y semántica entre grupos de contenido, siguiendo el patrón `role="separator"` con `aria-orientation` gestionada automáticamente.

## Demostración

### Sin estilos (solo base.css)

<div class="hp-demo-card">
  <p>Sección A</p>
  <hp-separator></hp-separator>
  <p>Sección B</p>
  <div class="demo-sep-inline">
    <span>Uno</span><hp-separator orientation="vertical"></hp-separator><span>Dos</span>
  </div>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <div class="demo-sep-box">
    <p class="demo-sep-title">Opciones de cuenta</p>
    <hp-separator></hp-separator>
    <div class="demo-sep-inline demo-sep-inline--mt">
      <span>Perfil</span>
      <hp-separator orientation="vertical"></hp-separator>
      <span>Ajustes</span>
      <hp-separator orientation="vertical"></hp-separator>
      <span>Salir</span>
    </div>
  </div>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<!-- Horizontal (default) -->
<hp-separator class="my-sep"></hp-separator>

<!-- Vertical -->
<div style="display: flex; height: 20px;">
  <span>Uno</span>
  <hp-separator orientation="vertical" class="my-sep-v"></hp-separator>
  <span>Dos</span>
</div>
```

```css [style.css]
.my-sep {
  display: block;
  height: 1px;
  background: #eee;
  margin: 10px 0;
}

.my-sep-v {
  display: inline-block;
  width: 1px;
  height: 100%;
  background: #eee;
  margin: 0 10px;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<!-- Horizontal (default) -->
<hp-separator class="block h-px w-full bg-gray-200 my-4"></hp-separator>

<!-- Vertical -->
<div class="flex h-5 items-center space-x-4">
  <span>Uno</span>
  <hp-separator orientation="vertical" class="h-full w-px bg-gray-200"></hp-separator>
  <span>Dos</span>
</div>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/separator
```

```bash [npm]
npm install @headless-primitives/separator
```

```bash [yarn]
yarn add @headless-primitives/separator
```

```bash [bun]
bun add @headless-primitives/separator
```

:::

## Features

- ♿️ `role="separator"` y `aria-orientation` gestionados automáticamente.
- 📐 Orientación configurable: `horizontal` (default) o `vertical`.
- 🎨 Sin estilos visuales (Headless).

## Anatomía

```html
<hp-separator></hp-separator>
```

## API Reference

### `hp-separator`

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo                           | Por Defecto    | Descripción                |
| -------------------- | ------------------------------ | -------------- | -------------------------- |
| `orientation`        | `"horizontal"` \| `"vertical"` | `"horizontal"` | Orientación del separador. |

#### Métodos

| Método                  | Descripción                              |
| ----------------------- | ---------------------------------------- |
| `setOrientation(value)` | Cambia la orientación programáticamente. |

#### Atributos ARIA gestionados automáticamente

- `role="separator"` — Asignado si no se especifica.
- `aria-orientation` — Sincronizado con `orientation`.

## Accesibilidad

- `role="separator"` y `aria-orientation` sincronizados automáticamente.
- Para separadores puramente decorativos, sobreescribe `role="presentation"`.
