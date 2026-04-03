import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";

// Importamos el componente primitivo general globalmente en todo Vitepress
import "@headless-primitives/button";
import "@headless-primitives/switch";
import "@headless-primitives/checkbox";
import "@headless-primitives/separator";
import "@headless-primitives/progress";
import "@headless-primitives/radio-group";
import "@headless-primitives/label";
import "@headless-primitives/avatar";
import "@headless-primitives/field";
import "./docs-demos.css";

// Importar componentes del tema
import FlavorToggle from "./components/FlavorToggle.vue";
import Flavor from "./components/Flavor.vue";
import CodeSnippet from "./components/CodeSnippet.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Registro global de componentes para usar en Markdown
    app.component("FlavorToggle", FlavorToggle);
    app.component("Flavor", Flavor);
    app.component("CodeSnippet", CodeSnippet);
  },
} satisfies Theme;
