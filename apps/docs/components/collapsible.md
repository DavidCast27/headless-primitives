# Collapsible

<span class="hp-badge">Nuevo</span>

El componente `hp-collapsible` es un primitivo que implementa el patrón WAI-ARIA Disclosure, permitiendo mostrar u ocultar contenido de manera accesible. Proporciona una base sólida para crear acordeones, FAQs, secciones expandibles y cualquier patrón de revelación de contenido.

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

/* Animación del icono cuando está abierto */
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

```css [styles.css]
/* Rotación del icono cuando está abierto */
hp-collapsible[open] .fa-icon {
  @apply rotate-180;
}
```

:::

</Flavor>

</CodeSnippet>

## Anatomía

El componente Collapsible sigue una estructura anidada simple que establece las relaciones ARIA correctas:

```html
<hp-collapsible>
  <hp-collapsible-trigger>
    <!-- Contenido del botón disparador -->
  </hp-collapsible-trigger>
  <hp-collapsible-content>
    <!-- Contenido que se muestra/oculta -->
  </hp-collapsible-content>
</hp-collapsible>
```

## API Reference

### `hp-collapsible`

Contenedor principal que gestiona el estado de expansión/contracción y la coordinación ARIA entre trigger y content.

#### Atributos

| Atributo   | Tipo                  | Por defecto | Descripción                                                   |
| :--------- | :-------------------- | :---------- | :------------------------------------------------------------ |
| `open`     | _boolean (presencia)_ | ausente     | Si está presente, el contenido está visible. Observado.       |
| `disabled` | _boolean (presencia)_ | ausente     | Si está presente, deshabilita todo el collapsible. Observado. |

#### Propiedades

| Propiedad  | Tipo      | Descripción                                  |
| :--------- | :-------- | :------------------------------------------- |
| `open`     | `boolean` | Obtiene o establece el estado de expansión.  |
| `disabled` | `boolean` | Obtiene o establece el estado deshabilitado. |

#### Eventos

| Evento      | Detalle              | Descripción                                         |
| :---------- | :------------------- | :-------------------------------------------------- |
| `hp-open`   | `{ value: boolean }` | Se dispara cuando el collapsible se abre.           |
| `hp-close`  | `{ value: boolean }` | Se dispara cuando el collapsible se cierra.         |
| `hp-change` | `{ open: boolean }`  | Se dispara en cualquier cambio de estado (bubbles). |

### `hp-collapsible-trigger`

Botón que controla la visibilidad del contenido. Hereda automáticamente el estado deshabilitado del contenedor padre.

#### Atributos

| Atributo   | Tipo                  | Por defecto | Descripción                                          |
| :--------- | :-------------------- | :---------- | :--------------------------------------------------- |
| `disabled` | _boolean (presencia)_ | heredado    | Heredado del contenedor `hp-collapsible`. Observado. |

#### Atributos ARIA gestionados

- `role="button"` - Asignado automáticamente si no se especifica
- `aria-expanded` - Sincronizado con el estado `open` del contenedor
- `aria-controls` - Referencia al ID del contenido
- `tabindex="0"` - Habilitado cuando no está deshabilitado

#### Eventos

| Evento    | Detalle         | Descripción                           |
| :-------- | :-------------- | :------------------------------------ |
| `click`   | `MouseEvent`    | Evento nativo, manejado internamente. |
| `keydown` | `KeyboardEvent` | Soporta `Enter` y `Espacio`.          |

### `hp-collapsible-content`

Panel de contenido que se muestra u oculta según el estado del contenedor.

#### Atributos

| Atributo | Tipo                  | Por defecto | Descripción                                                 |
| :------- | :-------------------- | :---------- | :---------------------------------------------------------- |
| `hidden` | _boolean (presencia)_ | gestionado  | Añadido automáticamente cuando el collapsible está cerrado. |

#### Atributos ARIA gestionados

- `role="region"` - Asignado automáticamente si no se especifica
- `aria-labelledby` - Referencia al ID del trigger
- `id` - ID único generado automáticamente para la relación ARIA

## Accesibilidad

`hp-collapsible` implementa el patrón **WAI-ARIA Disclosure**:

- **Relaciones ARIA**: Gestiona automáticamente `aria-controls`, `aria-labelledby` y `aria-expanded`
- **Navegación por teclado**: Soporta `Enter` y `Espacio` en el trigger
- **Gestión de foco**: El trigger mantiene el foco durante la interacción
- **Screen readers**: Anuncia correctamente el estado expandido/contraído
- **Estados deshabilitados**: Propaga correctamente el estado deshabilitado

## Ejemplos de Uso

### Acordeón Simple

```html
<div class="accordion">
  <hp-collapsible>
    <hp-collapsible-trigger>Sección 1</hp-collapsible-trigger>
    <hp-collapsible-content>Contenido de la sección 1...</hp-collapsible-content>
  </hp-collapsible>

  <hp-collapsible>
    <hp-collapsible-trigger>Sección 2</hp-collapsible-trigger>
    <hp-collapsible-content>Contenido de la sección 2...</hp-collapsible-content>
  </hp-collapsible>
</div>
```

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
