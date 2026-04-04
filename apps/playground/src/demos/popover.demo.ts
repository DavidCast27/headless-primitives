import { ComponentDemo } from "../types";
import "./popover.css";

export const popoverDemo: ComponentDemo = {
  title: "Popover primitive",
  description: "Contenido flotante que se abre al hacer click, con manejo de foco.",
  html: `
    <div style="display: flex; gap: 2rem; align-items: center; padding: 2rem;">
      <hp-popover>
        <hp-popover-trigger>
          <button class="btn btn-primary">Open Popover</button>
        </hp-popover-trigger>
        <hp-popover-content class="popover-content">
          <p>Are you sure you want to delete this item? This action cannot be undone.</p>
          <div style="display: flex; justify-content: flex-end; margin-top: 12px;">
            <button class="btn" onclick="this.closest('hp-popover').querySelector('hp-popover-trigger').click()">Cancel</button>
            <button class="btn btn-secondary" onclick="this.closest('hp-popover').querySelector('hp-popover-trigger').click()">Delete</button>
          </div>
        </hp-popover-content>
      </hp-popover>
    </div>
  `,
  init: () => {
    // No additional init needed
  },
};
