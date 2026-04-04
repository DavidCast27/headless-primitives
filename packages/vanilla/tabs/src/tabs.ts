import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-tabs")
export class Tabs extends HeadlessElement {
  @property({ type: String, reflect: true }) value = "";

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "tabs");

    // React to slotted children changes
    this.addEventListener("slotchange", this._onSlotChange.bind(this));

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
    this.removeEventListener("slotchange", this._onSlotChange.bind(this));
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("value")) {
      this._syncPanels();
      const oldValue = changed.get("value");
      if (oldValue !== undefined) {
        this.emit("change", { value: this.value });
      }
    }
  }

  private _onSlotChange() {
    this._syncPanels();
  }

  private _syncPanels() {
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
  }

  activateByValue(value: string) {
    this.value = value;
    this._syncPanels();
  }
}

@customElement("hp-tab-list")
export class TabList extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tablist");
    this.setAttribute("data-hp-component", "tab-list");
    this.setAttribute("data-hp-tabs-list", "");
    this.addEventListener("keydown", this._handleKeyDown.bind(this));
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
      if (root && nextTab) {
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

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tab");
    this.setAttribute("data-hp-component", "tab");
    this.setAttribute("data-hp-tabs-trigger", "");
    this.addEventListener("click", this._handleClick.bind(this));
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "-1");
    this.setAttribute(
      "aria-disabled",
      this.disabled || this.hasAttribute("disabled") ? "true" : "false",
    );
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("disabled")) {
      this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    }
  }

  private _handleClick() {
    if (this.disabled || this.hasAttribute("disabled")) return;
    const root = this.closest<Tabs>("hp-tabs");
    if (root && this.value) {
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
