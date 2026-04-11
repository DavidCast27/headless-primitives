import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";
import { ARIA_CONTROL_SELECTOR, NATIVE_CONTROL_SELECTOR } from "./types";

@customElement("hp-fieldset")
export class HeadlessFieldset extends HeadlessElement {
  private _disabled = false;
  private _previousDisabled = false;

  @property({ type: Boolean, reflect: true })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(v: boolean) {
    this._disabled = v;
    this._sync();
  }

  get baseId(): string {
    return `${this.hpId}-fieldset`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "fieldset");
    if (!this.hasAttribute("role")) this.setAttribute("role", "group");
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private _sync() {
    if (this._disabled) {
      this.setAttribute("aria-disabled", "true");
      this.setAttribute("data-state", "disabled");

      // Native controls
      this.querySelectorAll<HTMLElement>(NATIVE_CONTROL_SELECTOR).forEach((el) => {
        if (el.hasAttribute("disabled")) {
          el.setAttribute("data-hp-was-disabled", "");
        }
        el.setAttribute("disabled", "");
      });

      // ARIA controls
      this.querySelectorAll<HTMLElement>(ARIA_CONTROL_SELECTOR).forEach((el) => {
        if (el.getAttribute("aria-disabled") === "true") {
          el.setAttribute("data-hp-was-disabled", "");
        }
        el.setAttribute("aria-disabled", "true");
      });
    } else {
      this.removeAttribute("aria-disabled");
      this.setAttribute("data-state", "enabled");

      // Only restore controls when transitioning FROM disabled (not on initial sync)
      if (this._previousDisabled) {
        // Native controls
        this.querySelectorAll<HTMLElement>(NATIVE_CONTROL_SELECTOR).forEach((el) => {
          if (!el.hasAttribute("data-hp-was-disabled")) {
            el.removeAttribute("disabled");
          }
        });

        // ARIA controls
        this.querySelectorAll<HTMLElement>(ARIA_CONTROL_SELECTOR).forEach((el) => {
          if (!el.hasAttribute("data-hp-was-disabled")) {
            el.removeAttribute("aria-disabled");
          }
        });

        // Clean up marker from all descendants
        const allControls = `${NATIVE_CONTROL_SELECTOR}, ${ARIA_CONTROL_SELECTOR}`;
        this.querySelectorAll<HTMLElement>(allControls).forEach((el) => {
          el.removeAttribute("data-hp-was-disabled");
        });
      }
    }

    // Emit events only on transition
    if (!this._previousDisabled && this._disabled) {
      this.emit("disable");
    } else if (this._previousDisabled && !this._disabled) {
      this.emit("enable");
    }

    this._previousDisabled = this._disabled;
  }
}
