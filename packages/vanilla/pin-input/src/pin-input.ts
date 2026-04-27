import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";
import type { PinInputType } from "./types";

@customElement("hp-pin-input")
export class HeadlessPinInput extends HeadlessElement {
  private _length = 4;
  private _type: PinInputType = "numeric";
  private _placeholder = "○";
  private _disabled = false;
  private _slots: HTMLInputElement[] = [];

  @property({ type: Number })
  get length(): number {
    return this._length;
  }
  set length(v: number) {
    const n = Math.max(1, Math.floor(v));
    if (n === this._length) return;
    this._length = n;
    if (this.isConnected) {
      this._buildSlots();
      this._sync();
    }
  }

  @property({ type: String })
  get type(): PinInputType {
    return this._type;
  }
  set type(v: PinInputType) {
    const allowed: PinInputType[] = ["numeric", "alphanumeric"];
    this._type = allowed.includes(v) ? v : "numeric";
    if (this.isConnected) this._sync();
  }

  @property({ type: String })
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(v: string) {
    this._placeholder = v ?? "○";
    if (this.isConnected) this._sync();
  }

  @property({ type: Boolean, reflect: true })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(v: boolean) {
    this._disabled = v;
    if (this.isConnected) this._sync();
  }

  /** Combined value of all filled slots */
  get value(): string {
    return this._slots.map((s) => s.value).join("");
  }

  /** Clear all slots and reset focus to the first one */
  clear() {
    for (const slot of this._slots) {
      slot.value = "";
    }
    this._sync();
    this.emit("change", { value: "" });
    this._slots[0]?.focus();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "pin-input");
    this.setAttribute("role", "group");
    this.setAttribute("aria-label", this.getAttribute("aria-label") ?? "PIN input");

    // Read initial attribute values from DOM
    const rawLength = this.getAttribute("length");
    if (rawLength !== null) {
      const n = parseInt(rawLength, 10);
      if (!isNaN(n) && n > 0) this._length = n;
    }

    const rawType = this.getAttribute("type") as PinInputType;
    const allowedTypes: PinInputType[] = ["numeric", "alphanumeric"];
    if (allowedTypes.includes(rawType)) this._type = rawType;

    const rawPlaceholder = this.getAttribute("placeholder");
    if (rawPlaceholder !== null) this._placeholder = rawPlaceholder;

    if (this.hasAttribute("disabled")) this._disabled = true;

    this._buildSlots();
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._slots = [];
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (old === next || !this.isConnected) return;

