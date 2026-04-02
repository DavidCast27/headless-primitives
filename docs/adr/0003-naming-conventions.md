# 0003. Naming Conventions (Prefijos y Archivos)

## Contexto

Al inicializar nuestro ecosistema, nos dimos cuenta de dos antipatrones que amenazaban la Experiencia de Desarrollador (DX):

1. **Nombres de archivos redundantes**: En un monorepo, los archivos ya están asilados lógicamente por carpeta. Por ejemplo: `packages/vanilla/button/src/headless-button.ts`. A esto se le conoce como _Name Stuttering_ (Tartamudeo de Nombres).
2. **Prefijos largos en los Custom Elements**: Si bien el nombre de nuestra librería es `headless-primitives`, forzar a usar el tag `<headless-button>` para cada implementación engorda y ensucia el código HTML de quien nos consume. Líderes de la industria (Shoelace con `sl-`, Ionic con `ion-`) demuestran que un prefijo de 2 a 3 letras es el punto perfecto entre evitar colisiones de nombres y tener una DX limpia.

## Decisión

Hemos estandarizado agresivamente las convenciones de _naming_:

1. **Archivos fuente limpios**: Las clases lógicas dentro de los componentes no repetirán redundancias en el nombre de su archivo, es decir, el archivo será simplemente `button.ts`, `dialog.ts`, `popover.ts`.
2. **Prefijo `hp-` oficial**: Todos los web components creados deberán registrar su etiqueta HTML _prefixed_ con `hp-` (apócope de Headless Primitives). Ej. `<hp-button>`.
3. **Nombres de Eventos Custom**: Los eventos originados por la librería seguirán la misma lógica para mantener coherencia nativa. Ej: en lugar de emitir un evento `headless-change`, se emitirá `hp-change`.

## Consecuencias

- Escritura y legibilidad dramáticamente superiores en HTML (`<hp-dialog>` vs `<headless-dialog>`).
- Enrutamiento interno más fácil y directorios menos verbosos (`src/button.ts`).
