import { describe, it, expect, beforeEach, vi } from "vitest";
import "./index";
import type { HeadlessSwitch } from "./switch";

describe("hp-switch", () => {
  let sw: HeadlessSwitch;

  beforeEach(() => {
    document.body.innerHTML = '<hp-switch id="test-switch"></hp-switch>';
    sw = document.getElementById("test-switch") as HeadlessSwitch;
  });

  it("should have correct initial ARIA roles and attributes", () => {
    expect(sw.getAttribute("role")).toBe("switch");
    expect(sw.getAttribute("aria-checked")).toBe("false");
    expect(sw.getAttribute("tabindex")).toBe("0");
  });

  it("should toggle checked state on click", () => {
    sw.click();
    expect(sw.checked).toBe(true);
    expect(sw.getAttribute("aria-checked")).toBe("true");
    expect(sw.hasAttribute("checked")).toBe(true);

    sw.click();
    expect(sw.checked).toBe(false);
    expect(sw.getAttribute("aria-checked")).toBe("false");
    expect(sw.hasAttribute("checked")).toBe(false);
  });

  it("should toggle checked state on Space and Enter keys", () => {
    sw.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
    expect(sw.checked).toBe(true);

    sw.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    expect(sw.checked).toBe(false);
  });

  it("should emit hp-change event when toggled", () => {
    const handler = vi.fn();
    sw.addEventListener("hp-change", (e: any) => handler(e.detail));

    sw.click();
    expect(handler).toHaveBeenCalledWith({ checked: true });
  });

  it("should respect disabled attribute", () => {
    sw.setAttribute("disabled", "");
    expect(sw.disabled).toBe(true);
    expect(sw.getAttribute("aria-disabled")).toBe("true");
    expect(sw.hasAttribute("tabindex")).toBe(false);

    sw.click();
    expect(sw.checked).toBe(false);

    sw.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
    expect(sw.checked).toBe(false);
  });

  it("should update checked state when attribute is set", () => {
    sw.setAttribute("checked", "");
    expect(sw.checked).toBe(true);
    expect(sw.getAttribute("aria-checked")).toBe("true");

    sw.removeAttribute("checked");
    expect(sw.checked).toBe(false);
    expect(sw.getAttribute("aria-checked")).toBe("false");
  });

  it("should not expose aria-disabled when not disabled", () => {
    expect(sw.hasAttribute("aria-disabled")).toBe(false);
  });

  it("should set aria-disabled to 'true' when disabled attribute is added", () => {
    sw.setAttribute("disabled", "");
    expect(sw.getAttribute("aria-disabled")).toBe("true");
  });

  it("should remove aria-disabled when disabled attribute is removed", () => {
    sw.setAttribute("disabled", "");
    expect(sw.getAttribute("aria-disabled")).toBe("true");

    sw.removeAttribute("disabled");
    expect(sw.hasAttribute("aria-disabled")).toBe(false);
    expect(sw.getAttribute("tabindex")).toBe("0");
  });
});
