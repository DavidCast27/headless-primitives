import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";
import type { NavigationMenuOpenDetail, NavigationMenuCloseDetail } from "./types";

// ---------------------------------------------------------------------------
// NavigationMenuIndicator — visual indicator tracking active trigger
// ---------------------------------------------------------------------------

@customElement("hp-navigation-menu-indicator")
export class NavigationMenuIndicator extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "navigation-menu-indicator");
    this.setAttribute("aria-hidden", "true");
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  private _sync() {
    this.setAttribute("data-state", "idle");
  }
}

// ---------------------------------------------------------------------------
// NavigationMenuLink — simple anchor-like element
// ---------------------------------------------------------------------------

@customElement("hp-navigation-menu-link")
export class NavigationMenuLink extends HeadlessElement {
  private _active = false;

  @property({ type: Boolean, reflect: true })
  get active(): boolean {
    return this._active;
  }
  set active(v: boolean) {
    this._active = Boolean(v);
    this._sync();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "navigation-menu-link");
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", "0");
    }
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  private _sync() {
    if (this._active) {
      this.setAttribute("data-active", "");
      this.setAttribute("aria-current", "page");
    } else {
      this.removeAttribute("data-active");
      this.removeAttribute("aria-current");
    }
  }
}

// ---------------------------------------------------------------------------
// NavigationMenuContent — flyout panel
// ---------------------------------------------------------------------------

@customElement("hp-navigation-menu-content")
export class NavigationMenuContent extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "navigation-menu-content");
    this.setAttribute("role", "region");
    if (!this.id) this.id = `hp-navigation-menu-content-${this.hpId}`;
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  private _sync() {
    const isOpen = this.getAttribute("data-state") === "open";
    // Initialize to closed if no data-state set yet
    if (!this.hasAttribute("data-state")) {
      this.setAttribute("data-state", "closed");
    }
    this.setAttribute("aria-hidden", isOpen ? "false" : "true");
  }

  setOpen(open: boolean) {
    this.setAttribute("data-state", open ? "open" : "closed");
    this.setAttribute("aria-hidden", open ? "false" : "true");
  }
}

// ---------------------------------------------------------------------------
// NavigationMenuTrigger — button that toggles a flyout
// ---------------------------------------------------------------------------

@customElement("hp-navigation-menu-trigger")
export class NavigationMenuTrigger extends HeadlessElement {
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "navigation-menu-trigger");
    this.setAttribute("role", "button");
    this.setAttribute("aria-haspopup", "true");
    if (!this.hasAttribute("tabindex") && !this.disabled) {
      this.setAttribute("tabindex", "0");
    }
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  private _sync() {
    const expanded = this.getAttribute("aria-expanded") || "false";
    this.setAttribute("aria-expanded", expanded);
    this.setAttribute("aria-disabled", String(this.disabled));
  }

  setExpanded(expanded: boolean) {
    this.setAttribute("aria-expanded", String(expanded));
    this.setAttribute("data-state", expanded ? "open" : "closed");
  }
}

// ---------------------------------------------------------------------------
// NavigationMenuItem — list item wrapper
// ---------------------------------------------------------------------------

@customElement("hp-navigation-menu-item")
export class NavigationMenuItem extends HeadlessElement {
  private _value = "";

  @property({ type: String, reflect: true })
  get value(): string {
    return this._value;
  }
  set value(v: string) {
    this._value = v;
    this._sync();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "navigation-menu-item");
    this.setAttribute("role", "none");
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  private _sync() {
    if (this._value) {
      this.setAttribute("data-value", this._value);
    }
  }

  getTrigger(): NavigationMenuTrigger | null {
    return this.querySelector("hp-navigation-menu-trigger");
  }

  getContent(): NavigationMenuContent | null {
    return this.querySelector("hp-navigation-menu-content");
  }
}

// ---------------------------------------------------------------------------
// NavigationMenuList — ul container
// ---------------------------------------------------------------------------

@customElement("hp-navigation-menu-list")
export class NavigationMenuList extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "navigation-menu-list");
    this.setAttribute("role", "menubar");
    this.setAttribute("aria-orientation", "horizontal");
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  private _sync() {
    // structural sync — no dynamic state
  }
}

// ---------------------------------------------------------------------------
// NavigationMenu — root element
// ---------------------------------------------------------------------------

@customElement("hp-navigation-menu")
export class NavigationMenu extends HeadlessElement {
  private _value = "";
  private _delay = 50;
  private _closeDelay = 300;
  private _openTimer: number | null = null;
  private _closeTimer: number | null = null;
  private _items: NavigationMenuItem[] = [];
  private _indicator: NavigationMenuIndicator | null = null;

  @property({ type: String, reflect: true })
  get value(): string {
    return this._value;
  }
  set value(v: string) {
    this._value = v;
    this._sync();
  }

  @property({ type: Number, attribute: "delay" })
  get delay(): number {
    return this._delay;
  }
  set delay(v: number) {
    this._delay = Number(v) || 50;
  }

