import { ComponentDemo } from "../types";

export const fieldDemo: ComponentDemo = {
  title: "Field molecule",
  description: "Coordinación automática de IDs y atributos ARIA por proximidad.",
  html: `
    <hp-field>
      <div style="display: flex; flex-direction: column; gap: 0.75rem; width: 100%; max-width: 400px; padding: 1.5rem; border-radius: 12px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-color);">
        <hp-field-label class="label" style="font-weight: 600;">Account Password</hp-field-label>
        <hp-field-description style="font-size: 0.8rem; color: var(--text-secondary); opacity: 0.8;">
          Must be at least 12 characters long.
        </hp-field-description>
        <hp-field-control>
          <input type="password" placeholder="••••••••••••" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color); background: rgba(0,0,0,0.2); color: white;" />
        </hp-field-control>
        <hp-field-error style="font-size: 0.8rem; color: #ef4444; font-weight: 500;">
          Password is too weak.
        </hp-field-error>
      </div>
    </hp-field>
  `,
};
