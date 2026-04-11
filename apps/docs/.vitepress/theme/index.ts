import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";

// Importamos el componente primitivo general globalmente en todo Vitepress
import "@headless-primitives/accordion";
import "@headless-primitives/avatar";
import "@headless-primitives/badge";
import "@headless-primitives/breadcrumb";
import "@headless-primitives/button";
import "@headless-primitives/navigation-menu";
import "@headless-primitives/checkbox";
import "@headless-primitives/collapsible";
import "@headless-primitives/combobox";
import "@headless-primitives/context-menu";
import "@headless-primitives/carousel";
import "@headless-primitives/dialog";
import "@headless-primitives/drawer";
import "@headless-primitives/dropdown-menu";
import "@headless-primitives/field";
import "@headless-primitives/fieldset";
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
import "@headless-primitives/slider";
import "@headless-primitives/pin-input";
import "@headless-primitives/tree";
import "@headless-primitives/stepper";
import "@headless-primitives/scroll-area";
import "@headless-primitives/toolbar";
// Base functional CSS for headless components
import "@headless-primitives/utils/base.css";
import "./docs-demos.css";

// Importar componentes del tema
import FlavorToggle from "./components/FlavorToggle.vue";
import Flavor from "./components/Flavor.vue";
import CodeSnippet from "./components/CodeSnippet.vue";
import ThemeBuilder from "./components/ThemeBuilder.vue";
import NavigationMenuDemo from "./components/NavigationMenuDemo.vue";
import LlmsTxtViewer from "./components/LlmsTxtViewer.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Registro global de componentes para usar en Markdown
    app.component("FlavorToggle", FlavorToggle);
    app.component("Flavor", Flavor);
    app.component("CodeSnippet", CodeSnippet);
    app.component("ThemeBuilder", ThemeBuilder);
    app.component("NavigationMenuDemo", NavigationMenuDemo);
    app.component("LlmsTxtViewer", LlmsTxtViewer);
  },
} satisfies Theme;
