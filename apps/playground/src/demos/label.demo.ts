import { ComponentDemo } from "../types";
import "./label.css";

export const labelDemo: ComponentDemo = {
  title: "Label primitive",
  description: "Etiqueta inteligente que soluciona el foco en Custom Elements.",
  html: `
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 300px;">
      <hp-label for="lbl-test" class="label">User Identification</hp-label>
      <input id="lbl-test" type="text" placeholder="Click label to focus me" style="padding: 10px; border-radius: 6px; border: 1px solid var(--border-color); background: rgba(0,0,0,0.2); color: white;" />
    </div>
  `,
};
