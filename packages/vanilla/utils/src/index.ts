export * from "./headless-element";
export * from "./uid";
export * from "./custom-element";
export * from "./overlay-position";

/**
 * Handles roving tabindex for a group of elements.
 */
export class RovingTabindex {
  private _elements: HTMLElement[] = [];
  private _onSelect: (el: HTMLElement) => void;

  constructor(elements: HTMLElement[], onSelect: (el: HTMLElement) => void) {
    this._elements = elements;
    this._onSelect = onSelect;
  }

  updateElements(elements: HTMLElement[]) {
    this._elements = elements;
  }

  handleKeyDown(event: KeyboardEvent, currentElement: HTMLElement) {
    const currentIndex = this._elements.indexOf(currentElement);
    let nextIndex = -1;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        nextIndex = (currentIndex + 1) % this._elements.length;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        nextIndex = (currentIndex - 1 + this._elements.length) % this._elements.length;
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = this._elements.length - 1;
        break;
    }

    if (nextIndex !== -1) {
      const nextElement = this._elements[nextIndex];
      this._focusElement(nextElement);
      this._onSelect(nextElement);
    }
  }

  private _focusElement(el: HTMLElement) {
    this._elements.forEach((item) => {
      item.setAttribute("tabindex", "-1");
    });
    el.setAttribute("tabindex", "0");
    el.focus();
  }
}

/**
 * Focus Trap utility for containing focus within a container.
 */
export class FocusTrap {
  private _container: HTMLElement;
  private _active = false;
  private _previouslyFocusedElement: HTMLElement | null = null;
  private _focusableElements: HTMLElement[] = [];

  constructor(container: HTMLElement) {
    this._container = container;
  }

  activate() {
    if (this._active) return;
    this._active = true;

    // Save the currently focused element
    this._previouslyFocusedElement = document.activeElement as HTMLElement;

    // Get all focusable elements within the container
    this._updateFocusableElements();

    // Focus the first focusable element
    if (this._focusableElements.length > 0) {
      this._focusableElements[0].focus();
    }

    // Listen for focus events
    document.addEventListener("focusin", this._handleFocusIn);
    document.addEventListener("keydown", this._handleKeyDown);
  }

  deactivate() {
    if (!this._active) return;
    this._active = false;

    document.removeEventListener("focusin", this._handleFocusIn);
    document.removeEventListener("keydown", this._handleKeyDown);

    // Restore previous focus
    if (this._previouslyFocusedElement) {
      this._previouslyFocusedElement.focus();
    }
  }

  private _updateFocusableElements() {
    const focusableSelectors = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
      "[contenteditable='true']",
    ];

    this._focusableElements = Array.from(
      this._container.querySelectorAll(focusableSelectors.join(", ")),
    ) as HTMLElement[];
  }

  private _handleFocusIn = (event: FocusEvent) => {
    if (!this._active) return;

    const target = event.target as HTMLElement;
    if (!this._container.contains(target)) {
      // Focus is outside the container, bring it back
      if (this._focusableElements.length > 0) {
        this._focusableElements[0].focus();
      }
    }
  };

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (!this._active || event.key !== "Tab") return;

    event.preventDefault();

    const currentIndex = this._focusableElements.indexOf(document.activeElement as HTMLElement);
    let nextIndex;

    if (event.shiftKey) {
      // Shift+Tab: move to previous
      nextIndex = currentIndex > 0 ? currentIndex - 1 : this._focusableElements.length - 1;
    } else {
      // Tab: move to next
      nextIndex = currentIndex < this._focusableElements.length - 1 ? currentIndex + 1 : 0;
    }

    this._focusableElements[nextIndex].focus();
  };
}
