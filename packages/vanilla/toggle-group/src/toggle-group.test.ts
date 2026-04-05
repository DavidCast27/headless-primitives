import { expect, test, beforeEach, describe } from "vitest";
import "./index";
import type { HeadlessToggleGroup, HeadlessToggle } from "./toggle-group";

describe("hp-toggle-group", () => {
  let group: HeadlessToggleGroup;
  let toggle1: HeadlessToggle;
  let toggle2: HeadlessToggle;

  beforeEach(() => {
    document.body.innerHTML = `
      <hp-toggle-group type="single">
        <hp-toggle value="option1"></hp-toggle>
        <hp-toggle value="option2"></hp-toggle>
      </hp-toggle-group>
    `;
    group = document.querySelector("hp-toggle-group") as HeadlessToggleGroup;
    toggle1 = document.querySelector("hp-toggle[value='option1']") as HeadlessToggle;
    toggle2 = document.querySelector("hp-toggle[value='option2']") as HeadlessToggle;
  });

  test("should initialize with default ARIA attributes", () => {
    expect(group.getAttribute("role")).toBe("group");
    expect(group.getAttribute("aria-orientation")).toBe("horizontal");
    expect(toggle1.getAttribute("role")).toBe("button");
    expect(toggle1.getAttribute("aria-pressed")).toBe("false");
  });

  test("should handle single toggle selection", () => {
    toggle1.click();
    expect(group.value).toEqual(["option1"]);
    expect(toggle1.pressed).toBe(true);
    expect(toggle2.pressed).toBe(false);

    // Click second toggle (should replace first)
    toggle2.click();
    expect(group.value).toEqual(["option2"]);
    expect(toggle1.pressed).toBe(false);
    expect(toggle2.pressed).toBe(true);
  });

  test("should handle multiple toggle selection", () => {
    group.setAttribute("type", "multiple");

    toggle1.click();
    expect(group.value).toEqual(["option1"]);
    expect(toggle1.pressed).toBe(true);

    toggle2.click();
    expect(group.value).toEqual(["option1", "option2"]);
    expect(toggle1.pressed).toBe(true);
    expect(toggle2.pressed).toBe(true);

    toggle1.click();
    expect(group.value).toEqual(["option2"]);
    expect(toggle1.pressed).toBe(false);
    expect(toggle2.pressed).toBe(true);
  });

  test("should emit hp-change event when value changes", () => {
    let eventFired = false;
    let eventDetail: any = null;

    group.addEventListener("hp-change", (e: any) => {
      eventFired = true;
      eventDetail = e.detail;
    });

    toggle1.click();

    expect(eventFired).toBe(true);
    expect(eventDetail.value).toEqual(["option1"]);
  });

  test("should handle keyboard navigation", () => {
    toggle1.focus();
    expect(document.activeElement).toBe(toggle1);

    // Arrow right should move to next toggle
    toggle1.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(document.activeElement).toBe(toggle2);

    // Arrow left should move back to first toggle
    toggle2.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
    expect(document.activeElement).toBe(toggle1);
  });

  test("should handle keyboard activation", () => {
    toggle1.focus();
    toggle1.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));

    expect(group.value).toEqual(["option1"]);
    expect(toggle1.pressed).toBe(true);
  });

  test("should handle disabled state", () => {
    group.setAttribute("disabled", "");

    expect(toggle1.getAttribute("disabled")).toBe("");
    expect(toggle1.getAttribute("aria-disabled")).toBe("true");
  });

  test("should handle orientation", () => {
    group.setAttribute("orientation", "vertical");
    expect(group.getAttribute("aria-orientation")).toBe("vertical");
  });
});

describe("hp-toggle", () => {
  let toggle: HeadlessToggle;

  beforeEach(() => {
    document.body.innerHTML = '<hp-toggle value="test"></hp-toggle>';
    toggle = document.querySelector("hp-toggle") as HeadlessToggle;
  });

  test("should initialize with default attributes", () => {
    expect(toggle.getAttribute("role")).toBe("button");
    expect(toggle.getAttribute("tabindex")).toBe("-1");
    expect(toggle.getAttribute("aria-pressed")).toBe("false");
  });

  test("should handle pressed state", () => {
    toggle.setAttribute("pressed", "");

    expect(toggle.getAttribute("pressed")).toBe("");
    expect(toggle.getAttribute("aria-pressed")).toBe("true");
    expect(toggle.getAttribute("tabindex")).toBe("0");
  });

  test("should emit hp-toggle-press event when clicked", () => {
    let eventFired = false;
    let eventDetail: any = null;

    toggle.addEventListener("hp-toggle-press", (e: any) => {
      eventFired = true;
      eventDetail = e.detail;
    });

    toggle.click();

    expect(eventFired).toBe(true);
    expect(eventDetail.value).toBe("test");
  });

  test("should handle disabled state", () => {
    toggle.setAttribute("disabled", "");

    expect(toggle.getAttribute("disabled")).toBe("");
    expect(toggle.getAttribute("aria-disabled")).toBe("true");
    expect(toggle.hasAttribute("tabindex")).toBe(false);

    let eventFired = false;
    toggle.addEventListener("hp-toggle-press", () => {
      eventFired = true;
    });

    toggle.click();

    expect(eventFired).toBe(false);
  });
});
