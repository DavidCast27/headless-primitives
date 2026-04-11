---
inclusion: auto
description: Estructura de páginas de docs, demo "Sin estilos" primero, flavors CSS/Tailwind/base-css y advertencias sobre <style> scoped en VitePress.
---

# Estándares de Documentación — headless-primitives

## Estructura de página de componente (`apps/docs/components/<name>.md`)

1. Título + Badge (`<span class="hp-badge">Nuevo</span>`)
2. Instalación (bloques pnpm / npm / yarn / bun con `::: code-group`)
3. **Demostración** — en este orden:
   - `### Sin estilos (solo base.css)` — demo en vivo primero
   - `### Con estilos personalizados` — componente Vue con estilos
4. Anatomía (snippet HTML con árbol de etiquetas `hp-*`)
5. API Reference — una subsección `### \`hp-parte\`` por cada custom element
6. Ejemplos de código con `<CodeSnippet>` y flavors
7. Sección de estilos con `@headless-primitives/styles`

## Demo "Sin estilos (solo base.css)"

Va **dentro de `## Demostración`** como primera subsección. Patrón del demo en vivo:

```html
<div class="hp-demo-card" style="overflow:visible;align-items:flex-start;min-height:220px;">
  <!-- custom elements sin clases decorativas, solo clases de layout -->
</div>

<style>
  /* Solo layout y visibilidad — tokens vp-c-* para colores */
  .nmb-nav {
    position: relative;
    display: block;
  }
  /* ... */
</style>
```

**Reglas críticas para el demo en VitePress:**

- Sin `@click.prevent` ni sintaxis Vue en HTML plano del markdown
- HTML compacto, preferiblemente en una línea por elemento — el parser Markdown puede interferir con saltos de línea dentro de custom elements
- Usar tokens VitePress (`--vp-c-text-1`, `--vp-c-bg-soft`, `--vp-c-brand-1`, etc.) para que funcione en light y dark mode
- Prefijos de clase únicos por página para evitar colisiones globales (ej: `nmb-` para navigation-menu bare)
- `position: static` en items de lista para que los panels se anclen al nav raíz

## Flavors de código (`<CodeSnippet>`)

````markdown
<CodeSnippet>
<Flavor only="css">
  ```html
  <!-- ejemplo con CSS personalizado -->
````

</Flavor>
<Flavor only="tailwind">
  ```html
  <!-- ejemplo con Tailwind -->
  ```
</Flavor>
<Flavor only="base-css">
  ```html
  <!-- ejemplo solo con base.css -->
  ```
</Flavor>
</CodeSnippet>
```

## Demo Vue en VitePress (`NavigationMenuDemo.vue` y similares)

- Registrar el componente Vue en `apps/docs/.vitepress/theme/index.ts`
- Usar tokens `--vp-c-*` para colores (no hardcoded)
- `position: static` en items para que los panels floten correctamente
- Para demos con sub-paneles: usar estado Vue reactivo, no `hp-navigation-menu` anidados

## Advertencia sobre `<style>` scoped en VitePress

VitePress puede scopear bloques `<style>` via el mecanismo de Vue, lo que rompe selectores de atributo (ej: `[data-variant="success"]`) en custom elements.

**Usar inline styles para colores que varían por variante:**

```html
<!-- ✅ Correcto -->
<hp-badge variant="success" style="background: #f0fdf4; color: #16a34a;">Success</hp-badge>

<!-- ❌ Puede no funcionar -->
<hp-badge class="demo-badge" variant="success">Success</hp-badge>
<style>
  .demo-badge[data-variant="success"] {
    background: #f0fdf4;
  }
</style>
```

El bloque `<style>` sigue siendo válido para estilos **estructurales** (display, border-radius, padding).

## Sección "Sin estilos" — tip obligatorio

Incluir tip explicando cómo añadir colores via `data-*`:

```markdown
> **¿Quieres añadir colores?** Usa el atributo `data-state` o `data-variant` que el componente setea automáticamente.
> O importa `@headless-primitives/styles` para obtener el tema completo con tokens CSS.
```

## ADRs (Architecture Decision Records)

Cada decisión de diseño profunda o cambio tecnológico importante **debe** documentarse en `docs/adr/` con formato `[numero-secuencial]-[nombre-decision].md`.
