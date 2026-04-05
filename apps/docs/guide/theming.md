# Theming

`@headless-primitives/styles` es el paquete opcional de estilos base. Está construido enteramente sobre **CSS custom properties**, lo que te permite personalizar toda la apariencia visual cambiando únicamente variables en tu propio CSS, sin tocar el paquete.

Todos los tokens de color por defecto cumplen **WCAG 2.1 AA**:

- Texto normal → **4.5:1** mínimo (criterio 1.4.3)
- Componentes UI (bordes de checkbox, radio…) → **3:1** mínimo (criterio 1.4.11)
- Estados `disabled` → exentos por la excepción de 1.4.3

## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/styles
```

```bash [npm]
npm install @headless-primitives/styles
```

```bash [yarn]
yarn add @headless-primitives/styles
```

```bash [bun]
bun add @headless-primitives/styles
```

:::

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
  <div class="token-row header-row">
    <span></span>
    <strong>Token</strong>
    <strong>Valor (light)</strong>
    <strong>Contraste</strong>
    <strong>Usado en</strong>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #0369a1;"></span>
    <code>--hp-accent</code>
    <span class="token-value">#0369a1</span>
    <span class="token-badge pass">5.93:1 ✓</span>
    <span class="token-desc">Fondo activo + texto seleccionado</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #075985;"></span>
    <code>--hp-accent-hover</code>
    <span class="token-value">#075985</span>
    <span class="token-badge pass">7.56:1 ✓</span>
    <span class="token-desc">Estado hover del acento</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #0c4a6e;"></span>
    <code>--hp-accent-active</code>
    <span class="token-value">#0c4a6e</span>
    <span class="token-badge pass">10.4:1 ✓</span>
    <span class="token-desc">Estado active/pressed</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #0369a1; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; color:#fff;">Aa</span>
    <code>--hp-accent-foreground</code>
    <span class="token-value">#ffffff</span>
    <span class="token-badge pass">5.93:1 ✓</span>
    <span class="token-desc">Texto sobre fondo de acento</span>
  </div>
</div>

### Superficies

<div class="token-grid">
  <div class="token-row">
    <span class="token-swatch" style="background: #ffffff; border: 1px solid #e2e8f0;"></span>
    <code>--hp-bg</code>
    <span class="token-value">#ffffff</span>
    <span class="token-badge neutral">base</span>
    <span class="token-desc">Fondo base de la aplicación</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #f8fafc; border: 1px solid #e2e8f0;"></span>
    <code>--hp-bg-subtle</code>
    <span class="token-value">#f8fafc</span>
    <span class="token-badge neutral">base</span>
    <span class="token-desc">Fondo sutil para zonas en reposo</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #f1f5f9; border: 1px solid #e2e8f0;"></span>
    <code>--hp-bg-muted</code>
    <span class="token-value">#f1f5f9</span>
    <span class="token-badge neutral">base</span>
    <span class="token-desc">Fondo hover de botones y triggers</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #ffffff; border: 1px solid #e2e8f0;"></span>
    <code>--hp-surface</code>
    <span class="token-value">#ffffff</span>
    <span class="token-badge neutral">base</span>
    <span class="token-desc">Fondo de componentes (cards, dialogs)</span>
  </div>
</div>

### Bordes

> `--hp-border` es para separadores visuales no interactivos (líneas, dividers).
> `--hp-border-strong` es para bordes que definen un componente interactivo (checkbox, radio, input) y debe superar el ratio de no-texto 3:1.

<div class="token-grid">
  <div class="token-row">
    <span class="token-swatch" style="background: #e2e8f0;"></span>
    <code>--hp-border</code>
    <span class="token-value">#e2e8f0</span>
    <span class="token-badge neutral">divider</span>
    <span class="token-desc">Borde de separación visual (non-interactive)</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #64748b;"></span>
    <code>--hp-border-strong</code>
    <span class="token-value">#64748b</span>
    <span class="token-badge pass">4.76:1 ✓</span>
    <span class="token-desc">Borde de componentes interactivos</span>
  </div>
</div>

### Texto

<div class="token-grid">
  <div class="token-row">
    <span class="token-swatch" style="background: #0f172a;"></span>
    <code>--hp-text</code>
    <span class="token-value">#0f172a</span>
    <span class="token-badge pass">18.1:1 ✓</span>
    <span class="token-desc">Texto primario</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #64748b;"></span>
    <code>--hp-text-secondary</code>
    <span class="token-value">#64748b</span>
    <span class="token-badge pass">4.76:1 ✓</span>
    <span class="token-desc">Texto secundario y labels</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #94a3b8;"></span>
    <code>--hp-text-disabled</code>
    <span class="token-value">#94a3b8</span>
    <span class="token-badge exempt">exento</span>
    <span class="token-desc">Texto disabled (WCAG 1.4.3 excepción)</span>
  </div>
</div>

### Radio de borde

<div class="token-grid radius-grid">
  <div class="token-row">
    <span class="token-swatch radius-swatch" style="border-radius: 4px;"></span>
    <code>--hp-radius-sm</code>
    <span class="token-value">4px</span>
    <span class="token-badge neutral">—</span>
    <span class="token-desc">Checkboxes, tags</span>
  </div>
  <div class="token-row">
    <span class="token-swatch radius-swatch" style="border-radius: 6px;"></span>
    <code>--hp-radius</code>
    <span class="token-value">6px</span>
    <span class="token-badge neutral">—</span>
    <span class="token-desc">Botones, inputs</span>
  </div>
  <div class="token-row">
    <span class="token-swatch radius-swatch" style="border-radius: 8px;"></span>
    <code>--hp-radius-md</code>
    <span class="token-value">8px</span>
    <span class="token-badge neutral">—</span>
    <span class="token-desc">Cards, dialogs, toasts</span>
  </div>
  <div class="token-row">
    <span class="token-swatch radius-swatch" style="border-radius: 12px;"></span>
    <code>--hp-radius-lg</code>
    <span class="token-value">12px</span>
    <span class="token-badge neutral">—</span>
    <span class="token-desc">Modales, popovers</span>
  </div>
  <div class="token-row">
    <span class="token-swatch radius-swatch" style="border-radius: 9999px;"></span>
    <code>--hp-radius-full</code>
    <span class="token-value">9999px</span>
    <span class="token-badge neutral">—</span>
    <span class="token-desc">Switch, avatar, pills</span>
  </div>
</div>

### Sombras

<div class="token-grid">
  <div class="token-row shadow-row">
    <span class="token-swatch shadow-swatch" style="box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);"></span>
    <code>--hp-shadow-sm</code>
    <span class="token-desc">Sutil — hover states</span>
  </div>
  <div class="token-row shadow-row">
    <span class="token-swatch shadow-swatch" style="box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);"></span>
    <code>--hp-shadow</code>
    <span class="token-desc">Base — cards, botones elevados</span>
  </div>
  <div class="token-row shadow-row">
    <span class="token-swatch shadow-swatch" style="box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);"></span>
    <code>--hp-shadow-md</code>
    <span class="token-desc">Media — popovers</span>
  </div>
  <div class="token-row shadow-row">
    <span class="token-swatch shadow-swatch" style="box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);"></span>
    <code>--hp-shadow-lg</code>
    <span class="token-desc">Fuerte — dialogs, toasts</span>
  </div>
</div>

### Error y Backdrop

<div class="token-grid">
  <div class="token-row header-row">
    <span></span>
    <strong>Token</strong>
    <strong>Valor (light)</strong>
    <strong>Contraste</strong>
    <strong>Usado en</strong>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: #dc2626;"></span>
    <code>--hp-text-error</code>
    <span class="token-value">#dc2626</span>
    <span class="token-badge pass">5.93:1 ✓</span>
    <span class="token-desc">Mensajes de error en hp-field-error</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="background: rgb(0 0 0 / 0.5);"></span>
    <code>--hp-backdrop-bg</code>
    <span class="token-value">rgb(0 0 0 / 0.5)</span>
    <span class="token-badge neutral">—</span>
    <span class="token-desc">Fondo del backdrop en dialogs (dark: 0.65)</span>
  </div>
</div>

### Foco y Z-indexes (de `base.css`)

<div class="token-grid">
  <div class="token-row">
    <span class="token-swatch" style="background: #2563eb;"></span>
    <code>--hp-focus-outline-color</code>
    <span class="token-value">#2563eb</span>
    <span class="token-badge pass">5.12:1 ✓</span>
    <span class="token-desc">Color del anillo de foco</span>
  </div>
  <div class="token-row">
    <span class="token-swatch" style="border: 2px solid #94a3b8; background: transparent;"></span>
    <code>--hp-focus-outline-width</code>
    <span class="token-value">2px</span>
    <span class="token-badge neutral">—</span>
    <span class="token-desc">Grosor del anillo de foco</span>
  </div>
</div>

| Token                          | Valor  | Usado en                                  |
| ------------------------------ | ------ | ----------------------------------------- |
| `--hp-z-index-backdrop`        | `1000` | `hp-dialog-backdrop`                      |
| `--hp-z-index-overlay-content` | `1100` | `hp-dialog-content`, `hp-toast-container` |
| `--hp-z-index-popover`         | `1200` | `hp-popover-content`                      |
| `--hp-z-index-tooltip`         | `1300` | `hp-tooltip-content`                      |

---

## Tokens en Dark Mode

En dark mode los tokens se ajustan automáticamente vía `@media (prefers-color-scheme: dark)`.

| Token                    | Valor dark            | Contraste                            |
| ------------------------ | --------------------- | ------------------------------------ |
| `--hp-accent`            | `#38bdf8` (sky-400)   | 8.96:1 vs bg ✓ / 6.22:1 vs surface ✓ |
| `--hp-accent-foreground` | `#0c1a29`             | 8.54:1 vs accent ✓                   |
| `--hp-text`              | `#f8fafc`             | 17.6:1 vs bg ✓                       |
| `--hp-text-secondary`    | `#94a3b8` (slate-400) | 7.63:1 vs bg ✓ / 5.31:1 vs surface ✓ |
| `--hp-border-strong`     | `#64748b` (slate-500) | 4.60:1 vs bg ✓ / 3.20:1 vs surface ✓ |

