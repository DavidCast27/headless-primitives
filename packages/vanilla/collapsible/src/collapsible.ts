import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-collapsible")
export class HeadlessCollapsible extends HeadlessElement {
  @property({ type: Boolean, reflect: true })
  get open() {
    return this._open;
  }
  set open(val: boolean) {
    if (this._open === val) return;
    this._open = val;
    if (this.isConnected) this._syncState(val, this._disabled);
  }

  @property({ type: Boolean, reflect: true })
  get disabled() {
    return this._disabled;
  }
  set disabled(val: boolean) {
    if (this._disabled === val) return;
    this._disabled = val;
    if (this.isConnected) this._syncState(this._open, val);
  }

  private _open = false;
  private _disabled = false;

  private _triggerId = "";
  private _contentId = "";

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "collapsible");
    this._triggerId = `hp-collapsible-trigger-${this.hpId}`;
    this._contentId = `hp-collapsible-content-${this.hpId}`;
    this.addEventListener("hp-trigger-click", this._handleTriggerClick as EventListener);
    this.addEventListener("slotchange", () => this._sync());
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("hp-trigger-click", this._handleTriggerClick as EventListener);
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (old === next) return;
    if ((name === "open" || name === "disabled") && this.isConnected) {
      const open = name === "open" ? next !== null : this._open;
      const disabled = name === "disabled" ? next !== null : this._disabled;
      this._syncState(open, disabled);
    }
  }

  private _handleTriggerClick = () => {
    if (this._disabled) return;
    const newOpen = !this._open;
    this.open = newOpen;
    this.emit(newOpen ? "open" : "close", { open: newOpen });
    this.emit("change", { open: newOpen });
  };

  private _sync() {
    this._syncState(this.hasAttribute("open"), this.hasAttribute("disabled"));
  }

  private _syncState(open: boolean, disabled: boolean) {
    // Try both tag name and data attribute for happy-dom compatibility
    let trigger = this.querySelector<HTMLElement>("hp-collapsible-trigger");
    if (!trigger)
      trigger = this.querySelector<HTMLElement>('[data-hp-component="collapsible-trigger"]');
    let content = this.querySelector<HTMLElement>("hp-collapsible-content");
    if (!content)
      content = this.querySelector<HTMLElement>('[data-hp-component="collapsible-content"]');

    if (trigger) {
      if (!trigger.id) trigger.id = this._triggerId;
      trigger.setAttribute("aria-expanded", String(open));
      trigger.setAttribute("aria-controls", this._contentId);
      if (disabled) {
        trigger.setAttribute("disabled", "");
        trigger.setAttribute("aria-disabled", "true");
      } else {
        trigger.removeAttribute("disabled");
        trigger.removeAttribute("aria-disabled");
      }
    }

    if (content) {
      if (!content.id) content.id = this._contentId;
      if (!content.hasAttribute("role")) content.setAttribute("role", "region");
      if (trigger?.id) content.setAttribute("aria-labelledby", trigger.id);
      content.setAttribute("data-hp-panel", "");
      content.setAttribute("data-state", open ? "open" : "closed");
    }
  }
}

@customElement("hp-collapsible-trigger")
export class HeadlessCollapsibleTrigger extends HeadlessElement {
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "collapsible-trigger");
    if (!this.hasAttribute("role")) this.setAttribute("role", "button");
    if (!this.disabled) this.setAttribute("tabindex", "0");
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._handleClick);
    this.removeEventListener("keydown", this._handleKeyDown);
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (name === "disabled") {
      if (next !== null) {
        this.setAttribute("aria-disabled", "true");
        this.removeAttribute("tabindex");
      } else {
        this.removeAttribute("aria-disabled");
        this.setAttribute("tabindex", "0");
      }
    }
  }

  private _handleClick = () => {
    if (this.disabled) return;
    this.emit("trigger-click");
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._handleClick();
    }
  };
}

@customElement("hp-collapsible-content")
export class HeadlessCollapsibleContent extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "collapsible-content");
    if (!this.hasAttribute("role")) this.setAttribute("role", "region");
  }
}
