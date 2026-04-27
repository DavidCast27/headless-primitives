import { describe, it, expect, beforeEach, vi } from "vitest";

// Import to register custom elements via @customElement decorator
import "./index";
import type { HeadlessTree } from "./tree";
import type { HeadlessTreeItem } from "./tree-item";
import type { HeadlessTreeGroup } from "./tree-group";

describe("Tree View", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("Custom element registration", () => {
    it("registers hp-tree", () => {
      expect(customElements.get("hp-tree")).toBeDefined();
    });

    it("registers hp-tree-item", () => {
      expect(customElements.get("hp-tree-item")).toBeDefined();
    });

    it("registers hp-tree-group", () => {
      expect(customElements.get("hp-tree-group")).toBeDefined();
    });
  });

  describe("HeadlessTree", () => {
    it("sets data-hp-component to tree", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      document.body.appendChild(tree);
      expect(tree.getAttribute("data-hp-component")).toBe("tree");
    });

    it("sets role=tree", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      document.body.appendChild(tree);
      expect(tree.getAttribute("role")).toBe("tree");
    });

    it("initializes selected as empty string", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      document.body.appendChild(tree);
      expect(tree.selected).toBe("");
    });

    it("does not set aria-multiselectable by default", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      document.body.appendChild(tree);
      expect(tree.hasAttribute("aria-multiselectable")).toBe(false);
    });

    it("sets aria-multiselectable=true when multi-select attribute is present", async () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      tree.setAttribute("multi-select", "");
      document.body.appendChild(tree);
      await new Promise((r) => requestAnimationFrame(r));
      expect(tree.getAttribute("aria-multiselectable")).toBe("true");
    });

    it("emits hp-select when an item is selected", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      item.setAttribute("value", "node-1");
      tree.appendChild(item);
      document.body.appendChild(tree);

      let detail: unknown = null;
      tree.addEventListener("hp-select", (e: Event) => {
        detail = (e as CustomEvent).detail;
      });

      item.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(detail).toBeDefined();
      expect((detail as { value: string }).value).toBe("node-1");
    });

    it("updates selected property on item click", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      item.setAttribute("value", "my-value");
      tree.appendChild(item);
      document.body.appendChild(tree);

      item.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(tree.selected).toBe("my-value");
    });

    it("sets tabindex=0 on first item when no selection", async () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const item1 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const item2 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      item1.setAttribute("value", "a");
      item2.setAttribute("value", "b");
      tree.appendChild(item1);
      tree.appendChild(item2);
      document.body.appendChild(tree);

      await new Promise((r) => requestAnimationFrame(r));

      expect(item1.getAttribute("tabindex")).toBe("0");
      expect(item2.getAttribute("tabindex")).toBe("-1");
    });
  });

  describe("HeadlessTreeItem", () => {
    it("sets data-hp-component to tree-item", () => {
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      document.body.appendChild(item);
      expect(item.getAttribute("data-hp-component")).toBe("tree-item");
    });

    it("sets role=treeitem", () => {
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      document.body.appendChild(item);
      expect(item.getAttribute("role")).toBe("treeitem");
    });

    it("generates a value if not provided", () => {
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      document.body.appendChild(item);
      expect(item.value).toBeTruthy();
    });

    it("uses provided value attribute", () => {
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      item.setAttribute("value", "test-node");
      document.body.appendChild(item);
      expect(item.value).toBe("test-node");
    });

    it("starts with data-state=leaf for a leaf node", () => {
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      document.body.appendChild(item);
      expect(item.getAttribute("data-state")).toBe("leaf");
    });

    it("starts with data-state=closed for an expandable node", () => {
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const group = document.createElement("hp-tree-group") as HeadlessTreeGroup;
      item.appendChild(group);
      document.body.appendChild(item);
      expect(item.getAttribute("data-state")).toBe("closed");
    });

    it("sets aria-expanded=false on expandable node initially", () => {
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const group = document.createElement("hp-tree-group") as HeadlessTreeGroup;
      item.appendChild(group);
      document.body.appendChild(item);
      expect(item.getAttribute("aria-expanded")).toBe("false");
    });

    it("sets aria-selected=false initially", () => {
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      document.body.appendChild(item);
      expect(item.getAttribute("aria-selected")).toBe("false");
    });

    it("sets aria-disabled=false initially", () => {
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      document.body.appendChild(item);
      expect(item.getAttribute("aria-disabled")).toBe("false");
    });

    it("sets aria-disabled=true when disabled", () => {
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      item.setAttribute("disabled", "");
      document.body.appendChild(item);
      expect(item.getAttribute("aria-disabled")).toBe("true");
    });

    it("expanded setter updates data-state synchronously", () => {
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const group = document.createElement("hp-tree-group") as HeadlessTreeGroup;
      item.appendChild(group);
      document.body.appendChild(item);

      item.expanded = true;
      expect(item.getAttribute("data-state")).toBe("open");
      expect(item.getAttribute("aria-expanded")).toBe("true");

      item.expanded = false;
      expect(item.getAttribute("data-state")).toBe("closed");
      expect(item.getAttribute("aria-expanded")).toBe("false");
    });

    it("SSR fallback: [expanded] attribute set before upgrade initializes data-state=open", () => {
      // Simulates SSR-rendered HTML: <hp-tree-item expanded> already in the DOM.
      // base.css shows the group via hp-tree-item[expanded] > hp-tree-group before JS runs.
      // After hydration, connectedCallback must read the attribute and set data-state="open"
      // so the post-hydration rule hp-tree-item[data-state="open"] > hp-tree-group takes over.
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const group = document.createElement("hp-tree-group") as HeadlessTreeGroup;
      item.setAttribute("expanded", "");
      item.appendChild(group);
      document.body.appendChild(item);

      expect(item.expanded).toBe(true);
      expect(item.getAttribute("data-state")).toBe("open");
      expect(item.getAttribute("aria-expanded")).toBe("true");
    });

    it("emits hp-expand when clicking a collapsed expandable item", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const group = document.createElement("hp-tree-group") as HeadlessTreeGroup;
      item.setAttribute("value", "parent");
      item.appendChild(group);
      tree.appendChild(item);
      document.body.appendChild(tree);

      let expandDetail: unknown = null;
      item.addEventListener("hp-expand", (e: Event) => {
        expandDetail = (e as CustomEvent).detail;
      });

      item.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(expandDetail).toBeDefined();
      expect((expandDetail as { value: string }).value).toBe("parent");
    });

    it("emits hp-collapse when clicking an expanded expandable item", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const group = document.createElement("hp-tree-group") as HeadlessTreeGroup;
      item.setAttribute("value", "parent");
      item.expanded = true;
      item.appendChild(group);
      tree.appendChild(item);
      document.body.appendChild(tree);

      let collapseDetail: unknown = null;
      item.addEventListener("hp-collapse", (e: Event) => {
        collapseDetail = (e as CustomEvent).detail;
      });

      item.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(collapseDetail).toBeDefined();
    });

    it("does not fire events when disabled", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      item.setAttribute("disabled", "");
      item.setAttribute("value", "disabled-node");
      tree.appendChild(item);
      document.body.appendChild(tree);

      const selectSpy = vi.fn();
      tree.addEventListener("hp-select", selectSpy);

      item.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(selectSpy).not.toHaveBeenCalled();
    });

    it("dispatches hp-expand on ArrowRight key when collapsed", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const group = document.createElement("hp-tree-group") as HeadlessTreeGroup;
      item.setAttribute("value", "expandable");
      item.appendChild(group);
      tree.appendChild(item);
      document.body.appendChild(tree);

      const expandSpy = vi.fn();
      item.addEventListener("hp-expand", expandSpy);

      item.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
      expect(expandSpy).toHaveBeenCalled();
      expect(item.expanded).toBe(true);
    });

    it("collapses on ArrowLeft key when expanded", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const group = document.createElement("hp-tree-group") as HeadlessTreeGroup;
      item.setAttribute("value", "collapsible");
      item.expanded = true;
      item.appendChild(group);
      tree.appendChild(item);
      document.body.appendChild(tree);

      const collapseSpy = vi.fn();
      item.addEventListener("hp-collapse", collapseSpy);

      item.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
      expect(collapseSpy).toHaveBeenCalled();
      expect(item.expanded).toBe(false);
    });

    it("activates on Enter key", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      item.setAttribute("value", "leaf-node");
      tree.appendChild(item);
      document.body.appendChild(tree);

      const selectSpy = vi.fn();
      tree.addEventListener("hp-select", selectSpy);

      item.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      expect(selectSpy).toHaveBeenCalled();
    });

    it("activates on Space key", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const item = document.createElement("hp-tree-item") as HeadlessTreeItem;
      item.setAttribute("value", "leaf-node");
      tree.appendChild(item);
      document.body.appendChild(tree);

      const selectSpy = vi.fn();
      tree.addEventListener("hp-select", selectSpy);

      item.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
      expect(selectSpy).toHaveBeenCalled();
    });
  });

  describe("HeadlessTreeGroup", () => {
    it("sets data-hp-component to tree-group", () => {
      const group = document.createElement("hp-tree-group") as HeadlessTreeGroup;
      document.body.appendChild(group);
      expect(group.getAttribute("data-hp-component")).toBe("tree-group");
    });

    it("sets role=group", () => {
      const group = document.createElement("hp-tree-group") as HeadlessTreeGroup;
      document.body.appendChild(group);
      expect(group.getAttribute("role")).toBe("group");
    });
  });

  describe("Tree Integration", () => {
    it("marks clicked item as selected and deselects others", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const item1 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const item2 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      item1.setAttribute("value", "a");
      item2.setAttribute("value", "b");
      tree.appendChild(item1);
      tree.appendChild(item2);
      document.body.appendChild(tree);

      item1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(item1.getAttribute("aria-selected")).toBe("true");
      expect(item2.getAttribute("aria-selected")).toBe("false");

      item2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(item1.getAttribute("aria-selected")).toBe("false");
      expect(item2.getAttribute("aria-selected")).toBe("true");
    });

    it("expands parent item to show children on click", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const parent = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const group = document.createElement("hp-tree-group") as HeadlessTreeGroup;
      const child = document.createElement("hp-tree-item") as HeadlessTreeItem;
      parent.setAttribute("value", "parent");
      child.setAttribute("value", "child");
      group.appendChild(child);
      parent.appendChild(group);
      tree.appendChild(parent);
      document.body.appendChild(tree);

      expect(parent.expanded).toBe(false);
      parent.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(parent.expanded).toBe(true);
      expect(parent.getAttribute("data-state")).toBe("open");
    });

    it("ArrowDown moves focus to next visible item", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const item1 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const item2 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      item1.setAttribute("value", "a");
      item2.setAttribute("value", "b");
      tree.appendChild(item1);
      tree.appendChild(item2);
      document.body.appendChild(tree);

      const focusSpy = vi.spyOn(item2, "focus");
      item1.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
      expect(focusSpy).toHaveBeenCalled();
    });

    it("ArrowUp moves focus to previous visible item", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const item1 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const item2 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      item1.setAttribute("value", "a");
      item2.setAttribute("value", "b");
      tree.appendChild(item1);
      tree.appendChild(item2);
      document.body.appendChild(tree);

      const focusSpy = vi.spyOn(item1, "focus");
      item2.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }));
      expect(focusSpy).toHaveBeenCalled();
    });

    it("Home moves focus to first item", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const item1 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const item2 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const item3 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      item1.setAttribute("value", "a");
      item2.setAttribute("value", "b");
      item3.setAttribute("value", "c");
      tree.appendChild(item1);
      tree.appendChild(item2);
      tree.appendChild(item3);
      document.body.appendChild(tree);

      const focusSpy = vi.spyOn(item1, "focus");
      item3.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true }));
      expect(focusSpy).toHaveBeenCalled();
    });

    it("End moves focus to last visible item", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const item1 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const item2 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const item3 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      item1.setAttribute("value", "a");
      item2.setAttribute("value", "b");
      item3.setAttribute("value", "c");
      tree.appendChild(item1);
      tree.appendChild(item2);
      tree.appendChild(item3);
      document.body.appendChild(tree);

      const focusSpy = vi.spyOn(item3, "focus");
      item1.dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true }));
      expect(focusSpy).toHaveBeenCalled();
    });

    it("collapsed children are excluded from visible items list", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const parent = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const group = document.createElement("hp-tree-group") as HeadlessTreeGroup;
      const child = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const sibling = document.createElement("hp-tree-item") as HeadlessTreeItem;
      parent.setAttribute("value", "parent");
      child.setAttribute("value", "child");
      sibling.setAttribute("value", "sibling");
      group.appendChild(child);
      parent.appendChild(group);
      tree.appendChild(parent);
      tree.appendChild(sibling);
      document.body.appendChild(tree);

      const focusSpy = vi.spyOn(sibling, "focus");
      parent.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
      expect(focusSpy).toHaveBeenCalled();
    });

    it("expanded children are included in visible items list", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const parent = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const group = document.createElement("hp-tree-group") as HeadlessTreeGroup;
      const child = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const sibling = document.createElement("hp-tree-item") as HeadlessTreeItem;
      parent.setAttribute("value", "parent");
      child.setAttribute("value", "child");
      sibling.setAttribute("value", "sibling");
      parent.expanded = true;
      group.appendChild(child);
      parent.appendChild(group);
      tree.appendChild(parent);
      tree.appendChild(sibling);
      document.body.appendChild(tree);

      const focusSpy = vi.spyOn(child, "focus");
      parent.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
      expect(focusSpy).toHaveBeenCalled();
    });

    it("ArrowRight on expanded node moves focus to first child", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const parent = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const group = document.createElement("hp-tree-group") as HeadlessTreeGroup;
      const child = document.createElement("hp-tree-item") as HeadlessTreeItem;
      parent.setAttribute("value", "parent");
      child.setAttribute("value", "child");
      parent.expanded = true;
      group.appendChild(child);
      parent.appendChild(group);
      tree.appendChild(parent);
      document.body.appendChild(tree);

      const focusSpy = vi.spyOn(child, "focus");
      parent.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
      expect(focusSpy).toHaveBeenCalled();
    });

    it("ArrowLeft on collapsed child moves focus to parent item", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      const parent = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const group = document.createElement("hp-tree-group") as HeadlessTreeGroup;
      const child = document.createElement("hp-tree-item") as HeadlessTreeItem;
      parent.setAttribute("value", "parent");
      child.setAttribute("value", "child");
      parent.expanded = true;
      group.appendChild(child);
      parent.appendChild(group);
      tree.appendChild(parent);
      document.body.appendChild(tree);

      const focusSpy = vi.spyOn(parent, "focus");
      child.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
      expect(focusSpy).toHaveBeenCalled();
    });

    it("multi-select: selecting multiple items sets aria-selected on all", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      tree.setAttribute("multi-select", "");
      const item1 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const item2 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      item1.setAttribute("value", "a");
      item2.setAttribute("value", "b");
      tree.appendChild(item1);
      tree.appendChild(item2);
      document.body.appendChild(tree);

      item1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      item2.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      expect(item1.getAttribute("aria-selected")).toBe("true");
      expect(item2.getAttribute("aria-selected")).toBe("true");
    });

    it("multi-select: clicking a selected item deselects it", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      tree.setAttribute("multi-select", "");
      const item1 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      item1.setAttribute("value", "a");
      tree.appendChild(item1);
      document.body.appendChild(tree);

      item1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(item1.getAttribute("aria-selected")).toBe("true");

      item1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(item1.getAttribute("aria-selected")).toBe("false");
    });

    it("multi-select: getSelectedValues returns all selected values", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      tree.setAttribute("multi-select", "");
      const item1 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      const item2 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      item1.setAttribute("value", "a");
      item2.setAttribute("value", "b");
      tree.appendChild(item1);
      tree.appendChild(item2);
      document.body.appendChild(tree);

      item1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      item2.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      const selected = tree.getSelectedValues();
      expect(selected.has("a")).toBe(true);
      expect(selected.has("b")).toBe(true);
    });

    it("multi-select: hp-select event includes selectedValues array", () => {
      const tree = document.createElement("hp-tree") as HeadlessTree;
      tree.setAttribute("multi-select", "");
      const item1 = document.createElement("hp-tree-item") as HeadlessTreeItem;
      item1.setAttribute("value", "a");
      tree.appendChild(item1);
      document.body.appendChild(tree);

      let detail: unknown = null;
      tree.addEventListener("hp-select", (e: Event) => {
        detail = (e as CustomEvent).detail;
      });

      item1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect((detail as { selectedValues: string[] }).selectedValues).toContain("a");
    });
  });
});
