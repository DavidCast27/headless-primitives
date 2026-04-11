import { HeadlessElement, customElement } from "@headless-primitives/utils";
import type { HeadlessFieldset } from "./fieldset";

@customElement("hp-fieldset-legend")
export class HeadlessFieldsetLegend extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "fieldset-legend");

    const parent = this.closest("hp-fieldset") as HeadlessFieldset | null;
    if (!parent) return;

    if (!this.hasAttribute("id")) {
      this.id = `${parent.baseId}-legend`;
    }

    if (!parent.hasAttribute("aria-labelledby")) {
      parent.setAttribute("aria-labelledby", this.id);
    }
  }
}
