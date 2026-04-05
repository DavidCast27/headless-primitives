import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Headless Primitives",
  description: "Web Components agnósticos, accesibles y cero dependencias.",
  head: [["link", { rel: "icon", href: "/logo.png" }]],

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith("hp-"),
      },
    },
  },

  themeConfig: {
    logo: "/logo.png",

    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "Buscar",
                buttonAriaLabel: "Buscar",
              },
              modal: {
                displayDetails: "Mostrar detalles",
                resetButtonTitle: "Limpiar busqueda",
                backButtonTitle: "Cerrar buscador",
                noResultsText: "No se encontraron resultados para",
                footer: {
                  selectText: "para seleccionar",
                  navigateText: "para navegar",
                  closeText: "para cerrar",
                },
              },
            },
          },
        },
      },
    },

    nav: [
      { text: "Inicio", link: "/" },
      { text: "Guía", link: "/guide/quick-start" },
      { text: "Componentes", link: "/components/button" },
    ],

    sidebar: [
      {
        text: "Introducción",
        items: [
          { text: "Filosofía", link: "/guide/philosophy" },
          { text: "Instalación", link: "/guide/quick-start" },
        ],
      },
      {
        text: "Guías",
        items: [
          { text: "Accesibilidad", link: "/guide/accessibility" },
          { text: "Animaciones", link: "/guide/animation" },
          { text: "Eventos", link: "/guide/events" },
          { text: "Theming & Tokens", link: "/guide/theming" },
          {
            text: "Styling",
            collapsed: false,
            items: [
              { text: "Overview", link: "/guide/styling" },
              { text: "base.css — Layer 1", link: "/guide/base-css" },
              { text: "@styles Theming — Layer 2", link: "/guide/styles-theming" },
              { text: "Constructor de Tema", link: "/guide/theme-builder" },
            ],
          },
        ],
      },
      {
        text: "Componentes",
        items: [
          { text: "Accordion", link: "/components/accordion" },
          { text: "Alert Dialog", link: "/components/alert-dialog" },
          { text: "Avatar", link: "/components/avatar" },
          { text: "Button", link: "/components/button" },
          { text: "Checkbox", link: "/components/checkbox" },
          { text: "Collapsible", link: "/components/collapsible" },
          { text: "Dialog", link: "/components/dialog" },
          { text: "Drawer", link: "/components/drawer" },
          { text: "Field", link: "/components/field" },
          { text: "Label", link: "/components/label" },
          { text: "Popover", link: "/components/popover" },
          { text: "Progress", link: "/components/progress" },
          { text: "Radio Group", link: "/components/radio-group" },
          { text: "Separator", link: "/components/separator" },
          { text: "Switch", link: "/components/switch" },
          { text: "Tabs", link: "/components/tabs" },
          { text: "Toast", link: "/components/toast" },
          { text: "Toggle Group", link: "/components/toggle-group" },
          { text: "Tooltip", link: "/components/tooltip" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/DavidCast27/headless-primitives" }],

    footer: {
      message: "Lanzado bajo la MIT License.",
      copyright: "Copyright © 2026 - Presente | David Castrillón",
    },
  },
});
