# Button

<span class="hp-badge">Nuevo</span>

El componente `hp-button` es el elemento básico de interacción. Provee una base sólida y accesible (WAI-ARIA) para crear botones, enlaces que parecen botones o interruptores binarios táctiles, permitiéndote total libertad creativa en el diseño visual.

## Instalación

```bash
pnpm add @headless-primitives/button
```

## Demostración

<div class="hp-demo-card">
  <hp-button class="demo-btn primary">Botón Primario</hp-button>
  <hp-button class="demo-btn secondary">Secundario</hp-button>
  <hp-button class="demo-btn" disabled>Deshabilitado</hp-button>
</div>

<style>
.demo-btn {
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}
.primary { background: var(--vp-c-brand-1); color: white; }
.primary:hover { background: var(--vp-c-brand-2); }
.secondary { background: transparent; border-color: var(--vp-c-divider); }
.secondary:hover { border-color: var(--vp-c-brand-1); }
.demo-btn[disabled] { opacity: 0.5; cursor: not-allowed; }
</style>

::: code-group

```html [index.html]
<hp-button class="my-btn"> Click me </hp-button>

<hp-button class="my-btn" disabled> Can't click </hp-button>
```

```css [style.css]
.my-btn {
  /* Tus estilos aquí */
  padding: 10px 20px;
  background: blue;
  color: white;
  border-radius: 4px;
}

.my-btn:focus-visible {
  outline: 2px solid blue;
}

.my-btn[disabled] {
  opacity: 0.5;
}
```

:::

## Anatomía

Los componentes Headless no inyectan estructura interna compleja: un solo elemento raíz concentra el foco y la interacción por teclado.

```html
<hp-button> ... </hp-button>
```

## API Reference

### `hp-button`

Custom element de un solo nodo con rol `button` por defecto, activable con teclado (`Enter` / `Espacio`). Si existe `aria-pressed`, actúa como interruptor y emite `hp-change`.

#### Atributos

| Atributo       | Tipo                  | Por defecto | Descripción                                                                                        |
| :------------- | :-------------------- | :---------- | :------------------------------------------------------------------------------------------------- |
| `disabled`     | _boolean (presencia)_ | ausente     | Si está presente, quita el foco por tabulación y establece `aria-disabled="true"`. Observado.      |
| `aria-pressed` | `"true"` \| `"false"` | —           | Si está definido, cada activación alterna el valor y dispara `hp-change`. Observado como atributo. |
| `role`         | `string`              | `"button"`  | Si no se indica, se asigna `button`.                                                               |
| `tabindex`     | `string`              | `"0"`       | Si no hay `disabled`, se fuerza `0` para permitir foco (comportamiento tipo botón nativo).         |

Otros atributos HTML globales pueden estar presentes en el DOM; el primitivo **solo** observa `disabled` y `aria-pressed` en código.

#### Eventos

| Evento      | Detalle                | Descripción                                                                 |
| :---------- | :--------------------- | :-------------------------------------------------------------------------- |
| `hp-change` | `{ pressed: boolean }` | Solo cuando hay `aria-pressed` y cambia el estado (`bubbles` y `composed`). |
| `click`     | `MouseEvent`           | Nativo; con `disabled`, el primitivo detiene propagación.                   |

## Accesibilidad

`hp-button` implementa el patrón **WAI-ARIA Button**:

- Maneja automáticamente los roles de accesibilidad.
- Sincroniza `aria-disabled` con el atributo `disabled`.
- Soporta activación mediante las teclas `Enter` y `Espacio`.
- Gestión inteligente del `tabindex`.
