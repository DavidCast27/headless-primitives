---
name: Token Naming Conventions
description: CSS Custom Property naming patterns used in the headless-primitives @styles package
type: project
---

All tokens use the `--hp-` prefix ("headless primitives").

## Color tokens

- `--hp-accent` — primary brand/action color
- `--hp-accent-hover` / `--hp-accent-active` — state variants
- `--hp-accent-foreground` — text/icon color on top of accent backgrounds
- `--hp-bg` / `--hp-bg-subtle` / `--hp-bg-muted` — background hierarchy (page → subtle zones → hover areas)
- `--hp-surface` / `--hp-surface-raised` — component surface colors
- `--hp-border` — non-interactive divider borders
- `--hp-border-strong` — interactive component borders (must pass WCAG 3:1 non-text contrast)
- `--hp-text` — primary text
- `--hp-text-secondary` — secondary/muted text
- `--hp-text-disabled` — disabled state text (WCAG exempt)
- `--hp-text-on-accent` — text on accent backgrounds (alias for accent-foreground)
- `--hp-text-error` — error messages (red-600 light / red-400 dark) — added 2026-04-05
- `--hp-backdrop-bg` — overlay backdrop color — added 2026-04-05

## Structural/layout tokens (in base.css)

- `--hp-z-index-backdrop` (1000), `--hp-z-index-overlay-content` (1100), `--hp-z-index-popover` (1200), `--hp-z-index-tooltip` (1300)
- `--hp-focus-outline-color` (#2563eb), `--hp-focus-outline-width` (2px)
- `--hp-duration-fast` (100ms), `--hp-duration` (150ms), `--hp-duration-slow` (200ms)
- `--hp-ease` (ease), `--hp-ease-out` (cubic-bezier(0.16,1,0.3,1))

## Scale tokens

- `--hp-radius-sm` (4px) / `--hp-radius` (6px) / `--hp-radius-md` (8px) / `--hp-radius-lg` (12px) / `--hp-radius-full` (9999px)
- `--hp-shadow-sm` / `--hp-shadow` / `--hp-shadow-md` / `--hp-shadow-lg`
- `--hp-font-size-xs` (0.75rem) / `--hp-font-size-sm` (0.875rem) / `--hp-font-size-base` (1rem) / `--hp-font-size-lg` (1.125rem)
- `--hp-font-weight-normal` (400) / `--hp-font-weight-medium` (500) / `--hp-font-weight-semibold` (600)
- `--hp-space-1` (0.25rem) / `--hp-space-2` (0.5rem) / `--hp-space-3` (0.75rem) / `--hp-space-4` (1rem)
- `--hp-transition-fast` (100ms ease) / `--hp-transition` (150ms ease) / `--hp-transition-slow` (200ms ease)
- `--hp-opacity-disabled` (0.5)

## WCAG compliance targets

- Normal text: 4.5:1 minimum (WCAG 1.4.3 AA)
- UI component borders (checkbox, radio, input): 3:1 minimum (WCAG 1.4.11)
- Disabled states: exempt from contrast requirements (WCAG 1.4.3 exception)
- Dark mode tokens are separately calculated and listed with contrast ratios in theme.css comments
