# Eventos

Todos los eventos de Headless Primitives son **Custom Events nativos del navegador**. Usan el prefijo `hp-` para evitar colisiones con eventos del DOM estándar. Todos tienen `bubbles: true` y `composed: true` salvo que se indique lo contrario.

## Referencia rápida

| Componente          | Evento            | Detalle                            | Disparado cuando              |
| :------------------ | :---------------- | :--------------------------------- | :---------------------------- |
| `hp-button`         | `hp-change`       | `{ pressed: boolean }`             | Cambia `aria-pressed`         |
| `hp-checkbox`       | `hp-change`       | `{ checked: boolean \| "mixed" }`  | Cambia el estado checked      |
| `hp-switch`         | `hp-change`       | `{ checked: boolean }`             | Cambia el estado on/off       |
| `hp-radio-group`    | `hp-change`       | `{ value: string }`                | Cambia la opción seleccionada |
| `hp-toggle-group`   | `hp-change`       | `{ value: string[] }`              | Cambia la selección del grupo |
| `hp-toggle`         | `hp-toggle-press` | `{ value: string }`                | El usuario activa un toggle   |
| `hp-tabs`           | `hp-change`       | `{ value: string }`                | Cambia la pestaña activa      |
| `hp-accordion`      | `hp-change`       | `{ open: boolean, value: string }` | Cambia cualquier panel        |
| `hp-accordion-item` | `hp-open`         | `{ value: string }`                | Un panel se expande           |
| `hp-accordion-item` | `hp-close`        | `{ value: string }`                | Un panel se colapsa           |
| `hp-collapsible`    | `hp-change`       | `{ open: boolean }`                | Cambia el estado              |
| `hp-collapsible`    | `hp-open`         | `{ value: boolean }`               | Se abre                       |
| `hp-collapsible`    | `hp-close`        | `{ value: boolean }`               | Se cierra                     |
| `hp-dialog`         | `hp-open`         | —                                  | El dialog se abre             |
| `hp-dialog`         | `hp-close`        | —                                  | El dialog se cierra           |
| `hp-alert-dialog`   | `hp-open`         | —                                  | Se abre                       |
| `hp-alert-dialog`   | `hp-close`        | —                                  | Se cierra                     |
| `hp-drawer`         | `hp-show`         | —                                  | El drawer se abre             |
| `hp-drawer`         | `hp-hide`         | —                                  | El drawer se cierra           |
| `hp-popover`        | `hp-open`         | —                                  | El popover se abre            |
| `hp-popover`        | `hp-close`        | —                                  | El popover se cierra          |
| `hp-tooltip`        | `hp-open`         | —                                  | El tooltip aparece            |
| `hp-tooltip`        | `hp-close`        | —                                  | El tooltip desaparece         |

---

## Escuchar eventos

### addEventListener estándar

```js
const checkbox = document.querySelector("hp-checkbox");

checkbox.addEventListener("hp-change", (event) => {
  console.log(event.detail.checked); // true | false | "mixed"
});
```

### Delegación desde un contenedor

Todos los eventos tienen `bubbles: true`, por lo que puedes escucharlos en un elemento padre:

```js
// Escucha todos los cambios del formulario desde un solo listener
document.querySelector("form").addEventListener("hp-change", (event) => {
  const component = event.target;
  console.log(component.tagName, event.detail);
});
```

### Con frameworks

**Vue**

```html
<hp-checkbox @hp-change="onCheckboxChange" />
```

**React** (usar `ref` porque React no maneja Custom Events nativamente)

```jsx
const ref = useRef(null);

useEffect(() => {
  const el = ref.current;
  const handler = (e) => console.log(e.detail);
  el.addEventListener("hp-change", handler);
  return () => el.removeEventListener("hp-change", handler);
}, []);

return <hp-checkbox ref={ref} />;
```

---

## Detalle de eventos por componente

### `hp-button`

Solo dispara `hp-change` si el atributo `aria-pressed` está presente (modo toggle):

```js
const btn = document.querySelector("hp-button");

btn.addEventListener("hp-change", (e) => {
  console.log(e.detail.pressed); // boolean
});
```

```html
<!-- Sin aria-pressed: solo dispara click nativo -->
<hp-button>Enviar</hp-button>

<!-- Con aria-pressed: dispara hp-change en cada activación -->
<hp-button aria-pressed="false">Favorito</hp-button>
```

### `hp-checkbox`

```js
document.querySelector("hp-checkbox").addEventListener("hp-change", (e) => {
  // e.detail.checked puede ser true, false, o "mixed" (indeterminate)
  console.log(e.detail.checked);
});
```

Puedes también llamar al método `toggle()` directamente para disparar el evento programáticamente:

```js
document.querySelector("hp-checkbox").toggle();
```

### `hp-switch`

```js
document.querySelector("hp-switch").addEventListener("hp-change", (e) => {
  console.log(e.detail.checked); // boolean
});
```

Igual que checkbox, expone `toggle()`:

```js
document.querySelector("hp-switch").toggle();
```

### `hp-radio-group`

