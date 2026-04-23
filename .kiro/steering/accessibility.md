---
inclusion: auto
description: Requisitos WAI-ARIA, soporte de teclado, utilidades de accesibilidad y objetivos de contraste WCAG para todos los componentes.
---

# Accesibilidad — headless-primitives

La accesibilidad es la prioridad número uno. Todos los componentes deben cumplir WAI-ARIA.

## Requisitos obligatorios por componente

- Siempre establecer `role` apropiado al elemento
- Siempre gestionar: `aria-disabled`, `aria-pressed`, `aria-expanded`, `aria-modal`, `aria-hidden`
- Siempre sincronizar atributos ARIA en `_sync()` síncronamente

## Soporte de teclado requerido

| Tipo de componente              | Teclas requeridas                                                                      |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| Botones/triggers                | `Enter` / `Space` para activar                                                         |
| Grupos (tabs, accordion, radio) | `Arrow`, `Home`, `End` para navegar                                                    |
| Modales/dialogs                 | `Escape` para cerrar (excepto modo `alert`)                                            |
| Navigation menu                 | `ArrowLeft`/`ArrowRight` entre triggers, `Escape` cierra y devuelve foco, `Tab` cierra |
| Menús desplegables              | `ArrowUp`/`ArrowDown`, `Escape`, `Enter`                                               |

## Utilidades de accesibilidad (desde `@headless-primitives/utils`)

- `FocusTrap` — para dialogs/modales
- `RovingTabindex` — para navegación tipo menú

## CSS de accesibilidad

- Elementos disabled deben tener `pointer-events: none` en CSS
- `.hp-visually-hidden` en `base.css` para contenido solo para lectores de pantalla (usa `!important` — es la única excepción permitida)
- `:focus-visible` siempre con `--hp-focus-outline-color` y `--hp-focus-outline-width`

## Atributos ARIA por patrón

### Botón/Trigger

```
role="button", aria-haspopup, aria-expanded, aria-controls, aria-disabled
```

### Dialog/Modal

```
role="dialog" (o "alertdialog"), aria-modal="true", aria-hidden cuando cerrado
```

### Navigation Menu

```
role="navigation" en raíz, role="menubar" en lista, role="none" en items,
aria-orientation="horizontal", aria-haspopup, aria-expanded, aria-controls
```

### Scrollbar (Scroll Area)

```
role="scrollbar", aria-orientation="vertical|horizontal",
aria-controls (referencia al viewport), aria-valuemin="0",
aria-valuenow (posición actual en px), aria-valuemax (máximo scroll en px)
tabindex="0" — el scrollbar es focusable para navegación por teclado
hp-scroll-area-corner: aria-hidden="true" (elemento decorativo)
```

Teclado requerido para `hp-scroll-area-scrollbar`:

- `ArrowDown/Up` — scroll vertical en pasos de 40px
- `ArrowLeft/Right` — scroll horizontal en pasos de 40px
- `PageDown/Up` — scroll por altura/anchura del viewport
- `Home/End` — ir al inicio/fin del contenido

### Checkbox

```
role="checkbox", aria-checked="true|false|mixed", aria-disabled, aria-required
```

### Tabs

```
role="tablist", role="tab", role="tabpanel",
aria-selected, aria-controls, aria-labelledby
```

## Contraste de color (WCAG)

- Texto normal: 4.5:1 mínimo (WCAG 1.4.3 AA)
- Bordes de componentes UI interactivos: 3:1 mínimo (WCAG 1.4.11)
- Estados disabled: exentos de requisitos de contraste
- Los tokens dark mode en `theme.css` incluyen comentarios con ratios de contraste calculados
