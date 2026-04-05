# @styles Theming Layer

`@headless-primitives/styles` is the **optional visual layer** on top of `base.css`. It provides the complete token system, brand colors, dark mode, shadows, typography scale, and all interactive states (hover, focus, pressed, disabled).

## Architecture overview

```
┌─────────────────────────────────────────────────────────────┐
│  Your CSS / Tailwind                                         │
│  Override tokens or add classes — always wins               │
├─────────────────────────────────────────────────────────────┤
│  @headless-primitives/styles  (this layer)                  │
│  theme.css   ← all CSS custom properties live here          │
│  button.css, tabs.css, …  ← consume tokens from theme.css   │
├─────────────────────────────────────────────────────────────┤
│  @headless-primitives/utils/base.css                        │
│  Layout · Show/hide · Positioning · Animations              │
└─────────────────────────────────────────────────────────────┘
```

`@styles` overrides `base.css` where necessary (e.g., replacing `currentColor` fallbacks with proper token-based colors) and adds entirely new visual states.

---

## Installation

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

## Import

```css
/* Everything at once */
@import "@headless-primitives/styles/index.css";

/* Selective — theme.css must always come first */
@import "@headless-primitives/styles/theme.css";
@import "@headless-primitives/styles/button.css";
@import "@headless-primitives/styles/dialog.css";
```

---

## Complete Token Reference

All properties are defined on `:root` in `theme.css`. They automatically switch for dark mode via `@media (prefers-color-scheme: dark)`. You can override any of them at any selector scope.

### Accent (Brand Color)

The accent controls the "selected" and "active" visual state across all interactive components: switches, checkboxes, radios, tabs, pressed buttons.

| Token                    | Light default | Dark default | WCAG ratio                     | Used in                                   |
| ------------------------ | ------------- | ------------ | ------------------------------ | ----------------------------------------- |
| `--hp-accent`            | `#0369a1`     | `#38bdf8`    | 5.93:1 (light) / 8.96:1 (dark) | Switch on, checkbox checked, tab selected |
| `--hp-accent-hover`      | `#075985`     | `#7dd3fc`    | 7.56:1 / —                     | Hover over accent-colored elements        |
| `--hp-accent-active`     | `#0c4a6e`     | `#bae6fd`    | 10.4:1 / —                     | Active/pressed state                      |
| `--hp-accent-foreground` | `#ffffff`     | `#0c1a29`    | —                              | Text/icons on top of accent backgrounds   |

Override example — change the entire accent to violet:

```css
:root {
  --hp-accent: #7c3aed; /* violet-700 → 5.08:1 vs white ✓ */
  --hp-accent-hover: #6d28d9; /* violet-800 */
  --hp-accent-active: #5b21b6; /* violet-900 */
  --hp-accent-foreground: #ffffff;
  --hp-focus-outline-color: #7c3aed; /* match the accent */
}
```

---

### Surfaces

Background colors for different layers of the UI hierarchy.

| Token                 | Light default | Dark default | Used in                                              |
| --------------------- | ------------- | ------------ | ---------------------------------------------------- |
| `--hp-bg`             | `#ffffff`     | `#0f172a`    | Page background                                      |
| `--hp-bg-subtle`      | `#f8fafc`     | `#1e293b`    | Zones in resting state                               |
| `--hp-bg-muted`       | `#f1f5f9`     | `#334155`    | Button hover backgrounds, progress track             |
| `--hp-surface`        | `#ffffff`     | `#1e293b`    | Component surfaces (button, checkbox, dialog, toast) |
| `--hp-surface-raised` | `#ffffff`     | `#293548`    | Elevated surfaces (dropdowns above surface)          |

---

### Borders

Two distinct border semantic roles:

| Token                | Light default | Dark default | WCAG                | Used in                                        |
| -------------------- | ------------- | ------------ | ------------------- | ---------------------------------------------- |
| `--hp-border`        | `#e2e8f0`     | `#334155`    | — (non-interactive) | Dividers, card edges, accordion separators     |
| `--hp-border-strong` | `#64748b`     | `#64748b`    | 4.76:1 / 3.20:1     | Checkbox borders, radio borders, input borders |

