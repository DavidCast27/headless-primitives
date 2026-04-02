# Motivación y Decisiones de Diseño

El ecosistema de componentes UI en React (y otros frameworks) tiene soluciones headless excelentes como **Radix UI** y **Base UI**. Sin embargo, todas están atadas a su framework.

La idea de este proyecto es crear primitivos headless que funcionen en **cualquier stack**: React, Angular, Vue, Svelte, Astro, o sin framework. La tecnología elegida: **Web Components (Custom Elements)**.

## Referencias

Inspirado en librerías headless existentes:

| Librería | Tipo | Enfoque |
|---|---|---|
| [Radix UI](https://www.radix-ui.com/) | Componentes React headless | Componentes accesibles atómicos (Dialog, Popover, Tabs, etc.) |
| [Base UI](https://base-ui.com/) | Componentes React headless | Del equipo de MUI. Más hooks/utilidades de bajo nivel |
| [shadcn/ui](https://ui.shadcn.com/) | Copy-paste components | Usa Radix. No es una librería, es código que copias a tu proyecto |
| [Shoelace](https://shoelace.style/) | Web Components | UI completa (no headless), framework-agnostic |
| [FAST](https://www.fast.design/) | Web Components (Microsoft) | Headless + sistema de diseño adaptativo |
| [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/) | Web Components (Adobe) | Basado en diseño Spectrum |

## Decisiones de diseño

### Vanilla JS vs Lit

**Decisión: Vanilla JS puro.**

| Aspecto | Vanilla | Lit |
|---|---|---|
| Dependencias | 0 KB | ~15KB minified |
| Curva de aprendizaje | Web Components nativos | Azúcar sintáctica sobre WC |
| Debugging | Transparente | Abstraction layer |
| Migración | — | Fácil cambiar a Lit después |

Lit es esencialmente azúcar sintáctica sobre Web Components vanilla. Comenzar con vanilla permite:
- Entender cómo funcionan los Web Components realmente
- Cero dependencias de runtime
- Migrar a Lit fácilmente si el boilerplate se vuelve doloroso

**Wrappers por framework vendrán después.** La prioridad es un core robusto y framework-agnostic.
