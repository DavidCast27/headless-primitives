import { ComponentDemo } from "../types";
import "./avatar.css";

export const avatarDemo: ComponentDemo = {
  title: "Avatar primitive",
  description: "Gestión impecable de imágenes de usuario con fallbacks.",
  html: `
    <div style="display: flex; gap: 3rem; align-items: center; justify-content: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
        <span style="font-size: 11px; text-transform: uppercase; color: var(--text-secondary);">Success State</span>
        <hp-avatar id="av-1" class="avatar avatar-lg">
          <hp-avatar-image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop" alt="User Image"></hp-avatar-image>
          <hp-avatar-fallback class="fallback">JD</hp-avatar-fallback>
        </hp-avatar>
      </div>
      
      <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
        <span style="font-size: 11px; text-transform: uppercase; color: var(--text-secondary);">Error Fallback</span>
        <hp-avatar id="av-2" class="avatar avatar-lg">
          <hp-avatar-image src="broken.jpg" alt="Broken"></hp-avatar-image>
          <hp-avatar-fallback class="fallback">ER</hp-avatar-fallback>
        </hp-avatar>
      </div>

      <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
        <span style="font-size: 11px; text-transform: uppercase; color: var(--text-secondary);">Interactive Reload</span>
        <hp-avatar id="av-dynamic" class="avatar avatar-lg">
          <hp-avatar-image id="av-img-dynamic" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop" alt="User Image"></hp-avatar-image>
          <hp-avatar-fallback class="fallback">UN</hp-avatar-fallback>
        </hp-avatar>
        <button id="btn-av-reload" class="btn btn-secondary" style="font-size: 10px; padding: 4px 8px;">Reload Image</button>
      </div>
    </div>
  `,
  init: () => {
    const btnReload = document.getElementById("btn-av-reload");
    const imgDynamic = document.getElementById("av-img-dynamic") as HTMLImageElement;

    btnReload?.addEventListener("click", () => {
      const currentSrc = imgDynamic.getAttribute("src") || "";
      const baseUrl = currentSrc.split("?")[0];
      imgDynamic.setAttribute("src", `${baseUrl}?t=${Date.now()}`);
      console.log("Avatar image reloading...");
    });
  },
};
