import { HeadlessElement, customElement } from "@headless-primitives/utils";

@customElement("hp-tree-group")
export class HeadlessTreeGroup extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "tree-group");
    if (!this.hasAttribute("role")) this.setAttribute("role", "group");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
