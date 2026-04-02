# Field

<span class="badge molecule">Molécula</span>

Componente orquestador para coordinar la accesibilidad de los elementos de un formulario (etiquetas, descripciones y errores).

## Demo

<div class="demo-card" style="padding: 24px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); margin-bottom: 24px;">
<hp-field>
<div style="display: flex; flex-direction: column; gap: 8px; max-width: 320px; margin: 0 auto;">
<hp-field-label style="font-weight: 600;">Nombre de Usuario</hp-field-label>
<hp-field-description style="font-size: 0.85rem; color: var(--vp-c-text-2);">Este es el nombre que verán otros usuarios.</hp-field-description>
<hp-field-control>
<input type="text" placeholder="Ej: david_c" style="width: 100%; padding: 8px; border: 1px solid var(--vp-c-divider); border-radius: 4px; background: var(--vp-c-bg);">
</hp-field-control>
<hp-field-error style="font-size: 0.85rem; color: var(--vp-c-danger-1);">El nombre ya está en uso.</hp-field-error>
</div>
</hp-field>
</div>

## Uso

Importa el componente en tu archivo principal:

```javascript
import "@headless-primitives/field";
```

Estructura básica en HTML:

```html
<hp-field>
  <hp-field-label>Email</hp-field-label>
  <hp-field-description>No enviaremos spam.</hp-field-description>
  <hp-field-control>
    <input type="email" />
  </hp-field-control>
  <hp-field-error>Email inválido.</hp-field-error>
</hp-field>
```

## ¿Cómo funciona?

`hp-field` utiliza una estrategia de **contexto por proximidad**. Los sub-componentes buscan al ancestro `hp-field` más cercano y coordinan sus IDs automáticamente:

1.  **ID del Control**: Se genera un ID único y se aplica al elemento interactivo dentro de `hp-field-control`.
2.  **Label**: El `hp-field-label` apunta automáticamente al ID del control mediante el atributo `for`.
3.  **Descripciones**: El control recibe un atributo `aria-describedby` que incluye los IDs de la descripción y el mensaje de error.

## API

### hp-field

Componente raíz (contenedor).

- **Atributos**: Ninguno (genera ID interno).
- **Roles**: `group` (por defecto).

### hp-field-label

Hereda la lógica de [Label](./label.md).

- **Sincronización**: Se conecta automáticamente al control del mismo field.

### hp-field-control

El "cerebro" de la vinculación. Detecta automáticamente:

- `<input>`, `<select>`, `<textarea>`
- Componentes con roles `checkbox`, `switch`, `combobox`, `progressbar`.

### hp-field-description / hp-field-error

- **Sincronización**: Sus IDs se añaden al `aria-describedby` del control.

## Estilos

Al ser una molécula, `hp-field` no impone ningún layout (por defecto es `display: block`). El usuario es responsable de colocar los elementos (por ejemplo, usando Flexbox o Stack) dentro del contenedor.
