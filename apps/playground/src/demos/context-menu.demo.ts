import { ComponentDemo } from "../types";
import "./context-menu.css";

export const contextMenuDemo: ComponentDemo = {
  title: "Context Menu primitive",
  description:
    "WAI-ARIA Menu activado por clic derecho, con navegación por teclado, separadores y labels de grupo.",
  html: `
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 500px;">
      <!-- Basic context menu -->
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">
          Área con menú contextual
        </label>
        <hp-context-menu id="ctx-menu" class="demo-context-menu">
          <hp-context-menu-trigger class="demo-cm-trigger">
            <div class="demo-cm-trigger-area">
              <span style="font-size: 1.5rem;">🖱️</span>
              <span>Haz clic derecho aquí</span>
              <span style="font-size: 0.75rem; opacity: 0.6;">(o Shift+F10)</span>
            </div>
          </hp-context-menu-trigger>
          <hp-context-menu-content class="demo-cm-content">
            <hp-context-menu-label>Edit</hp-context-menu-label>
            <hp-context-menu-item value="cut">✂️ Cut</hp-context-menu-item>
            <hp-context-menu-item value="copy">📋 Copy</hp-context-menu-item>
            <hp-context-menu-item value="paste">📌 Paste</hp-context-menu-item>
            <hp-context-menu-separator></hp-context-menu-separator>
            <hp-context-menu-label>Danger Zone</hp-context-menu-label>
            <hp-context-menu-item value="delete">🗑️ Delete</hp-context-menu-item>
            <hp-context-menu-item value="archive" disabled>📦 Archive (disabled)</hp-context-menu-item>
          </hp-context-menu-content>
        </hp-context-menu>
      </div>

      <!-- Disabled context menu -->
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">
          Área deshabilitada
        </label>
        <hp-context-menu class="demo-context-menu" disabled>
          <hp-context-menu-trigger class="demo-cm-trigger">
            <div class="demo-cm-trigger-area demo-cm-trigger-area--disabled">
              <span>Menú contextual deshabilitado</span>
            </div>
          </hp-context-menu-trigger>
          <hp-context-menu-content class="demo-cm-content">
            <hp-context-menu-item value="noop">Nothing</hp-context-menu-item>
          </hp-context-menu-content>
        </hp-context-menu>
      </div>

      <!-- Event log -->
      <div style="padding: 1rem; background: #f5f5f5; border-radius: 6px; font-family: monospace; font-size: 0.875rem;">
        <div style="font-weight: 600; margin-bottom: 0.5rem;">Event Log:</div>
        <div id="cm-event-log" style="max-height: 200px; overflow-y: auto; white-space: pre-wrap; word-break: break-word; color: #333;">
          (events will appear here)
        </div>
      </div>
    </div>
  `,
  init: () => {
    const menu = document.getElementById("ctx-menu") as any;
    const eventLog = document.getElementById("cm-event-log")!;
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
        logEvent("Context menu opened");
      });
      menu.addEventListener("hp-close", () => {
        logEvent("Context menu closed");
      });
    }

    logEvent("Demo initialized. Right-click the area above!");
  },
};
