# ADR 0008: API Reference por etiqueta `hp-*` en la documentación

## Estado

Aceptado

## Contexto

Las guías de librerías headless en React (p. ej. [Radix UI](https://www.radix-ui.com/primitives/docs/components/avatar), [Base UI](https://base-ui.com/react/components/avatar)) documentan la API en subsecciones por parte compuesta (`Root`, `Image`, `Fallback`). Nuestros primitivos son Web Components (`hp-*`); la superficie pública no incluye props de React (`className` dinámico, `render`, etc.), pero sí múltiples etiquetas por paquete en componentes compuestos.

## Decisión

1. En `apps/docs/components/*.md`, la sección **API Reference** usa una subsección de nivel 3 por cada custom element del paquete: `### \`hp-parte\``, en orden anatómico (raíz primero).
2. Dentro de cada subsección, tablas opcionales en este orden: **Atributos**, **Propiedades** (JS), **Métodos**, **Eventos**, **Estados / ARIA**, **Variables CSS**, más una subsección **Comportamiento** cuando no encaje en tablas.
3. El contenido debe reflejar exactamente el código en `packages/vanilla/<nombre>/src`; no documentar capacidades que el primitivo no implemente.

## Consecuencias

- Las páginas compuestas (`field`, `avatar`) escalan de forma predecible al añadir piezas.
- Los agentes y contribuidores siguen la convención descrita en `AGENTS.md` sección 6.
- Mantener doc y código alineados es revisión explícita en cada cambio de API.
