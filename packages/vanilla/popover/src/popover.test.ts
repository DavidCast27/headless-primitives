import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { HeadlessPopover, HeadlessPopoverTrigger, HeadlessPopoverContent } from "./popover";

if (!customElements.get("hp-popover")) {
  customElements.define("hp-popover", HeadlessPopover);
}
if (!customElements.get("hp-popover-trigger")) {
  customElements.define("hp-popover-trigger", HeadlessPopoverTrigger);
}
if (!customElements.get("hp-popover-content")) {
  customElements.define("hp-popover-content", HeadlessPopoverContent);
}

describe("HpPopover (Headless Primitive Popover)", () => {
  let popover: HeadlessPopover;
  let trigger: HeadlessPopoverTrigger;
  let content: HeadlessPopoverContent;

  beforeEach(() => {
    popover = document.createElement("hp-popover") as HeadlessPopover;
    trigger = document.createElement("hp-popover-trigger") as HeadlessPopoverTrigger;
    content = document.createElement("hp-popover-content") as HeadlessPopoverContent;

    popover.appendChild(trigger);
    popover.appendChild(content);
    document.body.appendChild(popover);
  });

  afterEach(() => {
    popover.remove();
  });

  it("debería inicializar el trigger como focusable", () => {
    expect(trigger.getAttribute("tabindex")).toBe("0");
  });

  it("debería inicializar el content con role dialog y oculto", () => {
    expect(content.getAttribute("role")).toBe("dialog");
    expect(content.style.visibility).toBe("hidden");
    expect(content.style.opacity).toBe("0");
  });

  it("debería abrir el popover al hacer click en el trigger", () => {
    trigger.dispatchEvent(new MouseEvent("click"));

    expect(content.style.visibility).toBe("visible");
    expect(content.style.opacity).toBe("1");
    expect(content.getAttribute("aria-hidden")).toBe("false");
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(trigger.getAttribute("aria-controls")).toBe(content.id);
  });

  it("debería cerrar el popover al hacer click nuevamente", () => {
    trigger.dispatchEvent(new MouseEvent("click"));
    trigger.dispatchEvent(new MouseEvent("click"));

    expect(content.style.visibility).toBe("hidden");
    expect(content.style.opacity).toBe("0");
    expect(content.getAttribute("aria-hidden")).toBe("true");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("debería cerrar el popover al presionar Escape", () => {
    trigger.dispatchEvent(new MouseEvent("click"));
    // Escape listener is on document, not on content
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));

    expect(content.style.visibility).toBe("hidden");
    expect(content.style.opacity).toBe("0");
  });

  it("debería emitir eventos hp-open y hp-close", () => {
    let openEmitted = false;
    let closeEmitted = false;

    popover.addEventListener("hp-open", () => (openEmitted = true));
    popover.addEventListener("hp-close", () => (closeEmitted = true));

    trigger.dispatchEvent(new MouseEvent("click"));
    expect(openEmitted).toBe(true);

    trigger.dispatchEvent(new MouseEvent("click"));
    expect(closeEmitted).toBe(true);
  });
});
