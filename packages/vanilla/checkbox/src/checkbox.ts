import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";
import { CheckedState } from "./types";

@customElement("hp-checkbox")
export class HeadlessCheckbox extends HeadlessElement {
  // Use manual getter/setter — @property with boolean default causes type issues with "mixed"
  private _checked: CheckedState = false;
  get checked(): CheckedState {
    return this._checked;
  }
  set checked(val: CheckedState) {
    this._checked = val;
    this._sync();
  }

  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "checkbox");
    if (!this.hasAttribute("role")) this.setAttribute("role", "checkbox");
    // Read initial checked from attribute
    const attr = this.getAttribute("checked");
    if (attr === "mixed") this._checked = "mixed";
    else if (attr !== null) this._checked = true;
    if (!this.disabled) this.setAttribute("tabindex", "0");
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
    this._sync();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._handleClick);
    this.removeEventListener("keydown", this._handleKeyDown);
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("disabled") || changed.has("required")) this._sync();
  }

  toggle() {
    if (this.disabled) return;
    this.checked = this._checked === "mixed" ? true : !this._checked;
    this.emit("change", { checked: this._checked });
  }

  private _sync() {
    this.setAttribute("aria-checked", String(this._checked));
    this.setAttribute(
      "data-state",
      this._checked === "mixed" ? "mixed" : this._checked ? "checked" : "unchecked",
    );
    if (this.disabled) {
      this.setAttribute("aria-disabled", "true");
      this.removeAttribute("tabindex");
    } else {
      this.removeAttribute("aria-disabled");
      this.setAttribute("tabindex", "0");
    }
    if (this.required) {
      this.setAttribute("aria-required", "true");
    } else {
      this.removeAttribute("aria-required");
    }
  }

  private _handleClick = (e: MouseEvent) => {
    e.preventDefault();
    this.toggle();
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    if (e.key === " ") {
      e.preventDefault();
      this.toggle();
    }
  };
}
