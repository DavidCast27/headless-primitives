/**
 * Headless Toast / Alert Primitive
 *
 * Accessible notification component that auto-dismisses.
 * Migrated to HeadlessElement + @customElement + @property (Req 19).
 * All visual styles live in @headless-primitives/styles/toast.css (Req 14).
 */
import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";
import type { ToastOptions } from "./types";

@customElement("hp-toast")
export class HeadlessToast extends HeadlessElement {
  /** Auto-dismiss duration in ms. 0 = manual dismiss only. */
  @property({ type: Number, attribute: "data-duration" }) duration = 3000;

  private _closeTimeout: number | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "toast");
    this.setAttribute("role", "alert");
    this.setAttribute("aria-live", "polite");
    this.setAttribute("aria-atomic", "true");
    this.setAttribute("data-state", "open");

    const closeBtn = this.querySelector("hp-toast-close");
    if (closeBtn) closeBtn.addEventListener("click", () => this._close());

    if (this.duration > 0) {
      this._closeTimeout = window.setTimeout(() => this._close(), this.duration);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._closeTimeout) {
      clearTimeout(this._closeTimeout);
      this._closeTimeout = null;
    }
  }

  private _close = () => {
    if (this._closeTimeout) {
      clearTimeout(this._closeTimeout);
      this._closeTimeout = null;
    }

    // Trigger CSS exit animation via data-state (Req 14.4)
    this.setAttribute("data-state", "closed");

    // Wait for animation to finish before removing (matches --hp-transition-slow: 200ms)
    setTimeout(() => {
      this.emit("dismiss");
      this.remove();
    }, 200);
  };

  /** Public API: Programmatically close the toast */
  close() {
    this._close();
  }
}

@customElement("hp-toast-container")
export class HeadlessToastContainer extends HeadlessElement {
  /**
   * Position of the container.
   * Values: top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
   * Positioning is handled by CSS in @headless-primitives/styles/toast.css (Req 14.1).
   * This attribute is reflected so CSS attribute selectors can target it.
   */
  @property({ type: String, reflect: true, attribute: "data-position" }) position = "bottom-right";

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "toast-container");
  }

  /** Public API: Add a new toast to the container */
  addToast(content: string, options?: ToastOptions): HeadlessToast {
    const toast = document.createElement("hp-toast") as HeadlessToast;

    if (options?.id) toast.id = options.id;
    if (options?.duration !== undefined) {
      toast.setAttribute("data-duration", String(options.duration));
    }

    toast.textContent = content;
    this.appendChild(toast);
    return toast;
  }

  /** Public API: Clear all toasts */
  clearAll() {
    this.querySelectorAll("hp-toast").forEach((t) => (t as HeadlessToast).close());
  }
}

@customElement("hp-toast-title")
export class HeadlessToastTitle extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "toast-title");
  }
}

@customElement("hp-toast-description")
export class HeadlessToastDescription extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "toast-description");
  }
}

@customElement("hp-toast-close")
export class HeadlessToastClose extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "toast-close");
    if (!this.hasAttribute("role")) this.setAttribute("role", "button");
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
    this.addEventListener("keydown", this._onKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._onKeyDown);
  }

  private _onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  };
}
