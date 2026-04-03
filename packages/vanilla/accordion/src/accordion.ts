/**
 * HeadlessAccordion
 * Un primitivo que extiende HTMLElement para proporcionar el patrón WAI-ARIA Accordion,
 * permitiendo mostrar/ocultar múltiples paneles de contenido con accesibilidad nativa.
 */
export class HeadlessAccordion extends HTMLElement {
  static readonly observedAttributes = ["single-panel", "disabled"];

  private _singlePanel = false;
  private _disabled = false;
  private _observer: MutationObserver | null = null;
  private _items: HeadlessAccordionItem[] = [];

  constructor() {
    super();
    this.addEventListener("hp-item-open", this._handleItemOpen.bind(this) as EventListener);
    this._observer = new MutationObserver(() => {
      this._updateItems();
    });
  }

  connectedCallback() {
    // Parse initial attributes
    this._singlePanel = this.hasAttribute("single-panel");
    this._disabled = this.hasAttribute("disabled");

    // Start observing DOM changes
    this._observer?.observe(this, { childList: true, subtree: true });

    // Update items immediately and then after DOM is ready
    this._updateItems();
    requestAnimationFrame(() => {
      this._updateItems();
    });
  }

  disconnectedCallback() {
    this._observer?.disconnect();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    switch (name) {
      case "single-panel":
        this._singlePanel = newValue !== null;
        this._updateItems();
        break;
      case "disabled":
        this._disabled = newValue !== null;
        this._updateItems();
        break;
    }
  }

  get singlePanel(): boolean {
    return this._singlePanel;
  }

  set singlePanel(val: boolean) {
    if (val) {
      this.setAttribute("single-panel", "");
    } else {
      this.removeAttribute("single-panel");
    }
  }

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(val: boolean) {
    if (val) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  private _updateItems() {
    this._items = Array.from(this.querySelectorAll("hp-accordion-item")) as HeadlessAccordionItem[];

    this._items.forEach((item) => {
      // Set aria-level for heading structure
      const trigger = item.querySelector("hp-accordion-trigger") as HeadlessAccordionTrigger | null;
      if (trigger) {
        const heading = trigger.closest(".accordion-heading") || trigger.parentElement;
        if (heading && !heading.hasAttribute("aria-level")) {
          heading.setAttribute("aria-level", "3");
        }
      }

      // Inherit disabled state from accordion if not already disabled
      if (this._disabled && !item.hasAttribute("disabled")) {
        item.setInheritedDisabled(true);
      } else if (!this._disabled && item.hasAttribute("disabled") && !item.explicitlyDisabled) {
        item.setInheritedDisabled(false);
      }
    });
  }

  private _handleItemOpen(event: CustomEvent) {
    if (!this._singlePanel) return;

    const openedItem = event.target as HeadlessAccordionItem;

    // Close all other items
    this._items.forEach((item) => {
      if (item !== openedItem && item.open) {
        item.open = false;
      }
    });
  }

  _handleArrowNavigation(event: KeyboardEvent, currentTrigger: HeadlessAccordionTrigger) {
    const triggers = Array.from(
      this.querySelectorAll("hp-accordion-trigger"),
    ) as HeadlessAccordionTrigger[];
    const currentIndex = triggers.indexOf(currentTrigger);

    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        nextIndex = currentIndex < triggers.length - 1 ? currentIndex + 1 : 0;
        break;
      case "ArrowUp":
        event.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : triggers.length - 1;
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = triggers.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== currentIndex && triggers[nextIndex]) {
      triggers[nextIndex].focus();
    }
  }
}

/**
 * HeadlessAccordionItem
 * Un panel individual dentro del accordion que extiende el patrón collapsible.
 */
export class HeadlessAccordionItem extends HTMLElement {
  static readonly observedAttributes = ["open", "disabled", "value"];

  private _open = false;
  private _disabled = false;
  private _value = "";
  private _explicitlyDisabled = false;
  private _inheritedDisabledPropagating = false;
  private _observer: MutationObserver | null = null;
  private _triggerId = "";
  private _contentId = "";

  constructor() {
    super();
    this.addEventListener("hp-trigger-click", this._handleTriggerClick.bind(this) as EventListener);
    this._observer = new MutationObserver(() => {
      this._updateComponents();
    });
  }

