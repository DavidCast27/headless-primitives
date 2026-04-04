/**
 * Headless Tooltip Primitive
 *
 * Accessible floating label shown on hover/focus.
 * Migrated to HeadlessElement + @customElement + @property (Req 19).
 * All visual styles live in @headless-primitives/styles/tooltip.css (Req 11).
 * Visibility and positioning handled by base.css archetypes:
 *   [data-hp-tooltip-content]
 */
import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-tooltip")
export class HeadlessTooltip extends HeadlessElement {
  /** Delay in ms before showing the tooltip */
  @property({ type: Number, attribute: "show-delay" }) showDelay = 300;
  /** Delay in ms before hiding the tooltip */
  @property({ type: Number, attribute: "hide-delay" }) hideDelay = 150;

  private _isVisible = false;
  private _showTimeout: number | null = null;
  private _hideTimeout: number | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "tooltip");
    // Use rAF to ensure children are available (VitePress/SSR hydration safety)
    requestAnimationFrame(() => this._attachTriggerListeners());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimeouts();
    this._detachTriggerListeners();
  }

  private _attachTriggerListeners() {
    const trigger = this._trigger;
    if (!trigger) return;
    trigger.addEventListener("mouseenter", this._handleMouseEnter);
    trigger.addEventListener("mouseleave", this._handleMouseLeave);
    trigger.addEventListener("focus", this._handleFocus);
    trigger.addEventListener("blur", this._handleBlur);
  }

  private _detachTriggerListeners() {
    const trigger = this._trigger;
    if (!trigger) return;
    trigger.removeEventListener("mouseenter", this._handleMouseEnter);
    trigger.removeEventListener("mouseleave", this._handleMouseLeave);
    trigger.removeEventListener("focus", this._handleFocus);
    trigger.removeEventListener("blur", this._handleBlur);
  }

  private get _trigger() {
    return this.querySelector<HTMLElement>("hp-tooltip-trigger");
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
    const trigger = this._trigger;
    if (content) {
      content.setAttribute("data-state", "open");
      content.setAttribute("aria-hidden", "false");
    }
    if (trigger && content?.id) trigger.setAttribute("aria-describedby", content.id);
    this.emit("open");
  }

  private _hide() {
    if (!this._isVisible) return;
    this._isVisible = false;
    const content = this._content;
    const trigger = this._trigger;
    if (content) {
      content.setAttribute("data-state", "closed");
      content.setAttribute("aria-hidden", "true");
    }
    trigger?.removeAttribute("aria-describedby");
    this.emit("close");
  }
}

@customElement("hp-tooltip-trigger")
export class HeadlessTooltipTrigger extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "tooltip-trigger");
    if (!this.hasAttribute("tabindex") && !this.hasAttribute("disabled")) {
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
