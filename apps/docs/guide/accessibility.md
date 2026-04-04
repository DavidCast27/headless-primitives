# Accesibilidad

Headless Primitives construye accesibilidad desde la capa más baja: cada componente es un Custom Element que implementa su patrón WAI-ARIA correspondiente. No es una capa añadida sobre el hecho — es la razón de existir de la librería.

## Conformidad WCAG 2.1

El paquete de estilos (`@headless-primitives/styles`) garantiza contraste mínimo **WCAG 2.1 AA** en todos sus tokens por defecto:

| Criterio                     | Ratio mínimo | Aplica a                            |
| :--------------------------- | :----------- | :---------------------------------- |
| **1.4.3 Contrast (Minimum)** | 4.5 : 1      | Texto normal, labels, descripciones |
| **1.4.11 Non-text Contrast** | 3 : 1        | Bordes de checkbox, radio, switch   |
| **1.4.3 excepción disabled** | exento       | Estados `disabled`                  |

Si reemplazas los tokens de color con los tuyos, la responsabilidad de contraste pasa a tu aplicación. Usa herramientas como [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/) o la DevTools de tu navegador para verificar.

---

## Roles y patrones ARIA

Cada componente implementa el patrón oficial de la **WAI-ARIA Authoring Practices Guide**:

| Componente        | Patrón WAI-ARIA                                                               | Roles asignados                                                         |
| :---------------- | :---------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| `hp-button`       | [Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)            | `role="button"`                                                         |
| `hp-accordion`    | [Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)      | `role="region"` en paneles, `aria-expanded` en triggers                 |
| `hp-checkbox`     | [Checkbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)        | `role="checkbox"`, `aria-checked`                                       |
| `hp-radio-group`  | [Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)        | `role="radiogroup"`, `role="radio"`                                     |
| `hp-switch`       | [Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)            | `role="switch"`, `aria-checked`                                         |
| `hp-tabs`         | [Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)                | `role="tablist"`, `role="tab"`, `role="tabpanel"`                       |
| `hp-dialog`       | [Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)      | `role="dialog"`, `aria-modal`, `aria-labelledby`                        |
| `hp-alert-dialog` | [Alert Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) | `role="alertdialog"`                                                    |
| `hp-popover`      | [Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)    | `aria-expanded`, `aria-controls`                                        |
| `hp-tooltip`      | [Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)          | `role="tooltip"`, `aria-describedby`                                    |
| `hp-collapsible`  | [Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)    | `aria-expanded`, `aria-controls`                                        |
| `hp-toggle-group` | [Toolbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)          | `role="group"`, `aria-pressed` por item                                 |
| `hp-progress`     | [Progressbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/meter/)        | `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |

---

## Navegación por teclado

Todos los componentes interactivos son completamente navegables sin ratón.

### Teclas comunes

| Tecla               | Comportamiento                                  |
| :------------------ | :---------------------------------------------- |
| `Tab` / `Shift+Tab` | Mover foco entre componentes                    |
| `Enter` / `Space`   | Activar botones, checkboxes, switches, triggers |
| `Escape`            | Cerrar dialogs, popovers, tooltips              |

### Por componente

**Accordion / Collapsible**

| Tecla             | Comportamiento                    |
| :---------------- | :-------------------------------- |
| `Enter` / `Space` | Expande o colapsa el panel activo |
| `Tab`             | Mueve al siguiente trigger        |

**Tabs**

| Tecla                      | Comportamiento                             |
| :------------------------- | :----------------------------------------- |
| `ArrowLeft` / `ArrowRight` | Navega entre tabs y activa automáticamente |
| `Home` / `End`             | Primer / último tab                        |

**Radio Group**

| Tecla                      | Comportamiento                 |
| :------------------------- | :----------------------------- |
| `ArrowUp` / `ArrowDown`    | Mueve selección entre opciones |
| `ArrowLeft` / `ArrowRight` | Igual que arriba / abajo       |

**Dialog / Alert Dialog**

| Tecla       | Comportamiento                                 |
| :---------- | :--------------------------------------------- |
| `Escape`    | Cierra el dialog                               |
| `Tab`       | Cicla el foco _dentro_ del dialog (focus trap) |
| `Shift+Tab` | Cicla en sentido inverso dentro del dialog     |

> El focus trap está implementado nativamente — al abrir un dialog el foco entra automáticamente y no puede escapar hasta que se cierra.

**Toggle Group**

| Tecla                      | Comportamiento                      |
| :------------------------- | :---------------------------------- |
| `ArrowLeft` / `ArrowRight` | Navega entre items                  |
| `Enter` / `Space`          | Activa / desactiva el item enfocado |

---

## Gestión del foco

### Foco inicial al abrir overlays

Los componentes `hp-dialog`, `hp-alert-dialog` y `hp-popover` mueven el foco automáticamente al abrirse:

- **Dialog / Alert Dialog**: el foco va al primer elemento enfocable dentro del contenido.
- **Popover**: el foco va al primer elemento enfocable dentro del panel.

Al cerrarse, el foco regresa al elemento que lo disparó (el trigger).

### Focus ring

Todos los elementos interactivos tienen un `:focus-visible` configurado por `base.css`:

```css
[data-hp-component]:focus-visible {
  outline: var(--hp-focus-outline-width) solid var(--hp-focus-outline-color);
  outline-offset: 2px;
}
```

Los valores por defecto (`#2563eb`, `2px`) cumplen WCAG 2.4.11 (Focus Appearance, nivel AA). Puedes cambiarlos:

```css
:root {
  --hp-focus-outline-color: #7c3aed; /* tu color de marca */
  --hp-focus-outline-width: 3px; /* más visible */
}
```

---

## Textos ocultos para lectores de pantalla

Usa la clase `.hp-visually-hidden` (incluida en `base.css`) para añadir contexto a lectores de pantalla sin afectar el diseño visual:

```html
<hp-button aria-label="Cerrar dialog">
  ✕
  <span class="hp-visually-hidden">Cerrar</span>
</hp-button>
```

Esta clase implementa la técnica estándar de visually-hidden: el elemento existe en el DOM y es leído por asistentes, pero ocupa 1×1px y es invisible.

---

## Pruebas de accesibilidad recomendadas

Además de las herramientas automáticas (axe, Lighthouse), valida manualmente:

1. **Navega con Tab únicamente** — cada elemento interactivo debe ser alcanzable y operable.
2. **Prueba con un lector de pantalla** — VoiceOver (macOS/iOS), NVDA (Windows), TalkBack (Android).
3. **Aumenta el zoom al 200%** — el contenido no debe romperse ni quedar oculto.
4. **Activa `prefers-reduced-motion`** — las animaciones deben desactivarse o simplificarse.
