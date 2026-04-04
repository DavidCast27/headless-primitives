/**
 * Headless Tooltip Primitive
 *
 * A floating information display that appears on hover or focus.
 */
export class HeadlessTooltip extends HTMLElement {
  private _trigger: HTMLElement | null = null;
  private _content: HTMLElement | null = null;
  private _isVisible = false;
  private _showTimeout: number | null = null;
  private _hideTimeout: number | null = null;

  connectedCallback() {
    this._trigger = this.querySelector("hp-tooltip-trigger");
    this._content = this.querySelector("hp-tooltip-content");

    if (this._trigger && this._content) {
      this._setupTrigger();
      this._setupContent();
    }
  }

  disconnectedCallback() {
    // Clean up timeouts
    if (this._showTimeout) clearTimeout(this._showTimeout);
    if (this._hideTimeout) clearTimeout(this._hideTimeout);
  }

  private _setupTrigger() {
    if (!this._trigger) return;

    // Mouse events with delay
    this._trigger.addEventListener("mouseenter", this._handleMouseEnter);
    this._trigger.addEventListener("mouseleave", this._handleMouseLeave);

    // Focus events (immediate, no delay)
    this._trigger.addEventListener("focus", this._handleFocus);
    this._trigger.addEventListener("blur", this._handleBlur);
  }

  private _setupContent() {
    if (!this._content) return;

    this._content.setAttribute("role", "tooltip");
    // Only manage visibility/opacity — positioning is left to the user's CSS
    this._content.style.visibility = "hidden";
    this._content.style.opacity = "0";
    this._content.style.pointerEvents = "none";
    this._content.style.transition = "opacity 0.15s ease, visibility 0.15s ease";
  }

  private _handleMouseEnter = () => {
    this._clearTimeouts();
    this._showTimeout = window.setTimeout(() => this._show(), 300); // 300ms delay like Base UI
  };

  private _handleMouseLeave = () => {
    this._clearTimeouts();
    this._hideTimeout = window.setTimeout(() => this._hide(), 150); // Shorter hide delay
  };

  private _handleFocus = () => {
    this._clearTimeouts();
    this._show(); // Immediate on focus
  };

  private _handleBlur = () => {
    this._clearTimeouts();
    this._hideTimeout = window.setTimeout(() => this._hide(), 150);
  };

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

  private _show = () => {
    if (this._isVisible) return;
    this._isVisible = true;

    if (this._content) {
      this._content.style.visibility = "visible";
      this._content.style.opacity = "1";
      this._content.setAttribute("aria-hidden", "false");
    }

    if (this._trigger && this._content) {
      this._trigger.setAttribute("aria-describedby", this._content.id || "");
    }

    this.dispatchEvent(
      new CustomEvent("hp-open", {
        bubbles: true,
        composed: true,
      }),
    );
  };

  private _hide = () => {
    if (!this._isVisible) return;
    this._isVisible = false;

    if (this._content) {
      this._content.style.visibility = "hidden";
      this._content.style.opacity = "0";
      this._content.setAttribute("aria-hidden", "true");
    }

    if (this._trigger) {
      this._trigger.removeAttribute("aria-describedby");
    }

    this.dispatchEvent(
      new CustomEvent("hp-close", {
        bubbles: true,
        composed: true,
      }),
    );
  };
}

/**
 * Tooltip Trigger - The element that activates the tooltip.
 */
export class HeadlessTooltipTrigger extends HTMLElement {
  connectedCallback() {
    // Ensure it's focusable
    if (!this.hasAttribute("tabindex") && !this.hasAttribute("disabled")) {
      this.setAttribute("tabindex", "0");
    }
  }
}

/**
 * Tooltip Content - The floating information display.
 */
export class HeadlessTooltipContent extends HTMLElement {
  connectedCallback() {
    // Generate ID if not provided
    if (!this.id) {
      this.id = `hp-tooltip-content-${Math.random().toString(36).slice(2, 9)}`;
    }
  }
}
