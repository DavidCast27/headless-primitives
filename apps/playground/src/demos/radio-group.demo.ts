import { ComponentDemo } from "../types";
import "@headless-primitives/radio-group";
import "./radio-group.css";

export const radioGroupDemo: ComponentDemo = {
  title: "Radio Group primitive",
  description: "Grupo de botones de opción única con navegación por teclado (roving tabindex).",
  html: `
    <div class="demo-radio-group-container">
      <section>
        <h3>Vertical (Default)</h3>
        <hp-radio-group value="r1" id="group-1">
          <div class="demo-radio-item">
            <hp-radio value="r1" id="r1-1" class="demo-radio"></hp-radio>
            <hp-label for="r1-1">Option One</hp-label>
          </div>
          <div class="demo-radio-item">
            <hp-radio value="r2" id="r1-2" class="demo-radio"></hp-radio>
            <hp-label for="r1-2">Option Two</hp-label>
          </div>
          <div class="demo-radio-item">
            <hp-radio value="r3" id="r1-3" class="demo-radio"></hp-radio>
            <hp-label for="r1-3">Option Three</hp-label>
          </div>
        </hp-radio-group>
      </section>

      <section>
        <h3>Horizontal Orientation</h3>
        <hp-radio-group value="h1" orientation="horizontal" id="group-2">
           <div class="demo-radio-item">
            <hp-radio value="h1" id="r2-1" class="demo-radio"></hp-radio>
            <hp-label for="r2-1">H1</hp-label>
          </div>
          <div class="demo-radio-item">
            <hp-radio value="h2" id="r2-2" class="demo-radio"></hp-radio>
            <hp-label for="r2-2">H2</hp-label>
          </div>
          <div class="demo-radio-item">
            <hp-radio value="h3" id="r2-3" class="demo-radio"></hp-radio>
            <hp-label for="r2-3">H3</hp-label>
          </div>
        </hp-radio-group>
      </section>

      <section>
        <h3>Disabled State</h3>
        <hp-radio-group value="d1" disabled id="group-3">
          <div class="demo-radio-item">
            <hp-radio value="d1" id="r3-1" class="demo-radio"></hp-radio>
            <hp-label for="r3-1">Disabled Checked</hp-label>
          </div>
          <div class="demo-radio-item">
            <hp-radio value="d2" id="r3-2" class="demo-radio"></hp-radio>
            <hp-label for="r3-2">Disabled Unchecked</hp-label>
          </div>
        </hp-radio-group>
      </section>
    </div>
  `,
  init: () => {
    const groups = document.querySelectorAll("hp-radio-group");
    groups.forEach((group) => {
      group.addEventListener("hp-change", (e: any) => {
        console.log(`Radio Group ${group.id} changed to:`, e.detail.value);
      });
    });
  },
};
