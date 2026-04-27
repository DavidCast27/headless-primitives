import { ComponentDemo } from "../types";
import "../styles/select.css";

export const selectDemo: ComponentDemo = {
  title: "Select primitive",
  description:
    "WAI-ARIA Select-only Combobox con popup anchored y navegación por teclado completa.",
  html: `
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 500px;">
      <!-- Basic select -->
      <div>
        <label for="fruit-select" style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">
          Elige una fruta
        </label>
        <hp-select id="fruit-select" class="demo-select" placeholder="Selecciona..." name="fruit">
          <hp-select-trigger class="demo-trigger">
            <hp-select-value class="demo-value"></hp-select-value>
            <span class="demo-icon">▼</span>
          </hp-select-trigger>
          <hp-select-content class="demo-content">
            <hp-select-item value="apple">🍎 Apple</hp-select-item>
            <hp-select-item value="banana">🍌 Banana</hp-select-item>
            <hp-select-item value="cherry">🍒 Cherry</hp-select-item>
            <hp-select-item value="date" disabled>📅 Date (disabled)</hp-select-item>
            <hp-select-item value="elderberry">🫐 Elderberry</hp-select-item>
            <hp-select-item value="fig">🟤 Fig</hp-select-item>
            <hp-select-item value="grape">🍇 Grape</hp-select-item>
          </hp-select-content>
        </hp-select>
      </div>

      <!-- Disabled select -->
      <div>
        <label for="color-select" style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">
          Color (Disabled)
        </label>
        <hp-select id="color-select" class="demo-select" disabled>
          <hp-select-trigger class="demo-trigger">
            <hp-select-value class="demo-value"></hp-select-value>
            <span class="demo-icon">▼</span>
          </hp-select-trigger>
          <hp-select-content class="demo-content">
            <hp-select-item value="red">Red</hp-select-item>
            <hp-select-item value="green">Green</hp-select-item>
            <hp-select-item value="blue">Blue</hp-select-item>
          </hp-select-content>
        </hp-select>
      </div>

      <!-- Select with initial value -->
      <div>
        <label for="size-select" style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">
          Tamaño (pre-selected)
        </label>
        <hp-select id="size-select" class="demo-select" value="medium" name="size">
          <hp-select-trigger class="demo-trigger">
            <hp-select-value class="demo-value"></hp-select-value>
            <span class="demo-icon">▼</span>
          </hp-select-trigger>
          <hp-select-content class="demo-content">
            <hp-select-item value="small">Small</hp-select-item>
            <hp-select-item value="medium">Medium</hp-select-item>
            <hp-select-item value="large">Large</hp-select-item>
            <hp-select-item value="xlarge">Extra Large</hp-select-item>
          </hp-select-content>
        </hp-select>
      </div>

      <!-- Event log -->
      <div style="padding: 1rem; background: #f5f5f5; border-radius: 6px; font-family: monospace; font-size: 0.875rem;">
        <div style="font-weight: 600; margin-bottom: 0.5rem;">Event Log:</div>
        <div id="event-log" style="max-height: 200px; overflow-y: auto; white-space: pre-wrap; word-break: break-word; color: #333;">
          (events will appear here)
        </div>
      </div>
    </div>
  `,
  init: () => {
    const fruitSelect = document.getElementById("fruit-select") as any;
    const sizeSelect = document.getElementById("size-select") as any;
    const eventLog = document.getElementById("event-log")!;
    let logCount = 0;

    function logEvent(msg: string) {
      logCount++;
      const timestamp = new Date().toLocaleTimeString();
      eventLog.textContent = `[${logCount}] ${timestamp}: ${msg}\n${eventLog.textContent}`;
      if (logCount > 20) {
        eventLog.textContent = eventLog.textContent.split("\n").slice(0, 20).join("\n");
      }
    }

    // Fruit select events
    if (fruitSelect) {
      fruitSelect.addEventListener("hp-change", (e: any) => {
        logEvent(`Fruit changed: value="${e.detail.value}" label="${e.detail.label}"`);
      });
      fruitSelect.addEventListener("hp-highlight", (e: any) => {
        logEvent(`Fruit highlighted: value="${e.detail.value}"`);
      });
      fruitSelect.addEventListener("hp-open", () => {
        logEvent("Fruit select opened");
      });
      fruitSelect.addEventListener("hp-close", () => {
        logEvent("Fruit select closed");
      });
    }

    // Size select events
    if (sizeSelect) {
      sizeSelect.addEventListener("hp-change", (e: any) => {
        logEvent(`Size changed: value="${e.detail.value}"`);
      });
    }

    logEvent("Demo initialized. Try selecting items!");
  },
};
