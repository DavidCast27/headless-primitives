# Plan de Implementación de Estilos Base (base.css) v2.4

Este documento establece los estándares para los estilos funcionales mínimos de `headless-primitives`. El objetivo es proporcionar el comportamiento estructural necesario sin imponer diseño visual ni bloquear transiciones.

## 1. Variables CSS Funcionales (Customizable)

Se definen variables en el scope `:root` con valores por defecto seguros que el consumidor puede sobrescribir.

```css
:root {
  /* Z-indexes (Arquitectura de capas) */
  --hp-z-index-backdrop: 1000;
  --hp-z-index-overlay-content: 1100;
  --hp-z-index-popover: 1200;
  --hp-z-index-tooltip: 1300;

  /* Accesibilidad (Opcional/Customizable) */
  --hp-focus-outline-color: #2563eb;
  --hp-focus-outline-width: 2px;
}
```

## 2. Reglas por Arquetipo

Evitamos reglas globales agresivas que rompan transiciones. Separamos por comportamiento:

### A. Paneles (Tabs, Accordion)

Usamos `display: none` ya que los paneles no suelen requerir transiciones de salida complejas que mantengan el nodo en el flujo.

```css
[data-hp-panel][data-state="closed"],
[data-hp-panel][data-state="unselected"] {
  display: none;
}
```

Nota: No dupliques esta regla en los CSS de demos (`apps/playground` o páginas de docs). Las demos deben apoyarse en `base.css` para la visibilidad funcional mínima y solo añadir estilos presentacionales (bordes, espaciados, etc.).

### B. Overlays (Dialog, Popover, Tooltip)

Usamos `visibility` y `opacity` para permitir que el consumidor aplique transiciones CSS basadas en `data-state`.

```css
[data-hp-overlay-content][data-state="closed"],
[data-hp-backdrop][data-state="closed"] {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
}

[data-hp-overlay-content][data-state="open"],
[data-hp-backdrop][data-state="open"] {
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
}
```

## 3. Posicionamiento Semántico (Mínimo)

Eliminamos cualquier centrado o estilo presentacional.

```css
/* Backdrops */
[data-hp-backdrop] {
  position: fixed;
  inset: 0;
  z-index: var(--hp-z-index-backdrop);
}

/* Contenido de Overlays */
[data-hp-overlay-content] {
  position: fixed;
  z-index: var(--hp-z-index-overlay-content);
}

/* Floating Elements */
[data-hp-popover-content],
[data-hp-tooltip-content] {
  position: absolute;
  z-index: var(--hp-z-index-popover);
}
```

## 4. Accesibilidad y Foco

Limitamos el focus ring a los componentes `hp-*` para no interferir con el resto de la aplicación.

```css
[data-hp-component]:focus-visible {
  outline: var(--hp-focus-outline-width) solid var(--hp-focus-outline-color);
  outline-offset: 2px;
}

.hp-visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border-width: 0 !important;
}
```

### 4.1. Marcado del Root y Display Base

- Cada raíz de componente (`hp-*`) debe incluir el atributo `data-hp-component` para habilitar utilidades comunes (focus ring, display base opcional).
- Base opcional de display para evitar el comportamiento inline por defecto de custom elements:

```css
[data-hp-component] {
  display: block;
}
```

Los consumidores pueden sobrescribir este display según sus necesidades.

### 4.2. Relación ARIA–Estado

- Overlays deben sincronizar `aria-hidden="true|false"` en el contenido en paralelo a `data-state="open|closed"`.
- Si existe trigger asociado, alternar `aria-expanded="true|false"` y mantener `aria-controls` referenciando el contenido.

## 5. Validación en Playground

El `apps/playground` debe tener un modo "Pure Headless" que:

1. Elimine todos los estilos de demo.
2. Cargue **únicamente** `base.css`.
3. Verifique que los componentes son operables (se abren/cierran y son accesibles).

Checklist adicional por arquetipo:

- Paneles: cambiar `data-state` a `closed/unselected` oculta el panel vía `display: none` sin estilos inline.
- Overlays: cambiar `data-state` a `open/closed` alterna visibilidad/opacity/pointer-events correctamente y `aria-hidden` refleja el estado.

## 6. Convención de Nombres y Mapeo por Componente

Para mantener `base.css` estable y predecible, cada componente debe documentar y respetar su mapeo de atributos `data-hp-*` y estados canónicos.

### 6.1. Atributos `data-hp-*` reservados

- `[data-hp-component]`: marca la raíz del componente (habilita display base y focus ring opcional).
- `[data-hp-panel]`: marca paneles de contenido conmutables (tabs, accordion, collapsible).
- `[data-hp-overlay-content]`: contenido de overlays (dialog, popover, etc.).
- `[data-hp-backdrop]`: backdrop de overlays.
- `[data-hp-popover-content]`, `[data-hp-tooltip-content]`: contenido flotante específico.

Otros `data-hp-*` específicos pueden definirse por componente, manteniendo la prefijación `data-hp-` y evitando colisiones.

### 6.2. Estados canónicos (`data-state`)

- Paneles: `open|closed` o `selected|unselected` (usar uno, consistente por componente).
- Overlays: `open|closed`.
- Inputs: `checked|unchecked` (no usar `data-state` para disabled; usar `[disabled]` o `aria-disabled`).

### 6.3. Revisión obligatoria en PRs

- El componente aplica los `data-hp-*` acordados y usa estados canónicos.
- No existen estilos inline que contradigan `base.css` (visibilidad, pointer-events, posicionamiento mínimo).
- Las reglas de `base.css` cubren exactamente los selectores expuestos por el componente.

## 7. Guía de demos en `apps/docs`

Para asegurar consistencia entre documentación y comportamiento headless:

- Cada página `apps/docs/components/[nombre].md` debe:
  - Incluir una sección “Estados y Selectores” que liste atributos públicos, roles ARIA y todos los `data-hp-*`/`data-state` relevantes.
  - Importar `@headless-primitives/base.css` (o incluir sus reglas mínimas) para que la demo funcione headless.
  - Mostrar cómo personalizar transiciones y visibilidad basadas en `data-state` en dos sabores:
    - `<Flavor only="css">`: CSS puro usando `[data-state]`.
    - `<Flavor only="tailwind">`: clases utilitarias basadas en `data-[state=open]`/`data-[state=closed]`.
  - Declarar `display:block` para `hp-*` o usar `[data-hp-component] { display:block }` del base.
