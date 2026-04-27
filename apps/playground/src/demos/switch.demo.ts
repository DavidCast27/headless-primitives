import { ComponentDemo } from "../types";
import "../styles/switch.css";

export const switchDemo: ComponentDemo = {
  title: "Switch primitive",
  description: 'Interruptor táctil con rol role="switch" y manejo de teclado.',
  html: `
    <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%; max-width: 400px;">
      <div class="control-group">
        <hp-label for="core-sw">Enable Notifications</hp-label>
        <hp-switch id="core-sw" class="switch"></hp-switch>
      </div>
      <div class="control-group">
        <hp-label for="core-sw-2">Active by default</hp-label>
        <hp-switch id="core-sw-2" class="switch" checked></hp-switch>
      </div>
      <div class="control-group">
        <hp-label for="core-sw-disabled">Disabled state</hp-label>
        <hp-switch id="core-sw-disabled" class="switch" disabled></hp-switch>
      </div>
    </div>
  `,
};
