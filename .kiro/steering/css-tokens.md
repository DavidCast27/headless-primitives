---
inclusion: auto
description: Referencia completa de tokens --hp-*, reglas de uso, fallbacks en demos, WCAG y tokens semánticos para el sistema de diseño.
---

# Tokens CSS — headless-primitives

Todos los tokens usan el prefijo `--hp-` ("headless primitives"). Definidos en `packages/vanilla/styles/src/theme.css`.

## Tokens de color

```css
/* Accent */
--hp-accent              /* color primario de marca/acción */
--hp-accent-hover        /* estado hover */
--hp-accent-active       /* estado active */
--hp-accent-foreground   /* texto/icono sobre fondos accent */

/* Fondos */
--hp-bg                  /* fondo de página */
--hp-bg-subtle           /* zonas sutiles */
--hp-bg-muted            /* áreas de hover */
--hp-surface             /* superficie de componente */
--hp-surface-raised      /* superficie elevada */

/* Bordes */
--hp-border              /* bordes divisores no interactivos */
--hp-border-strong       /* bordes de componentes interactivos (WCAG 3:1) */

/* Texto */
--hp-text                /* texto primario */
--hp-text-secondary      /* texto secundario/muted */
--hp-text-disabled       /* texto deshabilitado (exento WCAG) */
--hp-text-on-accent      /* texto sobre fondos accent */
--hp-text-error          /* mensajes de error (#dc2626 light / #f87171 dark) */

/* Overlay */
--hp-backdrop-bg         /* color del backdrop de overlay */
```

## Tokens estructurales (en base.css)

```css
/* Z-index */
--hp-z-index-backdrop: 1000 --hp-z-index-overlay-content: 1100 --hp-z-index-popover: 1200
  --hp-z-index-tooltip: 1300 /* Focus */ --hp-focus-outline-color: #2563eb
  --hp-focus-outline-width: 2px /* Duración */ --hp-duration-fast: 100ms --hp-duration: 150ms
  --hp-duration-slow: 200ms --hp-ease: ease --hp-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
```

## Tokens de escala

```css
/* Radius */
--hp-radius-sm: 4px --hp-radius: 6px --hp-radius-md: 8px --hp-radius-lg: 12px
  --hp-radius-full: 9999px /* Sombras */ --hp-shadow-sm / --hp-shadow / --hp-shadow-md /
  --hp-shadow-lg /* Tipografía */ --hp-font-size-xs: 0.75rem --hp-font-size-sm: 0.875rem
  --hp-font-size-base: 1rem --hp-font-size-lg: 1.125rem --hp-font-weight-normal: 400
  --hp-font-weight-medium: 500 --hp-font-weight-semibold: 600 /* Espaciado */ --hp-space-1: 0.25rem
  --hp-space-2: 0.5rem --hp-space-3: 0.75rem --hp-space-4: 1rem /* Transiciones */
  --hp-transition-fast: 100ms ease --hp-transition: 150ms ease --hp-transition-slow: 200ms ease
  /* Misc */ --hp-opacity-disabled: 0.5;
```

## Reglas de uso

- **Prohibido en `@styles`**: hex crudos, px crudos, valores de timing crudos — siempre referenciar un token `--hp-*`
- **En archivos de demo** (`apps/playground/src/demos/*.css`): usar `var(--hp-token, fallback-hardcodeado)` es CORRECTO — el fallback solo activa si el token no está definido
- **Naming**: `--hp-<role>` para tokens de tema, `--hp-<componente>-<propiedad>` para overrides específicos de componente

## Objetivos WCAG

- Texto normal: 4.5:1 mínimo (WCAG 1.4.3 AA)
- Bordes de componentes UI (checkbox, radio, input): 3:1 mínimo (WCAG 1.4.11)
- Estados disabled: exentos de requisitos de contraste (excepción WCAG 1.4.3)

## Tokens semánticos (success/warning/danger/info)

Si un componente tiene variantes semánticas, los tokens deben **definirse en `theme.css`** (no solo usarse como fallbacks). Añadir a `:root` en light Y dark:

```css
--hp-color-success-bg: #f0fdf4;
--hp-color-success: #16a34a;
--hp-color-success-border: #bbf7d0;
/* dark: */
--hp-color-success-bg: #052e16;
--hp-color-success: #4ade80;
```

También añadir el grupo de tokens en `TOKEN_GROUPS` de `ThemeBuilder.vue`.

## Tokens de componente específicos

Algunos componentes exponen tokens para personalización sin necesidad de sobreescribir selectores:

```css
/* Scroll Area */
--hp-scroll-area-scrollbar-size: 8px /* ancho del scrollbar vertical / alto del horizontal */;
```

Estos tokens se usan directamente en `packages/vanilla/styles/src/<componente>.css` y el consumidor puede sobreescribirlos en su propio CSS.
