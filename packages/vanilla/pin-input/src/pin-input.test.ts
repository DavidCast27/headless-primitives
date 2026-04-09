import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./index"; // triggers @customElement decorator registration
import type { HeadlessPinInput } from "./pin-input";

describe("HpPinInput", () => {
  let el: HeadlessPinInput;

  beforeEach(() => {
    el = document.createElement("hp-pin-input") as HeadlessPinInput;
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
  });

  // ── Identity ──────────────────────────────────────────────────────────────

  it('sets data-hp-component="pin-input"', () => {
    expect(el.getAttribute("data-hp-component")).toBe("pin-input");
  });

  it('sets role="group"', () => {
    expect(el.getAttribute("role")).toBe("group");
  });

  it('sets data-state="incomplete" by default', () => {
    expect(el.getAttribute("data-state")).toBe("incomplete");
  });

  it('sets data-type="numeric" by default', () => {
    expect(el.getAttribute("data-type")).toBe("numeric");
  });

  it('sets aria-disabled="false" by default', () => {
    expect(el.getAttribute("aria-disabled")).toBe("false");
  });

  // ── Slot creation ─────────────────────────────────────────────────────────

  it("creates 4 input slots by default", () => {
    const inputs = el.querySelectorAll("input");
    expect(inputs.length).toBe(4);
  });

  it("creates the correct number of slots for a custom length", () => {
    const el2 = document.createElement("hp-pin-input") as HeadlessPinInput;
    el2.setAttribute("length", "6");
    document.body.appendChild(el2);
    expect(el2.querySelectorAll("input").length).toBe(6);
    el2.remove();
  });

  it("sets data-hp-pin-slot index on each input", () => {
    const inputs = el.querySelectorAll<HTMLInputElement>("input[data-hp-pin-slot]");
    expect(inputs.length).toBe(4);
    inputs.forEach((input, i) => {
      expect(input.getAttribute("data-hp-pin-slot")).toBe(String(i));
    });
  });

  it("sets inputmode=numeric on slots when type is numeric", () => {
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    inputs.forEach((input) => {
      expect(input.inputMode).toBe("numeric");
    });
  });

  it("sets inputmode=text on slots when type is alphanumeric", () => {
    el.type = "alphanumeric";
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    inputs.forEach((input) => {
      expect(input.inputMode).toBe("text");
    });
  });

  it("sets placeholder on each slot", () => {
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    inputs.forEach((input) => {
      expect(input.placeholder).toBe("○");
    });
  });

  it("uses custom placeholder when set", () => {
    el.placeholder = "_";
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    inputs.forEach((input) => {
      expect(input.placeholder).toBe("_");
    });
  });

  // ── Value ─────────────────────────────────────────────────────────────────

  it("returns empty string as value when no slots filled", () => {
    expect(el.value).toBe("");
  });

  it("returns combined value of all filled slots", () => {
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    inputs[0].value = "1";
    inputs[1].value = "2";
    inputs[2].value = "3";
    inputs[3].value = "4";
    expect(el.value).toBe("1234");
  });

  // ── data-state ────────────────────────────────────────────────────────────

  it('sets data-state="complete" when all slots filled via input event', () => {
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    inputs.forEach((input) => {
      input.value = "1";
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    expect(el.getAttribute("data-state")).toBe("complete");
  });

  it('data-state remains "incomplete" when not all slots are filled', () => {
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    inputs[0].value = "1";
    inputs[0].dispatchEvent(new Event("input", { bubbles: true }));
    expect(el.getAttribute("data-state")).toBe("incomplete");
  });

  // ── Events ────────────────────────────────────────────────────────────────

  it("emits hp-change when a slot receives input", () => {
    let detail: unknown = null;
    el.addEventListener("hp-change", (e: Event) => {
      detail = (e as CustomEvent).detail;
    });
    const input = el.querySelector<HTMLInputElement>("input")!;
    input.value = "5";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    expect(detail).toBeDefined();
    expect((detail as { value: string }).value).toBe("5");
  });

  it("emits hp-complete when all slots are filled", () => {
    let completeDetail: unknown = null;
    el.addEventListener("hp-complete", (e: Event) => {
      completeDetail = (e as CustomEvent).detail;
    });
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    inputs.forEach((input) => {
      input.value = "1";
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    expect(completeDetail).toBeDefined();
    expect((completeDetail as { value: string }).value).toBe("1111");
  });

  it("does not emit hp-complete when slots are only partially filled", () => {
    let fired = false;
    el.addEventListener("hp-complete", () => {
      fired = true;
    });
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    inputs[0].value = "1";
    inputs[0].dispatchEvent(new Event("input", { bubbles: true }));
    expect(fired).toBe(false);
  });

  // ── Keyboard — Backspace ──────────────────────────────────────────────────

  it("clears the current slot on Backspace when it has a value", () => {
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    inputs[1].value = "3";
    inputs[1].dispatchEvent(new KeyboardEvent("keydown", { key: "Backspace", bubbles: true }));
    expect(inputs[1].value).toBe("");
  });

  it("clears the previous slot and moves focus back on Backspace from empty slot", () => {
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    inputs[1].value = "7";
    // inputs[2] is empty; press Backspace on it
    inputs[2].dispatchEvent(new KeyboardEvent("keydown", { key: "Backspace", bubbles: true }));
    expect(inputs[1].value).toBe("");
  });

  // ── Keyboard — Arrow navigation ───────────────────────────────────────────

  it("moves focus left on ArrowLeft", () => {
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    let focused: Element | null = null;
    inputs[0].addEventListener("focus", () => {
      focused = inputs[0];
    });
    inputs[1].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
    expect(focused).toBe(inputs[0]);
  });

  it("moves focus right on ArrowRight", () => {
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    let focused: Element | null = null;
    inputs[1].addEventListener("focus", () => {
      focused = inputs[1];
    });
    inputs[0].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(focused).toBe(inputs[1]);
  });

  it("moves focus to first slot on Home", () => {
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    let focused: Element | null = null;
    inputs[0].addEventListener("focus", () => {
      focused = inputs[0];
    });
    inputs[3].dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true }));
    expect(focused).toBe(inputs[0]);
  });

  it("moves focus to last slot on End", () => {
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    let focused: Element | null = null;
    inputs[3].addEventListener("focus", () => {
      focused = inputs[3];
    });
    inputs[0].dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true }));
    expect(focused).toBe(inputs[3]);
  });

  // ── Paste ─────────────────────────────────────────────────────────────────

  it("distributes pasted text across slots starting from focused slot", () => {
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    const clipboardData = {
      getData: (_type: string) => "1234",
    };
    inputs[0].dispatchEvent(
      new ClipboardEvent("paste", {
        bubbles: true,
        clipboardData: clipboardData as unknown as DataTransfer,
      }),
    );
    expect(inputs[0].value).toBe("1");
    expect(inputs[1].value).toBe("2");
    expect(inputs[2].value).toBe("3");
    expect(inputs[3].value).toBe("4");
  });

  it("filters non-numeric chars from paste in numeric mode", () => {
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    const clipboardData = { getData: (_type: string) => "1a2b" };
    inputs[0].dispatchEvent(
      new ClipboardEvent("paste", {
        bubbles: true,
        clipboardData: clipboardData as unknown as DataTransfer,
      }),
    );
    expect(inputs[0].value).toBe("1");
    expect(inputs[1].value).toBe("2");
    expect(inputs[2].value).toBe("");
  });

  // ── Disabled ──────────────────────────────────────────────────────────────

  it('sets aria-disabled="true" and disables inputs when disabled=true', () => {
    el.disabled = true;
    expect(el.getAttribute("aria-disabled")).toBe("true");
    const inputs = el.querySelectorAll<HTMLInputElement>("input");
    inputs.forEach((input) => {
      expect(input.disabled).toBe(true);
    });
  });

  it("reflects disabled attribute from DOM", () => {
    const el2 = document.createElement("hp-pin-input") as HeadlessPinInput;
    el2.setAttribute("disabled", "");
    document.body.appendChild(el2);
    expect(el2.getAttribute("aria-disabled")).toBe("true");
    const inputs = el2.querySelectorAll<HTMLInputElement>("input");
    inputs.forEach((input) => {
      expect(input.disabled).toBe(true);
    });
    el2.remove();
  });

  // ── Type validation ───────────────────────────────────────────────────────

  it("accepts alphanumeric type", () => {
    el.type = "alphanumeric";
    expect(el.type).toBe("alphanumeric");
    expect(el.getAttribute("data-type")).toBe("alphanumeric");
  });

  it("falls back to numeric for invalid type", () => {
    // @ts-ignore
    el.type = "invalid";
    expect(el.type).toBe("numeric");
  });

  // ── Input value filtering ─────────────────────────────────────────────────

  it("strips non-numeric characters from input in numeric mode", () => {
    const input = el.querySelector<HTMLInputElement>("input")!;
    input.value = "a";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    expect(input.value).toBe("");
  });

  it("allows alphanumeric characters in alphanumeric mode", () => {
    el.type = "alphanumeric";
    const input = el.querySelector<HTMLInputElement>("input")!;
    input.value = "A";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    expect(input.value).toBe("A");
  });

  // ── Length change ─────────────────────────────────────────────────────────

  it("rebuilds slots when length attribute changes", () => {
    el.setAttribute("length", "6");
    expect(el.querySelectorAll("input").length).toBe(6);
  });

  it("rebuilds slots when length property changes", () => {
    el.length = 3;
    expect(el.querySelectorAll("input").length).toBe(3);
  });
});
