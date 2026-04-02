export class HeadlessProgress extends HTMLElement {
  static readonly observedAttributes = ["value", "min", "max"];

  private _value: number | null = null;
  private _min = 0;
  private _max = 100;

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "progressbar");
    }
    this._updateAria();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "value":
        this._value = newValue !== null ? parseFloat(newValue) : null;
        break;
      case "min":
        this._min = newValue !== null ? parseFloat(newValue) : 0;
        break;
      case "max":
        this._max = newValue !== null ? parseFloat(newValue) : 100;
        break;
    }
    this._updateAria();
  }

  get value(): number | null {
    return this._value;
  }

  set value(val: number | null) {
    if (val === null) {
      this.removeAttribute("value");
    } else {
      this.setAttribute("value", String(val));
    }
  }

  get min(): number {
    return this._min;
  }

  set min(val: number) {
    this.setAttribute("min", String(val));
  }

  get max(): number {
    return this._max;
  }

  set max(val: number) {
    this.setAttribute("max", String(val));
  }

  /**
   * Retorna el porcentaje actual del progreso (0-100).
   * Útil para que el usuario maneje el CSS del indicador.
   */
  get percentage(): number {
    if (this._value === null) return 0;
    const range = this._max - this._min;
    if (range <= 0) return 0;
    const clampedValue = Math.min(Math.max(this._value, this._min), this._max);
    return ((clampedValue - this._min) / range) * 100;
  }

  private _updateAria() {
    this.setAttribute("aria-valuemin", String(this._min));
    this.setAttribute("aria-valuemax", String(this._max));

    if (this._value !== null) {
      this.setAttribute("aria-valuenow", String(this._value));
      // Exponer el porcentaje como una variable CSS para facilitar el estilado headless
      this.style.setProperty("--hp-progress-percentage", `${this.percentage}%`);
    } else {
      this.removeAttribute("aria-valuenow");
      this.style.removeProperty("--hp-progress-percentage");
    }
  }
}
