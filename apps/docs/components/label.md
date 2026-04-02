# Label

Una etiqueta accesible asociada a un control de formulario. Sigue los patrones de accesibilidad para vinculación de controles.

## Demo

<div class="demo-card" style="padding: 24px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); margin-bottom: 24px;">
<div style="display: flex; flex-direction: column; gap: 24px;">
<div style="display: flex; align-items: center; gap: 12px;">
<hp-label for="switch-docs" class="docs-label" style="cursor: pointer; font-weight: 500;">Activar modo oscuro</hp-label>
<hp-switch id="switch-docs" class="docs-switch"></hp-switch>
</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<hp-label for="input-docs" class="docs-label" style="cursor: pointer; font-weight: 500;">Nombre de usuario</hp-label>
<input id="input-docs" type="text" placeholder="Haz click en el label..." style="padding: 8px; border-radius: 4px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); color: var(--vp-c-text-1); width: 100%; max-width: 300px;" />
</div>
</div>
<p style="margin-top: 16px; font-size: 0.85rem; color: var(--vp-c-text-2); border-top: 1px solid var(--vp-c-divider); padding-top: 12px;">
Pruébalo: Haz click en los textos para enfocar los controles.
</p>
</div>

<style>
.docs-switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: var(--vp-c-bg-mute);
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.docs-switch[aria-checked="true"] {
  background-color: var(--vp-c-brand);
}
.docs-switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s;
}
.docs-switch[aria-checked="true"]::after {
  transform: translateX(20px);
}
</style>

## Uso

### HTML

```html
<hp-label for="mi-input">Nombre de usuario</hp-label>
<input id="mi-input" type="text" />

<!-- Con otros primitivos -->
<hp-label for="btn-id">Aceptar términos</hp-label>
<hp-switch id="btn-id"></hp-switch>
```

## API

### Atributos

| Atributo | Tipo     | Descripción                                                                                           |
| :------- | :------- | :---------------------------------------------------------------------------------------------------- |
| `for`    | `string` | El ID del elemento que esta etiqueta describe. Al hacer click, el foco se trasladará a este elemento. |

### Propiedades JS

| Propiedad | Tipo     | Descripción                            |
| :-------- | :------- | :------------------------------------- |
| `htmlFor` | `string` | Obtiene o establece el atributo `for`. |

## Accesibilidad

Este componente soluciona una limitación de los Custom Elements: el tag `<label>` nativo no puede enfocar elementos que no sean "labelable" por defecto en el navegador.

- **Foco Manual**: Implementa la lógica de traslación de foco al elemento destino.
- **Vinculación ARIA**: Si el elemento destino no tiene un `aria-labelledby`, el componente lo asigna automáticamente apuntando a su propio ID.
- **Selección**: Evita la selección accidental de texto al hacer doble click, imitando el comportamiento de los labels nativos.
