import { customElement, property } from "lit/decorators.js";
import { HeadlessElement } from "@headless-primitives/utils";

/**
 * Headless Progress Primitive
 *
 * Uses @property for attribute observation and public API surface.
 * DOM sync (aria-*, CSS vars) runs synchronously via _sync() called from
 * each setter — required because happy-dom does not execute Lit's async
 * reactive update cycle (updated/willUpdate never fire in tests).
 */
@customElement("hp-progress")
export class HeadlessProgress extends HeadlessElement {
  private _value: number | null = null;
  private _min = 0;
  private _max = 100;

  // @property keeps attribute → property reflection working in real browsers
  @property({ type: Number })
  get value(): number | null {
    return this._value;
  }
  set value(v: number | null) {
    this._value = v;
    this._sync();
  }

  @property({ type: Number })
  get min(): number {
    return this._min;
  }
  set min(v: number) {
    this._min = v;
    this._sync();
  }

  @property({ type: Number })
  get max(): number {
    return this._max;
  }
  set max(v: number) {
    this._max = v;
    this._sync();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "progress");
    if (!this.hasAttribute("role")) this.setAttribute("role", "progressbar");
    this._sync();
  }

  private _sync() {
    this.setAttribute("aria-valuemin", String(this._min));
    this.setAttribute("aria-valuemax", String(this._max));

    if (this._value !== null) {
      this.setAttribute("aria-valuenow", String(this._value));
      this.setAttribute("data-state", "determinate");
      this.style.setProperty("--hp-progress-percentage", `${this.percentage}%`);
    } else {
      this.removeAttribute("aria-valuenow");
      this.setAttribute("data-state", "indeterminate");
      this.style.setProperty("--hp-progress-percentage", "");
    }
  }

  get percentage(): number {
    if (this._value === null) return 0;
    const range = this._max - this._min;
    if (range <= 0) return 0;
    const clamped = Math.min(Math.max(this._value, this._min), this._max);
    return ((clamped - this._min) / range) * 100;
  }

  setValue(val: number | null) {
    this.value = val;
  }
}
