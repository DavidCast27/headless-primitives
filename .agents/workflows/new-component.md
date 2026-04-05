# Workflow: Crear un Nuevo Componente (Standard Lit 3)

Este documento es el orquestador principal para añadir un nuevo primitivo al monorepo. Sigue estos pasos para garantizar consistencia técnica y de diseño.

> Ver workflows especializados:
>
> - [Estándares de Estilo](./styling-standards.md) — Capas `base.css` y `@headless-primitives/styles`.
> - [Estándar de Documentación](./documentation-standard.md) — VitePress Premium.

## 0. Etapa de Referencia (Gold Standards)

Antes de escribir una sola línea de código, revisa estos componentes como referencia absoluta de la arquitectura actual:

- **`packages/vanilla/button`**: Componente simple, manejo de `disabled`, eventos básicos.
- **`packages/vanilla/accordion`**: Componentes compuestos (Padre > Item > Trigger/Content), navegación por teclado compleja, `@property` + `_sync()`.
- **`packages/vanilla/dialog`**: Overlays, backdrops, focus trap, `hp-dialog-close` como sub-elemento de acción.
- **`packages/vanilla/progress`**: Patrón `@property` + setter + `_sync()` para propiedades que actualizan el DOM síncronamente.

---

## 1. Scaffolding del Paquete

Crea la estructura base en `packages/vanilla/<nombre>/src/`.

```bash
mkdir -p packages/vanilla/<nombre>/src
```

### `package.json`

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
  "sideEffects": false,
  "publishConfig": { "access": "public" },
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/DavidCast27/headless-primitives.git"
  },
  "homepage": "https://davidcast27.github.io/headless-primitives/",
  "bugs": { "url": "https://github.com/DavidCast27/headless-primitives/issues" },
  "scripts": {
    "build": "vite build && tsc",
    "test": "vitest run",
    "test:coverage": "vitest run --coverage",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@headless-primitives/utils": "workspace:*",
    "lit": "^3.3.2"
  },
  "peerDependencies": {
    "lit": "^3.3.2"
  },
  "devDependencies": {
    "happy-dom": "^14.12.3",
    "vite": "^5.4.2",
    "vitest": "^2.0.5"
  }
}
```

### `tsconfig.json`

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

### `vite.config.ts`

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

---

## 2. Implementación Técnica

### `src/index.ts` — Re-exportaciones

```typescript
export * from "./<nombre>";
export * from "./types"; // si el paquete tiene types.ts
```

**Nota:** Asegúrate de que cada interfaz o tipo esté definido en un solo archivo. Si defines `<Nombre>Options` en `types.ts`, no la re-declares en `<nombre>.ts` — eso causaría un error de exportación duplicada en el build.

### `src/types.ts` — Interfaces y tipos

Define aquí todas las interfaces públicas. No las definas en `<nombre>.ts` para evitar duplicados en el build.

```typescript
export interface <Nombre>Options {
  // ...
}
```

### `src/<nombre>.ts` — Implementación

```typescript
import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-<nombre>")
export class Headless<Nombre> extends HeadlessElement {
  // Para propiedades que actualizan el DOM síncronamente (requerido por happy-dom):
  // Usa el patrón @property + setter + _sync() (ver ADR 0011)
  private _value = "";

  @property({ type: String, reflect: true })
  get value(): string {
    return this._value;
  }
  set value(v: string) {
    this._value = v;
    this._sync();
  }

  // Para propiedades que solo afectan comportamiento (no DOM), @property solo es suficiente:
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback(); // SIEMPRE primero
    this.setAttribute("data-hp-component", "<nombre>");
    // Sync síncrono para tests + rAF para SSR/VitePress
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  disconnectedCallback() {
    super.disconnectedCallback(); // SIEMPRE
    // Limpia event listeners globales si los hay
  }

  private _sync() {
    // Actualiza atributos ARIA y data-state síncronamente
    this.setAttribute("data-state", this._value ? "active" : "inactive");
  }

  // Usa this.emit() — el prefijo hp- se añade automáticamente
  private _onChange() {
    this.emit("change", { value: this._value });
  }
}
```

### Reglas críticas de implementación

| Regla         | Correcto                                  | Incorrecto                               |
| ------------- | ----------------------------------------- | ---------------------------------------- |
| Registro      | `@customElement("hp-...")`                | `customElements.define(...)` en index.ts |
| Eventos       | `this.emit("change")` → emite `hp-change` | `new CustomEvent("hp-change", ...)`      |
| IDs únicos    | `this.hpId`                               | `Math.random().toString(36)`             |
| Visibilidad   | `data-state="open/closed"` + CSS          | `style.display`, `style.visibility`      |
| Inline styles | Solo `top`/`left` para coordenadas        | `zIndex`, `position`, `opacity`          |
| Super calls   | `super.connectedCallback()` siempre       | Omitir el super                          |

---

## 3. Pruebas Unitarias (`src/<nombre>.test.ts`)

```typescript
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./index"; // activa @customElement — NUNCA importar y definir manualmente
import type { Headless<Nombre> } from "./<nombre>"; // type-only import

