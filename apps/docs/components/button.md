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

<CodeSnippet>

<Flavor only="css">

::: code-group

```html [index.html]
<hp-button class="my-btn"> Click me </hp-button>

<hp-button class="my-btn" disabled> Can't click </hp-button>
```

```css [style.css]
.my-btn {
  padding: 10px 20px;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.my-btn:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.my-btn[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

:::

</Flavor>

<Flavor only="tailwind">

::: code-group

```html [index.html]
<!-- Usando utilidades de Tailwind CSS -->
<hp-button
  class="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
>
  Click me
</hp-button>

<hp-button
  class="px-5 py-2.5 bg-blue-600 text-white rounded-lg opacity-50 cursor-not-allowed"
  disabled
>
  Can't click
</hp-button>
```

:::

</Flavor>

</CodeSnippet>

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
