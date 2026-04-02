export class HeadlessSwitch extends HTMLElement {
  static readonly observedAttributes = ["checked", "disabled", "required"];

  private _checked = false;
  private _disabled = false;
  private _required = false;

  constructor() {
    super();
    this.addEventListener("click", this._handleClick.bind(this));
    this.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  connectedCallback() {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "switch");
    }
    if (!this.hasAttribute("tabindex") && !this._disabled) {
      this.setAttribute("tabindex", "0");
    }
    this._updateAria();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    switch (name) {
      case "checked":
        this._checked = newValue !== null;
        this._updateAria();
        break;
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
      case "required":
        this._required = newValue !== null;
        if (this._required) {
          this.setAttribute("aria-required", "true");
        } else {
          this.removeAttribute("aria-required");
        }
        break;
    }
  }

  get checked(): boolean {
    return this._checked;
  }

  set checked(value: boolean) {
    if (value) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  toggle() {
    if (this._disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent("hp-change", {
        detail: { checked: this.checked },
        bubbles: true,
      }),
    );
  }

  private _handleClick(event: MouseEvent) {
    event.preventDefault();
    this.toggle();
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (this._disabled) return;
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      this.toggle();
    }
  }

  private _updateAria() {
    this.setAttribute("aria-checked", String(this._checked));
  }
}