---

## Personalizar el tema

### Cambiar el color de acento

Al cambiar el acento debes asegurarte de mantener el ratio 4.5:1 contra los fondos donde aparezca como texto, y que el `accent-foreground` tenga 4.5:1 contra el nuevo acento.

```css
:root {
  --hp-accent: #7c3aed; /* violet-700  →  5.08:1 vs blanco ✓ */
  --hp-accent-hover: #6d28d9; /* violet-800 */
  --hp-accent-active: #5b21b6; /* violet-900 */
  --hp-accent-foreground: #ffffff; /* 5.08:1 ✓ */
  --hp-focus-outline-color: #7c3aed;
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
  --hp-accent: #d97706; /* amber-600 → 4.54:1 vs blanco ✓ */
  --hp-border-strong: #92400e; /* amber-800 */
}
```

---

## Dark Mode

El paquete incluye un bloque `@media (prefers-color-scheme: dark)` que ajusta automáticamente todos los tokens de color. No necesitas hacer nada adicional.

Si prefieres controlar el modo oscuro manualmente con una clase:

```css
/* Desactiva el dark mode automático sobreescribiendo los tokens */
@media (prefers-color-scheme: dark) {
  :root {
    --hp-bg: #ffffff;
    --hp-surface: #ffffff;
    --hp-text: #0f172a;
    /* ... resto de tokens light */
  }
}

/* Aplica dark mode con tu propia clase */
.dark {
  --hp-bg: #0f172a;
  --hp-surface: #1e293b;
  --hp-text: #f8fafc;
  --hp-border: #334155;
  --hp-border-strong: #64748b;
  --hp-accent: #38bdf8;
  --hp-accent-foreground: #0c1a29;
  --hp-text-secondary: #94a3b8;
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

/* O redefinir tokens en tu selector raíz */
:root {
  --hp-accent: #e11d48; /* rose-600 → 4.65:1 vs blanco ✓ */
}
```

El paquete no usa `!important` en ninguna regla (excepto `.hp-visually-hidden` en `base.css` por accesibilidad).

<style>
.token-grid {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 1.25rem 0 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-custom-block-bg);
  overflow: hidden;
}

.token-row {
  display: grid;
  grid-template-columns: 36px 1fr auto auto 2fr;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.875rem;
}

.token-row.header-row {
  background: var(--vp-c-bg-soft);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.token-row:last-child {
  border-bottom: none;
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

.token-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 7px;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
}

.token-badge.pass {
  background: rgba(16, 185, 129, 0.12);
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.token-badge.exempt {
  background: rgba(245, 158, 11, 0.12);
  color: #d97706;
  border: 1px solid rgba(245, 158, 11, 0.25);
}

.token-badge.neutral {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.token-desc {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}

/* Radius swatches */
.token-grid.radius-grid .token-row {
  grid-template-columns: 36px 1fr auto auto 2fr;
}

.radius-swatch {
  background: var(--vp-c-brand-1);
  opacity: 0.7;
}

/* Shadow swatches */
.shadow-row {
  grid-template-columns: 36px 1fr 2fr !important;
}

.shadow-swatch {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
</style>
