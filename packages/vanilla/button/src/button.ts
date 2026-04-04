import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-button")
export class HeadlessButton extends HeadlessElement {
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "button");
    if (!this.hasAttribute("role")) this.setAttribute("role", "button");
    this.addEventListener("click", this._onClick);
    this.addEventListener("keydown", this._onKeyDown);
    this._sync();
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("disabled")) this._sync();
  }

  // Also handle direct setAttribute calls
  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (name === "disabled") this._sync();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._onClick);
    this.removeEventListener("keydown", this._onKeyDown);
  }

  private _sync() {
    if (this.disabled) {
      this.removeAttribute("tabindex");
      this.setAttribute("aria-disabled", "true");
    } else {
      this.setAttribute("tabindex", "0");
      this.removeAttribute("aria-disabled");
    }
  }

  private _onClick = (e: MouseEvent) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this._togglePressed();
  };

  private _onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  };

  private _togglePressed() {
    if (!this.hasAttribute("aria-pressed")) return;
    const next = this.getAttribute("aria-pressed") !== "true";
    this.setAttribute("aria-pressed", String(next));
    this.setAttribute("data-state", next ? "on" : "off");
    this.emit("change", { pressed: next });
  }
}
