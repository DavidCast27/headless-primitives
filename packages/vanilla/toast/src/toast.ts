/**
 * Headless Toast / Alert Primitive
 *
 * A simple, accessible notification component that auto-dismisses.
 * Supports role="alert" for screen readers and automatic cleanup.
 */
import { HeadlessElement } from "@headless-primitives/utils";

export interface ToastOptions {
  duration?: number; // ms before auto-dismiss (0 = manual dismiss only)
  id?: string;
}

export class HeadlessToast extends HeadlessElement {
  private _duration: number = 3000;
  private _closeTimeout: number | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "toast");
    this.setAttribute("role", "alert");
    this.setAttribute("aria-live", "polite");
    this.setAttribute("aria-atomic", "true");

    const closeBtn = this.querySelector("hp-toast-close");
    if (closeBtn) closeBtn.addEventListener("click", () => this._close());

    const duration = this.getAttribute("data-duration");
    if (duration && !isNaN(Number(duration))) this._duration = Number(duration);
    if (this._duration > 0) {
      this._closeTimeout = window.setTimeout(() => this._close(), this._duration);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Clean up timeout
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

    this.style.animation = "slideOut 0.2s ease-out forwards";

    setTimeout(() => {
      this.emit("dismiss");
      this.remove();
    }, 200);
  };

  /**
   * Public API: Programmatically close the toast
   */
  close() {
    this._close();
  }

  /**
   * Public API: Get remaining time until auto-dismiss
   */
  getRemainingTime(): number | null {
    if (this._closeTimeout === null) return null;
    return this._duration;
  }
}

/**
 * Toast Container - Holds multiple toasts and manages their layout
 */
export class HeadlessToastContainer extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "toast-container");
    this.style.position = "fixed";
    this.style.display = "flex";
    this.style.flexDirection = "column";
    this.style.gap = "0.5rem";
    this.style.pointerEvents = "none";
    this.style.zIndex = "var(--hp-z-index-overlay-content, 1100)";

    const position = this.getAttribute("data-position") || "top-right";
    this._applyPosition(position);
  }

  private _applyPosition(position: string) {
    this.style.padding = "1rem";

    switch (position) {
      case "top-left":
        this.style.top = "0";
        this.style.left = "0";
        this.style.alignItems = "flex-start";
        break;
      case "top-center":
        this.style.top = "0";
        this.style.left = "50%";
        this.style.transform = "translateX(-50%)";
        this.style.alignItems = "center";
        break;
      case "top-right":
        this.style.top = "0";
        this.style.right = "0";
        this.style.alignItems = "flex-end";
        break;
      case "bottom-left":
        this.style.bottom = "0";
        this.style.left = "0";
        this.style.alignItems = "flex-start";
        break;
      case "bottom-center":
        this.style.bottom = "0";
        this.style.left = "50%";
        this.style.transform = "translateX(-50%)";
        this.style.alignItems = "center";
        break;
      case "bottom-right":
        this.style.bottom = "0";
        this.style.right = "0";
        this.style.alignItems = "flex-end";
        break;
    }
  }

  /**
   * Public API: Add a new toast to the container
   */
  addToast(content: string, options?: ToastOptions): HeadlessToast {
    const toast = document.createElement("hp-toast") as HeadlessToast;

    if (options?.id) {
      toast.id = options.id;
    }

    if (options?.duration !== undefined) {
      toast.setAttribute("data-duration", String(options.duration));
    }

    toast.textContent = content;
    toast.style.pointerEvents = "auto";

    this.appendChild(toast);
    return toast;
  }

  /**
   * Public API: Clear all toasts
   */
  clearAll() {
    const toasts = this.querySelectorAll("hp-toast");
    toasts.forEach((toast: Element) => {
      (toast as any).close?.();
    });
  }
}

// Define animation keyframes (global style injection)
if (typeof window !== "undefined" && !document.querySelector("style[data-hp-toast-animations]")) {
  const style = document.createElement("style");
  style.setAttribute("data-hp-toast-animations", "");
  style.textContent = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideOut {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(100%);
      }
    }
  `;
  document.head.appendChild(style);
}
