import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-button")
export class HeadlessButton extends HeadlessElement {
  @property({ type: Boolean, reflect: true })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(val: boolean) {
    const old = this._disabled;
    this._disabled = val;
    this.requestUpdate("disabled", old);
    if (this.isConnected) this._sync();
  }

  private _disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "button");
    if (!this.hasAttribute("role")) this.setAttribute("role", "button");
    this.addEventListener("click", this._onClick);
    this.addEventListener("keydown", this._onKeyDown);
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  // Handle direct setAttribute calls (HTML attribute → property reflection)
  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (name === "disabled" && old !== next && this.isConnected) this._sync();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._onClick);
    this.removeEventListener("keydown", this._onKeyDown);
  }

  private _sync() {
    if (this._disabled) {
      this.removeAttribute("tabindex");
      this.setAttribute("aria-disabled", "true");
    } else {
      this.setAttribute("tabindex", "0");
      this.removeAttribute("aria-disabled");
    }
  }

  private _onClick = (e: MouseEvent) => {
    if (this._disabled) {
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