  @property({ type: Number, attribute: "close-delay" })
  get closeDelay(): number {
    return this._closeDelay;
  }
  set closeDelay(v: number) {
    this._closeDelay = Number(v) || 50;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "navigation-menu");
    this.setAttribute("role", "navigation");
    if (!this.hasAttribute("aria-label")) {
      this.setAttribute("aria-label", "Main");
    }
    // Delegated listeners on the root — work regardless of when children are added
    this.addEventListener("click", this._onDelegatedClick);
    this.addEventListener("keydown", this._onDelegatedKeyDown);
    this.addEventListener("mouseenter", this._onDelegatedMouseEnter, true);
    this.addEventListener("mouseleave", this._onDelegatedMouseLeave, true);
    this._setupRefs();
    this._sync();
    requestAnimationFrame(() => {
      this._setupRefs();
      this._sync();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._onDelegatedClick);
    this.removeEventListener("keydown", this._onDelegatedKeyDown);
    this.removeEventListener("mouseenter", this._onDelegatedMouseEnter, true);
    this.removeEventListener("mouseleave", this._onDelegatedMouseLeave, true);
    this._removeGlobalListeners();
    this._clearTimers();
  }

  private _setupRefs() {
    const list = this.querySelector("hp-navigation-menu-list");
    this._items = list
      ? Array.from(list.children).filter(
          (el): el is NavigationMenuItem => el.tagName.toLowerCase() === "hp-navigation-menu-item",
        )
      : [];
    this._indicator = this.querySelector("hp-navigation-menu-indicator");
  }

  private _getTriggerFromEvent(e: Event): NavigationMenuTrigger | null {
    // composedPath() may be empty for synthetic events in happy-dom — fall back to target traversal
    const path = e.composedPath();
    const candidates: Element[] =
      path.length > 0
        ? path.filter((n): n is Element => n instanceof Element)
        : e.target instanceof Element
          ? [e.target, ...this._getAncestors(e.target)]
          : [];

    for (const el of candidates) {
      if (el.tagName.toLowerCase() === "hp-navigation-menu-trigger") {
        const item = this._getItemByTrigger(el);
        if (item && this._items.includes(item)) return el as NavigationMenuTrigger;
      }
    }
    return null;
  }

  private _getAncestors(el: Element): Element[] {
    const result: Element[] = [];
    let current: Element | null = el.parentElement;
    while (current) {
      result.push(current);
      current = current.parentElement;
    }
    return result;
  }

  private _getItemByTrigger(trigger: EventTarget | null): NavigationMenuItem | null {
    if (!trigger) return null;
    let el = trigger instanceof Element ? trigger.parentElement : null;
    while (el) {
      if (el.tagName.toLowerCase() === "hp-navigation-menu-item") {
        return el as NavigationMenuItem;
      }
      el = el.parentElement;
    }
    return null;
  }

  private _getContentFromEvent(e: Event): NavigationMenuContent | null {
    const path = e.composedPath();
    const candidates: Element[] =
      path.length > 0
        ? path.filter((n): n is Element => n instanceof Element)
        : e.target instanceof Element
          ? [e.target, ...this._getAncestors(e.target)]
          : [];

    for (const el of candidates) {
      if (el.tagName.toLowerCase() === "hp-navigation-menu-content") {
        for (const item of this._items) {
          if (item.getContent() === el) return el as NavigationMenuContent;
        }
      }
    }
    return null;
  }

  private _onDelegatedClick = (e: Event) => {
    this._setupRefs();
    const trigger = this._getTriggerFromEvent(e);
    if (!trigger || (trigger as NavigationMenuTrigger).disabled) return;
    e.stopPropagation();
    const item = this._getItemByTrigger(trigger);
    if (!item) return;
    this._clearTimers();
    this.toggle(item.value);
  };

  private _onDelegatedKeyDown = (e: KeyboardEvent) => {
    this._setupRefs();
    const trigger = this._getTriggerFromEvent(e);
    if (!trigger || (trigger as NavigationMenuTrigger).disabled) return;
    const item = this._getItemByTrigger(trigger);
    if (!item) return;
    const itemValue = item.value;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._clearTimers();
      this.toggle(itemValue);
    } else if (e.key === "Escape") {
      e.preventDefault();
      this._clearTimers();
      this.close();
      trigger.focus();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      this._focusAdjacentTrigger(trigger, 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      this._focusAdjacentTrigger(trigger, -1);
    } else if (e.key === "Tab") {
      this._clearTimers();
      this.close();
    }
  };

  private _onDelegatedMouseEnter = (e: MouseEvent) => {
    this._setupRefs();
    const trigger = this._getTriggerFromEvent(e);
    if (trigger) {
      if ((trigger as NavigationMenuTrigger).disabled) return;
      const item = this._getItemByTrigger(trigger);
      if (!item) return;
      const itemValue = item.value;
      this._clearCloseTimer();
      this._clearOpenTimer();
      if (this._value && this._value !== itemValue) {
        this.open(itemValue);
      } else {
        this._openTimer = window.setTimeout(() => this.open(itemValue), this._delay);
      }
      return;
    }
    const content = this._getContentFromEvent(e);
    if (content) {
      this._clearCloseTimer();
    }
  };

