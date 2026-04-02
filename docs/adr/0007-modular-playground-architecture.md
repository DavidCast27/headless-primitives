# ADR 0007: Arquitectura Modular del Playground (Dashboard-style)

## Estado

Aceptado

## Contexto

Originalmente, el Playground de `headless-primitives` era una lista única de componentes (Cards) en un solo archivo HTML y CSS. A medida que la librería crecía, el archivo `index.html` y los scripts de inicialización se estaban volviendo inmanejables (monolíticos) y difíciles de navegar.

## Decisión

Hemos decidido migrar el Playground hacia una **Arquitectura de Dashboard Modular** con ruteo dinámico.

### Características Clave:

1.  **Dashboard Layout**: Se ha implementado una interfaz con Sidebar (navegación) y un Viewport central.
2.  **Demos Autónomas**: Cada componente tiene su propio módulo en `src/demos/[nombre].demo.ts`. Estos módulos encapsulan su HTML, su lógica de JS (`init`) y su propio archivo CSS (`import "./[nombre].css"`).
3.  **Registro de Rutas**: `main.ts` actúa como un orquestador ligero que asocia cada ID de componente con su configuración de demo.
4.  **Shell Component**: Se ha creado un componente utilitario `Shell` que estandariza la renderización, incluyendo resaltado de sintaxis con Prism.js y botones de copiado al portapapeles.

## Consecuencias

- **DX (Developer Experience)**: Añadir un nuevo componente ahora consiste en crear un archivo de demo y registrarlo en una línea de `main.ts`. No hay que tocar el `index.html` principal.
- **Escalabilidad**: El código está desacoplado. Cambiar el estilo de un botón no afecta al resto de las demos.
- **Rendimiento**: El sistema de ruteo dinámico permite previsualizar componentes de forma aislada y limpia.
- **Persistencia**: Se ha añadido soporte para URL query parameters (`?comp=button`) y navegación nativa (botón atrás/adelante).

## Patrón de Implementación

Para añadir un nuevo componente al Playground:

1.  Crear `src/demos/new-comp.demo.ts`.
2.  Crear `src/demos/new-comp.css` e importarlo en el `.ts`.
3.  Registrar la demo en el objeto `ROUTES` de `src/main.ts`.
