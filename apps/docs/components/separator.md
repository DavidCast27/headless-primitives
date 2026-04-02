# Separator

<span class="hp-badge">Nuevo</span>

El componente `hp-separator` provee una división visual y semántica entre grupos de contenido, siguiendo el patrón de accesibilidad `role="separator"`.

## Instalación

```bash
pnpm add @headless-primitives/separator
```

## Demostración

<div class="hp-demo-card">
  <div style="width: 100%; max-width: 300px;">
    <p style="margin-bottom: 8px; font-weight: 500;">Opciones de cuenta</p>
    <hp-separator class="demo-separator-h"></hp-separator>
    <div style="display: flex; align-items: center; gap: 12px; margin-top: 12px; height: 20px;">
      <span>Perfil</span>
      <hp-separator orientation="vertical" class="demo-separator-v"></hp-separator>
      <span>Ajustes</span>
      <hp-separator orientation="vertical" class="demo-separator-v"></hp-separator>
      <span>Salir</span>
    </div>
  </div>
</div>

<style>
.demo-separator-h {
  display: block;
  height: 1px;
  width: 100%;
  background: var(--vp-c-divider);
}
.demo-separator-v {
  display: inline-block;
  width: 1px;
  height: 100%;
  background: var(--vp-c-divider);
}
</style>

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

## Anatomía

Un único elemento: orientación horizontal por defecto y `aria-orientation` acorde al atributo `orientation`.

```html
<hp-separator />
```

## API Reference

### `hp-separator`

#### Atributos

| Atributo      | Tipo                           | Por defecto    | Descripción                                                                          |
| :------------ | :----------------------------- | :------------- | :----------------------------------------------------------------------------------- |
| `orientation` | `"horizontal"` \| `"vertical"` | `"horizontal"` | Orientación del separador; cualquier otro valor se trata como horizontal. Observado. |
| `role`        | `string`                       | `"separator"`  | Si no se indica, se asigna `separator`.                                              |

#### Propiedades

| Propiedad     | Tipo                           | Descripción                                           |
| :------------ | :----------------------------- | :---------------------------------------------------- |
| `orientation` | `"horizontal"` \| `"vertical"` | Getter/setter alineado con el atributo `orientation`. |

#### ARIA (gestionado por el primitivo)

| Atributo           | Descripción                                        |
| :----------------- | :------------------------------------------------- |
| `aria-orientation` | `"horizontal"` u `"vertical"` según `orientation`. |

## Accesibilidad

`hp-separator` usa el rol **separator** y **aria-orientation** según el eje. Para separadores puramente decorativos, la guía WAI-ARIA suele recomendar no exponerlos como separador semántico; en ese caso el autor puede sobreescribir `role` en el markup o usar otro elemento, porque este primitivo **no** incluye un atributo `decorative` automático.