describe("Hp<Nombre>", () => {
  let el: Headless<Nombre>;

  beforeEach(() => {
    el = document.createElement("hp-<nombre>") as Headless<Nombre>;
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
  });

  // Cubre siempre:
  it("inicializa data-hp-component", () => {
    expect(el.getAttribute("data-hp-component")).toBe("<nombre>");
  });

  it("tiene los atributos ARIA correctos", () => {
    expect(el.getAttribute("role")).toBe("...");
  });

  it("responde a interacción de teclado", () => {
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    // assert...
  });

  it("emite hp-change al cambiar estado", () => {
    let detail: any = null;
    el.addEventListener("hp-change", (e: any) => { detail = e.detail; });
    // trigger...
    expect(detail).toBeDefined();
  });

  it("respeta el atributo disabled", () => {
    el.setAttribute("disabled", "");
    // assert que no cambia estado...
  });
});
```

**Nota sobre happy-dom:** El ciclo async de Lit (`updated()`, `willUpdate()`) no corre en happy-dom. Para propiedades que deben actualizar el DOM, usa el patrón setter + `_sync()`. Ver [ADR 0011](../../docs/adr/0011-uuid-uid-and-property-sync-pattern.md).

---

## 4. Integración al Playground (`apps/playground`)

### 4.1 Añadir dependencia

Edita `apps/playground/package.json` y añade la dependencia en `dependencies`:

```json
"@headless-primitives/<nombre>": "workspace:*"
```

Luego ejecuta `pnpm install` desde la raíz del monorepo.

### 4.2 Crear demo modular

**`apps/playground/src/demos/<nombre>.demo.ts`:**

```typescript
import { ComponentDemo } from "../types";
import "./<nombre>.css";

export const <nombre>Demo: ComponentDemo = {
  title: "<Nombre> primitive",
  description: "Descripción breve.",
  html: `
    <div style="padding: 2rem;">
      <hp-<nombre>>
        ...
      </hp-<nombre>>
    </div>
  `,
  init: () => {
    // Lógica JS adicional si es necesaria
  },
};
```

**`apps/playground/src/demos/<nombre>.css`:**

```css
/* Estilos de la demo — usa clases específicas para evitar colisiones */
.demo-<nombre> { ... }
```

### 4.3 Registrar en `apps/playground/src/main.ts`

Añade en orden:

```typescript
// Imports de primitivos (sección superior)
import "@headless-primitives/<nombre>";

// Import de demo
import { <nombre>Demo } from "./demos/<nombre>.demo";

// En ROUTES
const ROUTES = {
  // ...existentes...
  "<nombre>": <nombre>Demo,
};
```

### 4.4 Añadir botón en `apps/playground/index.html`

```html
<li><button class="nav-item" data-comp="<nombre>"><Nombre></button></li>
```

---

## 5. Estilos Base (`base.css`)

Edita `packages/vanilla/utils/src/base.css`:

```css
/* Display block para los nuevos custom elements */
hp-<nombre >,
hp-<nombre > -trigger,
hp-<nombre > -content {
  display: block;
}

/* Visibilidad via data-state (si aplica) */
/* Si es un panel: añadir a sección A. Paneles */
hp-<nombre > -content[data-state="closed"] {
  display: none;
}

/* Si es un overlay: añadir a sección B. Overlays */
hp-<nombre > -content[data-hp-overlay-content][data-state="closed"] {
  display: none;
}
```

---

## 6. Documentación (`apps/docs`)

### 6.1 Crear página

Crea `apps/docs/components/<nombre>.md` siguiendo el [Estándar Premium](./documentation-standard.md).

### 6.2 Registrar en sidebar

Edita `apps/docs/.vitepress/config.ts` y añade la entrada en la sección `sidebar`:

```typescript
{ text: "<Nombre>", link: "/components/<nombre>" }
```

### 6.3 Importar en VitePress theme

Edita `apps/docs/.vitepress/theme/index.ts` y añade el import del paquete:

```typescript
import "@headless-primitives/<nombre>";
```

---

## 7. Checklist Final

Antes de hacer commit, verifica:

- [ ] `pnpm --filter "./packages/vanilla/<nombre>" build` — sin errores
- [ ] `pnpm --filter "./packages/vanilla/<nombre>" test` — todos los tests pasan
- [ ] `pnpm --filter "./packages/vanilla/<nombre>" typecheck` — sin errores TypeScript
- [ ] Playground carga y la demo funciona visualmente
- [ ] Documentación renderiza correctamente en VitePress
- [ ] Bloques de instalación muestran npm/pnpm/Yarn/Bun
- [ ] `pnpm run lint` — sin warnings de Oxlint
- [ ] ADR creado si la decisión de diseño lo amerita (`docs/adr/`)

---

## Resumen de Reglas de Oro

- **Base**: Extiende `HeadlessElement`, usa `@customElement("hp-...")`.
- **IDs**: Usa `this.hpId` (uuid). Nunca `Math.random()`.
- **Eventos**: `this.emit("nombre")` → emite `hp-nombre` automáticamente.
- **Propiedades reactivas**: `@property` + setter + `_sync()` para DOM síncrono.
- **Tests**: `import "./index"` + type-only imports. Nunca `customElements.define()` manual.
- **Sin estilos visuales**: Los primitivos son Headless. Solo CSS funcional en el componente.
- **SSR**: `super.connectedCallback()` + `_sync()` + `requestAnimationFrame(() => _sync())`.
