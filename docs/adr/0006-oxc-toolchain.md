# 0006. OXC Toolchain (Oxlint + Oxfmt)

## Contexto

Al evaluar herramientas de linting y formateo para nuestro monorepo, teníamos tres opciones:

1. **ESLint + Prettier** (stack tradicional, maduro pero lento).
2. **Biome** (alternativa Rust, buen rendimiento).
3. **OXC (Oxlint + Oxfmt)** (ecosistema VoidZero, Rust nativo).

## Decisión

Adoptamos **Oxlint** como linter y **Oxfmt** como formatter, reemplazando ESLint y Prettier respectivamente.

## Razones

### Coherencia de Ecosistema

Nuestro stack ya usa herramientas del ecosistema VoidZero/OXC:

- **Vite 8** usa **Rolldown** (bundler Rust del proyecto OXC) por debajo.
- **Vitest 4** corre sobre Vite.
- Oxlint y Oxfmt comparten el mismo AST (Abstract Syntax Tree) con Rolldown.

Usar OXC cierra el círculo: un solo ecosistema Rust unificado para compilar, testear, formatear y analizar código.

### Rendimiento

- Oxlint: **50-100x más rápido** que ESLint (700+ reglas nativas en Rust).
- Oxfmt: **~30x más rápido** que Prettier.
- En un monorepo con múltiples paquetes, esta velocidad se nota en CI y en los git hooks.

### Simplicidad

- Oxlint: un solo `.oxlintrc.json` vs la maraña de plugins/configs de ESLint.
- Oxfmt: compatible con output de Prettier, permite migración sin romper nada.

## Estado de Madurez

- Oxlint v1.0 estable desde junio 2025. Usado en producción por Sentry, Preact, PostHog.
- Oxfmt en estado estable con soporte para TS, JSON, MD, CSS, YAML y más.
- El type-aware linting está en alpha (via tsgolint), pero cubrimos eso con `tsc --noEmit`.

## Consecuencias

- Prettier eliminado del proyecto.
- Los git hooks (`pre-commit`) ejecutan `oxlint --fix` + `oxfmt --write` sobre archivos staged.
- El CI pipeline verifica formateo (`oxfmt --check`) y linting (`oxlint`) en cada PR.
