import { ComponentDemo } from "../types";
import "./combobox.css";

export const comboboxDemo: ComponentDemo = {
  title: "Combobox primitive",
  description:
    "WAI-ARIA Combobox con filtrado/autocomplete, popup anchored y navegación por teclado completa.",
  html: `
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 500px;">
      <!-- Basic combobox -->
      <div>
        <label for="fruit-combobox" style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">
          Busca una fruta
        </label>
        <hp-combobox id="fruit-combobox" class="demo-combobox" placeholder="Escribe para filtrar...">
          <hp-combobox-input class="demo-input"></hp-combobox-input>
          <hp-combobox-content class="demo-content">
            <hp-combobox-option value="apple">🍎 Apple</hp-combobox-option>
            <hp-combobox-option value="banana">🍌 Banana</hp-combobox-option>
            <hp-combobox-option value="cherry">🍒 Cherry</hp-combobox-option>
            <hp-combobox-option value="date" disabled>📅 Date (disabled)</hp-combobox-option>
            <hp-combobox-option value="elderberry">🫐 Elderberry</hp-combobox-option>
            <hp-combobox-option value="fig">🟤 Fig</hp-combobox-option>
            <hp-combobox-option value="grape">🍇 Grape</hp-combobox-option>
          </hp-combobox-content>
        </hp-combobox>
      </div>

      <!-- Disabled combobox -->
      <div>
        <label for="color-combobox" style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">
          Color (Disabled)
        </label>
        <hp-combobox id="color-combobox" class="demo-combobox" disabled>
          <hp-combobox-input class="demo-input"></hp-combobox-input>
          <hp-combobox-content class="demo-content">
            <hp-combobox-option value="red">Red</hp-combobox-option>
            <hp-combobox-option value="green">Green</hp-combobox-option>
            <hp-combobox-option value="blue">Blue</hp-combobox-option>
          </hp-combobox-content>
        </hp-combobox>
      </div>

      <!-- Combobox with initial value -->
      <div>
        <label for="size-combobox" style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">
          Tamaño (pre-selected)
        </label>
        <hp-combobox id="size-combobox" class="demo-combobox" value="medium">
          <hp-combobox-input class="demo-input"></hp-combobox-input>
          <hp-combobox-content class="demo-content">
            <hp-combobox-option value="small">Small</hp-combobox-option>
            <hp-combobox-option value="medium">Medium</hp-combobox-option>
            <hp-combobox-option value="large">Large</hp-combobox-option>
            <hp-combobox-option value="xl">Extra Large</hp-combobox-option>
          </hp-combobox-content>
        </hp-combobox>
      </div>
    </div>
  `,
  init: () => {
    // Programmatic API examples
    const combobox = document.querySelector("hp-combobox#fruit-combobox");

    // Listen for changes
    combobox?.addEventListener("hp-change", (_event) => {
      // Handle change
    });

    // Listen for highlights
    combobox?.addEventListener("hp-highlight", (_event) => {
      // Handle highlight
    });
  },
};
