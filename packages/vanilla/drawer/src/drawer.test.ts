import { describe, it, test, expect, beforeEach, afterEach } from "vitest";
import "./index"; // triggers @customElement decorator registration
import type {
  HeadlessDrawer,
  HeadlessDrawerTrigger,
  HeadlessDrawerContent,
  HeadlessDrawerBackdrop,
  HeadlessDrawerClose,
} from "./drawer";

describe("HpDrawer", () => {
  let drawer: HeadlessDrawer;
  let trigger: HeadlessDrawerTrigger;
  let content: HeadlessDrawerContent;
  let backdrop: HeadlessDrawerBackdrop;

  beforeEach(() => {
    drawer = document.createElement("hp-drawer") as HeadlessDrawer;
    trigger = document.createElement("hp-drawer-trigger") as HeadlessDrawerTrigger;
    content = document.createElement("hp-drawer-content") as HeadlessDrawerContent;
    backdrop = document.createElement("hp-drawer-backdrop") as HeadlessDrawerBackdrop;
    drawer.appendChild(trigger);
    drawer.appendChild(content);
    drawer.appendChild(backdrop);
    document.body.appendChild(drawer);
  });

  afterEach(() => {
    drawer.remove();
  });

  it("sets data-hp-component on drawer", () => {
    expect(drawer.getAttribute("data-hp-component")).toBe("drawer");
  });

  it("initializes trigger as focusable with role button", () => {
    expect(trigger.getAttribute("tabindex")).toBe("0");
    expect(trigger.getAttribute("role")).toBe("button");
  });

  it("initializes content with role dialog, aria-modal and data-state closed", () => {
    expect(content.getAttribute("role")).toBe("dialog");
    expect(content.getAttribute("aria-modal")).toBe("true");
    expect(content.getAttribute("data-state")).toBe("closed");
    expect(content.getAttribute("aria-hidden")).toBe("true");
  });

  it("sets data-hp-overlay-content and data-hp-drawer-content on content", () => {
    expect(content.hasAttribute("data-hp-overlay-content")).toBe(true);
    expect(content.hasAttribute("data-hp-drawer-content")).toBe(true);
  });

  it("sets data-hp-backdrop and data-hp-drawer-backdrop on backdrop", () => {
    expect(backdrop.hasAttribute("data-hp-backdrop")).toBe(true);
    expect(backdrop.hasAttribute("data-hp-drawer-backdrop")).toBe(true);
  });

  it("defaults position to left and sets data-position on content", () => {
    expect(drawer.position).toBe("left");
    expect(content.getAttribute("data-position")).toBe("left");
  });

  it("opens the drawer when trigger is clicked", () => {
    trigger.dispatchEvent(new MouseEvent("click"));
    expect(content.getAttribute("data-state")).toBe("open");
    expect(content.hasAttribute("aria-hidden")).toBe(false);
    expect(backdrop.getAttribute("data-state")).toBe("open");
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
  });

  it("closes the drawer when backdrop is clicked", () => {
    trigger.dispatchEvent(new MouseEvent("click"));
    backdrop.dispatchEvent(new MouseEvent("click"));
    expect(content.getAttribute("data-state")).toBe("closed");
    expect(backdrop.getAttribute("data-state")).toBe("closed");
  });

  it("closes the drawer when Escape is pressed", () => {
    trigger.dispatchEvent(new MouseEvent("click"));
    content.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("emits hp-show and hp-hide on each transition", () => {
    let showCount = 0;
    let hideCount = 0;
    drawer.addEventListener("hp-show", () => showCount++);
    drawer.addEventListener("hp-hide", () => hideCount++);

    trigger.dispatchEvent(new MouseEvent("click"));
    expect(showCount).toBe(1);

    backdrop.dispatchEvent(new MouseEvent("click"));
    expect(hideCount).toBe(1);
  });

  it("show()/hide() public API works correctly", () => {
    drawer.show();
    expect(content.getAttribute("data-state")).toBe("open");
    drawer.hide();
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("toggle() opens then closes the drawer", () => {
    drawer.toggle();
    expect(content.getAttribute("data-state")).toBe("open");
    drawer.toggle();
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("does not emit duplicate events on repeated show() calls", () => {
    let showCount = 0;
    drawer.addEventListener("hp-show", () => showCount++);
    drawer.show();
    drawer.show(); // no-op
    expect(showCount).toBe(1);
  });

  it("does not emit duplicate events on repeated hide() calls", () => {
    let hideCount = 0;
    drawer.addEventListener("hp-hide", () => hideCount++);
    drawer.show();
    drawer.hide();
    drawer.hide(); // no-op
    expect(hideCount).toBe(1);
  });

  it("isOpen reflects internal state", () => {
    expect(drawer.isOpen).toBe(false);
    drawer.show();
    expect(drawer.isOpen).toBe(true);
    drawer.hide();
    expect(drawer.isOpen).toBe(false);
  });

  it("updates data-position on content when position changes", () => {
    drawer.position = "right";
    expect(content.getAttribute("data-position")).toBe("right");
    drawer.position = "top";
    expect(content.getAttribute("data-position")).toBe("top");
    drawer.position = "bottom";
    expect(content.getAttribute("data-position")).toBe("bottom");
  });
});

describe("HpDrawerClose", () => {
  it("closes the drawer when hp-drawer-close is clicked", () => {
    const drawer = document.createElement("hp-drawer") as HeadlessDrawer;
    const trigger = document.createElement("hp-drawer-trigger") as HeadlessDrawerTrigger;
    const content = document.createElement("hp-drawer-content") as HeadlessDrawerContent;
    const closeBtn = document.createElement("hp-drawer-close") as HeadlessDrawerClose;
    content.appendChild(closeBtn);
    drawer.appendChild(trigger);
    drawer.appendChild(content);
    document.body.appendChild(drawer);

    trigger.dispatchEvent(new MouseEvent("click"));
    expect(content.getAttribute("data-state")).toBe("open");

    closeBtn.dispatchEvent(new MouseEvent("click"));
    expect(content.getAttribute("data-state")).toBe("closed");

    drawer.remove();
  });
});

describe("HpDrawerTrigger disabled", () => {
  it("disabled adds aria-disabled and removes tabindex", () => {
    const trigger = document.createElement("hp-drawer-trigger") as HeadlessDrawerTrigger;
    document.body.appendChild(trigger);

    trigger.setAttribute("disabled", "");
    expect(trigger.getAttribute("aria-disabled")).toBe("true");
    expect(trigger.hasAttribute("tabindex")).toBe(false);

    trigger.removeAttribute("disabled");
    expect(trigger.getAttribute("tabindex")).toBe("0");
    expect(trigger.hasAttribute("aria-disabled")).toBe(false);

    trigger.remove();
  });
});

describe("HpDrawerContent", () => {
  it("auto-assigns an id if none is provided", () => {
    const content = document.createElement("hp-drawer-content") as HeadlessDrawerContent;
    document.body.appendChild(content);
    expect(content.id).toMatch(/^hp-drawer-content-/);
    content.remove();
  });

  it("preserves a pre-existing id", () => {
    const content = document.createElement("hp-drawer-content") as HeadlessDrawerContent;
    content.id = "my-drawer";
    document.body.appendChild(content);
    expect(content.id).toBe("my-drawer");
    content.remove();
  });

  test("drawer content has aria-labelledby pointing to title id", () => {
    document.body.innerHTML = `
      <hp-drawer>
        <hp-drawer-trigger>Open</hp-drawer-trigger>
        <hp-drawer-content>
          <hp-drawer-title>Hello</hp-drawer-title>
          <hp-drawer-description>World</hp-drawer-description>
        </hp-drawer-content>
      </hp-drawer>
    `;
    return new Promise<void>((resolve) => {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const content = document.querySelector("hp-drawer-content") as HTMLElement;
          const title = document.querySelector("hp-drawer-title") as HTMLElement;
          const description = document.querySelector("hp-drawer-description") as HTMLElement;
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
