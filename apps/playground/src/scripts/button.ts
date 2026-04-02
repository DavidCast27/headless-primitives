import { addLog } from "./utils";

export function initButtonDemo() {
  const toggleBtn = document.getElementById("btn-toggle");
  const comunBtn = document.getElementById("btn-comun");

  if (toggleBtn) {
    toggleBtn.addEventListener("hp-change", (e: Event) => {
      const customEvent = e as CustomEvent<{ pressed: boolean }>;
      const newState = customEvent.detail.pressed
        ? '<strong style="color: #10b981">ACTIVADO</strong>'
        : '<strong style="color: #ef4444">DESACTIVADO</strong>';
      addLog(`Button Toggle cambio: ${newState}`);
    });
  }

  if (comunBtn) {
    comunBtn.addEventListener("click", () => {
      addLog(`Button Básico recibió click.`);
    });
  }
}
