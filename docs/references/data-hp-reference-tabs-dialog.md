# Referencia Rápida: mapeo `data-hp-*` para Tabs y Dialog (v1)

Esta hoja resume nombres reservados, estados y ejemplos de marcado para Tabs y Dialog. Úsala durante implementación y review de PRs.

**Convenciones Generales**

- `data-hp-component`: marca la raíz del componente; puede activar estilos base (`display:block`, focus ring).
- Estados canónicos: `open|closed`, `selected|unselected`, `checked|unchecked` (según patrón).
- ARIA alineada: overlays alternan `aria-hidden` en content y `aria-expanded` en trigger; triggers mantienen `aria-controls`.
- Triggers: opcional `data-hp-trigger` para consistencia y tests; no requerido por `base.css`.

**Tabs**

- Root: `hp-tabs[data-hp-component]` con atributo `value` reflejado.
- Partes:
  - `hp-tab-list` (rol `tablist`).
  - `hp-tab` (rol `tab`, `aria-selected`, `tabindex` gestionado, opcional `data-hp-trigger`).
  - `hp-tab-panel[data-hp-panel]` (rol `tabpanel`, `tabindex="0"`).
- Estados:
  - Panel: `data-state="selected|unselected"` o alternativamente `open|closed` (elige uno y sé consistente).
  - Tab: `aria-selected="true|false"` y `tabindex` acorde.
- Eventos:
  - `hp-change`: `detail: { value: string }` al cambiar de pestaña.
- Teclado: `ArrowLeft/Right/Up/Down`, `Home`, `End`, `Enter/Space` para activar.
- Ejemplo (estado explícito via `data-state`):

```html
<hp-tabs data-hp-component value="account">
  <hp-tab-list>
    <hp-tab value="profile" aria-selected="false" tabindex="-1">Profile</hp-tab>
    <hp-tab value="account" aria-selected="true" tabindex="0">Account</hp-tab>
    <hp-tab value="billing" aria-selected="false" tabindex="-1">Billing</hp-tab>
  </hp-tab-list>

  <hp-tab-panel data-hp-panel value="profile" data-state="unselected">...</hp-tab-panel>
  <hp-tab-panel data-hp-panel value="account" data-state="selected">...</hp-tab-panel>
  <hp-tab-panel data-hp-panel value="billing" data-state="unselected">...</hp-tab-panel>
</hp-tabs>
```

Notas:

- `base.css` oculta paneles con `data-hp-panel[data-state="unselected"]` (o `closed` si prefieres ese naming).
- El componente debe mantener `value` sincronizado con `aria-selected` de los `hp-tab` y `data-state` de los `hp-tab-panel`.

**Dialog**

- Root: `hp-dialog[data-hp-component]` con propiedad/atributo `open` reflejado (o manejado por trigger y estado interno).
- Partes:
  - Trigger: cualquier elemento interactivo, opcional `data-hp-trigger`, alterna `aria-expanded` y `aria-controls`.
  - Content: `hp-dialog-content[data-hp-overlay-content]` (rol `dialog`, `aria-modal="true"`, alterna `aria-hidden`).
  - Backdrop: `hp-dialog-backdrop[data-hp-backdrop]` (bloquea interacción de fondo).
- Estados:
  - Content/Backdrop: `data-state="open|closed"` en ambos.
- Eventos:
  - `hp-open` al abrir; `hp-close` al cerrar.
- Teclado y foco:
  - `Escape` cierra (salvo modalidad de alerta), focus trap activo dentro del content y restauración de foco al cerrar. Bloqueo de scroll cuando aplique.
- Ejemplo (alineado con `base.css`):

```html
<hp-dialog data-hp-component>
  <button data-hp-trigger aria-expanded="false" aria-controls="dlg-1">Open</button>

  <hp-dialog-backdrop data-hp-backdrop data-state="closed"></hp-dialog-backdrop>

  <hp-dialog-content
    id="dlg-1"
    data-hp-overlay-content
    role="dialog"
    aria-modal="true"
    aria-hidden="true"
    data-state="closed"
  >
    <!-- contenido del diálogo -->
    <button data-action="close">Close</button>
  </hp-dialog-content>
</hp-dialog>
```

Notas:

- `base.css` usa `visibility/opacity/pointer-events` para `data-hp-overlay-content`/`data-hp-backdrop` según `data-state`.
- El trigger debe alternar `aria-expanded` y mantener `aria-controls` hacia el content.
- El content alterna `aria-hidden` acorde a `data-state`.

**Buenas Prácticas**

- Mantén consistencia: usa un único par de estados por patrón (Tabs: `selected/unselected`; Dialog: `open/closed`).
- Evita estilos inline para visibilidad/posición; confía en `data-state` + `base.css`.
- Exponlo todo por atributos: `@property({ reflect:true })` en Lit para `value`, `open`, etc.
- Tests: valida visibilidad efectiva (display/visibility/pointer-events) derivada de `data-state`, además de ARIA y eventos.
