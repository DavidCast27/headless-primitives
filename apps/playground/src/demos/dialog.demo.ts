import { ComponentDemo } from "../types";
import "../styles/dialog.css";

export const dialogDemo: ComponentDemo = {
  title: "Dialog primitive",
  description: "Modal overlay con focus trap y scroll lock.",
  html: `
    <div style="display: flex; gap: 2rem; align-items: center; padding: 2rem;">
      <hp-dialog>
        <hp-dialog-trigger>
          <button class="btn btn-primary">Open Dialog</button>
        </hp-dialog-trigger>
        <hp-dialog-backdrop class="dialog-backdrop"></hp-dialog-backdrop>
        <hp-dialog-content class="dialog-content">
          <h2>Delete account</h2>
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
          <div style="display: flex; justify-content: flex-end; gap: 12px;">
            <button class="btn" onclick="this.closest('hp-dialog').dispatchEvent(new CustomEvent('hp-close', { bubbles: true, composed: true }))">Cancel</button>
            <button class="btn btn-secondary" onclick="this.closest('hp-dialog').dispatchEvent(new CustomEvent('hp-close', { bubbles: true, composed: true }))">Delete</button>
          </div>
        </hp-dialog-content>
      </hp-dialog>
    </div>
  `,
  init: () => {
    // No additional init needed
  },
};
