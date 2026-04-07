import "@headless-primitives/utils/base.css";
import "./style.css";
import baseStylesUrl from "./hp-base-styles.css?url";

// Primitives registration
import "@headless-primitives/accordion";
import "@headless-primitives/avatar";
import "@headless-primitives/button";
import "@headless-primitives/checkbox";
import "@headless-primitives/collapsible";
import "@headless-primitives/dialog";
import "@headless-primitives/drawer";
import "@headless-primitives/field";
import "@headless-primitives/label";
import "@headless-primitives/popover";
import "@headless-primitives/progress";
import "@headless-primitives/radio-group";
import "@headless-primitives/select";
import "@headless-primitives/separator";
import "@headless-primitives/switch";
import "@headless-primitives/tabs";
import "@headless-primitives/toast";
import "@headless-primitives/toggle-group";
import "@headless-primitives/tooltip";

import { Shell } from "./components/Shell";
import { ComponentDemo } from "./types";

// Import modular demos
import { accordionDemo } from "./demos/accordion.demo";
import { alertDialogDemo } from "./demos/alert-dialog.demo";
import { avatarDemo } from "./demos/avatar.demo";
import { buttonDemo } from "./demos/button.demo";
import { checkboxDemo } from "./demos/checkbox.demo";
import { collapsibleDemo } from "./demos/collapsible.demo";
import { dialogDemo } from "./demos/dialog.demo";
import { drawerDemo } from "./demos/drawer.demo";
import { fieldDemo } from "./demos/field.demo";
import { labelDemo } from "./demos/label.demo";
import { popoverDemo } from "./demos/popover.demo";
import { progressDemo } from "./demos/progress.demo";
import { radioGroupDemo } from "./demos/radio-group.demo";
import { selectDemo } from "./demos/select.demo";
import { separatorDemo } from "./demos/separator.demo";
import { switchDemo } from "./demos/switch.demo";
import { tabsDemo } from "./demos/tabs.demo";
import { toastDemo } from "./demos/toast.demo";
import { toggleGroupDemo } from "./demos/toggle-group.demo";
import { tooltipDemo } from "./demos/tooltip.demo";

// --- Route Registry ---
const ROUTES: Record<string, ComponentDemo> = {
  accordion: accordionDemo,
  "alert-dialog": alertDialogDemo,
  avatar: avatarDemo,
  button: buttonDemo,
  checkbox: checkboxDemo,
  collapsible: collapsibleDemo,
  dialog: dialogDemo,
  drawer: drawerDemo,
  field: fieldDemo,
  label: labelDemo,
  popover: popoverDemo,
  progress: progressDemo,
  "radio-group": radioGroupDemo,
  select: selectDemo,
  separator: separatorDemo,
  switch: switchDemo,
  tabs: tabsDemo,
  toast: toastDemo,
  "toggle-group": toggleGroupDemo,
  tooltip: tooltipDemo,
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
  const initialComp = params.get("comp") || "accordion";

  const initialBtn = document.querySelector(`[data-comp="${initialComp}"]`) as HTMLButtonElement;
  if (initialBtn) initialBtn.click();
}

// --- Styles Toggle (Req 17) ---
function initStylesToggle() {
  const toggleBtn = document.getElementById("styles-toggle") as HTMLButtonElement | null;
  if (!toggleBtn) return;

  let stylesLink: HTMLLinkElement | null = null;
  let enabled = false;

  toggleBtn.addEventListener("click", () => {
    enabled = !enabled;
    toggleBtn.setAttribute("aria-pressed", String(enabled));
    toggleBtn.classList.toggle("active", enabled);

    if (enabled) {
      if (!stylesLink) {
        stylesLink = document.createElement("link");
        stylesLink.id = "hp-base-styles-link";
        stylesLink.rel = "stylesheet";
        stylesLink.href = baseStylesUrl;
        document.head.appendChild(stylesLink);
      } else {
        stylesLink.disabled = false;
      }
    } else {
      if (stylesLink) stylesLink.disabled = true;
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initApp();
  initStylesToggle();
});
