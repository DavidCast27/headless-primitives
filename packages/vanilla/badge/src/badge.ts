import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";
import type { BadgeVariant, BadgeSize } from "./types";

@customElement("hp-badge")
export class HeadlessBadge extends HeadlessElement {
  private _variant: BadgeVariant = "default";
  private _size: BadgeSize = "md";

  @property({ type: String })
  get variant(): BadgeVariant {
    return this._variant;
  }
  set variant(val: BadgeVariant) {
    const allowed: BadgeVariant[] = ["default", "success", "warning", "danger", "info"];
    this._variant = allowed.includes(val) ? val : "default";
    if (this.isConnected) this._sync();
  }

  @property({ type: String })
  get size(): BadgeSize {
    return this._size;
  }
  set size(val: BadgeSize) {
    const allowed: BadgeSize[] = ["sm", "md", "lg"];
    this._size = allowed.includes(val) ? val : "md";
    if (this.isConnected) this._sync();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "badge");

    // Read initial attribute values from DOM before sync
    const rawVariant = this.getAttribute("variant") as BadgeVariant;
    const rawSize = this.getAttribute("size") as BadgeSize;
    const allowedVariants: BadgeVariant[] = ["default", "success", "warning", "danger", "info"];
    const allowedSizes: BadgeSize[] = ["sm", "md", "lg"];
    this._variant = allowedVariants.includes(rawVariant) ? rawVariant : "default";
    this._size = allowedSizes.includes(rawSize) ? rawSize : "md";

    this._sync();
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if ((name === "variant" || name === "size") && old !== next && this.isConnected) {
      if (name === "variant") {
        const allowed: BadgeVariant[] = ["default", "success", "warning", "danger", "info"];
        const v = next as BadgeVariant;
        this._variant = allowed.includes(v) ? v : "default";
      }
      if (name === "size") {
        const allowed: BadgeSize[] = ["sm", "md", "lg"];
        const s = next as BadgeSize;
        this._size = allowed.includes(s) ? s : "md";
      }
      this._sync();
    }
  }

  private _sync() {
    this.setAttribute("data-variant", this._variant);
    this.setAttribute("data-size", this._size);
  }
}
