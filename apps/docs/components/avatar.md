# Avatar

Una representación visual de un usuario o entidad con soporte para carga progresiva y estados de error.

## Demo

<div class="demo-card" style="padding: 24px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); margin-bottom: 24px;">
<div style="display: flex; align-items: center; gap: 24px; flex-wrap: wrap; justify-content: center;">
<div style="text-align: center;">
<hp-avatar class="docs-avatar">
<hp-avatar-image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="User Image"></hp-avatar-image>
<hp-avatar-fallback class="docs-fallback">JD</hp-avatar-fallback>
</hp-avatar>
<p style="font-size: 0.8rem; margin-top: 8px; color: var(--vp-c-text-2);">Éxito</p>
</div>
<div style="text-align: center;">
<hp-avatar class="docs-avatar">
<hp-avatar-image src="broken-link.jpg" alt="Broken Image"></hp-avatar-image>
<hp-avatar-fallback class="docs-fallback">ER</hp-avatar-fallback>
</hp-avatar>
<p style="font-size: 0.8rem; margin-top: 8px; color: var(--vp-c-text-2);">Error</p>
</div>
<div style="text-align: center;">
<hp-avatar class="docs-avatar" delay="2000">
<hp-avatar-image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Delayed Image"></hp-avatar-image>
<hp-avatar-fallback class="docs-fallback">DY</hp-avatar-fallback>
</hp-avatar>
<p style="font-size: 0.8rem; margin-top: 8px; color: var(--vp-c-text-2);">Con Delay (2s)</p>
</div>
</div>
</div>

<style>
.docs-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--vp-c-bg-mute);
  border: 2px solid var(--vp-c-divider);
}

.docs-avatar hp-avatar-image {
  display: none;
}

.docs-avatar[data-state="loaded"] hp-avatar-image {
  display: block;
}

.docs-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--vp-c-brand);
  color: white;
  font-weight: bold;
}

.docs-avatar[data-state="loaded"] .docs-fallback {
  display: none;
}
</style>

## Uso

### HTML

```html
<hp-avatar delay="600">
  <hp-avatar-image src="user.jpg" alt="Nombre de Usuario" />
  <hp-avatar-fallback>JD</hp-avatar-fallback>
</hp-avatar>
```

## API

### hp-avatar (Root)

| Atributo | Tipo     | Descripción                                                                                                     |
| :------- | :------- | :-------------------------------------------------------------------------------------------------------------- |
| `delay`  | `number` | Tiempo en ms para esperar antes de mostrar el fallback durante la carga. Evita parpadeos en conexiones rápidas. |

### hp-avatar-image

| Atributo | Tipo     | Descripción                                       |
| :------- | :------- | :------------------------------------------------ |
| `src`    | `string` | La URL de la imagen a cargar.                     |
| `alt`    | `string` | Texto descriptivo para la imagen (accesibilidad). |

## Accesibilidad

- **Semántica**: El contenedor raíz tiene `role="img"` por defecto.
- **Alt Text**: Se debe proporcionar un `alt` significativo en el `hp-avatar-image`.
- **Estados**: El componente gestiona automáticamente la visibilidad del fallback basándose en el éxito o error de carga de la imagen.
