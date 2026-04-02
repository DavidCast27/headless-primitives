# Guía para Agentes de IA en `headless-primitives`

¡Hola, compañero agente IA (Gemini, Claude, Cursor, o cualquier otro)! Al escribir, sugerir o modificar código en este repositorio, DEBES seguir estrictamente las siguientes reglas arquitectónicas y de diseño.

## 1. Regla de Oro: Vainilla y Sin Dependencias Externas
- **Cero dependencias:** No instales ni uses librerías de terceros (npm) para el núcleo de los componentes.
- **Sin Frameworks:** Está terminantemente PROHIBIDO utilizar React, Vue, Svelte, Angular, Astro o cualquier otro framework en el código fuente de los primitivos. 
- **Incluso sin Lit:** Aunque es una librería popular para Web Components, se ha tomado la decisión deliberada de utilizar **Vanilla JS/TypeScript puro**.

## 2. Web Components Nativos (Custom Elements)
- Todo componente debe ser construido como un Custom Element extendiendo la clase nativa: `class ComponentName extends HTMLElement { ... }`.
- Recuerda definir siempre el elemento: `customElements.define('headless-component', ComponentName)`.
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

## 6. Documentación y Registro de Decisiones (ADR)
- **Architecture Decision Records:** Cada vez que termines una tarea que implique una decisión de diseño profundo, arquitectura, o cambio tecnológico importante, **DEBES** documentarlo o sugerir documentarlo añadiendo un archivo en la carpeta `docs/adr/` usando el formato `[numero-secuencial]-[nombre-decision].md`. Esto mantiene un historial vivo ('Decision Log') del proyecto.

## 7. Playground-Driven Development
- **Obligatoriedad Visual:** Ningún primitivo puede darse por concluido sin haberse integrado al `apps/playground`.
- Todo componente nuevo debe importarse en el `main.ts` respectivo y poseer su propia caja de demostración visual en el `index.html` consumiendo CSS agnóstico de prueba. Esto valida tajantemente la Experiencia de Desarrollador (DX) y el cumplimiento de la política Headless.

---
> Al procesar cualquier solicitud del usuario referente a escribir código funcional en este proyecto, revisa esta guía mentalmente antes de sugerir `import React` o `npm module`.
