# Label

<span class="hp-badge">Nuevo</span>

El componente `hp-label` permite asociar etiquetas de texto con elementos de formulario de manera accesible, superando las limitaciones nativas de HTML al trabajar con Custom Elements.

## Instalación

```bash
pnpm add @headless-primitives/label
```

## Demostración

<div class="hp-demo-card">
  <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%; max-width: 300px;">
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <hp-label for="input-demo" class="demo-label">Nombre de usuario</hp-label>
      <input id="input-demo" type="text" placeholder="Escribe algo..." />
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
      <hp-label for="switch-label-demo" class="demo-label">Notificaciones</hp-label>
      <hp-switch id="switch-label-demo" class="demo-switch"></hp-switch>
    </div>
  </div>
</div>

<style>
.demo-label {
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
}
.demo-switch {
  width: 40px;
  height: 20px;
  background: var(--vp-c-divider);
  border-radius: 999px;
  cursor: pointer;
  position: relative;
}
.demo-switch[checked] { background: var(--vp-c-brand-1); }
.demo-switch::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
}
.demo-switch[checked]::after { transform: translateX(20px); }
</style>

::: code-group

```html [index.html]
<hp-label for="first-name">Nombre</hp-label>
<input id="first-name" type="text" />

<!-- Con otros primitivos -->
<hp-label for="toggle-id">Aceptar términos</hp-label>
<hp-switch id="toggle-id"></hp-switch>
```

```css [style.css]
hp-label {
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

hp-label:hover {
  color: var(--vp-c-brand-1);
}
```

:::

## Anatomía

Un único custom element envuelve el texto y gestiona la vinculación con el control referenciado por `for`.

```html
<hp-label for="mi-control"> Etiqueta </hp-label>
```

## API Reference

### `hp-label`

Asocia el texto al control con ID `for`: en click enfoca y, si aplica, dispara `click` en el destino. Si el control carece de `aria-labelledby`, lo sincroniza con el `id` de esta etiqueta.

#### Atributos

| Atributo | Tipo     | Por defecto | Descripción                                                                                                        |
| :------- | :------- | :---------- | :----------------------------------------------------------------------------------------------------------------- |
| `for`    | `string` | —           | ID del elemento objetivo en el documento. Observado.                                                               |
| `id`     | `string` | auto        | Si falta y hay `for` válido, se genera un id estable (`hp-label-…`) para `aria-labelledby` del destino. Observado. |

#### Propiedades

| Propiedad | Tipo             | Descripción                            |
| :-------- | :--------------- | :------------------------------------- |
| `htmlFor` | `string \| null` | Refleja / establece el atributo `for`. |

## Accesibilidad

`hp-label` soluciona una limitación crítica del navegador: la etiqueta `<label>` nativa no puede transferir el foco a elementos que no sean "labelables" por defecto (como los Custom Elements).

- **Click to Focus**: Traslada manualmente el foco al elemento referenciado por `for`.
- **Aria-Labelledby**: Si el destino no tiene un `aria-labelledby`, el componente lo vincula automáticamente.
- **No Selection**: Evita la selección accidental de texto al hacer doble click, igual que un label nativo.
