# 0002. Light DOM vs Shadow DOM

## Contexto
Los Web Components (Custom Elements) permiten el uso del Shadow DOM para encapsular la estructura HTML y el CSS visual. Esta es una característica muy poderosa, ya que previene que los estilos globales de una página afecten el layout interno del componente y viceversa.

Sin embargo, el objetivo principal de `headless-primitives` es ser una librería **framework-agnostic y sin estilos** ("headless"). Su filosofía central dicta que los desarrolladores que la consuman se encarguen completamente del diseño, usando sus soluciones CSS preferidas (por ejemplo: Tailwind CSS, CSS puro o preprocesadores).

Si utilizáramos Shadow DOM, el desarrollador que consume el componente estaría obligado a inyectar estilos mediante constructos especiales como `::part()`, complicando la DX (Experiencia del Desarrollador) y dificultando severamente el uso de librerías modernas de utilidad como Tailwind directamente sobre los nodos internos. Además, interactuar con el foco y la accesibilidad (a11y) tiene bastantes retos a través del *Shadow Boundary*.

## Decisión
**Hemos decidido usar Light DOM de manera predeterminada** para el funcionamiento y renderizado de los componentes. 
No se llamará a `this.attachShadow({ mode: "open" })` en los constructores/ciclos de vida de los primitivos, a menos que un patrón altamente particular lo exija estricta y obligatoriamente por diseño.

## Consecuencias Positivas
- **DX Transparente e Intuitiva**: Los usuarios pueden inyectar elementos y clases css directamente en los hijos o slots, de la misma forma que lo hacen en librerías headless de React (ej. Radix).
- **Accesibilidad (a11y) simplificada**: No existen "fronteras" del DOM que impidan asociar atributos `aria-describedby` o mantener el manejo del foco de manera predecible.

## Consideraciones
Toda la lógica estructural de ocultar/mostrar secciones de un componente (ej. cerrar un `dialog` o esconder las partes no activas de un `tabs`) deberá controlarse dinámicamente inyectando atributos como `hidden` o controlando el estado usando un JS que actúe sobre los elementos del *Light DOM* del usuario.
