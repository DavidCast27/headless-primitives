import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";
import type { SliderOrientation } from "./types";

@customElement("hp-slider")
export class HeadlessSlider extends HeadlessElement {
  private _value = 0;
  private _min = 0;
  private _max = 100;
  private _step = 1;
  private _disabled = false;
  private _orientation: SliderOrientation = "horizontal";
  private _label = "";
  private _showValue = false;
  private _valueSuffix = "";

  private _track: HTMLDivElement | null = null;
  private _range: HTMLDivElement | null = null;
  private _thumb: HTMLDivElement | null = null;
  private _rail: HTMLDivElement | null = null;
  private _header: HTMLDivElement | null = null;
  private _labelEl: HTMLSpanElement | null = null;
  private _output: HTMLOutputElement | null = null;
  private _dragging = false;

  // ── Public API ──────────────────────────────────────────────────────────────

  @property({ type: Number })
  get value(): number {
    return this._value;
  }
  set value(v: number) {
    this._value = this._clamp(Number(v));
    this._sync();
  }

  @property({ type: Number })
  get min(): number {
    return this._min;
  }
  set min(v: number) {
    this._min = Number(v);
    this._value = this._clamp(this._value);
    this._sync();
  }

  @property({ type: Number })
  get max(): number {
    return this._max;
  }
  set max(v: number) {
    this._max = Number(v);
    this._value = this._clamp(this._value);
    this._sync();
  }

  @property({ type: Number })
  get step(): number {
    return this._step;
  }
  set step(v: number) {
    this._step = Math.max(0.001, Number(v));
    this._sync();
  }

  @property({ type: Boolean, reflect: true })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(v: boolean) {
    this._disabled = v;
    this._sync();
  }

  @property({ type: String })
  get orientation(): SliderOrientation {
    return this._orientation;
  }
  set orientation(v: SliderOrientation) {
    this._orientation = v === "vertical" ? "vertical" : "horizontal";
    this._sync();
  }

  @property({ type: String })
  get label(): string {
    return this._label;
  }
  set label(v: string) {
    this._label = v;
    this._updateHeader();
  }

  @property({ type: Boolean, attribute: "show-value" })
  get showValue(): boolean {
    return this._showValue;
  }
  set showValue(v: boolean) {
    this._showValue = v;
    this._updateHeader();
  }

  @property({ type: String, attribute: "value-suffix" })
  get valueSuffix(): string {
    return this._valueSuffix;
  }
  set valueSuffix(v: string) {
    this._valueSuffix = v;
    this._updateHeader();
  }

  /** Current fill percentage (0–100) */
  get percentage(): number {
    const range = this._max - this._min;
    if (range <= 0) return 0;
    const clamped = this._clamp(this._value);
    return ((clamped - this._min) / range) * 100;
  }

  // ── Lifecycle ───────────────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "slider");

    // Read initial attribute values from DOM before building
    const rawMin = this.getAttribute("min");
    if (rawMin !== null) this._min = Number(rawMin);

    const rawMax = this.getAttribute("max");
    if (rawMax !== null) this._max = Number(rawMax);

    const rawStep = this.getAttribute("step");
    if (rawStep !== null) this._step = Math.max(0.001, Number(rawStep));

    const rawValue = this.getAttribute("value");
    if (rawValue !== null) this._value = this._clamp(Number(rawValue));

    if (this.hasAttribute("disabled")) this._disabled = true;

    const rawOrientation = this.getAttribute("orientation") as SliderOrientation;
    if (rawOrientation === "vertical") this._orientation = "vertical";

    const rawLabel = this.getAttribute("label");
    if (rawLabel !== null) this._label = rawLabel;

    if (this.hasAttribute("show-value")) this._showValue = true;

    const rawSuffix = this.getAttribute("value-suffix");
    if (rawSuffix !== null) this._valueSuffix = rawSuffix;

    this._buildDOM();
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._releaseDrag();
    this._track = null;
    this._range = null;
    this._thumb = null;
    this._rail = null;
    this._header = null;
    this._labelEl = null;
    this._output = null;
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (old === next || !this.isConnected) return;

