---
inclusion: auto
description: Reglas para mantener llms.txt y los steering files actualizados al crear o modificar componentes.
---

# Mantenimiento de llms.txt y Steering Files

Estos archivos son documentación viva. Deben actualizarse en la misma sesión en que se crea o modifica un componente.

## Al crear un componente nuevo

### 1. `llms.txt` — añadir el paquete

En la sección `packages/vanilla/` del listado de estructura, añadir:

```
  <name>/           # @headless-primitives/<name>
```

### 2. `.kiro/steering/component-patterns.md`

Si el componente introduce un patrón nuevo (estructura compuesta, nueva forma de evento, nuevo data attribute, nuevo truco de compatibilidad VitePress), añadirlo a la sección correspondiente.

### 3. `.kiro/steering/accessibility.md`

Si el componente introduce un patrón de teclado o rol ARIA no documentado, añadirlo a la tabla correspondiente.

## Al modificar CSS o tokens

### 1. `llms.txt` — actualizar la sección "Tokens CSS"

Si se añadieron o cambiaron tokens `--hp-*`, actualizar el bloque de tokens en `llms.txt`.

### 2. `.kiro/steering/css-tokens.md`

Añadir nuevos tokens `--hp-*` con sus valores y propósito. Actualizar o eliminar entradas obsoletas.

### 3. `.kiro/steering/css-audit-rules.md`

Si se descubrió una nueva clase de bug CSS o se estableció un nuevo patrón de corrección, documentarlo.

### 4. `.kiro/steering/project-architecture.md`

Si cambiaron las reglas de separación de capas, actualizar la sección "Regla de decisión de capa".

## Al cambiar patrones de documentación

### `.kiro/steering/docs-standards.md`

Si la página de docs de un componente introduce un nuevo patrón para demos o ejemplos de código, documentarlo aquí para que los próximos componentes lo sigan.

## Checklist rápido

- [ ] `llms.txt` refleja el paquete nuevo en la lista de estructura
- [ ] `llms.txt` tiene los tokens nuevos si aplica
- [ ] El steering file relevante tiene el patrón nuevo si aplica
- [ ] No hay información contradictoria entre `llms.txt` y los steering files
