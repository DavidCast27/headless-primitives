import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-progress")
export class HeadlessProgress extends HeadlessElement {
  @property({ type: Number, reflect: true })
  get value(): number | null {
    return this._value;
  }
  set value(val: number | null) {
    this._value = val;
    if (this.isConnected) this._sync();
  }
  private _value: number | null = null;

  @property({ type: Number, reflect: true })
  get min(): number {
    return this._min;
  }
  set min(val: number) {
    this._min = val;
    if (this.isConnected) this._sync();
  }
  private _min = 0;

  @property({ type: Number, reflect: true })
  get max(): number {
    return this._max;
  }
  set max(val: number) {
    this._max = val;
    if (this.isConnected) this._sync();
  }
  private _max = 100;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "progress");
    if (!this.hasAttribute("role")) this.setAttribute("role", "progressbar");
    this._sync();
  }

  get percentage(): number {
    if (this._value === null) return 0;
    const range = this._max - this._min;
    if (range <= 0) return 0;
    const clamped = Math.min(Math.max(this._value, this._min), this._max);
    return ((clamped - this._min) / range) * 100;
  }

  setValue(value: number | null) {
    this.value = value;
  }

  private _sync() {
    this.setAttribute("aria-valuemin", String(this._min));
    this.setAttribute("aria-valuemax", String(this._max));
    if (this._value !== null) {
      this.setAttribute("aria-valuenow", String(this._value));
      this.style.setProperty("--hp-progress-percentage", `${this.percentage}%`);
    } else {
      this.removeAttribute("aria-valuenow");
      this.style.removeProperty("--hp-progress-percentage");
    }
  }
}
