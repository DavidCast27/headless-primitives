import { HeadlessElement, RovingTabindex, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

export type ToolbarOrientation = "horizontal" | "vertical";

/**
 * Selector for all interactive toolbar items that participate in roving tabindex.
 * Matches native focusable controls and ARIA role equivalents.
 */
const TOOLBAR_ITEM_SELECTOR = [
  "button:not([disabled])",
  "[role='button']:not([aria-disabled='true'])",
  "[role='checkbox']:not([aria-disabled='true'])",
  "[role='radio']:not([aria-disabled='true'])",
  "[role='combobox']:not([aria-disabled='true'])",
  "[role='menuitem']:not([aria-disabled='true'])",
  "input:not([disabled])",
  "select:not([disabled])",
  "a[href]",
  "hp-button:not([disabled]):not([aria-disabled='true'])",
  "hp-toggle:not([disabled]):not([aria-disabled='true'])",
].join(", ");

/**
 * hp-toolbar
 *
 * Toolbar container following the WAI-ARIA toolbar pattern.
 * Manages roving tabindex so only one item is in the tab sequence at a time.
 * Arrow Left/Right (horizontal) or Up/Down (vertical) navigate between items.
 * Home/End jump to the first/last item.
 *
 * @element hp-toolbar
 *
 * @attr {string} orientation - "horizontal" (default) or "vertical"
 * @attr {string} label - Accessible label set as aria-label
 *
 * @fires hp-focus-change - Fired when keyboard navigation moves focus; detail: { index: number, item: HTMLElement }
 */
@customElement("hp-toolbar")
export class HeadlessToolbar extends HeadlessElement {
  private _orientation: ToolbarOrientation = "horizontal";
  private _label = "";
  private _rovingTabindex: RovingTabindex | null = null;

  @property({ type: String, reflect: true })
  get orientation(): ToolbarOrientation {
    return this._orientation;
  }
  set orientation(v: ToolbarOrientation) {
    this._orientation = v;
    this._sync();
  }

  @property({ type: String })
  get label(): string {
    return this._label;
  }
  set label(v: string) {
    this._label = v;
    this._sync();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "toolbar");
    this.setAttribute("role", "toolbar");
    this._sync();
    this._initRovingTabindex();
    this.addEventListener("keydown", this._handleKeyDown);
    this.addEventListener("focusin", this._handleFocusIn);
    requestAnimationFrame(() => {
      this._sync();
      this._initRovingTabindex();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._handleKeyDown);
    this.removeEventListener("focusin", this._handleFocusIn);
  }

  private _sync() {
    this.setAttribute("orientation", this._orientation);
    this.setAttribute("aria-orientation", this._orientation);
    if (this._label) {
      this.setAttribute("aria-label", this._label);
    } else if (!this.hasAttribute("aria-labelledby")) {
      // Keep whatever aria-label was previously set, or set a default
      if (!this.hasAttribute("aria-label")) {
        this.setAttribute("aria-label", "Toolbar");
      }
    }
  }

  private _getItems(): HTMLElement[] {
    return Array.from(this.querySelectorAll<HTMLElement>(TOOLBAR_ITEM_SELECTOR));
  }

  private _initRovingTabindex() {
    const items = this._getItems();
    if (items.length === 0) return;

    // Check if any item already has tabindex="0"; if not, set first item
    const hasFocusable = items.some((el) => el.getAttribute("tabindex") === "0");
    if (!hasFocusable) {
      items[0].setAttribute("tabindex", "0");
      items.slice(1).forEach((el) => el.setAttribute("tabindex", "-1"));
    } else {
      // Ensure all non-active items have tabindex="-1"
      items.forEach((el) => {
        if (el.getAttribute("tabindex") !== "0") {
          el.setAttribute("tabindex", "-1");
        }
      });
    }

    this._rovingTabindex = new RovingTabindex(items, (focused) => {
      const currentItems = this._getItems();
      const index = currentItems.indexOf(focused);
      this.emit("focus-change", { index, item: focused });
    });
  }

  private _handleKeyDown = (e: KeyboardEvent) => {
    const items = this._getItems();
    if (items.length === 0) return;

    // Rebuild roving tabindex with current items in case DOM changed
    this._rovingTabindex?.updateElements(items);

    const target = e.target as HTMLElement;
    // Only handle navigation keys if focus is inside a toolbar item
    const isFocusedItem = items.includes(target);
    if (!isFocusedItem) return;

    const isHorizontal = this._orientation === "horizontal";
    const prevKey = isHorizontal ? "ArrowLeft" : "ArrowUp";
    const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";

    if (e.key === prevKey || e.key === nextKey || e.key === "Home" || e.key === "End") {
      this._rovingTabindex?.handleKeyDown(e, target);
    }
  };

  private _handleFocusIn = (e: FocusEvent) => {
    const items = this._getItems();
    if (items.length === 0) return;

    const target = e.target as HTMLElement;
    if (!items.includes(target)) return;

    // When an item receives focus (e.g. via click), update roving tabindex state
    items.forEach((el) => el.setAttribute("tabindex", "-1"));
    target.setAttribute("tabindex", "0");
  };
}