> `--hp-border` is for **visual separators** (non-interactive). It does not need to pass the 3:1 UI component ratio.
> `--hp-border-strong` is for **interactive component borders** (checkbox, radio, input). It must pass 3:1 non-text contrast (WCAG 1.4.11).

---

### Text

| Token                 | Light default | Dark default | WCAG ratio          | Used in                                               |
| --------------------- | ------------- | ------------ | ------------------- | ----------------------------------------------------- |
| `--hp-text`           | `#0f172a`     | `#f8fafc`    | 18.1:1 / 17.6:1     | Primary text, labels                                  |
| `--hp-text-secondary` | `#64748b`     | `#94a3b8`    | 4.76:1 / 5.31:1     | Secondary text, descriptions, toggle labels           |
| `--hp-text-disabled`  | `#94a3b8`     | `#475569`    | exempt (WCAG 1.4.3) | Disabled state text                                   |
| `--hp-text-on-accent` | `#ffffff`     | `#0c1a29`    | —                   | Aliases `--hp-accent-foreground` for semantic clarity |
| `--hp-text-error`     | `#dc2626`     | `#f87171`    | 5.93:1 / 6.04:1     | `hp-field-error` messages                             |

---

### Border Radius

| Token              | Value    | Used in                                   |
| ------------------ | -------- | ----------------------------------------- |
| `--hp-radius-sm`   | `4px`    | Checkboxes, tags, small close buttons     |
| `--hp-radius`      | `6px`    | Buttons, inputs, popovers                 |
| `--hp-radius-md`   | `8px`    | Cards, dialogs triggers, toasts           |
| `--hp-radius-lg`   | `12px`   | Modals (`hp-dialog-content`)              |
| `--hp-radius-full` | `9999px` | Switch track, avatar, progress bar, pills |

Override example — square/sharp corners (enterprise style):

```css
:root {
  --hp-radius-sm: 2px;
  --hp-radius: 3px;
  --hp-radius-md: 4px;
  --hp-radius-lg: 6px;
}
```

---

### Shadows

| Token            | Value                           | Used in            |
| ---------------- | ------------------------------- | ------------------ |
| `--hp-shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Switch thumb       |
| `--hp-shadow`    | `0 1px 3px … 0 1px 2px …`       | Elevated buttons   |
| `--hp-shadow-md` | `0 4px 6px … 0 2px 4px …`       | Tooltips, popovers |
| `--hp-shadow-lg` | `0 10px 15px … 0 4px 6px …`     | Dialogs, toasts    |

Dark mode adjusts shadow opacity upward (e.g., `0.4` instead of `0.1`) automatically.

---

### Backdrop

| Token              | Light default      | Dark default        | Used in                                     |
| ------------------ | ------------------ | ------------------- | ------------------------------------------- |
| `--hp-backdrop-bg` | `rgb(0 0 0 / 0.5)` | `rgb(0 0 0 / 0.65)` | `hp-dialog-backdrop`, alert dialog backdrop |

Override to disable blur:

```css
:root {
  --hp-backdrop-bg: rgb(0 0 0 / 0.3);
}

