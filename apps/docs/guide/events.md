# Eventos

Todos los eventos de Headless Primitives son **Custom Events nativos del navegador**. Usan el prefijo `hp-` para evitar colisiones con eventos del DOM estándar. Todos tienen `bubbles: true` y `composed: true` salvo que se indique lo contrario.

## Referencia rápida

| Componente           | Evento            | Detalle                                                                              | Disparado cuando              |
| :------------------- | :---------------- | :----------------------------------------------------------------------------------- | :---------------------------- |
| `hp-button`          | `hp-change`       | `{ pressed: boolean }`                                                               | Cambia `aria-pressed`         |
| `hp-checkbox`        | `hp-change`       | `{ checked: boolean \| "mixed" }`                                                    | Cambia el estado checked      |
| `hp-switch`          | `hp-change`       | `{ checked: boolean }`                                                               | Cambia el estado on/off       |
| `hp-radio-group`     | `hp-change`       | `{ value: string }`                                                                  | Cambia la opción seleccionada |
| `hp-toggle-group`    | `hp-change`       | `{ value: string[] }`                                                                | Cambia la selección del grupo |
| `hp-toggle`          | `hp-toggle-press` | `{ value: string }`                                                                  | El usuario activa un toggle   |
| `hp-tabs`            | `hp-change`       | `{ value: string }`                                                                  | Cambia la pestaña activa      |
| `hp-accordion`       | `hp-change`       | `{ open: boolean, value: string }`                                                   | Cambia cualquier panel        |
| `hp-accordion-item`  | `hp-open`         | `{ value: string }`                                                                  | Un panel se expande           |
| `hp-accordion-item`  | `hp-close`        | `{ value: string }`                                                                  | Un panel se colapsa           |
| `hp-collapsible`     | `hp-change`       | `{ open: boolean }`                                                                  | Cambia el estado              |
| `hp-collapsible`     | `hp-open`         | `{ value: boolean }`                                                                 | Se abre                       |
| `hp-collapsible`     | `hp-close`        | `{ value: boolean }`                                                                 | Se cierra                     |
| `hp-dialog`          | `hp-open`         | —                                                                                    | El dialog se abre             |
| `hp-dialog`          | `hp-close`        | —                                                                                    | El dialog se cierra           |
| `hp-alert-dialog`    | `hp-open`         | —                                                                                    | Se abre                       |
| `hp-alert-dialog`    | `hp-close`        | —                                                                                    | Se cierra                     |
| `hp-drawer`          | `hp-show`         | —                                                                                    | El drawer se abre             |
| `hp-drawer`          | `hp-hide`         | —                                                                                    | El drawer se cierra           |
| `hp-popover`         | `hp-open`         | —                                                                                    | El popover se abre            |
| `hp-popover`         | `hp-close`        | —                                                                                    | El popover se cierra          |
| `hp-tooltip`         | `hp-open`         | —                                                                                    | El tooltip aparece            |
| `hp-tooltip`         | `hp-close`        | —                                                                                    | El tooltip desaparece         |
| `hp-pin-input`       | `hp-change`       | `{ value: string }`                                                                  | Cambia cualquier dígito       |
| `hp-pin-input`       | `hp-complete`     | `{ value: string }`                                                                  | Todos los campos completados  |
| `hp-slider`          | `hp-input`        | `{ value: number }`                                                                  | Mientras se arrastra          |
| `hp-slider`          | `hp-change`       | `{ value: number }`                                                                  | Al soltar o usar teclado      |
| `hp-tree`            | `hp-select`       | `{ value: string, item: HTMLElement }` / `{ value, item, selectedValues: string[] }` | Se selecciona un ítem         |
| `hp-tree-item`       | `hp-expand`       | `{ value: string, item: HTMLElement }`                                               | Un nodo se expande            |
| `hp-tree-item`       | `hp-collapse`     | `{ value: string, item: HTMLElement }`                                               | Un nodo se colapsa            |
| `hp-stepper`         | `hp-change`       | `{ value: number, prev: number }`                                                    | Cambia el paso activo         |
| `hp-stepper`         | `hp-complete`     | `{ steps: number }`                                                                  | El wizard se completa         |
| `hp-navigation-menu` | `hp-open`         | `{ value: string }`                                                                  | Un panel flyout se abre       |
| `hp-navigation-menu` | `hp-close`        | `{ value: string }`                                                                  | Un panel flyout se cierra     |

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

### `hp-pin-input`

Emite `hp-change` en cada pulsación de tecla y `hp-complete` cuando todos los campos tienen valor:

```js
const pin = document.querySelector("hp-pin-input");

pin.addEventListener("hp-change", (e) => {
  console.log("Valor parcial:", e.detail.value); // string — ej. "12"
});

pin.addEventListener("hp-complete", (e) => {
  console.log("PIN completo:", e.detail.value); // string — ej. "1234"
  // verificar OTP, desbloquear formulario, etc.
});
```

El valor es siempre un `string` con la concatenación de los campos rellenados. Los campos vacíos no se incluyen:

