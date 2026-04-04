/**
 * Headless Popover Primitive
 *
 * Floating content that opens on click, with focus management.
 */
import { FocusTrap, HeadlessElement } from "@headless-primitives/utils";

export class HeadlessPopover extends HeadlessElement {
  private _trigger: HTMLElement | null = null;
  private _content: HTMLElement | null = null;
  private _isOpen = false;
  private _focusTrap: FocusTrap | null = null;
  private _rafId: number | null = null;
  private _scrollParents: EventTarget[] = [];

  static get observedAttributes() {
    return ["align"];
  }

  /** "start" = left-aligned with trigger (default) | "end" = right-aligned */
  get align(): "start" | "end" {
    const val = this.getAttribute("align");
    return val === "end" ? "end" : "start";
  }

  connectedCallback() {
    super.connectedCallback();
    this._trigger = this.querySelector("hp-popover-trigger");
    this._content = this.querySelector("hp-popover-content");

    if (this._trigger && this._content) {
      this._setupTrigger();
      this._setupContent();
      this._focusTrap = new FocusTrap(this._content);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeGlobalListeners();
  }

  private _setupTrigger() {
    if (!this._trigger) return;
    this._trigger.addEventListener("click", this._handleTriggerClick);
  }

  private _setupContent() {
    if (!this._content) return;

    this._content.setAttribute("role", "dialog");
    this._content.setAttribute("aria-modal", "false");
    this._content.setAttribute("data-hp-overlay-content", "");
    this._content.setAttribute("data-state", "closed");

    // position: absolute relativo a hp-popover (position: relative)
    // Evita el bug de position:fixed con ancestros que tienen transform CSS
    this._content.style.position = "absolute";
    this._content.style.zIndex = "9999";
    // Limpia cualquier transform de centering que pueda venir de CSS
    // (base.css aplica translate(-50%,-50%) a role="dialog" modales, no a popovers)
    this._content.style.transform = "none";

    // hp-popover es el containing block
    this.style.position = "relative";
  }

  /** Walk up the DOM and collect every scrollable ancestor */
  private _getScrollParents(el: HTMLElement): EventTarget[] {
    const parents: EventTarget[] = [];
    let node: HTMLElement | null = el.parentElement;
    while (node) {
      const { overflow, overflowY, overflowX } = getComputedStyle(node);
      if (/auto|scroll|overlay/.test(overflow + overflowY + overflowX)) {
        parents.push(node);
      }
      node = node.parentElement;
    }
    parents.push(window);
    return parents;
  }

  private _computePosition() {
    if (!this._trigger || !this._content) return;

    const gap = 8;

    // Use getBoundingClientRect for both elements to get accurate viewport coords,
    // then convert to local coords relative to hp-popover (the containing block).
    const popoverRect = this.getBoundingClientRect();
    const triggerRect = this._trigger.getBoundingClientRect();

    // Trigger position relative to hp-popover's top-left corner
    const triggerLeft = triggerRect.left - popoverRect.left;
    const triggerTop = triggerRect.top - popoverRect.top;
    const triggerWidth = triggerRect.width;
    const triggerHeight = triggerRect.height;

    const contentW = this._content.offsetWidth || 0;
    const contentH = this._content.offsetHeight || 0;

    // --- Vertical: flip to top if not enough space below ---
    let top = triggerTop + triggerHeight + gap;
    let side: "bottom" | "top" = "bottom";

    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    if (contentH > 0 && spaceBelow < contentH + gap && spaceAbove > contentH + gap) {
      top = triggerTop - contentH - gap;
      side = "top";
    }

    // --- Horizontal: align start (left edge) or end (right edge) of trigger ---
    let left =
      this.align === "end"
        ? triggerLeft + triggerWidth - contentW // right edge of content = right edge of trigger
        : triggerLeft; // left edge of content = left edge of trigger

    // Clamp to viewport bounds (converted to popover-local coords)
    const minLeft = gap - popoverRect.left;
    const maxLeft = window.innerWidth - contentW - gap - popoverRect.left;
    left = Math.max(minLeft, Math.min(left, maxLeft));

    this._content.style.top = `${top}px`;
    this._content.style.left = `${left}px`;

    this._content.setAttribute("data-side", side);
    this._content.setAttribute("data-align", this.align);
  }

  /** rAF loop: recompute position every frame while open */
  private _startPositionLoop() {
    const loop = () => {
      if (!this._isOpen) return;
      this._computePosition();
      this._rafId = requestAnimationFrame(loop);
    };
    this._rafId = requestAnimationFrame(loop);
  }

  private _stopPositionLoop() {
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
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

    // Show first so offsetWidth/Height are measurable
    if (this._content) {
      this._content.setAttribute("data-state", "open");
      this._content.setAttribute("aria-hidden", "false");
    }

    this._computePosition();
    this._startPositionLoop();

    if (this._trigger && this._content) {
      this._trigger.setAttribute("aria-expanded", "true");
      this._trigger.setAttribute("aria-controls", this._content.id || "");
    }

    document.addEventListener("click", this._handleClickOutside);
    document.addEventListener("keydown", this._handleEscape);

    // Listen on every scrollable ancestor, not just window
    if (this._trigger) {
      this._scrollParents = this._getScrollParents(this._trigger);
      for (const parent of this._scrollParents) {
        parent.addEventListener("scroll", this._handleScrollOrResize, {
          passive: true,
        } as AddEventListenerOptions);
      }
    }
    window.addEventListener("resize", this._handleScrollOrResize, { passive: true });

    this._focusTrap?.activate();
    this.emit("open");
  }

  private _close() {
    if (!this._isOpen) return;
    this._isOpen = false;

    this._stopPositionLoop();

    if (this._content) {
      this._content.setAttribute("data-state", "closed");
      this._content.setAttribute("aria-hidden", "true");
    }

    if (this._trigger) {
      this._trigger.setAttribute("aria-expanded", "false");
      this._trigger.removeAttribute("aria-controls");
    }

    this._removeGlobalListeners();
    this._focusTrap?.deactivate();
    this.emit("close");
  }

  private _removeGlobalListeners() {
    document.removeEventListener("click", this._handleClickOutside);
    document.removeEventListener("keydown", this._handleEscape);
    for (const parent of this._scrollParents) {
      parent.removeEventListener("scroll", this._handleScrollOrResize);
    }
    this._scrollParents = [];
    window.removeEventListener("resize", this._handleScrollOrResize);
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

/**
 * Popover Trigger - The element that opens/closes the popover.
 */
export class HeadlessPopoverTrigger extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    // Ensure it's focusable
    if (!this.hasAttribute("tabindex") && !this.hasAttribute("disabled")) {
      this.setAttribute("tabindex", "0");
    }
  }
}

/**
 * Popover Content - The floating content with focus trap.
 */
export class HeadlessPopoverContent extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "popover-content");
    if (!this.id) {
      this.id = `hp-popover-content-${Math.random().toString(36).slice(2, 9)}`;
    }
  }
}
