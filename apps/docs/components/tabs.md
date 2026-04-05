# Tabs

<span class="hp-badge">Nuevo</span>

El componente `hp-tabs` es un primitivo que implementa el patrón WAI-ARIA Tabs, permitiendo organizar contenido en pestañas accesibles con navegación por teclado completa.

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

## Demostración

<div class="hp-demo-card">
  <hp-tabs value="profile" class="demo-tabs">
    <hp-tab-list class="demo-tab-list">
      <hp-tab value="profile" class="demo-tab">Perfil</hp-tab>
      <hp-tab value="settings" class="demo-tab">Ajustes</hp-tab>
      <hp-tab value="notifications" class="demo-tab">Notificaciones</hp-tab>
    </hp-tab-list>
    <hp-tab-panel value="profile" class="demo-panel"><p>Gestiona tu información de perfil y datos personales.</p></hp-tab-panel>
    <hp-tab-panel value="settings" class="demo-panel"><p>Configura las preferencias de tu aplicación.</p></hp-tab-panel>
    <hp-tab-panel value="notifications" class="demo-panel"><p>Controla cómo y cuándo recibes notificaciones.</p></hp-tab-panel>
  </hp-tabs>
</div>

<style>
.demo-tabs {
  width: 100%;
  max-width: 500px;
}
.demo-tab-list {
  display: flex;
  border-bottom: 2px solid var(--vp-c-divider);
  margin-bottom: 0;
}
.demo-tab {
  padding: 10px 20px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.2s;
}
.demo-tab:hover {
  color: var(--vp-c-text-1);
}
.demo-tab[aria-selected="true"] {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}
.demo-tab:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
  border-radius: 4px;
}
.demo-panel {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-top: none;
  border-radius: 0 0 8px 8px;
}
.demo-panel p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>

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

## Anatomía

```html
<hp-tabs value="tab1">
  <hp-tab-list>
    <hp-tab value="tab1">Tab 1</hp-tab>
    <hp-tab value="tab2">Tab 2</hp-tab>
  </hp-tab-list>
  <hp-tab-panel value="tab1">Contenido 1</hp-tab-panel>
  <hp-tab-panel value="tab2">Contenido 2</hp-tab-panel>
</hp-tabs>
```

## API Reference

### `hp-tabs`

Elemento raíz que coordina el estado entre tabs y panels.

#### Atributos

| Atributo | Tipo     | Por defecto | Descripción                                                            |
| :------- | :------- | :---------- | :--------------------------------------------------------------------- |
| `value`  | _string_ | —           | Valor de la pestaña activa. Si no se especifica, se activa la primera. |

#### Propiedades

| Propiedad              | Tipo             | Descripción                          |
| :--------------------- | :--------------- | :----------------------------------- |
| `value`                | `string \| null` | Valor de la pestaña activa.          |
| `activateByValue(val)` | `void`           | Activa la pestaña con el valor dado. |

#### Eventos

| Evento      | Detalle             | Descripción                                 |
| :---------- | :------------------ | :------------------------------------------ |
| `hp-change` | `{ value: string }` | Se dispara cuando cambia la pestaña activa. |

### `hp-tab-list`

Contenedor de los triggers. Gestiona la navegación por teclado.

#### Atributos ARIA gestionados

- `role="tablist"` — asignado automáticamente.

### `hp-tab`

Trigger individual de una pestaña.

#### Atributos

| Atributo   | Tipo                  | Por defecto | Descripción                        |
| :--------- | :-------------------- | :---------- | :--------------------------------- |
| `value`    | _string_              | —           | Identificador único de la pestaña. |
| `disabled` | _boolean (presencia)_ | ausente     | Deshabilita la pestaña.            |

#### Atributos ARIA gestionados

- `role="tab"`
- `aria-selected` — `true` / `false`
- `aria-disabled` — `true` / `false`
- `tabindex` — `0` (activa) / `-1` (inactiva)

### `hp-tab-panel`

Panel de contenido asociado a una pestaña por `value`.

#### Atributos

| Atributo | Tipo     | Por defecto | Descripción                                          |
| :------- | :------- | :---------- | :--------------------------------------------------- |
| `value`  | _string_ | —           | Debe coincidir con el `value` del `hp-tab` asociado. |

#### Atributos ARIA y de estado

- `role="tabpanel"`
- `tabindex="0"`
- `data-state` — `selected` / `unselected` (para estilos)

## Accesibilidad

`hp-tabs` implementa el patrón **WAI-ARIA Tabs**:

- **Navegación por teclado**: flechas direccionales, `Home`, `End`
- **Gestión de foco**: `tabindex` dinámico en tabs activos/inactivos
- **Relaciones ARIA**: `role` correcto en cada elemento
- **Estados deshabilitados**: `aria-disabled` en tabs con `disabled`

## Navegación por Teclado

| Tecla                      | Acción                       |
| :------------------------- | :--------------------------- |
| `ArrowLeft` / `ArrowUp`    | Pestaña anterior (con wrap)  |
| `ArrowRight` / `ArrowDown` | Pestaña siguiente (con wrap) |
| `Home`                     | Primera pestaña              |
| `End`                      | Última pestaña               |
| `Tab`                      | Siguiente elemento enfocable |

## Estados y Selectores

Referencia completa de atributos `data-hp-*`, estados canónicos y roles ARIA para usar con `base.css` o estilos propios.

| Parte          | `data-hp-*`                                         | `data-state`              | Rol ARIA   | Atributos ARIA                               |
| :------------- | :-------------------------------------------------- | :------------------------ | :--------- | :------------------------------------------- |
| `hp-tabs`      | `data-hp-component="tabs"`                          | —                         | —          | —                                            |
| `hp-tab-list`  | `data-hp-component="tab-list"`, `data-hp-tabs-list` | —                         | `tablist`  | —                                            |
| `hp-tab`       | `data-hp-component="tab"`, `data-hp-tabs-trigger`   | `selected` / `unselected` | `tab`      | `aria-selected`, `aria-disabled`, `tabindex` |
| `hp-tab-panel` | `data-hp-component="tab-panel"`, `data-hp-panel`    | `selected` / `unselected` | `tabpanel` | `aria-hidden`, `tabindex="0"`                |

### Selectores CSS útiles

```css
/* Panel activo */
hp-tab-panel[data-state="selected"] {
}

/* Panel oculto — ya incluido en base.css */
[data-hp-panel][data-state="unselected"] {
  display: none;
}

/* Tab activo */
hp-tab[data-state="selected"] {
}
hp-tab[aria-selected="true"] {
}

/* Tab deshabilitado */
hp-tab[disabled],
hp-tab[aria-disabled="true"] {
}

/* Focus ring — ya incluido en base.css */
[data-hp-component]:focus-visible {
}
```
