import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-tabs")
export class Tabs extends HeadlessElement {
  @property({ type: String, reflect: true }) value = "";

  // Store bound reference so we can properly remove it in disconnectedCallback
  private _boundOnSlotChange = this._onSlotChange.bind(this);

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "tabs");

    // React to slotted children changes (Light DOM — fires on mutation observers in some browsers)
    this.addEventListener("slotchange", this._boundOnSlotChange);

    // Initial fallback only if author didn't set attribute
    if (!this.value && !this.hasAttribute("value")) {
      const firstTab = this.querySelector("hp-tab");
      if (firstTab) {
        this.value = firstTab.getAttribute("value") || "";
      }
    }

    this._syncPanels();
    requestAnimationFrame(() => this._syncPanels());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("slotchange", this._boundOnSlotChange);
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("value")) {
      this._syncPanels();
    }
  }

  private _onSlotChange() {
    this._syncPanels();
  }

  private _syncPanels() {
    try {
      const triggers = Array.from(this.querySelectorAll<HTMLElement>("hp-tab"));
      const panels = Array.from(this.querySelectorAll<HTMLElement>("hp-tab-panel"));

      triggers.forEach((trigger) => {
        const isSelected = trigger.getAttribute("value") === this.value;
        trigger.setAttribute("data-state", isSelected ? "selected" : "unselected");
        trigger.setAttribute("aria-selected", String(isSelected));
        trigger.setAttribute("tabindex", isSelected ? "0" : "-1");
      });

      panels.forEach((panel) => {
        const isSelected = panel.getAttribute("value") === this.value;
        panel.setAttribute("data-state", isSelected ? "selected" : "unselected");
        panel.setAttribute("aria-hidden", String(!isSelected));
      });
    } catch {
      // Defensive: prevent any DOM timing errors from aborting rendering
    }
  }

  activateByValue(value: string) {
    const oldValue = this.value;
    this.value = value;
    this._syncPanels();
    if (oldValue !== value) {
      this.emit("change", { value: this.value });
    }
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (name === "value" && old !== next && this.isConnected) {
      this._syncPanels();
    }
  }
}

@customElement("hp-tab-list")
export class TabList extends HeadlessElement {
  private _boundHandleKeyDown = this._handleKeyDown.bind(this);

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tablist");
    this.setAttribute("data-hp-component", "tab-list");
    this.setAttribute("data-hp-tabs-list", "");
    this.addEventListener("keydown", this._boundHandleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._boundHandleKeyDown);
  }

  private _handleKeyDown(event: KeyboardEvent) {
    const tabs = Array.from(this.querySelectorAll<HTMLElement>("hp-tab")).filter(
      (t) => !t.hasAttribute("disabled"),
    );
    const active = tabs.find((t) => t.getAttribute("aria-selected") === "true");
    const currentIndex = active ? tabs.indexOf(active) : 0;
    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        break;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== currentIndex) {
      const nextTab = tabs[nextIndex];
      const root = this.closest<Tabs>("hp-tabs");
      if (root && nextTab && typeof root.activateByValue === "function") {
        root.activateByValue(nextTab.getAttribute("value") || "");
        nextTab.focus();
      }
    }
  }
}

@customElement("hp-tab")
export class TabTrigger extends HeadlessElement {
  @property({ type: String, reflect: true }) value = "";
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _boundHandleClick = this._handleClick.bind(this);

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tab");
    this.setAttribute("data-hp-component", "tab");
    this.setAttribute("data-hp-tabs-trigger", "");
    this.addEventListener("click", this._boundHandleClick);
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "-1");
    this.setAttribute(
      "aria-disabled",
      this.disabled || this.hasAttribute("disabled") ? "true" : "false",
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._boundHandleClick);
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("disabled")) {
      this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (name === "disabled" && old !== next && this.isConnected) {
      this.setAttribute("aria-disabled", next !== null ? "true" : "false");
    }
  }

  private _handleClick() {
    if (this.disabled || this.hasAttribute("disabled")) return;
    const root = this.closest<Tabs>("hp-tabs");
    if (root && this.value && typeof root.activateByValue === "function") {
      root.activateByValue(this.value);
      this.focus();
    }
  }
}

@customElement("hp-tab-panel")
export class TabPanel extends HeadlessElement {
  @property({ type: String, reflect: true }) value = "";

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tabpanel");
    this.setAttribute("data-hp-component", "tab-panel");
    this.setAttribute("data-hp-panel", "");
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", "0");
    }
  }
}
