import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-tabs")
export class Tabs extends HeadlessElement {
  private _value = "";

  // Setter+_sync pattern (ADR 0011): keep ARIA/state sync in sync without relying on
  // Lit's async update cycle (which happy-dom does not run).
  @property({ type: String, reflect: true })
  get value(): string {
    return this._value;
  }
  set value(v: string) {
    const old = this._value;
    this._value = v ?? "";
    if (this.isConnected) this._sync();
    this.requestUpdate("value", old);
  }

  // Store bound reference so we can properly remove it in disconnectedCallback
  private _boundOnSlotChange = this._onSlotChange.bind(this);

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "tabs");

    // React to slotted children changes (Light DOM — fires on mutation observers in some browsers)
    this.addEventListener("slotchange", this._boundOnSlotChange);

    // Initial fallback only if author didn't set attribute
    if (!this._value && !this.hasAttribute("value")) {
      const firstTab = this.querySelector("hp-tab");
      if (firstTab) {
        this._value = firstTab.getAttribute("value") || "";
      }
    }

    // Synchronous sync + rAF re-sync (VitePress / SSR-friendly per ADR 0011)
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("slotchange", this._boundOnSlotChange);
  }

  private _onSlotChange() {
    this._sync();
  }

  private _sync() {
    try {
      const triggers = Array.from(this.querySelectorAll<HTMLElement>("hp-tab"));
      const panels = Array.from(this.querySelectorAll<HTMLElement>("hp-tab-panel"));

      triggers.forEach((trigger) => {
        const tabValue = trigger.getAttribute("value") || "";
        const isSelected = tabValue === this._value;
        trigger.setAttribute("data-state", isSelected ? "selected" : "unselected");
        trigger.setAttribute("aria-selected", String(isSelected));
        trigger.setAttribute("tabindex", isSelected ? "0" : "-1");

        if (!tabValue) return;

        // Generate stable IDs based on hpId so tab/panel pairs are linked via ARIA.
        const baseId = `${this.hpId}-${tabValue}`;
        const tabId = `${baseId}-tab`;
        const panelId = `${baseId}-panel`;
        if (!trigger.id) trigger.id = tabId;
        trigger.setAttribute("aria-controls", panelId);
      });

      panels.forEach((panel) => {
        const panelValue = panel.getAttribute("value") || "";
        const isSelected = panelValue === this._value;
        panel.setAttribute("data-state", isSelected ? "selected" : "unselected");
        panel.setAttribute("aria-hidden", String(!isSelected));

        if (!panelValue) return;

        const baseId = `${this.hpId}-${panelValue}`;
        const tabId = `${baseId}-tab`;
        const panelId = `${baseId}-panel`;
        if (!panel.id) panel.id = panelId;

        // Only point aria-labelledby at a tab that actually exists.
        const matchingTrigger = triggers.find((t) => t.getAttribute("value") === panelValue);
        if (matchingTrigger) {
          // Ensure the trigger has the expected ID even if author overrode trigger.id earlier.
          panel.setAttribute("aria-labelledby", matchingTrigger.id || tabId);
        }
      });
    } catch {
      // Defensive: prevent any DOM timing errors from aborting rendering
    }
  }

  activateByValue(value: string) {
    const oldValue = this._value;
    this.value = value;
    if (oldValue !== value) {
      this.emit("change", { value: this._value });
    }
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (name === "value" && old !== next && this.isConnected) {
      // Keep internal state in sync when the attribute is set externally without
      // going through the property setter.
      this._value = next ?? "";
      this._sync();
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

  private _disabled = false;

  // Setter+_sync pattern for `disabled` (ADR 0011) — avoids relying on `updated()`.
  @property({ type: Boolean, reflect: true })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(v: boolean) {
    const old = this._disabled;
    this._disabled = !!v;
    if (this.isConnected) this._sync();
    this.requestUpdate("disabled", old);
  }

  private _boundHandleClick = this._handleClick.bind(this);

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tab");
    this.setAttribute("data-hp-component", "tab");
    this.setAttribute("data-hp-tabs-trigger", "");
    this.addEventListener("click", this._boundHandleClick);
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "-1");
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._boundHandleClick);
  }

  private _sync() {
    this.setAttribute(
      "aria-disabled",
      this._disabled || this.hasAttribute("disabled") ? "true" : "false",
    );
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (name === "disabled" && old !== next && this.isConnected) {
      this._disabled = next !== null;
      this._sync();
    }
  }

  private _handleClick() {
    if (this._disabled || this.hasAttribute("disabled")) return;
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
