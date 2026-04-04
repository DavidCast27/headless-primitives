import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Tabs, TabList, TabTrigger, TabPanel } from "./tabs";

// Explicitly register in the test environment
if (!customElements.get("hp-tabs")) customElements.define("hp-tabs", Tabs);
if (!customElements.get("hp-tab-list")) customElements.define("hp-tab-list", TabList);
if (!customElements.get("hp-tab")) customElements.define("hp-tab", TabTrigger);
if (!customElements.get("hp-tab-panel")) customElements.define("hp-tab-panel", TabPanel);

async function waitForUpdate(element?: HTMLElement) {
  if (element && "updateComplete" in element) {
    await (element as any).updateComplete;
  }
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => setTimeout(resolve, 0));
}

function createTabs(defaultValue?: string) {
  const root = document.createElement("hp-tabs") as Tabs;
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

  it("should set role=tablist on hp-tab-list", async () => {
    const root = createTabs("tab1");
    await waitForUpdate(root);
    expect(root.querySelector("hp-tab-list")!.getAttribute("role")).toBe("tablist");
  });

  it("should have data-hp attributes for base.css", async () => {
    const root = createTabs("tab1");
    await waitForUpdate(root);
    expect(root.hasAttribute("data-hp-component")).toBe(true);
    expect(root.querySelector("hp-tab-list")!.hasAttribute("data-hp-tabs-list")).toBe(true);
    expect(root.querySelector("hp-tab")!.hasAttribute("data-hp-tabs-trigger")).toBe(true);
    expect(root.querySelector("hp-tab-panel")!.hasAttribute("data-hp-panel")).toBe(true);
  });

  it("should activate the default-value tab on init", async () => {
    const root = createTabs("tab2");
    await waitForUpdate(root);

    const tabs = root.querySelectorAll("hp-tab");
    const panels = root.querySelectorAll("hp-tab-panel");

    expect(tabs[1].getAttribute("aria-selected")).toBe("true");
    expect(tabs[1].getAttribute("data-state")).toBe("selected");

    expect(panels[1].getAttribute("data-state")).toBe("selected");
    expect(panels[1].getAttribute("aria-hidden")).toBe("false");

    expect(panels[0].getAttribute("data-state")).toBe("unselected");
    expect(panels[0].getAttribute("aria-hidden")).toBe("true");
  });

  it("should activate tab on click", async () => {
    const root = createTabs("tab1");
    await waitForUpdate(root);

    const tabs = root.querySelectorAll<HTMLElement>("hp-tab");
    const panels = root.querySelectorAll("hp-tab-panel");

    tabs[1].click();
    await waitForUpdate(root);

    expect(tabs[0].getAttribute("aria-selected")).toBe("false");
    expect(tabs[1].getAttribute("aria-selected")).toBe("true");

    expect(panels[0].getAttribute("data-state")).toBe("unselected");
    expect(panels[1].getAttribute("data-state")).toBe("selected");
  });

  it("should navigate with keyboard", async () => {
    const root = createTabs("tab1");
    await waitForUpdate(root);

    const tabList = root.querySelector("hp-tab-list")!;
    const tabs = root.querySelectorAll("hp-tab");

    tabList.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    await waitForUpdate(root);
    expect(tabs[1].getAttribute("aria-selected")).toBe("true");

    tabList.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
    await waitForUpdate(root);
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
  });

  it("should dispatch hp-change event", async () => {
    const root = createTabs("tab1");
    await waitForUpdate(root);

    let detail: any = null;
    root.addEventListener("hp-change", (e: any) => {
      detail = e.detail;
    });

    root.activateByValue("tab2");
    await waitForUpdate(root);
    expect(detail).toEqual({ value: "tab2" });
  });

  it("should not activate disabled tab on click and reflect aria-disabled", async () => {
    const root = createTabs("tab1");
    await waitForUpdate(root);

    const tabs = root.querySelectorAll<HTMLElement>("hp-tab");

    // Disable second tab
    tabs[1].setAttribute("disabled", "");
    await waitForUpdate(root);

    expect(tabs[1].getAttribute("aria-disabled")).toBe("true");

    // Try clicking disabled tab — should not change selection
    tabs[1].click();
    await waitForUpdate(root);
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
    expect(tabs[1].getAttribute("aria-selected")).toBe("false");
  });

  it("should react to root attribute changes (value)", async () => {
    const root = createTabs("tab1");
    await waitForUpdate(root);

    const tabs = root.querySelectorAll<HTMLElement>("hp-tab");
    const panels = root.querySelectorAll("hp-tab-panel");

    // Change via attribute only
    root.setAttribute("value", "tab3");
    await waitForUpdate(root);

    expect(tabs[2].getAttribute("aria-selected")).toBe("true");
    expect(panels[2].getAttribute("data-state")).toBe("selected");
    expect(panels[0].getAttribute("data-state")).toBe("unselected");
  });
});
