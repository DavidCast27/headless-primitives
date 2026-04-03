/**
 * HeadlessCollapsible
 * Un primitivo que extiende HTMLElement para proporcionar el patrón WAI-ARIA Disclosure,
 * permitiendo mostrar/ocultar contenido con accesibilidad nativa.
 */
export class HeadlessCollapsible extends HTMLElement {
  static readonly observedAttributes = ["open", "disabled"];

  private _open = false;
  private _disabled = false;
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
    // Parse initial open attribute
    this._open = this.hasAttribute("open");

    // Parse disabled attribute
    this._disabled = this.hasAttribute("disabled");

    // Generate unique IDs for trigger and content relationship
    this._triggerId = this._triggerId || `collapsible-trigger-${this._generateId()}`;
    this._contentId = this._contentId || `collapsible-content-${this._generateId()}`;

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
        break;
      case "disabled":
        this._disabled = newValue !== null;
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

  private _generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private _updateComponents() {
    const trigger = this.querySelector(
      "hp-collapsible-trigger",
    ) as HeadlessCollapsibleTrigger | null;
    const content = this.querySelector(
      "hp-collapsible-content",
    ) as HeadlessCollapsibleContent | null;

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

    this._open = !this._open;
    if (this._open) {
      this.setAttribute("open", "");
    } else {
      this.removeAttribute("open");
    }
    this._updateComponents();
    this._dispatchChangeEvent();
  }

  private _dispatchChangeEvent() {
    const eventType = this._open ? "hp-open" : "hp-close";

    this.dispatchEvent(
      new CustomEvent(eventType, {
        detail: { value: this._open },
        bubbles: true,
      }),
    );

    this.dispatchEvent(
      new CustomEvent("hp-change", {
        detail: { open: this._open },
        bubbles: true,
      }),
    );
  }
}

/**
 * HeadlessCollapsibleTrigger
 * El botón que controla la visibilidad del contenido del collapsible.
 */
export class HeadlessCollapsibleTrigger extends HTMLElement {
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
    if (this._disabled) return;

    this.dispatchEvent(
      new CustomEvent("hp-trigger-click", {
        bubbles: true,
      }),
    );
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (this._disabled) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this._handleClick();
    }
  }

  private _updateAria() {
    // aria-expanded and aria-controls are managed by the parent HeadlessCollapsible
  }
}

/**
 * HeadlessCollapsibleContent
 * El panel de contenido que se muestra u oculta.
 */
export class HeadlessCollapsibleContent extends HTMLElement {
  connectedCallback() {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "region");
    }
  }
}

// Registrar los elementos si no existen (importante para evitar errores en SSR/HMR)
if (typeof window !== "undefined") {
  if (!customElements.get("hp-collapsible")) {
    customElements.define("hp-collapsible", HeadlessCollapsible);
  }
  if (!customElements.get("hp-collapsible-trigger")) {
    customElements.define("hp-collapsible-trigger", HeadlessCollapsibleTrigger);
  }
  if (!customElements.get("hp-collapsible-content")) {
    customElements.define("hp-collapsible-content", HeadlessCollapsibleContent);
  }
}
