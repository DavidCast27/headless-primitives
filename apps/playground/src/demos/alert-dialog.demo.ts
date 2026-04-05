import { ComponentDemo } from "../types";
import "./alert-dialog.css";

export const alertDialogDemo: ComponentDemo = {
  title: "Alert Dialog",
  description: "Modal que requiere confirmación explícita. No se cierra con ESC o click fuera.",
  html: `
    <div style="display: flex; gap: 1rem; align-items: center; padding: 2rem;">
      <button class="btn btn-secondary" id="open-alert-dialog">Open Alert Dialog</button>

      <hp-dialog id="alert-dialog" data-alert="true">
        <hp-dialog-trigger style="display: none;"></hp-dialog-trigger>
        
        <hp-dialog-backdrop style="backdrop-filter: blur(2px);"></hp-dialog-backdrop>

        <hp-dialog-content 
          class="dialog-content" 
          role="alertdialog" 
          aria-modal="true" 
          aria-labelledby="alert-title" 
          aria-describedby="alert-body"
        >
          <h2 id="alert-title" style="margin: 0 0 1rem 0; font-size: 1.125rem;">Confirmar acción crítica</h2>
          <p id="alert-body" style="margin: 0 0 1.5rem 0; color: #666;">
            Esta acción es irreversible. ¿Deseas continuar?
          </p>
          <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
            <button class="btn" id="cancel-alert">Cancelar</button>
            <button class="btn btn-secondary" id="confirm-alert">Confirmar</button>
          </div>
        </hp-dialog-content>
      </hp-dialog>
    </div>
  `,
  init: () => {
    const openBtn = document.getElementById("open-alert-dialog");
    const cancelBtn = document.getElementById("cancel-alert");
    const confirmBtn = document.getElementById("confirm-alert");
    const dialog = document.getElementById("alert-dialog") as any;

    openBtn?.addEventListener("click", () => {
      dialog?.querySelector("hp-dialog-trigger")?.click();
    });

    cancelBtn?.addEventListener("click", () => {
      dialog?.close();
    });

    confirmBtn?.addEventListener("click", () => {
      const originalText = confirmBtn.textContent;
      confirmBtn.textContent = "✓ Confirmado";
      confirmBtn.style.background = "#16a34a";

      setTimeout(() => {
        dialog?.close();
        confirmBtn.textContent = originalText;
        confirmBtn.style.background = "";
      }, 600);
    });
  },
};
