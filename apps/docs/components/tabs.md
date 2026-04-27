# Tabs <span class="hp-badge">Nuevo</span>

El componente `hp-tabs` implementa el patrón [WAI-ARIA Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/), permitiendo organizar contenido en pestañas accesibles con navegación por teclado completa y gestión automática de `aria-selected`.

## Demostración

### Sin estilos (solo base.css)

Así se ven las tabs usando únicamente `@headless-primitives/utils/base.css`. La navegación por teclado, `aria-selected` y la visibilidad de paneles funcionan completamente.

<div class="hp-demo-card">
  <hp-tabs value="a">
    <hp-tab-list>
      <hp-tab value="a">Tab A</hp-tab>
      <hp-tab value="b">Tab B</hp-tab>
      <hp-tab value="c" disabled>Disabled</hp-tab>
    </hp-tab-list>
    <hp-tab-panel value="a"><p>Contenido del panel A.</p></hp-tab-panel>
    <hp-tab-panel value="b"><p>Contenido del panel B.</p></hp-tab-panel>
    <hp-tab-panel value="c"><p>Contenido del panel C.</p></hp-tab-panel>
  </hp-tabs>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-tabs value="profile">
    <hp-tab-list class="demo-tab-list">
      <hp-tab value="profile" class="demo-tab-trigger">Perfil</hp-tab>
      <hp-tab value="settings" class="demo-tab-trigger">Ajustes</hp-tab>
      <hp-tab value="notifications" class="demo-tab-trigger">Notificaciones</hp-tab>
    </hp-tab-list>
    <hp-tab-panel value="profile" class="demo-tab-panel"><p>Gestiona tu información de perfil y datos personales.</p></hp-tab-panel>
    <hp-tab-panel value="settings" class="demo-tab-panel"><p>Configura las preferencias de tu aplicación.</p></hp-tab-panel>
    <hp-tab-panel value="notifications" class="demo-tab-panel"><p>Controla cómo y cuándo recibes notificaciones.</p></hp-tab-panel>
  </hp-tabs>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-tabs value="tab1" class="tabs">
  <hp-tab-list class="tab-list">
    <hp-tab value="tab1" class="tab">Tab 1</hp-tab>
    <hp-tab value="tab2" class="tab">Tab 2</hp-tab>
    <hp-tab value="tab3" class="tab">Tab 3</hp-tab>
  </hp-tab-list>
  <hp-tab-panel value="tab1" class="panel">
    <p>Contenido del Tab 1</p>
  </hp-tab-panel>
  <hp-tab-panel value="tab2" class="panel">
    <p>Contenido del Tab 2</p>
  </hp-tab-panel>
  <hp-tab-panel value="tab3" class="panel">
    <p>Contenido del Tab 3</p>
  </hp-tab-panel>
</hp-tabs>
```

```css [style.css]
.tab-list {
  display: flex;
  border-bottom: 2px solid #e2e8f0;
}

.tab {
  padding: 10px 20px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  transition: color 0.2s;
}

.tab:hover {
  color: #1e293b;
}

.tab[aria-selected="true"] {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

.tab:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
  border-radius: 4px;
}

