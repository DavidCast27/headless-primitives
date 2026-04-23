# QWEN.md — Headless Primitives

## Project Overview

**Headless Primitives** is a monorepo of accessible, unstyled UI components built as native Web Components using **Lit 3**. The components are framework-agnostic — they work in React, Vue, Astro, Vanilla JS, or any other stack because they are standard Custom Elements (`<hp-button>`, `<hp-dialog>`, etc.).

### Core Philosophy

- **Headless**: Zero visual styles. Consumers apply their own CSS/Tailwind via `data-state`, `data-hp-*`, and ARIA attributes.
- **Accessible**: Built-in ARIA attributes, keyboard navigation, and focus management.
- **Framework-agnostic**: Native Custom Elements work anywhere.
- **Lit 3**: All components extend `HeadlessElement` (a `LitElement` subclass in `@headless-primitives/utils`) for declarative reactivity with `@property` and `@customElement` decorators.

### Tech Stack

| Tool           | Purpose                            |
| :------------- | :--------------------------------- |
| **Lit 3**      | Component base (`HeadlessElement`) |
| **Vite 8**     | Library mode build                 |
| **Vitest 4**   | Testing + Coverage                 |
| **Oxlint**     | Linting (replaces ESLint)          |
| **Oxfmt**      | Formatting (replaces Prettier)     |
| **Changesets** | Independent package versioning     |
| **VitePress**  | Documentation site                 |
| **pnpm**       | Package manager (workspaces)       |

## Monorepo Structure

```
headless-primitives/
├── packages/
│   └── vanilla/              # All Web Component primitives
│       ├── utils/            # Shared base class (HeadlessElement) + helpers
│       ├── button/           # @headless-primitives/button
│       ├── dialog/           # @headless-primitives/dialog
│       ├── tabs/             # @headless-primitives/tabs
│       └── ...               # 30+ primitives
├── apps/
│   ├── docs/                 # VitePress documentation site
│   └── playground/           # Visual dev environment (Vite)
├── docs/
│   └── adr/                  # Architecture Decision Records
└── AGENTS.md                 # Rules for AI coding agents
```

### Available Primitives

accordion, avatar, badge, breadcrumb, button, carousel, checkbox, collapsible, combobox, context-menu, dialog, drawer, dropdown-menu, field, fieldset, label, navigation-menu, pin-input, popover, progress, radio-group, select, separator, slider, stepper, styles, switch, tabs, toast, toggle-group, tooltip, tree

## Key Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm run dev           # Start playground (localhost:5173)
pnpm run docs:dev      # Start docs site (localhost:5175)

# Build all packages
pnpm run build

# Testing
pnpm run test               # Run all tests
pnpm run test:coverage      # Run with coverage

# Code quality
pnpm run lint               # Oxlint check
pnpm run lint:fix           # Fix lint issues
pnpm run format             # Oxfmt format
pnpm run format:check       # Check formatting
pnpm run typecheck          # TypeScript type check

# Release
pnpm run changeset          # Create a changeset
pnpm run version            # Bump versions
pnpm run release            # Publish packages
```

## Development Conventions

### Component Pattern

All components follow this pattern:

```typescript
import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-my-component")
export class HeadlessMyComponent extends HeadlessElement {
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private _sync() {
    // Update ARIA and data-state attributes synchronously
  }
}
```

### Key Rules

1. **Always extend `HeadlessElement`** — never `HTMLElement` directly.
2. **Use `@customElement("hp-*")`** decorator — never `customElements.define()` manually.
3. **Use `@property()` from `lit/decorators.js`** for reactive HTML attributes.
4. **Use `this.emit("event", detail)`** — never `new CustomEvent()` directly (prefix `hp-` is auto-added).
5. **Use `this.hpId`** for unique instance IDs (based on `uuid`), never `Math.random()`.
6. **Control visibility via `data-state`** — never inline `display`, `visibility`, `opacity`, or `zIndex`.
7. **Inline styles only for computed coordinates** (popover positioning, dialog centering).
8. **`index.ts` only re-exports** — no `customElements.define()` calls.
9. **Every component must have tests** covering ARIA, disabled states, keyboard interaction, and custom events.
10. **No UI frameworks in primitives** — React, Vue, Svelte, Angular, Astro are prohibited in primitive source code.

### Component Directory Structure

```
packages/vanilla/my-component/
├── package.json          # dependencies: @headless-primitives/utils, lit
├── tsconfig.json         # extends: ../../../tsconfig.base.json
├── vite.config.ts        # Library mode + happy-dom test env
└── src/
    ├── my-component.ts       # Implementation
    ├── my-component.test.ts  # Vitest + happy-dom tests
    ├── types.ts              # Interfaces (if applicable)
    └── index.ts              # Re-exports only
```

### Commit Messages

Follow **Conventional Commits**:

- `feat: add new dialog primitive`
- `fix: resolve focus trap in popover`
- `docs: update quick start guide`
- `chore: update dependencies`

### Testing

- Framework: **Vitest 4** with **happy-dom** environment.
- Import from `./index` in tests (activates `@customElement` decorator).
- Use `type-only` imports for type references.
- Cover: ARIA attributes, disabled states, keyboard interaction, custom events.

## Important Files

| File                   | Purpose                                                    |
| :--------------------- | :--------------------------------------------------------- |
| `AGENTS.md`            | Comprehensive rules for AI agents working on this codebase |
| `pnpm-workspace.yaml`  | Defines workspace packages                                 |
| `tsconfig.base.json`   | Shared TypeScript configuration                            |
| `.oxlintrc.json`       | Oxlint configuration                                       |
| `commitlint.config.js` | Conventional commits validation                            |

## Architecture Decision Records (ADRs)

Key ADRs in `docs/adr/`:

| ADR  | Decision                                        |
| :--- | :---------------------------------------------- |
| 0001 | Historical context: why started with Vanilla JS |
| 0002 | Light DOM over Shadow DOM                       |
| 0010 | Full migration to HeadlessElement + Lit         |
| 0011 | UUID for IDs and @property + \_sync() pattern   |
| 0007 | Modular playground architecture                 |
| 0008 | Premium documentation standard                  |
| 0012 | Premium documentation template v2               |

## Node Version Requirement

**Node.js 24+** is required (for Vite 8 / Rolldown compatibility).
