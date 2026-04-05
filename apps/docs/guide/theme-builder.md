# Constructor de Tema

El Constructor de Tema te permite editar visualmente las propiedades CSS `--hp-*` y ver cada componente actualizarse en tiempo real. Cuando estés conforme con tu tema, copia el bloque CSS generado y pégalo en tu propio proyecto — sin recargar la página, sin herramientas adicionales.

> **Cómo funciona:** el editor inyecta una etiqueta `<style>` en el `<head>` del documento que sobreescribe las variables de `:root`. El panel de vista previa lee esas mismas variables, por lo que los cambios se reflejan inmediatamente.

<ClientOnly>
  <ThemeBuilder />
</ClientOnly>

---

## Cómo usar

El constructor está dividido en dos paneles:

- **Panel izquierdo — Editor de tokens:** selecciona un grupo de la barra de pestañas (Acento, Superficies, Texto, etc.) y modifica los valores con el selector de color, el control deslizante o escribiendo directamente en el campo de texto. Un punto azul indica que el token fue modificado respecto a su valor por defecto.
- **Panel derecho — Vista previa en vivo:** muestra todos los componentes de la librería renderizados con los tokens actuales. Los componentes son totalmente interactivos: los botones responden al hover y al clic, los interruptores se activan, las casillas de verificación se marcan, las pestañas cambian de panel y el acordeón expande y colapsa sus secciones.

---

## Generar tu CSS

Una vez que hayas ajustado los tokens a tu gusto, tienes dos opciones para exportar el CSS:

### 1. Solo las sobreescrituras (recomendado)

Haz clic en el botón **Copiar** dentro del panel "CSS generado (solo sobreescrituras)", en la parte inferior del editor. Este bloque contiene únicamente los tokens que modificaste, lo que produce el CSS más limpio y fácil de mantener.

### 2. CSS completo

Haz clic en **Copiar CSS completo** en la barra de cabecera. Esto incluye todos los tokens, incluso los que no modificaste, lo que es útil si quieres un archivo de tema autocontenido.

Pega el bloque copiado en el archivo CSS de tu proyecto, normalmente el mismo que importa `@headless-primitives/styles`:

```css
/* tu-archivo.css */
@import "@headless-primitives/styles/index.css";

/* Tus sobreescrituras de tema — pega aquí */
:root {
  --hp-accent: #7c3aed;
  --hp-accent-hover: #6d28d9;
  --hp-accent-active: #5b21b6;
  --hp-radius: 2px;
  /* ... */
}
```

Todos los tokens están en `:root`, por lo que se aplican en cascada a todos los componentes `hp-*` automáticamente. Consulta la [referencia completa de tokens](@styles — Capa de Theming](./styles-theming.md)) para conocer la lista completa y sus garantías de contraste WCAG.

---

## Agregar un nuevo componente a la vista previa

El panel de vista previa en vivo está definido dentro de `ThemeBuilder.vue`. Agregar un nuevo componente requiere tres pasos.

### Paso 1 — Registrar el componente

Todos los paquetes `hp-*` se importan globalmente en `apps/docs/.vitepress/theme/index.ts`. Verifica que tu componente ya esté incluido:

```ts
// theme/index.ts
import "@headless-primitives/mi-componente";
```

### Paso 2 — Agregar una sección en `ThemeBuilder.vue`

Abre `apps/docs/.vitepress/theme/components/ThemeBuilder.vue` y localiza el bloque de comentario que dice `PANEL DE VISTA PREVIA`. Agrega tu `<section>` antes del cierre `</div>` del contenedor `.tb-preview-scroll`:

```html
<!-- MI COMPONENTE -->
<section class="tb-preview-section">
  <h4 class="tb-preview-section-title">Mi Componente</h4>
  <div class="tb-preview-demo">
    <hp-mi-componente class="tbp-mi-componente">Contenido</hp-mi-componente>
  </div>
</section>
```

### Paso 3 — Agregar los estilos de la vista previa

En el bloque `<style scoped>` de `ThemeBuilder.vue`, agrega reglas con el prefijo `.tbp-` (Theme Builder Preview) que usen tokens `--hp-*`. Los estados visuales deben basarse en el atributo `data-state` que los custom elements establecen automáticamente:

```css
/* Asegúrate de que el custom element sea visible */
hp-mi-componente.tbp-mi-componente {
  display: block;
}

.tbp-mi-componente {
  background: var(--hp-surface);
  border: 1px solid var(--hp-border);
  border-radius: var(--hp-radius);
  color: var(--hp-text);
  padding: var(--hp-space-3) var(--hp-space-4);
  font-size: var(--hp-font-size-sm);
  transition: var(--hp-transition);
}

/* Usa data-state para los estados visuales, no aria-* */
.tbp-mi-componente[data-state="active"] {
  background: var(--hp-accent);
  color: var(--hp-accent-foreground);
}
```

Usar tokens `--hp-*` en los estilos de la vista previa es lo que hace que tu nuevo componente responda a los controles del editor en tiempo real.

---

## Convenciones de nombres

**`<section class="tb-preview-section">`**
Contenedor de cada bloque de componente. Aplica espaciado y borde inferior consistentes.

**`<h4 class="tb-preview-section-title">`**
Título de la sección en mayúsculas pequeñas. Tipografía uniforme en todo el panel.

**`<div class="tb-preview-demo">`**
Contenedor de la demo. Disposición en columna con separación entre elementos.

**`<div class="tb-preview-demo tb-preview-demo--row">`**
Variante horizontal. Úsala cuando los elementos se muestran en línea (botones, switches, avatares).

**`.tbp-mi-componente`**
Estilos con alcance local al ThemeBuilder. El prefijo `tbp-` es obligatorio para evitar colisiones.

**`var(--hp-accent)`, `var(--hp-surface)`, etc.**
Todos los valores CSS deben referenciar tokens `--hp-*`. Nunca valores hardcodeados.
