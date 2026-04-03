import { describe, it, expect, vi } from "vitest";
import { uid, RovingTabindex } from "./index.js";

describe("Utils", () => {
  describe("uid", () => {
    it("should generate a unique ID with default prefix", () => {
      const id = uid();
      expect(id).toMatch(/^hp-[a-z0-9]{7}$/);
    });

    it("should generate a unique ID with custom prefix", () => {
      const id = uid("custom");
      expect(id).toMatch(/^custom-[a-z0-9]{7}$/);
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
});
