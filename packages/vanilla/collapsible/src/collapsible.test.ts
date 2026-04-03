import { describe, it, expect, beforeEach } from "vitest";

// Import the components to register them
import "./collapsible";

describe("HeadlessCollapsible", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should register custom elements", () => {
    expect(customElements.get("hp-collapsible")).toBeDefined();
    expect(customElements.get("hp-collapsible-trigger")).toBeDefined();
    expect(customElements.get("hp-collapsible-content")).toBeDefined();
  });

  it("should initialize with closed state by default", () => {
    const collapsible = document.createElement("hp-collapsible") as any;
    const trigger = document.createElement("hp-collapsible-trigger");
    const content = document.createElement("hp-collapsible-content");

    collapsible.appendChild(trigger);
    collapsible.appendChild(content);
    document.body.appendChild(collapsible);

    expect(collapsible.open).toBe(false);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(content.hasAttribute("hidden")).toBe(true);
  });

  it("should initialize with open state when attribute is present", () => {
    const collapsible = document.createElement("hp-collapsible") as any;
    collapsible.setAttribute("open", "");

    const trigger = document.createElement("hp-collapsible-trigger");
    const content = document.createElement("hp-collapsible-content");

    collapsible.appendChild(trigger);
    collapsible.appendChild(content);
    document.body.appendChild(collapsible);

    expect(collapsible.open).toBe(true);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(content.hasAttribute("hidden")).toBe(false);
  });

  it("should toggle open state when trigger is clicked", () => {
    const collapsible = document.createElement("hp-collapsible") as any;
    const trigger = document.createElement("hp-collapsible-trigger");
    const content = document.createElement("hp-collapsible-content");

    collapsible.appendChild(trigger);
    collapsible.appendChild(content);
    document.body.appendChild(collapsible);

    // Initially closed
    expect(collapsible.open).toBe(false);

    // Click to open
    trigger.click();
    expect(collapsible.open).toBe(true);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(content.hasAttribute("hidden")).toBe(false);

    // Click to close
    trigger.click();
    expect(collapsible.open).toBe(false);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(content.hasAttribute("hidden")).toBe(true);
  });

  it("should emit events when state changes", () => {
    const collapsible = document.createElement("hp-collapsible") as any;
    const trigger = document.createElement("hp-collapsible-trigger");
    const content = document.createElement("hp-collapsible-content");

    collapsible.appendChild(trigger);
    collapsible.appendChild(content);
    document.body.appendChild(collapsible);

    const openEvents: any[] = [];
    const closeEvents: any[] = [];
    const changeEvents: any[] = [];

    collapsible.addEventListener("hp-open", (e: any) => openEvents.push(e.detail));
    collapsible.addEventListener("hp-close", (e: any) => closeEvents.push(e.detail));
    collapsible.addEventListener("hp-change", (e: any) => changeEvents.push(e.detail));

    // Open
    trigger.click();
    expect(openEvents).toHaveLength(1);
    expect(openEvents[0]).toEqual({ value: true });
    expect(changeEvents).toHaveLength(1);
    expect(changeEvents[0]).toEqual({ open: true });

    // Close
    trigger.click();
    expect(closeEvents).toHaveLength(1);
    expect(closeEvents[0]).toEqual({ value: false });
    expect(changeEvents).toHaveLength(2);
    expect(changeEvents[1]).toEqual({ open: false });
  });

  it("should handle keyboard interaction", () => {
    const collapsible = document.createElement("hp-collapsible") as any;
    const trigger = document.createElement("hp-collapsible-trigger");
    const content = document.createElement("hp-collapsible-content");

    collapsible.appendChild(trigger);
    collapsible.appendChild(content);
    document.body.appendChild(collapsible);

    // Initially closed
    expect(collapsible.open).toBe(false);

    // Enter key
    trigger.focus();
    trigger.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    expect(collapsible.open).toBe(true);

    // Space key
    trigger.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
    expect(collapsible.open).toBe(false);
  });

  it("should handle disabled state", () => {
    const collapsible = document.createElement("hp-collapsible") as any;
    collapsible.setAttribute("disabled", "");

    const trigger = document.createElement("hp-collapsible-trigger");
    const content = document.createElement("hp-collapsible-content");

    collapsible.appendChild(trigger);
    collapsible.appendChild(content);
    document.body.appendChild(collapsible);

    expect(collapsible.disabled).toBe(true);
    expect(trigger.hasAttribute("disabled")).toBe(true);
    expect(trigger.getAttribute("aria-disabled")).toBe("true");
    expect(trigger.hasAttribute("tabindex")).toBe(false);

    // Click should not toggle when disabled
    trigger.click();
    expect(collapsible.open).toBe(false);
  });

  it("should set up proper ARIA relationships", () => {
    const collapsible = document.createElement("hp-collapsible") as any;
    const trigger = document.createElement("hp-collapsible-trigger");
    const content = document.createElement("hp-collapsible-content");

    collapsible.appendChild(trigger);
    collapsible.appendChild(content);
    document.body.appendChild(collapsible);

    // Check ARIA relationships
    expect(trigger.getAttribute("aria-controls")).toBe(content.getAttribute("id"));
    expect(content.getAttribute("aria-labelledby")).toBe(trigger.getAttribute("id"));
    expect(content.getAttribute("role")).toBe("region");
    expect(trigger.getAttribute("role")).toBe("button");
  });

  it("should allow programmatic control via properties", () => {
    const collapsible = document.createElement("hp-collapsible") as any;
    const trigger = document.createElement("hp-collapsible-trigger");
    const content = document.createElement("hp-collapsible-content");

    collapsible.appendChild(trigger);
    collapsible.appendChild(content);
    document.body.appendChild(collapsible);

    // Programmatic open
    collapsible.open = true;
    expect(collapsible.open).toBe(true);
    expect(collapsible.hasAttribute("open")).toBe(true);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(content.hasAttribute("hidden")).toBe(false);

    // Programmatic close
    collapsible.open = false;
    expect(collapsible.open).toBe(false);
    expect(collapsible.hasAttribute("open")).toBe(false);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(content.hasAttribute("hidden")).toBe(true);
  });

  it("should handle trigger disabled state independently", () => {
    const collapsible = document.createElement("hp-collapsible") as any;
    const trigger = document.createElement("hp-collapsible-trigger") as any;
    const content = document.createElement("hp-collapsible-content");

    collapsible.appendChild(trigger);
    collapsible.appendChild(content);
    document.body.appendChild(collapsible);

    // Set disabled after connected to DOM
    trigger.setAttribute("disabled", "");

    expect(trigger.disabled).toBe(true);
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
