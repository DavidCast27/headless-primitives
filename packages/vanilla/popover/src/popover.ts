/**
 * Headless Popover Primitive
 *
 * Floating content anchored to a trigger, with computed position and focus management.
 * Uses HeadlessElement (LitElement light DOM) + @customElement + @property decorators.
 * Visibility is driven by data-state + base.css [data-hp-overlay-content].
 * Only top/left coordinates are set as inline styles (computed anchor position).
 */
import {
  HeadlessElement,
  customElement,
  getScrollParents,
  startPositionLoop,
} from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-popover")
export class HeadlessPopover extends HeadlessElement {
  /** Horizontal alignment relative to trigger. "start" = left edge, "end" = right edge. */
  @property({ type: String, reflect: true }) align: "start" | "end" = "start";

  private _trigger: HTMLElement | null = null;
  private _content: HTMLElement | null = null;
  private _isOpen = false;
  private _scrollParents: EventTarget[] = [];
  private _openController: AbortController | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "popover");
    this._trigger = this.querySelector("hp-popover-trigger");
    this._content = this.querySelector("hp-popover-content");

    if (this._trigger && this._content) {
      this._setupTrigger();
      this._setupContent();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._openController?.abort();
    this._openController = null;
    this._scrollParents = [];
  }

  private _setupTrigger() {
    if (!this._trigger) return;
    this._trigger.setAttribute("data-hp-component", "popover-trigger");
    this._trigger.setAttribute("aria-haspopup", "dialog");
    if (!this._trigger.hasAttribute("tabindex") && !this._trigger.hasAttribute("disabled")) {
      this._trigger.setAttribute("tabindex", "0");
    }
    this._trigger.addEventListener("click", this._handleTriggerClick);
  }

  private _setupContent() {
    if (!this._content) return;
    this._content.setAttribute("role", "dialog");
    this._content.setAttribute("data-hp-overlay-content", "");
    this._content.setAttribute("data-state", "closed");
    this._content.setAttribute("aria-hidden", "true");
    // hp-popover is the containing block for absolute positioning
    this.style.position = "relative";
  }

  private _computePosition() {
    if (!this._trigger || !this._content) return;

    const gap = 8;
    const popoverRect = this.getBoundingClientRect();
    const triggerRect = this._trigger.getBoundingClientRect();

    const triggerLeft = triggerRect.left - popoverRect.left;
    const triggerTop = triggerRect.top - popoverRect.top;
    const triggerWidth = triggerRect.width;
    const triggerHeight = triggerRect.height;

    const contentW = this._content.offsetWidth || 0;
    const contentH = this._content.offsetHeight || 0;

    // Vertical: prefer below, flip to top if not enough space
    let top = triggerTop + triggerHeight + gap;
    let side: "bottom" | "top" = "bottom";
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    if (contentH > 0 && spaceBelow < contentH + gap && spaceAbove > contentH + gap) {
      top = triggerTop - contentH - gap;
      side = "top";
    }

    // Horizontal: align start or end of trigger
    let left = this.align === "end" ? triggerLeft + triggerWidth - contentW : triggerLeft;

    // Clamp to viewport
    const minLeft = gap - popoverRect.left;
    const maxLeft = window.innerWidth - contentW - gap - popoverRect.left;
    left = Math.max(minLeft, Math.min(left, maxLeft));

    // Only top/left are allowed as inline styles (computed coordinates, not visibility)
    this._content.style.top = `${top}px`;
    this._content.style.left = `${left}px`;
    this._content.setAttribute("data-side", side);
    this._content.setAttribute("data-align", this.align);
  }

  private _handleTriggerClick = (event: Event) => {
    event.stopPropagation();
    this._toggle();
  };

  private _toggle = () => {
    if (this._isOpen) {
      this._close();
    } else {
      this._open();
    }
  };

  private _open() {
    if (this._isOpen) return;
    this._isOpen = true;

    if (this._content) {
      this._content.setAttribute("data-state", "open");
      this._content.setAttribute("aria-hidden", "false");
    }

    this._computePosition();

    if (this._trigger && this._content) {
      this._trigger.setAttribute("aria-expanded", "true");
      this._trigger.setAttribute("aria-controls", this._content.id || "");
    }

    // Bind global listeners and the position loop to a per-opening
    // AbortController so they get released on close() OR torn down
    // automatically if the element is disconnected without close().
    this._openController?.abort();
    this._openController = new AbortController();
    const sig = this._openController.signal;

    startPositionLoop(() => this._computePosition(), sig);

    document.addEventListener("click", this._handleClickOutside, { signal: sig });
    document.addEventListener("keydown", this._handleEscape, { signal: sig });

    if (this._trigger) {
      this._scrollParents = getScrollParents(this._trigger);
      for (const parent of this._scrollParents) {
        parent.addEventListener("scroll", this._handleScrollOrResize, {
          signal: sig,
          passive: true,
        } as AddEventListenerOptions);
      }
    }
    window.addEventListener("resize", this._handleScrollOrResize, {
      signal: sig,
      passive: true,
    });

    this.emit("open");
  }

  private _close() {
    if (!this._isOpen) return;
    this._isOpen = false;

    if (this._content) {
      this._content.setAttribute("data-state", "closed");
      this._content.setAttribute("aria-hidden", "true");
    }
    if (this._trigger) {
      this._trigger.setAttribute("aria-expanded", "false");
      this._trigger.removeAttribute("aria-controls");
    }

    this._removeGlobalListeners();
    this.emit("close");
  }

  private _removeGlobalListeners() {
    this._openController?.abort();
    this._openController = null;
    this._scrollParents = [];
  }

  private _handleClickOutside = (event: Event) => {
    if (!this._isOpen) return;
    const target = event.target as Node;
    if (
      this._trigger &&
      this._content &&
      !this._trigger.contains(target) &&
      !this._content.contains(target)
    ) {
      this._close();
    }
  };

  private _handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && this._isOpen) {
      event.preventDefault();
      this._close();
    }
  };

  private _handleScrollOrResize = () => {
    if (this._isOpen) this._close();
  };

  /** Public API */
  open() {
    this._open();
  }
  close() {
    this._close();
  }
  toggle() {
    this._toggle();
  }
}

@customElement("hp-popover-trigger")
export class HeadlessPopoverTrigger extends HeadlessElement {
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "popover-trigger");
    if (!this.hasAttribute("tabindex") && !this.disabled) {
      this.setAttribute("tabindex", "0");
    }
    this.addEventListener("keydown", this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._handleKeyDown);
  }

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  };
}

@customElement("hp-popover-content")
export class HeadlessPopoverContent extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "popover-content");
    if (!this.id) this.id = `hp-popover-content-${this.hpId}`;
    this._linkAria();
    requestAnimationFrame(() => this._linkAria());
  }

  _linkAria() {
    const root = this.closest("hp-popover");
    if (!root) return;
    const title = root.querySelector("hp-popover-title") as HTMLElement | null;
    const description = root.querySelector("hp-popover-description") as HTMLElement | null;
    if (title?.id) this.setAttribute("aria-labelledby", title.id);
    else this.removeAttribute("aria-labelledby");
    if (description?.id) this.setAttribute("aria-describedby", description.id);
    else this.removeAttribute("aria-describedby");
  }
}

@customElement("hp-popover-title")
export class HeadlessPopoverTitle extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "popover-title");
    if (!this.id) this.id = `hp-popover-title-${this.hpId}`;
  }
}

@customElement("hp-popover-description")
export class HeadlessPopoverDescription extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "popover-description");
    if (!this.id) this.id = `hp-popover-description-${this.hpId}`;
  }
}
