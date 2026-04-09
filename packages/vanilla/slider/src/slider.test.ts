import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./index"; // triggers @customElement decorator registration
import type { HeadlessSlider } from "./slider";

describe("HpSlider", () => {
  let el: HeadlessSlider;

  beforeEach(() => {
    el = document.createElement("hp-slider") as HeadlessSlider;
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
  });

  // ── Identity ──────────────────────────────────────────────────────────────

  it('sets data-hp-component="slider"', () => {
    expect(el.getAttribute("data-hp-component")).toBe("slider");
  });

  it('sets data-orientation="horizontal" by default', () => {
    expect(el.getAttribute("data-orientation")).toBe("horizontal");
  });

  it("does not set aria-disabled by default", () => {
    expect(el.hasAttribute("aria-disabled")).toBe(false);
  });

  // ── DOM structure ─────────────────────────────────────────────────────────

  it("creates a track element", () => {
    expect(el.querySelector("[data-hp-slider-track]")).not.toBeNull();
  });

  it("creates a range element inside the track", () => {
    const track = el.querySelector("[data-hp-slider-track]")!;
    expect(track.querySelector("[data-hp-slider-range]")).not.toBeNull();
  });

  it("creates a thumb element with role=slider", () => {
    const thumb = el.querySelector("[data-hp-slider-thumb]")!;
    expect(thumb).not.toBeNull();
    expect(thumb.getAttribute("role")).toBe("slider");
  });

  it("sets tabindex=0 on thumb by default", () => {
    const thumb = el.querySelector("[data-hp-slider-thumb]")!;
    expect(thumb.getAttribute("tabindex")).toBe("0");
  });

  // ── Defaults ──────────────────────────────────────────────────────────────

  it("has value=0 by default", () => {
    expect(el.value).toBe(0);
  });

  it("has min=0 by default", () => {
    expect(el.min).toBe(0);
  });

  it("has max=100 by default", () => {
    expect(el.max).toBe(100);
  });

  it("has step=1 by default", () => {
    expect(el.step).toBe(1);
  });

  it("has orientation=horizontal by default", () => {
    expect(el.orientation).toBe("horizontal");
  });

  // ── ARIA ──────────────────────────────────────────────────────────────────

  it("sets aria-valuemin on thumb", () => {
    const thumb = el.querySelector("[data-hp-slider-thumb]")!;
    expect(thumb.getAttribute("aria-valuemin")).toBe("0");
  });

  it("sets aria-valuemax on thumb", () => {
    const thumb = el.querySelector("[data-hp-slider-thumb]")!;
    expect(thumb.getAttribute("aria-valuemax")).toBe("100");
  });

  it("sets aria-valuenow on thumb", () => {
    const thumb = el.querySelector("[data-hp-slider-thumb]")!;
    expect(thumb.getAttribute("aria-valuenow")).toBe("0");
  });

  it("sets aria-valuetext on thumb", () => {
    const thumb = el.querySelector("[data-hp-slider-thumb]")!;
    expect(thumb.getAttribute("aria-valuetext")).toBe("0");
  });

  it("sets aria-orientation=horizontal on thumb", () => {
    const thumb = el.querySelector("[data-hp-slider-thumb]")!;
    expect(thumb.getAttribute("aria-orientation")).toBe("horizontal");
  });

  // ── Value property ────────────────────────────────────────────────────────

  it("updates aria-valuenow when value changes", () => {
    el.value = 50;
    const thumb = el.querySelector("[data-hp-slider-thumb]")!;
    expect(thumb.getAttribute("aria-valuenow")).toBe("50");
  });

  it("clamps value to min", () => {
    el.value = -10;
    expect(el.value).toBe(0);
  });

  it("clamps value to max", () => {
    el.value = 200;
    expect(el.value).toBe(100);
  });

  it("updates CSS custom property --hp-slider-percentage", () => {
    el.value = 50;
    expect(el.style.getPropertyValue("--hp-slider-percentage")).toBe("50%");
  });

  it("sets --hp-slider-percentage to 0% by default", () => {
    expect(el.style.getPropertyValue("--hp-slider-percentage")).toBe("0%");
  });

  // ── Min / Max ─────────────────────────────────────────────────────────────

  it("updates aria-valuemin when min attribute changes", () => {
    el.setAttribute("min", "10");
    const thumb = el.querySelector("[data-hp-slider-thumb]")!;
    expect(thumb.getAttribute("aria-valuemin")).toBe("10");
  });

  it("updates aria-valuemax when max attribute changes", () => {
    el.setAttribute("max", "200");
    const thumb = el.querySelector("[data-hp-slider-thumb]")!;
    expect(thumb.getAttribute("aria-valuemax")).toBe("200");
  });

  it("clamps value when min changes to be above current value", () => {
    el.value = 10;
    el.min = 20;
    expect(el.value).toBe(20);
  });

  it("clamps value when max changes to be below current value", () => {
    el.value = 80;
    el.max = 50;
    expect(el.value).toBe(50);
  });

  // ── Percentage ────────────────────────────────────────────────────────────

  it("calculates percentage correctly at midpoint", () => {
    el.value = 50;
    expect(el.percentage).toBe(50);
  });

  it("calculates percentage=0 at min", () => {
    el.value = 0;
    expect(el.percentage).toBe(0);
  });

  it("calculates percentage=100 at max", () => {
    el.value = 100;
    expect(el.percentage).toBe(100);
  });

  it("calculates percentage with custom min/max", () => {
    el.min = 0;
    el.max = 200;
    el.value = 50;
    expect(el.percentage).toBe(25);
  });

  // ── Orientation ───────────────────────────────────────────────────────────

  it("sets aria-orientation=vertical on thumb when orientation=vertical", () => {
    el.orientation = "vertical";
    const thumb = el.querySelector("[data-hp-slider-thumb]")!;
    expect(thumb.getAttribute("aria-orientation")).toBe("vertical");
  });

  it("sets data-orientation=vertical on root", () => {
    el.orientation = "vertical";
    expect(el.getAttribute("data-orientation")).toBe("vertical");
  });

  it("falls back to horizontal for invalid orientation", () => {
    // @ts-ignore
    el.orientation = "diagonal";
    expect(el.orientation).toBe("horizontal");
  });

  // ── Disabled ──────────────────────────────────────────────────────────────

  it('sets aria-disabled="true" on root when disabled', () => {
    el.disabled = true;
    expect(el.getAttribute("aria-disabled")).toBe("true");
  });

  it("sets data-disabled=true on root when disabled", () => {
    el.disabled = true;
    expect(el.getAttribute("data-disabled")).toBe("true");
  });

  it('sets tabindex="-1" on thumb when disabled', () => {
    el.disabled = true;
    const thumb = el.querySelector("[data-hp-slider-thumb]")!;
    expect(thumb.getAttribute("tabindex")).toBe("-1");
  });

  it("removes aria-disabled when re-enabled", () => {
    el.disabled = true;
    el.disabled = false;
    expect(el.hasAttribute("aria-disabled")).toBe(false);
  });

  it("reflects disabled attribute from DOM", () => {
    const el2 = document.createElement("hp-slider") as HeadlessSlider;
    el2.setAttribute("disabled", "");
    document.body.appendChild(el2);
    expect(el2.getAttribute("aria-disabled")).toBe("true");
    el2.remove();
  });

  // ── Keyboard — Arrow navigation ───────────────────────────────────────────

  it("increases value by step on ArrowRight", () => {
    el.value = 50;
    const thumb = el.querySelector<HTMLElement>("[data-hp-slider-thumb]")!;
    thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(el.value).toBe(51);
  });

  it("decreases value by step on ArrowLeft", () => {
    el.value = 50;
    const thumb = el.querySelector<HTMLElement>("[data-hp-slider-thumb]")!;
    thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
    expect(el.value).toBe(49);
  });

  it("increases value by step on ArrowUp", () => {
    el.value = 50;
    const thumb = el.querySelector<HTMLElement>("[data-hp-slider-thumb]")!;
    thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }));
    expect(el.value).toBe(51);
  });

  it("decreases value by step on ArrowDown", () => {
    el.value = 50;
    const thumb = el.querySelector<HTMLElement>("[data-hp-slider-thumb]")!;
    thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
    expect(el.value).toBe(49);
  });

  it("sets value to min on Home", () => {
    el.value = 50;
    const thumb = el.querySelector<HTMLElement>("[data-hp-slider-thumb]")!;
    thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true }));
    expect(el.value).toBe(0);
  });

  it("sets value to max on End", () => {
    el.value = 50;
    const thumb = el.querySelector<HTMLElement>("[data-hp-slider-thumb]")!;
    thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true }));
    expect(el.value).toBe(100);
  });

  it("increases by 10 steps on PageUp", () => {
    el.value = 50;
    const thumb = el.querySelector<HTMLElement>("[data-hp-slider-thumb]")!;
    thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "PageUp", bubbles: true }));
    expect(el.value).toBe(60);
  });

  it("decreases by 10 steps on PageDown", () => {
    el.value = 50;
    const thumb = el.querySelector<HTMLElement>("[data-hp-slider-thumb]")!;
    thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "PageDown", bubbles: true }));
    expect(el.value).toBe(40);
  });

  it("does not go below min on ArrowLeft at min", () => {
    el.value = 0;
    const thumb = el.querySelector<HTMLElement>("[data-hp-slider-thumb]")!;
    thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
    expect(el.value).toBe(0);
  });

  it("does not go above max on ArrowRight at max", () => {
    el.value = 100;
    const thumb = el.querySelector<HTMLElement>("[data-hp-slider-thumb]")!;
    thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(el.value).toBe(100);
  });

  it("ignores keydown when disabled", () => {
    el.value = 50;
    el.disabled = true;
    const thumb = el.querySelector<HTMLElement>("[data-hp-slider-thumb]")!;
    thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(el.value).toBe(50);
  });

  // ── Step ─────────────────────────────────────────────────────────────────

  it("snaps to step increments", () => {
    el.step = 5;
    el.value = 50;
    const thumb = el.querySelector<HTMLElement>("[data-hp-slider-thumb]")!;
    thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(el.value).toBe(55);
  });

  it("reads step attribute from DOM", () => {
    const el2 = document.createElement("hp-slider") as HeadlessSlider;
    el2.setAttribute("step", "0.5");
    document.body.appendChild(el2);
    expect(el2.step).toBe(0.5);
    el2.remove();
  });

  // ── Events ────────────────────────────────────────────────────────────────

  it("emits hp-change on keyboard navigation", () => {
    let detail: unknown = null;
    el.addEventListener("hp-change", (e: Event) => {
      detail = (e as CustomEvent).detail;
    });
    el.value = 50;
    const thumb = el.querySelector<HTMLElement>("[data-hp-slider-thumb]")!;
    thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(detail).toBeDefined();
    expect((detail as { value: number }).value).toBe(51);
  });

  it("emits hp-input on keyboard navigation", () => {
    let detail: unknown = null;
    el.addEventListener("hp-input", (e: Event) => {
      detail = (e as CustomEvent).detail;
    });
    el.value = 50;
    const thumb = el.querySelector<HTMLElement>("[data-hp-slider-thumb]")!;
    thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(detail).toBeDefined();
    expect((detail as { value: number }).value).toBe(51);
  });

  it("does not emit hp-change when value does not change", () => {
    let fired = false;
    el.addEventListener("hp-change", () => {
      fired = true;
    });
    el.value = 0;
    const thumb = el.querySelector<HTMLElement>("[data-hp-slider-thumb]")!;
    thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
    expect(fired).toBe(false);
  });

  // ── DOM structure — rail ──────────────────────────────────────────────────

  it("creates a rail element wrapping track and thumb", () => {
    const rail = el.querySelector("[data-hp-slider-rail]")!;
    expect(rail).not.toBeNull();
    expect(rail.querySelector("[data-hp-slider-track]")).not.toBeNull();
    expect(rail.querySelector("[data-hp-slider-thumb]")).not.toBeNull();
  });

  // ── Label ─────────────────────────────────────────────────────────────────

  it("does not create header by default", () => {
    expect(el.querySelector("[data-hp-slider-header]")).toBeNull();
  });

  it("creates header with label when label attribute is set", () => {
    el.setAttribute("label", "Volume");
    const header = el.querySelector("[data-hp-slider-header]")!;
    expect(header).not.toBeNull();
    const labelEl = header.querySelector("[data-hp-slider-label]")!;
    expect(labelEl.textContent).toBe("Volume");
  });

  it("creates header with output when show-value is set", () => {
    el.setAttribute("show-value", "");
    const header = el.querySelector("[data-hp-slider-header]")!;
    expect(header).not.toBeNull();
    const output = header.querySelector("[data-hp-slider-output]")!;
    expect(output).not.toBeNull();
  });

  it("output shows current value", () => {
    el.setAttribute("show-value", "");
    el.value = 42;
    const output = el.querySelector("[data-hp-slider-output]")!;
    expect(output.textContent).toBe("42");
  });

  it("output appends value-suffix", () => {
    el.setAttribute("show-value", "");
    el.setAttribute("value-suffix", "%");
    el.value = 60;
    const output = el.querySelector("[data-hp-slider-output]")!;
    expect(output.textContent).toBe("60%");
  });

  it("aria-valuetext includes value-suffix", () => {
    el.setAttribute("show-value", "");
    el.setAttribute("value-suffix", "%");
    el.value = 60;
    const thumb = el.querySelector("[data-hp-slider-thumb]")!;
    expect(thumb.getAttribute("aria-valuetext")).toBe("60%");
  });

  it("sets aria-labelledby on thumb when label is set", () => {
    el.setAttribute("label", "Brightness");
    const thumb = el.querySelector("[data-hp-slider-thumb]")!;
    expect(thumb.getAttribute("aria-labelledby")).toBeTruthy();
  });

  it("removes header when label and show-value are both removed", () => {
    el.setAttribute("label", "Volume");
    el.setAttribute("show-value", "");
    el.removeAttribute("label");
    el.removeAttribute("show-value");
    expect(el.querySelector("[data-hp-slider-header]")).toBeNull();
  });

  it("reads label attribute from DOM on connect", () => {
    const el2 = document.createElement("hp-slider") as HeadlessSlider;
    el2.setAttribute("label", "Bass");
    document.body.appendChild(el2);
    expect(el2.querySelector("[data-hp-slider-label]")?.textContent).toBe("Bass");
    el2.remove();
  });

  it("reads show-value attribute from DOM on connect", () => {
    const el2 = document.createElement("hp-slider") as HeadlessSlider;
    el2.setAttribute("show-value", "");
    el2.setAttribute("value-suffix", "px");
    el2.setAttribute("value", "30");
    document.body.appendChild(el2);
    expect(el2.querySelector("[data-hp-slider-output]")?.textContent).toBe("30px");
    el2.remove();
  });

  // ── Attribute reflection ──────────────────────────────────────────────────

  it("reads value attribute from DOM", () => {
    const el2 = document.createElement("hp-slider") as HeadlessSlider;
    el2.setAttribute("value", "75");
    document.body.appendChild(el2);
    expect(el2.value).toBe(75);
    el2.remove();
  });

  it("reads min attribute from DOM", () => {
    const el2 = document.createElement("hp-slider") as HeadlessSlider;
    el2.setAttribute("min", "10");
    el2.setAttribute("value", "50");
    document.body.appendChild(el2);
    expect(el2.min).toBe(10);
    expect(el2.value).toBe(50);
    el2.remove();
  });

  it("reads max attribute from DOM", () => {
    const el2 = document.createElement("hp-slider") as HeadlessSlider;
    el2.setAttribute("max", "200");
    document.body.appendChild(el2);
    expect(el2.max).toBe(200);
    el2.remove();
  });

  it("reads orientation attribute from DOM", () => {
    const el2 = document.createElement("hp-slider") as HeadlessSlider;
    el2.setAttribute("orientation", "vertical");
    document.body.appendChild(el2);
    expect(el2.orientation).toBe("vertical");
    el2.remove();
  });
});
