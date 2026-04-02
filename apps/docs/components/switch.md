# Switch

El primitivo `hp-switch` permite a los usuarios alternar entre dos estados: encendido y apagado. A diferencia de un checkbox tradicional, un switch representa una acción inmediata de cambio de estado.

## Demo

<div class="demo-box">
  <div class="control-group">
    <label for="sw-demo">Activar notificaciones</label>
    <hp-switch id="sw-demo" class="hp-switch"></hp-switch>
  </div>
</div>

<style>
.demo-box {
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Ejemplo de estilos visuales aplicados por el usuario */
.hp-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  background-color: var(--vp-c-bg-mute);
  border-radius: 12px;
  transition: background-color 0.2s;
  cursor: pointer;
  border: 2px solid transparent;
}

.hp-switch:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
}

.hp-switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.hp-switch[aria-checked="true"] {
  background-color: var(--vp-c-brand);
}

.hp-switch[aria-checked="true"]::after {
  transform: translateX(20px);
}

.hp-switch[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

## Uso

### HTML nativo

```html
<hp-switch checked></hp-switch> <hp-switch disabled></hp-switch>
```

### JavaScript

```javascript
import "@headless-primitives/switch";

const sw = document.querySelector("hp-switch");
sw.addEventListener("hp-change", (e) => {
  console.log("Nuevo estado:", e.detail.checked);
});
```

## API

### Atributos

| Atributo   | Tipo      | Descripción                                   |
| :--------- | :-------- | :-------------------------------------------- |
| `checked`  | `boolean` | Indica si el switch está activado.            |
| `disabled` | `boolean` | Deshabilita la interacción con el componente. |
| `required` | `boolean` | Indica que el campo es obligatorio.           |

### Propiedades JS

| Propiedad  | Tipo      | Descripción                                  |
| :--------- | :-------- | :------------------------------------------- |
| `checked`  | `boolean` | Obtiene o establece el estado activado.      |
| `disabled` | `boolean` | Obtiene o establece el estado deshabilitado. |

### Eventos

| Evento      | Detalle                | Descripción                                    |
| :---------- | :--------------------- | :--------------------------------------------- |
| `hp-change` | `{ checked: boolean }` | Se dispara cuando el estado del switch cambia. |

## Accesibilidad

Este componente implementa el patrón [WAI-ARIA Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/):

- Soporta `role="switch"`.
- Gestiona automáticamente `aria-checked`, `aria-disabled` y `aria-required`.
- Soporta navegación por teclado con `tabindex`.
- Soporta activación mediante las teclas `Espacio` y `Enter`.
