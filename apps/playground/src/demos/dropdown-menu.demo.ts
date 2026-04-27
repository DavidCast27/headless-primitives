import { ComponentDemo } from "../types";
import "../styles/dropdown-menu.css";

export const dropdownMenuDemo: ComponentDemo = {
  title: "Dropdown Menu primitive",
  description:
    "WAI-ARIA Menu Button con popup anclado, navegación por teclado, separadores y labels de grupo.",
  html: `
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 500px;">
      <!-- Basic dropdown menu -->
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">
          Menú de acciones
        </label>
        <hp-dropdown-menu id="actions-menu" class="demo-dropdown-menu">
          <hp-dropdown-menu-trigger class="demo-dm-trigger">
            Actions ▾
          </hp-dropdown-menu-trigger>
          <hp-dropdown-menu-content class="demo-dm-content">
            <hp-dropdown-menu-label>Edit</hp-dropdown-menu-label>
            <hp-dropdown-menu-item value="cut">✂️ Cut</hp-dropdown-menu-item>
            <hp-dropdown-menu-item value="copy">📋 Copy</hp-dropdown-menu-item>
            <hp-dropdown-menu-item value="paste">📌 Paste</hp-dropdown-menu-item>
            <hp-dropdown-menu-separator></hp-dropdown-menu-separator>
            <hp-dropdown-menu-label>Danger Zone</hp-dropdown-menu-label>
            <hp-dropdown-menu-item value="delete">🗑️ Delete</hp-dropdown-menu-item>
            <hp-dropdown-menu-item value="archive" disabled>📦 Archive (disabled)</hp-dropdown-menu-item>
          </hp-dropdown-menu-content>
        </hp-dropdown-menu>
      </div>

      <!-- Disabled dropdown menu -->
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">
          Menú deshabilitado
        </label>
        <hp-dropdown-menu class="demo-dropdown-menu" disabled>
          <hp-dropdown-menu-trigger class="demo-dm-trigger">
            Disabled ▾
          </hp-dropdown-menu-trigger>
          <hp-dropdown-menu-content class="demo-dm-content">
            <hp-dropdown-menu-item value="noop">Nothing</hp-dropdown-menu-item>
          </hp-dropdown-menu-content>
        </hp-dropdown-menu>
      </div>

      <!-- Event log -->
      <div style="padding: 1rem; background: #f5f5f5; border-radius: 6px; font-family: monospace; font-size: 0.875rem;">
        <div style="font-weight: 600; margin-bottom: 0.5rem;">Event Log:</div>
        <div id="dm-event-log" style="max-height: 200px; overflow-y: auto; white-space: pre-wrap; word-break: break-word; color: #333;">
          (events will appear here)
        </div>
      </div>
    </div>
  `,
  init: () => {
    const menu = document.getElementById("actions-menu") as any;
    const eventLog = document.getElementById("dm-event-log")!;
    let logCount = 0;

    function logEvent(msg: string) {
      logCount++;
      const timestamp = new Date().toLocaleTimeString();
      eventLog.textContent = `[${logCount}] ${timestamp}: ${msg}\n${eventLog.textContent}`;
      if (logCount > 20) {
        eventLog.textContent = eventLog.textContent.split("\n").slice(0, 20).join("\n");
      }
    }

    if (menu) {
      menu.addEventListener("hp-select", (e: any) => {
        logEvent(`Item selected: value="${e.detail.value}" label="${e.detail.label}"`);
      });
      menu.addEventListener("hp-highlight", (e: any) => {
        logEvent(`Item highlighted: value="${e.detail.value}"`);
      });
      menu.addEventListener("hp-open", () => {
        logEvent("Menu opened");
      });
      menu.addEventListener("hp-close", () => {
        logEvent("Menu closed");
      });
    }

    logEvent("Demo initialized. Try opening the menu!");
  },
};
