import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-radio-group")
export class HeadlessRadioGroup extends HeadlessElement {
  @property({ type: String, reflect: true }) value = "";
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: String, reflect: true }) orientation: "horizontal" | "vertical" = "vertical";

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "radio-group");
    if (!this.hasAttribute("role")) this.setAttribute("role", "radiogroup");
    this.addEventListener("hp-radio-select", this._handleRadioSelect as EventListener);
    this.addEventListener("keydown", this._handleKeyDown);
    this.addEventListener("slotchange", () => this._updateRadios());
    this._sync();
    this._updateRadios();
    requestAnimationFrame(() => this._updateRadios());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("hp-radio-select", this._handleRadioSelect as EventListener);
    this.removeEventListener("keydown", this._handleKeyDown);
  }

  private _sync() {
    this.setAttribute("aria-orientation", this.orientation);
    if (this.required) {
      this.setAttribute("aria-required", "true");
    } else {
      this.removeAttribute("aria-required");
    }
  }

  private _getRadios(): HeadlessRadio[] {
    const byTag = Array.from(this.querySelectorAll("hp-radio")) as HeadlessRadio[];
    if (byTag.length > 0) return byTag;
    return Array.from(this.querySelectorAll('[data-hp-component="radio"]')) as HeadlessRadio[];
  }

  private _updateRadios() {
    const radios = this._getRadios();
    if (this.disabled) radios.forEach((r) => r.setAttribute("disabled", ""));
    this._sync();
    this._syncRadios();
  }

  private _syncRadios() {
    const radios = this._getRadios();
    let hasChecked = false;
    radios.forEach((radio) => {
      // Read value from attribute as fallback for timing issues
      const radioValue = radio.value || radio.getAttribute("value") || "";
      const isChecked = radioValue === this.value;
      if (typeof radio.setChecked === "function") radio.setChecked(isChecked);
      if (isChecked) hasChecked = true;
    });
    if (!hasChecked && radios.length > 0) radios[0].tabIndex = 0;
  }

  private _handleRadioSelect = (event: CustomEvent) => {
    this.value = event.detail.value;
    this._syncRadios();
    this.emit("change", { value: this.value });
  };

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;
    const radios = this._getRadios().filter((r) => !r.hasAttribute("disabled"));
    const currentIndex = radios.indexOf(event.target as HeadlessRadio);
    if (currentIndex === -1) return;

    let nextIndex = -1;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        nextIndex = (currentIndex + 1) % radios.length;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        nextIndex = (currentIndex - 1 + radios.length) % radios.length;
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = radios.length - 1;
        break;
    }

    if (nextIndex !== -1) {
      radios[nextIndex].focus();
      this.value = radios[nextIndex].value;
      this._syncRadios();
      this.emit("change", { value: this.value });
    }
  };
}

@customElement("hp-radio")
export class HeadlessRadio extends HeadlessElement {
  @property({ type: String, reflect: true }) value = "";
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _checked = false;

  get checked() {
    return this._checked;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "radio");
    if (!this.hasAttribute("role")) this.setAttribute("role", "radio");
    this.setAttribute("tabindex", "-1");
    this.addEventListener("click", this._handleClick);
    this._sync();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._handleClick);
  }

  setChecked(val: boolean) {
    this._checked = val;
    this._sync();
  }

  private _sync() {
    this.setAttribute("aria-checked", String(this._checked));
    this.setAttribute("tabindex", this._checked ? "0" : "-1");
    if (this.disabled) {
      this.setAttribute("aria-disabled", "true");
      this.removeAttribute("tabindex");
    } else {
      this.removeAttribute("aria-disabled");
    }
  }

  private _handleClick = () => {
    if (this.disabled || this._checked) return;
    this.emit("radio-select", { value: this.value });
  };
}
