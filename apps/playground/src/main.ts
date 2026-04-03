import "./style.css";

// Primitives registration
import "@headless-primitives/button";
import "@headless-primitives/switch";
import "@headless-primitives/separator";
import "@headless-primitives/progress";
import "@headless-primitives/radio-group";
import "@headless-primitives/label";
import "@headless-primitives/avatar";
import "@headless-primitives/checkbox";
import "@headless-primitives/collapsible";
import "@headless-primitives/field";
import "@headless-primitives/toggle-group";

import { Shell } from "./components/Shell";
import { ComponentDemo } from "./types";

// Import modular demos
import { buttonDemo } from "./demos/button.demo";
import { switchDemo } from "./demos/switch.demo";
import { checkboxDemo } from "./demos/checkbox.demo";
import { separatorDemo } from "./demos/separator.demo";
import { progressDemo } from "./demos/progress.demo";
import { radioGroupDemo } from "./demos/radio-group.demo";
import { labelDemo } from "./demos/label.demo";
import { avatarDemo } from "./demos/avatar.demo";
import { fieldDemo } from "./demos/field.demo";
import { toggleGroupDemo } from "./demos/toggle-group.demo";
import { collapsibleDemo } from "./demos/collapsible.demo";

// --- Route Registry ---
const ROUTES: Record<string, ComponentDemo> = {
  button: buttonDemo,
  switch: switchDemo,
  checkbox: checkboxDemo,
  separator: separatorDemo,
  progress: progressDemo,
  "radio-group": radioGroupDemo,
  label: labelDemo,
  avatar: avatarDemo,
  field: fieldDemo,
  "toggle-group": toggleGroupDemo,
  collapsible: collapsibleDemo,
};

function renderRoute(compId: string) {
  const demo = ROUTES[compId];
  if (demo) {
    Shell.render(demo);
  }
}

// --- Initialization ---
function initApp() {
  const sidebarButtons = document.querySelectorAll<HTMLButtonElement>(".nav-item");

  sidebarButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const comp = btn.getAttribute("data-comp");
      if (comp && ROUTES[comp]) {
        // Update UI state
        sidebarButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Execute dynamic render
        renderRoute(comp);

        // Update URL persistence
        history.pushState({ comp }, "", `?comp=${comp}`);
      }
    });
  });

  // Handle browser back/forward navigation
  window.addEventListener("popstate", (e) => {
    if (e.state?.comp) {
      const btn = document.querySelector(`[data-comp="${e.state.comp}"]`) as HTMLButtonElement;
      if (btn) btn.click();
    }
  });

  // Load initial route from URL or default
  const params = new URLSearchParams(window.location.search);
  const initialComp = params.get("comp") || "button";

  const initialBtn = document.querySelector(`[data-comp="${initialComp}"]`) as HTMLButtonElement;
  if (initialBtn) initialBtn.click();
}

window.addEventListener("DOMContentLoaded", initApp);
