# Theming

`@headless-primitives/styles` es el paquete opcional de estilos base. Está construido enteramente sobre **CSS custom properties**, lo que te permite personalizar toda la apariencia visual cambiando únicamente variables en tu propio CSS, sin tocar el paquete.

## Instalación

```bash
pnpm add @headless-primitives/styles
```

## Uso

### Todo de una vez

```css
@import "@headless-primitives/styles/index.css";
```

### Selectivo por componente

Necesitas el tema base más el CSS del componente que quieras:

```css
@import "@headless-primitives/styles/theme.css"; /* tokens — siempre requerido */
@import "@headless-primitives/styles/button.css";
@import "@headless-primitives/styles/tabs.css";
```

---

## Tokens disponibles

Todas las propiedades se definen bajo `:root` y pueden ser sobrescritas en cualquier selector.

### Acento

El color de acento controla el estado activo/seleccionado de switches, checkboxes, radios, tabs, etc.

<div class="token-grid">
  <div class="token-row">
    <span class="token-swatch" style="background: #0ea5e9;"></span>
    <code>--hp-accent</code>
    <span class="token-value">#0ea5e9</span>
    <span class="token-desc">Color principal de interacción</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #0284c7;"></span>
    <code>--hp-accent-hover</code>
    <span class="token-value">#0284c7</span>
    <span class="token-desc">Estado hover del acento</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #0369a1;"></span>
    <code>--hp-accent-active</code>
    <span class="token-value">#0369a1</span>
    <span class="token-desc">Estado active/pressed del acento</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #ffffff; border: 1px solid #e2e8f0;"></span>
    <code>--hp-accent-foreground</code>
    <span class="token-value">#ffffff</span>
    <span class="token-desc">Texto sobre fondo de acento</span>
  </div>
</div>

### Superficies

<div class="token-grid">
  <div class="token-row">
    <span class="token-swatch" style="background: #ffffff; border: 1px solid #e2e8f0;"></span>
    <code>--hp-bg</code>
    <span class="token-value">#ffffff</span>
    <span class="token-desc">Fondo base de la aplicación</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #f8fafc; border: 1px solid #e2e8f0;"></span>
    <code>--hp-bg-subtle</code>
    <span class="token-value">#f8fafc</span>
    <span class="token-desc">Fondo sutil para zonas en reposo</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #f1f5f9; border: 1px solid #e2e8f0;"></span>
    <code>--hp-bg-muted</code>
    <span class="token-value">#f1f5f9</span>
    <span class="token-desc">Fondo muted para hover de botones</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #ffffff; border: 1px solid #e2e8f0;"></span>
    <code>--hp-surface</code>
    <span class="token-value">#ffffff</span>
    <span class="token-desc">Fondo de componentes (botones, cards)</span>
  </div>
</div>

### Bordes

<div class="token-grid">
  <div class="token-row">
    <span class="token-swatch" style="background: #e2e8f0;"></span>
    <code>--hp-border</code>
    <span class="token-value">#e2e8f0</span>
    <span class="token-desc">Borde estándar</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #cbd5e1;"></span>
    <code>--hp-border-strong</code>
    <span class="token-value">#cbd5e1</span>
    <span class="token-desc">Borde enfatizado (hover, checkboxes)</span>
  </div>
</div>

### Texto

<div class="token-grid">
  <div class="token-row">
    <span class="token-swatch" style="background: #0f172a;"></span>
    <code>--hp-text</code>
    <span class="token-value">#0f172a</span>
    <span class="token-desc">Texto primario</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #64748b;"></span>
    <code>--hp-text-secondary</code>
    <span class="token-value">#64748b</span>
    <span class="token-desc">Texto secundario y labels</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #94a3b8;"></span>
    <code>--hp-text-disabled</code>
    <span class="token-value">#94a3b8</span>
    <span class="token-desc">Texto en estados deshabilitados</span>
  </div>
</div>

### Radio de borde

<div class="token-grid radius-grid">
  <div class="token-row">
    <span class="token-swatch radius-swatch" style="border-radius: 4px;"></span>
    <code>--hp-radius-sm</code>
    <span class="token-value">4px</span>
    <span class="token-desc">Radio pequeño (checkboxes, tags)</span>
  </div>
  <div class="token-row">
    <span class="token-swatch radius-swatch" style="border-radius: 6px;"></span>
    <code>--hp-radius</code>
    <span class="token-value">6px</span>
    <span class="token-desc">Radio base (botones, inputs)</span>
  </div>
  <div class="token-row">
    <span class="token-swatch radius-swatch" style="border-radius: 8px;"></span>
    <code>--hp-radius-md</code>
    <span class="token-value">8px</span>
    <span class="token-desc">Radio mediano (cards, dialogs)</span>
  </div>
  <div class="token-row">
    <span class="token-swatch radius-swatch" style="border-radius: 12px;"></span>
    <code>--hp-radius-lg</code>
    <span class="token-value">12px</span>
    <span class="token-desc">Radio grande (modales, popovers)</span>
  </div>
  <div class="token-row">
    <span class="token-swatch radius-swatch" style="border-radius: 9999px;"></span>
    <code>--hp-radius-full</code>
    <span class="token-value">9999px</span>
    <span class="token-desc">Circular (switch, avatar, pills)</span>
  </div>
