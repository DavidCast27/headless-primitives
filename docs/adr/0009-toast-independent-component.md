# ADR 0009 — Toast como Componente Primitivo Independiente

**Status:** Accepted
**Date:** 2026-04-03
**Deciders:** David Castrillón, Team Headless Primitives

## Context

En el roadmap original (Tier 3), Toast/Alert estaba listado como un componente, pero durante la implementación temprana del playground en la rama `feature/tier_3`, fue prototipado solo como una demostración (demo) sin un componente real subyacente.

Esto creó un problema:

1. Toast no era reusable en otros proyectos (solo disponible en el playground)
2. No había tests de unidad
3. No había documentación de API
4. No podía ser añadido a otros workspaces sin copiar código

## Decision

Implementar **Toast como un Custom Element independiente** en `packages/vanilla/toast/` con:

- **Componentes**: `<hp-toast>` e `<hp-toast-container>`
- **Sin dependencias externas** (vanilla JS/TypeScript)
- **Light DOM** (no Shadow DOM)
- **Auto-dismiss configurable** (duración en ms, 0 = manual)
- **Accessible**: `role="alert"`, `aria-live="polite"`, `aria-atomic="true"`
- \*\*Animations: Slide-in/out automáticas via CSS `@keyframes`
- **Public API**:
  - `container.addToast(content, options?)` — crear toast
  - `toast.close()` — cerrar toast
  - `container.clearAll()` — cerrar todos
  - Event: `hp-dismiss`

### Por qué no es de Shadow DOM

Toast no necesita encapsulación de estilos. El usuario probablemente quiera aplicar sus propios estilos (background, color, border-radius, etc). Light DOM permite:

- Herencia de fuentes del documento
- Styling externo directo via CSS classes o inline
- Mejor performance (menos recalculate)

### Por qué no es un singleton

Al hacer un `<hp-toast-container>`, el usuario tiene **control total** sobre:

- Cuántos contenedores crea (1 global, o múltiples por región)
- Dónde los posiciona (`data-position="top-right"` etc)
- Cómo los estiliza

## Consequences

### Positiva

✅ Toast ahora es un módulo npm reutilizable
✅ Tests de unidad aseguran calidad y comportamiento predecible
✅ Documentación clara (app/docs/components/toast.md)
✅ Integración con playground via demo funcional
✅ Compatible con cualquier framework o vanilla JS
✅ Accesibilidad implementada desde cero

### Negativa

- ❌ Pequeño overhead vs inline code (pero negligible: ~2KB gzipped)
- ❌ Requiere aprender la API pública (pero es muy simple)

## Implementation Details

**Archivo estructura:**

```
packages/vanilla/toast/
├── src/
│   ├── toast.ts           # Clase HeadlessToast + HeadlessToastContainer
│   ├── toast.test.ts      # Tests Vitest
│   └── index.ts           # Exportaciones + customElements.define()
├── package.json
├── tsconfig.json
└── vite.config.ts
```

**Imported en:**

- `apps/playground/package.json` (dependencies)
- `apps/playground/src/main.ts` (import + register)
- `apps/playground/src/demos/toast.demo.ts` (demostración)

**Documentado en:**

- `apps/docs/components/toast.md` — API reference completa
- `docs/ROADMAP.md` — Tier 3 / Status: ✅ Hecho

## Alternatives Considered

### 1. Async Queue interna (singleton pattern)

```javascript
HeadlessToast.show("Mensaje");
```

❌ Rechazado: Menos flexible. El usuario no puede controlar posición o múltiples contenedores.

### 2. Solo demo en playground, sin componente

❌ Rechazado: No es reutilizable. El usuario tendría que copiar código.

### 3. Toast como parte de Dialog

❌ Rechazado: Son patrones muy diferentes. Toast es no-modal y auto-dismiss. Dialog es modal y blocking.

## Related Decisions

- **ADR 0002** (Light DOM vs Shadow DOM) — Aplicado aquí
- **ADR 0003** (Naming Conventions) — Prefix `hp-` usado
- **ADR 0007** (Modular Playground Architecture) — Toast incluido en ROUTES + sidebar

## Future Work

- [ ] Considerar animación customizable via CSS custom properties
- [ ] Implementar `prefers-reduced-motion` respeto automático
- [ ] Posible variante "stacked" con contador
- [ ] Posible integración con bibliotecas de notificación (e.g., sonnotify)
