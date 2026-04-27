import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-accordion")
export class HeadlessAccordion extends HeadlessElement {
  @property({ type: Boolean, reflect: true, attribute: "single-panel" }) singlePanel = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "accordion");
    this.addEventListener("hp-item-open", this._handleItemOpen as EventListener, {
      signal: this.signal,
    });
    this.addEventListener("slotchange", () => this._updateItems(), { signal: this.signal });
    requestAnimationFrame(() => this._updateItems());
  }

  private _handleItemOpen = (event: CustomEvent) => {
    if (!this.singlePanel) return;
    const openedItem = event.target as HeadlessAccordionItem;
    this._getItems().forEach((item) => {
      if (item !== openedItem && item.open) {
        item.open = false;
        if (typeof item.syncState === "function") item.syncState();
      }
    });
  };

  private _updateItems() {
    this._getItems().forEach((item) => {
      if (typeof item.setInheritedDisabled === "function") {
        item.setInheritedDisabled(this.disabled);
      }
    });
  }

  private _getItems() {
    return Array.from(this.querySelectorAll("hp-accordion-item")) as HeadlessAccordionItem[];
  }

  handleArrowNavigation(event: KeyboardEvent, current: HeadlessAccordionTrigger) {
    const triggers = Array.from(
      this.querySelectorAll("hp-accordion-trigger"),
    ) as HeadlessAccordionTrigger[];
    const idx = triggers.indexOf(current);
    let next = idx;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        next = idx < triggers.length - 1 ? idx + 1 : 0;
        break;
      case "ArrowUp":
        event.preventDefault();
        next = idx > 0 ? idx - 1 : triggers.length - 1;
        break;
      case "Home":
        event.preventDefault();
        next = 0;
        break;
      case "End":
        event.preventDefault();
        next = triggers.length - 1;
        break;
      default:
        return;
    }
    if (next !== idx) triggers[next].focus();
  }
}

@customElement("hp-accordion-item")
export class HeadlessAccordionItem extends HeadlessElement {
  @property({ type: Boolean, reflect: true })
  get open(): boolean {
    return this._open;
  }
  set open(val: boolean) {
    const old = this._open;
    this._open = val;
    this.requestUpdate("open", old);
    if (this.isConnected) this._sync();
  }

  @property({ type: Boolean, reflect: true })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(val: boolean) {
    const old = this._disabled;
    this._disabled = val;
    this.requestUpdate("disabled", old);
    if (this.isConnected) this._sync();
  }

  @property({ type: String, reflect: true }) value = "";

  private _open = false;
  private _disabled = false;
  private _explicitlyDisabled = false;
  private _triggerId = "";
  private _contentId = "";

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "accordion-item");
    this._explicitlyDisabled = this.disabled;
    if (!this.value) this.value = this.hpId;
    this._triggerId = `hp-accordion-trigger-${this.value}`;
    this._contentId = `hp-accordion-content-${this.value}`;
    this.addEventListener("hp-trigger-click", this._handleTriggerClick as EventListener, {
      signal: this.signal,
    });
    this.addEventListener("slotchange", () => this._sync(), { signal: this.signal });
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if ((name === "open" || name === "disabled") && old !== next && this.isConnected) {
      this._sync();
    }
  }

  setInheritedDisabled(val: boolean) {
    if (this._explicitlyDisabled) return;
    this.disabled = val;
  }

  syncState() {
    this._sync();
  }

  private _handleTriggerClick = () => {
    if (this.disabled) return;
    const accordion = this.closest("hp-accordion") as HeadlessAccordion | null;
    if (accordion?.hasAttribute("disabled")) return;
    if (accordion?.singlePanel && this.open) return;

    this.open = !this.open;
    this.emit("change", { open: this.open, value: this.value });
    if (this.open) {
      this.emit("open", { value: this.value });
      this.emit("item-open", { value: this.value });
    } else {
      this.emit("close", { value: this.value });
    }
  };

  private _sync() {
    const trigger = this.querySelector("hp-accordion-trigger");
    const content = this.querySelector("hp-accordion-content");

    if (trigger) {
      if (!trigger.id) trigger.id = this._triggerId;
      trigger.setAttribute("aria-expanded", String(this.open));
      trigger.setAttribute("aria-controls", this._contentId);
      if (this.disabled) {
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
      content.setAttribute("data-state", this.open ? "open" : "closed");
    }
  }
}

@customElement("hp-accordion-trigger")
export class HeadlessAccordionTrigger extends HeadlessElement {
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "accordion-trigger");
    if (!this.hasAttribute("role")) this.setAttribute("role", "button");
    if (!this.disabled) this.setAttribute("tabindex", "0");
    this.addEventListener("click", this._handleClick, { signal: this.signal });
    this.addEventListener("keydown", this._handleKeyDown, { signal: this.signal });
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (name === "disabled") {
      if (this.disabled || next !== null) {
        this.setAttribute("aria-disabled", "true");
        this.removeAttribute("tabindex");
      } else {
        this.removeAttribute("aria-disabled");
        this.setAttribute("tabindex", "0");
      }
    }
  }

  private _handleClick = () => {
    if (this.disabled || this.hasAttribute("disabled")) return;
    this.emit("trigger-click");
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._handleClick();
    }
    const accordion = this.closest("hp-accordion") as HeadlessAccordion | null;
    if (accordion && ["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
      accordion.handleArrowNavigation(e, this);
    }
  };
}

@customElement("hp-accordion-content")
export class HeadlessAccordionContent extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "accordion-content");
    if (!this.hasAttribute("role")) this.setAttribute("role", "region");
  }
}
