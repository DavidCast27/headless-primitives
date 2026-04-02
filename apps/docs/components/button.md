# Button (`hp-button`)

El botón es la espinal dorsal de toda UI. `hp-button` encapsula la lógica de accesibilidad (a11y) nativa, manejo de teclado y estados de interacción, permitiéndote centrarte puramente en el diseño visual.

## Demostración Interactiva en Vivo

<div class="demo-box">
  <hp-button class="demo-btn primary">Botón Primario</hp-button>
  <hp-button class="demo-btn secondary">Secundario</hp-button>
  <hp-button class="demo-btn toggle" aria-pressed="false">Toggle Me</hp-button>
  <hp-button class="demo-btn" disabled>Disabled</hp-button>
</div>

<style>
.demo-box {
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  padding: 2.5rem;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  background-color: var(--vp-custom-block-bg);
}

.demo-btn {
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.primary {
  background-color: var(--vp-c-brand-1);
  color: white;
}
.primary:hover { background-color: var(--vp-c-brand-2); }

.secondary {
  background-color: transparent;
  border-color: var(--vp-c-divider);
}
.secondary:hover { border-color: var(--vp-c-brand-1); }

.toggle[aria-pressed="true"] {
  background-color: #10b981;
  color: white;
}

.demo-btn[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

## API Reference

### Attributes

| Atributo       | Tipo      | Por defecto | Descripción                                                                    |
| :------------- | :-------- | :---------- | :----------------------------------------------------------------------------- |
| `disabled`     | `boolean` | `false`     | Desactiva el botón y lo remueve del orden de foco.                             |
| `aria-pressed` | `boolean` | `undefined` | Si se provee, el botón actúa como un "Toggle Button" persistiendo su estado.   |
| `role`         | `string`  | `"button"`  | El rol de accesibilidad (manejado automáticamente).                            |
| `tabindex`     | `string`  | `"0"`       | El índice de tabulación (manejado automáticamente según el estado `disabled`). |

### Events

| Evento      | Detalle                | Descripción                                                                |
| :---------- | :--------------------- | :------------------------------------------------------------------------- |
| `hp-change` | `{ pressed: boolean }` | Emitido únicamente cuando el botón actúa como _Toggle_ y cambia su estado. |
| `click`     | `MouseEvent`           | Evento nativo del navegador (disponible siempre).                          |

## Styling (Guía de Estilos)

Al ser un componente _Headless_, no inyectamos CSS. Puedes usar selectores de atributos para aplicar estilos basados en el estado:

```css
/* Estado Base */
hp-button {
  display: inline-block;
  cursor: pointer;
}

/* Estado Focus (Accesibilidad) */
hp-button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Estado de Toggle Activado */
hp-button[aria-pressed="true"] {
  background-color: green;
}

/* Estado Deshabilitado */
hp-button[disabled] {
  opacity: 0.5;
  pointer-events: none;
}
```

## Accesibilidad (a11y)

`hp-button` implementa los siguientes patrones de la W3C:

- Manejo automático de `tabindex`.
- Soporte para teclas `Enter` y `Espacio`.
- Sincronización automática de `aria-disabled` basada en el atributo nativo `disabled`.
- Semántica de Toggle via `aria-pressed`.
