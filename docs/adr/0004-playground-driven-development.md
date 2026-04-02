# 0004. Playground-Driven Development

## Contexto

Hemos establecido una rigurosa máquina de pruebas (`Vitest + Happy-DOM`) para validar la lógica pura (estado, foco, a11y) de nuestros Web Components (Custom Elements). Sin embargo, al ser elementos nativos visuales (DOM Nodes), confiar ciegamente en pruebas unitarias en consola omite la capa de usabilidad real, los posibles conflictos CSS y la Experiencia de Desarrollador (DX) al consumirlos.

## Decisión

Hemos implementado una aplicación de consumo interno aislada: el **Playground** (`apps/playground`), construida en Vite + Vanilla TS.
A partir de este momento, se establece la política de "Playground-Driven". **Ningún componente será considerado terminado si no ha sido integrado visualmente en el Playground**.

## Pasos Obligatorios para Nuevos Componentes

Cada vez que un desarrollador o agente de IA cree un componente nuevo (e.g. `@headless-primitives/dialog`), debe obligatoriamente:

1. Registrarlo como dependencia en `apps/playground/package.json` (`"workspace:*"`).
2. Importarlo en `apps/playground/src/main.ts`.
3. Exhibir su funcionamiento en `apps/playground/index.html` creando una nueva "Card" de demostración y añadiendo CSS agnóstico de estilo ilustrativo.

## Consecuencias

- Un bucle de desarrollo visual que asegura interactividad real sin requerir lanzar aplicaciones externas pesadas.
- Actuará como catálogo vivo, documentado y visualmente auditable para corroborar el deslinde del diseño visual respecto a la lógica estricta interna (_Headless_).
