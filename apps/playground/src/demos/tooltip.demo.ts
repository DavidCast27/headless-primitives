import { ComponentDemo } from "../types";
import "./tooltip.css";

export const tooltipDemo: ComponentDemo = {
  title: "Tooltip primitive",
  description: "Información flotante que aparece al hacer hover o focus.",
  html: `
    <div style="display: flex; gap: 2rem; align-items: center; padding: 2rem;">
      <hp-tooltip>
        <hp-tooltip-trigger>
          <button class="btn btn-primary">Hover me</button>
        </hp-tooltip-trigger>
        <hp-tooltip-content class="tooltip-content">
          This is a tooltip
        </hp-tooltip-content>
      </hp-tooltip>

      <hp-tooltip>
        <hp-tooltip-trigger>
          <button class="btn btn-secondary">Focus me</button>
        </hp-tooltip-trigger>
        <hp-tooltip-content class="tooltip-content">
          Tooltip on focus
        </hp-tooltip-content>
      </hp-tooltip>
    </div>
  `,
  init: () => {
    // No additional init needed
  },
};
