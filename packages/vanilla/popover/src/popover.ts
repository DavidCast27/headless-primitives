/**
 * Headless Popover Primitive
 *
 * Floating content that opens on click, with focus management.
 */
import { FocusTrap } from "@headless-primitives/utils";

export class HeadlessPopover extends HTMLElement {
  private _trigger: HTMLElement | null = null;
  private _content: HTMLElement | null = null;
  private _isOpen = false;
  private _focusTrap: FocusTrap | null = null;
  private _rafId: number | null = null;
  private _scrollParents: EventTarget[] = [];

  connectedCallback() {
    this._trigger = this.querySelector("hp-popover-trigger");
    this._content = this.querySelector("hp-popover-content");

    if (this._trigger && this._content) {
      this._setupTrigger();
      this._setupContent();
      this._focusTrap = new FocusTrap(this._content);
    }
  }

  disconnectedCallback() {
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
    this._content.style.position = "fixed";
    this._content.style.visibility = "hidden";
    this._content.style.opacity = "0";
    this._content.style.pointerEvents = "none";
    this._content.style.transition = "opacity 0.2s ease, visibility 0.2s ease";
    this._content.style.zIndex = "9999";
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

    const anchor = this._trigger.getBoundingClientRect();
    const gap = 8;

    const contentW = this._content.offsetWidth || 200;
    const contentH = this._content.offsetHeight || 100;

    let top = anchor.bottom + gap;
    let left = anchor.left;

    // Flip to top if not enough space below
    if (top + contentH > window.innerHeight - gap && anchor.top - contentH - gap > 0) {
      top = anchor.top - contentH - gap;
    }

    // Keep within horizontal viewport
    if (left + contentW > window.innerWidth - gap) {
      left = window.innerWidth - contentW - gap;
    }
    if (left < gap) left = gap;

    this._content.style.top = `${top}px`;
    this._content.style.left = `${left}px`;
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
      this._content.style.visibility = "visible";
      this._content.style.opacity = "1";
      this._content.style.pointerEvents = "auto";
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
        parent.addEventListener("scroll", this._handleScrollOrResize, { passive: true } as AddEventListenerOptions);
      }
    }
    window.addEventListener("resize", this._handleScrollOrResize, { passive: true });

    this._focusTrap?.activate();
    this.dispatchEvent(new CustomEvent("hp-open", { bubbles: true, composed: true }));
  }

  private _close() {
    if (!this._isOpen) return;
    this._isOpen = false;

    this._stopPositionLoop();

    if (this._content) {
      this._content.style.visibility = "hidden";
      this._content.style.opacity = "0";
      this._content.style.pointerEvents = "none";
      this._content.setAttribute("aria-hidden", "true");
    }

    if (this._trigger) {
      this._trigger.setAttribute("aria-expanded", "false");
      this._trigger.removeAttribute("aria-controls");
    }

    this._removeGlobalListeners();
    this._focusTrap?.deactivate();
    this.dispatchEvent(new CustomEvent("hp-close", { bubbles: true, composed: true }));
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
  open() { this._open(); }
  close() { this._close(); }
  toggle() { this._toggle(); }
}

/**
 * Popover Trigger - The element that opens/closes the popover.
 */
export class HeadlessPopoverTrigger extends HTMLElement {
  connectedCallback() {
    // Ensure it's focusable
    if (!this.hasAttribute("tabindex") && !this.hasAttribute("disabled")) {
      this.setAttribute("tabindex", "0");
    }
  }
}

/**
 * Popover Content - The floating content with focus trap.
 */
export class HeadlessPopoverContent extends HTMLElement {
  connectedCallback() {
    // Generate ID if not provided
    if (!this.id) {
      this.id = `hp-popover-content-${Math.random().toString(36).slice(2, 9)}`;
    }
  }
}
