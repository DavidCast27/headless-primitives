/**
 * Headless Dialog Primitive
 *
 * Modal overlay with focus trap and scroll lock.
 * Migrated to HeadlessElement + @customElement + @property (Req 19).
 * All visual styles live in @headless-primitives/styles/dialog.css (Req 13).
 * Positioning and visibility are handled by base.css archetypes:
 *   [data-hp-overlay-content], [data-hp-backdrop]
 */
import { FocusTrap, HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-dialog")
export class HeadlessDialog extends HeadlessElement {
  /**
   * When present, switches to alertdialog semantics:
   * - role="alertdialog" on content
   * - ESC key does NOT close
   * - Backdrop click does NOT close
   */
  @property({ type: Boolean, reflect: true, attribute: "data-alert" }) alert = false;

  private _isOpen = false;
  private _focusTrap: FocusTrap | null = null;
  private _previousScrollPosition = 0;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "dialog");
    this.addEventListener("hp-close", this._close);
    // rAF ensures children are connected before we query them (parent connectedCallback
    // runs before children in Custom Elements — same pattern as accordion/collapsible)
    requestAnimationFrame(() => this._setup());
  }

  private _setup() {
    const content = this._content;
    const backdrop = this._backdrop;
    const trigger = this._trigger;

    if (content) {
      // Only set role if not already set by consumer (alert-dialog pattern)
      if (!content.hasAttribute("role")) {
        content.setAttribute("role", this.alert ? "alertdialog" : "dialog");
      }
      content.setAttribute("aria-modal", "true");
      content.setAttribute("data-hp-overlay-content", "");
      content.setAttribute("data-state", "closed");
      content.addEventListener("keydown", this._handleKeyDown);
      this._focusTrap = new FocusTrap(content);
    }

    if (backdrop) {
      backdrop.setAttribute("data-hp-backdrop", "");
      backdrop.setAttribute("data-state", "closed");
      if (!this.alert) {
        backdrop.addEventListener("click", this._close);
      }
    }

    if (trigger) {
      trigger.addEventListener("click", this._open);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._content?.removeEventListener("keydown", this._handleKeyDown);
    this._backdrop?.removeEventListener("click", this._close);
    this._trigger?.removeEventListener("click", this._open);
    this.removeEventListener("hp-close", this._close);
  }
  private get _trigger() {
    return this.querySelector<HTMLElement>("hp-dialog-trigger");
  }

  private get _content() {
    return this.querySelector<HTMLElement>("hp-dialog-content");
  }

  private get _backdrop() {
    return this.querySelector<HTMLElement>("hp-dialog-backdrop");
  }

  private _open = () => {
    if (this._isOpen) return;
    this._isOpen = true;

    this._previousScrollPosition = window.scrollY;
    document.body.style.overflow = "hidden";

    const content = this._content;
    const backdrop = this._backdrop;
    const trigger = this._trigger;

    if (content) {
      content.setAttribute("data-state", "open");
      content.removeAttribute("aria-hidden");
    }
    if (backdrop) backdrop.setAttribute("data-state", "open");
    if (trigger && content) {
      trigger.setAttribute("aria-expanded", "true");
      trigger.setAttribute("aria-controls", content.id || "");
    }

    this._focusTrap?.activate();
    this.emit("open");
  };

  private _close = () => {
    if (!this._isOpen) return;
    this._isOpen = false;

    document.body.style.overflow = "";
    window.scrollTo(0, this._previousScrollPosition);

    const content = this._content;
    const backdrop = this._backdrop;
    const trigger = this._trigger;

    if (content) {
      content.setAttribute("data-state", "closed");
      content.setAttribute("aria-hidden", "true");
    }
    if (backdrop) backdrop.setAttribute("data-state", "closed");
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
      trigger.removeAttribute("aria-controls");
    }

    this._focusTrap?.deactivate();
    this.emit("close");
  };

  /** Public API */
  open() {
    this._open();
  }
  close() {
    this._close();
  }

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      // Alert dialogs: ESC does NOT close (WAI-ARIA alertdialog pattern)
      if (this.alert) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      this._close();
    }
  };
}

@customElement("hp-dialog-trigger")
export class HeadlessDialogTrigger extends HeadlessElement {
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "dialog-trigger");
    if (!this.hasAttribute("role")) this.setAttribute("role", "button");
    if (!this.disabled) this.setAttribute("tabindex", "0");
  }
}

@customElement("hp-dialog-content")
export class HeadlessDialogContent extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "dialog-content");
    if (!this.id) this.id = `hp-dialog-content-${this.hpId}`;
  }
}

@customElement("hp-dialog-backdrop")
export class HeadlessDialogBackdrop extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "dialog-backdrop");
  }
}

@customElement("hp-dialog-title")
export class HeadlessDialogTitle extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "dialog-title");
  }
}

@customElement("hp-dialog-close")
export class HeadlessDialogClose extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "dialog-close");
    if (!this.hasAttribute("role")) this.setAttribute("role", "button");
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
    this.addEventListener("click", this._onClick);
    this.addEventListener("keydown", this._onKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._onClick);
    this.removeEventListener("keydown", this._onKeyDown);
  }

  private _onClick = () => {
    this.dispatchEvent(new CustomEvent("hp-close", { bubbles: true }));
  };

  private _onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._onClick();
    }
  };
}
