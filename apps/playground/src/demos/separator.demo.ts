import { ComponentDemo } from "../types";
import "../styles/separator.css";

export const separatorDemo: ComponentDemo = {
  title: "Separator primitive",
  description: "División semántica clara entre secciones de contenido.",
  html: `
    <div style="width: 100%; border: 1px solid var(--hp-border); padding: 2rem; border-radius: 12px; background: rgba(255,255,255,0.02);">
      <h3 style="margin-bottom: 0.5rem;">Section Title</h3>
      <p style="color: var(--hp-text-secondary); font-size: 0.9rem;">Content above the separator.</p>
      
      <hp-separator class="separator" style="margin: 1.5rem 0;"></hp-separator>
      
      <p style="color: var(--hp-text-secondary); font-size: 0.9rem;">Content below the separator.</p>
      
      <div style="display: flex; align-items: center; gap: 1rem; margin-top: 2rem; height: 24px;">
        <span style="font-size: 0.85rem;">Dashboard</span>
        <hp-separator orientation="vertical" class="separator"></hp-separator>
        <span style="font-size: 0.85rem;">Settings</span>
        <hp-separator orientation="vertical" class="separator"></hp-separator>
        <span style="font-size: 0.85rem;">Logout</span>
      </div>
    </div>
  `,
};