hp-dialog-backdrop {
  backdrop-filter: none;
}
```

---

### Typography

| Token                       | Value      | Used in                                         |
| --------------------------- | ---------- | ----------------------------------------------- |
| `--hp-font-size-xs`         | `0.75rem`  | Toast description, field error, avatar fallback |
| `--hp-font-size-sm`         | `0.875rem` | Default body text for all components            |
| `--hp-font-size-base`       | `1rem`     | Inherited from document                         |
| `--hp-font-size-lg`         | `1.125rem` | Dialog title                                    |
| `--hp-font-weight-normal`   | `400`      | Default weight                                  |
| `--hp-font-weight-medium`   | `500`      | Labels, buttons, triggers                       |
| `--hp-font-weight-semibold` | `600`      | Dialog title, toast title, avatar initials      |

---

### Spacing

| Token          | Value     | Used in                                         |
| -------------- | --------- | ----------------------------------------------- |
| `--hp-space-1` | `0.25rem` | Very tight gaps (toast title margin)            |
| `--hp-space-2` | `0.5rem`  | Small padding (radio group gap, toggle padding) |
| `--hp-space-3` | `0.75rem` | Medium padding (accordion trigger, collapsible) |
| `--hp-space-4` | `1rem`    | Standard padding (dialog, tab panels, toast)    |

---

### Transitions

| Token                  | Value        | Used in                         |
| ---------------------- | ------------ | ------------------------------- |
| `--hp-transition-fast` | `100ms ease` | Tooltip show/hide               |
| `--hp-transition`      | `150ms ease` | Default interactive transitions |
| `--hp-transition-slow` | `200ms ease` | Dialog and toast entrance       |

---

### Opacity

| Token                   | Value | Used in                           |
| ----------------------- | ----- | --------------------------------- |
| `--hp-opacity-disabled` | `0.5` | All disabled interactive elements |

---

### Focus Outline (shared with `base.css`)

| Token                      | Default   | Dark default | Description                                            |
| -------------------------- | --------- | ------------ | ------------------------------------------------------ |
| `--hp-focus-outline-color` | `#2563eb` | `#38bdf8`    | Focus ring color — override to match your brand accent |
| `--hp-focus-outline-width` | `2px`     | same         | Thickness of the focus ring                            |

---

## Per-Component Visual API

### `hp-button`

Reads from:

```
--hp-text            → default text color
--hp-surface         → default background
--hp-border          → default border
--hp-bg-muted        → hover background
--hp-border-strong   → hover border
--hp-bg-subtle       → active background
--hp-accent          → pressed state background
--hp-accent-hover    → pressed state hover
--hp-accent-foreground → pressed state text
--hp-opacity-disabled → disabled opacity
--hp-focus-outline-color / --hp-focus-outline-width → focus ring
--hp-transition      → all state transitions
--hp-radius          → border radius
--hp-font-size-sm    → font size
--hp-font-weight-medium → font weight
```

Custom override example:

```css
/* Danger button variant */
.btn-danger {
  background: var(--hp-text-error);
  color: white;
  border-color: var(--hp-text-error);
}
.btn-danger:hover:not([disabled]) {
  opacity: 0.9;
}
```

---

### `hp-switch`

| State         | Tokens used                                                                    |
| ------------- | ------------------------------------------------------------------------------ |
| Default (off) | `--hp-bg-muted` (track bg), `--hp-border`, `--hp-text-secondary` (thumb color) |
| Hover (off)   | `--hp-border-strong`                                                           |
| Checked (on)  | `--hp-accent` (track), `--hp-accent-foreground` (thumb)                        |
| Checked hover | `--hp-accent-hover`                                                            |
| Disabled      | `--hp-opacity-disabled`                                                        |
| Thumb shadow  | `--hp-shadow-sm`                                                               |

---

### `hp-checkbox` and `hp-radio`

| State    | Tokens used                                                           |
| -------- | --------------------------------------------------------------------- |
| Default  | `--hp-surface` (bg), `--hp-border-strong` (border)                    |
| Hover    | `--hp-accent` (border)                                                |
| Checked  | `--hp-accent` (bg + border), `--hp-accent-foreground` (checkmark/dot) |
| Disabled | `--hp-opacity-disabled`                                               |

---

### `hp-toggle-group` / `hp-toggle`

| State        | Tokens used                                                      |
| ------------ | ---------------------------------------------------------------- |
| Container    | `--hp-border` (outer border), `--hp-surface` (bg), `--hp-radius` |
| Item default | `--hp-text-secondary` (text), `--hp-border` (separator)          |
| Item hover   | `--hp-bg-muted`, `--hp-text`                                     |
| Item pressed | `--hp-bg-muted`, `--hp-text`                                     |
| Disabled     | `--hp-opacity-disabled`                                          |

