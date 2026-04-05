# @headless-primitives/styles

Estilos base opcionales para los componentes de Headless Primitives, inspirados visualmente en [Base UI](https://base-ui.com/).

## Instalación

```sh
pnpm add @headless-primitives/styles
```

## Uso

### Todos los componentes

```css
@import "@headless-primitives/styles/index.css";
```

### Selectivo por componente

```css
@import "@headless-primitives/styles/theme.css"; /* tokens obligatorio si no usas index.css */
@import "@headless-primitives/styles/button.css";
@import "@headless-primitives/styles/tabs.css";
```

---

## CSS Custom Properties disponibles

Todas las propiedades se definen en `:root` y son sobrescribibles por el Consumer.

### Colores de acento

| Propiedad                | Default (light) | Descripción               |
| ------------------------ | --------------- | ------------------------- |
| `--hp-accent`            | `#0ea5e9`       | Color principal de acento |
| `--hp-accent-hover`      | `#0284c7`       | Hover del acento          |
| `--hp-accent-active`     | `#0369a1`       | Active del acento         |
| `--hp-accent-foreground` | `#ffffff`       | Texto sobre fondo acento  |

### Colores de superficie

| Propiedad        | Default (light) | Descripción               |
| ---------------- | --------------- | ------------------------- |
| `--hp-bg`        | `#ffffff`       | Fondo base                |
| `--hp-bg-subtle` | `#f8fafc`       | Fondo sutil               |
| `--hp-bg-muted`  | `#f1f5f9`       | Fondo muted               |
| `--hp-surface`   | `#ffffff`       | Superficie de componentes |

### Colores de borde

| Propiedad            | Default (light) | Descripción    |
| -------------------- | --------------- | -------------- |
| `--hp-border`        | `#e2e8f0`       | Borde estándar |
| `--hp-border-strong` | `#cbd5e1`       | Borde fuerte   |

### Colores de texto

| Propiedad             | Default (light) | Descripción         |
| --------------------- | --------------- | ------------------- |
| `--hp-text`           | `#0f172a`       | Texto primario      |
| `--hp-text-secondary` | `#64748b`       | Texto secundario    |
| `--hp-text-disabled`  | `#94a3b8`       | Texto deshabilitado |
| `--hp-text-error`     | `#dc2626`       | Texto de error (`hp-field-error`) — dark: `#f87171` |

### Backdrop

| Propiedad            | Default (light)       | Dark default          | Descripción                            |
| -------------------- | --------------------- | --------------------- | -------------------------------------- |
| `--hp-backdrop-bg`   | `rgb(0 0 0 / 0.5)`    | `rgb(0 0 0 / 0.65)`   | Color del backdrop de dialogs/overlays |

### Radio de borde

| Propiedad          | Valor    | Descripción    |
| ------------------ | -------- | -------------- |
| `--hp-radius-sm`   | `4px`    | Radio pequeño  |
| `--hp-radius`      | `6px`    | Radio base     |
| `--hp-radius-md`   | `8px`    | Radio mediano  |
| `--hp-radius-lg`   | `12px`   | Radio grande   |
| `--hp-radius-full` | `9999px` | Radio circular |

### Heredados de `@headless-primitives/utils/base.css`

| Propiedad                      | Default   | Descripción               |
| ------------------------------ | --------- | ------------------------- |
| `--hp-focus-outline-color`     | `#2563eb` | Color del anillo de foco  |
| `--hp-focus-outline-width`     | `2px`     | Grosor del anillo de foco |
| `--hp-z-index-backdrop`        | `1000`    | Z-index de backdrops      |
| `--hp-z-index-overlay-content` | `1100`    | Z-index de overlays       |
| `--hp-z-index-popover`         | `1200`    | Z-index de popovers       |
| `--hp-z-index-tooltip`         | `1300`    | Z-index de tooltips       |

### Ejemplo de override

```css
:root {
  --hp-accent: #8b5cf6; /* cambiar todo el acento a violeta */
  --hp-radius: 2px; /* esquinas más rectas */
  --hp-focus-outline-color: #8b5cf6;
}
```

---

## Contratos ARIA por componente

Cada componente gestiona internamente ciertos atributos ARIA de estado (**ARIA_State_Attribute**) y respeta los atributos de contexto que provee el Consumer (**ARIA_Context_Attribute**).

### hp-button

| Atributo           | Tipo    | Valores              | Condición         | Descripción                                                                    |
| ------------------ | ------- | -------------------- | ----------------- | ------------------------------------------------------------------------------ |
| `aria-disabled`    | State   | `"true"` / ausente   | Cuando `disabled` | Gestionado internamente                                                        |
| `aria-pressed`     | State   | `"true"` / `"false"` | Toggle buttons    | **Gestionado por el Consumer** en el HTML inicial; el componente lo sincroniza |
| `role`             | State   | `"button"`           | Siempre           | Asignado por el componente                                                     |
| `aria-label`       | Context | string               | Libre             | Libre uso por el Consumer                                                      |
| `aria-describedby` | Context | id                   | Libre             | Libre uso por el Consumer                                                      |

### hp-switch

| Atributo          | Tipo    | Valores              | Condición       | Descripción                |
| ----------------- | ------- | -------------------- | --------------- | -------------------------- |
| `aria-checked`    | State   | `"true"` / `"false"` | Según estado    | Gestionado internamente    |
| `aria-disabled`   | State   | `"true"` / ausente   | Cuando disabled | Gestionado internamente    |
| `role`            | State   | `"switch"`           | Siempre         | Asignado por el componente |
| `aria-label`      | Context | string               | Libre           | Libre uso por el Consumer  |
| `aria-labelledby` | Context | id                   | Libre           | Libre uso por el Consumer  |

### hp-checkbox

| Atributo           | Tipo    | Valores                          | Condición       | Descripción                |
| ------------------ | ------- | -------------------------------- | --------------- | -------------------------- |
| `aria-checked`     | State   | `"true"` / `"false"` / `"mixed"` | Según estado    | Gestionado internamente    |
| `aria-disabled`    | State   | `"true"` / ausente               | Cuando disabled | Gestionado internamente    |
| `role`             | State   | `"checkbox"`                     | Siempre         | Asignado por el componente |
| `aria-label`       | Context | string                           | Libre           | Libre uso por el Consumer  |
| `aria-labelledby`  | Context | id                               | Libre           | Libre uso por el Consumer  |
| `aria-describedby` | Context | id                               | Libre           | Libre uso por el Consumer  |

### hp-radio / hp-radio-group

| Atributo          | Tipo    | Valores                    | Condición       | Descripción                                   |
| ----------------- | ------- | -------------------------- | --------------- | --------------------------------------------- |
| `aria-checked`    | State   | `"true"` / `"false"`       | Según selección | Gestionado por hp-radio-group                 |
| `aria-disabled`   | State   | `"true"` / ausente         | Cuando disabled | Gestionado internamente                       |
| `role`            | State   | `"radio"` / `"radiogroup"` | Siempre         | Asignado por el componente                    |
| `aria-label`      | Context | string                     | Libre           | Libre uso por el Consumer                     |
| `aria-labelledby` | Context | id                         | Libre           | Libre uso por el Consumer (en hp-radio-group) |

### hp-toggle / hp-toggle-group

| Atributo        | Tipo    | Valores              | Condición       | Descripción                    |
| --------------- | ------- | -------------------- | --------------- | ------------------------------ |
| `aria-pressed`  | State   | `"true"` / `"false"` | Según selección | Gestionado por hp-toggle-group |
| `aria-disabled` | State   | `"true"` / ausente   | Cuando disabled | Gestionado internamente        |
| `aria-label`    | Context | string               | Libre           | Libre uso por el Consumer      |

### hp-collapsible

| Atributo        | Tipo    | Valores              | Condición    | Descripción               |
| --------------- | ------- | -------------------- | ------------ | ------------------------- |
| `aria-expanded` | State   | `"true"` / `"false"` | Según estado | Gestionado por el trigger |
| `aria-controls` | State   | id del content       | Siempre      | Gestionado internamente   |
| `aria-label`    | Context | string               | Libre        | Libre uso por el Consumer |

### hp-accordion-trigger

| Atributo        | Tipo    | Valores              | Condición    | Descripción               |
| --------------- | ------- | -------------------- | ------------ | ------------------------- |
| `aria-expanded` | State   | `"true"` / `"false"` | Según estado | Gestionado internamente   |
| `aria-controls` | State   | id del content       | Siempre      | Gestionado internamente   |
| `aria-label`    | Context | string               | Libre        | Libre uso por el Consumer |

### hp-tab / hp-tab-list / hp-tab-panel

| Atributo          | Tipo    | Valores              | Condición        | Descripción               |
| ----------------- | ------- | -------------------- | ---------------- | ------------------------- |
| `aria-selected`   | State   | `"true"` / `"false"` | Según tab activa | Gestionado por hp-tabs    |
| `aria-disabled`   | State   | `"true"` / ausente   | Cuando disabled  | Gestionado internamente   |
| `aria-controls`   | State   | id del panel         | Siempre          | Gestionado internamente   |
| `aria-labelledby` | State   | id del tab           | En el panel      | Gestionado internamente   |
| `aria-label`      | Context | string               | Libre            | Libre uso por el Consumer |

### hp-tooltip

| Atributo           | Tipo    | Valores               | Condición         | Descripción                             |
| ------------------ | ------- | --------------------- | ----------------- | --------------------------------------- |
| `aria-describedby` | State   | id del content        | Cuando open       | Gestionado internamente en el trigger   |
| `data-state`       | State   | `"open"` / `"closed"` | Según visibilidad | Gestionado internamente                 |
| `aria-label`       | Context | string                | Libre             | Libre uso por el Consumer en el trigger |

### hp-popover

| Atributo          | Tipo    | Valores               | Condición         | Descripción                             |
| ----------------- | ------- | --------------------- | ----------------- | --------------------------------------- |
| `aria-expanded`   | State   | `"true"` / `"false"`  | Según estado      | Gestionado en el trigger                |
| `aria-controls`   | State   | id del content        | Cuando open       | Gestionado internamente                 |
| `aria-hidden`     | State   | `"true"` / `"false"`  | Según visibilidad | Gestionado en el content                |
| `data-state`      | State   | `"open"` / `"closed"` | Según estado      | Gestionado internamente                 |
| `aria-label`      | Context | string                | Libre             | Libre uso por el Consumer               |
| `aria-labelledby` | Context | id                    | Libre             | Libre uso por el Consumer en el content |

### hp-dialog

| Atributo           | Tipo    | Valores               | Condición          | Descripción                   |
| ------------------ | ------- | --------------------- | ------------------ | ----------------------------- |
| `aria-modal`       | State   | `"true"`              | Siempre en content | Gestionado internamente       |
| `aria-expanded`    | State   | `"true"` / `"false"`  | En el trigger      | Gestionado internamente       |
| `aria-hidden`      | State   | `"true"` / `"false"`  | En el content      | Gestionado internamente       |
| `data-state`       | State   | `"open"` / `"closed"` | Según estado       | Gestionado internamente       |
| `aria-label`       | Context | string                | Libre              | Libre uso por el Consumer     |
| `aria-labelledby`  | Context | id                    | Libre              | Referencia al hp-dialog-title |
| `aria-describedby` | Context | id                    | Libre              | Libre uso por el Consumer     |

### hp-toast

| Atributo      | Tipo    | Valores    | Condición | Descripción               |
| ------------- | ------- | ---------- | --------- | ------------------------- |
| `role`        | State   | `"alert"`  | Siempre   | Gestionado internamente   |
| `aria-live`   | State   | `"polite"` | Siempre   | Gestionado internamente   |
| `aria-atomic` | State   | `"true"`   | Siempre   | Gestionado internamente   |
| `aria-label`  | Context | string     | Libre     | Libre uso por el Consumer |

### hp-separator

| Atributo           | Tipo  | Valores                       | Condición         | Descripción                |
| ------------------ | ----- | ----------------------------- | ----------------- | -------------------------- |
| `role`             | State | `"separator"`                 | Siempre           | Asignado por el componente |
| `aria-orientation` | State | `"horizontal"` / `"vertical"` | Según orientación | Gestionado internamente    |

### hp-progress

| Atributo        | Tipo    | Valores         | Condición | Descripción                    |
| --------------- | ------- | --------------- | --------- | ------------------------------ |
| `role`          | State   | `"progressbar"` | Siempre   | Asignado por el componente     |
| `aria-valuenow` | State   | número (0-100)  | Siempre   | Gestionado internamente        |
| `aria-valuemin` | State   | `"0"`           | Siempre   | Gestionado internamente        |
| `aria-valuemax` | State   | `"100"`         | Siempre   | Gestionado internamente        |
| `aria-label`    | Context | string          | Libre     | Recomendado para accesibilidad |

---

## Override sin conflictos (Req 16)

Los selectores usan **especificidad mínima** (selector de elemento único). Cualquier clase del Consumer tiene precedencia:

```css
/* Esto SIEMPRE prevalece sobre los estilos base */
.my-button {
  background-color: purple;
}

/* O redefinir tokens en un contexto específico */
.dark-theme {
  --hp-accent: #a855f7;
}
```

No se usa `!important` en ninguna regla (excepto `.hp-visually-hidden` en `base.css` por razones de accesibilidad).

---

## Verificación ARIA en desarrollo

```js
import { verifyAriaContract } from "@headless-primitives/styles/verify-aria.js";

const checkbox = document.querySelector("hp-checkbox");
verifyAriaContract(checkbox, "hp-checkbox");
```

En producción (`NODE_ENV === 'production'`) todas las comprobaciones se omiten automáticamente.
