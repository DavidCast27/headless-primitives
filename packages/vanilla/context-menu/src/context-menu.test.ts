import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./index";
import type { HeadlessContextMenu } from "./context-menu";

describe("HpContextMenu", () => {
  let root: HeadlessContextMenu;

  function createBasic() {
    const el = document.createElement("hp-context-menu");
    el.innerHTML = `
      <hp-context-menu-trigger>Right-click here</hp-context-menu-trigger>
      <hp-context-menu-content>
        <hp-context-menu-label>Edit</hp-context-menu-label>
        <hp-context-menu-item value="cut">Cut</hp-context-menu-item>
        <hp-context-menu-item value="copy">Copy</hp-context-menu-item>
        <hp-context-menu-item value="paste">Paste</hp-context-menu-item>
        <hp-context-menu-separator></hp-context-menu-separator>
        <hp-context-menu-item value="delete" disabled>Delete</hp-context-menu-item>
      </hp-context-menu-content>
    `;
    return el as HeadlessContextMenu;
  }

  function rightClick(target: Element, x = 100, y = 200) {
    target.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, clientX: x, clientY: y }));
  }

  beforeEach(() => {
    root = createBasic();
    document.body.appendChild(root);
  });

  afterEach(() => {
    root.remove();
  });

  // --- Structure tests ---

  it("sets data-hp-component on root", () => {
    expect(root.getAttribute("data-hp-component")).toBe("context-menu");
  });

  it("sets data-hp-component on trigger", () => {
    const trigger = root.querySelector("hp-context-menu-trigger")!;
    expect(trigger.getAttribute("data-hp-component")).toBe("context-menu-trigger");
  });

  it("sets data-hp-component on content", () => {
    const content = root.querySelector("hp-context-menu-content")!;
    expect(content.getAttribute("data-hp-component")).toBe("context-menu-content");
  });

  it("sets data-hp-component on items", () => {
    const items = root.querySelectorAll("hp-context-menu-item");
    for (const item of items) {
      expect(item.getAttribute("data-hp-component")).toBe("context-menu-item");
    }
  });

  // --- ARIA tests ---

  it("sets role=menu on content and data-state=closed initially", () => {
    const content = root.querySelector("hp-context-menu-content")!;
    expect(content.getAttribute("role")).toBe("menu");
    expect(content.getAttribute("data-state")).toBe("closed");
    expect(content.getAttribute("aria-hidden")).toBe("true");
  });

  it("sets role=menuitem on items", () => {
    const items = root.querySelectorAll("hp-context-menu-item");
    for (const item of items) {
      expect(item.getAttribute("role")).toBe("menuitem");
    }
  });

  it("sets role=separator on separator", () => {
    const separator = root.querySelector("hp-context-menu-separator")!;
    expect(separator.getAttribute("role")).toBe("separator");
  });

  it("sets role=presentation on label", () => {
    const label = root.querySelector("hp-context-menu-label")!;
    expect(label.getAttribute("role")).toBe("presentation");
  });

  it("sets aria-disabled on disabled items", () => {
    const disabledItem = root.querySelector('hp-context-menu-item[value="delete"]')!;
    expect(disabledItem.getAttribute("aria-disabled")).toBe("true");

    const enabledItem = root.querySelector('hp-context-menu-item[value="cut"]')!;
    expect(enabledItem.getAttribute("aria-disabled")).toBe("false");
  });

  it("trigger does NOT have role=button or aria-haspopup", () => {
    const trigger = root.querySelector("hp-context-menu-trigger")!;
    expect(trigger.hasAttribute("role")).toBe(false);
    expect(trigger.hasAttribute("aria-haspopup")).toBe(false);
    expect(trigger.hasAttribute("aria-expanded")).toBe(false);
  });

  it("items have tabindex=-1 by default", () => {
    const items = root.querySelectorAll("hp-context-menu-item");
    for (const item of items) {
      expect(item.hasAttribute("tabindex")).toBe(true);
    }
  });

  // --- Right-click trigger tests ---

  it("opens on right-click (contextmenu event)", () => {
    const trigger = root.querySelector("hp-context-menu-trigger")!;
    const content = root.querySelector("hp-context-menu-content")!;

    rightClick(trigger);
    expect(content.getAttribute("data-state")).toBe("open");
    expect(content.getAttribute("aria-hidden")).toBe("false");
  });

  it("sets data-state on trigger when open", () => {
    const trigger = root.querySelector("hp-context-menu-trigger")!;

    expect(trigger.getAttribute("data-state")).toBe("closed");
    rightClick(trigger);
    expect(trigger.getAttribute("data-state")).toBe("open");
  });

  it("opens with Shift+F10 keyboard shortcut", () => {
    const trigger = root.querySelector("hp-context-menu-trigger")!;
    const content = root.querySelector("hp-context-menu-content")!;

    trigger.dispatchEvent(
      new KeyboardEvent("keydown", { key: "F10", shiftKey: true, bubbles: true }),
    );
    expect(content.getAttribute("data-state")).toBe("open");
  });

  // --- Open/close tests ---

  it("closes with Escape key", () => {
    const trigger = root.querySelector("hp-context-menu-trigger")!;
    const content = root.querySelector("hp-context-menu-content")!;

    rightClick(trigger);
    expect(content.getAttribute("data-state")).toBe("open");

    content.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("disabled root prevents opening", () => {
    root.disabled = true;
    const trigger = root.querySelector("hp-context-menu-trigger")!;
    const content = root.querySelector("hp-context-menu-content")!;

    rightClick(trigger);
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("disabled root prevents openMenu()", () => {
    root.disabled = true;
    root.openMenu();
    const content = root.querySelector("hp-context-menu-content")!;
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("closes after item activation", () => {
    const trigger = root.querySelector("hp-context-menu-trigger")!;
    const content = root.querySelector("hp-context-menu-content")!;

    rightClick(trigger);
    expect(content.getAttribute("data-state")).toBe("open");

    const item = root.querySelector('hp-context-menu-item[value="paste"]')!;
    item.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("toggle() opens then closes", () => {
    const content = root.querySelector("hp-context-menu-content")!;
    root.toggle();
    expect(content.getAttribute("data-state")).toBe("open");
    root.toggle();
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  // --- Event tests ---

  it("emits hp-select event on item activation", () => {
    let detail: any = null;
    root.addEventListener("hp-select", ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    root.openMenu();

    const item = root.querySelector('hp-context-menu-item[value="copy"]')!;
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

    const disabledItem = root.querySelector('hp-context-menu-item[value="delete"]')!;
    disabledItem.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(selectFired).toBe(false);
  });

  // --- Keyboard navigation tests ---

  it("activates item with Enter key in menu", () => {
    let detail: any = null;
    root.addEventListener("hp-select", ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    root.openMenu("first");

    const content = root.querySelector("hp-context-menu-content")!;
    content.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));

    expect(detail).not.toBeNull();
    expect(detail.value).toBe("cut");
  });

  it("navigates with ArrowDown in menu", () => {
    root.openMenu("first");
    const content = root.querySelector("hp-context-menu-content")!;

    // First active should be "cut" (first non-disabled)
    // ArrowDown should move to "copy"
    content.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));

    const activeId = content.getAttribute("aria-activedescendant");
    const activeItem = root.querySelector(`#${activeId}`);
    expect(activeItem?.getAttribute("value")).toBe("copy");
  });

  it("skips disabled items during navigation", () => {
    root.openMenu("first");
    const content = root.querySelector("hp-context-menu-content")!;

    // Navigate: cut -> copy -> paste -> (skip delete) -> cut
    content.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
    content.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
    content.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));

    const activeId = content.getAttribute("aria-activedescendant");
    const activeItem = root.querySelector(`#${activeId}`);
    // Should wrap to "cut" (skipping disabled "delete")
    expect(activeItem?.getAttribute("value")).toBe("cut");
  });

  it("navigates to last item with End key", () => {
    root.openMenu("first");
    const content = root.querySelector("hp-context-menu-content")!;

    content.dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true }));

    const activeId = content.getAttribute("aria-activedescendant");
    const activeItem = root.querySelector(`#${activeId}`);
    // Last non-disabled item is "paste"
    expect(activeItem?.getAttribute("value")).toBe("paste");
  });

  it("navigates to first item with Home key", () => {
    root.openMenu("last");
    const content = root.querySelector("hp-context-menu-content")!;

    content.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true }));

    const activeId = content.getAttribute("aria-activedescendant");
    const activeItem = root.querySelector(`#${activeId}`);
    expect(activeItem?.getAttribute("value")).toBe("cut");
  });
});