  private _onDelegatedMouseLeave = (e: MouseEvent) => {
    this._setupRefs();
    const trigger = this._getTriggerFromEvent(e);
    const content = this._getContentFromEvent(e);
    if (!trigger && !content) return;

    const related = e.relatedTarget as Node | null;
    if (related && this.contains(related)) return;
    if (related && this._isInsideActiveContent(related)) return;
    if (related && this._isInsideActiveItem(related)) return;

    this._clearOpenTimer();
    this._closeTimer = window.setTimeout(() => this.close(), this._closeDelay);
  };

  private _isInsideActiveContent(node: Node): boolean {
    const activeItem = this._items.find((i) => i.value === this._value);
    if (!activeItem) return false;
    const content = activeItem.getContent();
    return content ? content.contains(node) : false;
  }

  private _isInsideActiveItem(node: Node): boolean {
    const activeItem = this._items.find((i) => i.value === this._value);
    return activeItem ? activeItem.contains(node) : false;
  }

  private _onClickOutside = (e: MouseEvent) => {
    if (!this._value) return;
    const target = e.target as Node;
    if (!this.contains(target)) {
      this._clearTimers();
      this.close();
    }
  };

  private _onGlobalKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && this._value) {
      e.preventDefault();
      this._clearTimers();
      // Return focus to the active trigger
      const activeItem = this._items.find((i) => i.value === this._value);
      const activeTrigger = activeItem?.getTrigger();
      this.close();
      activeTrigger?.focus();
    }
  };

  private _focusAdjacentTrigger(current: NavigationMenuTrigger, delta: number) {
    const triggers = this._items
      .map((i) => i.getTrigger())
      .filter((t): t is NavigationMenuTrigger => t !== null && !t.disabled);

    const idx = triggers.indexOf(current);
    if (idx === -1) return;
    const next = (idx + delta + triggers.length) % triggers.length;
    triggers[next]?.focus();
  }

  private _sync() {
    this._setupRefs();

    for (const item of this._items) {
      const trigger = item.getTrigger();
      const content = item.getContent();
      const isOpen = item.value !== "" && item.value === this._value;

      if (trigger) {
        trigger.setExpanded(isOpen);
        if (content && !trigger.getAttribute("aria-controls")) {
          if (!content.id) content.id = `hp-navigation-menu-content-${item.hpId}`;
          trigger.setAttribute("aria-controls", content.id);
        }
      }

      if (content) {
        content.setOpen(isOpen);
      }
    }

    // Update indicator position
    this._updateIndicator();

    // Manage global listeners
    if (this._value) {
      document.addEventListener("click", this._onClickOutside);
      document.addEventListener("keydown", this._onGlobalKeydown);
    } else {
      document.removeEventListener("click", this._onClickOutside);
      document.removeEventListener("keydown", this._onGlobalKeydown);
    }
  }

  private _updateIndicator() {
    if (!this._indicator) return;
    const activeItem = this._items.find((i) => i.value === this._value);
    if (!activeItem || !this._value) {
      this._indicator.setAttribute("data-state", "hidden");
      this._indicator.style.width = "0px";
      return;
    }

    const trigger = activeItem.getTrigger();
    if (!trigger) return;

    const navRect = this.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const left = triggerRect.left - navRect.left;
    const width = triggerRect.width;

    this._indicator.setAttribute("data-state", "visible");
    this._indicator.style.left = `${left}px`;
    this._indicator.style.width = `${width}px`;
  }

  private _removeGlobalListeners() {
    document.removeEventListener("click", this._onClickOutside);
    document.removeEventListener("keydown", this._onGlobalKeydown);
  }

  private _clearOpenTimer() {
    if (this._openTimer !== null) {
      clearTimeout(this._openTimer);
      this._openTimer = null;
    }
  }

  private _clearCloseTimer() {
    if (this._closeTimer !== null) {
      clearTimeout(this._closeTimer);
      this._closeTimer = null;
    }
  }

  private _clearTimers() {
    this._clearOpenTimer();
    this._clearCloseTimer();
  }

  // Public API

  open(itemValue: string) {
    if (itemValue === this._value) return;
    const prevValue = this._value;
    this._value = itemValue;
    this._sync();
    if (prevValue) {
      const closeDetail: NavigationMenuCloseDetail = { value: prevValue };
      this.emit("close", closeDetail);
    }
    const openDetail: NavigationMenuOpenDetail = { value: itemValue };
    this.emit("open", openDetail);
  }

  close() {
    if (!this._value) return;
    const prevValue = this._value;
    this._value = "";
    this._sync();
    const closeDetail: NavigationMenuCloseDetail = { value: prevValue };
    this.emit("close", closeDetail);
  }

  toggle(itemValue: string) {
    if (this._value === itemValue) {
      this.close();
    } else {
      this.open(itemValue);
    }
  }
}
