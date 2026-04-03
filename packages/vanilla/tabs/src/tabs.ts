export class Tabs extends HTMLElement {
  static readonly observedAttributes = ["value"];

  private _value = "";
  private _observer: MutationObserver | null = null;

  constructor() {
    super();
    this._observer = new MutationObserver(() => {
      this._syncPanels();
    });
  }

  connectedCallback() {
    // Read initial value from attribute — same pattern as toggle-group/collapsible
    this._value = this.getAttribute("value") || "";

    this._observer?.observe(this, { childList: true, subtree: true });

    this._syncPanels();
    requestAnimationFrame(() => {
      this._syncPanels();
    });
  }

  disconnectedCallback() {
    this._observer?.disconnect();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    if (name === "value") {
      this._value = newValue || "";
      this._syncPanels();
    }
  }

  private _syncPanels() {
    const tabs = this.getTabs();
    const panels = this.getPanels();
    if (tabs.length === 0) return;

    // If no value set, default to first tab
    if (!this._value && tabs[0]) {
      this._value = tabs[0].getAttribute("value") || "";
    }

    tabs.forEach((tab) => {
      const isActive = tab.getAttribute("value") === this._value;
      tab.setAttribute("aria-selected", String(isActive));
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    panels.forEach((panel) => {
      const isActive = panel.getAttribute("value") === this._value;
      if (isActive) {
        panel.setAttribute("selected", "");
      } else {
        panel.removeAttribute("selected");
      }
    });
  }

  getTabs(): TabTrigger[] {
    return Array.from(this.querySelectorAll<TabTrigger>("hp-tab"));
  }

  getPanels(): TabPanel[] {
    return Array.from(this.querySelectorAll<TabPanel>("hp-tab-panel"));
  }

  activateByValue(value: string) {
    this._value = value;
    this.setAttribute("value", value);
    this._syncPanels();

    this.dispatchEvent(
      new CustomEvent("hp-change", {
        detail: { value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this.setAttribute("value", val);
  }
}

export class TabList extends HTMLElement {
  connectedCallback() {
    this.setAttribute("role", "tablist");
    this.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  private _getTabs(): TabTrigger[] {
    return Array.from(this.querySelectorAll<TabTrigger>("hp-tab"));
  }

  private _getRoot(): Tabs | null {
    return this.closest("hp-tabs");
  }

  private _handleKeyDown(event: KeyboardEvent) {
    const tabs = this._getTabs().filter((t) => !t.hasAttribute("disabled"));
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
      const root = this._getRoot();
      if (root && nextTab) {
        root.activateByValue(nextTab.getAttribute("value") || "");
        nextTab.focus();
      }
    }
  }
}

export class TabTrigger extends HTMLElement {
  static readonly observedAttributes = ["disabled"];

  connectedCallback() {
    if (!this.hasAttribute("role")) this.setAttribute("role", "tab");
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "-1");
    this.addEventListener("click", this._handleClick.bind(this));
  }

  attributeChangedCallback(name: string, _old: string | null, next: string | null) {
    if (name === "disabled") {
      this.setAttribute("aria-disabled", next !== null ? "true" : "false");
    }
  }

  private _handleClick() {
    if (this.hasAttribute("disabled")) return;
    const root = this.closest<Tabs>("hp-tabs");
    const value = this.getAttribute("value");
    if (root && value) {
      root.activateByValue(value);
      this.focus();
    }
  }

  get value(): string {
    return this.getAttribute("value") || this.textContent?.trim() || "";
  }
}

export class TabPanel extends HTMLElement {
  connectedCallback() {
    if (!this.hasAttribute("role")) this.setAttribute("role", "tabpanel");
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
  }

  get value(): string {
    return this.getAttribute("value") || "";
  }
}

if (typeof window !== "undefined") {
  if (!customElements.get("hp-tabs")) customElements.define("hp-tabs", Tabs);
  if (!customElements.get("hp-tab-list")) customElements.define("hp-tab-list", TabList);
  if (!customElements.get("hp-tab")) customElements.define("hp-tab", TabTrigger);
  if (!customElements.get("hp-tab-panel")) customElements.define("hp-tab-panel", TabPanel);
}
