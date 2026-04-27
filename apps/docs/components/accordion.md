# Accordion <span class="hp-badge">Nuevo</span>

El componente `hp-accordion` implementa el patrón [WAI-ARIA Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/), permitiendo crear interfaces de acordeón accesibles con múltiples paneles expandibles, navegación por teclado completa y soporte para modo de panel único.

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
  <hp-accordion class="hp-demo-acc">
    <hp-accordion-item class="hp-demo-acc-item" value="demo-1">
      <hp-accordion-trigger class="hp-demo-acc-trigger">
        <span class="hp-demo-acc-text">¿Qué es Headless Primitives?</span>
        <span class="hp-demo-acc-icon">▼</span>
      </hp-accordion-trigger>
      <hp-accordion-content class="hp-demo-acc-content">
        <p>Es una librería de componentes headless que proveen la accesibilidad y comportamiento nativo.</p>
      </hp-accordion-content>
    </hp-accordion-item>
    <hp-accordion-item class="hp-demo-acc-item" value="demo-2">
      <hp-accordion-trigger class="hp-demo-acc-trigger">
        <span class="hp-demo-acc-text">¿Por qué usar acordeones?</span>
        <span class="hp-demo-acc-icon">▼</span>
      </hp-accordion-trigger>
      <hp-accordion-content class="hp-demo-acc-content">
        <p>Son perfectos para organizar contenido en secciones expandibles.</p>
      </hp-accordion-content>
    </hp-accordion-item>
  </hp-accordion>
</div>

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

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/accordion
```

```bash [npm]
npm install @headless-primitives/accordion
```

```bash [yarn]
yarn add @headless-primitives/accordion
```

```bash [bun]
bun add @headless-primitives/accordion
```

:::

## Features

- ⌨️ Navegación completa por teclado (flechas, Home, End).
- ♿️ Relaciones ARIA gestionadas automáticamente (`aria-expanded`, `aria-controls`, `aria-labelledby`).
- 🎨 Sin estilos visuales (Headless) — tú decides el diseño.
- ⚡️ Modo `single-panel` para acordeones tipo exclusivo.
- 🔒 Estado `disabled` propagable desde el root a todos los ítems.

## Anatomía

```html
<hp-accordion>
  <hp-accordion-item>
    <hp-accordion-trigger></hp-accordion-trigger>
    <hp-accordion-content></hp-accordion-content>
  </hp-accordion-item>
</hp-accordion>
```

## API Reference

### `hp-accordion`

Contenedor principal que coordina múltiples paneles de acordeón.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción                                                   |
| -------------------- | --------- | ----------- | ------------------------------------------------------------- |
| `single-panel`       | `boolean` | `false`     | Si está presente, solo un panel puede estar abierto a la vez. |
| `disabled`           | `boolean` | `false`     | Si está presente, deshabilita todos los paneles del acordeón. |

#### Eventos

| Evento      | Detalle                            | Descripción                                                      |
| ----------- | ---------------------------------- | ---------------------------------------------------------------- |
| `hp-change` | `{ open: boolean, value: string }` | Se dispara cuando cambia el estado de cualquier panel (bubbles). |

### `hp-accordion-item`

Panel individual dentro del acordeón.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción                                    |
| -------------------- | --------- | ----------- | ---------------------------------------------- |
| `value`              | `string`  | auto (UUID) | Identificador único del panel.                 |
| `open`               | `boolean` | `false`     | Si está presente, el panel está expandido.     |
| `disabled`           | `boolean` | `false`     | Si está presente, deshabilita solo este panel. |

#### Eventos

| Evento      | Detalle                            | Descripción                               |
| ----------- | ---------------------------------- | ----------------------------------------- |
| `hp-open`   | `{ value: string }`                | Se dispara cuando el panel se expande.    |
| `hp-close`  | `{ value: string }`                | Se dispara cuando el panel se contrae.    |
| `hp-change` | `{ open: boolean, value: string }` | Se dispara en cualquier cambio de estado. |

### `hp-accordion-trigger`

Botón que controla la visibilidad del contenido del panel.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción                                  |
| -------------------- | --------- | ----------- | -------------------------------------------- |
| `disabled`           | `boolean` | heredado    | Heredado del contenedor `hp-accordion-item`. |

#### Atributos ARIA gestionados automáticamente

- `role="button"` — Asignado automáticamente si no se especifica.
- `aria-expanded` — Sincronizado con el estado `open` del panel.
- `aria-controls` — Referencia al ID del contenido.
- `aria-disabled` — Sincronizado con el estado `disabled`.
- `tabindex="0"` — Habilitado cuando no está deshabilitado.

### `hp-accordion-content`

Panel de contenido que se muestra u oculta según el estado.

#### Atributos ARIA gestionados automáticamente

- `role="region"` — Asignado automáticamente si no se especifica.
- `aria-labelledby` — Referencia al ID del trigger.
- `data-state` — `"open"` | `"closed"` para estilizado CSS.
- `data-hp-panel` — Presente siempre (usado por `base.css`).

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/).

### Navegación por teclado

| Tecla             | Acción                                        |
| ----------------- | --------------------------------------------- |
| `Enter` / `Space` | Activa el trigger y abre/cierra el contenido. |
| `ArrowDown`       | Mueve el foco al siguiente trigger.           |
| `ArrowUp`         | Mueve el foco al trigger anterior.            |
| `Home`            | Mueve el foco al primer trigger.              |
| `End`             | Mueve el foco al último trigger.              |

## Ejemplos

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
