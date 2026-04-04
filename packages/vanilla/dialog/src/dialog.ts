/**
 * Headless Dialog Primitive
 *
 * Modal overlay with focus trap and scroll lock.
 */
import { FocusTrap } from "@headless-primitives/utils";

export class HeadlessDialog extends HTMLElement {
  private _trigger: HTMLElement | null = null;
  private _content: HTMLElement | null = null;
  private _backdrop: HTMLElement | null = null;
  private _isOpen = false;
  private _focusTrap: FocusTrap | null = null;
  private _isAlert = false; // New: Track if this is an alert dialog

  connectedCallback() {
    this._isAlert = this.hasAttribute("data-alert");
    this._trigger = this.querySelector("hp-dialog-trigger");
    this._content = this.querySelector("hp-dialog-content");
    this._backdrop = this.querySelector("hp-dialog-backdrop");

    if (this._content) {
      this._setupContent();
      this._focusTrap = new FocusTrap(this._content);
      this.addEventListener("hp-close", this._close);
    }
    if (this._backdrop) {
      this._setupBackdrop();
    }
    if (this._trigger && this._content) {
      this._setupTrigger();
    }
  }

  private _setupTrigger() {
    if (!this._trigger) return;

    this._trigger.addEventListener("click", this._open);
  }

  private _setupContent() {
    if (!this._content) return;

    this._content.setAttribute("role", "dialog");
    this._content.setAttribute("aria-modal", "true");
    this._content.style.position = "fixed";
    this._content.style.top = "50%";
    this._content.style.left = "50%";
    this._content.style.transform = "translate(-50%, -50%)";
    this._content.style.visibility = "hidden";
    this._content.style.opacity = "0";
    this._content.style.pointerEvents = "none";
    this._content.style.transition = "opacity 0.2s ease, visibility 0.2s ease";
    this._content.style.zIndex = "9999";
    this._content.addEventListener("keydown", this._handleKeyDown);
  }

  private _setupBackdrop() {
    if (!this._backdrop) return;

    this._backdrop.style.position = "fixed";
    this._backdrop.style.top = "0";
    this._backdrop.style.left = "0";
    this._backdrop.style.right = "0";
    this._backdrop.style.bottom = "0";
    this._backdrop.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    this._backdrop.style.visibility = "hidden";
    this._backdrop.style.opacity = "0";
    this._backdrop.style.transition = "opacity 0.2s ease, visibility 0.2s ease";
    this._backdrop.style.zIndex = "9998";
    
    // Alert dialogs: don't close on backdrop click
    if (!this._isAlert) {
      this._backdrop.addEventListener("click", this._close);
    }
  }

  private _open = () => {
    if (this._isOpen) return;
    this._isOpen = true;

    // Scroll lock — preserve scroll position without layout shift
    this._previousScrollPosition = window.scrollY;
    document.body.style.overflow = "hidden";

    if (this._content) {
      this._content.style.visibility = "visible";
      this._content.style.opacity = "1";
      this._content.style.pointerEvents = "auto";
      this._content.setAttribute("aria-hidden", "false");
    }

    if (this._backdrop) {
      this._backdrop.style.visibility = "visible";
      this._backdrop.style.opacity = "1";
    }

    if (this._trigger && this._content) {
      this._trigger.setAttribute("aria-expanded", "true");
      this._trigger.setAttribute("aria-controls", this._content.id || "");
    }

    this._focusTrap?.activate();

    this.dispatchEvent(
      new CustomEvent("hp-open", {
        bubbles: true,
        composed: true,
      }),
    );
  };

  private _close = () => {
    if (!this._isOpen) return;
    this._isOpen = false;

    // Restore scroll
    document.body.style.overflow = "";

    if (this._content) {
      this._content.style.visibility = "hidden";
      this._content.style.opacity = "0";
      this._content.style.pointerEvents = "none";
      this._content.setAttribute("aria-hidden", "true");
    }

    if (this._backdrop) {
      this._backdrop.style.visibility = "hidden";
      this._backdrop.style.opacity = "0";
    }

    if (this._trigger) {
      this._trigger.setAttribute("aria-expanded", "false");
      this._trigger.removeAttribute("aria-controls");
    }

    this._focusTrap?.deactivate();

    this.dispatchEvent(
      new CustomEvent("hp-close", {
        bubbles: true,
        composed: true,
      }),
    );
  };

  /**
   * Public API: Open the dialog
   */
  open() {
    this._open();
  }

  /**
   * Public API: Close the dialog
   */
  close() {
    this._close();
  }

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      // Alert dialogs: don't close on ESC
      if (this._isAlert) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      this._close();
    }
  };
}

/**
 * Dialog Trigger - The element that opens the dialog.
 */
export class HeadlessDialogTrigger extends HTMLElement {
  connectedCallback() {
    // Ensure it's focusable
    if (!this.hasAttribute("tabindex") && !this.hasAttribute("disabled")) {
      this.setAttribute("tabindex", "0");
    }
  }
}

/**
 * Dialog Content - The modal content with focus trap.
 */
export class HeadlessDialogContent extends HTMLElement {
  connectedCallback() {
    // Generate ID if not provided
    if (!this.id) {
      this.id = `hp-dialog-content-${Math.random().toString(36).slice(2, 9)}`;
    }
  }
}

/**
 * Dialog Backdrop - The overlay that blocks interaction.
 */
export class HeadlessDialogBackdrop extends HTMLElement {
  // Just a container for styling
}
