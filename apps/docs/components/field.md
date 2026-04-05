# Field

<span class="hp-badge">Nuevo</span>

El componente `hp-field` actúa como un orquestador que coordina automáticamente la accesibilidad entre etiquetas, descripciones, mensajes de error y controles de formulario.

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

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-field` usando únicamente `@headless-primitives/utils/base.css`. La vinculación automática de `aria-labelledby`, `aria-describedby` y `for` funciona completamente.

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
/* hp-field no impone layout, usa flexbox o stack en contenedores */
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
  <hp-field-description class="text-xs text-gray-500"> No enviamos spam. </hp-field-description>
  <hp-field-control>
    <input
      type="email"
      class="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </hp-field-control>
  <hp-field-error class="text-sm text-red-500"> Email inválido. </hp-field-error>
</hp-field>
```

:::

</Flavor>

</CodeSnippet>

## Anatomía

Ensambla las piezas en este orden; el `hp-field` raíz genera el contexto de IDs y el control recibe `id` y `aria-describedby` automáticamente.

```html
<hp-field>
  <hp-field-label>...</hp-field-label>
  <hp-field-description>...</hp-field-description>
  <hp-field-control>
    <input type="text" />
  </hp-field-control>
  <hp-field-error>...</hp-field-error>
</hp-field>
```

## ¿Cómo funciona?

`hp-field` utiliza una estrategia de **contexto por proximidad**. Los sub-componentes buscan al ancestro `hp-field` más cercano y coordinan sus IDs automáticamente:

1.  **ID del Control**: Se genera un ID único y se aplica al elemento interactivo dentro de `hp-field-control`.
2.  **Label**: El `hp-field-label` apunta automáticamente al ID del control mediante el atributo `for`.
3.  **Descripciones**: El control recibe un atributo `aria-describedby` que incluye los IDs de la descripción y el mensaje de error.

## API Reference

### `hp-field`

Agrupa las partes del campo y expone un `baseId` estable para generar IDs hijos.

#### Atributos

| Atributo | Tipo     | Por defecto | Descripción                                                    |
| :------- | :------- | :---------- | :------------------------------------------------------------- |
| `role`   | `string` | `"group"`   | Si no está definido en `connectedCallback`, se asigna `group`. |

#### Propiedades (solo lectura)

| Propiedad | Tipo     | Descripción                                                          |
| :-------- | :------- | :------------------------------------------------------------------- |
| `baseId`  | `string` | Prefijo único usado para IDs de label, control, descripción y error. |

### `hp-field-label`

#### Atributos

| Atributo | Tipo     | Por defecto | Descripción                               |
| :------- | :------- | :---------- | :---------------------------------------- |
| `for`    | `string` | auto        | Si falta, se asigna a `{baseId}-control`. |
| `id`     | `string` | auto        | Si falta, se asigna a `{baseId}-label`.   |

### `hp-field-description`

#### Atributos

| Atributo | Tipo     | Por defecto | Descripción                                                                                |
| :------- | :------- | :---------- | :----------------------------------------------------------------------------------------- |
| `id`     | `string` | auto        | Si falta, se asigna a `{baseId}-description` (incluido en `aria-describedby` del control). |

### `hp-field-error`

#### Atributos

| Atributo | Tipo     | Por defecto | Descripción                                                                          |
| :------- | :------- | :---------- | :----------------------------------------------------------------------------------- |
| `id`     | `string` | auto        | Si falta, se asigna a `{baseId}-error` (incluido en `aria-describedby` del control). |
| `role`   | `string` | `"alert"`   | Si no está definido, se asigna `alert`.                                              |

### `hp-field-control`

Envoltorio del control real (`input`, `select`, etc.). Inyecta `id`, `aria-labelledby` y `aria-describedby` en el elemento encontrado.

#### Atributos

Ninguno observado por el primitivo.

#### Comportamiento

Busca el **primer** elemento que coincida con el selector interno (`input`, `select`, `textarea`, y ciertos roles: `checkbox`, `switch`, `combobox`, `progressbar`) y le asigna `id`, `aria-labelledby` (desde `hp-field-label`) y `aria-describedby` (descripción y error). Un `MutationObserver` en el control reaplica la vinculación cuando cambian los hijos.

## Accesibilidad

`hp-field` garantiza que todos los elementos de soporte de un formulario estén correctamente vinculados semánticamente sin intervención manual del desarrollador, cumpliendo con los estándares de **WAI-ARIA Labels and Descriptions**.
