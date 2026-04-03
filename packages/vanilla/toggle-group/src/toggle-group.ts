export class HeadlessToggleGroup extends HTMLElement {
  static readonly observedAttributes = ["value", "disabled", "required", "orientation", "type"];

  private _value: string[] = [];
  private _disabled = false;
  private _required = false;
  private _orientation: "horizontal" | "vertical" = "horizontal";
  private _type: "single" | "multiple" = "single";
  private _observer: MutationObserver | null = null;

  constructor() {
    super();
    this.addEventListener("hp-toggle-press", this._handleTogglePress.bind(this) as EventListener);
    this.addEventListener("keydown", this._handleKeyDown.bind(this));
    this._observer = new MutationObserver(() => {
      this._updateToggles();
    });
  }

  connectedCallback() {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "group");
    }

    // Parse initial value attribute
    const valueAttr = this.getAttribute("value");
    if (valueAttr) {
      this._value = valueAttr.split(",").filter((v) => v.trim());
    } else {
      this._value = [];
    }

    // Parse type attribute
    const typeAttr = this.getAttribute("type");
    this._type = (typeAttr as "single" | "multiple") || "single";

    // Parse orientation attribute
    const orientationAttr = this.getAttribute("orientation");
    this._orientation = (orientationAttr as "horizontal" | "vertical") || "horizontal";
    this.setAttribute("aria-orientation", this._orientation);

    this._observer?.observe(this, { childList: true, subtree: true });

    // Ensure toggles are synced after DOM is ready
    requestAnimationFrame(() => {
      this._updateToggles();
    });
  }

  disconnectedCallback() {
    this._observer?.disconnect();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    switch (name) {
      case "value":
        if (newValue) {
          this._value = newValue.split(",").filter((v) => v.trim());
        } else {
          this._value = [];
        }
        this._syncToggles();
        break;
      case "disabled":
        this._disabled = newValue !== null;
        this._updateToggles();
        break;
      case "required":
        this._required = newValue !== null;
        if (this._required) {
          this.setAttribute("aria-required", "true");
        } else {
          this.removeAttribute("aria-required");
        }
        break;
      case "orientation":
        this._orientation = (newValue as "horizontal" | "vertical") || "horizontal";
        this.setAttribute("aria-orientation", this._orientation);
        break;
      case "type":
        this._type = (newValue as "single" | "multiple") || "single";
        this._syncToggles();
        break;
    }
  }

  get value(): string[] {
    return [...this._value];
  }

  set value(val: string[]) {
    this.setAttribute("value", val.join(","));
  }

  get type(): "single" | "multiple" {
    return this._type;
  }

  set type(val: "single" | "multiple") {
    this.setAttribute("type", val);
  }

  private _updateToggles() {
    const toggles = Array.from(this.querySelectorAll("hp-toggle")) as HeadlessToggle[];
    toggles.forEach((toggle) => {
      if (this._disabled) {
        toggle.setAttribute("disabled", "");
      }
    });
    this._syncToggles();
  }

  private _syncToggles() {
    const toggles = Array.from(this.querySelectorAll("hp-toggle"));

    toggles.forEach((toggle) => {
      const toggleElement = toggle as any;
      const toggleValue = toggleElement.value || "";
      const isPressed = this._value.includes(toggleValue);

      // Always set attribute directly for CSS compatibility
      if (isPressed) {
        toggle.setAttribute("pressed", "");
        toggle.setAttribute("data-pressed", "true");
      } else {
        toggle.removeAttribute("pressed");
        toggle.removeAttribute("data-pressed");
      }

      // Also set property if available
      if ("pressed" in toggleElement) {
        toggleElement.pressed = isPressed;
      }

      // Ensure ARIA is updated
      toggle.setAttribute("aria-pressed", String(isPressed));
    });
  }

  private _handleTogglePress(event: CustomEvent) {
    const toggleValue = event.detail.value;
    let newValue: string[];

    if (this._type === "single") {
      // For single type, replace the current value
      newValue = this._value.includes(toggleValue) ? [] : [toggleValue];
    } else {
      // For multiple type, toggle the value
      if (this._value.includes(toggleValue)) {
        newValue = this._value.filter((v) => v !== toggleValue);
      } else {
        newValue = [...this._value, toggleValue];
      }
    }

    this._value = newValue;
    this.setAttribute("value", newValue.join(","));

    this.dispatchEvent(
      new CustomEvent("hp-change", {
        detail: { value: [...this._value] },
        bubbles: true,
      }),
    );

    // Update all toggles to reflect the new state
    this._syncToggles();
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (this._disabled) return;

    const toggles = Array.from(
      this.querySelectorAll("hp-toggle:not([disabled])"),
    ) as HeadlessToggle[];
    const target = event.target as HeadlessToggle;
    const currentIndex = toggles.indexOf(target);

    if (currentIndex === -1) return;

    let nextIndex = -1;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        if (this._orientation === "horizontal" && event.key === "ArrowDown") return;
        if (this._orientation === "vertical" && event.key === "ArrowRight") return;
        event.preventDefault();
        nextIndex = (currentIndex + 1) % toggles.length;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        if (this._orientation === "horizontal" && event.key === "ArrowUp") return;
        if (this._orientation === "vertical" && event.key === "ArrowLeft") return;
        event.preventDefault();
        nextIndex = (currentIndex - 1 + toggles.length) % toggles.length;
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = toggles.length - 1;
        break;
      case " ":
      case "Enter":
        event.preventDefault();
        // Trigger the toggle
        const toggleElement = target as any;
        if (toggleElement.value) {
          this._handleTogglePress(
            new CustomEvent("hp-toggle-press", {
              detail: { value: toggleElement.value },
            }),
          );
        }
        return;
    }

    if (nextIndex !== -1) {
      const nextToggle = toggles[nextIndex];
      nextToggle.focus();
    }
  }
}

export class HeadlessToggle extends HTMLElement {
  static readonly observedAttributes = ["value", "pressed", "disabled"];

  private _value = "";
  private _pressed = false;
  private _disabled = false;

  constructor() {
    super();
    this.addEventListener("click", this._handleClick.bind(this));
  }

  connectedCallback() {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "button");
    }
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", this._pressed ? "0" : "-1");
    }
    this._updateAria();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    switch (name) {
      case "value":
        this._value = newValue || "";
        break;
      case "pressed":
        this._pressed = newValue !== null;
        this.setAttribute("tabindex", this._pressed ? "0" : "-1");
        this._updateAria();
        break;
      case "disabled":
        this._disabled = newValue !== null;
        if (this._disabled) {
          this.setAttribute("aria-disabled", "true");
          this.removeAttribute("tabindex");
        } else {
          this.removeAttribute("aria-disabled");
          this.setAttribute("tabindex", this._pressed ? "0" : "-1");
        }
        break;
    }
  }

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this.setAttribute("value", val);
  }

  get pressed(): boolean {
    return this._pressed;
  }

  set pressed(val: boolean) {
    if (val) {
      this.setAttribute("pressed", "");
    } else {
      this.removeAttribute("pressed");
    }
  }

  private _handleClick() {
    if (this._disabled) return;

    this.dispatchEvent(
      new CustomEvent("hp-toggle-press", {
        detail: { value: this._value },
        bubbles: true,
      }),
    );
  }

  private _updateAria() {
    this.setAttribute("aria-pressed", String(this._pressed));
  }
}
