import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";
import type { ComboboxChangeDetail, ComboboxHighlightDetail } from "./types";

@customElement("hp-combobox-input")
export class HeadlessComboboxInput extends HeadlessElement {
  private _input: HTMLInputElement | null = null;

  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this._ensureInput();
    this._sync();
  }

  get nativeInput(): HTMLInputElement | null {
    return this._input;
  }

  private _ensureInput() {
    if (this._input) return;
    const input = this.querySelector("input[type='text']") as HTMLInputElement | null;
    if (input) {
      this._input = input;
      return;
    }

    const created = document.createElement("input");
    created.type = "text";
    created.autocomplete = "off";
    this.appendChild(created);
    this._input = created;
  }

  private _sync() {
    if (!this._input) return;
    this._input.disabled = this.disabled;
    this._input.setAttribute("aria-disabled", String(this.disabled));
  }
}

@customElement("hp-combobox-content")
export class HeadlessComboboxContent extends HeadlessElement {}

@customElement("hp-combobox-option")
export class HeadlessComboboxOption extends HeadlessElement {
  private _value = "";

  @property({ type: String, reflect: true })
  get value(): string {
    return this._value;
  }
  set value(v: string) {
    this._value = v;
  }

  @property({ type: Boolean, reflect: true }) disabled = false;
}

@customElement("hp-combobox")
export class HeadlessCombobox extends HeadlessElement {
  private _inputControl: HeadlessComboboxInput | null = null;
  private _inputElement: HTMLInputElement | null = null;
  private _content: HeadlessComboboxContent | null = null;
  private _options: HeadlessComboboxOption[] = [];
  private _filteredOptions: HeadlessComboboxOption[] = [];
  private _open = false;
  private _value: string | null = null;
  private _inputValue = "";
  private _highlightedIndex = -1;
  private _rafId: number | null = null;
  private _scrollParents: EventTarget[] = [];
  private _isInputBound = false;
  private _isContentBound = false;
  private _isGlobalListenerBound = false;
  private _suppressFocusOpen = false;
  private _prevOpen = false;

