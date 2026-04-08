---
name: Feedback and Approach
description: Preferred approach and patterns for working in the headless-primitives codebase
type: feedback
---

## The "base.css minimum appearance" section is INTENTIONAL

The large section in `base.css` starting at "Apariencia mínima" (~line 203) provides visual fallbacks using only CSS system colors (currentColor, Canvas, CanvasText). This is NOT style debt — it is the zero-dependency fallback for consumers who don't want to load @styles. Do not move or remove it.

**Why:** The project explicitly supports three tiers: base.css only, base.css + @styles, and no library CSS at all (user CSS only).

**How to apply:** When auditing, do not flag this section as a layer violation. Flag it only if it contains raw hex colors or rgba() values (those ARE bugs).

## The project is vanilla Custom Elements, NOT Lit

Despite the memory directory being named "lit-ui-ux-engineer", all components are vanilla Custom Elements. There is no Shadow DOM, no `static styles`, no `css` tagged literals. The architecture uses global stylesheets that target custom element tag names and data-attribute selectors.

**Why:** The monorepo is named "headless-primitives" and was explicitly built to be framework-agnostic vanilla JS Web Components.

**How to apply:** When making style changes, edit the global CSS files in `packages/vanilla/styles/src/` and `packages/vanilla/utils/src/` — not component TypeScript files.

## var() fallbacks are correct in demo/app CSS files

In `apps/playground/src/demos/*.css` and `apps/docs/` files, using `var(--hp-text, #1f2937)` with a hardcoded fallback is CORRECT. The fallback only activates when the token is undefined, and playground files always override tokens via `style.css` anyway.

**Why:** Demo files must visually work even if theme.css fails to load for any reason.

**How to apply:** Don't remove fallbacks from `var()` calls in demo files. Do remove bare hardcoded values that are NOT inside `var()`.

## Layer decision rule

- Layout/visibility/positioning/z-index/animations → base.css
- Color/shadow/radius/typography/transitions → @styles
- When in doubt about transitions: transitions are structural (opacity/visibility for show-hide) in base.css, decorative (color/bg transitions) in @styles
