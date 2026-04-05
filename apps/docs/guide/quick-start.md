# Quick Start

## ¿Qué resolvemos verdaderamente?

Las grandes librerías pre-cocinadas como Material/Chakra secuestran tu libertad de diseño e imponen cargas inmensas y su caprichoso JS. Nuestra aproximación _Headless_ te entrega puramente las interacciones avanzadas de UI: manejo perimetral de foco y ARIA encapsulados subatémicamente desde etiquetas amigables (`<hp-dialog>`, `<hp-button>`). Tú dominas el estilo.

## Instalación global

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/button
```

```bash [npm]
npm install @headless-primitives/button
```

```bash [yarn]
yarn add @headless-primitives/button
```

```bash [bun]
bun add @headless-primitives/button
```

:::

## Uso básico

Dentro de tu script base:

```javascript
import "@headless-primitives/button";
```

En tu marcado (HTML):

```html
<hp-button aria-pressed="true" class="tu-clase-css">¡Así de natural!</hp-button>
```

> Los componentes se registran automáticamente al importar el paquete. No necesitas llamar a `customElements.define()` manualmente.
