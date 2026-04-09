import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./index";
import type { HeadlessDropdownMenu } from "./dropdown-menu";

describe("HpDropdownMenu", () => {
  let root: HeadlessDropdownMenu;

  function createBasic() {
    const el = document.createElement("hp-dropdown-menu");
    el.innerHTML = `
      <hp-dropdown-menu-trigger>Actions</hp-dropdown-menu-trigger>
      <hp-dropdown-menu-content>
        <hp-dropdown-menu-label>File</hp-dropdown-menu-label>
        <hp-dropdown-menu-item value="copy">Copy</hp-dropdown-menu-item>
        <hp-dropdown-menu-item value="paste">Paste</hp-dropdown-menu-item>
        <hp-dropdown-menu-separator></hp-dropdown-menu-separator>
        <hp-dropdown-menu-item value="delete" disabled>Delete</hp-dropdown-menu-item>
      </hp-dropdown-menu-content>
    `;
    return el as HeadlessDropdownMenu;
  }

  beforeEach(() => {
    root = createBasic();
    document.body.appendChild(root);
  });

  afterEach(() => {
    root.remove();
  });

  it("sets data-hp-component on root", () => {
    expect(root.getAttribute("data-hp-component")).toBe("dropdown-menu");
  });

  it("sets data-hp-component on trigger", () => {
    const trigger = root.querySelector("hp-dropdown-menu-trigger")!;
    expect(trigger.getAttribute("data-hp-component")).toBe("dropdown-menu-trigger");
  });

  it("sets data-hp-component on content", () => {
    const content = root.querySelector("hp-dropdown-menu-content")!;
    expect(content.getAttribute("data-hp-component")).toBe("dropdown-menu-content");
  });

  it("sets data-hp-component on items", () => {
    const items = root.querySelectorAll("hp-dropdown-menu-item");
    for (const item of items) {
      expect(item.getAttribute("data-hp-component")).toBe("dropdown-menu-item");
    }
  });

  it("sets ARIA on trigger (role=button, aria-haspopup=menu)", () => {
    const trigger = root.querySelector("hp-dropdown-menu-trigger")!;
    expect(trigger.getAttribute("role")).toBe("button");
    expect(trigger.getAttribute("aria-haspopup")).toBe("menu");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("sets ARIA on content (role=menu, data-state=closed)", () => {
    const content = root.querySelector("hp-dropdown-menu-content")!;
    expect(content.getAttribute("role")).toBe("menu");
    expect(content.getAttribute("data-state")).toBe("closed");
    expect(content.getAttribute("aria-hidden")).toBe("true");
  });

  it("sets role=menuitem on items", () => {
    const items = root.querySelectorAll("hp-dropdown-menu-item");
    for (const item of items) {
      expect(item.getAttribute("role")).toBe("menuitem");
    }
  });

  it("sets role=separator on separator", () => {
    const separator = root.querySelector("hp-dropdown-menu-separator")!;
    expect(separator.getAttribute("role")).toBe("separator");
  });

  it("sets role=presentation on label", () => {
    const label = root.querySelector("hp-dropdown-menu-label")!;
    expect(label.getAttribute("role")).toBe("presentation");
  });

  it("opens and closes with click on trigger", () => {
    const trigger = root.querySelector("hp-dropdown-menu-trigger")!;
    const content = root.querySelector("hp-dropdown-menu-content")!;

    trigger.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(content.getAttribute("data-state")).toBe("open");
    expect(content.getAttribute("aria-hidden")).toBe("false");

    trigger.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(content.getAttribute("data-state")).toBe("closed");
    expect(content.getAttribute("aria-hidden")).toBe("true");
  });

  it("emits hp-select event on item activation", () => {
    let detail: any = null;
    root.addEventListener("hp-select", ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    // Open the menu
    root.openMenu();

    // Click item
    const item = root.querySelector('hp-dropdown-menu-item[value="copy"]')!;
    item.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(detail).not.toBeNull();
    expect(detail.value).toBe("copy");
    expect(detail.label).toBe("Copy");
  });

  it("does not activate disabled items on click", () => {
    let selectFired = false;
    root.addEventListener("hp-select", () => {
      selectFired = true;
    });

    root.openMenu();

    const disabledItem = root.querySelector('hp-dropdown-menu-item[value="delete"]')!;
    disabledItem.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(selectFired).toBe(false);
  });

  it("sets aria-disabled on disabled items", () => {
    const disabledItem = root.querySelector('hp-dropdown-menu-item[value="delete"]')!;
    expect(disabledItem.getAttribute("aria-disabled")).toBe("true");

    const enabledItem = root.querySelector('hp-dropdown-menu-item[value="copy"]')!;
    expect(enabledItem.getAttribute("aria-disabled")).toBe("false");
  });

  it("opens with Enter key on trigger", () => {
    const trigger = root.querySelector("hp-dropdown-menu-trigger")!;
    const content = root.querySelector("hp-dropdown-menu-content")!;

    trigger.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    expect(content.getAttribute("data-state")).toBe("open");
  });

  it("opens with Space key on trigger", () => {
    const trigger = root.querySelector("hp-dropdown-menu-trigger")!;
    const content = root.querySelector("hp-dropdown-menu-content")!;

    trigger.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
    expect(content.getAttribute("data-state")).toBe("open");
  });

  it("closes with Escape key", () => {
    const trigger = root.querySelector("hp-dropdown-menu-trigger")!;
    const content = root.querySelector("hp-dropdown-menu-content")!;

    root.openMenu();
    expect(content.getAttribute("data-state")).toBe("open");

    trigger.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("disabled root prevents opening", () => {
    root.disabled = true;
    const trigger = root.querySelector("hp-dropdown-menu-trigger")!;
    const content = root.querySelector("hp-dropdown-menu-content")!;

    trigger.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("disabled root prevents openMenu()", () => {
    root.disabled = true;
    root.openMenu();
    const content = root.querySelector("hp-dropdown-menu-content")!;
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("closes after item activation", () => {
    root.openMenu();
    const content = root.querySelector("hp-dropdown-menu-content")!;
    expect(content.getAttribute("data-state")).toBe("open");

    const item = root.querySelector('hp-dropdown-menu-item[value="paste"]')!;
    item.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("trigger has tabindex=0", () => {
    const trigger = root.querySelector("hp-dropdown-menu-trigger")!;
    expect(trigger.getAttribute("tabindex")).toBe("0");
  });

  it("items have tabindex=-1 by default", () => {
    const items = root.querySelectorAll("hp-dropdown-menu-item");
    for (const item of items) {
      expect(item.hasAttribute("tabindex")).toBe(true);
    }
  });

  it("trigger has aria-controls pointing to content id", () => {
    const trigger = root.querySelector("hp-dropdown-menu-trigger")!;
    const content = root.querySelector("hp-dropdown-menu-content")!;
    expect(trigger.getAttribute("aria-controls")).toBe(content.id);
  });

  it("toggle() opens then closes", () => {
    const content = root.querySelector("hp-dropdown-menu-content")!;
    root.toggle();
    expect(content.getAttribute("data-state")).toBe("open");
    root.toggle();
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("activates item with Enter key in menu", () => {
    let detail: any = null;
    root.addEventListener("hp-select", ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    root.openMenu("first");

    const content = root.querySelector("hp-dropdown-menu-content")!;
    content.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));

    expect(detail).not.toBeNull();
    expect(detail.value).toBe("copy");
  });

  it("navigates with ArrowDown and ArrowUp in menu", () => {
    root.openMenu("first");
    const content = root.querySelector("hp-dropdown-menu-content")!;
    const trigger = root.querySelector("hp-dropdown-menu-trigger")!;

    // First active should be "copy" (first non-disabled)
    // ArrowDown should move to "paste"
    content.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));

    const activeId = trigger.getAttribute("aria-activedescendant");
    const activeItem = root.querySelector(`#${activeId}`);
    expect(activeItem?.getAttribute("value")).toBe("paste");
  });
});
