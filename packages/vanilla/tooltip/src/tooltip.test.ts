import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { HeadlessTooltip, HeadlessTooltipTrigger, HeadlessTooltipContent } from "./tooltip";

if (!customElements.get("hp-tooltip")) customElements.define("hp-tooltip", HeadlessTooltip);
if (!customElements.get("hp-tooltip-trigger"))
  customElements.define("hp-tooltip-trigger", HeadlessTooltipTrigger);
if (!customElements.get("hp-tooltip-content"))
  customElements.define("hp-tooltip-content", HeadlessTooltipContent);

describe("HpTooltip (Headless Primitive Tooltip)", () => {
  let tooltip: HeadlessTooltip;
  let trigger: HeadlessTooltipTrigger;
  let content: HeadlessTooltipContent;

  beforeEach(async () => {
    vi.useFakeTimers();
    tooltip = document.createElement("hp-tooltip") as HeadlessTooltip;
    trigger = document.createElement("hp-tooltip-trigger") as HeadlessTooltipTrigger;
    content = document.createElement("hp-tooltip-content") as HeadlessTooltipContent;
    content.id = "test-tooltip-content";
    tooltip.appendChild(trigger);
    tooltip.appendChild(content);
    document.body.appendChild(tooltip);
    // Wait for rAF so _attachTriggerListeners runs before tests dispatch events
    await new Promise((resolve) => requestAnimationFrame(resolve));
  });

  afterEach(() => {
    tooltip.remove();
    vi.useRealTimers();
  });

  it("debería inicializar el trigger como focusable", () => {
    expect(trigger.getAttribute("tabindex")).toBe("0");
  });

  it("debería inicializar el content con role tooltip y cerrado", () => {
    expect(content.getAttribute("role")).toBe("tooltip");
    expect(content.getAttribute("data-state")).toBe("closed");
    expect(content.getAttribute("aria-hidden")).toBe("true");
  });

  it("debería mostrar el tooltip al hacer mouseenter en el trigger", () => {
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    vi.advanceTimersByTime(300);
    expect(content.getAttribute("data-state")).toBe("open");
    expect(content.getAttribute("aria-hidden")).toBe("false");
    expect(trigger.getAttribute("aria-describedby")).toBe(content.id);
  });

  it("debería ocultar el tooltip al hacer mouseleave en el trigger", () => {
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    vi.advanceTimersByTime(300);
    trigger.dispatchEvent(new MouseEvent("mouseleave"));
    vi.advanceTimersByTime(150);
    expect(content.getAttribute("data-state")).toBe("closed");
    expect(content.getAttribute("aria-hidden")).toBe("true");
    expect(trigger.hasAttribute("aria-describedby")).toBe(false);
  });

  it("debería mostrar el tooltip inmediatamente al enfocar el trigger", () => {
    trigger.dispatchEvent(new FocusEvent("focus"));
    expect(content.getAttribute("data-state")).toBe("open");
    expect(trigger.getAttribute("aria-describedby")).toBe(content.id);
  });

  it("debería ocultar el tooltip al desenfocar el trigger", () => {
    trigger.dispatchEvent(new FocusEvent("focus"));
    expect(content.getAttribute("data-state")).toBe("open");
    trigger.dispatchEvent(new FocusEvent("blur"));
    vi.advanceTimersByTime(150);
    expect(content.getAttribute("data-state")).toBe("closed");
    expect(trigger.hasAttribute("aria-describedby")).toBe(false);
  });

  it("debería emitir eventos hp-open y hp-close", () => {
    let openEmitted = false;
    let closeEmitted = false;
    tooltip.addEventListener("hp-open", () => (openEmitted = true));
    tooltip.addEventListener("hp-close", () => (closeEmitted = true));
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    vi.advanceTimersByTime(300);
    expect(openEmitted).toBe(true);
    trigger.dispatchEvent(new MouseEvent("mouseleave"));
    vi.advanceTimersByTime(150);
    expect(closeEmitted).toBe(true);
  });
});
