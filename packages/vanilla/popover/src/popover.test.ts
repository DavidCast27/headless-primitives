import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./index"; // triggers @customElement decorator registration
import type { HeadlessPopover, HeadlessPopoverTrigger, HeadlessPopoverContent } from "./popover";

describe("HpPopover", () => {
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

  it("inicializa el trigger como focusable", () => {
    expect(trigger.getAttribute("tabindex")).toBe("0");
  });

  it("inicializa el content con role dialog y data-state closed", () => {
    expect(content.getAttribute("role")).toBe("dialog");
    expect(content.getAttribute("data-state")).toBe("closed");
    expect(content.getAttribute("aria-hidden")).toBe("true");
  });

  it("abre el popover al hacer click en el trigger", () => {
    trigger.dispatchEvent(new MouseEvent("click"));
    expect(content.getAttribute("data-state")).toBe("open");
    expect(content.getAttribute("aria-hidden")).toBe("false");
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(trigger.getAttribute("aria-controls")).toBe(content.id);
  });

  it("cierra el popover al hacer click nuevamente en el trigger", () => {
    trigger.dispatchEvent(new MouseEvent("click"));
    trigger.dispatchEvent(new MouseEvent("click"));
    expect(content.getAttribute("data-state")).toBe("closed");
    expect(content.getAttribute("aria-hidden")).toBe("true");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("cierra el popover al presionar Escape", () => {
    trigger.dispatchEvent(new MouseEvent("click"));
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("cierra el popover al hacer click fuera del contenido", () => {
    trigger.dispatchEvent(new MouseEvent("click"));
    document.body.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("emite hp-open y hp-close en cada transición", () => {
    let openCount = 0;
    let closeCount = 0;
    popover.addEventListener("hp-open", () => openCount++);
    popover.addEventListener("hp-close", () => closeCount++);

    trigger.dispatchEvent(new MouseEvent("click"));
    expect(openCount).toBe(1);

    trigger.dispatchEvent(new MouseEvent("click"));
    expect(closeCount).toBe(1);
  });

  it("open()/close()/toggle() API pública funciona correctamente", () => {
    popover.open();
    expect(content.getAttribute("data-state")).toBe("open");

    popover.close();
    expect(content.getAttribute("data-state")).toBe("closed");

    popover.toggle();
    expect(content.getAttribute("data-state")).toBe("open");

    popover.toggle();
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("no emite eventos duplicados en llamadas repetidas", () => {
    let openCount = 0;
    popover.addEventListener("hp-open", () => openCount++);
    popover.open();
    popover.open(); // no-op
    expect(openCount).toBe(1);
  });

  it("no tiene inline styles de visibilidad en el content", () => {
    popover.open();
    expect(content.style.visibility).toBe("");
    expect(content.style.display).toBe("");
    expect(content.style.opacity).toBe("");
    expect(content.style.zIndex).toBe("");
  });

  it("popover content has no aria-modal attribute", async () => {
    popover.open();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    expect(content.hasAttribute("aria-modal")).toBe(false);
  });

  it("popover trigger has aria-haspopup=dialog", () => {
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
  });

  it("removing open popover does not throw on subsequent global events", () => {
    popover.open();
    popover.remove();
    expect(() => {
      window.dispatchEvent(new Event("scroll"));
      document.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    }).not.toThrow();
  });

  it("popover content has aria-labelledby/describedby when title/description present", () => {
    document.body.innerHTML = `
      <hp-popover>
        <hp-popover-trigger>Open</hp-popover-trigger>
        <hp-popover-content>
          <hp-popover-title>Hello</hp-popover-title>
          <hp-popover-description>World</hp-popover-description>
        </hp-popover-content>
      </hp-popover>
    `;
    return new Promise<void>((resolve) => {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const content = document.querySelector("hp-popover-content") as HTMLElement;
          const title = document.querySelector("hp-popover-title") as HTMLElement;
          const description = document.querySelector("hp-popover-description") as HTMLElement;
          expect(title.id).toBeTruthy();
          expect(description.id).toBeTruthy();
          expect(content.getAttribute("aria-labelledby")).toBe(title.id);
          expect(content.getAttribute("aria-describedby")).toBe(description.id);
          resolve();
        }),
      );
    });
  });
});
