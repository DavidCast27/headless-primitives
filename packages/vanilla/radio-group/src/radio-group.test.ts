import { expect, test, beforeEach, describe } from "vitest";
import "./index";
import type { HeadlessRadioGroup, HeadlessRadio } from "./radio-group";

describe("hp-radio-group", () => {
  let group: HeadlessRadioGroup;

  beforeEach(async () => {
    document.body.innerHTML = `
      <hp-radio-group value="r1">
        <hp-radio value="r1" id="r1"></hp-radio>
        <hp-radio value="r2" id="r2"></hp-radio>
        <hp-radio value="r3" id="r3"></hp-radio>
      </hp-radio-group>
    `;
    group = document.querySelector("hp-radio-group") as HeadlessRadioGroup;
    // Wait for double requestAnimationFrame sync
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });

  test("should initialize with correct role", () => {
    expect(group.getAttribute("role")).toBe("radiogroup");
  });

  test("should sync initial value with radios", () => {
    const r1 = document.getElementById("r1") as HeadlessRadio;
    const r2 = document.getElementById("r2") as HeadlessRadio;
    expect(r1.checked).toBe(true);
    expect(r2.checked).toBe(false);
  });

  test("should change value on radio click", () => {
    const r2 = document.getElementById("r2") as HeadlessRadio;
    r2.click();
    expect(group.value).toBe("r2");
    expect(r2.checked).toBe(true);
  });

  test("should handle keyboard navigation (ArrowDown)", () => {
    const r1 = document.getElementById("r1") as HeadlessRadio;
    const r2 = document.getElementById("r2") as HeadlessRadio;

    r1.focus();
    const event = new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true });
    r1.dispatchEvent(event);

    expect(group.value).toBe("r2");
    expect(r2.checked).toBe(true);
    expect(document.activeElement).toBe(r2);
  });

  test("should wrap keyboard navigation (End to Home)", () => {
    const r1 = document.getElementById("r1") as HeadlessRadio;
    const r3 = document.getElementById("r3") as HeadlessRadio;

    r3.focus();
    const event = new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true });
    r3.dispatchEvent(event);

    expect(group.value).toBe("r1");
    expect(r1.checked).toBe(true);
    expect(document.activeElement).toBe(r1);
  });
});
