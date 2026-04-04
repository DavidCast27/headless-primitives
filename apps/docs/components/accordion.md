# Accordion

<span class="hp-badge">Nuevo</span>

El componente `hp-accordion` es un primitivo que implementa el patrón WAI-ARIA Accordion, permitiendo crear interfaces de acordeón accesibles con múltiples paneles expandibles. Proporciona navegación por teclado completa, estados de deshabilitado y soporte para modo de panel único.

## Instalación

```bash
pnpm add @headless-primitives/accordion
```

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-accordion` usando únicamente `@headless-primitives/utils/base.css`. La navegación por teclado, `aria-expanded` y la visibilidad de paneles funcionan completamente.

<div class="hp-demo-card">
  <hp-accordion>
    <hp-accordion-item value="a1">
      <hp-accordion-trigger>¿Qué es Headless Primitives?</hp-accordion-trigger>
      <hp-accordion-content><p>Una librería de componentes headless accesibles.</p></hp-accordion-content>
    </hp-accordion-item>
    <hp-accordion-item value="a2">
      <hp-accordion-trigger>¿Por qué usarla?</hp-accordion-trigger>
      <hp-accordion-content><p>Comportamiento y accesibilidad listos, tú pones los estilos.</p></hp-accordion-content>
    </hp-accordion-item>
  </hp-accordion>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-accordion class="demo-accordion">
    <hp-accordion-item value="demo-1">
      <hp-accordion-trigger class="demo-trigger">
        <span>¿Qué es Headless Primitives?</span>
        <span class="demo-icon">▼</span>
      </hp-accordion-trigger>
      <hp-accordion-content class="demo-content">
        <p>Es una librería de componentes headless que proveen la accesibilidad y comportamiento nativo.</p>
      </hp-accordion-content>
    </hp-accordion-item>
    <hp-accordion-item value="demo-2">
      <hp-accordion-trigger class="demo-trigger">
        <span>¿Por qué usar acordeones?</span>
        <span class="demo-icon">▼</span>
      </hp-accordion-trigger>
      <hp-accordion-content class="demo-content">
        <p>Son perfectos para organizar contenido en secciones expandibles.</p>
      </hp-accordion-content>
    </hp-accordion-item>
  </hp-accordion>
</div>

<style>
hp-accordion,
hp-accordion-item,
hp-accordion-trigger,
hp-accordion-content {
  display: block;
}
hp-accordion-content[hidden] {
  display: none;
}
.demo-accordion {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  max-width: 500px;
}
hp-accordion-item {
  border-bottom: 1px solid var(--vp-c-divider);
}
hp-accordion-item:last-child {
  border-bottom: none;
}
.demo-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}
.demo-trigger:hover {
  background: var(--vp-c-bg-mute);
}
.demo-trigger:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}
.demo-trigger[aria-expanded="true"] .demo-icon {
  transform: rotate(180deg);
}
.demo-content {
  padding: 16px;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
}
.demo-content[hidden] {
  display: none;
}
.demo-content p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.demo-icon {
  font-size: 12px;
  transition: transform 0.2s;
  color: var(--vp-c-text-2);
}
</style>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-accordion class="faq-accordion">
  <hp-accordion-item class="faq-item" value="faq-1">
    <hp-accordion-trigger class="faq-trigger">
      ¿Qué es Headless Primitives?
      <span class="faq-icon">▼</span>
    </hp-accordion-trigger>
    <hp-accordion-content class="faq-content">
      <p>
        Es una librería de componentes headless que proveen la accesibilidad y comportamiento
        nativo, dejando total libertad creativa para el diseño visual.
      </p>
    </hp-accordion-content>
  </hp-accordion-item>

  <hp-accordion-item class="faq-item" value="faq-2">
    <hp-accordion-trigger class="faq-trigger">
      ¿Por qué usar acordeones?
      <span class="faq-icon">▼</span>
    </hp-accordion-trigger>
    <hp-accordion-content class="faq-content">
      <p>
        Los acordeones son perfectos para organizar contenido en secciones que pueden
        expandirse/contraerse, mejorando la experiencia de usuario en interfaces densas.
      </p>
    </hp-accordion-content>
  </hp-accordion-item>
</hp-accordion>
```

