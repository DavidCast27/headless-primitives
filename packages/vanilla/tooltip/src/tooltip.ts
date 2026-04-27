/**
 * Headless Tooltip Primitive
 *
 * Accessible floating label shown on hover/focus.
 * Uses HeadlessElement (LitElement light DOM) + @customElement + @property decorators.
 * Visibility driven by data-state + base.css [data-hp-tooltip-content].
 */
import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-tooltip")
export class HeadlessTooltip extends HeadlessElement {
  /** Delay in ms before showing the tooltip on hover. */
  @property({ type: Number, attribute: "show-delay" }) showDelay = 300;
  /** Delay in ms before hiding the tooltip after hover/blur. */
  @property({ type: Number, attribute: "hide-delay" }) hideDelay = 150;

  private _isVisible = false;
  private _showTimeout: number | null = null;
  private _hideTimeout: number | null = null;
  // Cache trigger ref so disconnectedCallback can safely remove listeners
  private _triggerEl: HTMLElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "tooltip");
    // Sync attach for tests (children already connected when parent fires connectedCallback
    // if they were appended before the parent was inserted into the document)
    this._attachTriggerListeners();
    // Double rAF covers VitePress/SSR hydration where children may arrive later
    requestAnimationFrame(() => {
      requestAnimationFrame(() => this._attachTriggerListeners());
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimeouts();
    this._triggerEl = null;
  }

  private _attachTriggerListeners() {
    const trigger = this.querySelector<HTMLElement>("hp-tooltip-trigger");
    if (!trigger || this._triggerEl === trigger) return; // already wired
    this._triggerEl = trigger;
    const opts = { signal: this.signal };
    trigger.addEventListener("mouseenter", this._handleMouseEnter, opts);
    trigger.addEventListener("mouseleave", this._handleMouseLeave, opts);
    trigger.addEventListener("focus", this._handleFocus, opts);
    trigger.addEventListener("blur", this._handleBlur, opts);
  }

  private get _content() {
    return this.querySelector<HTMLElement>("hp-tooltip-content");
  }

  private _clearTimeouts() {
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }
  }

  private _handleMouseEnter = () => {
    this._clearTimeouts();
    this._showTimeout = window.setTimeout(() => this._show(), this.showDelay);
  };

  private _handleMouseLeave = () => {
    this._clearTimeouts();
    this._hideTimeout = window.setTimeout(() => this._hide(), this.hideDelay);
  };

  private _handleFocus = () => {
    this._clearTimeouts();
    this._show();
  };

  private _handleBlur = () => {
    this._clearTimeouts();
    this._hideTimeout = window.setTimeout(() => this._hide(), this.hideDelay);
  };

  private _show() {
    if (this._isVisible) return;
    this._isVisible = true;
    const content = this._content;
    if (content) {
      content.setAttribute("data-state", "open");
      content.setAttribute("aria-hidden", "false");
    }
    if (this._triggerEl && content?.id) {
      this._triggerEl.setAttribute("aria-describedby", content.id);
    }
    this.emit("open");
  }

  private _hide() {
    if (!this._isVisible) return;
    this._isVisible = false;
    const content = this._content;
    if (content) {
      content.setAttribute("data-state", "closed");
      content.setAttribute("aria-hidden", "true");
    }
    this._triggerEl?.removeAttribute("aria-describedby");
    this.emit("close");
  }

  /** Public API */
  show() {
    this._show();
  }
  hide() {
    this._hide();
  }
}

@customElement("hp-tooltip-trigger")
export class HeadlessTooltipTrigger extends HeadlessElement {
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "tooltip-trigger");
    if (!this.hasAttribute("tabindex") && !this.disabled) {
      this.setAttribute("tabindex", "0");
    }
  }
}

@customElement("hp-tooltip-content")
export class HeadlessTooltipContent extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "tooltip-content");
    this.setAttribute("data-hp-tooltip-content", "");
    this.setAttribute("role", "tooltip");
    this.setAttribute("data-state", "closed");
    this.setAttribute("aria-hidden", "true");
    if (!this.id) this.id = `hp-tooltip-${this.hpId}`;
  }
}
