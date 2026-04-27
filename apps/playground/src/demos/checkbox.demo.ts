import { ComponentDemo } from "../types";
import "@headless-primitives/checkbox";
import "../styles/checkbox.css";

export const checkboxDemo: ComponentDemo = {
  title: "Checkbox primitive",
  description: "Control de selección múltiple con soporte para estados binarios e indeterminados.",
  html: `
    <div class="demo-checkbox-group">
      <section>
        <h3>Standard Checkbox</h3>
        <div class="demo-checkbox-item">
          <hp-checkbox id="c1"></hp-checkbox>
          <label for="c1">Accept terms and conditions</label>
        </div>
      </section>

      <section>
        <h3>Checked by Default</h3>
        <div class="demo-checkbox-item">
          <hp-checkbox id="c2" checked></hp-checkbox>
          <label for="c2">Subscribe to newsletter</label>
        </div>
      </section>

      <section>
        <h3>Mixed State (Indeterminate)</h3>
        <div class="demo-checkbox-item">
          <hp-checkbox id="c3" checked="mixed"></hp-checkbox>
          <label for="c3">Select all items</label>
        </div>
      </section>

      <section>
        <h3>Disabled</h3>
        <div class="demo-checkbox-item">
          <hp-checkbox id="c4" disabled></hp-checkbox>
          <label for="c4">Hidden option (Disabled)</label>
        </div>
      </section>
    </div>
  `,
  init: () => {
    const checkboxes = document.querySelectorAll("hp-checkbox");
    checkboxes.forEach((cb) => {
      cb.addEventListener("hp-change", (_e: any) => {
        // Handle change
      });
    });
  },
};