---

### `hp-tabs`

| State        | Tokens used                           |
| ------------ | ------------------------------------- |
| Tab list     | `--hp-border` (bottom border)         |
| Tab default  | `--hp-text-secondary` (text)          |
| Tab hover    | `--hp-text`, `--hp-bg-muted` (bg)     |
| Tab selected | `--hp-accent` (text + bottom border)  |
| Tab disabled | `--hp-opacity-disabled`               |
| Panel        | `--hp-text`, `--hp-space-4` (padding) |

---

### `hp-accordion`

| State            | Tokens used                                     |
| ---------------- | ----------------------------------------------- |
| Container        | `--hp-border`, `--hp-radius-md`, `--hp-surface` |
| Item border      | `--hp-border`                                   |
| Trigger default  | `--hp-text`                                     |
| Trigger hover    | `--hp-bg-muted`                                 |
| Trigger expanded | `--hp-accent` (text color)                      |
| Content          | `--hp-text-secondary`                           |

---

### `hp-collapsible`

| State   | Tokens used                                       |
| ------- | ------------------------------------------------- |
| Trigger | `--hp-text`, hover: `--hp-bg-muted`               |
| Content | `--hp-text-secondary`, `--hp-border` (top border) |

---

### `hp-dialog`

| Element      | Tokens used                                                                      |
| ------------ | -------------------------------------------------------------------------------- |
| Backdrop     | `--hp-backdrop-bg`                                                               |
| Content      | `--hp-surface`, `--hp-border`, `--hp-radius-lg`, `--hp-shadow-lg`, `--hp-text`   |
| Title        | `--hp-text`, `--hp-font-size-lg`, `--hp-font-weight-semibold`                    |
| Close button | `--hp-text-secondary` (default), `--hp-text` (hover), `--hp-bg-muted` (hover bg) |
| Animations   | `hp-dialog-in/out`, `hp-backdrop-in/out` (keyframes from `base.css`)             |

---

### `hp-popover`

| Element    | Tokens used                                                       |
| ---------- | ----------------------------------------------------------------- |
| Trigger    | Same as `hp-button`                                               |
| Content    | `--hp-surface`, `--hp-border`, `--hp-radius-md`, `--hp-shadow-lg` |
| Animations | `hp-overlay-in/out`, `hp-overlay-in-up/out-up` (from `base.css`)  |

---

### `hp-tooltip`

| Element    | Tokens used                                                                 |
| ---------- | --------------------------------------------------------------------------- |
| Content    | `--hp-text` (bg), `--hp-surface` (text), `--hp-radius-sm`, `--hp-shadow-md` |
| Arrow      | `border-top-color: var(--hp-text)`                                          |
| Animations | `hp-tooltip-in/out` (from `base.css`)                                       |

---

### `hp-toast`

| Element      | Tokens used                                                                    |
| ------------ | ------------------------------------------------------------------------------ |
| Toast        | `--hp-surface`, `--hp-border`, `--hp-radius-md`, `--hp-shadow-lg`, `--hp-text` |
| Title        | `--hp-text`, `--hp-font-weight-semibold`                                       |
| Description  | `--hp-text-secondary`, `--hp-font-size-xs`                                     |
| Close button | `--hp-text-secondary`, hover: `--hp-bg-muted`                                  |
| Animations   | `hp-toast-in/out` (from `base.css`)                                            |

---

### `hp-field`

| Element               | Tokens used                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| Label                 | `--hp-text`, `--hp-font-size-sm`, `--hp-font-weight-medium`                                    |
| Description           | `--hp-text-secondary`, `--hp-font-size-xs`                                                     |
| Error                 | `--hp-text-error`                                                                              |
| Input/select/textarea | `--hp-text`, `--hp-surface`, `--hp-border-strong`, `--hp-radius`, `--hp-accent` (focus border) |

