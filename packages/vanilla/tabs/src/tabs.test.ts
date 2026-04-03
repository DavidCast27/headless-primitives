import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./tabs.js";

function waitForInit() {
  return new Promise<void>((resolve) => Promise.resolve().then(resolve));
}

function createTabs(defaultValue?: string) {
  const root = document.createElement("hp-tabs") as HTMLElement;
  if (defaultValue) root.setAttribute("value", defaultValue);
  root.innerHTML = `
    <hp-tab-list>
      <hp-tab value="tab1">Tab 1</hp-tab>
      <hp-tab value="tab2">Tab 2</hp-tab>
      <hp-tab value="tab3">Tab 3</hp-tab>
    </hp-tab-list>
    <hp-tab-panel value="tab1">Panel 1</hp-tab-panel>
    <hp-tab-panel value="tab2">Panel 2</hp-tab-panel>
    <hp-tab-panel value="tab3">Panel 3</hp-tab-panel>
  `;
  document.body.appendChild(root);
  return root;
}

describe("Tab Components", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should register all custom elements", () => {
    expect(customElements.get("hp-tabs")).toBeDefined();
    expect(customElements.get("hp-tab-list")).toBeDefined();
    expect(customElements.get("hp-tab")).toBeDefined();
    expect(customElements.get("hp-tab-panel")).toBeDefined();
  });

  it("should set role=tablist on hp-tab-list", () => {
    const root = createTabs("tab1");
    expect(root.querySelector("hp-tab-list")!.getAttribute("role")).toBe("tablist");
  });

  it("should set role=tab on each hp-tab", () => {
    const root = createTabs("tab1");
    root.querySelectorAll("hp-tab").forEach((tab) => {
      expect(tab.getAttribute("role")).toBe("tab");
    });
  });

  it("should set role=tabpanel on each hp-tab-panel", () => {
    const root = createTabs("tab1");
    root.querySelectorAll("hp-tab-panel").forEach((panel) => {
      expect(panel.getAttribute("role")).toBe("tabpanel");
    });
  });

  it("should activate the default-value tab on init", async () => {
    const root = createTabs("tab2");
    await waitForInit();

    const tabs = root.querySelectorAll("hp-tab");
    const panels = root.querySelectorAll("hp-tab-panel");

    expect(tabs[1].getAttribute("aria-selected")).toBe("true");
    expect(tabs[1].getAttribute("tabindex")).toBe("0");
    expect(panels[1].hasAttribute("selected")).toBe(true);
    expect(panels[0].hasAttribute("selected")).toBe(false);
  });

  it("should activate tab on click and show correct panel", async () => {
    const root = createTabs("tab1");
    await waitForInit();

    const tabs = root.querySelectorAll<HTMLElement>("hp-tab");
    const panels = root.querySelectorAll("hp-tab-panel");

    tabs[1].click();

    expect(tabs[0].getAttribute("aria-selected")).toBe("false");
    expect(tabs[1].getAttribute("aria-selected")).toBe("true");
    expect(panels[0].hasAttribute("selected")).toBe(false);
    expect(panels[1].hasAttribute("selected")).toBe(true);
  });

  it("should not activate a disabled tab on click", async () => {
    const root = document.createElement("hp-tabs") as HTMLElement;
    root.setAttribute("value", "tab1");
    root.innerHTML = `
      <hp-tab-list>
        <hp-tab value="tab1">Tab 1</hp-tab>
        <hp-tab value="tab2" disabled>Tab 2</hp-tab>
      </hp-tab-list>
      <hp-tab-panel value="tab1">Panel 1</hp-tab-panel>
      <hp-tab-panel value="tab2">Panel 2</hp-tab-panel>
    `;
    document.body.appendChild(root);
    await waitForInit();

    const tabs = root.querySelectorAll<HTMLElement>("hp-tab");
    tabs[1].click();

    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
    expect(tabs[1].getAttribute("aria-selected")).toBe("false");
  });

  it("should navigate with ArrowRight and ArrowLeft", async () => {
    const root = createTabs("tab1");
    await waitForInit();

    const tabList = root.querySelector("hp-tab-list")!;
    const tabs = root.querySelectorAll("hp-tab");

    tabList.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(tabs[1].getAttribute("aria-selected")).toBe("true");

    tabList.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
  });

  it("should navigate to last/first with End/Home keys", async () => {
    const root = createTabs("tab1");
    await waitForInit();

    const tabList = root.querySelector("hp-tab-list")!;
    const tabs = root.querySelectorAll("hp-tab");

    tabList.dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true }));
    expect(tabs[2].getAttribute("aria-selected")).toBe("true");

    tabList.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true }));
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
  });

  it("should wrap around on ArrowRight from last tab", async () => {
    const root = createTabs("tab3");
    await waitForInit();

    const tabList = root.querySelector("hp-tab-list")!;
    const tabs = root.querySelectorAll("hp-tab");

    tabList.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
  });

  it("should dispatch hp-change event on activation", async () => {
    const root = createTabs("tab1");
    await waitForInit();

    const tabs = root.querySelectorAll<HTMLElement>("hp-tab");
    let detail: { value: string } | null = null;
    root.addEventListener("hp-change", (e: Event) => {
      detail = (e as CustomEvent<{ value: string }>).detail;
    });

    tabs[1].click();
    expect(detail).toEqual({ value: "tab2" });
  });
});
