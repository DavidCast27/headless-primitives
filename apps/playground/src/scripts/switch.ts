import { addLog } from "./utils";

export function initSwitchDemo() {
  const swToggle = document.getElementById("sw-toggle");
  const swDisabled = document.getElementById("sw-disabled");

  if (swToggle) {
    swToggle.addEventListener("hp-change", (e: any) => {
      const newState = e.detail.checked
        ? '<strong style="color: #10b981">ON</strong>'
        : '<strong style="color: #ef4444">OFF</strong>';
      addLog(`Switch Toggle cambió a: ${newState}`);
    });
  }

  if (swDisabled) {
    swDisabled.addEventListener("hp-change", () => {
      addLog("Esto no debería ejecutarse (switch deshabilitado)");
    });
  }
}
