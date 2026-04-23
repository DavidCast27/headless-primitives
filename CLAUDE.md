# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Headless Primitives is a monorepo of accessible, unstyled Web Components built on **Lit 3 + Light DOM**. Components are framework-agnostic (`hp-*` custom elements) with zero visual styles — consumers style via `data-state`, `data-hp-*`, and ARIA attribute selectors.

## Commands

| Task                | Command                                    |
| ------------------- | ------------------------------------------ |
| Install             | `pnpm install`                             |
| Dev playground      | `pnpm run dev` (localhost:5173)            |
| Dev docs            | `pnpm run docs:dev` (localhost:5175)       |
| Build all           | `pnpm build`                               |
| Test all            | `pnpm test`                                |
| Test single package | `pnpm -C packages/vanilla/button run test` |
| Test with coverage  | `pnpm test:coverage`                       |
| Lint                | `pnpm lint`                                |
| Format              | `pnpm format`                              |
| Typecheck           | `pnpm typecheck` (builds utils first)      |

Requires **Node >= 24** and **pnpm** (no npm/yarn). Linting uses **Oxlint**, formatting uses **Oxfmt**. Commits follow **Conventional Commits** enforced by commitlint.

## Architecture

**Monorepo layout:** pnpm workspaces — `packages/vanilla/*` (components), `apps/playground` (visual dev), `apps/docs` (VitePress).

**Every component** extends `HeadlessElement` from `@headless-primitives/utils`, which extends `LitElement` with Light DOM (`createRenderRoot` returns `this`). Key utilities: `HeadlessElement.emit()` (auto-prefixes `hp-`), `HeadlessElement.hpId` (UUID-based), `FocusTrap`, `RovingTabindex`, `customElement()` decorator (SSR-safe).

**Component structure** — each package under `packages/vanilla/{name}/`:

- `src/{name}.ts` — implementation extending `HeadlessElement`
- `src/{name}.test.ts` — Vitest + happy-dom tests
- `src/types.ts` — event interfaces (optional)
- `src/index.ts` — re-exports only (no `customElements.define`)

**Styles** live in `packages/vanilla/styles/` (optional consumer CSS) and `packages/vanilla/utils/src/base.css` (structural only).

## Critical Patterns

**Property reactivity:** happy-dom doesn't run Lit's async cycle. Use getter/setter + `_sync()` for properties that update DOM:

```typescript
@property({ type: Number })
get value() { return this._value; }
set value(v) { this._value = v; this._sync(); }
```

Never use `updated()` or `willUpdate()` for ARIA/state sync.

**Registration:** Use `@customElement("hp-name")` decorator from utils. Never call `customElements.define()` manually.

**Events:** Use `this.emit("name", detail)` — it auto-adds the `hp-` prefix. Never use `new CustomEvent(...)` directly.

**Visibility:** Always use `data-state="open|closed"` + CSS. Never use inline `style.display`, `style.visibility`, or `style.opacity`.

**VitePress compatibility:** Call `_sync()` in `connectedCallback()` AND inside `requestAnimationFrame(() => this._sync())`. Never use `Promise.resolve().then()`.

**Tests:** Import `"./index"` (triggers decorator registration), use type-only imports for the class.

## Key References

- `AGENTS.md` — comprehensive rules for AI agents (Spanish)
- `docs/adr/` — Architecture Decision Records (ADR 0012: Premium doc template v2, ADR 0010: Lit migration, ADR 0011: property+sync pattern, ADR 0002: Light DOM)
- `CONTRIBUTING.md` — contributor setup and workflow
