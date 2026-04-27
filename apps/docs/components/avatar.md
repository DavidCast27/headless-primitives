# Avatar <span class="hp-badge">Nuevo</span>

El componente `hp-avatar` gestiona la representación visual de un usuario o entidad. Maneja automáticamente la carga de imágenes, errores de red y estados de carga mediante fallbacks inteligentes.

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-avatar` usando únicamente `@headless-primitives/utils/base.css`. La gestión de carga, error y fallback funcionan completamente.

<div class="hp-demo-card">
  <hp-avatar>
    <hp-avatar-image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop" alt="User"></hp-avatar-image>
    <hp-avatar-fallback>JD</hp-avatar-fallback>
  </hp-avatar>
  <hp-avatar>
    <hp-avatar-image src="broken.jpg" alt="Error"></hp-avatar-image>
    <hp-avatar-fallback>ER</hp-avatar-fallback>
  </hp-avatar>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <div class="demo-av-grid">
    <div class="demo-av-col">
      <hp-avatar>
        <hp-avatar-image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop" alt="User Image"></hp-avatar-image>
        <hp-avatar-fallback>JD</hp-avatar-fallback>
      </hp-avatar>
      <span class="demo-av-label">Éxito</span>
    </div>
    <div class="demo-av-col">
      <hp-avatar>
        <hp-avatar-image src="invalid.jpg" alt="Broken Image"></hp-avatar-image>
        <hp-avatar-fallback>ER</hp-avatar-fallback>
      </hp-avatar>
      <span class="demo-av-label">Error</span>
    </div>
  </div>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-avatar delay="600" class="my-avatar">
  <hp-avatar-image src="user.jpg" alt="Avatar"></hp-avatar-image>
  <hp-avatar-fallback class="my-fallback">JD</hp-avatar-fallback>
</hp-avatar>
```

```css [style.css]
.my-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
}

.my-avatar hp-avatar-image {
  display: none;
}

.my-avatar[data-state="loaded"] hp-avatar-image {
  display: block;
}

.my-avatar[data-state="loaded"] .my-fallback {
  display: none;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-avatar delay="600" class="w-12 h-12 rounded-full overflow-hidden group">
  <hp-avatar-image
    src="user.jpg"
    alt="Avatar"
    class="hidden group-data-[state=loaded]:block w-full h-full object-cover"
  ></hp-avatar-image>
  <hp-avatar-fallback
    class="flex items-center justify-center w-full h-full bg-gray-100 group-data-[state=loaded]:hidden"
  >
    JD
  </hp-avatar-fallback>
</hp-avatar>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/avatar
```

```bash [npm]
npm install @headless-primitives/avatar
```

```bash [yarn]
yarn add @headless-primitives/avatar
```

```bash [bun]
bun add @headless-primitives/avatar
```

:::

## Features

- 🖼️ Gestión automática de estados de carga (`loading`, `loaded`, `error`).
- ♿️ `role="img"` gestionado automáticamente.
- 🎨 Sin estilos visuales (Headless).
- ⏱️ Delay configurable antes de mostrar el fallback (evita parpadeos).
- 🔄 Fallback automático cuando la imagen falla.

## Anatomía

```html
<hp-avatar>
  <hp-avatar-image src="..." alt=""></hp-avatar-image>
  <hp-avatar-fallback>AB</hp-avatar-fallback>
</hp-avatar>
```

## API Reference

### `hp-avatar`

Contenedor raíz que coordina imagen y fallback.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo     | Por Defecto | Descripción                                                   |
| -------------------- | -------- | ----------- | ------------------------------------------------------------- |
| `delay`              | `number` | `0`         | Retraso en ms antes de mostrar el fallback (evita parpadeos). |

#### Eventos

| Evento            | Detalle                                       | Descripción                                |
| ----------------- | --------------------------------------------- | ------------------------------------------ |
| `hp-state-change` | `{ state: "loading" \| "loaded" \| "error" }` | Se emite cuando cambia el estado de carga. |

#### Métodos

| Método                   | Descripción                                                |
| ------------------------ | ---------------------------------------------------------- |
| `setImageStatus(status)` | Actualiza manualmente el estado (`"loaded"` \| `"error"`). |

#### Atributos ARIA gestionados automáticamente

- `role="img"` — Asignado si no se especifica.
- `data-state` — `"loading"` | `"loaded"` | `"error"`.

#### Variables CSS

| Variable                       | Descripción                                                        |
| ------------------------------ | ------------------------------------------------------------------ |
| `--hp-avatar-fallback-opacity` | Opacidad del fallback (`0`–`1`). Se ajusta según `delay` y estado. |

### `hp-avatar-image`

Inserta un `<img>` interno y notifica al `hp-avatar` padre.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo     | Por Defecto | Descripción        |
| -------------------- | -------- | ----------- | ------------------ |
| `src`                | `string` | `""`        | URL de la imagen.  |
| `alt`                | `string` | `""`        | Texto alternativo. |

### `hp-avatar-fallback`

Contenido visible durante la carga o si la imagen falla.

## Accesibilidad

- **Semántica**: `role="img"` en el contenedor raíz.
- **Fallback**: Siempre hay una representación visual válida.
- **Texto Alternativo**: Se traspasa al atributo `alt` de la imagen interna.
