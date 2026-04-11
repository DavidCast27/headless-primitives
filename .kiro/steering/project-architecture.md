---
inclusion: auto
description: Arquitectura del monorepo, rutas clave, sistema CSS de dos capas (base.css + @styles) y data attributes usados en headless-primitives.
---

# Arquitectura del Proyecto — headless-primitives

Monorepo pnpm de una librería de Web Components headless (Lit 3 + HeadlessElement, Light DOM, sin Shadow DOM).

## Rutas clave

- `packages/vanilla/utils/src/base.css` — Capa 1: CSS estructural/funcional únicamente
- `packages/vanilla/styles/src/theme.css` — Tokens CSS (`--hp-*`)
- `packages/vanilla/styles/src/*.css` — CSS por componente del paquete `@styles`
- `packages/vanilla/styles/src/index.css` — Barrel import de todos los `@styles`
- `apps/playground/src/style.css` — Override completo dark theme (demuestra uso de tokens)
- `apps/playground/src/demos/*.css` — CSS de demo por componente
- `apps/docs/components/*.md` — Docs de API por componente
- `apps/docs/guide/*.md` — Guías de usuario

## Arquitectura CSS en dos capas

### Capa 1 — base.css (`@headless-primitives/utils`)

- Layout estructural, visibilidad, posicionamiento, z-index, animaciones (`@keyframes`)
- Usa SOLO: `currentColor`, `Canvas`, `CanvasText`, `color-mix()` — sin colores hardcodeados
- Custom Properties: `--hp-z-index-*`, `--hp-focus-outline-*`, `--hp-duration-*`, `--hp-ease*`
- Contiene sección "apariencia mínima" (~línea 203+) como fallback cuando `@styles` no está cargado — es INTENCIONAL, no es deuda técnica
- Bloque global `prefers-reduced-motion` al final

### Capa 2 — @styles (`@headless-primitives/styles`)

- Todas las propiedades decorativas: colores, sombras, border-radius, tipografía
- Cada componente tiene su propio archivo CSS; todos consumen tokens de `theme.css`
- Sin valores hardcodeados — todo via CSS Custom Properties `--hp-*`

## Estrategia de especificidad

Todos los selectores de la librería usan selectores de elemento único (especificidad 0,0,1). Las clases del consumidor siempre ganan. Sin `!important` excepto `.hp-visually-hidden` en base.css (necesidad a11y).

## Data attributes usados

- `[data-hp-panel][data-state="closed|open|selected|unselected"]` — tabs/accordion/collapsible
- `[data-hp-overlay-content][data-state="open|closed"]` — dialog/popover/alert
- `[data-hp-backdrop][data-state="open|closed"]` — backdrop de dialog
- `[data-hp-tooltip-content][data-state="open|closed"]` — tooltip
- `[data-hp-component="switch|checkbox|radio"]` — pointer-events disabled
- `hp-toast-container[data-position="top-right|..."]` — posicionamiento de toast

## Regla de decisión de capa

- Layout/visibilidad/posicionamiento/z-index/animaciones → `base.css`
- Color/sombra/radius/tipografía/transiciones decorativas → `@styles`
- Transiciones de opacidad/visibilidad para show-hide → `base.css`
- Transiciones de color/bg → `@styles`
