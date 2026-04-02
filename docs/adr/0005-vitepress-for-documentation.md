# 0005. VitePress como Motor de Documentación

## Contexto
Necesitábamos un portal de documentación oficial que permitiera:
- Escribir contenido en Markdown de forma ágil.
- Renderizar nuestros Custom Elements (`<hp-button>`, etc.) de forma interactiva dentro de las propias páginas de documentación.
- Mantener coherencia tecnológica con el resto del monorepo (basado en Vite).
- Desplegar un sitio estático rápido y profesional sin configuración excesiva.

## Alternativas Evaluadas

### Nextra (Next.js)
- **Descartado**: Requiere React y Next.js como dependencias obligatorias. Esto contradice nuestra filosofía Vanilla y añade un peso enorme al monorepo solo para documentación. Además, React tiene fricción histórica con Custom Elements nativos al competir por el control del DOM.

### Astro Starlight
- **Descartado**: Aunque Astro también usa Vite internamente, introduce su propia capa de abstracción (archivos `.astro`, Island Architecture). Añade complejidad innecesaria cuando nuestro caso de uso es simple: documentar componentes Vanilla con Markdown puro.

### VitePress
- **Seleccionado**: Es el hermano directo de Vite. Comparte el 100% del ecosistema de tooling que ya usamos (`vite.config.ts`, resolución de módulos, HMR). Los Custom Elements funcionan sin wrappers ni hacks porque VitePress no los intercepta con un Virtual DOM.

## Decisión
Adoptamos **VitePress** como el generador de sitios estáticos para la documentación oficial, alojado en `apps/docs`.

## Consecuencias
- **Sinergia total**: Un solo ecosistema Vite para compilar componentes, correr tests y generar documentación.
- **Demos interactivas**: Podemos importar `@headless-primitives/button` directamente en archivos `.md` y renderizar los componentes en vivo dentro de la documentación.
- **Buscador integrado**: VitePress provee búsqueda local sin dependencias externas (Algolia opcional a futuro).
- **Mantenimiento simple**: El contenido se escribe en Markdown puro; la configuración vive en un solo archivo `config.ts`.
- **Deployment**: El output estático (`.vitepress/dist`) es compatible con GitHub Pages, Vercel, Netlify o cualquier hosting estático.