```js
// Pin de 4 dígitos con solo 2 campos rellenos → "12"
// Pin de 4 dígitos completo → "1234"
pin.addEventListener("hp-change", (e) => {
  submitBtn.disabled = e.detail.value.length < pin.length;
});
```

### `hp-slider`

Emite dos eventos distintos: `hp-input` se dispara continuamente mientras se arrastra (ideal para actualizaciones en tiempo real), y `hp-change` una sola vez al soltar o al usar el teclado (ideal para persistir el valor):

```js
const slider = document.querySelector("hp-slider");

slider.addEventListener("hp-input", (e) => {
  console.log("Moviendo:", e.detail.value); // número
});

slider.addEventListener("hp-change", (e) => {
  console.log("Valor final:", e.detail.value); // número
});
```

Cuando se usa el atributo `show-value`, el valor visible se actualiza automáticamente sin necesidad de JS. Los eventos son útiles para sincronizar con estado externo:

```js
// Sincronizar con una variable de estado
slider.addEventListener("hp-change", (e) => {
  appState.volume = e.detail.value;
});
```

### `hp-tree`

El árbol emite `hp-select` cuando el usuario selecciona un ítem, y los ítems emiten `hp-expand` / `hp-collapse` al abrirse o cerrarse:

```js
const tree = document.querySelector("hp-tree");

// Selección única (comportamiento por defecto)
tree.addEventListener("hp-select", (e) => {
  console.log("Seleccionado:", e.detail.value); // string
  console.log("Elemento:", e.detail.item); // HTMLElement
});

// Expansión / colapso — escuchar desde el árbol gracias a bubbles: true
tree.addEventListener("hp-expand", (e) => {
  console.log("Expandido:", e.detail.value);
});

tree.addEventListener("hp-collapse", (e) => {
  console.log("Colapsado:", e.detail.value);
});
```

En modo **multi-select** (`multi-select` attribute), `hp-select` incluye además `selectedValues`:

````js
const tree = document.querySelector("hp-tree[multi-select]");

tree.addEventListener("hp-select", (e) => {
  console.log("Último clic:", e.detail.value);
  console.log("Todos seleccionados:", e.detail.selectedValues); // string[]
});

// También disponible como método
console.log(tree.getSelectedValues()); // Set<string>
### `hp-stepper`

Emite `hp-change` en cada avance o retroceso, y `hp-complete` cuando el usuario pulsa `hp-stepper-finish` (o se llama `complete()` programáticamente):

```js
const stepper = document.querySelector("hp-stepper");

stepper.addEventListener("hp-change", (e) => {
  console.log("Paso actual:", e.detail.value); // number — índice 0-based
  console.log("Paso anterior:", e.detail.prev); // number
});

stepper.addEventListener("hp-complete", (e) => {
  console.log("Wizard completado. Total de pasos:", e.detail.steps);
  // enviar formulario, redirigir, mostrar pantalla de éxito…
});
````

Puedes también controlar la navegación programáticamente:

```js
stepper.next(); // avanza un paso
stepper.prev(); // retrocede un paso
stepper.goTo(2); // salta al paso con índice 2
stepper.complete(); // completa el wizard (dispara hp-complete)
```

### `hp-navigation-menu`

Emite `hp-open` cuando un panel flyout se abre y `hp-close` cuando se cierra. Ambos incluyen el `value` del ítem que cambió — el mismo string que se pasa al atributo `value` del `hp-navigation-menu-item`.

```js
const nav = document.querySelector("hp-navigation-menu");

nav.addEventListener("hp-open", (e) => {
  console.log("Panel abierto:", e.detail.value); // ej. "productos"
});

nav.addEventListener("hp-close", (e) => {
  console.log("Panel cerrado:", e.detail.value); // ej. "productos"
});
```

Cuando el usuario pasa de un panel a otro directamente, se disparan ambos eventos en secuencia: primero `hp-close` del panel anterior y luego `hp-open` del nuevo:

```js
nav.addEventListener("hp-close", (e) => {
  console.log("Cerrado:", e.detail.value); // "productos"
});
nav.addEventListener("hp-open", (e) => {
  console.log("Abierto:", e.detail.value); // "soluciones"
});
```

La API imperativa permite controlar el menú desde código:

```js
const nav = document.querySelector("hp-navigation-menu");

nav.open("productos"); // abre el panel con value="productos"
nav.close(); // cierra el panel activo
nav.toggle("recursos"); // alterna: abre si estaba cerrado, cierra si estaba abierto

console.log(nav.value); // string — value del panel abierto, "" si ninguno
```

Úsalo para sincronizar el estado del menú con la URL o con un store:

```js
// Abrir el panel correcto al cargar la página
const section = new URLSearchParams(location.search).get("section");
if (section) nav.open(section);

// Guardar el panel activo en la URL
nav.addEventListener("hp-open", (e) => {
  history.replaceState(null, "", `?section=${e.detail.value}`);
});
nav.addEventListener("hp-close", () => {
  history.replaceState(null, "", location.pathname);
});
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
