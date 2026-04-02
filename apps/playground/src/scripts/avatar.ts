import { addLog } from "./utils";

export function initAvatarDemo() {
  const avatars = document.querySelectorAll("hp-avatar");

  avatars.forEach((avatar) => {
    avatar.addEventListener("hp-state-change", (e: any) => {
      const state = e.detail.state;
      const id = avatar.id || "avatar";
      addLog(`Avatar "${id}" cambió a estado: ${state}`);
    });
  });

  // Botón para recargar una imagen y ver el estado de carga
  const reloadBtn = document.querySelector("#reload-avatar");
  const dynamicAvatar = document.querySelector("#dynamic-avatar hp-avatar-image");

  if (reloadBtn && dynamicAvatar) {
    reloadBtn.addEventListener("click", () => {
      const currentSrc = dynamicAvatar.getAttribute("src");
      const newSrc = currentSrc?.includes("?")
        ? currentSrc.split("?")[0] + "?" + Date.now()
        : currentSrc + "?" + Date.now();

      dynamicAvatar.setAttribute("src", newSrc);
      addLog("Recargando imagen del avatar dinámico...");
    });
  }

  console.log("✔ Avatar demo initialized");
}
