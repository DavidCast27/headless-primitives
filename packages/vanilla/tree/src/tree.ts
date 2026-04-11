import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";
import { HeadlessTreeItem, _getVisibleTreeItems } from "./tree-item";

@customElement("hp-tree")
export class HeadlessTree extends HeadlessElement {
  @property({ type: String, reflect: true }) selected = "";
  @property({ type: Boolean, reflect: true, attribute: "multi-select" }) multiSelect = false;

  /** Tracks selected values when multiSelect is enabled */
  private _selectedValues = new Set<string>();

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "tree");
    if (!this.hasAttribute("role")) this.setAttribute("role", "tree");
    this.addEventListener("hp-item-select", this._handleItemSelect as EventListener);
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("hp-item-select", this._handleItemSelect as EventListener);
  }

  /** Returns the set of selected values (useful in multi-select mode). */
  getSelectedValues(): Set<string> {
    return new Set(this._selectedValues);
  }

  private _handleItemSelect = (e: CustomEvent) => {
    const { value, item } = e.detail as { value: string; item: HeadlessTreeItem };

    if (this.multiSelect) {
      if (this._selectedValues.has(value)) {
        this._selectedValues.delete(value);
      } else {
        this._selectedValues.add(value);
      }
      this.selected = Array.from(this._selectedValues).join(",");
      this._updateMultiSelection();
      this.emit("select", { value, item, selectedValues: Array.from(this._selectedValues) });
    } else {
      this.selected = value;
      this._selectedValues.clear();
      this._selectedValues.add(value);
      this._updateSelection(item);
      this.emit("select", { value, item });
    }
  };

  private _updateSelection(selectedItem: HeadlessTreeItem) {
    const allItems = Array.from(this.querySelectorAll("hp-tree-item")) as HeadlessTreeItem[];

    allItems.forEach((item) => {
      item.selected = item === selectedItem;
      item.setAttribute("aria-selected", String(item === selectedItem));
    });

    this._updateTabindex(selectedItem);
  }

  private _updateMultiSelection() {
    const allItems = Array.from(this.querySelectorAll("hp-tree-item")) as HeadlessTreeItem[];

    allItems.forEach((item) => {
      const isSelected = this._selectedValues.has(item.value);
      item.selected = isSelected;
      item.setAttribute("aria-selected", String(isSelected));
    });
  }

  private _updateTabindex(activeItem: HeadlessTreeItem | null) {
    const visibleItems = _getVisibleTreeItems(this);

    visibleItems.forEach((item) => {
      item.setAttribute("tabindex", item === activeItem ? "0" : "-1");
    });

    if (!activeItem && visibleItems.length > 0) {
      visibleItems[0].setAttribute("tabindex", "0");
    }
  }

  private _sync() {
    // Set aria-multiselectable when in multi-select mode
    if (this.multiSelect) {
      this.setAttribute("aria-multiselectable", "true");
    } else {
      this.removeAttribute("aria-multiselectable");
    }

    const visibleItems = _getVisibleTreeItems(this);
    if (visibleItems.length === 0) return;

    const selectedItem = visibleItems.find((i) => i.value === this.selected) ?? null;
    this._updateTabindex(selectedItem ?? visibleItems[0]);

    // Apply pre-selected value from attribute
    if (this.selected && !this.multiSelect) {
      const target = visibleItems.find((i) => i.value === this.selected);
      if (target) {
        target.selected = true;
        target.setAttribute("aria-selected", "true");
        this._selectedValues.add(target.value);
      }
    }
  }
}
