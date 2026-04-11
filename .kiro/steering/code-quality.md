---
inclusion: auto
description: Oxlint, Oxfmt, Vitest con happy-dom, Conventional Commits, requisitos de tests y monorepo awareness para headless-primitives.
---

# Calidad de Código — headless-primitives

## Herramientas

- **Linting**: Oxlint (no ESLint) — configuración en `.oxlintrc.json`
- **Formatting**: Oxfmt (no Prettier) — ejecutar `pnpm run format` antes de commit
- **Testing**: Vitest + happy-dom
- **Commits**: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`) — validados por Commitlint

## Comandos de validación

```bash
pnpm --filter "./<name>" run build      # vite build && tsc
pnpm --filter "./<name>" run test       # vitest run
pnpm --filter "./<name>" run typecheck  # tsc --noEmit
pnpm run lint                           # oxlint (monorepo completo)
pnpm run format                         # oxfmt (monorepo completo)
```

## Tests — requisitos mínimos por componente

Todo componente **debe** tener `<name>.test.ts` con Vitest + happy-dom cubriendo:

- Atributos ARIA correctos
- Estados disabled
- Interacción con teclado
- Eventos custom emitidos

## Importaciones en tests

```typescript
// CORRECTO
import "./index"; // activa el decorador @customElement
import type { HeadlessMiComponente } from "./mi-componente"; // solo tipo

// INCORRECTO
import { HeadlessMiComponente } from "./mi-componente";
if (!customElements.get("hp-mi-componente")) customElements.define(...);
```

## Advertencia happy-dom

happy-dom **no ejecuta** el ciclo async de Lit (`updated()`, `willUpdate()`). Usar siempre el patrón setter + `_sync()` para que los tests puedan observar cambios DOM síncronamente.

## Monorepo awareness

- Nunca instalar paquetes en el workspace incorrecto
- Antes de introducir una nueva CSS Custom Property, verificar si existe un token `--hp-*` equivalente en `theme.css`
- Al crear un componente nuevo, añadir la dependencia a **ambos** `apps/playground/package.json` Y `apps/docs/package.json`

## Changesets

El proyecto usa changesets (`.changeset/`). Al hacer cambios significativos, crear un changeset apropiado.
