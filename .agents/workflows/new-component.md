---
description: How to scaffold a new headless primitive component
---

# Crear un Nuevo Componente

Sigue estos pasos exactos para añadir un nuevo primitivo al monorepo.

## 1. Crear la estructura del paquete

// turbo

```bash
mkdir -p packages/vanilla/<nombre>/src
```

## 2. Crear `packages/vanilla/<nombre>/package.json`

```json
{
  "name": "@headless-primitives/<nombre>",
  "version": "0.1.0",
  "description": "Headless <nombre> primitive",
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsc && vite build",
    "test": "vitest run",
    "test:coverage": "vitest run --coverage",
    "typecheck": "tsc --noEmit"
  }
}
```

## 3. Crear `packages/vanilla/<nombre>/tsconfig.json`

```json
{
  "extends": "../../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "emitDeclarationOnly": true
  },
  "include": ["src"]
}
```

## 4. Crear `packages/vanilla/<nombre>/vite.config.ts`

```typescript
import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "HeadlessPrimitives<Nombre>",
      fileName: "index",
    },
    target: "esnext",
  },
  test: {
    environment: "happy-dom",
  },
});
```

## 5. Implementar el componente

- `src/<nombre>.ts` — Custom Element(s) con lógica, ARIA y teclado.
- `src/types.ts` — Interfaces y tipos.
- `src/index.ts` — Exportaciones + `customElements.define('hp-<nombre>', ...)`.
- `src/<nombre>.test.ts` — Tests de Vitest.

## 6. Integrar al Playground

- Añadir `"@headless-primitives/<nombre>": "workspace:*"` a `apps/playground/package.json`.
- Crear `apps/playground/src/styles/<nombre>.css` con los estilos de la demo.
- Importar el nuevo CSS en `apps/playground/src/style.css` usando `@import './styles/<nombre>.css';`.
- Crear `apps/playground/src/scripts/<nombre>.ts` con la lógica de listeners y logs.
- Importar e inicializar la nueva lógica en `apps/playground/src/main.ts`.
- Crear Card de demo en `apps/playground/index.html`.

## 7. Documentar

- Crear `apps/docs/components/<nombre>.md` con demo interactiva, tablas de API y guía de estilos.
- Añadir entrada en la sidebar de `apps/docs/.vitepress/config.ts`.
- Importar en `apps/docs/.vitepress/theme/index.ts`.

## 8. Registrar dependencia en docs

- Añadir `"@headless-primitives/<nombre>": "workspace:*"` a `apps/docs/package.json`.

// turbo

## 9. Instalar y verificar

```bash
pnpm install && pnpm run lint && pnpm run typecheck && pnpm run test
```
