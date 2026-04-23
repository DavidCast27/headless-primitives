# ADR 0012: Premium Documentation Template v2 (Estructura de Componente)

## Estado

Aceptado (Sustituye y expande las directrices del ADR 0008)

## Contexto

El estándar definido en el ADR 0008 abordaba únicamente la anatomía de la sección "API Reference". Para escalar la documentación al nivel de librerías de clase mundial (como Radix UI o Base UI), era necesario un manual rígido, "foolproof", para prevenir alucinaciones de Inteligencia Artificial y estandarizar Features, Demos, y WAI-ARIA.

## Decisión

Adoptamos el **Premium Documentation Template v2**.

A partir de ahora, todas las páginas documentando primitivos en `apps/docs/components/[nombre].md` DEBEN seguir exactamente la **BIBLIA FOOLPROOF** a continuación.

---

## REGLAS CRÍTICAS (PARA AGENTES IA)

1. **PROHIBIDO INVENTAR ETIQUETAS O ATRIBUTOS:** Debes auditar el código fuente en `packages/vanilla/<componente>/src/<componente>.ts` ANTES de documentar. Si el atributo no existe ahí, NO lo documentes.
2. **NO ES REACT/VUE:** Los bloques de código HTML no pueden llevar `className`, `onClick`, u otras sintaxis de frameworks. Solo puro HTML estandarizado para Custom Elements (`class=""`, `onclick=""`).
3. **NO HAY SCRIPTS INLINE INTRUSIVOS:** No añadas `<script>alert('hola')</script>` a las demos. Si necesitas lógica, usa `<script>` limpio al final del archivo solo referenciando el `document.querySelector`.
4. **FORMATO DE TABLAS ESTRICTO:** Toda tabla de API o de Accesibilidad debe usar el formato exacto provisto abajo.
5. **VITEPRESS COMPATIBILITY:** Usa las variables nativas `--vp-c-text-1`, `--vp-c-brand`, `--vp-c-border` en el `<style>` en vez de colores hexadecimales harcodeados para asegurar soporte de Dark Mode.

---

## ANATOMÍA DEL ARCHIVO MARKDOWN (Copia y Pega)

TODO archivo de componente DEBE tener exactamente esta estructura en este orden:

### 1. Cabecera (Obligatorio)

```markdown
# <Nombre del Componente Capitalizado> <span class="hp-badge">Nuevo</span> <!-- o "Actualizado", "Estable" -->

Descripción de una o dos oraciones precisas sobre la utilidad del componente y referenciando si implementa un estándar WAI-ARIA.
```

### 2. Demostración (Obligatorio)

Debe haber al menos dos visuales. Va inmediatamente después de la descripción para que el usuario vea el componente en acción antes de cualquier otra sección.

````markdown
## Demostración

### Sin estilos (solo base.css)

Así se ve usando únicamente la capa base estructural.

<div class="hp-demo-card">
  <!-- Instancia funcional pura NO estilizada -->
  <hp-ejemplo value="demo">Hola</hp-ejemplo>
</div>

### Con estilos personalizados

El componente estilizado usando clases.

<div class="hp-demo-card">
  <!-- Instancia estilizada -->
  <hp-ejemplo class="demo-ejemplo" value="demo-css">Hola</hp-ejemplo>
</div>

<CodeSnippet>
  <Flavor only="css">
    ::: code-group
    ```html [index.html]
    <hp-ejemplo class="demo-ejemplo" value="demo-css">Hola</hp-ejemplo>
    ```
    ```css [styles.css]
    .demo-ejemplo { background: blue; }
    ```
    :::
  </Flavor>

  <Flavor only="tailwind">
    ::: code-group
    ```html [index.html]
    <hp-ejemplo class="bg-blue-500 hover:bg-blue-600" value="demo-css">Hola</hp-ejemplo>
    ```
    :::
  </Flavor>
</CodeSnippet>
````

### 3. Instalación (Obligatorio)

Usa estrictamente la directiva `::: code-group`.

````markdown
## Instalación

::: code-group

