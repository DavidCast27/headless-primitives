# Collapsible <span class="hp-badge">Nuevo</span>

El componente `hp-collapsible` implementa el patrón [WAI-ARIA Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/), permitiendo mostrar u ocultar contenido de manera accesible. Base ideal para FAQs, secciones expandibles y patrones de revelación de contenido.

## Demostración

### Sin estilos (solo base.css)

Así se ve `hp-collapsible` usando únicamente `@headless-primitives/utils/base.css`. El toggle, `aria-expanded` y visibilidad del contenido funcionan completamente.

<div class="hp-demo-card">
  <hp-collapsible>
    <hp-collapsible-trigger>¿Qué es headless?</hp-collapsible-trigger>
    <hp-collapsible-content><p>Comportamiento sin estilos impuestos.</p></hp-collapsible-content>
  </hp-collapsible>
</div>

### Con estilos personalizados

<div class="hp-demo-card">
  <hp-collapsible class="demo-collapsible">
    <hp-collapsible-trigger class="demo-trigger">
      <span>¿Qué es Headless Primitives?</span>
      <span class="demo-icon">▼</span>
    </hp-collapsible-trigger>
    <hp-collapsible-content class="demo-content">
      <p>Es una librería de componentes headless que proveen la accesibilidad y comportamiento nativo, dejando total libertad creativa para el diseño visual.</p>
    </hp-collapsible-content>
  </hp-collapsible>
</div>

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-collapsible class="faq-item">
  <hp-collapsible-trigger class="faq-question">
    ¿Pregunta frecuente?
    <span class="faq-icon">▼</span>
  </hp-collapsible-trigger>
  <hp-collapsible-content class="faq-answer">
    <p>Respuesta detallada a la pregunta frecuente...</p>
  </hp-collapsible-content>
</hp-collapsible>
```

```css [style.css]
.faq-item {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 20px;
  background: #f8fafc;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: #1a202c;
  transition: background-color 0.2s;
}

.faq-question:hover {
  background: #f1f5f9;
}

.faq-question:focus {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
}

.faq-icon {
  font-size: 14px;
  transition: transform 0.2s;
  color: #64748b;
}

.faq-answer {
  padding: 20px;
  background: white;
  border-top: 1px solid #e2e8f0;
}

.faq-answer p {
  margin: 0;
  color: #475569;
  line-height: 1.6;
}

hp-collapsible[open] .faq-icon {
  transform: rotate(180deg);
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<hp-collapsible class="border border-gray-200 rounded-lg overflow-hidden mb-4">
  <hp-collapsible-trigger
    class="flex items-center justify-between w-full px-5 py-4 bg-gray-50 border-none cursor-pointer text-base font-semibold text-gray-900 hover:bg-gray-100 focus:outline focus:outline-2 focus:outline-offset-[-2px] focus:outline-blue-600 transition-colors"
  >
    ¿Pregunta frecuente?
    <span class="text-sm text-gray-500 transition-transform duration-200">▼</span>
  </hp-collapsible-trigger>
  <hp-collapsible-content class="px-5 py-4 bg-white border-t border-gray-200">
    <p class="m-0 text-gray-600 leading-6">Respuesta detallada a la pregunta frecuente...</p>
  </hp-collapsible-content>
</hp-collapsible>
```

:::

</Flavor>

</CodeSnippet>

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/collapsible
```

```bash [npm]
npm install @headless-primitives/collapsible
```

```bash [yarn]
yarn add @headless-primitives/collapsible
```

```bash [bun]
bun add @headless-primitives/collapsible
```

:::

## Features

- ⌨️ Activación por teclado con `Enter` y `Space`.
- ♿️ `aria-expanded`, `aria-controls` y `aria-labelledby` gestionados automáticamente.
- 🎨 Sin estilos visuales (Headless).
- ⚡️ Controlable via atributo `open` o propiedad JS.
- 🔒 Estado `disabled` propagable al trigger.

## Anatomía

```html
<hp-collapsible>
  <hp-collapsible-trigger></hp-collapsible-trigger>
  <hp-collapsible-content></hp-collapsible-content>
</hp-collapsible>
```

## API Reference

### `hp-collapsible`

Contenedor principal que gestiona el estado de expansión/contracción.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción                                  |
| -------------------- | --------- | ----------- | -------------------------------------------- |
| `open`               | `boolean` | `false`     | Si está presente, el contenido está visible. |
| `disabled`           | `boolean` | `false`     | Deshabilita todo el collapsible.             |

#### Eventos

| Evento      | Detalle             | Descripción                                 |
| ----------- | ------------------- | ------------------------------------------- |
| `hp-open`   | `{ open: boolean }` | Se dispara cuando el collapsible se abre.   |
| `hp-close`  | `{ open: boolean }` | Se dispara cuando el collapsible se cierra. |
| `hp-change` | `{ open: boolean }` | Se dispara en cualquier cambio de estado.   |

### `hp-collapsible-trigger`

Botón que controla la visibilidad del contenido.

#### Atributos / Propiedades

| Atributo / Propiedad | Tipo      | Por Defecto | Descripción                               |
| -------------------- | --------- | ----------- | ----------------------------------------- |
| `disabled`           | `boolean` | heredado    | Heredado del contenedor `hp-collapsible`. |

#### Atributos ARIA gestionados automáticamente

- `role="button"` — Asignado si no se especifica.
- `aria-expanded` — Sincronizado con el estado `open` del contenedor.
- `aria-controls` — Referencia al ID del contenido.
- `aria-disabled` — Sincronizado con `disabled`.
- `tabindex="0"` — Habilitado cuando no está deshabilitado.

### `hp-collapsible-content`

Panel de contenido que se muestra u oculta según el estado.

#### Atributos ARIA gestionados automáticamente

- `role="region"` — Asignado si no se especifica.
- `aria-labelledby` — Referencia al ID del trigger.
- `data-state` — `"open"` | `"closed"`.
- `data-hp-panel` — Presente siempre (usado por `base.css`).

## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/).

### Navegación por teclado

| Tecla   | Acción                    |
| ------- | ------------------------- |
| `Enter` | Abre/cierra el contenido. |
| `Space` | Abre/cierra el contenido. |

## Ejemplos

### Control Programático

```javascript
const collapsible = document.querySelector("hp-collapsible");

// Abrir programáticamente
collapsible.open = true;

// Escuchar cambios
collapsible.addEventListener("hp-change", (e) => {
  console.log("Estado cambiado:", e.detail.open);
});
```

### Anidación

```html
<hp-collapsible>
  <hp-collapsible-trigger>Exterior</hp-collapsible-trigger>
  <hp-collapsible-content>
    <p>Contenido exterior...</p>
    <hp-collapsible>
      <hp-collapsible-trigger>Interior</hp-collapsible-trigger>
      <hp-collapsible-content>
        <p>Contenido anidado...</p>
      </hp-collapsible-content>
    </hp-collapsible>
  </hp-collapsible-content>
</hp-collapsible>
```

<style>
hp-collapsible,
hp-collapsible-trigger,
hp-collapsible-content {
  display: block;
}
hp-collapsible-content[hidden] {
  display: none;
}
.demo-collapsible {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  max-width: 400px;
}
.demo-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: background-color 0.2s;
  margin: 0;
}
.demo-trigger:hover {
  background: var(--vp-c-bg-mute);
}
.demo-trigger:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}
.demo-icon {
  font-size: 12px;
  transition: transform 0.2s;
  color: var(--vp-c-text-2);
  margin: 0;
}
.demo-content {
  padding: 16px;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  margin: 0;
}
.demo-content p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
