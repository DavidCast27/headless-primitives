# Guía para Agentes de IA en `headless-primitives`

¡Hola, compañero agente IA (Gemini, Claude, Cursor, o cualquier otro)! Al escribir, sugerir o modificar código en este repositorio, DEBES seguir estrictamente las siguientes reglas arquitectónicas y de diseño.

## 1. Regla de Oro: Vainilla y Sin Dependencias Externas

- **Cero dependencias:** No instales ni uses librerías de terceros (npm) para el núcleo de los componentes.
- **Sin Frameworks:** Está terminantemente PROHIBIDO utilizar React, Vue, Svelte, Angular, Astro o cualquier otro framework en el código fuente de los primitivos.
- **Incluso sin Lit:** Aunque es una librería popular para Web Components, se ha tomado la decisión deliberada de utilizar **Vanilla JS/TypeScript puro**.

## 2. Web Components Nativos (Custom Elements)

- Todo componente debe ser construido como un Custom Element extendiendo la clase nativa: `class ComponentName extends HTMLElement { ... }`.
- Recuerda definir siempre el elemento: `customElements.define('hp-component', ComponentName)`.
- **API Basada en Slots:** Utiliza al máximo `<slot>` para la inyección de contenido, y no uses patrones de props similares a React. Ejemplos de uso de `name="trigger"`, `name="content"`, etc.

## 3. Filosofía 100% "Headless"

- **Sin Estilos (No CSS visual):** No estamos construyendo componentes visuales. No introduzcas clases CSS de utilidad (como Tailwind) ni añadas bordes, colores o sombras en el componente en sí.
- Sólo es válido aplicar estilos **estrictamente referidos al funcionamiento local del comportamiento** (por ejemplo, ocultar temporalmente algo: `display: none`).
- El usuario consumirá la funcionalidad y aplicará sus propios estilos.

## 4. Accesibilidad (a11y) ante todo

El mayor valor de esta librería es que la accesibilidad venga resuelta de fábrica ("built-in"). Al crear o editar código, asegúrate de:

- Añadir y manipular correctamente los atributos `aria-*` según los estándares de la W3C (ej. `aria-expanded`, `aria-hidden`, `aria-activedescendant`).
- Agregar atributos `role` apropiados a las etiquetas HTML implicadas.
- Soportar e implementar manejo estricto del foco (Focus Management), especialmente en modales, popovers o menús.
- Implementar la interacción completa con el teclado (Tab, Esc, Enter, Espacio, y las flechas direccionales) según corresponda para cada patrón.

## 5. Diseño de API y Estado

- Los componentes deben poder controlarse tanto mediante **atributos HTML** (y observando sus cambios con `attributeChangedCallback`) como mediante **propiedades/métodos de JavaScript**.
- Mantén el estado interno del componente muy claro, de forma que emitir Custom Events (`this.dispatchEvent(...)`) cuando ocurran cambios de estado sea fácil y predecible para el desarrollador que lo consume.
- Siempre usa nombres amigables prestando atención al prefijo `hp-` para las etiquetas de custom elements (ej. `<hp-dialog>`).
- Siempre usa el prefijo `hp-` para los eventos personalizados (ej. `hp-change`, `hp-open`).

## 6. Documentación y Registro de Decisiones (ADR)

- **Architecture Decision Records:** Cada vez que termines una tarea que implique una decisión de diseño profundo, arquitectura, o cambio tecnológico importante, **DEBES** documentarlo añadiendo un archivo en la carpeta `docs/adr/` usando el formato `[numero-secuencial]-[nombre-decision].md`.
- **Documentación del Componente:** Cada componente nuevo **DEBE** tener su página en `apps/docs/components/[nombre].md` siguiendo el **Estándar Premium** (resumen en [ADR 0008](docs/adr/0008-docs-api-reference-by-custom-element.md)):
  - **Identidad**: Badge "Nuevo" y guía de instalación clara.
  - **Anatomía**: Snippet único en un bloque Markdown ` ```html ` con el árbol anidado de etiquetas `hp-*` (estilo Radix/Base UI), no listas en cuadros separados.
  - **Code Tabs**: Separación de HTML y CSS usando `::: code-group`.
  - **API Reference** (`## API Reference`): Una subsección `### \`hp-parte\`` por cada custom element del paquete (orden: raíz primero, luego hijos según la anatomía). En cada pieza, tablas **en el orden**: Atributos que el primitivo observa o documenta, Propiedades JavaScript públicas (getters/setters), Métodos públicos, Eventos personalizados (`hp-_`) y nativos relevantes, Estados (`data-_`) / notas ARIA que el código establece, Variables CSS en línea si aplica. La documentación **debe coincidir** con el código en `packages/vanilla/<nombre>/src/`(sin inventar atributos tipo React como`className`; si el código no lo implementa, no figura en la tabla).

## 7. Playground-Driven Development

- **Obligatoriedad Visual:** Ningún primitivo puede darse por concluido sin haberse integrado al `apps/playground`.
- Todo componente nuevo debe seguir la **Arquitectura Modular (ADR 0007)**:
  1. Registrarse como dependencia en `apps/playground/package.json`.
  2. Crear un módulo de demo en `apps/playground/src/demos/[nombre].demo.ts`.
  3. Crear su propio estilo en `apps/playground/src/demos/[nombre].css` e importarlo en la demo.
  4. Registrar la demo en el objeto `ROUTES` de `apps/playground/src/main.ts`.
  5. Añadir el botón de navegación correspondiente en `apps/playground/index.html`.

## 8. Calidad de Código

- **Linting:** Usamos **Oxlint** (no ESLint). La configuración está en `.oxlintrc.json`.
- **Formatting:** Usamos **Oxfmt** (no Prettier). Ejecuta `pnpm run format` antes de hacer commit.
- **Testing:** Todo componente **DEBE** tener un archivo `[nombre].test.ts` con pruebas de Vitest + Happy-DOM que cubran: atributos ARIA, estados disabled, interacción con teclado y eventos custom.
- **Commits:** Seguimos **Conventional Commits** (ej: `feat:`, `fix:`, `chore:`, `docs:`). Commitlint los valida automáticamente.

## 9. Estructura de un Nuevo Componente

Al crear un nuevo componente (ej. `dialog`), sigue esta estructura exacta:

```
packages/vanilla/dialog/
├── package.json          # name: @headless-primitives/dialog
├── tsconfig.json         # extends: ../../../tsconfig.base.json
├── vite.config.ts        # Library mode + happy-dom test env
└── src/
    ├── dialog.ts         # Implementación del Custom Element
    ├── dialog.test.ts    # Tests de Vitest
    ├── types.ts          # Interfaces y tipos
    └── index.ts          # Exportaciones + customElements.define()
```

---

> Al procesar cualquier solicitud del usuario referente a escribir código funcional en este proyecto, revisa esta guía mentalmente antes de sugerir `import React` o `npm install`.