    switch (name) {
      case "min":
        this._min = Number(next ?? "0");
        this._value = this._clamp(this._value);
        break;
      case "max":
        this._max = Number(next ?? "100");
        this._value = this._clamp(this._value);
        break;
      case "step":
        this._step = Math.max(0.001, Number(next ?? "1"));
        break;
      case "value":
        this._value = this._clamp(Number(next ?? "0"));
        break;
      case "disabled":
        this._disabled = next !== null;
        break;
      case "orientation":
        this._orientation = next === "vertical" ? "vertical" : "horizontal";
        break;
      case "label":
        this._label = next ?? "";
        this._updateHeader();
        return;
      case "show-value":
        this._showValue = next !== null;
        this._updateHeader();
        return;
      case "value-suffix":
        this._valueSuffix = next ?? "";
        this._updateHeader();
        return;
    }
    this._sync();
  }

  // ── DOM Building ─────────────────────────────────────────────────────────

  private _buildDOM() {
    if (this._rail?.parentNode === this) this.removeChild(this._rail);

    // Rail — positioning context for track + thumb
    this._rail = document.createElement("div");
    this._rail.setAttribute("data-hp-slider-rail", "");

    // Track
    this._track = document.createElement("div");
    this._track.setAttribute("data-hp-slider-track", "");
    this._track.setAttribute("aria-hidden", "true");

    // Range fill (inside track)
    this._range = document.createElement("div");
    this._range.setAttribute("data-hp-slider-range", "");
    this._track.appendChild(this._range);

    // Thumb — sibling of track inside rail, positioned via CSS
    this._thumb = document.createElement("div");
    this._thumb.setAttribute("data-hp-slider-thumb", "");
    this._thumb.setAttribute("role", "slider");
    this._thumb.setAttribute("tabindex", "0");

    this._rail.appendChild(this._track);
    this._rail.appendChild(this._thumb);
    this.appendChild(this._rail);

    // pointerdown en track Y en thumb para cubrir ambos casos de inicio de drag
    this._track.addEventListener("pointerdown", this._onPointerdown);
    this._thumb.addEventListener("pointerdown", this._onPointerdown);
    this._thumb.addEventListener("keydown", this._onKeydown);

    this._updateHeader();
  }

  // ── Event Handlers ────────────────────────────────────────────────────────

  private _onKeydown = (e: KeyboardEvent) => {
    if (this._disabled) return;

    let newValue = this._value;
    const bigStep = this._step * 10;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        newValue = this._snap(this._value + this._step);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        newValue = this._snap(this._value - this._step);
        break;
      case "Home":
        newValue = this._min;
        break;
      case "End":
        newValue = this._max;
        break;
      case "PageUp":
        newValue = this._snap(this._value + bigStep);
        break;
      case "PageDown":
        newValue = this._snap(this._value - bigStep);
        break;
      default:
        return;
    }

    e.preventDefault();
    newValue = this._clamp(newValue);

    if (newValue !== this._value) {
      this._value = newValue;
      this._sync();
      this.emit("input", { value: this._value });
      this.emit("change", { value: this._value });
    }
  };

  private _onPointerdown = (e: PointerEvent) => {
    if (this._disabled) return;
    e.preventDefault();

    // Saltar al valor correspondiente a la posición del clic
    const newValue = this._valueFromPointer(e);
    if (newValue !== null) {
      this._value = newValue;
      this._sync();
      this.emit("input", { value: this._value });
    }

    // Escuchar en document: recibe todos los eventos del puntero
    // sin importar sobre qué elemento se mueva el cursor.
    this._dragging = true;
    document.addEventListener("pointermove", this._onPointermove);
    document.addEventListener("pointerup", this._onPointerup);
    document.addEventListener("pointercancel", this._onPointerup);
    this._thumb?.focus();
  };

  private _onPointermove = (e: PointerEvent) => {
    if (!this._dragging || this._disabled) return;
    const newValue = this._valueFromPointer(e);
    if (newValue !== null && newValue !== this._value) {
      this._value = newValue;
      this._sync();
      this.emit("input", { value: this._value });
    }
  };

  private _onPointerup = () => {
    if (!this._dragging) return;
    this._releaseDrag();
    this.emit("change", { value: this._value });
  };

  private _releaseDrag() {
    this._dragging = false;
    document.removeEventListener("pointermove", this._onPointermove);
    document.removeEventListener("pointerup", this._onPointerup);
    document.removeEventListener("pointercancel", this._onPointerup);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  /**
   * Calcula el valor a partir de la posición del puntero sobre el track.
   * Cuando se arrastra el thumb, clientX/Y son correctos porque el puntero
   * está capturado y los eventos se siguen disparando aunque salga del track.
   */
  private _valueFromPointer(e: PointerEvent): number | null {
    if (!this._track) return null;
    const rect = this._track.getBoundingClientRect();
    let ratio: number;

    if (this._orientation === "vertical") {
      const height = rect.height;
      if (height <= 0) return null;
      ratio = 1 - (e.clientY - rect.top) / height;
    } else {
      const width = rect.width;
      if (width <= 0) return null;
      ratio = (e.clientX - rect.left) / width;
    }

    ratio = Math.min(1, Math.max(0, ratio));
    const rawValue = this._min + ratio * (this._max - this._min);
    return this._clamp(this._snap(rawValue));
  }

  private _clamp(v: number): number {
    return Math.min(this._max, Math.max(this._min, v));
  }

  private _snap(v: number): number {
    if (this._step <= 0) return v;
    const snapped = Math.round(v / this._step) * this._step;
    return Math.round(snapped * 1e10) / 1e10;
  }

  // ── Header (label + output) ───────────────────────────────────────────────

  private _updateHeader() {
    if (!this._rail) return; // not yet built

    const needsHeader = this._label !== "" || this._showValue;

    if (!needsHeader) {
      // Remove header if present
      if (this._header?.parentNode === this) {
        this.removeChild(this._header);
      }
      this._header = null;
      this._labelEl = null;
      this._output = null;
      if (this._thumb) {
        this._thumb.removeAttribute("aria-labelledby");
      }
      return;
    }

    // Create header if missing
    if (!this._header) {
      this._header = document.createElement("div");
      this._header.setAttribute("data-hp-slider-header", "");
      this.insertBefore(this._header, this._rail);
    }

    // Label span
    if (this._label !== "") {
      if (!this._labelEl) {
        this._labelEl = document.createElement("span");
        this._labelEl.setAttribute("data-hp-slider-label", "");
        const id = `${this.hpId}-label`;
        this._labelEl.id = id;
        this._header.insertBefore(this._labelEl, this._header.firstChild);
        if (this._thumb) this._thumb.setAttribute("aria-labelledby", id);
      }
      this._labelEl.textContent = this._label;
    } else {
      if (this._labelEl?.parentNode === this._header) {
        this._header.removeChild(this._labelEl);
      }
      this._labelEl = null;
      if (this._thumb) this._thumb.removeAttribute("aria-labelledby");
    }

    // Output element
    if (this._showValue) {
      if (!this._output) {
        this._output = document.createElement("output");
        this._output.setAttribute("data-hp-slider-output", "");
        this._header.appendChild(this._output);
      }
      this._output.textContent = `${this._value}${this._valueSuffix}`;
    } else {
      if (this._output?.parentNode === this._header) {
        this._header.removeChild(this._output);
      }
      this._output = null;
    }
  }

  // ── Sync ─────────────────────────────────────────────────────────────────

  private _sync() {
    if (!this._thumb) return;

    const pct = this.percentage;

    this._thumb.setAttribute("aria-valuemin", String(this._min));
    this._thumb.setAttribute("aria-valuemax", String(this._max));
    this._thumb.setAttribute("aria-valuenow", String(this._value));
    this._thumb.setAttribute("aria-valuetext", `${this._value}${this._valueSuffix}`);
    this._thumb.setAttribute("aria-orientation", this._orientation);
    this._thumb.setAttribute("tabindex", this._disabled ? "-1" : "0");

    this.style.setProperty("--hp-slider-percentage", `${pct}%`);

    this.setAttribute("data-orientation", this._orientation);
    this.setAttribute("data-value", String(this._value));

    if (this._disabled) {
      this.setAttribute("aria-disabled", "true");
      this.setAttribute("data-disabled", "true");
    } else {
      this.removeAttribute("aria-disabled");
      this.removeAttribute("data-disabled");
    }

    // Update output text if present
    if (this._output) {
      this._output.textContent = `${this._value}${this._valueSuffix}`;
    }
  }
}
