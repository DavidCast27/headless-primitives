---
inclusion: auto
description: Checklist de auditoría CSS, qué detectar y corregir, reglas de separación de capas y patrón correcto de @styles.
---

# Reglas de Auditoría CSS — headless-primitives

## Checklist antes de cualquier cambio CSS

- [ ] Sin valores hex/px/timing hardcodeados — todos referencian tokens `--hp-*`
- [ ] Cambios en `base.css` son solo estructurales (sin tokens `--hp-*` de color añadidos)
- [ ] `@styles` no declara `position`/`top`/`left`/`transform` para layout
- [ ] `@styles` no redefine `@keyframes` que ya están en `base.css`
- [ ] Todos los estados interactivos cubiertos: `:hover`, `:focus-visible`, `[disabled]`, `:active`
- [ ] Bloque `prefers-reduced-motion` presente en el archivo `@styles` del componente
- [ ] Especificidad mínima (selector de elemento único, sin `!important`)
- [ ] Dark mode funciona via `theme.css` (sin dark mode manual en archivos de componente)

## Qué detectar y corregir proactivamente

- Valores hex crudos, px crudos, o timing crudos en `@styles`
- `:focus-visible` sin usar `--hp-focus-outline-*`
- `[disabled]`/`[aria-disabled="true"]` sin `--hp-opacity-disabled`
- Falta de bloque `prefers-reduced-motion` por componente
- `@keyframes` duplicados en `@styles` que ya están en `base.css`
- `position`/`top`/`left`/`transform` de layout en `@styles`
- Uso inconsistente de tokens vs. componentes hermanos

## La sección "apariencia mínima" de base.css es INTENCIONAL

El bloque grande en `base.css` que empieza en "Apariencia mínima" (~línea 203) provee fallbacks visuales usando solo colores del sistema CSS (`currentColor`, `Canvas`, `CanvasText`). **No es deuda técnica** — es el fallback zero-dependency para consumidores que no cargan `@styles`.

El proyecto soporta explícitamente tres tiers:

1. Solo `base.css`
2. `base.css` + `@styles`
3. Sin CSS de la librería (solo CSS del usuario)

Solo marcar como bug si contiene hex crudos o `rgba()` — esos SÍ son bugs.

## Fallbacks en var() de archivos de demo

En `apps/playground/src/demos/*.css` y archivos de docs, usar `var(--hp-text, #1f2937)` con fallback hardcodeado es **CORRECTO**. El fallback solo activa si el token no está definido. No eliminar fallbacks de llamadas `var()` en archivos de demo.

## Patrón correcto para `@styles`

```css
/* ✅ Correcto */
hp-button {
  background: var(--hp-surface);
  border: 1px solid var(--hp-border);
  color: var(--hp-text);
  border-radius: var(--hp-radius);
  transition:
    background-color var(--hp-transition),
    border-color var(--hp-transition);
}

hp-button:hover:not([disabled]) {
  background: var(--hp-bg-muted);
  border-color: var(--hp-border-strong);
}

hp-button:focus-visible {
  outline: var(--hp-focus-outline-width) solid var(--hp-focus-outline-color);
  outline-offset: 2px;
}

hp-button[disabled],
hp-button[aria-disabled="true"] {
  opacity: var(--hp-opacity-disabled);
  cursor: not-allowed;
}

@media (prefers-reduced-motion: reduce) {
  hp-button {
    transition: none;
  }
}
```

## Documentación obligatoria tras cambios CSS

Después de cada modificación CSS:

1. Actualizar `apps/docs/components/<name>.md` si cambió la API CSS
2. Documentar en tabla Style API: nuevas Custom Properties (nombre, valor por defecto, propósito)
3. Indicar si el cambio tocó `base.css` (y por qué) o solo `@styles`
4. 2-3 frases de justificación UX del cambio
