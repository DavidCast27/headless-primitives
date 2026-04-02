import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";

// Importamos el componente primitivo general globalmente en todo Vitepress
// Vite al ver este ESM Import, corre el registro de "customElements.define"
// permitiendo a todo archivo Markdown parsearlo sin problema.
import "@headless-primitives/button";
import "@headless-primitives/switch";
import "@headless-primitives/separator";
import "@headless-primitives/progress";
import "@headless-primitives/label";
import "@headless-primitives/avatar";

export default {
  extends: DefaultTheme,
} satisfies Theme;