  connectedCallback() {
    // Parse initial attributes
    this._open = this.hasAttribute("open");
    this._disabled = this.hasAttribute("disabled");
    this._explicitlyDisabled = this._disabled; // Track if disabled was set explicitly
    this._value = this.getAttribute("value") || this._generateId();

    // Generate unique IDs for trigger and content relationship
    this._triggerId = this._triggerId || `accordion-trigger-${this._value}`;
    this._contentId = this._contentId || `accordion-content-${this._value}`;

    // Start observing DOM changes
    this._observer?.observe(this, { childList: true, subtree: true });

    // Update components immediately and then after DOM is ready
    this._updateComponents();
    requestAnimationFrame(() => {
      this._updateComponents();
    });
  }

  disconnectedCallback() {
    this._observer?.disconnect();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    switch (name) {
      case "open":
        this._open = newValue !== null;
        this._updateComponents();
        this._dispatchChangeEvent();
        if (this._open) {
          this._dispatchOpenEvent();
        } else {
          this._dispatchCloseEvent();
        }
        break;
      case "disabled":
        this._disabled = newValue !== null;
        // Only update _explicitlyDisabled when NOT being set by inherited propagation from parent.
        if (!this._inheritedDisabledPropagating) {
          this._explicitlyDisabled = this._disabled;
        }
        this._updateComponents();
        break;
      case "value":
        this._value = newValue || this._generateId();
        this._updateComponents();
        break;
    }
  }

  get open(): boolean {
    return this._open;
  }

  set open(val: boolean) {
    if (val) {
      this.setAttribute("open", "");
    } else {
      this.removeAttribute("open");
    }
  }

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(val: boolean) {
    if (val) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this.setAttribute("value", val);
  }

  // Expose explicitlyDisabled for external access (used by parent accordion)
  get explicitlyDisabled(): boolean {
    return this._explicitlyDisabled;
  }

  /**
   * Called by the parent HeadlessAccordion._updateItems to propagate inherited disabled state.
   * Unlike setAttribute("disabled"), this does NOT mark the item as explicitly disabled,
   * so _updateItems can later remove the attribute when the parent is re-enabled.
   */
  setInheritedDisabled(val: boolean) {
    if (val) {
      if (!this._explicitlyDisabled) {
        this._inheritedDisabledPropagating = true;
        this.setAttribute("disabled", "");
        this._inheritedDisabledPropagating = false;
      }
    } else {
      if (!this._explicitlyDisabled) {
        this._inheritedDisabledPropagating = true;
        this.removeAttribute("disabled");
        this._inheritedDisabledPropagating = false;
      }
    }
  }

  private _generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private _updateComponents() {
    const trigger = this.querySelector("hp-accordion-trigger") as HeadlessAccordionTrigger | null;
    const content = this.querySelector("hp-accordion-content") as HeadlessAccordionContent | null;

    if (trigger) {
      // Set IDs for ARIA relationship
      if (!trigger.hasAttribute("id")) {
        trigger.setAttribute("id", this._triggerId);
      }

      // Set aria-controls to reference content
      if (content && !trigger.hasAttribute("aria-controls")) {
        trigger.setAttribute("aria-controls", this._contentId);
      }

      // Set aria-expanded based on open state
      trigger.setAttribute("aria-expanded", String(this._open));

      // Inherit disabled state
      if (this._disabled) {
        trigger.setAttribute("disabled", "");
      } else {
        trigger.removeAttribute("disabled");
      }
    }

    if (content) {
      // Set ID for ARIA relationship
      if (!content.hasAttribute("id")) {
        content.setAttribute("id", this._contentId);
      }

      // Set aria-labelledby to reference trigger
      if (trigger && !content.hasAttribute("aria-labelledby")) {
        content.setAttribute("aria-labelledby", this._triggerId);
      }

      // Set role for accessibility
      if (!content.hasAttribute("role")) {
        content.setAttribute("role", "region");
      }

      // Show/hide content based on open state
      if (this._open) {
        content.removeAttribute("hidden");
      } else {
        content.setAttribute("hidden", "");
      }
    }
  }

