import { describe, it, expect, beforeEach, vi } from "vitest";

// Import the components to register them
import "./accordion";

describe("Accordion", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("HeadlessAccordion", () => {
    it("should register custom elements", () => {
      expect(customElements.get("hp-accordion")).toBeDefined();
      expect(customElements.get("hp-accordion-item")).toBeDefined();
      expect(customElements.get("hp-accordion-trigger")).toBeDefined();
      expect(customElements.get("hp-accordion-content")).toBeDefined();
    });

    it("should initialize with default attributes", () => {
      const accordion = document.createElement("hp-accordion") as any;
      document.body.appendChild(accordion);

      expect(accordion.singlePanel).toBe(false);
      expect(accordion.disabled).toBe(false);
    });

    it("should handle single-panel attribute", () => {
      const accordion = document.createElement("hp-accordion") as any;
      accordion.setAttribute("single-panel", "");
      document.body.appendChild(accordion);

      expect(accordion.singlePanel).toBe(true);
      expect(accordion.hasAttribute("single-panel")).toBe(true);
    });

    it("should handle disabled attribute", () => {
      const accordion = document.createElement("hp-accordion") as any;
      accordion.setAttribute("disabled", "");
      document.body.appendChild(accordion);

      expect(accordion.disabled).toBe(true);
      expect(accordion.hasAttribute("disabled")).toBe(true);
    });
  });

  describe("HeadlessAccordionItem", () => {
    it("should initialize with default attributes", () => {
      const item = document.createElement("hp-accordion-item") as any;
      document.body.appendChild(item);

      expect(item.open).toBe(false);
      expect(item.disabled).toBe(false);
      expect(item.value).toBeDefined();
    });

    it("should handle open attribute", () => {
      const item = document.createElement("hp-accordion-item") as any;
      item.setAttribute("open", "");
      document.body.appendChild(item);

      expect(item.open).toBe(true);
      expect(item.hasAttribute("open")).toBe(true);
    });

    it("should handle disabled attribute", () => {
      const item = document.createElement("hp-accordion-item") as any;
      item.setAttribute("disabled", "");
      document.body.appendChild(item);

      expect(item.disabled).toBe(true);
      expect(item.hasAttribute("disabled")).toBe(true);
    });

    it("should handle value attribute", () => {
      const item = document.createElement("hp-accordion-item") as any;
      item.setAttribute("value", "test-value");
      document.body.appendChild(item);

      expect(item.value).toBe("test-value");
    });

    it("should dispatch events when toggling", () => {
      const item = document.createElement("hp-accordion-item") as any;
      document.body.appendChild(item);

      const changeSpy = vi.fn();
      const openSpy = vi.fn();
      const closeSpy = vi.fn();

      item.addEventListener("hp-change", changeSpy);
      item.addEventListener("hp-open", openSpy);
      item.addEventListener("hp-close", closeSpy);

      // Test opening
      item.open = true;
      expect(changeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { open: true, value: item.value },
        }),
      );
      expect(openSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { value: item.value },
        }),
      );

      // Test closing
      item.open = false;
      expect(changeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { open: false, value: item.value },
        }),
      );
      expect(closeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { value: item.value },
        }),
      );
    });
  });

  describe("HeadlessAccordionTrigger", () => {
    it("should have proper button role and attributes", () => {
      const trigger = document.createElement("hp-accordion-trigger") as any;
      document.body.appendChild(trigger);

      expect(trigger.getAttribute("role")).toBe("button");
      expect(trigger.getAttribute("tabindex")).toBe("0");
    });

    it("should handle disabled state", () => {
      const trigger = document.createElement("hp-accordion-trigger") as any;
      trigger.setAttribute("disabled", "");
      document.body.appendChild(trigger);

      expect(trigger.disabled).toBe(true);
      expect(trigger.getAttribute("aria-disabled")).toBe("true");
      expect(trigger.hasAttribute("tabindex")).toBe(false);
    });

    it("should dispatch click event on Enter key", () => {
      const item = document.createElement("hp-accordion-item") as any;
      const trigger = document.createElement("hp-accordion-trigger") as any;

      item.appendChild(trigger);
      document.body.appendChild(item);

      const clickSpy = vi.fn();
      trigger.addEventListener("hp-trigger-click", clickSpy);

      const event = new KeyboardEvent("keydown", { key: "Enter" });
      trigger.dispatchEvent(event);

      expect(clickSpy).toHaveBeenCalled();
    });

    it("should dispatch click event on Space key", () => {
      const item = document.createElement("hp-accordion-item") as any;
      const trigger = document.createElement("hp-accordion-trigger") as any;

      item.appendChild(trigger);
      document.body.appendChild(item);

      const clickSpy = vi.fn();
      trigger.addEventListener("hp-trigger-click", clickSpy);

      const event = new KeyboardEvent("keydown", { key: " " });
      trigger.dispatchEvent(event);

      expect(clickSpy).toHaveBeenCalled();
    });
  });

  describe("HeadlessAccordionContent", () => {
    it("should have proper region role", () => {
      const content = document.createElement("hp-accordion-content") as any;
      document.body.appendChild(content);

      expect(content.getAttribute("role")).toBe("region");
    });
  });

  describe("Accordion Integration", () => {
    it("should set up proper ARIA relationships", () => {
      const accordion = document.createElement("hp-accordion") as any;
      const item = document.createElement("hp-accordion-item") as any;
      const trigger = document.createElement("hp-accordion-trigger");
      const content = document.createElement("hp-accordion-content");

      item.appendChild(trigger);
      item.appendChild(content);
      accordion.appendChild(item);
      document.body.appendChild(accordion);

      // Check ARIA relationships
      expect(trigger.hasAttribute("id")).toBe(true);
      expect(content.hasAttribute("id")).toBe(true);
      expect(trigger.getAttribute("aria-controls")).toBe(content.getAttribute("id"));
      expect(content.getAttribute("aria-labelledby")).toBe(trigger.getAttribute("id"));
      expect(trigger.getAttribute("aria-expanded")).toBe("false");
      expect(content.hasAttribute("hidden")).toBe(true);
    });

    it("should update ARIA attributes when opening", () => {
      const accordion = document.createElement("hp-accordion") as any;
      const item = document.createElement("hp-accordion-item") as any;
      const trigger = document.createElement("hp-accordion-trigger");
      const content = document.createElement("hp-accordion-content");

      item.appendChild(trigger);
      item.appendChild(content);
      accordion.appendChild(item);
      document.body.appendChild(accordion);

      // Open the item
      item.open = true;

      expect(trigger.getAttribute("aria-expanded")).toBe("true");
      expect(content.hasAttribute("hidden")).toBe(false);
    });

    it("should handle single-panel mode", () => {
      const accordion = document.createElement("hp-accordion") as any;
      accordion.setAttribute("single-panel", "");

      const item1 = document.createElement("hp-accordion-item") as any;
      const item2 = document.createElement("hp-accordion-item") as any;
      const trigger1 = document.createElement("hp-accordion-trigger");
      const trigger2 = document.createElement("hp-accordion-trigger");
      const content1 = document.createElement("hp-accordion-content");
      const content2 = document.createElement("hp-accordion-content");

      item1.appendChild(trigger1);
      item1.appendChild(content1);
      item2.appendChild(trigger2);
      item2.appendChild(content2);

      accordion.appendChild(item1);
      accordion.appendChild(item2);
      document.body.appendChild(accordion);

      // Open first item
      item1.open = true;
      expect(item1.open).toBe(true);
      expect(item2.open).toBe(false);

      // Open second item (should close first)
      item2.open = true;
      expect(item1.open).toBe(false);
      expect(item2.open).toBe(true);
    });

    it("should inherit disabled state from accordion", () => {
      const accordion = document.createElement("hp-accordion") as any;
      accordion.setAttribute("disabled", "");

      const item = document.createElement("hp-accordion-item") as any;
      const trigger = document.createElement("hp-accordion-trigger");
      const content = document.createElement("hp-accordion-content");

      item.appendChild(trigger);
      item.appendChild(content);
      accordion.appendChild(item);
      document.body.appendChild(accordion);

      expect(trigger.hasAttribute("disabled")).toBe(true);
    });
  });
});
