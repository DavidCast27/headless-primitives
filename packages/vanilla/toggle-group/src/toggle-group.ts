import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-toggle-group")
export class HeadlessToggleGroup extends HeadlessElement {
  @property({ type: String, reflect: true }) orientation: "horizontal" | "vertical" = "horizontal";
  @property({ type: String, reflect: true }) type: "single" | "multiple" = "single";
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;

  private _value: string[] = [];

  get value(): string[] {
    return [...this._value];
  }
  set value(val: string[]) {
    this._value = val;
    this._syncToggles();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "toggle-group");
    if (!this.hasAttribute("role")) this.setAttribute("role", "group");

    const valueAttr = this.getAttribute("value");
    this._value = valueAttr ? valueAttr.split(",").filter((v) => v.trim()) : [];

    this.addEventListener("hp-toggle-press", this._handleTogglePress as EventListener);
    this.addEventListener("keydown", this._handleKeyDown);
    this.addEventListener("slotchange", () => this._updateToggles());

    // Set aria-orientation immediately
    this.setAttribute("aria-orientation", this.getAttribute("orientation") || "horizontal");

    // Double rAF to ensure children are upgraded in dynamic injection contexts
    requestAnimationFrame(() => requestAnimationFrame(() => this._updateToggles()));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("hp-toggle-press", this._handleTogglePress as EventListener);
    this.removeEventListener("keydown", this._handleKeyDown);
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (!this.isConnected || old === next) return;
    if (name === "orientation") {
      this.setAttribute("aria-orientation", next === "vertical" ? "vertical" : "horizontal");
    }
    if (name === "disabled") {
      this._updateToggles();
    }
  }

  private _updateToggles() {
    const toggles = Array.from(this.querySelectorAll("hp-toggle")) as HeadlessToggle[];
    if (this.hasAttribute("disabled")) toggles.forEach((t) => t.setAttribute("disabled", ""));
    this.setAttribute("aria-orientation", this.getAttribute("orientation") || "horizontal");
    if (this.hasAttribute("required")) {
      this.setAttribute("aria-required", "true");
    } else {
      this.removeAttribute("aria-required");
    }
    this._syncToggles();
  }

  private _syncToggles() {
    const toggles = Array.from(this.querySelectorAll("hp-toggle")) as HeadlessToggle[];
    toggles.forEach((toggle) => {
      const isPressed = this._value.includes(toggle.value);
      toggle.setPressed(isPressed);
    });
  }

  private _handleTogglePress = (event: CustomEvent) => {
    const toggleValue = event.detail.value;
    let newValue: string[];

    if (this.type === "single") {
      newValue = this._value.includes(toggleValue) ? [] : [toggleValue];
    } else {
      newValue = this._value.includes(toggleValue)
        ? this._value.filter((v) => v !== toggleValue)
        : [...this._value, toggleValue];
    }

    this._value = newValue;
    this.setAttribute("value", newValue.join(","));
    this._syncToggles();
    this.emit("change", { value: [...this._value] });
  };

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;
    const toggles = Array.from(
      this.querySelectorAll("hp-toggle:not([disabled])"),
    ) as HeadlessToggle[];
    const currentIndex = toggles.indexOf(event.target as HeadlessToggle);
    if (currentIndex === -1) return;

    let nextIndex = -1;
    switch (event.key) {
      case "ArrowDown":
        if (this.orientation === "horizontal") return;
        event.preventDefault();
        nextIndex = (currentIndex + 1) % toggles.length;
        break;
      case "ArrowRight":
        if (this.orientation === "vertical") return;
        event.preventDefault();
        nextIndex = (currentIndex + 1) % toggles.length;
        break;
      case "ArrowUp":
        if (this.orientation === "horizontal") return;
        event.preventDefault();
        nextIndex = (currentIndex - 1 + toggles.length) % toggles.length;
        break;
      case "ArrowLeft":
        if (this.orientation === "vertical") return;
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
        this._handleTogglePress(
          new CustomEvent("hp-toggle-press", {
            detail: { value: (event.target as HeadlessToggle).value },
          }),
        );
        return;
    }
    if (nextIndex !== -1) toggles[nextIndex].focus();
  };
}

@customElement("hp-toggle")
export class HeadlessToggle extends HeadlessElement {
  @property({ type: String, reflect: true }) value = "";
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _pressed = false;
  get pressed() {
    return this._pressed;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "toggle");
    if (!this.hasAttribute("role")) this.setAttribute("role", "button");
    this.setAttribute("tabindex", "-1");
    this.addEventListener("click", this._handleClick);
    this._sync();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._handleClick);
  }

  // Override observedAttributes to include 'pressed'
  static get observedAttributes() {
    return [...(super.observedAttributes || []), "pressed"];
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (!this.isConnected || old === next) return;
    if (name === "pressed") {
      this._pressed = next !== null;
      this._sync();
    }
    if (name === "disabled") {
      this._sync();
    }
  }

  setPressed(val: boolean) {
    this._pressed = val;
    this._sync();
  }

  private _sync() {
    this.setAttribute("aria-pressed", String(this._pressed));
    this.setAttribute("data-state", this._pressed ? "on" : "off");
    const disabled = this.hasAttribute("disabled");
    if (disabled) {
      this.setAttribute("aria-disabled", "true");
      this.removeAttribute("tabindex");
    } else {
      this.removeAttribute("aria-disabled");
      this.setAttribute("tabindex", this._pressed ? "0" : "-1");
    }
  }

  private _handleClick = () => {
    if (this.disabled) return;
    this.emit("toggle-press", { value: this.value });
  };
}
