/**
 * Headless Dialog Primitive
 *
 * Modal overlay with focus trap and scroll lock.
 * Uses HeadlessElement (LitElement light DOM) + @customElement + @property decorators.
 * Visibility is driven exclusively by data-state + base.css — no inline visibility styles.
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
  private _setupDone = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "dialog");
    this.addEventListener("hp-close", this._close);
    // _setup() runs synchronously — in happy-dom and real browsers, children appended
    // before appendChild(parent) are already connected when connectedCallback fires.
    // We also schedule a rAF pass for the VitePress/SSR hydration case where children
    // may arrive after the parent (e.g. slot projection).
    this._setup();
    requestAnimationFrame(() => this._setup());
  }

  private _setup() {
    // Guard: only wire up listeners once per child set
    const content = this._content;
    const backdrop = this._backdrop;
    const trigger = this._trigger;

    if (content && !this._setupDone) {
      this._setupDone = true;

      if (!content.hasAttribute("role")) {
        content.setAttribute("role", this.alert ? "alertdialog" : "dialog");
      }
      content.setAttribute("aria-modal", "true");
      content.setAttribute("data-hp-overlay-content", "");
      content.setAttribute("data-state", "closed");
      content.setAttribute("aria-hidden", "true");
      content.addEventListener("keydown", this._handleKeyDown);
      this._focusTrap = new FocusTrap(content);
    }

    if (content) {
      (content as HeadlessDialogContent)._linkAria?.();
    }

    if (backdrop && !backdrop.hasAttribute("data-hp-backdrop")) {
      backdrop.setAttribute("data-hp-backdrop", "");
      backdrop.setAttribute("data-state", "closed");
      if (!this.alert) {
        backdrop.addEventListener("click", this._close);
      }
    }

    if (trigger && !trigger.hasAttribute("data-hp-setup")) {
      trigger.setAttribute("data-hp-setup", "");
      trigger.addEventListener("click", this._open);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._setupDone = false;
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
    // Ensure setup ran (covers the case where open() is called programmatically
    // before the rAF fires in SSR/hydration scenarios)
    this._setup();
    this._isOpen = true;

    this._previousScrollPosition = window.scrollY;
    document.body.style.overflow = "hidden";

    const content = this._content;
    const backdrop = this._backdrop;
    const trigger = this._trigger;

    if (content) {
      content.setAttribute("data-state", "open");
      content.removeAttribute("aria-hidden");
      (content as HeadlessDialogContent)._linkAria?.();
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
    this.addEventListener("keydown", this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._handleKeyDown);
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (name === "disabled") {
      if (next !== null) {
        this.setAttribute("aria-disabled", "true");
        this.removeAttribute("tabindex");
      } else {
        this.removeAttribute("aria-disabled");
        this.setAttribute("tabindex", "0");
      }
    }
  }

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  };
}

@customElement("hp-dialog-content")
export class HeadlessDialogContent extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "dialog-content");
    if (!this.id) this.id = `hp-dialog-content-${this.hpId}`;
    this._linkAria();
    requestAnimationFrame(() => this._linkAria());
  }

  _linkAria() {
    const root = this.closest("hp-dialog");
    if (!root) return;
    const title = root.querySelector("hp-dialog-title") as HTMLElement | null;
    const description = root.querySelector("hp-dialog-description") as HTMLElement | null;
    if (title?.id) this.setAttribute("aria-labelledby", title.id);
    else this.removeAttribute("aria-labelledby");
    if (description?.id) this.setAttribute("aria-describedby", description.id);
    else this.removeAttribute("aria-describedby");
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
    if (!this.id) this.id = `hp-dialog-title-${this.hpId}`;
  }
}

@customElement("hp-dialog-description")
export class HeadlessDialogDescription extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "dialog-description");
    if (!this.id) this.id = `hp-dialog-description-${this.hpId}`;
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
    this.emit("close");
  };

  private _onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._onClick();
    }
  };
}
