# Separator

Un componente que separa visualmente y semánticamente el contenido de una página. Sigue el patrón `role="separator"`.

## Demo

<div class="demo-card">
  <p>Panel Superior</p>
  <hp-separator></hp-separator>
  <p>Panel Inferior</p>
  
  <div style="margin-top: 1.5rem; display: flex; align-items: center; gap: 10px;">
    <span>Home</span>
    <hp-separator orientation="vertical"></hp-separator>
    <span>Blog</span>
    <hp-separator orientation="vertical"></hp-separator>
    <span>Contact</span>
  </div>
</div>

<style>
.demo-card {
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 1rem 0;
  background-color: var(--vp-c-bg-soft);
}

hp-separator[orientation="horizontal"],
hp-separator:not([orientation]) {
  display: block;
  height: 1px;
  background-color: var(--vp-c-divider);
  margin: 1rem 0;
  width: 100%;
}

hp-separator[orientation="vertical"] {
  display: inline-block;
  width: 1px;
  height: 1.25em;
  background-color: var(--vp-c-divider);
  margin: 0 0.5rem;
  vertical-align: middle;
}
</style>

## Uso

### HTML

```html
<!-- Por defecto es horizontal -->
<hp-separator></hp-separator>

<!-- Orientación vertical -->
<hp-separator orientation="vertical"></hp-separator>
```

### CSS Recomendado

Al ser **headless**, debes definir su apariencia visual. Aquí un ejemplo:

```css
hp-separator[orientation="horizontal"] {
  display: block;
  height: 1px;
  background-color: #e2e8f0;
  margin: 1rem 0;
}

hp-separator[orientation="vertical"] {
  display: inline-block;
  width: 1px;
  height: 1.25em;
  background-color: #e2e8f0;
  margin: 0 0.5rem;
  vertical-align: middle;
}
```

## API

### Atributos

| Atributo      | Tipo                         | Descripción                                                          |
| :------------ | :--------------------------- | :------------------------------------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | Establece la orientación del separador. Por defecto es `horizontal`. |

### Propiedades JS

| Propiedad     | Tipo     | Descripción                         |
| :------------ | :------- | :---------------------------------- |
| `orientation` | `string` | Obtiene o establece la orientación. |

## Accesibilidad

Este componente implementa el patrón **WAI-ARIA Separator**:

- Se le asigna automáticamente `role="separator"`.
- Sincroniza el atributo `aria-orientation` con el valor de `orientation`.
