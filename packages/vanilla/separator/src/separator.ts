import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";
import { SeparatorOrientation } from "./types";

@customElement("hp-separator")
export class HeadlessSeparator extends HeadlessElement {
  @property({ type: String, reflect: true })
  get orientation(): SeparatorOrientation {
    return this._orientation;
  }
  set orientation(val: SeparatorOrientation) {
    this._orientation = val === "vertical" ? "vertical" : "horizontal";
    this.setAttribute("orientation", this._orientation);
    if (this.isConnected) this._sync();
  }
  private _orientation: SeparatorOrientation = "horizontal";

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "separator");
    if (!this.hasAttribute("role")) this.setAttribute("role", "separator");
    this._sync();
  }

  // Call when orientation changes from JS
  setOrientation(value: SeparatorOrientation) {
    this.orientation = value;
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (name === "orientation" && old !== next && this.isConnected) {
      this._orientation = next === "vertical" ? "vertical" : "horizontal";
      this._sync();
    }
  }

  private _sync() {
    this.setAttribute("aria-orientation", this.orientation);
  }
}
