# Workflow: Estándares de Estilos y Tematización

Este documento detalla la arquitectura de estilos de dos capas de Headless Primitives y cómo añadir estilos para un nuevo componente.

## 0. Etapa de Referencia (Estilos Gold Standard)

Para asegurar la consistencia visual y estructural, revisa estos archivos de referencia:

- **`packages/vanilla/styles/src/button.css`**: Ejemplo base de uso de tokens y estados interactivos simples.
- **`packages/vanilla/styles/src/accordion.css`**: Patrón para componentes compuestos y estados de visibilidad (`data-state`).
- **`packages/vanilla/styles/src/dialog.css`**: Referencia absoluta para overlays, animaciones de entrada/salida y backdrops.

---

## 1. Capa Estructural (`base.css`)

Ubicación: `packages/vanilla/utils/src/base.css`

Esta capa es **obligatoria** para la funcionalidad básica (visibilidad, posicionamiento, accesibilidad). NO debe contener colores, fuentes decorativas ni bordes específicos de un tema.

### Reglas para nuevos componentes:

1.  **Display Block**: Todos los custom elements son `inline` por defecto. Añade tu etiqueta a la lista de `display: block`.
    ```css
    hp-<nombre >,
    hp-<parte > {
      display: block;
    }
    ```
2.  **Visibilidad**: Si el componente tiene estados abierto/cerrado, usa `[data-state="closed"]` para ocultarlo.
    - Si es un panel (Accordion, Tabs), añádelo a la sección `/* A. Paneles */`.
    - Si es un overlay (Dialog, Popover), añádelo a la sección `/* B. Overlays */`.
3.  **Apariencia Mínima**: Añade una sección al final de `base.css` para que el componente sea usable "out of the box" usando solo `currentColor` y `Canvas/CanvasText`.
    - Usa `color-mix(in srgb, currentColor 10%, transparent)` para hovers.
    - Usa `border: 1px solid currentColor` para bordes base.

---

## 2. Capa Visual (`@headless-primitives/styles`)

Ubicación: `packages/vanilla/styles/src/`

Esta capa es **opcional** y proporciona el tema "Premium" (estilo Radix/Base UI).

### Pasos para añadir un componente:

1.  **Crear archivo**: `packages/vanilla/styles/src/<nombre>.css`.
2.  **Definir Tokens**: Usa CSS Variables con el prefijo `--hp-`.
    ```css
    hp-<nombre > {
      --hp-<nombre>-bg: var(--hp-surface);
      --hp-<nombre>-border: var(--hp-border-subtle);
    }
    ```
3.  **Estilos de Estado**: Usa atributos ARIA y `data-state` para los estilos.
    ```css
    hp-<nombre>[data-state="open"] { ... }
    hp-<nombre>[aria-disabled="true"] { ... }
    ```
4.  **Registrar**:
    - Añade el archivo a `exports` en `packages/vanilla/styles/package.json`.
    - Impórtalo en `packages/vanilla/styles/src/index.css`.

---

## 3. Estilos de Demos (Playground)

Ubicación: `apps/playground/src/demos/<nombre>.css`

Los estilos de la demo deben servir como ejemplo de cómo un usuario final estilizaría el componente.

- **Aislamiento**: Usa una clase contenedora (ej. `.demo-<nombre>`) para evitar colisiones.
- **Variables de Tema**: Usa las variables globales de la playground si están disponibles.
- **Interactividad**: Asegura que los estados `:hover`, `:focus-visible` y `[aria-selected="true"]` sean visualmente claros.

---

## 4. Estilos en Documentación

Ubicación: Bloque `<style>` dentro de `apps/docs/components/<nombre>.md`

- Usa las variables de VitePress para que el componente combine con el tema claro/oscuro de la doc:
  - `--vp-c-brand-1` (Color principal)
  - `--vp-c-bg-soft` (Fondos secundarios)
  - `--vp-c-text-1` (Texto principal)
- **Importante**: No incluyas estilos globales. Todos los selectores deben ser específicos a la demo del componente.
