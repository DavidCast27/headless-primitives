# Progress

Un indicador visual y semántico del estado de una tarea o proceso. Sigue el patrón `role="progressbar"`.

## Demo

<div class="demo-card">
  <p style="margin-bottom: 10px; font-size: 0.9rem;">Cargando archivos (75%)</p>
  <hp-progress class="docs-progress" value="75"></hp-progress>
  
  <p style="margin-top: 20px; margin-bottom: 10px; font-size: 0.9rem;">Estado indeterminado</p>
  <hp-progress class="docs-progress"></hp-progress>
</div>

<style>
.docs-progress {
  display: block;
  width: 100%;
  height: 8px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.docs-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: var(--vp-c-brand-1);
  width: var(--hp-progress-percentage, 0%);
  transition: width 0.3s ease;
}

.docs-progress:not([aria-valuenow])::after {
  width: 30%;
  animation: docs-progress-ind 1.5s infinite linear;
}

@keyframes docs-progress-ind {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}
</style>

## Uso

### HTML

```html
<!-- Progreso determinado -->
<hp-progress value="70"></hp-progress>

<!-- Progreso indeterminado -->
<hp-progress></hp-progress>

<!-- Con límites personalizados -->
<hp-progress min="100" max="200" value="150"></hp-progress>
```

### CSS (Headless)

El componente expone la variable CSS `--hp-progress-percentage` automáticamente basada en el valor, min y max.

```css
hp-progress {
  display: block;
  height: 10px;
  background: #eee;
}

hp-progress::after {
  content: "";
  display: block;
  height: 100%;
  background: blue;
  width: var(--hp-progress-percentage, 0%);
}
```

## API

### Atributos

| Atributo | Tipo     | Descripción                                                                  |
| :------- | :------- | :--------------------------------------------------------------------------- |
| `value`  | `number` | El valor actual del progreso. Si no se define, el estado es "indeterminado". |
| `min`    | `number` | Valor mínimo (por defecto 0).                                                |
| `max`    | `number` | Valor máximo (por defecto 100).                                              |

### Propiedades JS

| Propiedad    | Tipo             | Descripción                                            |
| :----------- | :--------------- | :----------------------------------------------------- |
| `value`      | `number \| null` | Obtiene o establece el valor actual.                   |
| `percentage` | `number`         | (**Read-only**) El porcentaje calculado entre 0 y 100. |

## Accesibilidad

Este componente implementa el patrón **WAI-ARIA Progressbar**:

- Asigna automáticamente `role="progressbar"`.
- Gestiona `aria-valuenow`, `aria-valuemin` y `aria-valuemax`.
- Gestiona el estado indeterminado eliminando `aria-valuenow` según la especificación.
