/**
 * Headless Drawer Primitive
 *
 * Slide-in panel from any edge of the viewport, with backdrop, focus trap,
 * and scroll lock. Uses HeadlessElement (LitElement light DOM) + @customElement
 * + @property decorators. Visibility is driven exclusively by data-state +
 * base.css — no inline visibility styles.
 */
import { FocusTrap, HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";
import type { DrawerPosition } from "./types";

@customElement("hp-drawer")
export class HeadlessDrawer extends HeadlessElement {
  private _isOpen = false;
  private _focusTrap: FocusTrap | null = null;
  private _previousScrollPosition = 0;
  private _setupDone = false;

  private _position: DrawerPosition = "left";

  @property({ type: String, reflect: true })
  get position(): DrawerPosition {
    return this._position;
  }
  set position(v: DrawerPosition) {
    this._position = v;
    this._syncPosition();
  }

  // show()/hide()/toggle() are the public API.
  // _isOpen is the source of truth and is updated synchronously to avoid
  // Lit async update cycles that happy-dom does not run.

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "drawer");
    this.addEventListener("hp-hide", this._hide);
    this._setup();
    requestAnimationFrame(() => this._setup());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._setupDone = false;
    this._content?.removeEventListener("keydown", this._handleKeyDown);
    this._backdrop?.removeEventListener("click", this._hide);
    this._trigger?.removeEventListener("click", this._show);
    this.removeEventListener("hp-hide", this._hide);
  }

  private _setup() {
    const content = this._content;
    const backdrop = this._backdrop;
    const trigger = this._trigger;

    if (content && !this._setupDone) {
      this._setupDone = true;

      content.setAttribute("role", "dialog");
      content.setAttribute("aria-modal", "true");
      content.setAttribute("data-hp-overlay-content", "");
      content.setAttribute("data-hp-drawer-content", "");
      content.setAttribute("data-state", "closed");
      content.setAttribute("aria-hidden", "true");
      content.addEventListener("keydown", this._handleKeyDown);
      this._focusTrap = new FocusTrap(content);
      this._syncPosition();
    }

    if (backdrop && !backdrop.hasAttribute("data-hp-backdrop")) {
      backdrop.setAttribute("data-hp-backdrop", "");
      backdrop.setAttribute("data-hp-drawer-backdrop", "");
      backdrop.setAttribute("data-state", "closed");
      backdrop.addEventListener("click", this._hide);
    }

    if (trigger && !trigger.hasAttribute("data-hp-setup")) {
      trigger.setAttribute("data-hp-setup", "");
      trigger.addEventListener("click", this._show);
    }
  }

  private _syncPosition() {
    const content = this._content;
    if (content) {
      content.setAttribute("data-position", this._position);
    }
  }

  private get _trigger() {
    return this.querySelector<HTMLElement>("hp-drawer-trigger");
  }

  private get _content() {
    return this.querySelector<HTMLElement>("hp-drawer-content");
  }

  private get _backdrop() {
    return this.querySelector<HTMLElement>("hp-drawer-backdrop");
  }

  private _show = () => {
    if (this._isOpen) return;
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
    }
    if (backdrop) backdrop.setAttribute("data-state", "open");
    if (trigger && content) {
      trigger.setAttribute("aria-expanded", "true");
      trigger.setAttribute("aria-controls", content.id || "");
    }

    this._focusTrap?.activate();
    this.emit("show");
  };

  private _hide = () => {
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
    this.emit("hide");
  };

  /** Public API */
  show() {
    this._show();
  }

  hide() {
    this._hide();
  }

  toggle() {
    if (this._isOpen) {
      this._hide();
    } else {
      this._show();
    }
  }

  get isOpen() {
    return this._isOpen;
  }

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      this._hide();
    }
  };
}

@customElement("hp-drawer-trigger")
export class HeadlessDrawerTrigger extends HeadlessElement {
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "drawer-trigger");
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

@customElement("hp-drawer-content")
export class HeadlessDrawerContent extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "drawer-content");
    if (!this.id) this.id = `hp-drawer-content-${this.hpId}`;
  }
}

@customElement("hp-drawer-backdrop")
export class HeadlessDrawerBackdrop extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "drawer-backdrop");
  }
}

@customElement("hp-drawer-title")
export class HeadlessDrawerTitle extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "drawer-title");
  }
}

@customElement("hp-drawer-close")
export class HeadlessDrawerClose extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "drawer-close");
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
    this.emit("hide");
  };

  private _onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._onClick();
    }
  };
}
