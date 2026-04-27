import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-tree-item")
export class HeadlessTreeItem extends HeadlessElement {
  @property({ type: String, reflect: true }) value = "";
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) selected = false;

  private _expanded = false;

  @property({ type: Boolean, reflect: true })
  get expanded(): boolean {
    return this._expanded;
  }
  set expanded(v: boolean) {
    this._expanded = v;
    this._sync();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "tree-item");
    if (!this.hasAttribute("role")) this.setAttribute("role", "treeitem");
    if (!this.value) this.value = this.hpId;
    this.setAttribute("tabindex", "-1");
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._handleClick);
    this.removeEventListener("keydown", this._handleKeyDown);
  }

  /**
   * Returns true if this item has a hp-tree-group child (making it a parent node).
   */
  isExpandable(): boolean {
    return !!this.querySelector("hp-tree-group");
  }

  /**
   * Returns the hp-tree-group child, if any.
   */
  getGroup(): Element | null {
    return this.querySelector("hp-tree-group");
  }

  /**
   * Returns the parent hp-tree-item, if this item is nested inside one.
   */
  getParentItem(): HeadlessTreeItem | null {
    const group = this.closest("hp-tree-group");
    if (!group) return null;
    return group.closest("hp-tree-item") as HeadlessTreeItem | null;
  }

  private _handleClick = (e: MouseEvent) => {
    if (this.disabled) return;
    // Only handle clicks on this item's trigger area, not on child items
    const closestItem = (e.target as Element).closest("hp-tree-item");
    if (closestItem !== this) return;

    e.stopPropagation();
    this._activate();
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        this._activate();
        break;
      case "ArrowRight":
        e.preventDefault();
        if (this.isExpandable() && !this._expanded) {
          this.expanded = true;
          this.emit("expand", { value: this.value, item: this });
        } else if (this.isExpandable() && this._expanded) {
          // Move focus to first child item
          const firstChild = this.querySelector(
            "hp-tree-group > hp-tree-item",
          ) as HeadlessTreeItem | null;
          if (firstChild && !firstChild.disabled) firstChild.focus();
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (this.isExpandable() && this._expanded) {
          this.expanded = false;
          this.emit("collapse", { value: this.value, item: this });
        } else {
          // Move focus to parent item
          const parent = this.getParentItem();
          if (parent) parent.focus();
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        this._focusNext();
        break;
      case "ArrowUp":
        e.preventDefault();
        this._focusPrev();
        break;
      case "Home":
        e.preventDefault();
        this._focusFirst();
        break;
      case "End":
        e.preventDefault();
        this._focusLast();
        break;
    }
  };

  private _activate() {
    if (this.isExpandable()) {
      if (this._expanded) {
        this.expanded = false;
        this.emit("collapse", { value: this.value, item: this });
      } else {
        this.expanded = true;
        this.emit("expand", { value: this.value, item: this });
      }
    }
    // Always notify selection to the tree root
    this.emit("item-select", { value: this.value, item: this });
  }

  private _getTree(): Element | null {
    return this.closest("hp-tree");
  }

  private _getVisibleItems(): HeadlessTreeItem[] {
    const tree = this._getTree();
    if (!tree) return [];
    return _getVisibleTreeItems(tree as HTMLElement);
  }

  private _focusNext() {
    const items = this._getVisibleItems();
    const idx = items.indexOf(this);
    if (idx < items.length - 1) items[idx + 1].focus();
  }

  private _focusPrev() {
    const items = this._getVisibleItems();
    const idx = items.indexOf(this);
    if (idx > 0) items[idx - 1].focus();
  }

  private _focusFirst() {
    const items = this._getVisibleItems();
    if (items.length > 0) items[0].focus();
  }

  private _focusLast() {
    const items = this._getVisibleItems();
    if (items.length > 0) items[items.length - 1].focus();
  }

  private _computeDepth(): number {
    let depth = 1;
    let current = this.parentElement;
    while (current && current.tagName.toLowerCase() !== "hp-tree") {
      if (current.tagName.toLowerCase() === "hp-tree-item") depth++;
      current = current.parentElement;
    }
    return depth;
  }

  private _computeSetInfo(): { posinset: number; setsize: number } {
    const parent = this.parentElement;
    if (!parent) return { posinset: 1, setsize: 1 };
    const siblings = Array.from(parent.children).filter(
      (el) => el.tagName.toLowerCase() === "hp-tree-item",
    );
    return {
      posinset: siblings.indexOf(this) + 1,
      setsize: siblings.length,
    };
  }

  private _sync() {
    const expandable = this.isExpandable();

    if (expandable) {
      this.setAttribute("aria-expanded", String(this._expanded));
      this.setAttribute("data-state", this._expanded ? "open" : "closed");
    } else {
      this.removeAttribute("aria-expanded");
      this.setAttribute("data-state", "leaf");
    }

    this.setAttribute("aria-selected", String(this.selected));
    this.setAttribute("aria-disabled", String(this.disabled));

    // APG: expose hierarchy/position for screen readers
    this.setAttribute("aria-level", String(this._computeDepth()));
    const { posinset, setsize } = this._computeSetInfo();
    this.setAttribute("aria-posinset", String(posinset));
    this.setAttribute("aria-setsize", String(setsize));
  }
}

/**
 * Utility: collects all visible (non-hidden by collapsed ancestors) tree items
 * in DOM order within a container.
 */
export function _getVisibleTreeItems(container: HTMLElement): HeadlessTreeItem[] {
  const result: HeadlessTreeItem[] = [];

  function walk(node: Element) {
    for (const child of Array.from(node.children)) {
      if (child.tagName.toLowerCase() === "hp-tree-item") {
        const item = child as HeadlessTreeItem;
        result.push(item);
        // Only recurse into the group if the parent item is expanded
        const group = item.querySelector(":scope > hp-tree-group");
        if (group && item.expanded) {
          walk(group);
        }
      } else if (child.tagName.toLowerCase() === "hp-tree-group") {
        // Direct group child (shouldn't happen outside tree-item, but be safe)
        walk(child);
      }
    }
  }

  walk(container);
  return result;
}
