import { expect, test, beforeEach, describe } from "vitest";
import "./index";
import type { HeadlessCheckbox } from "./checkbox";

describe("hp-checkbox", () => {
  let checkbox: HeadlessCheckbox;

  beforeEach(() => {
    document.body.innerHTML = "<hp-checkbox></hp-checkbox>";
    checkbox = document.querySelector("hp-checkbox") as HeadlessCheckbox;
  });

  test("should initialize with default ARIA attributes", () => {
    expect(checkbox.getAttribute("role")).toBe("checkbox");
    expect(checkbox.getAttribute("aria-checked")).toBe("false");
    expect(checkbox.getAttribute("tabindex")).toBe("0");
  });

  test("should toggle state on click", () => {
    checkbox.click();
    expect(checkbox.checked).toBe(true);
    expect(checkbox.getAttribute("aria-checked")).toBe("true");

    checkbox.click();
    expect(checkbox.checked).toBe(false);
    expect(checkbox.getAttribute("aria-checked")).toBe("false");
  });

  test("should toggle state on Space key", () => {
    const event = new KeyboardEvent("keydown", { key: " " });
    checkbox.dispatchEvent(event);
    expect(checkbox.checked).toBe(true);
  });

  test("should not toggle when disabled", () => {
    checkbox.disabled = true;
    checkbox.click();
    expect(checkbox.checked).toBe(false);
  });

  test("should handle mixed state", async () => {
    checkbox.checked = "mixed";
    await (checkbox as any).updateComplete;
    expect(checkbox.getAttribute("aria-checked")).toBe("mixed");

    checkbox.click();
    expect(checkbox.checked).toBe(true);
    expect(checkbox.getAttribute("aria-checked")).toBe("true");
  });

  test("should emit hp-change event", () => {
    let changedValue: any = null;
    checkbox.addEventListener("hp-change", (e: any) => {
      changedValue = e.detail.checked;
    });

    checkbox.click();
    expect(changedValue).toBe(true);
  });

  test("setAttribute('checked','mixed') updates aria-checked", () => {
    checkbox.setAttribute("checked", "mixed");
    expect(checkbox.getAttribute("aria-checked")).toBe("mixed");
    expect(checkbox.checked).toBe("mixed");
  });

  test("removeAttribute('checked') resets to false", () => {
    checkbox.checked = true;
    checkbox.removeAttribute("checked");
    expect(checkbox.checked).toBe(false);
    expect(checkbox.getAttribute("aria-checked")).toBe("false");
  });

  test("setAttribute('disabled','') updates aria-disabled", () => {
    checkbox.setAttribute("disabled", "");
    expect(checkbox.getAttribute("aria-disabled")).toBe("true");
  });
});
