---
name: Project Architecture
description: Monorepo layout, CSS dual-layer system, and key package locations for headless-primitives
type: project
---

This is a pnpm monorepo for a headless Web Components library (vanilla Custom Elements, NO Lit despite the memory directory name).

## Key Paths

- `packages/vanilla/utils/src/base.css` — Layer 1: structural/functional CSS only
- `packages/vanilla/styles/src/theme.css` — Layer 2 tokens: all CSS Custom Properties
- `packages/vanilla/styles/src/*.css` — Per-component @styles files (button, tabs, dialog, etc.)
- `packages/vanilla/styles/src/index.css` — Barrel import for all @styles
- `apps/playground/src/style.css` — Full dark theme override demonstrating token usage
- `apps/playground/src/demos/*.css` — Per-component demo CSS files
- `apps/docs/guide/*.md` — User-facing documentation guides
- `apps/docs/components/*.md` — Per-component API docs

## CSS Layer Architecture

**Layer 1 — base.css** (`@headless-primitives/utils`):

- Structural layout, visibility, positioning, z-index, animations (@keyframes)
- Uses ONLY: `currentColor`, `Canvas`, `CanvasText`, `color-mix()` (no hardcoded colors)
- CSS Custom Properties: `--hp-z-index-*`, `--hp-focus-outline-*`, `--hp-duration-*`, `--hp-ease*`
- Contains a "minimum appearance" section (lines ~203+) as fallback when @styles not loaded
- Has a global `prefers-reduced-motion` block at the end

**Layer 2 — @styles** (`@headless-primitives/styles`):

- All decorative properties: colors, shadows, border-radius, typography scale
- Each component has its own CSS file; all consume tokens from theme.css
- No hardcoded values — all via CSS Custom Properties

## Selector Specificity Strategy

All library selectors use single element selectors (specificity 0,0,1). Consumer classes always win.
No `!important` except `.hp-visually-hidden` in base.css (a11y necessity).

## Data Attributes Used

- `[data-hp-panel][data-state="closed|open|selected|unselected"]` — for tabs/accordion/collapsible visibility
- `[data-hp-overlay-content][data-state="open|closed"]` — for dialog/popover/alert visibility
- `[data-hp-backdrop][data-state="open|closed"]` — for dialog backdrop visibility
- `[data-hp-tooltip-content][data-state="open|closed"]` — for tooltip visibility
- `[data-hp-component="switch|checkbox|radio"]` — for disabled pointer-events
- `hp-toast-container[data-position="top-right|top-left|..."]` — toast positioning

**Why:** The project is vanilla Custom Elements — no Shadow DOM, no Lit. Components manage ARIA + data attributes directly on the element.
