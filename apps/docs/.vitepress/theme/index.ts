import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";

// Importamos el componente primitivo general globalmente en todo Vitepress
import "@headless-primitives/accordion";
import "@headless-primitives/avatar";
import "@headless-primitives/badge";
import "@headless-primitives/button";
import "@headless-primitives/checkbox";
import "@headless-primitives/collapsible";
import "@headless-primitives/combobox";
import "@headless-primitives/context-menu";
import "@headless-primitives/dialog";
import "@headless-primitives/drawer";
import "@headless-primitives/dropdown-menu";
import "@headless-primitives/field";
import "@headless-primitives/label";
import "@headless-primitives/popover";
import "@headless-primitives/progress";
import "@headless-primitives/radio-group";
import "@headless-primitives/select";
import "@headless-primitives/separator";
import "@headless-primitives/switch";
import "@headless-primitives/tabs";
import "@headless-primitives/toast";
import "@headless-primitives/tooltip";
import "@headless-primitives/toggle-group";
import "@headless-primitives/pin-input";
// Base functional CSS for headless components
import "@headless-primitives/utils/base.css";
import "./docs-demos.css";

// Importar componentes del tema
import FlavorToggle from "./components/FlavorToggle.vue";
import Flavor from "./components/Flavor.vue";
import CodeSnippet from "./components/CodeSnippet.vue";
import ThemeBuilder from "./components/ThemeBuilder.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Registro global de componentes para usar en Markdown
    app.component("FlavorToggle", FlavorToggle);
    app.component("Flavor", Flavor);
    app.component("CodeSnippet", CodeSnippet);
    app.component("ThemeBuilder", ThemeBuilder);
  },
} satisfies Theme;
