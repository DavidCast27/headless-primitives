# Arquitectura del Proyecto

Para lograr el objetivo de tener **componentes independientes y estancos**, donde un usuario pueda instalar solo `@headless-primitives/dialog` sin llevarse todo el peso de la librería entera (tal como hacen Radix UI o Base UI), la mejor solución en la actualidad es utilizar un enfoque de **Monorepo**.

## 1. Patrón Arquitectónico: Monorepo

Un monorepo nos permite tener todo el código en un solo repositorio de GitHub, pero dividirlo lógicamente en múltiples paquetes npm que se manejan, construyen y publican de forma independiente.

### Estructura de Carpetas Propuesta

```text
headless-primitives/
├── apps/
│   ├── docs/                   # Documentación y sitio web (Astro, Next.js, etc.)
│   └── playground/             # Entorno de pruebas locales
├── packages/
│   ├── core/                   # Utilidades compartidas (manejo de foco, IDs, a11y helpers)
│   ├── vanilla/                # Paquetes base (Web Components en Vanilla JS puro)
│   │   ├── dialog/             # -> @headless-primitives/dialog
│   │   ├── popover/            # -> @headless-primitives/popover
│   │   └── tabs/               # -> @headless-primitives/tabs
│   ├── react/                  # (A futuro) Wrappers para React
│   │   ├── dialog/             # -> @headless-primitives/react-dialog
│   │   └── tabs/               # -> @headless-primitives/react-tabs
│   └── vue/                    # (A futuro) Wrappers para Vue...
├── package.json                # Monorepo root y dependencias globales
└── pnpm-workspace.yaml         # Definición de workspaces (apps, packages/vanilla, etc.)
```

## 2. Tecnologías y Herramientas Base

Dado que el reto es crear código Vanilla y limpio, no usaremos librerías para _escribir_ el código, pero **SÍ** necesitamos buenas herramientas para compilar, versionar y testear el código.

Estas son las recomendaciones estándar actuales para este tipo de librerías:

### Gestor de Paquetes: `pnpm`

- **¿Por qué?** Es el rey actual de los monorepos. Su sistema de `workspaces` es nativo, muy rápido e impide problemas de "dependencias fantasma" (ghost dependencies).
- Cada carpeta dentro de `packages/*` tendrá su propio `package.json` y se conectará mediante `pnpm` workspace.

### Orquestador de Tareas: `Turborepo` (Opcional, pero muy recomendado)

- **¿Por qué?** Al tener muchos paquetes, correr `build` o `test` en todos ellos toma tiempo. Turborepo "cachea" (memoria caché) los resultados de construcción de todo el proyecto. Si solo modificas el código de `dialog`, Turborepo solo construirá `dialog` e ignorará los componentes y apps que no cambiaron.

### Empaquetador / Bundler: `Vite` (Library Mode)

- **¿Por qué?** Aunque escribiremos Vanilla TypeScript, es necesario empaquetarlo para distribuir versiones modulares `.js` (`esm` / `cjs`) y archivos de tipado limpios `.d.ts` en npm.
- Luego de analizar referentes líderes del mercado (**Radix UI** y **Base UI**), estandarizamos el uso del ecosistema Vite. Al basarse en Rollup, garantiza _tree-shaking_ óptimo (código muerto descartado) y una integración libre de fricciones de cara a la suite de testing elegida (`Vitest`).

### Versionamiento y Publicación: `Changesets`

- **¿Por qué?** Si queremos que cada primitivo se instale suelto, `<hp-dialog>` podría ir en la versión `1.0.3` mientras que un nuevo `<hp-popover>` recién nace en la versión `0.1.0`. `Changesets` maneja automáticamente los sub-versionados (`bump`) y publica múltiples paquetes a npm desde un monorepo al mismo tiempo de manera súper sencilla.

### Testing: `Vitest` + `Playwright`

- **¿Por qué?** Al ser componentes puramente del DOM (Custom Elements) la interacción de a11y, clicks y foco del teclado es vital.
- _Vitest_ serviría para probar la lógica rápida de JavaScript y funciones matemáticas o utils del área de `core`.
- _Playwright_ es excelente para testear en un entorno de navegador real si un modal atrapó correctamente el foco al apretar "Tab".

### Code Quality (Calidad de Código):

- `ESLint`: Para mantener las reglas estrictas de vanilla o patrones comunes.
- `Prettier`: Para que todos los archivos sigan el mismo formato sin pelear.
- `TypeScript`: Obligatorio en 2024+ para distribuir una API que devuelva autocompletado en el editor de los usuarios que usen la capa de JavaScript.

## 3. Dinámica de Dependencias Internas

Aunque sean independientes, existirán interdependencias **internas**. Por ejemplo:
El componente `@headless-primitives/popover` podría necesitar funciones como `trapFocus()` que vivan en `@headless-primitives/core`.

Gracias al _pnpm workspace_, dentro del `package.json` de `popover`, incluirás `"@headless-primitives/core": "workspace:*"` y pnpm sabrá que no debe descargarlo de internet, sino vincularlo localmente para el desarrollo. Cuando Changesets lo publique a npm, lo convertirá a la versión correspondiente.

## 4. Anatomía Interna de un Primitivo (Vanilla)

Para que el proyecto escale sin volverse un caos, **cada componente** dentro de `packages/vanilla/<componente>` deberá tener una estructura y "contrato" predecible.

### Estándar de Archivos

Un primitivo típico (ej. Dialog) se estructurará así:

```text
packages/vanilla/dialog/
├── src/
│   ├── index.ts                # Archivo principal que exporta la clase
│   ├── dialog.ts               # Lógica de la clase (class HpDialog extends HTMLElement)
│   ├── dialog.test.ts          # Tests unitarios locales en Vitest/Playwright
│   └── types.ts                # Interfaces de TS y nombres de Custom Events
├── package.json                # Configuración individual del paquete npm
├── tsconfig.json               # Configuración estricta heredada del root
└── vite.config.ts              # Configuración base de Vite para empaquetarlo en Library Mode
```

### El "Contrato" Estándar del Componente

Cada primitivo en _Vanilla JS_ respetará los siguientes ciclos de vida del estándar de Custom Elements:

1. `connectedCallback()`: Aquí se configuran los atributos ARIA iniciales (`aria-haspopup`, `role`, etc.) y se inician los _event listeners_ internos (como escuchar la tecla ESC).
2. `disconnectedCallback()`: Obligatorio limpiar todos los eventos y `timeouts` para evitar _memory leaks_.
3. `static get observedAttributes()`: Se define qué atributos HTML reaccionan reactivamente (ej. si el usuario cambia el atributo `open="true"`).
4. `attributeChangedCallback()`: Reacciona al cambio de estado y dispara internamente los custom events (`this.dispatchEvent(new CustomEvent('headless-change', ...))`).