</div>

### Sombras

<div class="token-grid">
  <div class="token-row shadow-row">
    <span class="token-swatch shadow-swatch" style="box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);"></span>
    <code>--hp-shadow-sm</code>
    <span class="token-desc">Sombra sutil (hover state)</span>
  </div>
  <div class="token-row shadow-row">
    <span class="token-swatch shadow-swatch" style="box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);"></span>
    <code>--hp-shadow</code>
    <span class="token-desc">Sombra base (cards, botones elevados)</span>
  </div>
  <div class="token-row shadow-row">
    <span class="token-swatch shadow-swatch" style="box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);"></span>
    <code>--hp-shadow-md</code>
    <span class="token-desc">Sombra media (popovers)</span>
  </div>
  <div class="token-row shadow-row">
    <span class="token-swatch shadow-swatch" style="box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);"></span>
    <code>--hp-shadow-lg</code>
    <span class="token-desc">Sombra fuerte (dialogs, toasts)</span>
  </div>
</div>

### Foco (heredados de `base.css`)

<div class="token-grid">
  <div class="token-row">
    <span class="token-swatch" style="background: #2563eb;"></span>
    <code>--hp-focus-outline-color</code>
    <span class="token-value">#2563eb</span>
    <span class="token-desc">Color del anillo de foco accesible</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: transparent; border: 2px solid #64748b; display:flex; align-items:center; justify-content:center; font-size:10px; color: #64748b;">2px</span>
    <code>--hp-focus-outline-width</code>
    <span class="token-value">2px</span>
    <span class="token-desc">Grosor del anillo de foco</span>
  </div>
</div>

### Z-indexes (heredados de `base.css`)

| Token                          | Valor  | Usado en                                  |
| ------------------------------ | ------ | ----------------------------------------- |
| `--hp-z-index-backdrop`        | `1000` | `hp-dialog-backdrop`                      |
| `--hp-z-index-overlay-content` | `1100` | `hp-dialog-content`, `hp-toast-container` |
| `--hp-z-index-popover`         | `1200` | `hp-popover-content`                      |
| `--hp-z-index-tooltip`         | `1300` | `hp-tooltip-content`                      |

---

## Personalizar el tema

### Cambiar el color de acento

```css
:root {
  --hp-accent: #8b5cf6; /* violeta */
  --hp-accent-hover: #7c3aed;
  --hp-accent-active: #6d28d9;
  --hp-focus-outline-color: #8b5cf6;
}
```

### Esquinas más rectas (estilo "enterprise")

```css
:root {
  --hp-radius-sm: 2px;
  --hp-radius: 3px;
  --hp-radius-md: 4px;
  --hp-radius-lg: 6px;
}
```

### Anular tokens en un contexto específico

```css
/* Solo dentro de un formulario */
.my-form {
  --hp-accent: #f59e0b; /* amarillo */
  --hp-border: #fde68a;
}
```

---

## Dark Mode

El paquete incluye un bloque `@media (prefers-color-scheme: dark)` que ajusta automáticamente todos los tokens de color. No necesitas hacer nada adicional.

Si prefieres controlar el modo oscuro manualmente con una clase:

```css
/* Desactiva el dark mode automático */
@media (prefers-color-scheme: dark) {
  :root {
    /* vuelve a los valores light */
    --hp-bg: #ffffff;
    --hp-text: #0f172a;
    /* ... */
  }
}

/* Aplica tus propios tokens oscuros */
.dark {
  --hp-bg: #0f172a;
  --hp-surface: #1e293b;
  --hp-text: #f8fafc;
  --hp-border: #334155;
  --hp-accent: #38bdf8;
}
```

---

## Especificidad mínima

Todos los selectores del paquete usan **un único selector de elemento** (`hp-button`, `hp-switch`, etc.), con especificidad `(0,0,1)`. Cualquier clase CSS de tu proyecto tiene precedencia automática:

```css
/* Esto SIEMPRE gana sobre los estilos base */
.my-custom-button {
  background-color: tomato;
  border-radius: 0;
}
```

El paquete no usa `!important` en ninguna regla (excepto `.hp-visually-hidden` en `base.css` por accesibilidad).

<style>
.token-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1.25rem 0 2rem;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-custom-block-bg);
}

.token-row {
  display: grid;
  grid-template-columns: 36px 1fr auto 2fr;
  align-items: center;
  gap: 0.75rem;
  padding: 0.375rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.875rem;
}

.token-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.token-swatch {
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  flex-shrink: 0;
}

.token-value {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.token-desc {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}

/* Radius swatches */
.radius-swatch {
  background: var(--vp-c-brand-1);
  opacity: 0.7;
}

/* Shadow swatches */
.shadow-row {
  grid-template-columns: 36px 1fr 3fr;
}

.shadow-swatch {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
</style>