  private _handleTriggerClick() {
    if (this._disabled) return;

    // Guard against inherited disabled from parent accordion (handles timing edge cases)
    const accordion = this.closest("hp-accordion") as HeadlessAccordion | null;
    if (accordion?.hasAttribute("disabled")) return;

    // Check if we're in single-panel mode and need to close other panels
    const isSinglePanel = accordion?.singlePanel;

    if (isSinglePanel && this._open) {
      // Don't close if single-panel and this is already open
      return;
    }

    this._open = !this._open;
    if (this._open) {
      this.setAttribute("open", "");

      // If in single-panel mode, close other items
      if (isSinglePanel && accordion) {
        const allItems = Array.from(
          accordion.querySelectorAll("hp-accordion-item"),
        ) as HeadlessAccordionItem[];
        allItems.forEach((item) => {
          if (item !== this && item.open) {
            item.open = false;
          }
        });
      }
    } else {
      this.removeAttribute("open");
    }
    this._updateComponents();
  }

  private _dispatchChangeEvent() {
    this.dispatchEvent(
      new CustomEvent("hp-change", {
        detail: { open: this._open, value: this._value },
        bubbles: true,
      }),
    );
  }

  private _dispatchOpenEvent() {
    this.dispatchEvent(
      new CustomEvent("hp-item-open", {
        detail: { value: this._value },
        bubbles: true,
      }),
    );

    this.dispatchEvent(
      new CustomEvent("hp-open", {
        detail: { value: this._value },
        bubbles: true,
      }),
    );
  }

  private _dispatchCloseEvent() {
    this.dispatchEvent(
      new CustomEvent("hp-close", {
        detail: { value: this._value },
        bubbles: true,
      }),
    );
  }
}

/**
 * HeadlessAccordionTrigger
 * El botón que controla la visibilidad del contenido del accordion item.
 */
export class HeadlessAccordionTrigger extends HTMLElement {
  static readonly observedAttributes = ["disabled"];

  private _disabled = false;

  constructor() {
    super();
    this.addEventListener("click", this._handleClick.bind(this));
    this.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  connectedCallback() {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "button");
    }

    if (!this.hasAttribute("tabindex") && !this.hasAttribute("disabled")) {
      this.setAttribute("tabindex", "0");
    }

    this._updateAria();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    switch (name) {
      case "disabled":
        this._disabled = newValue !== null;
        if (this._disabled) {
          this.setAttribute("aria-disabled", "true");
          this.removeAttribute("tabindex");
        } else {
          this.removeAttribute("aria-disabled");
          this.setAttribute("tabindex", "0");
        }
        break;
    }
  }

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(val: boolean) {
    if (val) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  private _handleClick() {
    if (this.hasAttribute("disabled")) return;

    this.dispatchEvent(
      new CustomEvent("hp-trigger-click", {
        bubbles: true,
      }),
    );
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (this.hasAttribute("disabled")) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this._handleClick();
    }

    // Optional arrow key navigation - delegate to parent accordion
    const accordion = this.closest("hp-accordion") as HeadlessAccordion | null;
    if (
      accordion &&
      (event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "Home" ||
        event.key === "End")
    ) {
      accordion._handleArrowNavigation?.(event, this);
    }
  }

  private _updateAria() {
    // aria-expanded and aria-controls are managed by the parent HeadlessAccordionItem
  }
}

/**
 * HeadlessAccordionContent
 * El panel de contenido que se muestra u oculta.
 */
export class HeadlessAccordionContent extends HTMLElement {
  connectedCallback() {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "region");
    }
  }
}

// Registrar los elementos si no existen (importante para evitar errores en SSR/HMR)
if (typeof window !== "undefined") {
  if (!customElements.get("hp-accordion")) {
    customElements.define("hp-accordion", HeadlessAccordion);
  }
  if (!customElements.get("hp-accordion-item")) {
    customElements.define("hp-accordion-item", HeadlessAccordionItem);
  }
  if (!customElements.get("hp-accordion-trigger")) {
    customElements.define("hp-accordion-trigger", HeadlessAccordionTrigger);
  }
  if (!customElements.get("hp-accordion-content")) {
    customElements.define("hp-accordion-content", HeadlessAccordionContent);
  }
}