Override the error color for your brand:

```css
:root {
  --hp-text-error: #e11d48; /* rose-600 */
}
```

---

### `hp-progress`

| Element   | Tokens used                                               |
| --------- | --------------------------------------------------------- |
| Track     | `--hp-bg-muted`, `--hp-radius-full`                       |
| Indicator | `--hp-accent`, `--hp-radius-full`, `--hp-transition-slow` |

---

### `hp-separator`

| Token used    | Purpose                     |
| ------------- | --------------------------- |
| `--hp-border` | Color of the separator line |

---

### `hp-avatar`

| Element       | Tokens used                                                             |
| ------------- | ----------------------------------------------------------------------- |
| Container     | `--hp-bg-muted`, `--hp-radius-full`                                     |
| Fallback text | `--hp-text-secondary`, `--hp-font-size-sm`, `--hp-font-weight-semibold` |

---

## Dark Mode

Dark mode is automatic via `@media (prefers-color-scheme: dark)` in `theme.css`. All color tokens are overridden there.

To **force light mode** regardless of OS:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --hp-bg: #ffffff;
    --hp-surface: #ffffff;
    --hp-text: #0f172a;
    --hp-text-secondary: #64748b;
    --hp-border: #e2e8f0;
    --hp-border-strong: #64748b;
    --hp-accent: #0369a1;
    --hp-accent-foreground: #ffffff;
    --hp-backdrop-bg: rgb(0 0 0 / 0.5);
  }
}
```

To use a **class-based dark mode** (e.g., `.dark` on `<html>`):

```css
/* 1. Neutralize the auto dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    /* paste all light defaults here */
  }
}

/* 2. Apply dark tokens on your class */
.dark {
  --hp-bg: #0f172a;
  --hp-bg-subtle: #1e293b;
  --hp-bg-muted: #334155;
  --hp-surface: #1e293b;
  --hp-surface-raised: #293548;
  --hp-border: #334155;
  --hp-border-strong: #64748b;
  --hp-text: #f8fafc;
  --hp-text-secondary: #94a3b8;
  --hp-text-disabled: #475569;
  --hp-text-on-accent: #0c1a29;
  --hp-accent: #38bdf8;
  --hp-accent-hover: #7dd3fc;
  --hp-accent-active: #bae6fd;
  --hp-accent-foreground: #0c1a29;
  --hp-backdrop-bg: rgb(0 0 0 / 0.65);
  --hp-text-error: #f87171;
  --hp-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --hp-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4);
  --hp-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4);
  --hp-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4);
  --hp-focus-outline-color: #38bdf8;
}
```

---

## Overriding in a specific context

Tokens cascade like any CSS custom property, so you can scope overrides to any selector:

```css
/* Only inside this form */
.checkout-form {
  --hp-accent: #d97706; /* amber accent for this form */
  --hp-border-strong: #92400e;
  --hp-focus-outline-color: #d97706;
}

/* Only inside a dark sidebar */
.sidebar {
  --hp-surface: #1e293b;
  --hp-text: #f8fafc;
  --hp-border: #334155;
}
```

---

## Specificity model

All `@styles` selectors use a **single element selector** (specificity `0,0,1`). Any class in your project will always win:

```css
/* specificity 0,0,1 — from @styles */
hp-button {
  background: var(--hp-surface);
}

/* specificity 0,1,0 — your class, always wins */
.btn-primary {
  background: #7c3aed;
}

/* specificity 0,0,1 but declared after — wins by cascade order */
/* Use this if you want to extend without adding a class */
hp-button:not(.custom) {
  border-radius: 0;
}
```

---

## Playground override pattern (reference)

The playground app demonstrates a complete theme override for a dark dashboard. See `apps/playground/src/style.css` for a full working example of mapping `--hp-*` tokens to a custom dark palette.

---

## Try it visually

Use the **[Theme Builder](./theme-builder.md)** to edit every token with color pickers and sliders, see all components update in real time, and copy the generated CSS block directly into your project.