    if (name === "length") {
      const n = parseInt(next ?? "", 10);
      if (!isNaN(n) && n > 0 && n !== this._length) {
        this._length = n;
        this._buildSlots();
        this._sync();
      }
    } else if (name === "type") {
      const allowed: PinInputType[] = ["numeric", "alphanumeric"];
      const v = next as PinInputType;
      this._type = allowed.includes(v) ? v : "numeric";
      this._sync();
    } else if (name === "placeholder") {
      this._placeholder = next ?? "○";
      this._sync();
    } else if (name === "disabled") {
      this._disabled = next !== null;
      this._sync();
    }
  }

  /** Build or rebuild the input slot elements */
  private _buildSlots() {
    // Remove existing inputs
    for (const slot of this._slots) {
      if (slot.parentNode === this) this.removeChild(slot);
    }
    this._slots = [];

    for (let i = 0; i < this._length; i++) {
      const input = document.createElement("input");
      input.setAttribute("data-hp-pin-slot", String(i));
      input.setAttribute("aria-label", `Digit ${i + 1}`);
      input.maxLength = 1;
      input.autocomplete = "one-time-code";
      this.appendChild(input);
      this._slots.push(input);

      input.addEventListener("keydown", this._onKeydown, { signal: this.signal });
      input.addEventListener("input", this._onInput, { signal: this.signal });
      input.addEventListener("paste", this._onPaste, { signal: this.signal });
      input.addEventListener("focus", this._onFocus, { signal: this.signal });
    }
  }

  private _onFocus = (e: Event) => {
    const input = e.target as HTMLInputElement;
    input.select();
  };

  private _onInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const idx = this._slotIndex(input);
    if (idx === -1) return;

    // Enforce allowed characters
    const raw = input.value;
    const filtered = this._filterValue(raw);
    if (filtered !== raw) {
      input.value = filtered;
    }

    // Keep only the last character entered (handles paste-via-input on mobile)
    if (input.value.length > 1) {
      input.value = input.value.slice(-1);
    }

    const currentValue = this.value;
    this.emit("change", { value: currentValue });

    if (input.value.length === 1 && idx < this._slots.length - 1) {
      this._slots[idx + 1].focus();
    }

    this._sync();

    if (this._isComplete()) {
      this.emit("complete", { value: currentValue });
    }
  };

  private _onKeydown = (e: KeyboardEvent) => {
    const input = e.target as HTMLInputElement;
    const idx = this._slotIndex(input);
    if (idx === -1) return;

    if (e.key === "Backspace") {
      if (input.value.length > 0) {
        input.value = "";
        this.emit("change", { value: this.value });
        this._sync();
      } else if (idx > 0) {
        const prev = this._slots[idx - 1];
        prev.value = "";
        prev.focus();
        this.emit("change", { value: this.value });
        this._sync();
      }
      e.preventDefault();
      return;
    }

    if (e.key === "ArrowLeft" && idx > 0) {
      this._slots[idx - 1].focus();
      e.preventDefault();
      return;
    }

    if (e.key === "ArrowRight" && idx < this._slots.length - 1) {
      this._slots[idx + 1].focus();
      e.preventDefault();
      return;
    }

    if (e.key === "Home") {
      this._slots[0].focus();
      e.preventDefault();
      return;
    }

    if (e.key === "End") {
      this._slots[this._slots.length - 1].focus();
      e.preventDefault();
    }
  };

  private _onPaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    const idx = this._slotIndex(input);
    if (idx === -1) return;

    const raw = e.clipboardData?.getData("text") ?? "";
    const filtered = this._filterValue(raw);
    const chars = filtered.slice(0, this._length - idx).split("");

    for (let i = 0; i < chars.length; i++) {
      if (idx + i < this._slots.length) {
        this._slots[idx + i].value = chars[i];
      }
    }

    // Move focus to next empty slot or last filled
    const nextEmpty = this._slots.findIndex((s, i) => i >= idx && s.value === "");
    if (nextEmpty !== -1) {
      this._slots[nextEmpty].focus();
    } else {
      this._slots[this._slots.length - 1].focus();
    }

    const currentValue = this.value;
    this.emit("change", { value: currentValue });
    this._sync();

    if (this._isComplete()) {
      this.emit("complete", { value: currentValue });
    }
  };

  private _slotIndex(input: HTMLInputElement): number {
    return this._slots.indexOf(input);
  }

  private _filterValue(v: string): string {
    if (this._type === "numeric") {
      return v.replace(/[^0-9]/g, "");
    }
    return v.replace(/[^a-zA-Z0-9]/g, "");
  }

  private _isComplete(): boolean {
    return this._slots.length === this._length && this._slots.every((s) => s.value.length === 1);
  }

  private _sync() {
    // Sync inputmode and placeholder on all slots
    for (const slot of this._slots) {
      slot.inputMode = this._type === "numeric" ? "numeric" : "text";
      slot.placeholder = this._placeholder.charAt(0);
      slot.disabled = this._disabled;
    }

    this.setAttribute("aria-disabled", String(this._disabled));
    this.setAttribute("data-state", this._isComplete() ? "complete" : "incomplete");
    this.setAttribute("data-type", this._type);

    if (this._disabled) {
      this.setAttribute("aria-disabled", "true");
    } else {
      this.setAttribute("aria-disabled", "false");
    }
  }
}
