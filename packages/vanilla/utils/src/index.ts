/**
 * Generates a unique ID with an optional prefix.
 */
export function uid(prefix = "hp") {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

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