```css [style.css]
.faq-accordion {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.faq-item {
  border-bottom: 1px solid #e2e8f0;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 20px;
  background: #f8fafc;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: #1a202c;
  transition: background-color 0.2s;
}

.faq-trigger:hover {
  background: #f1f5f9;
}

.faq-trigger:focus {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
}

.faq-trigger[aria-expanded="true"] .faq-icon {
  transform: rotate(180deg);
}

.faq-content {
  padding: 20px;
  background: white;
  border-top: 1px solid #e2e8f0;
}

.faq-content[hidden] {
  display: none;
}

.faq-content p {
  margin: 0;
  color: #475569;
  line-height: 1.6;
}

.faq-icon {
  font-size: 12px;
  transition: transform 0.2s;
  color: #64748b;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-accordion class="border border-gray-200 rounded-lg overflow-hidden bg-white">
  <hp-accordion-item class="border-b border-gray-200 last:border-b-0" value="faq-1">
    <hp-accordion-trigger
      class="flex items-center justify-between w-full px-5 py-4 bg-gray-50 border-none cursor-pointer text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline focus:outline-2 focus:outline-offset-[-2px] focus:outline-blue-600 transition-colors"
    >
      ¿Qué es Headless Primitives?
      <span class="text-xs text-gray-500 transition-transform duration-200">▼</span>
    </hp-accordion-trigger>
    <hp-accordion-content class="px-5 py-4 bg-white border-t border-gray-200">
      <p class="m-0 text-gray-600 leading-6">
        Es una librería de componentes headless que proveen la accesibilidad y comportamiento
        nativo, dejando total libertad creativa para el diseño visual.
      </p>
    </hp-accordion-content>
  </hp-accordion-item>

  <hp-accordion-item class="border-b border-gray-200 last:border-b-0" value="faq-2">
    <hp-accordion-trigger
      class="flex items-center justify-between w-full px-5 py-4 bg-gray-50 border-none cursor-pointer text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline focus:outline-2 focus:outline-offset-[-2px] focus:outline-blue-600 transition-colors"
    >
      ¿Por qué usar acordeones?
      <span class="text-xs text-gray-500 transition-transform duration-200">▼</span>
    </hp-accordion-trigger>
    <hp-accordion-content class="px-5 py-4 bg-white border-t border-gray-200">
      <p class="m-0 text-gray-600 leading-6">
        Los acordeones son perfectos para organizar contenido en secciones que pueden
        expandirse/contraerse, mejorando la experiencia de usuario en interfaces densas.
      </p>
    </hp-accordion-content>
  </hp-accordion-item>
</hp-accordion>
```

```css [styles.css]
/* Rotación del icono cuando está abierto */
hp-accordion-trigger[aria-expanded="true"] .transition-transform {
  @apply rotate-180;
}
```

:::

</Flavor>

</CodeSnippet>

## Anatomía

El componente Accordion sigue una estructura anidada que establece las relaciones ARIA correctas:

```html
<hp-accordion>
  <hp-accordion-item value="item-1">
    <hp-accordion-trigger> Título del Panel </hp-accordion-trigger>
    <hp-accordion-content> Contenido del panel... </hp-accordion-content>
  </hp-accordion-item>
  <hp-accordion-item value="item-2">
    <hp-accordion-trigger> Otro Título </hp-accordion-trigger>
    <hp-accordion-content> Otro contenido... </hp-accordion-content>
  </hp-accordion-item>
</hp-accordion>
```

## API Reference

### `hp-accordion`

Contenedor principal que coordina múltiples paneles de acordeón.

#### Atributos

| Atributo       | Tipo                  | Por defecto | Descripción                                                   |
| :------------- | :-------------------- | :---------- | :------------------------------------------------------------ |
| `single-panel` | _boolean (presencia)_ | ausente     | Si está presente, solo un panel puede estar abierto a la vez. |
| `disabled`     | _boolean (presencia)_ | ausente     | Si está presente, deshabilita todos los paneles del acordeón. |

#### Propiedades

| Propiedad     | Tipo      | Descripción                                  |
| :------------ | :-------- | :------------------------------------------- |
| `singlePanel` | `boolean` | Obtiene o establece el modo de panel único.  |
| `disabled`    | `boolean` | Obtiene o establece el estado deshabilitado. |

#### Eventos

| Evento      | Detalle                            | Descripción                                            |
| :---------- | :--------------------------------- | :----------------------------------------------------- |
| `hp-change` | `{ open: boolean, value: string }` | Se dispara cuando cambia el estado de cualquier panel. |

### `hp-accordion-item`

Panel individual dentro del acordeón.

#### Atributos

| Atributo   | Tipo                  | Por defecto | Descripción                                           |
| :--------- | :-------------------- | :---------- | :---------------------------------------------------- |
| `value`    | _string_              | auto        | Identificador único del panel.                        |
| `open`     | _boolean (presencia)_ | ausente     | Si está presente, el panel está expandido. Observado. |
| `disabled` | _boolean (presencia)_ | ausente     | Si está presente, deshabilita solo este panel.        |

