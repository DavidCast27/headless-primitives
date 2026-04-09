import { HeadlessElement, customElement, RovingTabindex } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";
import type { ContextMenuSelectDetail, ContextMenuHighlightDetail } from "./types";

@customElement("hp-context-menu")
export class HeadlessContextMenu extends HeadlessElement {
  static _currentOpen: HeadlessContextMenu | null = null;

  private _open = false;
  private _trigger: HeadlessContextMenuTrigger | null = null;
  private _content: HeadlessContextMenuContent | null = null;
  private _items: HeadlessContextMenuItem[] = [];
  private _activeIndex: number = -1;
  private _cursorX = 0;
  private _cursorY = 0;
  private _previousFocus: HTMLElement | null = null;
  private _scrollParents: EventTarget[] = [];

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ type: Boolean, reflect: true })
  get open(): boolean {
    return this._open;
  }
  set open(v: boolean) {
    this._open = Boolean(v);
    this._sync();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "context-menu");
    this._setupRefs();
    this._bind();
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeGlobalListeners();
    if (HeadlessContextMenu._currentOpen === this) {
      HeadlessContextMenu._currentOpen = null;
    }
  }

  private _setupRefs() {
    this._trigger = this.querySelector("hp-context-menu-trigger");
    this._content = this.querySelector("hp-context-menu-content");
    this._items = Array.from(this.querySelectorAll("hp-context-menu-item"));
  }

  private _bind() {
    if (this._trigger) {
      this._trigger.addEventListener("contextmenu", this._onContextMenu);
      this._trigger.addEventListener("keydown", this._onTriggerKeyDown);
    }
    if (this._content) {
      this._content.addEventListener("keydown", this._onMenuKeyDown);
    }
    for (const item of this._items) {
      item.addEventListener("click", this._onItemClick as EventListener);
    }
  }

  private _setupRoving() {
    if (!this._content) return;
    const focusables = this._items.filter((i) => !i.disabled);
    new RovingTabindex(focusables as unknown as HTMLElement[], (el) => {
      const idx = this._items.indexOf(el as unknown as HeadlessContextMenuItem);
      this._setActiveIndex(idx);
    });
    focusables.forEach((el, idx) => {
      el.setAttribute("tabindex", idx === 0 ? "0" : "-1");
    });
  }

  private _computePosition() {
    if (!this._content) return;
    const rootRect = this.getBoundingClientRect();
    const left = this._cursorX - rootRect.left;
    const top = this._cursorY - rootRect.top;
    this._content.style.left = `${left}px`;
    this._content.style.top = `${top}px`;
  }

  private _onContextMenu = (e: MouseEvent) => {
    if (this.disabled) return;
    e.preventDefault();
    e.stopPropagation();
    this._cursorX = e.clientX;
    this._cursorY = e.clientY;
    this._previousFocus = document.activeElement as HTMLElement | null;

    // Close any other open context menu
    if (HeadlessContextMenu._currentOpen && HeadlessContextMenu._currentOpen !== this) {
      HeadlessContextMenu._currentOpen.close();
    }

    this.openMenu("first");
  };

  private _onTriggerKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    // Shift+F10 or ContextMenu key opens the context menu
    if ((e.key === "F10" && e.shiftKey) || e.key === "ContextMenu") {
      e.preventDefault();
      // Position at center of the focused element
      const target = (document.activeElement || this._trigger) as HTMLElement;
      const rect = target.getBoundingClientRect();
      this._cursorX = rect.left + rect.width / 2;
      this._cursorY = rect.top + rect.height / 2;
      this._previousFocus = target;

      if (HeadlessContextMenu._currentOpen && HeadlessContextMenu._currentOpen !== this) {
        HeadlessContextMenu._currentOpen.close();
      }

      this.openMenu("first");
    }
  };

  private _onMenuKeyDown = (e: KeyboardEvent) => {
    if (!this.open) return;
    const activeItem = this._items[this._activeIndex];
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        this._moveActive(1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        this._moveActive(-1);
        break;
      case "Home":
        e.preventDefault();
        this._moveToEdge("first");
        break;
      case "End":
        e.preventDefault();
        this._moveToEdge("last");
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (activeItem && !activeItem.disabled) {
          this._activateItem(activeItem);
        }
        break;
      case "Escape":
        e.preventDefault();
        this.close();
        break;
      case "Tab":
        this.close();
        break;
    }
  };

  private _onItemClick = (e: MouseEvent) => {
    const item = e.currentTarget as HeadlessContextMenuItem;
    if (item.disabled) return;
    this._activateItem(item);
  };

  private _activateItem(item: HeadlessContextMenuItem) {
    const detail: ContextMenuSelectDetail = {
      value: item.value,
      label: item.textContent?.trim() || null,
      item: item,
    };
    this.emit("select", detail);
    this.close();
  }

  private _emitHighlight() {
    const active = this._items[this._activeIndex] || null;
    const detail: ContextMenuHighlightDetail = {
      value: active ? active.value : null,
      label: active ? active.textContent?.trim() || null : null,
      item: active,
    };
    this.emit("highlight", detail);
  }

  private _moveActive(delta: number) {
    const enabled = this._items.filter((i) => !i.disabled);
    if (enabled.length === 0) return;
    const current = this._items[this._activeIndex];
    let idx = enabled.indexOf(current as HeadlessContextMenuItem);
    if (idx === -1) idx = 0;
    const next = (idx + delta + enabled.length) % enabled.length;
    const target = enabled[next];
    this._setActiveIndex(this._items.indexOf(target));
  }

  private _moveToEdge(edge: "first" | "last") {
    const enabled = this._items.filter((i) => !i.disabled);
    if (enabled.length === 0) return;
    const target = edge === "first" ? enabled[0] : enabled[enabled.length - 1];
    this._setActiveIndex(this._items.indexOf(target));
  }

  private _setActiveIndex(index: number) {
    if (!this._content) return;
    if (index < 0 || index >= this._items.length) return;
    this._activeIndex = index;
    const active = this._items[index];
    if (active) {
      if (!active.id) active.id = `hp-context-menu-item-${active.hpId}`;
      this._content.setAttribute("aria-activedescendant", active.id);
      active.scrollIntoView({ block: "nearest" });
      this._emitHighlight();
    }
  }

  private _sync() {
    this._setupRefs();

    // trigger state
    if (this._trigger) {
      this._trigger.setAttribute("data-state", this._open ? "open" : "closed");
    }

    // content ARIA/state
    if (this._content) {
      this._content.setAttribute("role", "menu");
      this._content.setAttribute("data-state", this._open ? "open" : "closed");
      this._content.setAttribute("aria-hidden", this._open ? "false" : "true");
      if (!this._content.id) this._content.id = `hp-context-menu-content-${this.hpId}`;
    }

    // items ARIA
    for (const item of this._items) {
      item.setAttribute("role", "menuitem");
      item.setAttribute("aria-disabled", String(item.disabled));
    }

    if (this._open) {
      HeadlessContextMenu._currentOpen = this;
      this._setupRoving();
      const startIndex = this._items.findIndex((i) => !i.disabled);
      if (startIndex >= 0) this._setActiveIndex(startIndex);

      this._computePosition();
      document.addEventListener("click", this._onClickOutside);
      document.addEventListener("contextmenu", this._onClickOutside);
      document.addEventListener("keydown", this._onGlobalKeydown);
      if (this._trigger) {
        this._scrollParents = this._getScrollParents(this._trigger);
        for (const parent of this._scrollParents) {
          parent.addEventListener("scroll", this._onScrollOrResize, {
            passive: true,
          } as AddEventListenerOptions);
        }
      }
      window.addEventListener("resize", this._onScrollOrResize, { passive: true });
      this.emit("open");
    } else {
      if (HeadlessContextMenu._currentOpen === this) {
        HeadlessContextMenu._currentOpen = null;
      }
      this._removeGlobalListeners();
      this.emit("close");
    }
  }

  private _getScrollParents(el: HTMLElement): EventTarget[] {
    const parents: EventTarget[] = [];
    let node: HTMLElement | null = el.parentElement;
    while (node) {
      const { overflow, overflowY, overflowX } = getComputedStyle(node);
      if (/auto|scroll|overlay/.test(overflow + overflowY + overflowX)) parents.push(node);
      node = node.parentElement;
    }
    parents.push(window);
    return parents;
  }

  private _removeGlobalListeners() {
    document.removeEventListener("click", this._onClickOutside);
    document.removeEventListener("contextmenu", this._onClickOutside);
    document.removeEventListener("keydown", this._onGlobalKeydown);
    for (const parent of this._scrollParents) {
      parent.removeEventListener("scroll", this._onScrollOrResize);
    }
    this._scrollParents = [];
    window.removeEventListener("resize", this._onScrollOrResize);
  }

  private _onClickOutside = (e: MouseEvent) => {
    if (!this._open || !this._content) return;
    const target = e.target as Node;
    if (!this._content.contains(target)) this.close();
  };

  private _onGlobalKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && this._open) {
      e.preventDefault();
      this.close();
    }
  };

  private _onScrollOrResize = () => {
    if (this._open) this.close();
  };

  // Public API
  openMenu(edge?: "first" | "last") {
    if (this.disabled) return;
    this.open = true;
    if (edge) this._moveToEdge(edge);
  }

  close() {
    this.open = false;
    // Restore focus to previously focused element
    if (this._previousFocus && typeof this._previousFocus.focus === "function") {
      this._previousFocus.focus();
      this._previousFocus = null;
    }
  }

  toggle() {
    this.open = !this.open;
  }
}

@customElement("hp-context-menu-trigger")
export class HeadlessContextMenuTrigger extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "context-menu-trigger");
  }
}

@customElement("hp-context-menu-content")
export class HeadlessContextMenuContent extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "context-menu-content");
    if (!this.id) this.id = `hp-context-menu-content-${this.hpId}`;
  }
}

@customElement("hp-context-menu-item")
export class HeadlessContextMenuItem extends HeadlessElement {
  @property({ type: String, reflect: true }) value = "";
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "context-menu-item");
    if (!this.id) this.id = `hp-context-menu-item-${this.hpId}`;
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "-1");
  }
}

@customElement("hp-context-menu-separator")
export class HeadlessContextMenuSeparator extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "context-menu-separator");
    this.setAttribute("role", "separator");
  }
}

@customElement("hp-context-menu-label")
export class HeadlessContextMenuLabel extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "context-menu-label");
    this.setAttribute("role", "presentation");
  }
}
