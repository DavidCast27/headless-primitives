export class HeadlessRadioGroup extends HTMLElement {
  static readonly observedAttributes = ["value", "disabled", "required", "orientation"];

  private _value = "";
  private _disabled = false;
  private _required = false;
  private _orientation: "horizontal" | "vertical" = "vertical";
  private _observer: MutationObserver | null = null;

  constructor() {
    super();
    this.addEventListener("hp-radio-select", this._handleRadioSelect.bind(this) as EventListener);
    this.addEventListener("keydown", this._handleKeyDown.bind(this));
    this._observer = new MutationObserver(() => {
      this._updateRadios();
    });
  }

  connectedCallback() {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "radiogroup");
    }
    this._value = this.getAttribute("value") || "";
    this._observer?.observe(this, { childList: true, subtree: true });
    this._updateRadios();
  }

  disconnectedCallback() {
    this._observer?.disconnect();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    switch (name) {
      case "value":
        this._value = newValue || "";
        this._syncRadios();
        break;
      case "disabled":
        this._disabled = newValue !== null;
        this._updateRadios();
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
        this._orientation = (newValue as "horizontal" | "vertical") || "vertical";
        this.setAttribute("aria-orientation", this._orientation);
        break;
    }
  }

  get value() {
    return this._value;
  }

  set value(val: string) {
    this.setAttribute("value", val);
  }

  private _updateRadios() {
    const radios = Array.from(this.querySelectorAll("hp-radio")) as HeadlessRadio[];
    radios.forEach((radio) => {
      if (this._disabled) {
        radio.setAttribute("disabled", "");
      }
    });
    this._syncRadios();
  }

  private _syncRadios() {
    const radios = Array.from(this.querySelectorAll("hp-radio"));
    let hasChecked = false;

    radios.forEach((radio) => {
      const isChecked = (radio as any).value === this._value;
      // Forzar el setter usando el prototype
      const radioElement = radio as any;
      if ("checked" in radioElement) {
        radioElement.checked = isChecked;
      }
      if (isChecked) hasChecked = true;
    });

    // If none are checked, the first one should be focusable
    if (!hasChecked && radios.length > 0) {
      (radios[0] as any).tabIndex = 0;
    }
  }

  private _handleRadioSelect(event: CustomEvent) {
    this.value = event.detail.value;
    this.dispatchEvent(
      new CustomEvent("hp-change", {
        detail: { value: this.value },
        bubbles: true,
      }),
    );
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (this._disabled) return;

    const radios = Array.from(this.querySelectorAll("hp-radio:not([disabled])")) as HeadlessRadio[];
    const target = event.target as HeadlessRadio;
    const currentIndex = radios.indexOf(target);

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
      const nextRadio = radios[nextIndex];
      nextRadio.focus();
      this.value = nextRadio.value;
      this.dispatchEvent(
        new CustomEvent("hp-change", {
          detail: { value: this.value },
          bubbles: true,
        }),
      );
    }
  }
}

export class HeadlessRadio extends HTMLElement {
  static readonly observedAttributes = ["value", "checked", "disabled"];

  private _value = "";
  private _checked = false;
  private _disabled = false;

  constructor() {
    super();
    this.addEventListener("click", this._handleClick.bind(this));
  }

  connectedCallback() {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "radio");
    }
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", this._checked ? "0" : "-1");
    }
    this._updateAria();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    switch (name) {
      case "value":
        this._value = newValue || "";
        break;
      case "checked":
        this._checked = newValue !== null;
        this.setAttribute("tabindex", this._checked ? "0" : "-1");
        this._updateAria();
        break;
      case "disabled":
        this._disabled = newValue !== null;
        if (this._disabled) {
          this.setAttribute("aria-disabled", "true");
          this.removeAttribute("tabindex");
        } else {
          this.removeAttribute("aria-disabled");
          this.setAttribute("tabindex", this._checked ? "0" : "-1");
        }
        break;
    }
  }

  get value() {
    return this._value;
  }

  set value(val: string) {
    this.setAttribute("value", val);
  }

  get checked() {
    return this._checked;
  }

  set checked(val: boolean) {
    if (val) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }

  private _handleClick() {
    if (this._disabled || this._checked) return;
    this.dispatchEvent(
      new CustomEvent("hp-radio-select", {
        detail: { value: this._value },
        bubbles: true,
      }),
    );
  }

  private _updateAria() {
    this.setAttribute("aria-checked", String(this._checked));
  }
}
