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
- Crear `apps/playground/src/demos/<nombre>.demo.ts` exportando un objeto de tipo `ComponentDemo`.
- Crear `apps/playground/src/demos/<nombre>.css` con los estilos de la demo e importarlo en el `.demo.ts`.
- Registrar la nueva demo en el objeto `ROUTES` de `apps/playground/src/main.ts`.
- Añadir el botón correspondiente en la barra lateral de `apps/playground/index.html`.

## 7. Documentar

- Documentar:
  - Crear `apps/docs/components/<nombre>.md` siguiendo el **Estándar Premium** (ver `AGENTS.md` §6 y `docs/adr/0008-docs-api-reference-by-custom-element.md`):
    - Badge "Nuevo".
    - Sección de instalación con `pnpm add`.
    - Demo interactiva usando `docs-demos.css` (`hp-demo-card`).
    - **Anatomía:** un solo bloque Markdown ` ```html ` con el árbol anidado de etiquetas `hp-*`.
    - **Ejemplos de Estilo (Multiflavor):** Uso obligatorio de `<CodeSnippet>` envolviendo dos bloques de `<Flavor>`:
      - `<Flavor only="css">`: Contiene un `::: code-group` con el HTML base y el Vanilla CSS.
      - `<Flavor only="tailwind">`: Contiene un `::: code-group` con el HTML usando utilidades de Tailwind.
    - **API Reference:** una subsección `### \`hp-parte\`` por cada custom element del paquete.

- Si la decisión de documentación es nueva o ambigua, considerar un ADR en `docs/adr/`.
- Añadir entrada en la sidebar de `apps/docs/.vitepress/config.ts`.
- Importar el componente en `apps/docs/.vitepress/theme/index.ts`.

## 8. Registrar dependencia en docs

- Añadir `"@headless-primitives/<nombre>": "workspace:*"` a `apps/docs/package.json`.

// turbo

## 9. Instalar y verificar

```bash
pnpm install && pnpm run lint && pnpm run typecheck && pnpm run test
```
