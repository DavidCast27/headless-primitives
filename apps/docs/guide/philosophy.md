# Filosofía

`Headless Primitives` nace de una necesidad clara: **reducir la dependencia de frameworks para la lógica de UI esencial.**

## ¿Por qué "Headless"?

El término "Headless" (sin cabeza) significa que el componente proporciona toda la **funcionalidad, accesibilidad y lógica de estado**, pero no impone ningún diseño visual. 

- **Tú tienes el control total del CSS.**
- **Nosotros nos encargamos del ARIA, el foco y el teclado.**

## Principios Fundamentales

### 1. Estándares Web Primero
Usamos **Custom Elements** nativos. Esto significa que tu código funcionará hoy, en 5 años y en cualquier framework (o sin ninguno), porque se basa en el estándar del navegador.

### 2. Cero Dependencias
La librería no tiene dependencias de runtime. Es ligera, rápida y no añade "bloat" a tu aplicación.

### 3. Accesibilidad por Defecto
No deberías tener que ser un experto en la W3C para crear un botón o un modal accesible. Nuestros componentes vienen con los roles y atributos necesarios configurados de fábrica.

### 4. Simplicidad Radical
La API es declarativa. Si sabes usar HTML, sabes usar `Headless Primitives`.
