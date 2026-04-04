import { describe, it, expect, beforeEach } from "vitest";
import "./collapsible";

const raf = () => new Promise((r) => requestAnimationFrame(r));

function createCollapsible() {
  const collapsible = document.createElement("hp-collapsible") as any;
  const trigger = document.createElement("hp-collapsible-trigger");
  const content = document.createElement("hp-collapsible-content");
  collapsible.appendChild(trigger);
  collapsible.appendChild(content);
  document.body.appendChild(collapsible);
  return { collapsible, trigger, content };
}

describe("HeadlessCollapsible", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should register custom elements", () => {
    expect(customElements.get("hp-collapsible")).toBeDefined();
    expect(customElements.get("hp-collapsible-trigger")).toBeDefined();
    expect(customElements.get("hp-collapsible-content")).toBeDefined();
  });

  it("should initialize with closed state by default", async () => {
    const { collapsible, trigger, content } = createCollapsible();
    await raf();
    expect(collapsible.open).toBe(false);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("should initialize with open state when attribute is present", async () => {
    const collapsible = document.createElement("hp-collapsible") as any;
    collapsible.setAttribute("open", "");
    const trigger = document.createElement("hp-collapsible-trigger");
    const content = document.createElement("hp-collapsible-content");
    collapsible.appendChild(trigger);
    collapsible.appendChild(content);
    document.body.appendChild(collapsible);
    await raf();
    expect(collapsible.open).toBe(true);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(content.getAttribute("data-state")).toBe("open");
  });

  it("should toggle open state when trigger is clicked", async () => {
    const { collapsible, trigger, content } = createCollapsible();
    await raf();
    expect(collapsible.open).toBe(false);
    trigger.click();
    expect(collapsible.open).toBe(true);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(content.getAttribute("data-state")).toBe("open");
    trigger.click();
    expect(collapsible.open).toBe(false);
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("should emit events when state changes", async () => {
    const { collapsible, trigger } = createCollapsible();
    await raf();
    const openEvents: any[] = [];
    const closeEvents: any[] = [];
    const changeEvents: any[] = [];
    collapsible.addEventListener("hp-open", (e: any) => openEvents.push(e.detail));
    collapsible.addEventListener("hp-close", (e: any) => closeEvents.push(e.detail));
    collapsible.addEventListener("hp-change", (e: any) => changeEvents.push(e.detail));
    trigger.click();
    expect(openEvents).toHaveLength(1);
    expect(changeEvents[0]).toEqual({ open: true });
    trigger.click();
    expect(closeEvents).toHaveLength(1);
    expect(changeEvents[1]).toEqual({ open: false });
  });

  it("should handle keyboard interaction", async () => {
    const { collapsible, trigger } = createCollapsible();
    await raf();
    trigger.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    expect(collapsible.open).toBe(true);
    trigger.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
    expect(collapsible.open).toBe(false);
  });

  it("should handle disabled state", async () => {
    const collapsible = document.createElement("hp-collapsible") as any;
    collapsible.setAttribute("disabled", "");
    const trigger = document.createElement("hp-collapsible-trigger");
    const content = document.createElement("hp-collapsible-content");
    collapsible.appendChild(trigger);
    collapsible.appendChild(content);
    document.body.appendChild(collapsible);
    await raf();
    expect(collapsible.disabled).toBe(true);
    expect(trigger.hasAttribute("disabled")).toBe(true);
    trigger.click();
    expect(collapsible.open).toBe(false);
  });

  it("should set up proper ARIA relationships", async () => {
    const { trigger, content } = createCollapsible();
    await raf();
    expect(trigger.getAttribute("aria-controls")).toBe(content.getAttribute("id"));
    expect(content.getAttribute("aria-labelledby")).toBe(trigger.getAttribute("id"));
    expect(content.getAttribute("role")).toBe("region");
    expect(trigger.getAttribute("role")).toBe("button");
  });

  it("should allow programmatic control via properties", async () => {
    const { collapsible, trigger, content } = createCollapsible();
    await raf();
    collapsible.open = true;
    await collapsible.updateComplete;
    await new Promise((r) => setTimeout(r, 50));
    expect(collapsible.open).toBe(true);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(content.getAttribute("data-state")).toBe("open");
    collapsible.open = false;
    await collapsible.updateComplete;
    await new Promise((r) => setTimeout(r, 50));
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("should handle trigger disabled state independently", async () => {
    const { trigger } = createCollapsible();
    await raf();
    trigger.setAttribute("disabled", "");
    await (trigger as any).updateComplete;
    expect((trigger as any).disabled).toBe(true);
    expect(trigger.getAttribute("aria-disabled")).toBe("true");
    expect(trigger.hasAttribute("tabindex")).toBe(false);
  });
});

describe("HeadlessCollapsibleTrigger", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should have proper button role and tabindex", () => {
    const trigger = document.createElement("hp-collapsible-trigger");
    document.body.appendChild(trigger);
    expect(trigger.getAttribute("role")).toBe("button");
    expect(trigger.getAttribute("tabindex")).toBe("0");
  });

  it("should remove tabindex when disabled", () => {
    const trigger = document.createElement("hp-collapsible-trigger");
    trigger.setAttribute("disabled", "");
    document.body.appendChild(trigger);
    expect(trigger.hasAttribute("tabindex")).toBe(false);
    expect(trigger.getAttribute("aria-disabled")).toBe("true");
  });
});

describe("HeadlessCollapsibleContent", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should have proper region role", () => {
    const content = document.createElement("hp-collapsible-content");
    document.body.appendChild(content);
    expect(content.getAttribute("role")).toBe("region");
  });
});
