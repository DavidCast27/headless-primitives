import {
  HeadlessElement,
  customElement,
  RovingTabindex,
  getScrollParents,
  startPositionLoop,
} from "@headless-primitives/utils";
import { property } from "lit/decorators.js";
import type { DropdownMenuSelectDetail, DropdownMenuHighlightDetail } from "./types";

@customElement("hp-dropdown-menu")
export class HeadlessDropdownMenu extends HeadlessElement {
  private _open = false;
  private _trigger: HeadlessDropdownMenuTrigger | null = null;
  private _content: HeadlessDropdownMenuContent | null = null;
  private _items: HeadlessDropdownMenuItem[] = [];
  private _activeIndex: number = -1;
  private _scrollParents: EventTarget[] = [];
  private _openController: AbortController | null = null;

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
    this.setAttribute("data-hp-component", "dropdown-menu");
    this._setupRefs();
    this._bind();
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeGlobalListeners();
  }

  private _setupRefs() {
    this._trigger = this.querySelector("hp-dropdown-menu-trigger");
    this._content = this.querySelector("hp-dropdown-menu-content");
    this._items = Array.from(this.querySelectorAll("hp-dropdown-menu-item"));
  }

  private _bind() {
    if (this._trigger) {
      this._trigger.addEventListener("click", this._onTriggerClick);
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
      const idx = this._items.indexOf(el as unknown as HeadlessDropdownMenuItem);
      this._setActiveIndex(idx);
    });
    // Initialize tabindexes
    focusables.forEach((el, idx) => {
      el.setAttribute("tabindex", idx === 0 ? "0" : "-1");
    });
  }

  private _computePosition() {
    if (!this._trigger || !this._content) return;
    const gap = 6;
    const rootRect = this.getBoundingClientRect();
    const triggerRect = this._trigger.getBoundingClientRect();

    const left = triggerRect.left - rootRect.left;
    const top = triggerRect.top - rootRect.top + triggerRect.height + gap;
    this._content.style.left = `${left}px`;
    this._content.style.top = `${top}px`;
  }

  private _onTriggerClick = (e: Event) => {
    if (this.disabled) return;
    e.stopPropagation();
    this.toggle();
  };

  private _onTriggerKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.openMenu();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      this.openMenu("first");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.openMenu("last");
    } else if (e.key === "Escape" && this.open) {
      e.preventDefault();
      this.close();
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
        // Tab closes the menu (different from select)
        this.close();
        break;
    }
  };

  private _onItemClick = (e: MouseEvent) => {
    const item = e.currentTarget as HeadlessDropdownMenuItem;
    if (item.disabled) return;
    this._activateItem(item);
  };

  private _activateItem(item: HeadlessDropdownMenuItem) {
    const detail: DropdownMenuSelectDetail = {
      value: item.value,
      label: item.textContent?.trim() || null,
      item: item,
    };
    this.emit("select", detail);
    this.close();
  }

  private _emitHighlight() {
    const active = this._items[this._activeIndex] || null;
    const detail: DropdownMenuHighlightDetail = {
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
    let idx = enabled.indexOf(current as HeadlessDropdownMenuItem);
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
    if (!this._trigger || !this._content) return;
    if (index < 0 || index >= this._items.length) return;
    this._activeIndex = index;
    const active = this._items[index];
    if (active) {
      if (!active.id) active.id = `hp-dropdown-menu-item-${active.hpId}`;
      this._trigger.setAttribute("aria-activedescendant", active.id);
      // Scroll into view
      active.scrollIntoView({ block: "nearest" });
      this._emitHighlight();
    }
  }

  private _sync() {
    // sync structure refs on every cycle (SSR/hydration safety)
    this._setupRefs();

    // trigger ARIA/state
    if (this._trigger) {
      this._trigger.setAttribute("role", "button");
      this._trigger.setAttribute("aria-haspopup", "menu");
      this._trigger.setAttribute("aria-expanded", String(this._open));
      this._trigger.setAttribute("aria-disabled", String(this.disabled));
    }

    // content ARIA/state
    if (this._content) {
      this._content.setAttribute("role", "menu");
      this._content.removeAttribute("data-hp-overlay-content");
      this._content.setAttribute("data-state", this._open ? "open" : "closed");
      this._content.setAttribute("aria-hidden", this._open ? "false" : "true");
      if (!this._content.id) this._content.id = `hp-dropdown-menu-content-${this.hpId}`;
      if (this._trigger) {
        this._trigger.setAttribute("aria-controls", this._content.id);
      }
    }

    // items ARIA
    for (const item of this._items) {
      item.setAttribute("role", "menuitem");
      item.setAttribute("aria-disabled", String(item.disabled));
    }

    // roving setup when open
    if (this._open) {
      this._setupRoving();
      const startIndex = this._items.findIndex((i) => !i.disabled);
      if (startIndex >= 0) this._setActiveIndex(startIndex);

      // Per-open AbortController so global listeners + position loop tear down
      // automatically on close() OR if the host disconnects without close().
      this._openController?.abort();
      this._openController = new AbortController();
      const sig = this._openController.signal;

      this._computePosition();
      startPositionLoop(() => this._computePosition(), sig);

      document.addEventListener("click", this._onClickOutside, { signal: sig });
      document.addEventListener("keydown", this._onGlobalKeydown, { signal: sig });

      if (this._trigger) {
        this._scrollParents = getScrollParents(this._trigger);
        for (const parent of this._scrollParents) {
          parent.addEventListener("scroll", this._onScrollOrResize, {
            signal: sig,
            passive: true,
          } as AddEventListenerOptions);
        }
      }
      window.addEventListener("resize", this._onScrollOrResize, {
        signal: sig,
        passive: true,
      });
      this.emit("open");
    } else {
      this._removeGlobalListeners();
      this.emit("close");
    }
  }

  private _removeGlobalListeners() {
    this._openController?.abort();
    this._openController = null;
    this._scrollParents = [];
  }

  private _onClickOutside = (e: MouseEvent) => {
    if (!this._open || !this._trigger || !this._content) return;
    const target = e.target as Node;
    if (!this.contains(target)) this.close();
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
    // return focus to trigger
    this._trigger?.focus();
  }

  toggle() {
    this.open = !this.open;
  }
}

@customElement("hp-dropdown-menu-trigger")
export class HeadlessDropdownMenuTrigger extends HeadlessElement {
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "dropdown-menu-trigger");
    if (!this.hasAttribute("tabindex") && !this.disabled) {
      this.setAttribute("tabindex", "0");
    }
  }
}

@customElement("hp-dropdown-menu-content")
export class HeadlessDropdownMenuContent extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "dropdown-menu-content");
    if (!this.id) this.id = `hp-dropdown-menu-content-${this.hpId}`;
  }
}

@customElement("hp-dropdown-menu-item")
export class HeadlessDropdownMenuItem extends HeadlessElement {
  @property({ type: String, reflect: true }) value = "";
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "dropdown-menu-item");
    if (!this.id) this.id = `hp-dropdown-menu-item-${this.hpId}`;
    // Ensure focusability for roving tabindex
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "-1");
  }
}

@customElement("hp-dropdown-menu-separator")
export class HeadlessDropdownMenuSeparator extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "dropdown-menu-separator");
    this.setAttribute("role", "separator");
  }
}

@customElement("hp-dropdown-menu-label")
export class HeadlessDropdownMenuLabel extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "dropdown-menu-label");
    this.setAttribute("role", "presentation");
  }
}
