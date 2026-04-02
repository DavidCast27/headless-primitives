import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Headless Primitives",
  description: "Web Components agnósticos, accesibles y cero dependencias.",
  head: [["link", { rel: "icon", href: "/logo.png" }]],

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
        text: "Componentes",
        items: [
          { text: "Button", link: "/components/button" },
          { text: "Switch", link: "/components/switch" },
          { text: "Separator", link: "/components/separator" },
          { text: "Progress", link: "/components/progress" },
          { text: "Label", link: "/components/label" },
          { text: "Avatar", link: "/components/avatar" },
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
