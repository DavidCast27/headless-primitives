import { describe, it, expect, vi } from "vitest";
import { uid, RovingTabindex, HeadlessElement } from "./index.js";
import { customElement } from "./custom-element.js";

@customElement("test-aborter")
class TestAborter extends HeadlessElement {}

describe("Utils", () => {
  describe("uid", () => {
    it("should generate a unique ID with default prefix", () => {
      const id = uid();
      expect(id).toMatch(/^hp-[a-f0-9-]{36}$/);
    });

    it("should generate a unique ID with custom prefix", () => {
      const id = uid("custom");
      expect(id).toMatch(/^custom-[a-f0-9-]{36}$/);
    });

    it("should generate different IDs on multiple calls", () => {
      const id1 = uid();
      const id2 = uid();
      expect(id1).not.toBe(id2);
    });
  });

  describe("RovingTabindex", () => {
    it("should handle arrow navigation", () => {
      const elements = [
        document.createElement("button"),
        document.createElement("button"),
        document.createElement("button"),
      ];

      const onSelect = vi.fn();
      const roving = new RovingTabindex(elements, onSelect);

      // Test right arrow
      const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
      roving.handleKeyDown(event, elements[0]);

      expect(onSelect).toHaveBeenCalledWith(elements[1]);
    });

    it("should handle home/end navigation", () => {
      const elements = [
        document.createElement("button"),
        document.createElement("button"),
        document.createElement("button"),
      ];

      const onSelect = vi.fn();
      const roving = new RovingTabindex(elements, onSelect);

      // Test end key
      const endEvent = new KeyboardEvent("keydown", { key: "End" });
      roving.handleKeyDown(endEvent, elements[0]);

      expect(onSelect).toHaveBeenCalledWith(elements[2]);

      // Test home key
      const homeEvent = new KeyboardEvent("keydown", { key: "Home" });
      roving.handleKeyDown(homeEvent, elements[2]);

      expect(onSelect).toHaveBeenCalledWith(elements[0]);
    });

    it("should update elements list", () => {
      const elements1 = [document.createElement("button")];
      const elements2 = [document.createElement("button"), document.createElement("button")];

      const onSelect = vi.fn();
      const roving = new RovingTabindex(elements1, onSelect);

      roving.updateElements(elements2);

      const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
      roving.handleKeyDown(event, elements2[0]);

      expect(onSelect).toHaveBeenCalledWith(elements2[1]);
    });
  });

  describe("HeadlessElement.signal", () => {
    it("provides an AbortSignal that aborts on disconnect", () => {
      const el = document.createElement("test-aborter") as TestAborter;
      document.body.appendChild(el);
      const signal = el.signal;
      expect(signal.aborted).toBe(false);
      el.remove();
      expect(signal.aborted).toBe(true);
    });

    it("renews the signal after reconnect", () => {
      const el = document.createElement("test-aborter") as TestAborter;
      document.body.appendChild(el);
      const first = el.signal;
      el.remove();
      document.body.appendChild(el);
      const second = el.signal;
      expect(second).not.toBe(first);
      expect(second.aborted).toBe(false);
      expect(first.aborted).toBe(true);
    });

    it("auto-removes listeners attached with the signal", () => {
      const el = document.createElement("test-aborter") as TestAborter;
      document.body.appendChild(el);

      const handler = vi.fn();
      document.addEventListener("custom-event", handler, { signal: el.signal });

      document.dispatchEvent(new CustomEvent("custom-event"));
      expect(handler).toHaveBeenCalledTimes(1);

      el.remove();

      document.dispatchEvent(new CustomEvent("custom-event"));
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
