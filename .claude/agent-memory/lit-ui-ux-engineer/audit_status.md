---
name: Audit Status
description: CSS architecture audit results and fix status for each file in headless-primitives
type: project
---

## Audit completed: 2026-04-05

### Issues found and FIXED

**packages/vanilla/utils/src/base.css**

- [FIXED] 5x raw `rgba()` shadow values replaced with `var(--hp-shadow-*, fallback)` pattern
- [FIXED] `rgba(0,0,0,0.4)` backdrop background replaced with `var(--hp-backdrop-bg, rgb(0 0 0 / 0.4))`
- [FIXED] Added global `prefers-reduced-motion` block at end of file (was missing entirely)

**packages/vanilla/styles/src/theme.css**

- [FIXED] Added `--hp-text-error` token (#dc2626 light / #f87171 dark, both WCAG AA compliant)
- [FIXED] Added `--hp-backdrop-bg` token (rgb(0 0 0 / 0.5) light / rgb(0 0 0 / 0.65) dark)

**packages/vanilla/styles/src/field.css**

- [FIXED] Hardcoded `color: #dc2626` and dark-mode `color: #f87171` replaced with `var(--hp-text-error)`
- [FIXED] Dark-mode override block removed (now handled by theme.css token)
- [FIXED] Added `prefers-reduced-motion` block

**packages/vanilla/styles/src/dialog.css**

- [FIXED] `background-color: rgb(0 0 0 / 0.5)` replaced with `var(--hp-backdrop-bg)`
- [FIXED] Added `prefers-reduced-motion` block

**packages/vanilla/styles/src/toast.css**

- [FIXED] Added `prefers-reduced-motion` block

**packages/vanilla/styles/src/tooltip.css**

- [FIXED] Added `prefers-reduced-motion` block

**packages/vanilla/styles/src/popover.css**

- [FIXED] Added `prefers-reduced-motion` block

**packages/vanilla/styles/src/button.css**

- [FIXED] Added `prefers-reduced-motion` block

**packages/vanilla/styles/src/switch.css**

- [FIXED] Added `prefers-reduced-motion` block (covers both track and ::after thumb)

**packages/vanilla/styles/src/checkbox.css**

- [FIXED] Added `prefers-reduced-motion` block

**packages/vanilla/styles/src/radio.css**

- [FIXED] Added `prefers-reduced-motion` block

**packages/vanilla/styles/src/toggle-group.css**

- [FIXED] Added `prefers-reduced-motion` block

**packages/vanilla/styles/src/tabs.css**

- [FIXED] Added `prefers-reduced-motion` block

**packages/vanilla/styles/src/accordion.css**

- [FIXED] Added `prefers-reduced-motion` block

**packages/vanilla/styles/src/collapsible.css**

- [FIXED] Added `prefers-reduced-motion` block

**packages/vanilla/styles/src/atoms.css**

- [FIXED] Added `prefers-reduced-motion` block (progress indicator animation disabled, shows at 100% opacity 0.5)

**apps/playground/src/demos/tooltip.css**

- [FIXED] Hardcoded `#1f2937` replaced with `var(--hp-text, #1f2937)` (fallback preserved)
- [FIXED] z-index hardcode replaced with `var(--hp-z-index-tooltip, 1300)`
- [FIXED] Shadow replaced with `var(--hp-shadow-md, ...)`
- [FIXED] Added `prefers-reduced-motion` block

**apps/playground/src/demos/toast.css**

- [FIXED] Hardcoded `#1e293b`, `#334155`, `#f8fafc` replaced with token vars + fallbacks
- [FIXED] `rgba()` shadow replaced with `var(--hp-shadow-lg, ...)`

### Documentation created

- `apps/docs/guide/base-css.md` — New: full structural layer guide
- `apps/docs/guide/styles-theming.md` — New: complete @styles token reference
- `apps/docs/guide/styling.md` — Updated: links to both new guides
- `apps/docs/guide/theming.md` — Updated: new `--hp-text-error` and `--hp-backdrop-bg` token rows
- `packages/vanilla/styles/README.md` — Updated: new token rows
- `apps/docs/.vitepress/config.ts` — Updated: new sidebar entries for both new guides

### Theme Builder added (2026-04-05)

- `apps/docs/.vitepress/theme/components/ThemeBuilder.vue` — New: full interactive Theme Builder Vue component
  - 10 token groups (Accent, Surfaces, Text, Borders, Radius, Shadows, Typography, Spacing, Motion, Focus/Overlay)
  - All 40+ --hp-\* tokens editable via color pickers, text inputs, sliders
  - Live preview pane with all 14 components (Button, Checkbox, Radio, Switch, Progress, Separator, Avatar, ToggleGroup, Tabs, Accordion, Collapsible, Field, Tooltip, Popover, Toast, Dialog, AlertDialog)
  - "Copy full CSS" button and overrides-only panel
  - Reset all / Reset group / Reset single token actions
  - Preview styles use --hp-\* tokens so changes reflect immediately
  - Comment block in template documents how to add new components
- `apps/docs/guide/theme-builder.md` — New: page wrapping ThemeBuilder with <ClientOnly>, usage guide, "Adding a new component" section
- `apps/docs/.vitepress/config.ts` — Updated: Theme Builder entry in sidebar under Guias
- `apps/docs/.vitepress/theme/index.ts` — Updated: ThemeBuilder registered as global Vue component
- `apps/docs/guide/styles-theming.md` — Updated: cross-link to Theme Builder
- `apps/docs/guide/styling.md` — Updated: cross-link to Theme Builder

### Still clean (no issues found)

- `packages/vanilla/styles/src/button.css` — fully token-based
- `packages/vanilla/styles/src/accordion.css` — fully token-based
- `packages/vanilla/styles/src/collapsible.css` — fully token-based
- `packages/vanilla/styles/src/tabs.css` — fully token-based
- `packages/vanilla/styles/src/toggle-group.css` — fully token-based
- `packages/vanilla/styles/src/checkbox.css` — fully token-based
- `packages/vanilla/styles/src/radio.css` — fully token-based
- `packages/vanilla/styles/src/switch.css` — fully token-based
- `packages/vanilla/styles/src/popover.css` — fully token-based (after fix)
- `packages/vanilla/styles/src/atoms.css` — fully token-based

### Enhanced: 2026-04-10

**packages/vanilla/styles/src/stepper.css**

- [FIXED] Hardcoded `color: #ffffff` in active/completed `::before` states and dark-mode block replaced with `var(--hp-accent-foreground)`
- [FIXED] Hardcoded `font-size: 0.75rem` on `::before` replaced with `var(--hp-font-size-xs)`
- [FIXED] Hardcoded `border-radius: 4px` on focus-visible replaced with `var(--hp-radius-sm)`
- [ADDED] `scale` transition on `::before` pseudo-element: active state pulses to `1.1`, pending hover nudges to `1.05`, completed stays at `1`; uses separate `--hp-stepper-indicator-pop` timing token
- [ADDED] Connector line `transition: background` for fill effect on both horizontal and vertical connectors; uses `--hp-stepper-connector-transition` token
- [ADDED] `@starting-style` panel fade-in: `[data-hp-stepper-panel][data-state="active"]` transitions from `opacity: 0` to `1`; uses `--hp-stepper-panel-transition` token
- [ADDED] Navigation button `:active` state with `translate: 0 1px` (press-down) complementing hover's `translate: 0 -1px` (lift)
- [ADDED] `opacity` and `translate` to nav button `transition` list
- [ADDED] Four overridable component-level timing tokens: `--hp-stepper-transition`, `--hp-stepper-indicator-pop`, `--hp-stepper-connector-transition`, `--hp-stepper-panel-transition`
- [UPDATED] `prefers-reduced-motion` block: resets all new `scale` values to `1`, disables panel `transition`, and overrides `@starting-style` so panel appears immediately at `opacity: 1`

### Full rewrite: 2026-04-11

**packages/vanilla/styles/src/toolbar.css**

- [FIXED] Removed duplicate layout rules (`display`, `flex-direction`, `align-items`, `gap`) already owned by `base.css`
- [FIXED] Removed no-op dark mode block (was reassigning same token values — dark mode is automatic via `theme.css`)
- [FIXED] Hardcoded fallback hex `#2563eb` in `focus-visible` removed — now only references `--hp-focus-outline-color`
- [ADDED] Full component token block: `--hp-toolbar-gap`, `--hp-toolbar-padding`, `--hp-toolbar-bg`, `--hp-toolbar-border-color`, `--hp-toolbar-radius`, `--hp-toolbar-item-radius`, `--hp-toolbar-item-height`, `--hp-toolbar-item-padding`, `--hp-toolbar-separator-color`
- [ADDED] Item base styles for `button`, `a[href]`, `[role="button"]`, `[role="checkbox"]`, `[role="radio"]`: height 2rem, transparent border, `--hp-text-secondary`, transition on bg/border/color
- [ADDED] Hover state: `--hp-bg-muted` bg + `--hp-text` color (excludes disabled and already-pressed)
- [ADDED] Pressed state `[aria-pressed="true"]`: `--hp-bg-muted` bg + `--hp-border` border + `--hp-text` color
- [ADDED] Accent pressed variant `[data-variant="accent"][aria-pressed="true"]`: 10% accent bg via `color-mix`, accent border, accent text
- [ADDED] Disabled state: `--hp-opacity-disabled`, `cursor: not-allowed`, `pointer-events: none`
- [ADDED] Input styles (`input[type="search"]`, `input[type="text"]`): height, border, radius, font; focus: accent border + ring via `color-mix`
- [ADDED] `[role="group"] { display: contents }` — groups transparent to toolbar flex layout
- [ADDED] `prefers-reduced-motion` block covering all item types and inputs

### Known acceptable patterns

- `apps/playground/src/demos/*.css` may use `var(--hp-*, hardcoded-fallback)` syntax — this is correct
- `base.css` uses `Canvas`, `CanvasText`, `currentColor`, `color-mix()` — these are CSS system keywords, not hardcoded colors
- `base.css` "minimum appearance" section (~lines 203-780) is intentional: provides zero-dependency fallback when @styles is not loaded
