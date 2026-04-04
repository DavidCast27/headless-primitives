import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { HeadlessTooltip, HeadlessTooltipTrigger, HeadlessTooltipContent } from "./tooltip";

if (!customElements.get("hp-tooltip")) {
  customElements.define("hp-tooltip", HeadlessTooltip);
}
if (!customElements.get("hp-tooltip-trigger")) {
  customElements.define("hp-tooltip-trigger", HeadlessTooltipTrigger);
}
if (!customElements.get("hp-tooltip-content")) {
  customElements.define("hp-tooltip-content", HeadlessTooltipContent);
}

describe("HpTooltip (Headless Primitive Tooltip)", () => {
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

  it("debería inicializar el trigger como focusable", () => {
    expect(trigger.getAttribute("tabindex")).toBe("0");
  });

  it("debería inicializar el content con role tooltip y oculto", () => {
    expect(content.getAttribute("role")).toBe("tooltip");
    expect(content.style.visibility).toBe("hidden");
    expect(content.style.opacity).toBe("0");
  });

  it("debería mostrar el tooltip al hacer mouseenter en el trigger", () => {
    trigger.dispatchEvent(new MouseEvent("mouseenter"));

    // Esperar el delay de 300ms
    vi.advanceTimersByTime(300);

    expect(content.style.visibility).toBe("visible");
    expect(content.style.opacity).toBe("1");
    expect(content.getAttribute("aria-hidden")).toBe("false");
    expect(trigger.getAttribute("aria-describedby")).toBe(content.id);
  });

  it("debería ocultar el tooltip al hacer mouseleave en el trigger", () => {
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    vi.advanceTimersByTime(300); // Esperar show

    trigger.dispatchEvent(new MouseEvent("mouseleave"));
    vi.advanceTimersByTime(150); // Esperar hide delay

    expect(content.style.visibility).toBe("hidden");
    expect(content.style.opacity).toBe("0");
    expect(content.getAttribute("aria-hidden")).toBe("true");
    expect(trigger.hasAttribute("aria-describedby")).toBe(false);
  });

  it("debería mostrar el tooltip inmediatamente al enfocar el trigger", () => {
    trigger.dispatchEvent(new FocusEvent("focus"));

    // Focus es inmediato, sin delay
    expect(content.style.visibility).toBe("visible");
    expect(content.style.opacity).toBe("1");
    expect(trigger.getAttribute("aria-describedby")).toBe(content.id);
  });

  it("debería ocultar el tooltip al desenfocar el trigger", () => {
    trigger.dispatchEvent(new FocusEvent("focus"));
    // Focus es inmediato
    expect(content.style.visibility).toBe("visible");

    trigger.dispatchEvent(new FocusEvent("blur"));
    vi.advanceTimersByTime(150); // Esperar hide delay

    expect(content.style.visibility).toBe("hidden");
    expect(content.style.opacity).toBe("0");
    expect(trigger.hasAttribute("aria-describedby")).toBe(false);
  });

  it("debería emitir eventos hp-open y hp-close", () => {
    let openEmitted = false;
    let closeEmitted = false;

    tooltip.addEventListener("hp-open", () => (openEmitted = true));
    tooltip.addEventListener("hp-close", () => (closeEmitted = true));

    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    vi.advanceTimersByTime(300); // Esperar show delay
    expect(openEmitted).toBe(true);

    trigger.dispatchEvent(new MouseEvent("mouseleave"));
    vi.advanceTimersByTime(150); // Esperar hide delay
    expect(closeEmitted).toBe(true);
  });
});