  @property({ type: Boolean, reflect: true }) disabled = false;
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
    if (v !== null) {
      const item = this._options.find((option) => option.value === v);
      if (item) {
        this._inputValue = item.textContent?.trim() || "";
      }
    }
    this._sync();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "combobox");
    this._setupRefs();
    this._bind();
    this._sync();
    requestAnimationFrame(() => {
      this._setupRefs();
      this._bind();
      this._sync();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeGlobalListeners();
  }

  private _setupRefs() {
    this._inputControl = this.querySelector("hp-combobox-input");
    this._content = this.querySelector("hp-combobox-content");
    this._options = Array.from(this.querySelectorAll("hp-combobox-option"));
    this._inputElement =
      this._inputControl?.nativeInput ||
      (this.querySelector("input[type='text']") as HTMLInputElement | null);
  }

  private _bind() {
    if (this._inputElement && !this._isInputBound) {
      this._inputElement.addEventListener("input", this._onInput);
      this._inputElement.addEventListener("keydown", this._onInputKeyDown);
      this._inputElement.addEventListener("focus", this._onInputFocus);
      this._isInputBound = true;
    }

    if (this._content && !this._isContentBound) {
      this._content.addEventListener("click", this._onOptionClick as EventListener);
      this._isContentBound = true;
    }
  }

  private _computePosition() {
    if (!this._inputElement || !this._content) return;
    const rootRect = this.getBoundingClientRect();
    const inputRect = this._inputElement.getBoundingClientRect();
    const left = inputRect.left - rootRect.left;
    const top = inputRect.top - rootRect.top + inputRect.height + 6;
    this._content.style.left = `${left}px`;
    this._content.style.top = `${top}px`;
    this._content.style.minWidth = `${inputRect.width}px`;
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

  private _onInput = () => {
    if (!this._inputElement) return;
    this._inputValue = this._inputElement.value;
    if (!this._open) {
      this.open = true;
    } else {
      this._sync();
    }
  };

  private _onInputFocus = () => {
    if (this.disabled || this._suppressFocusOpen) return;
    this.open = true;
  };

  private _onInputKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;
    const key = event.key;
    if (key === "ArrowDown") {
      event.preventDefault();
      if (!this._open) {
        this.open = true;
        return;
      }
      this._moveActive(1);
    } else if (key === "ArrowUp") {
      event.preventDefault();
      if (!this._open) {
        this.open = true;
        return;
      }
      this._moveActive(-1);
    } else if (key === "Home") {
      event.preventDefault();
      this._moveToEdge("first");
    } else if (key === "End") {
      event.preventDefault();
      this._moveToEdge("last");
    } else if (key === "Enter") {
      if (this._open && this._highlightedIndex >= 0) {
        event.preventDefault();
        const option = this._filteredOptions[this._highlightedIndex];
        if (option && !option.disabled) {
          this._selectOption(option);
        }
      }
    } else if (key === "Escape") {
      if (this._open) {
        event.preventDefault();
        this.close();
      }
    }
  };

  private _onOptionClick = (event: MouseEvent) => {
    const target = (event.target as HTMLElement).closest(
      "hp-combobox-option",
    ) as HeadlessComboboxOption | null;
    if (!target || target.disabled) return;
    this._selectOption(target);
  };

  private _filterOptions() {
    const search = this._inputValue.trim().toLowerCase();
    this._filteredOptions = this._options.filter((option) => {
      const label = option.textContent?.trim().toLowerCase() || "";
      return search.length === 0 || label.includes(search);
    });
  }

  private _syncOptions() {
    for (const option of this._options) {
      const visible = this._filteredOptions.includes(option);
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", String(option.value === this._value));
      option.setAttribute("aria-disabled", String(option.disabled));
      option.setAttribute("aria-hidden", String(!visible));
      option.setAttribute("data-state", visible ? "visible" : "hidden");
    }

    if (this._open) {
      if (this._filteredOptions.length === 0) {
        this._highlightedIndex = -1;
      } else if (
        this._highlightedIndex < 0 ||
        this._highlightedIndex >= this._filteredOptions.length
      ) {
        this._setActiveIndex(0);
      }
    }
  }

  private _setActiveIndex(index: number) {
    if (index < 0 || index >= this._filteredOptions.length) {
      this._highlightedIndex = -1;
      if (this._inputElement) {
        this._inputElement.removeAttribute("aria-activedescendant");
      }
      return;
    }

    this._highlightedIndex = index;
    const active = this._filteredOptions[index];
    if (!active) return;

    if (!active.id) {
      active.id = `hp-combobox-option-${active.hpId}`;
    }

    if (this._inputElement) {
      this._inputElement.setAttribute("aria-activedescendant", active.id);
    }

    active.scrollIntoView({ block: "nearest" });
    this._emitHighlight();
  }

  private _moveActive(delta: number) {
    if (this._filteredOptions.length === 0) return;
    const nextIndex =
      (this._highlightedIndex + delta + this._filteredOptions.length) %
      this._filteredOptions.length;
    this._setActiveIndex(nextIndex);
  }

  private _moveToEdge(edge: "first" | "last") {
    if (this._filteredOptions.length === 0) return;
    const index = edge === "first" ? 0 : this._filteredOptions.length - 1;
    this._setActiveIndex(index);
  }

  private _selectOption(option: HeadlessComboboxOption) {
    const label = option.textContent?.trim() || "";
    this._value = option.value;
    this._inputValue = label;
    this._syncSelection();
    this._emitChange();
    this._suppressFocusOpen = true;
    this.close();
    this._suppressFocusOpen = false;
  }

  private _syncSelection() {
    for (const option of this._options) {
      option.setAttribute("aria-selected", String(option.value === this._value));
    }

    if (this._inputElement) {
      this._inputElement.value = this._inputValue;
    }
  }

  private _sync() {
    this._setupRefs();
    this._filterOptions();

    if (this._inputElement) {
      this._inputElement.disabled = this.disabled;
      this._inputElement.placeholder = this.placeholder;
      this._inputElement.setAttribute("role", "combobox");
      this._inputElement.setAttribute("aria-expanded", String(this._open));
      this._inputElement.setAttribute("aria-autocomplete", "list");
      this._inputElement.setAttribute("aria-disabled", String(this.disabled));
      this._inputElement.setAttribute("aria-controls", this._content?.id || "");
      if (this._highlightedIndex >= 0 && this._filteredOptions[this._highlightedIndex]) {
        const active = this._filteredOptions[this._highlightedIndex];
        if (!active.id) active.id = `hp-combobox-option-${active.hpId}`;
        this._inputElement.setAttribute("aria-activedescendant", active.id);
      } else {
        this._inputElement.removeAttribute("aria-activedescendant");
      }
      this._inputElement.value = this._inputValue;
    }

    if (this._content) {
      this._content.setAttribute("role", "listbox");
      this._content.setAttribute("data-state", this._open ? "open" : "closed");
      this._content.setAttribute("aria-hidden", String(!this._open));
      if (!this._content.id) {
        this._content.id = `hp-combobox-content-${this.hpId}`;
      }
      if (this._inputElement) {
        this._inputElement.setAttribute("aria-controls", this._content.id);
      }
    }

    this._syncOptions();

    if (this._open) {
      this._computePosition();
      this._startPositionLoop();
      if (!this._isGlobalListenerBound) {
        document.addEventListener("click", this._onClickOutside);
        document.addEventListener("keydown", this._onGlobalKeydown);
        this._scrollParents = this._getScrollParents(this._inputElement || this);
        for (const parent of this._scrollParents) {
          parent.addEventListener("scroll", this._onScrollOrResize, {
            passive: true,
          } as AddEventListenerOptions);
        }
        window.addEventListener("resize", this._onScrollOrResize, { passive: true });
        this._isGlobalListenerBound = true;
      }
      if (!this._prevOpen) this.emit("open");
    } else {
      this._stopPositionLoop();
      this._removeGlobalListeners();
      if (this._prevOpen) this.emit("close");
    }
    this._prevOpen = this._open;
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
    this._isGlobalListenerBound = false;
  }

  private _onClickOutside = (event: MouseEvent) => {
    if (!this._open || !this._content) return;
    const target = event.target as Node;
    // Ignore clicks inside the combobox itself (input, content, options)
    if (this.contains(target)) return;
    // Close without stealing focus back — the user clicked somewhere else
    this._closeWithoutFocus();
  };

  private _onGlobalKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && this._open) {
      event.preventDefault();
      this.close();
    }
  };

  private _onScrollOrResize = () => {
    if (this._open) this.close();
  };

  openCombobox(edge?: "first" | "last") {
    if (this.disabled) return;
    this.open = true;
    if (edge) this._moveToEdge(edge);
  }

  close() {
    this.open = false;
    this._inputElement?.focus();
  }

  private _closeWithoutFocus() {
    this.open = false;
  }

  toggle() {
    this.open = !this.open;
  }

  select(value: string) {
    const item = this._options.find((option) => option.value === value);
    if (item && !item.disabled) {
      this._selectOption(item);
    }
  }

  clear() {
    this._value = null;
    this._inputValue = "";
    this._syncSelection();
    this._emitChange();
  }

  private _emitChange() {
    const item = this._options.find((option) => option.value === this._value) || null;
    const detail: ComboboxChangeDetail = {
      value: this._value,
      label: item?.textContent?.trim() || null,
      item,
    };
    this.emit("change", detail);
  }

  private _emitHighlight() {
    const active = this._filteredOptions[this._highlightedIndex] || null;
    const detail: ComboboxHighlightDetail = {
      value: active?.value || null,
      label: active?.textContent?.trim() || null,
      item: active,
    };
    this.emit("highlight", detail);
  }
}
