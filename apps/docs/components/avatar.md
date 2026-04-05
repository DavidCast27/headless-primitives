# Avatar

<span class="hp-badge">Nuevo</span>

El componente `hp-avatar` es una representación visual de un usuario o entidad. Gestiona automáticamente la carga de imágenes, errores de red y estados de carga mediante fallbacks inteligentes.

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
  <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap; justify-content: center;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <hp-avatar class="demo-avatar">
        <hp-avatar-image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop" alt="User Image"></hp-avatar-image>
        <hp-avatar-fallback class="demo-fallback">JD</hp-avatar-fallback>
      </hp-avatar>
      <span style="font-size: 11px; opacity: 0.7;">Éxito</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <hp-avatar class="demo-avatar">
        <hp-avatar-image src="invalid.jpg" alt="Broken Image"></hp-avatar-image>
        <hp-avatar-fallback class="demo-fallback">ER</hp-avatar-fallback>
      </hp-avatar>
      <span style="font-size: 11px; opacity: 0.7;">Error</span>
    </div>
  </div>
</div>

<style>
.demo-avatar {
  display: inline-flex;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--vp-c-bg-mute);
  border: 2px solid var(--vp-c-divider);
}
.demo-avatar hp-avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: none;
}
.demo-avatar[data-state="loaded"] hp-avatar-image {
  display: block;
}
.demo-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand-1);
  color: white;
  font-weight: 600;
}
.demo-avatar[data-state="loaded"] .demo-fallback {
  display: none;
}
</style>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-avatar delay="600" class="my-avatar">
  <hp-avatar-image src="user.jpg" alt="Avatar" />
  <hp-avatar-fallback class="my-fallback"> JD </hp-avatar-fallback>
</hp-avatar>
```

```css [style.css]
.my-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
}

/* Ocultar imagen hasta que cargue */
.my-avatar hp-avatar-image {
  display: none;
}

.my-avatar[data-state="loaded"] hp-avatar-image {
  display: block;
}

/* Ocultar fallback cuando cargue la imagen */
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
  />
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

## Anatomía

El raíz orquesta los estados y aporta `role="img"`. La imagen y el fallback son sub-etiquetas dentro del mismo árbol.

```html
<hp-avatar>
  <!-- Imagen que se intenta cargar -->
  <hp-avatar-image src="..." alt=""></hp-avatar-image>
  <!-- Visible en carga o error (según delay / estado) -->
  <hp-avatar-fallback>AB</hp-avatar-fallback>
</hp-avatar>
```

## API Reference

### `hp-avatar`

Contenedor raíz: aplica `role="img"`, coordina imagen y fallback, refleja el estado de carga y controla la opacidad del fallback vía CSS.

#### Atributos

| Atributo | Tipo     | Por defecto | Descripción                                                                                                              |
| :------- | :------- | :---------- | :----------------------------------------------------------------------------------------------------------------------- |
| `delay`  | `number` | `0`         | Retraso en ms antes de mostrar el fallback (evita parpadeos). Usa la variable `--hp-avatar-fallback-opacity` en el host. |
| `role`   | `string` | `"img"`     | Si no se define, se asigna `img`.                                                                                        |

#### Estados (`data-*`)

| Atributo     | Valores                            | Descripción                                                                                   |
| :----------- | :--------------------------------- | :-------------------------------------------------------------------------------------------- |
| `data-state` | `"loading" \| "loaded" \| "error"` | Estado actual de la carga de la imagen (lo actualiza el raíz al notificar `hp-avatar-image`). |

#### Variables CSS (en el host)

| Variable                       | Descripción                                                                   |
| :----------------------------- | :---------------------------------------------------------------------------- |
| `--hp-avatar-fallback-opacity` | Opacidad del fallback (`0`–`1`); el raíz la ajusta según `delay` y el estado. |

#### Eventos

| Evento            | Detalle                                       | Descripción                                            |
| :---------------- | :-------------------------------------------- | :----------------------------------------------------- |
| `hp-state-change` | `{ state: "loading" \| "loaded" \| "error" }` | Se emite cuando cambia `data-state` (`bubbles: true`). |

### `hp-avatar-image`

Inserta un `<img>` interno y notifica al ancestro `hp-avatar` cuando la carga termina o falla.

#### Atributos

| Atributo | Tipo     | Por defecto | Descripción                                                      |
| :------- | :------- | :---------- | :--------------------------------------------------------------- |
| `src`    | `string` | `""`        | URL de la imagen; observado y sincronizado con el `img` interno. |
| `alt`    | `string` | `""`        | Texto alternativo del `img` interno.                             |

### `hp-avatar-fallback`

Contenido mostrado mientras carga o si la imagen falla; suele enlazarse visualmente a `--hp-avatar-fallback-opacity`.

#### Atributos

Ninguno observado por el primitivo. El contenido es el light DOM del elemento (texto o hijos).

## Accesibilidad

- **Semántica**: El componente raíz actúa como una imagen consolidada (`role="img"`).
- **Fallback**: Asegura que siempre haya una representación visual válida del usuario.
- **Texto Alternativo**: Traspasa la importancia semántica al atributo `alt` de la imagen interna.
