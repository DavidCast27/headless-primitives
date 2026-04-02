# headless-primitives

> Primitivos UI accesibles y sin estilos, construidos como Web Components framework-agnostic.

Para conocer más sobre por qué se creó esta librería y las decisiones técnicas de fondo (como la elección de usar Vanilla JS en lugar de frameworks o librerías externas), consulta nuestro archivo de **[Motivación y Decisiones de Diseño (MOTIVATION.md)](./MOTIVATION.md)**.

## Filosofía

- **Headless**: Sin estilos. Tú decides el *"look & feel"* con CSS puro, Tailwind, o lo que prefieras.
- **Accesible**: Atributos ARIA, navegación por teclado y manejo de foco listos para usarse (*built-in*).
- **Framework-agnostic**: Al ser Custom Elements, funcionan en cualquier stack (React, Vue, Astro, Vanilla JS, etc.).
- **Puro**: Código escrito en Vanilla JS (o TypeScript), con **cero dependencias** de *runtime*.

## Diseño de API (en progreso)

Los componentes utilizan nativamente **slots** para la composición de la UI y **atributos** para manejar su estado (no se usan *props* complejas como en React):

```html
<hp-dialog>
  <button slot="trigger">Abrir Modal</button>
  <div slot="content">
    <h2>Título del modal</h2>
    <p>Este es el contenido dentro del componente.</p>
  </div>
</hp-dialog>
```

```javascript
// La funcionalidad también estará disponible a través de la API de JavaScript
const dialog = document.querySelector('hp-dialog');
dialog.show();
dialog.hide();
```

## Licencia

MIT
