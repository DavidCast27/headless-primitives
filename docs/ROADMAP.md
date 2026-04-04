# Roadmap de Componentes

Roadmap ordenado por complejidad (atomic design: átomos → moléculas → organismos).
Cada tier construye sobre los patrones del anterior. Los componentes están priorizados
cruzando tres fuentes: [Radix UI](https://github.com/radix-ui/primitives), [Shoelace/Web Awesome](https://github.com/shoelace-style/shoelace), y los [patrones WAI-ARIA de la W3C](https://www.w3.org/WAI/ARIA/apg/patterns/).

---

## Tier 0 — Utilidades Internas

Helpers compartidos que los componentes de tiers superiores reutilizarán.
No son componentes visibles para el usuario final, pero son la columna vertebral.

| Utilidad             | Descripción                                                        | Usado por                        |
| :------------------- | :----------------------------------------------------------------- | :------------------------------- |
| `hp-visually-hidden` | Oculta visualmente pero accesible para screen readers              | Label, Checkbox, Radio           |
| `uid()` helper       | Genera IDs únicos para vincular `aria-labelledby`, `aria-controls` | Todos                            |
| Focus Trap util      | Atrapa el foco dentro de un contenedor                             | Dialog, Alert Dialog             |
| Keyboard Nav util    | Helper para navegación con flechas (roving tabindex)               | Tabs, Radio Group, Menu, Toolbar |

---

## Tier 1 — Átomos (standalone, sin dependencias)

Componentes con un solo estado o interacción simple.
Cada uno implementa exactamente un patrón WAI-ARIA.

| #   | Componente    | Patrón WAI-ARIA                                            | Complejidad | Estado   |
| :-- | :------------ | :--------------------------------------------------------- | :---------- | :------- |
| 1   | **Button**    | [Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | 🟢 Baja     | ✅ Hecho |
| 2   | **Switch**    | [Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) | 🟢 Baja     | ✅ Hecho |
| 3   | **Separator** | — (role="separator")                                       | 🟢 Baja     | ✅ Hecho |
| 4   | **Progress**  | [Meter](https://www.w3.org/WAI/ARIA/apg/patterns/meter/)   | 🟢 Baja     | ✅ Hecho |
| 5   | **Label**     | — (aria-labelledby)                                        | 🟢 Baja     | ✅ Hecho |
| 6   | **Avatar**    | — (role="img" + fallback)                                  | 🟢 Baja     | ✅ Hecho |

**Por qué estos primero:** Son los ladrillos más simples. Cada uno tiene un solo elemento, un solo estado, y cero interacciones complejas de teclado más allá de Enter/Space.

---

## Tier 2 — Moléculas Simples (componen átomos, teclado moderado)

Componentes que combinan conceptos de átomos o coordinan múltiples elementos hijos.
Introducen navegación por flechas y sincronización de estado.

| #   | Componente       | Patrón WAI-ARIA                                                            | Complejidad | Dependencias        | Estado   |
| :-- | :--------------- | :------------------------------------------------------------------------- | :---------- | :------------------ | :------- |
| 7   | **Checkbox**     | [Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) (tri-state) | 🟡 Media    | ✅ Hecho            | ✅ Hecho |
| 8   | **Radio Group**  | [Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)             | 🟡 Media    | ✅ Hecho            | ✅ Hecho |
| 9   | **Toggle Group** | — (grupo de toggles excluyentes)                                           | 🟡 Media    | Button              | ✅ Hecho |
| 10  | **Collapsible**  | [Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)         | 🟡 Media    | —                   | ✅ Hecho |
| 11  | **Accordion**    | [Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)           | 🟡 Media    | Collapsible pattern | ✅ Hecho |
| 12  | **Tabs**         | [Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)                     | 🟡 Media    | Keyboard Nav util   | ✅ Hecho |

**Por qué este orden:** Checkbox y Radio Group son patterns de formulario esenciales. Collapsible es el building block del Accordion, así que va primero. Tabs es la culminación de este tier porque combina roving focus + panel switching.

---

## Tier 3 — Moléculas Complejas (overlays, focus management)

Componentes que crean capas flotantes sobre la UI.
Requieren Focus Trap, manejo de Escape, y control del scroll.

| #   | Componente       | Patrón WAI-ARIA                                                          | Complejidad | Dependencias                     |
| :-- | :--------------- | :----------------------------------------------------------------------- | :---------- | :------------------------------- | ---------------------------------------------- |
| 13  | **Tooltip**      | [Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)             | 🟡 Media    | —                                | ✅ Hecho                                       |
| 14  | **Popover**      | — (click-triggered floating)                                             | 🔴 Alta     | Focus Trap util                  | ✅ Hecho                                       |
| 15  | **Dialog**       | [Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | 🔴 Alta     | Focus Trap util, Popover pattern | ✅ Hecho                                       |
| 16  | **Alert Dialog** | [Alert Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/)    | 🔴 Alta     | Dialog                           | ✅ Hecho (variante de Dialog con `data-alert`) |
| 17  | **Toast/Alert**  | [Alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)                 | 🟡 Media    | —                                | ✅ Hecho                                       |

**Por qué este orden:** Tooltip es floating pero no atrapa foco (es el caso más simple de overlay). Popover introduce Focus Trap. Dialog se construye sobre esos mismos patterns pero añade scroll lock. Alert Dialog es una variante del Dialog.

---

## Tier 3.1 — Estilos Base por Defecto y Migración a Lit

Capa opcional entre el Tier 3 y el Tier 4. Provee estilos CSS base inspirados en Base UI
que los Consumers pueden adoptar como punto de partida y sobrescribir libremente.
La filosofía headless se mantiene: los estilos son 100% opcionales y externos a los Custom Elements.

Adicionalmente, este tier completa la migración de todos los componentes a `HeadlessElement`
(que extiende `LitElement` con Light DOM garantizado), unificando la base de código.

### Paquete `@headless-primitives/styles`

| Componente       | CSS Base | Tokens | Demo Playground | Override verificado | Migración Lit |
| :--------------- | :------: | :----: | :-------------: | :-----------------: | :-----------: |
| **Button**       |    ✅    |   ✅   |       ✅        |         ✅          |      ✅       |
| **Switch**       |    ✅    |   ✅   |       ✅        |         ✅          |      ✅       |
| **Checkbox**     |    ✅    |   ✅   |       ✅        |         ✅          |      ✅       |
| **Radio Group**  |    ✅    |   ✅   |       ✅        |         ✅          |      ✅       |
| **Toggle Group** |    ✅    |   ✅   |       ✅        |         ✅          |      ✅       |
| **Collapsible**  |    ✅    |   ✅   |       ✅        |         ✅          |      ✅       |
| **Accordion**    |    ✅    |   ✅   |       ✅        |         ✅          |      ✅       |
| **Tabs**         |    ✅    |   ✅   |       ✅        |         ✅          |      ✅       |
| **Tooltip**      |    ✅    |   ✅   |       ✅        |         ✅          |      ✅       |
| **Popover**      |    ✅    |   ✅   |       ✅        |         ✅          |      ✅       |
| **Dialog**       |    ✅    |   ✅   |       ✅        |         ✅          |      ✅       |
| **Toast**        |    ✅    |   ✅   |       ✅        |         ✅          |      ✅       |
| **Separator**    |    ✅    |   ✅   |       ✅        |         ✅          |      ✅       |
| **Progress**     |    ✅    |   ✅   |       ✅        |         ✅          |      ✅       |
| **Label**        |    ✅    |   ✅   |       ✅        |         ✅          |      ✅       |
| **Avatar**       |    ✅    |   ✅   |       ✅        |         ✅          |      ✅       |
| **Field**        |    —     |   —    |        —        |          —          |      ✅       |
| **Input Group**  |    —     |   —    |        —        |          —          |       —       |

### Criterios de "componente terminado" en Tier 3.1

- [ ] `@headless-primitives/styles/<componente>.css` creado con selectores de especificidad mínima
- [ ] Tokens CSS documentados en `README.md` del paquete
- [ ] Migración a `HeadlessElement` completada (ADR 0010)
- [ ] Demo en Playground con toggle headless/con-estilos actualizada
- [ ] Override verificado: las clases del Consumer tienen precedencia sobre los estilos base

---

## Tier 4 — Organismos (componen tiers 1-3, keyboard nav complejo)

Componentes que son composiciones de patterns anteriores.
Tienen la interacción de teclado más compleja (typeahead, nested menus, etc.).

| #   | Componente          | Patrón WAI-ARIA                                                                                                                  | Complejidad   | Dependencias                |
| :-- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------- | :------------ | :-------------------------- |
| 18  | **Dropdown Menu**   | [Menu Button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) + [Menu](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) | 🔴 Alta       | Button, Popover             |
| 19  | **Context Menu**    | Menu + right-click trigger                                                                                                       | 🔴 Alta       | Dropdown Menu               |
| 20  | **Select**          | — (trigger + listbox popup)                                                                                                      | 🔴 Alta       | Button, Popover, Listbox    |
| 21  | **Combobox**        | [Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)                                                                   | 🔴🔴 Muy Alta | Popover, Listbox, filtering |
| 22  | **Navigation Menu** | [Menu](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) + submenus                                                             | 🔴🔴 Muy Alta | Dropdown Menu               |

**Por qué estos al final:** Cada uno de estos compone múltiples patterns de tiers anteriores. El Combobox, por ejemplo, necesita un input, un listbox popup, filtrado, y keyboard navigation bindings que no existen en ningún componente previo como caso aislado.

---

## Tier 5 — Especializados (opcionales, según demanda)

Componentes que no todos los proyectos necesitan pero añaden mucho valor.

| #   | Componente      | Patrón WAI-ARIA                                                    | Complejidad   |
| :-- | :-------------- | :----------------------------------------------------------------- | :------------ |
| 23  | **Slider**      | [Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/)         | 🟡 Media      |
| 24  | **Toolbar**     | [Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)       | 🟡 Media      |
| 25  | **Breadcrumb**  | [Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/) | 🟢 Baja       |
| 26  | **Scroll Area** | — (custom scrollbar)                                               | 🔴 Alta       |
| 27  | **Tree View**   | [Tree View](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)    | 🔴🔴 Muy Alta |
| 28  | **Carousel**    | [Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)     | 🔴 Alta       |

---

## Grafo de Dependencias

```text
Button ✅
├── Toggle Group ✅
├── Dropdown Menu ──► Context Menu
│                └──► Navigation Menu
Switch ✅
Separator ✅
Progress ✅
Label ✅
Avatar ✅
Checkbox ✅
Radio Group ────────── Keyboard Nav util
✅
Collapsible ✅
├── Accordion ✅
Tabs ───────────────── Keyboard Nav util
✅
Tooltip
Popover ────────────── Focus Trap util
├── Dialog
│   └── Alert Dialog
├── Dropdown Menu
├── Select
└── Combobox
```

---

## Criterios para "Componente Terminado"

Ningún componente puede avanzar al siguiente sin cumplir:

- [ ] Implementación del Custom Element con patrón WAI-ARIA completo
- [ ] Tests de Vitest (ARIA, keyboard, disabled, eventos)
- [ ] Integrado en `apps/playground` con demo visual
- [ ] Documentado en `apps/docs/components/[nombre].md`
- [ ] Registrado en sidebar de VitePress
- [ ] Verificado: `lint + typecheck + test` pasan
