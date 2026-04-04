import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { HeadlessElement } from "@headless-primitives/utils";

@customElement("hp-progress")
export class HeadlessProgress extends HeadlessElement {
  @property({ type: Number }) value: number | null = null;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "progress");
    if (!this.hasAttribute("role")) this.setAttribute("role", "progressbar");
  }

  protected override updated(_changed: Map<string, unknown>) {
    this.setAttribute("aria-valuemin", String(this.min));
    this.setAttribute("aria-valuemax", String(this.max));
    if (this.value !== null) {
      this.setAttribute("aria-valuenow", String(this.value));
      this.setAttribute("data-state", "determinate");
    } else {
      this.removeAttribute("aria-valuenow");
      this.setAttribute("data-state", "indeterminate");
    }
    // Set CSS variable on host so hp-progress-indicator can read it via CSS
    this.style.setProperty("--hp-progress-percentage", `${this.percentage}%`);
  }

  get percentage(): number {
    if (this.value === null) return 0;
    const range = this.max - this.min;
    if (range <= 0) return 0;
    const clamped = Math.min(Math.max(this.value, this.min), this.max);
    return ((clamped - this.min) / range) * 100;
  }

  setValue(val: number | null) {
    this.value = val;
  }

  override render() {
    const pct = this.value !== null ? `${this.percentage}%` : "";
    return html`<hp-progress-indicator
      style="width: ${pct}"
      ?data-indeterminate=${this.value === null}
    ></hp-progress-indicator>`;
  }
}
