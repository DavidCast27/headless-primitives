# Filosofía

`Headless Primitives` nace de una necesidad clara: **reducir la dependencia de frameworks para la lógica de UI esencial.**

## ¿Por qué "Headless"?

El término "Headless" (sin cabeza) significa que el componente proporciona toda la **funcionalidad, accesibilidad y lógica de estado**, pero no impone ningún diseño visual.

- **Tú tienes el control total del CSS.**
- **Nosotros nos encargamos del ARIA, el foco y el teclado.**

## Principios Fundamentales

### 1. Estándares Web Primero

Usamos **Custom Elements** nativos. Esto significa que tu código funcionará hoy, en 5 años y en cualquier framework (o sin ninguno), porque se basa en el estándar del navegador.

### 2. Lit 3 como base

Los componentes usan **Lit 3** (`HeadlessElement`) como base para reactividad declarativa con `@property` y `@customElement`. Lit es una capa mínima sobre Custom Elements nativos (~13kB) que garantiza consistencia y reduce boilerplate. Ver [ADR 0010](../../docs/adr/0010-headlesselement-lit-migration.md).

### 3. Accesibilidad por Defecto

No deberías tener que ser un experto en la W3C para crear un botón o un modal accesible. Nuestros componentes vienen con los roles y atributos necesarios configurados de fábrica.

### 4. Simplicidad Radical

La API es declarativa. Si sabes usar HTML, sabes usar `Headless Primitives`.
