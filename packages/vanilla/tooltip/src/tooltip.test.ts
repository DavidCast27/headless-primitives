import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import "./index"; // triggers @customElement decorator registration
import type { HeadlessTooltip, HeadlessTooltipTrigger, HeadlessTooltipContent } from "./tooltip";

describe("HpTooltip", () => {
  let tooltip: HeadlessTooltip;
  let trigger: HeadlessTooltipTrigger;
  let content: HeadlessTooltipContent;

  beforeEach(() => {
    vi.useFakeTimers();
    tooltip = document.createElement("hp-tooltip") as HeadlessTooltip;
    trigger = document.createElement("hp-tooltip-trigger") as HeadlessTooltipTrigger;
    content = document.createElement("hp-tooltip-content") as HeadlessTooltipContent;
    content.id = "test-tooltip-content";
    tooltip.appendChild(trigger);
    tooltip.appendChild(content);
    document.body.appendChild(tooltip);
  });

  afterEach(() => {
    tooltip.remove();
    vi.useRealTimers();
  });

  it("inicializa el trigger como focusable con tabindex", () => {
    expect(trigger.getAttribute("tabindex")).toBe("0");
    expect(trigger.getAttribute("data-hp-component")).toBe("tooltip-trigger");
  });

  it("inicializa el content con role tooltip y data-state closed", () => {
    expect(content.getAttribute("role")).toBe("tooltip");
    expect(content.getAttribute("data-state")).toBe("closed");
    expect(content.getAttribute("aria-hidden")).toBe("true");
    expect(content.getAttribute("data-hp-tooltip-content")).toBe("");
  });

  it("muestra el tooltip tras el delay de mouseenter", () => {
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    vi.advanceTimersByTime(300);
    expect(content.getAttribute("data-state")).toBe("open");
    expect(content.getAttribute("aria-hidden")).toBe("false");
    expect(trigger.getAttribute("aria-describedby")).toBe(content.id);
  });

  it("oculta el tooltip tras el delay de mouseleave", () => {
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    vi.advanceTimersByTime(300);
    trigger.dispatchEvent(new MouseEvent("mouseleave"));
    vi.advanceTimersByTime(150);
    expect(content.getAttribute("data-state")).toBe("closed");
    expect(content.getAttribute("aria-hidden")).toBe("true");
    expect(trigger.hasAttribute("aria-describedby")).toBe(false);
  });

  it("muestra el tooltip inmediatamente al enfocar el trigger", () => {
    trigger.dispatchEvent(new FocusEvent("focus"));
    expect(content.getAttribute("data-state")).toBe("open");
    expect(trigger.getAttribute("aria-describedby")).toBe(content.id);
  });

  it("oculta el tooltip tras el delay de blur", () => {
    trigger.dispatchEvent(new FocusEvent("focus"));
    trigger.dispatchEvent(new FocusEvent("blur"));
    vi.advanceTimersByTime(150);
    expect(content.getAttribute("data-state")).toBe("closed");
    expect(trigger.hasAttribute("aria-describedby")).toBe(false);
  });

  it("emite hp-open y hp-close en cada transición", () => {
    let openCount = 0;
    let closeCount = 0;
    tooltip.addEventListener("hp-open", () => openCount++);
    tooltip.addEventListener("hp-close", () => closeCount++);

    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    vi.advanceTimersByTime(300);
    expect(openCount).toBe(1);

    trigger.dispatchEvent(new MouseEvent("mouseleave"));
    vi.advanceTimersByTime(150);
    expect(closeCount).toBe(1);
  });

  it("API pública show()/hide() funciona correctamente", () => {
    tooltip.show();
    expect(content.getAttribute("data-state")).toBe("open");

    tooltip.hide();
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("no emite eventos duplicados en llamadas repetidas", () => {
    let openCount = 0;
    tooltip.addEventListener("hp-open", () => openCount++);
    tooltip.show();
    tooltip.show(); // no-op
    expect(openCount).toBe(1);
  });
});