#### Propiedades

| Propiedad  | Tipo      | Descripción                                  |
| :--------- | :-------- | :------------------------------------------- |
| `value`    | `string`  | Obtiene o establece el valor del panel.      |
| `open`     | `boolean` | Obtiene o establece el estado de expansión.  |
| `disabled` | `boolean` | Obtiene o establece el estado deshabilitado. |

#### Eventos

| Evento      | Detalle                            | Descripción                                         |
| :---------- | :--------------------------------- | :-------------------------------------------------- |
| `hp-open`   | `{ value: string }`                | Se dispara cuando el panel se expande.              |
| `hp-close`  | `{ value: string }`                | Se dispara cuando el panel se contrae.              |
| `hp-change` | `{ open: boolean, value: string }` | Se dispara en cualquier cambio de estado (bubbles). |

### `hp-accordion-trigger`

Botón que controla la visibilidad del contenido del panel.

#### Atributos

| Atributo   | Tipo                  | Por defecto | Descripción                                  |
| :--------- | :-------------------- | :---------- | :------------------------------------------- |
| `disabled` | _boolean (presencia)_ | heredado    | Heredado del contenedor `hp-accordion-item`. |

#### Atributos ARIA gestionados

- `role="button"` - Asignado automáticamente si no se especifica
- `aria-expanded` - Sincronizado con el estado `open` del panel
- `aria-controls` - Referencia al ID del contenido
- `tabindex="0"` - Habilitado cuando no está deshabilitado

#### Eventos

| Evento    | Detalle         | Descripción                           |
| :-------- | :-------------- | :------------------------------------ |
| `click`   | `MouseEvent`    | Evento nativo, manejado internamente. |
| `keydown` | `KeyboardEvent` | Soporta `Enter`, `Espacio` y flechas. |

### `hp-accordion-content`

Panel de contenido que se muestra u oculta según el estado del panel.

#### Atributos

| Atributo | Tipo                  | Por defecto | Descripción                                             |
| :------- | :-------------------- | :---------- | :------------------------------------------------------ |
| `hidden` | _boolean (presencia)_ | gestionado  | Añadido automáticamente cuando el panel está contraído. |

#### Atributos ARIA gestionados

- `role="region"` - Asignado automáticamente si no se especifica
- `aria-labelledby` - Referencia al ID del trigger
- `id` - ID único generado automáticamente para la relación ARIA

## Accesibilidad

`hp-accordion` implementa el patrón **WAI-ARIA Accordion**:

- **Relaciones ARIA**: Gestiona automáticamente `aria-controls`, `aria-labelledby` y `aria-expanded`
- **Navegación por teclado**: Soporta `Enter`, `Espacio` y flechas direccionales
- **Gestión de foco**: Manejo adecuado del foco y orden de tabulación
- **Screen readers**: Anuncia correctamente el estado expandido/contraído
- **Estados deshabilitados**: Propaga correctamente el estado deshabilitado

## Ejemplos de Uso

### Modo de Panel Único

```html
<hp-accordion single-panel>
  <hp-accordion-item value="panel-1">
    <hp-accordion-trigger>Panel 1</hp-accordion-trigger>
    <hp-accordion-content>Contenido del panel 1...</hp-accordion-content>
  </hp-accordion-item>

  <hp-accordion-item value="panel-2">
    <hp-accordion-trigger>Panel 2</hp-accordion-trigger>
    <hp-accordion-content>Contenido del panel 2...</hp-accordion-content>
  </hp-accordion-item>
</hp-accordion>
```

### Control Programático

```javascript
const accordion = document.querySelector("hp-accordion");
const item = document.querySelector("hp-accordion-item");

// Abrir un panel específico
item.open = true;

// Escuchar cambios
item.addEventListener("hp-change", (e) => {
  console.log("Panel cambiado:", e.detail.open, e.detail.value);
});

// Cambiar a modo de panel único
accordion.singlePanel = true;
```

### Paneles Deshabilitados

```html
<hp-accordion>
  <hp-accordion-item value="enabled">
    <hp-accordion-trigger>Panel Habilitado</hp-accordion-trigger>
    <hp-accordion-content>Contenido accesible...</hp-accordion-content>
  </hp-accordion-item>

  <hp-accordion-item value="disabled" disabled>
    <hp-accordion-trigger>Panel Deshabilitado</hp-accordion-trigger>
    <hp-accordion-content>Contenido no accesible...</hp-accordion-content>
  </hp-accordion-item>
</hp-accordion>
```
