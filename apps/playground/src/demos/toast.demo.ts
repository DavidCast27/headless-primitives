import { ComponentDemo } from "../types";
import "../styles/toast.css";

export const toastDemo: ComponentDemo = {
  title: "Toast / Alert",
  description: "Notificación no modal que desaparece sola (auto-dismiss).",
  html: `
    <div style="display: flex; gap: 1rem; align-items: center; padding: 2rem;">
      <button class="btn btn-secondary" id="show-toast">Show Toast</button>
      <button class="btn btn-secondary" id="show-error">Show Error Toast</button>
      <button class="btn btn-secondary" id="clear-all">Clear All</button>
      <hp-toast-container data-position="top-right"></hp-toast-container>
    </div>
  `,
  init: () => {
    const showBtn = document.getElementById("show-toast");
    const errorBtn = document.getElementById("show-error");
    const clearBtn = document.getElementById("clear-all");
    const container = document.querySelector("hp-toast-container") as any;

    if (!container) return;

    showBtn?.addEventListener("click", () => {
      const toast = container.addToast("✓ Cambios guardados correctamente", { duration: 3000 });
      toast.style.background = "#16a34a";
      toast.style.color = "#fff";
    });

    errorBtn?.addEventListener("click", () => {
      const toast = container.addToast("✕ Error al guardar. Intenta de nuevo.", { duration: 4000 });
      toast.style.background = "#dc2626";
      toast.style.color = "#fff";
    });

    clearBtn?.addEventListener("click", () => {
      container.clearAll();
    });
  },
};
