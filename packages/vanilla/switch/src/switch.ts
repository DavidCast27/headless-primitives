import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-switch")
export class HeadlessSwitch extends HeadlessElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "switch");
    if (!this.hasAttribute("role")) this.setAttribute("role", "switch");
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

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (["checked", "disabled", "required"].includes(name) && old !== next && this.isConnected) {
      this._sync();
    }
  }

  toggle() {
    if (this.hasAttribute("disabled")) return;
    const newChecked = !this.hasAttribute("checked");
    if (newChecked) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
    this._sync();
    this.emit("change", { checked: newChecked });
  }

  private _sync() {
    const checked = this.hasAttribute("checked");
    const disabled = this.hasAttribute("disabled");
    const required = this.hasAttribute("required");
    this.setAttribute("aria-checked", String(checked));
    this.setAttribute("data-state", checked ? "checked" : "unchecked");
    this.setAttribute("aria-disabled", String(disabled));
    if (disabled) {
      this.removeAttribute("tabindex");
    } else {
      this.setAttribute("tabindex", "0");
    }
    if (required) {
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
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      this.toggle();
    }
  };
}
