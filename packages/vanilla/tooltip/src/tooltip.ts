import { HeadlessElement, customElement } from "@headless-primitives/utils";

@customElement("hp-tooltip")
export class HeadlessTooltip extends HeadlessElement {
  private _isVisible = false;
  private _showTimeout: number | null = null;
  private _hideTimeout: number | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "tooltip");
    const trigger = this.querySelector("hp-tooltip-trigger");
    if (!trigger) return;
    trigger.addEventListener("mouseenter", this._handleMouseEnter);
    trigger.addEventListener("mouseleave", this._handleMouseLeave);
    trigger.addEventListener("focus", this._handleFocus);
    trigger.addEventListener("blur", this._handleBlur);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimeouts();
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
    this._showTimeout = window.setTimeout(() => this._show(), 300);
  };

  private _handleMouseLeave = () => {
    this._clearTimeouts();
    this._hideTimeout = window.setTimeout(() => this._hide(), 150);
  };

  private _handleFocus = () => {
    this._clearTimeouts();
    this._show();
  };

  private _handleBlur = () => {
    this._clearTimeouts();
    this._hideTimeout = window.setTimeout(() => this._hide(), 150);
  };

  private _show() {
    if (this._isVisible) return;
    this._isVisible = true;
    const content = this.querySelector("hp-tooltip-content");
    const trigger = this.querySelector("hp-tooltip-trigger");
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
    const content = this.querySelector("hp-tooltip-content");
    const trigger = this.querySelector("hp-tooltip-trigger");
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
