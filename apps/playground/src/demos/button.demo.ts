import { ComponentDemo } from "../types";
import "./button.css";

export const buttonDemo: ComponentDemo = {
  title: "Button primitive",
  description: "Base sólida para botones interactivos y toggles accesibles.",
  html: `
    <div style="display: flex; gap: 1rem; align-items: center;">
      <hp-button class="btn btn-primary">Normal Button</hp-button>
      <hp-button class="btn btn-secondary">Secondary</hp-button>
      <hp-button class="btn btn-toggle" aria-pressed="false" id="btn-toggle">
        Toggle Me
      </hp-button>
      <hp-button class="btn" disabled>Disabled</hp-button>
    </div>
  `,
  init: () => {
    const btnToggle = document.getElementById("btn-toggle");
    btnToggle?.addEventListener("hp-change", (_e: any) => {
      // Handle change
    });
  },
};