```bash [pnpm]
pnpm add @headless-primitives/<nombre-paquete>
```

```bash [npm]
npm install @headless-primitives/<nombre-paquete>
```

```bash [yarn]
yarn add @headless-primitives/<nombre-paquete>
```

```bash [bun]
bun add @headless-primitives/<nombre-paquete>
```

:::
````

### 4. Features (Obligatorio)

_Nota: No uses más de 5 viñetas._

```markdown
## Features

- ⌨️ Soporte completo de navegación por teclado.
- ♿️ Accesibilidad WAI-ARIA incorporada y gestionada por defecto.
- 🎨 Sin estilos visuales (Headless).
- ⚡️ Totalmente controlable mediante propiedades JS o atributos DOM.
```

### 5. Anatomía del Árbol (Obligatorio)

Sin clases, sin IDs. Solo la jerarquía estructural pura de cómo se compone.

````markdown
## Anatomía

```html
<hp-ejemplo>
  <hp-ejemplo-trigger></hp-ejemplo-trigger>
  <hp-ejemplo-content></hp-ejemplo-content>
</hp-ejemplo>
```
````

### 6. API Reference (Obligatorio)

Genera una sección por CADA subcomponente exportado por el paquete.

```markdown
## API Reference

### `hp-ejemplo`

Contenedor raíz del componente.

#### Atributos / Propiedades

_(Usa esta tabla. Ignora si no tiene)_
| Atributo / Propiedad | Tipo | Por Defecto | Descripción |
|---|---|---|---|
| `disabled` | `boolean` | `false` | Deshabilita la interacción con el componente. |
| `value` | `string` | `''` | Valor interno del estado. |

#### Eventos

_(Usa esta tabla. Recuerda el prefijo `hp-`)_
| Evento | Detalle | Descripción |
|---|---|---|
| `hp-change` | `{ value: string }` | Se emite cuando el valor cambia producto de una interacción de usuario. |

#### Atributos ARIA gestionados automáticamente

_(Usa esta lista)_

- `role="button"` - Añadido por defecto.
- `aria-expanded` - Sincronizado automáticamente según estado abierto/cerrado.
- `data-state` - Aplica `data-state="open | closed"` para simplificar el estilizado CSS.
```

### 7. Accesibilidad (Obligatorio)

Link al patrón original (si existe) y una tabla inquebrantable de control por teclado. Verifica en el `.ts` si escucha a "ArrowDown" o "Enter".

```markdown
## Accesibilidad

Adhiere al [patrón WAI-ARIA APG para Ejemplo XY](https://www.w3.org/WAI/ARIA/apg/patterns/...).

### Navegación por teclado

| Tecla             | Acción                                                     |
| ----------------- | ---------------------------------------------------------- |
| `Enter` / `Space` | Activa el trigger y abre/cierra el contenido.              |
| `ArrowDown`       | Mueve el foco al siguiente ítem.                           |
| `Escape`          | Cierra el contenido abierto y devuelve el foco al trigger. |
```

### 8. Bloque CSS / Script Interno (Obligatorio si hay Demo)

Al final del Markdown, añade un bloque `<style>` para asegurar que el `div.hp-demo-card` y las clases personalizadas se vean bien. Usa variables de Vitepress (`var(--vp-c-*)`).

```html
<style>
  /* Reset en el contenedor */
  .hp-demo-card {
    border: 1px solid var(--vp-c-divider);
    padding: 2rem;
    border-radius: 8px;
    background: var(--vp-c-bg-soft);
  }

  /* IMPORTANTE: Los Headless Elements pueden necesitar display: block si no lo heredan! */
  hp-ejemplo,
  hp-ejemplo-trigger {
    display: block;
  }

  .demo-ejemplo {
    color: var(--vp-c-text-1);
  }
</style>
```

---

## Consecuencias

- Asegura una experiencia de usuario estelar equivalente a la documentación UI más respetada del mercado.
- Los agentes IA tienen una estructura universal, predecible y fija para leer y generar documentación anti-alucinaciones contenida completamente en este ADR.