.tab[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.panel {
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-top: none;
  border-radius: 0 0 8px 8px;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-tabs value="tab1">
  <hp-tab-list class="flex border-b-2 border-gray-200">
    <hp-tab
      value="tab1"
      class="px-5 py-2.5 border-b-2 border-transparent -mb-0.5 cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 [&[aria-selected=true]]:text-blue-600 [&[aria-selected=true]]:border-blue-600 [&[disabled]]:opacity-50 [&[disabled]]:cursor-not-allowed"
    >
      Tab 1
    </hp-tab>
    <hp-tab
      value="tab2"
      class="px-5 py-2.5 border-b-2 border-transparent -mb-0.5 cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 [&[aria-selected=true]]:text-blue-600 [&[aria-selected=true]]:border-blue-600 [&[disabled]]:opacity-50 [&[disabled]]:cursor-not-allowed"
    >
      Tab 2
    </hp-tab>
  </hp-tab-list>
  <hp-tab-panel
    value="tab1"
    class="p-4 border border-t-0 border-gray-200 rounded-b-lg [&[data-state=unselected]]:hidden"
  >
    <p class="m-0 text-gray-600">Contenido del Tab 1</p>
  </hp-tab-panel>
  <hp-tab-panel
    value="tab2"
    class="p-4 border border-t-0 border-gray-200 rounded-b-lg [&[data-state=unselected]]:hidden"
  >
    <p class="m-0 text-gray-600">Contenido del Tab 2</p>
  </hp-tab-panel>
</hp-tabs>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/tabs
```

```bash [npm]
npm install @headless-primitives/tabs
```

```bash [yarn]
yarn add @headless-primitives/tabs
```

```bash [bun]
bun add @headless-primitives/tabs
```

:::

## Features

- ⌨️ Navegación completa por teclado (flechas, Home, End).
- ♿️ Roles `tablist`, `tab` y `tabpanel` gestionados automáticamente.
- 🎨 Sin estilos visuales (Headless) — tú decides el diseño.
- ⚡️ Activación por valor (`value`) para control declarativo y programático.
- 🚫 Soporte para pestañas deshabilitadas individualmente.

## Anatomía

```html
<hp-tabs>
  <hp-tab-list>
    <hp-tab></hp-tab>
  </hp-tab-list>
  <hp-tab-panel></hp-tab-panel>
</hp-tabs>
```

## API Reference

### `hp-tabs`

Elemento raíz que coordina el estado entre tabs y panels.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo     | Por Defecto     | Descripción                                                            |
| -------------------- | -------- | --------------- | ---------------------------------------------------------------------- |
| `value`              | `string` | primera pestaña | Valor de la pestaña activa. Si no se especifica, se activa la primera. |

#### Eventos

| Evento      | Detalle             | Descripción                                 |
| ----------- | ------------------- | ------------------------------------------- |
| `hp-change` | `{ value: string }` | Se dispara cuando cambia la pestaña activa. |

#### Métodos

| Método                   | Descripción                                            |
| ------------------------ | ------------------------------------------------------ |
| `activateByValue(value)` | Activa la pestaña con el valor dado programáticamente. |

### `hp-tab-list`

Contenedor de los triggers. Gestiona la navegación por teclado.

#### Atributos ARIA gestionados automáticamente

- `role="tablist"` — Asignado automáticamente.

### `hp-tab`

Trigger individual de una pestaña.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción                        |
| -------------------- | --------- | ----------- | ---------------------------------- |
| `value`              | `string`  | —           | Identificador único de la pestaña. |
| `disabled`           | `boolean` | `false`     | Deshabilita la pestaña.            |

#### Atributos ARIA gestionados automáticamente

- `role="tab"` — Asignado automáticamente.
- `aria-selected` — `"true"` / `"false"` según estado activo.
- `aria-disabled` — Sincronizado con `disabled`.
- `tabindex` — `"0"` (activa) / `"-1"` (inactiva).
- `data-state` — `"selected"` / `"unselected"`.

### `hp-tab-panel`

Panel de contenido asociado a una pestaña por `value`.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo     | Por Defecto | Descripción                                          |
| -------------------- | -------- | ----------- | ---------------------------------------------------- |
| `value`              | `string` | —           | Debe coincidir con el `value` del `hp-tab` asociado. |

#### Atributos ARIA gestionados automáticamente

- `role="tabpanel"` — Asignado automáticamente.
- `tabindex="0"` — Siempre focusable.
- `data-state` — `"selected"` / `"unselected"` (para estilizado CSS).
- `aria-hidden` — `"true"` cuando no está seleccionado.
- `data-hp-panel` — Presente siempre (usado por `base.css`).

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

### Navegación por teclado

| Tecla                      | Acción                                            |
| -------------------------- | ------------------------------------------------- |
| `ArrowLeft` / `ArrowUp`    | Pestaña anterior (con wrap circular).             |
| `ArrowRight` / `ArrowDown` | Pestaña siguiente (con wrap circular).            |
| `Home`                     | Primera pestaña.                                  |
| `End`                      | Última pestaña.                                   |
| `Tab`                      | Sale del tablist al siguiente elemento enfocable. |

## Ejemplos

### Control Programático

```javascript
const tabs = document.querySelector("hp-tabs");

// Activar una pestaña
tabs.activateByValue("settings");

// Escuchar cambios
tabs.addEventListener("hp-change", (e) => {
  console.log("Pestaña activa:", e.detail.value);
});
```

### Pestaña Deshabilitada

```html
<hp-tabs value="tab1">
  <hp-tab-list>
    <hp-tab value="tab1">Activa</hp-tab>
    <hp-tab value="tab2" disabled>Deshabilitada</hp-tab>
    <hp-tab value="tab3">Otra</hp-tab>
  </hp-tab-list>
  <hp-tab-panel value="tab1"><p>Panel 1</p></hp-tab-panel>
  <hp-tab-panel value="tab2"><p>Panel 2</p></hp-tab-panel>
  <hp-tab-panel value="tab3"><p>Panel 3</p></hp-tab-panel>
</hp-tabs>
```
