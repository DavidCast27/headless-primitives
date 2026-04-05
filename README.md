# Headless Primitives

> Primitivos UI accesibles y sin estilos, construidos como Web Components nativos y framework-agnostic.

[![CI](https://github.com/DavidCast27/headless-primitives/actions/workflows/ci.yml/badge.svg)](https://github.com/DavidCast27/headless-primitives/actions/workflows/ci.yml)

## Filosofía

- **Headless**: Sin estilos. Tú decides el _"look & feel"_. La documentación incluye ejemplos listos para **Vanilla CSS** y **Tailwind CSS**.
- **Accesible**: Atributos ARIA, navegación por teclado y manejo de foco listos para usarse (_built-in_).
- **Framework-agnostic**: Al ser Custom Elements nativos, funcionan en cualquier stack (React, Vue, Astro, Vanilla JS, etc.).
- **Lit 3**: Todos los componentes extienden `HeadlessElement` (basado en `LitElement`) para reactividad declarativa con `@property` y `@customElement`. Ver [ADR 0010](docs/adr/0010-headlesselement-lit-migration.md).

## Quick Start

```bash
pnpm add @headless-primitives/button
```

```html
<hp-button>Click me</hp-button>
<hp-button disabled>Disabled</hp-button>
<hp-button aria-pressed="false">Toggle</hp-button>
```

```javascript
import "@headless-primitives/button";
```

## Componentes

| Componente | Paquete                       | Estado     |
| :--------- | :---------------------------- | :--------- |
| Button     | `@headless-primitives/button` | ✅ Estable |

## Stack Tecnológico

| Herramienta    | Propósito                                                              |
| :------------- | :--------------------------------------------------------------------- |
| **Lit 3**      | Base de componentes (`HeadlessElement`, `@property`, `@customElement`) |
| **Vite 8**     | Build (Library Mode)                                                   |
| **Vitest 4**   | Testing + Coverage                                                     |
| **Oxlint**     | Linting (reemplaza ESLint)                                             |
| **Oxfmt**      | Formatting (reemplaza Prettier)                                        |
| **Changesets** | Versionado independiente                                               |
| **VitePress**  | Documentación                                                          |
| **Husky**      | Git hooks                                                              |
| **pnpm**       | Gestor de paquetes (workspaces)                                        |

## Desarrollo Local

```bash
# Requisitos: Node.js 24+, pnpm

# Instalar dependencias
pnpm install

# Playground visual (localhost:5173)
pnpm run dev

# Documentación (localhost:5175)
pnpm run docs:dev

# Tests
pnpm run test

# Lint + Format
pnpm run lint
pnpm run format
```

## Documentación

- 📖 [Portal de Documentación](https://davidcast27.github.io/headless-primitives/) (próximamente)
- 📐 [Arquitectura](./docs/ARCHITECTURE.md)
- 📝 [Decisiones Técnicas (ADRs)](./docs/adr/)
- 🤝 [Contribuir](./CONTRIBUTING.md)

## Licencia

MIT