El evento se dispara en el grupo, no en el radio individual:

```js
document.querySelector("hp-radio-group").addEventListener("hp-change", (e) => {
  console.log(e.detail.value); // string — el value del radio seleccionado
});
```

### `hp-tabs`

```js
document.querySelector("hp-tabs").addEventListener("hp-change", (e) => {
  console.log(e.detail.value); // string — el value del tab activo
});
```

### `hp-accordion`

Los eventos se disparan tanto en el item (específico) como en el acordeón padre (general):

```js
// Escuchar cualquier cambio desde el contenedor
document.querySelector("hp-accordion").addEventListener("hp-change", (e) => {
  console.log(e.detail.open); // boolean
  console.log(e.detail.value); // string — el value del item que cambió
});

// Escuchar apertura/cierre específico en un item
document.querySelector("hp-accordion-item").addEventListener("hp-open", (e) => {
  console.log("Abierto:", e.detail.value);
});

document.querySelector("hp-accordion-item").addEventListener("hp-close", (e) => {
  console.log("Cerrado:", e.detail.value);
});
```

### `hp-collapsible`

```js
const collapsible = document.querySelector("hp-collapsible");

collapsible.addEventListener("hp-change", (e) => {
  console.log(e.detail.open); // boolean
});

collapsible.addEventListener("hp-open", () => console.log("abierto"));
collapsible.addEventListener("hp-close", () => console.log("cerrado"));
```

### `hp-toggle-group`

El grupo dispara `hp-change` con el array completo de valores activos. Cada toggle dispara `hp-toggle-press` con su propio valor:

```js
// Cambio en el grupo
document.querySelector("hp-toggle-group").addEventListener("hp-change", (e) => {
  console.log(e.detail.value); // string[] — ej. ["bold", "italic"]
});

// Activación individual
document.querySelector("hp-toggle").addEventListener("hp-toggle-press", (e) => {
  console.log(e.detail.value); // string — el value del toggle
});
```

### `hp-dialog` / `hp-alert-dialog`

```js
const dialog = document.querySelector("hp-dialog");

dialog.addEventListener("hp-open", () => console.log("dialog abierto"));
dialog.addEventListener("hp-close", () => console.log("dialog cerrado"));
```

### `hp-drawer`

A diferencia del dialog, el drawer usa `hp-show` / `hp-hide` para evitar colisión con otros overlays que puedan estar activos simultáneamente. También puedes controlarlo mediante su API imperativa:

```js
const drawer = document.querySelector("hp-drawer");

drawer.addEventListener("hp-show", () => console.log("drawer visible"));
drawer.addEventListener("hp-hide", () => console.log("drawer oculto"));

// API imperativa
drawer.show();
drawer.hide();
drawer.toggle();
console.log(drawer.isOpen); // boolean
```

El evento `hp-hide` también puede dispararse programáticamente desde cualquier hijo, lo que permite botones de cierre personalizados:

```js
// Cierre desde un botón interno
closeBtn.addEventListener("click", () => {
  closeBtn
    .closest("hp-drawer")
    .dispatchEvent(new CustomEvent("hp-hide", { bubbles: true, composed: true }));
});
```

### `hp-popover`

```js
const popover = document.querySelector("hp-popover");

popover.addEventListener("hp-open", () => console.log("popover visible"));
popover.addEventListener("hp-close", () => console.log("popover oculto"));
```

Úsalo para lanzar lógica de posicionamiento dinámico cuando el popover aparece:

```js
popover.addEventListener("hp-open", () => {
  const content = popover.querySelector("hp-popover-content");
  const trigger = popover.querySelector("hp-popover-trigger");
  // calcular posición y aplicar top/left...
});
```

### `hp-tooltip`

```js
const tooltip = document.querySelector("hp-tooltip");

tooltip.addEventListener("hp-open", () => console.log("tooltip visible"));
tooltip.addEventListener("hp-close", () => console.log("tooltip oculto"));
```

---

## Cancelar o interceptar eventos

Los Custom Events de Headless Primitives no son cancelables (`cancelable: false`) ya que su propósito es notificar — el estado ya cambió en el componente cuando el evento se dispara.

Para prevenir un cambio de estado, escucha el `click` nativo antes de que llegue al componente:

```js
// Prevenir que un checkbox cambie bajo ciertas condiciones
document.querySelector("hp-checkbox").addEventListener(
  "click",
  (e) => {
    if (!formIsValid) {
      e.stopImmediatePropagation();
    }
  },
  { capture: true },
);
```

---

## Sincronizar con estado externo

El patrón típico para conectar componentes con un estado externo (store, servidor, etc.):

```js
// Estado de la aplicación
const state = { filters: [] };

// Leer cambios del componente
document.querySelector("hp-toggle-group").addEventListener("hp-change", (e) => {
  state.filters = e.detail.value;
  renderResults(state.filters);
});

// Escribir estado en el componente desde fuera
function setFilters(newFilters) {
  state.filters = newFilters;
  document.querySelector("hp-toggle-group").setAttribute("value", newFilters.join(","));
}
```
