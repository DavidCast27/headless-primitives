import { HeadlessElement, customElement, RovingTabindex } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";
import type { SelectChangeDetail, SelectHighlightDetail } from "./types";

@customElement("hp-select")
export class HeadlessSelect extends HeadlessElement {
  private _value: string | null = null;
  private _open = false;
  private _hiddenInput: HTMLInputElement | null = null;
  private _trigger: HeadlessSelectTrigger | null = null;
  private _content: HeadlessSelectContent | null = null;
  private _valueDisplay: HeadlessSelectValue | null = null;
  private _items: HeadlessSelectItem[] = [];
  private _activeIndex: number = -1;
  private _rafId: number | null = null;
  private _scrollParents: EventTarget[] = [];

  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) name = "";
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: String, reflect: true }) placeholder = "";

  @property({ type: Boolean, reflect: true })
  get open(): boolean {
    return this._open;
  }
  set open(v: boolean) {
    this._open = Boolean(v);
    this._sync();
  }

  @property({ type: String, reflect: true })
  get value(): string | null {
    return this._value;
  }
  set value(v: string | null) {
    this._value = v;
    this._sync();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "select");
    this._setupRefs();
    this._ensureHiddenInput();
    this._bind();
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeGlobalListeners();
  }

  private _setupRefs() {
    this._trigger = this.querySelector("hp-select-trigger");
    this._content = this.querySelector("hp-select-content");
    this._valueDisplay = this.querySelector("hp-select-value");
    this._items = Array.from(this.querySelectorAll("hp-select-item"));
  }

  private _ensureHiddenInput() {
    if (!this._hiddenInput) {
      this._hiddenInput = document.createElement("input");
      this._hiddenInput.type = "hidden";
      this._hiddenInput.setAttribute("data-hp-select-hidden-input", "");
      this.appendChild(this._hiddenInput);
    }
  }

  private _bind() {
    if (this._trigger) {
      this._trigger.addEventListener("click", this._onTriggerClick);
      this._trigger.addEventListener("keydown", this._onTriggerKeyDown);
    }
    if (this._content) {
      this._content.addEventListener("keydown", this._onListboxKeyDown);
    }
    for (const item of this._items) {
      item.addEventListener("click", this._onItemClick as EventListener);
    }
  }

  private _setupRoving() {
    if (!this._content) return;
    const focusables = this._items.filter((i) => !i.disabled);
    new RovingTabindex(focusables as unknown as HTMLElement[], (el) => {
      const idx = this._items.indexOf(el as unknown as HeadlessSelectItem);
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

  private _startPositionLoop() {
    const loop = () => {
      if (!this._open) return;
      this._computePosition();
      this._rafId = requestAnimationFrame(loop);
    };
    this._rafId = requestAnimationFrame(loop);
  }

  private _stopPositionLoop() {
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
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
      this.openSelect();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      this.openSelect("first");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.openSelect("last");
    } else if (e.key === "Escape" && this.open) {
      e.preventDefault();
      this.close();
    }
  };

  private _onListboxKeyDown = (e: KeyboardEvent) => {
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
          this._selectItem(activeItem);
        }
        break;
      case "Escape":
        e.preventDefault();
        this.close();
        break;
    }
  };

  private _onItemClick = (e: MouseEvent) => {
    const item = e.currentTarget as HeadlessSelectItem;
    if (item.disabled) return;
    this._selectItem(item);
  };

  private _selectItem(item: HeadlessSelectItem) {
    const newValue = item.value;
    if (newValue === this._value) {
      this.close();
      return;
    }
    this._value = newValue;
    this._syncSelection();
    this._emitChange();
    this.close();
  }

  private _emitChange() {
    const detail: SelectChangeDetail = {
      value: this._value,
      label: this._currentLabel(),
      item: this._currentItem(),
    };
    this.emit("change", detail);
  }

  private _emitHighlight() {
    const active = this._items[this._activeIndex] || null;
    const detail: SelectHighlightDetail = {
      value: active ? active.value : null,
      label: active ? active.textContent?.trim() || null : null,
      item: active,
    };
    this.emit("highlight", detail);
  }

  private _currentItem(): HeadlessSelectItem | null {
    return this._items.find((i) => i.value === this._value) || null;
  }

  private _currentLabel(): string | null {
    const item = this._currentItem();
    return item ? item.textContent?.trim() || null : null;
  }

  private _moveActive(delta: number) {
    const enabled = this._items.filter((i) => !i.disabled);
    if (enabled.length === 0) return;
    const current = this._items[this._activeIndex];
    let idx = enabled.indexOf(current as HeadlessSelectItem);
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
      if (!active.id) active.id = `hp-select-item-${active.hpId}`;
      this._trigger.setAttribute("aria-activedescendant", active.id);
      // Scroll into view
      active.scrollIntoView({ block: "nearest" });
      this._emitHighlight();
    }
  }

  private _sync() {
    // sync structure refs on every cycle (SSR/hydration safety)
    this._setupRefs();

    // form integration
    if (this._hiddenInput) {
      this._hiddenInput.name = this.name || "";
      this._hiddenInput.value = this._value ?? "";
    }

    // trigger ARIA/state
    if (this._trigger) {
      this._trigger.setAttribute("role", "combobox");
      this._trigger.setAttribute("aria-expanded", String(this._open));
      this._trigger.setAttribute("aria-disabled", String(this.disabled));
    }

    // content ARIA/state
    if (this._content) {
      this._content.setAttribute("role", "listbox");
      this._content.removeAttribute("data-hp-overlay-content");
      this._content.setAttribute("data-state", this._open ? "open" : "closed");
      this._content.setAttribute("aria-hidden", this._open ? "false" : "true");
      if (!this._content.id) this._content.id = `hp-select-content-${this.hpId}`;
      if (this._trigger) {
        this._trigger.setAttribute("aria-controls", this._content.id);
      }
    }

    // items ARIA
    for (const item of this._items) {
      item.setAttribute("role", "option");
      item.setAttribute("aria-selected", String(item.value === this._value));
      item.setAttribute("aria-disabled", String(item.disabled));
    }

    // value display text
    if (this._valueDisplay) {
      const label = this._currentLabel();
      const placeholder = this.placeholder || "";
      this._valueDisplay.textContent = label ?? placeholder;
    }

    // roving setup when open
    if (this._open) {
      this._setupRoving();
      const selected = this._currentItem();
      const startIndex = selected
        ? this._items.indexOf(selected)
        : this._items.findIndex((i) => !i.disabled);
      if (startIndex >= 0) this._setActiveIndex(startIndex);

      // position + listeners
      this._computePosition();
      this._startPositionLoop();
      document.addEventListener("click", this._onClickOutside);
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
      this._stopPositionLoop();
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
    document.removeEventListener("keydown", this._onGlobalKeydown);
    for (const parent of this._scrollParents) {
      parent.removeEventListener("scroll", this._onScrollOrResize);
    }
    this._scrollParents = [];
    window.removeEventListener("resize", this._onScrollOrResize);
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
  openSelect(edge?: "first" | "last") {
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

  select(value: string) {
    const item = this._items.find((i) => i.value === value);
    if (item && !item.disabled) this._selectItem(item);
  }

  clear() {
    this.value = null;
    this._syncSelection();
    this._emitChange();
  }

  private _syncSelection() {
    for (const item of this._items) {
      item.setAttribute("aria-selected", String(item.value === this._value));
    }
    if (this._hiddenInput) {
      this._hiddenInput.value = this._value ?? "";
    }
    if (this._valueDisplay) {
      const label = this._currentLabel();
      this._valueDisplay.textContent = label ?? this.placeholder ?? "";
    }
  }
}

@customElement("hp-select-trigger")
export class HeadlessSelectTrigger extends HeadlessElement {
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "select-trigger");
    if (!this.hasAttribute("tabindex") && !this.disabled) {
      this.setAttribute("tabindex", "0");
    }
  }
}

@customElement("hp-select-value")
export class HeadlessSelectValue extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "select-value");
  }
}

@customElement("hp-select-content")
export class HeadlessSelectContent extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "select-content");
    if (!this.id) this.id = `hp-select-content-${this.hpId}`;
    // absolute positioned floating content via base.css
  }
}

@customElement("hp-select-item")
export class HeadlessSelectItem extends HeadlessElement {
  @property({ type: String, reflect: true }) value = "";
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "select-item");
    if (!this.id) this.id = `hp-select-item-${this.hpId}`;
    // Ensure focusability for roving tabindex
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "-1");
  }
}
