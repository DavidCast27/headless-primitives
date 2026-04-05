# Workflow: Estándar Premium de Documentación (VitePress)

Este documento detalla cómo crear la página de documentación para un nuevo primitivo en `apps/docs/components/<nombre>.md`, siguiendo el estándar de calidad establecido en el ADR 0008.

## 0. Etapa de Referencia (Documentación Gold Standard)

Antes de crear o editar documentación, revisa estas páginas para copiar la estructura y estilo correctos:

- **`apps/docs/components/button.md`**: Referencia para un componente individual simple.
- **`apps/docs/components/accordion.md`**: El mejor ejemplo de un componente compuesto con anatomía compleja.
- **`apps/docs/components/dialog.md`**: Estándar para componentes tipo overlay, con secciones claras de API Reference.

---

## 1. Estructura de la Página

### Header y Badge

La página debe comenzar con el título principal y un badge indicando que es un componente nuevo.

```markdown
# <Nombre del Componente>

<span class="hp-badge">Nuevo</span>

Descripción breve de una o dos oraciones sobre qué hace el primitivo y qué patrón WAI-ARIA implementa.
```

### Instalación

Incluye bloque multi-gestor (npm/pnpm/Yarn/Bun) usando `code-group`.

````markdown
## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/<nombre>
```

```bash [npm]
npm install @headless-primitives/<nombre>
```

```bash [yarn]
yarn add @headless-primitives/<nombre>
```

```bash [bun]
bun add @headless-primitives/<nombre>
```

:::
````

### Demo Interactiva

Usa el contenedor `hp-demo-card` para mostrar el componente funcionando. Los estilos deben estar en un bloque `<style>` al final del archivo.

```markdown
## Demostración

<div class="hp-demo-card">
  <hp-<nombre>>
    ... estructura ...
  </hp-<nombre>>
</div>
```

---

## 2. Bloque de Anatomía

Un solo bloque de código HTML que represente el árbol anidado de etiquetas `hp-*` que componen el primitivo. No incluyas clases ni atributos en este bloque.

````markdown
## Anatomía

```html
<hp-<nombre>>
  <hp-<nombre>-trigger></hp-<nombre>-trigger>
  <hp-<nombre>-content>
    <hp-<nombre>-item></hp-<nombre>-item>
  </hp-<nombre>-content>
</hp-<nombre>>
```
````

````

---

## 3. Ejemplos de Estilo (Multi-flavor)
Usa los componentes `<CodeSnippet>` y `<Flavor>` para ofrecer ejemplos tanto en CSS puro como en Tailwind.

```markdown
<CodeSnippet>
  <Flavor only="css">
    ::: code-group
    ```html [index.html]
    ...
    ```
    ```css [style.css]
    ...
    ```
    :::
  </Flavor>

  <Flavor only="tailwind">
    ::: code-group
    ```html [index.html]
    ... (usando clases utilitarias de Tailwind)
    ```
    :::
  </Flavor>
</CodeSnippet>
````

---

## 4. API Reference

Una subsección de nivel 3 (`###`) para cada Custom Element del paquete, en orden anatómico.

Cada sección puede incluir las siguientes tablas (solo si aplican):

- **Atributos**: Atributos HTML que acepta el componente.
- **Propiedades**: Propiedades JS (si son diferentes de los atributos).
- **Eventos**: Eventos emitidos por el componente (prefijo `hp-` obligatorio).
- **Estados / ARIA**: Roles y estados que el componente gestiona automáticamente.

---

## 5. Registro en VitePress

### Sidebar (`apps/docs/.vitepress/config.ts`)

Añade la entrada en el array `sidebar` dentro de la sección de componentes:

```typescript
{ text: "<Nombre>", link: "/components/<nombre>" }
```

### Theme import (`apps/docs/.vitepress/theme/index.ts`)

Añade el import del paquete para que el custom element esté registrado durante el build de VitePress:

```typescript
import "@headless-primitives/<nombre>";
```

---

## 6. Bloque de Estilos (Markdown)

Al final del archivo, añade un bloque `<style>` para que la demo se vea correctamente.

```html
<style>
  .hp-demo-card {
    /* Estilos del contenedor */
  }
  hp-<nombre > {
    /* Estilos específicos usando variables de VitePress */
    color: var(--vp-c-text-1);
  }
</style>
```

### Reglas de VitePress

1.  **Sin líneas en blanco**: No dejes líneas en blanco entre elementos custom dentro del `hp-demo-card`.
2.  **Display Block**: Asegúrate de que todos los custom elements tengan `display: block` definido en el CSS local si no está heredado de `base.css`.
3.  **Tematización**: Usa variables `--vp-c-*` para compatibilidad con el modo oscuro.
