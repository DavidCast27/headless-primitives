import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";
import type { StepCompleteDetail, StepState } from "./types";

// ---------------------------------------------------------------------------
// hp-stepper — root container
// ---------------------------------------------------------------------------

@customElement("hp-stepper")
export class Stepper extends HeadlessElement {
  /** 0-based index of the currently active step */
  private _value = 0;

  @property({ type: Number })
  get value(): number {
    return this._value;
  }
  set value(v: number) {
    const prev = this._value;
    this._value = v;
    this._sync();
    if (prev !== v) {
      this.emit("change", { value: v, prev });
    }
  }

  /**
   * Total number of steps. When set as a number the stepper creates that many
   * anonymous step slots. When children provide `hp-stepper-item` elements the
   * count is derived automatically from the DOM.
   */
  private _steps = 0;

  @property({ type: Number })
  get steps(): number {
    return this._steps;
  }
  set steps(v: number) {
    this._steps = v;
    this._sync();
  }

  /** Layout orientation of the step list. */
  private _orientation: "horizontal" | "vertical" = "horizontal";

  @property({ type: String, reflect: true })
  get orientation(): "horizontal" | "vertical" {
    return this._orientation;
  }
  set orientation(v: "horizontal" | "vertical") {
    this._orientation = v;
    this._sync();
  }

  /**
   * When true, the user can only navigate forward one step at a time (no
   * jumping ahead). Going back is always allowed.
   */
  private _linear = false;

  @property({ type: Boolean, reflect: true })
  get linear(): boolean {
    return this._linear;
  }
  set linear(v: boolean) {
    this._linear = v;
    this._sync();
  }

  /** True after complete() is called — all steps show as completed. */
  private _done = false;

  // Bound event handlers stored for clean removal
  private _boundHandleKeyDown = this._handleKeyDown.bind(this);

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "group");
    this.setAttribute("data-hp-component", "stepper");
    this.setAttribute("data-orientation", this._orientation);

    this.addEventListener("keydown", this._boundHandleKeyDown);

    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._boundHandleKeyDown);
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (
      (name === "value" || name === "steps" || name === "linear") &&
      old !== next &&
      this.isConnected
    ) {
      this._sync();
    }
  }

  // ---------------------------------------------------------------------------
  // Public navigation API
  // ---------------------------------------------------------------------------

  /**
   * Mark the wizard as fully completed. All steps become "completed",
   * the root gets data-state="completed", and hp-complete is emitted.
   * Calling next() or goTo() after this is a no-op.
   */
  complete() {
    if (this._done) return;
    this._done = true;
    const total = this._totalSteps();
    this._value = total; // beyond last index so all items read as completed
    this._sync();
    this.emit("complete", { steps: total } satisfies StepCompleteDetail);
  }

  /** Move to the next step if one exists. */
  next() {
    if (this._done) return;
    const total = this._totalSteps();
    if (this._value < total - 1) {
      this.value = this._value + 1;
    }
  }

  /** Move to the previous step if one exists. */
  prev() {
    if (this._done) return;
    if (this._value > 0) {
      this.value = this._value - 1;
    }
  }

  /**
   * Jump to any step by index. Respects `linear` mode — when linear is true
   * the user can only jump forward to steps that are already completed+1.
   */
  goTo(index: number) {
    if (this._done) return;
    const total = this._totalSteps();
    if (index < 0 || index >= total) return;
    if (this._linear && index > this._value + 1) return;
    this.value = index;
  }

  // ---------------------------------------------------------------------------
  // Internal helpers
  // ---------------------------------------------------------------------------

  private _totalSteps(): number {
    const items = this.querySelectorAll("hp-stepper-item");
    return items.length > 0 ? items.length : this._steps;
  }

  _sync() {
    try {
      this.setAttribute("data-orientation", this._orientation);

      const list = this.querySelector("hp-stepper-list");
      if (list) list.setAttribute("aria-orientation", this._orientation);

      const current = this._value;
      const items = Array.from(this.querySelectorAll<HTMLElement>("hp-stepper-item"));
      const panels = Array.from(this.querySelectorAll<HTMLElement>("hp-stepper-panel"));

      items.forEach((item, i) => {
        const state: StepState = i < current ? "completed" : i === current ? "active" : "pending";
        const isActive = i === current && !this._done;
        item.setAttribute("data-state", state);
        item.setAttribute("data-index", String(i));
        item.setAttribute("aria-selected", String(i === current));
        item.setAttribute("tabindex", i === current ? "0" : "-1");

        // APG: aria-current="step" identifies the active step in the workflow
        if (isActive) {
          item.setAttribute("aria-current", "step");
        } else {
          item.removeAttribute("aria-current");
        }

        // In linear mode, steps beyond current+1 are unreachable
        const isDisabled = this._linear && i > current + 1;
        item.setAttribute("aria-disabled", String(isDisabled));
      });

      panels.forEach((panel, i) => {
        const isActive = i === current;
        panel.setAttribute("data-state", isActive ? "active" : "hidden");
        panel.setAttribute("aria-hidden", String(!isActive));
        panel.setAttribute("data-index", String(i));
      });

      // Root done state
      if (this._done) {
        this.setAttribute("data-state", "completed");
      } else {
        this.removeAttribute("data-state");
      }

      // Sync prev/next/finish buttons
      const prevBtns = Array.from(this.querySelectorAll<HTMLElement>("hp-stepper-prev"));
      const nextBtns = Array.from(this.querySelectorAll<HTMLElement>("hp-stepper-next"));
      const finishBtns = Array.from(this.querySelectorAll<HTMLElement>("hp-stepper-finish"));
      const total = this._totalSteps();
      const isLast = current >= total - 1;

      prevBtns.forEach((btn) => {
        const disabled = current === 0 || this._done;
        btn.setAttribute("aria-disabled", String(disabled));
        btn.toggleAttribute("disabled", disabled);
      });

      nextBtns.forEach((btn) => {
        const disabled = isLast || this._done;
        btn.setAttribute("aria-disabled", String(disabled));
        btn.toggleAttribute("disabled", disabled);
      });

      finishBtns.forEach((btn) => {
        const disabled = !isLast || this._done;
        btn.setAttribute("aria-disabled", String(disabled));
        btn.toggleAttribute("disabled", disabled);
      });
    } catch {
      // Defensive: DOM timing safety
    }
  }

  private _handleKeyDown(event: KeyboardEvent) {
    const list = this.querySelector("hp-stepper-list");
    if (!list) return;

    const items = Array.from(this.querySelectorAll<HTMLElement>("hp-stepper-item")).filter(
      (item) => item.getAttribute("aria-disabled") !== "true",
    );

    const currentFocused = items.find((item) => item.getAttribute("aria-selected") === "true");
    const currentIndex = currentFocused ? items.indexOf(currentFocused) : 0;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown": {
        event.preventDefault();
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        const nextItem = items[nextIndex];
        if (nextItem) {
          const realIndex = Number(nextItem.getAttribute("data-index") ?? nextIndex);
          this.goTo(realIndex);
          nextItem.focus();
        }
        break;
      }
      case "ArrowLeft":
      case "ArrowUp": {
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        const prevItem = items[prevIndex];
        if (prevItem) {
          const realIndex = Number(prevItem.getAttribute("data-index") ?? prevIndex);
          this.goTo(realIndex);
          prevItem.focus();
        }
        break;
      }
      case "Home": {
        event.preventDefault();
        const first = items[0];
        if (first) {
          this.goTo(0);
          first.focus();
        }
        break;
      }
      case "End": {
        event.preventDefault();
        const last = items[items.length - 1];
        if (last) {
          const realIndex = Number(last.getAttribute("data-index") ?? items.length - 1);
          this.goTo(realIndex);
          last.focus();
        }
        break;
      }
      default:
        break;
    }
  }
}

// ---------------------------------------------------------------------------
// hp-stepper-list — step indicator list
// ---------------------------------------------------------------------------

@customElement("hp-stepper-list")
export class StepperList extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tablist");
    this.setAttribute("aria-orientation", "horizontal");
    this.setAttribute("data-hp-component", "stepper-list");
    this.setAttribute("data-hp-stepper-list", "");
  }
}

// ---------------------------------------------------------------------------
// hp-stepper-item — individual step indicator
// ---------------------------------------------------------------------------

@customElement("hp-stepper-item")
export class StepperItem extends HeadlessElement {
  private _index = 0;

  @property({ type: Number, reflect: true })
  get index(): number {
    return this._index;
  }
  set index(v: number) {
    this._index = v;
    this._sync();
  }

  private _boundHandleClick = this._handleClick.bind(this);

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tab");
    this.setAttribute("data-hp-component", "stepper-item");
    this.setAttribute("data-hp-stepper-item", "");

    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", "-1");
    }

    this.addEventListener("click", this._boundHandleClick);
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._boundHandleClick);
  }

  private _sync() {
    if (!this.hasAttribute("data-state")) {
      this.setAttribute("data-state", "pending");
    }
    if (!this.hasAttribute("aria-selected")) {
      this.setAttribute("aria-selected", "false");
    }
  }

  private _handleClick() {
    if (this.getAttribute("aria-disabled") === "true") return;
    const root = this.closest<Stepper>("hp-stepper");
    if (!root) return;

    // Determine real index from data-index attribute (set by root during sync)
    const idx = Number(this.getAttribute("data-index") ?? this._index);
    root.goTo(idx);
    this.focus();
  }
}

// ---------------------------------------------------------------------------
// hp-stepper-panel — content panel for a step
// ---------------------------------------------------------------------------

@customElement("hp-stepper-panel")
export class StepperPanel extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tabpanel");
    this.setAttribute("data-hp-component", "stepper-panel");
    this.setAttribute("data-hp-stepper-panel", "");

    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", "0");
    }

    if (!this.hasAttribute("data-state")) {
      this.setAttribute("data-state", "hidden");
    }
  }
}

// ---------------------------------------------------------------------------
// hp-stepper-prev — previous step button
// ---------------------------------------------------------------------------

@customElement("hp-stepper-prev")
export class StepperPrev extends HeadlessElement {
  private _boundHandleClick = this._handleClick.bind(this);

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "stepper-prev");
    this.setAttribute("data-hp-stepper-nav", "prev");
    this.addEventListener("click", this._boundHandleClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._boundHandleClick);
  }

  private _handleClick() {
    if (this.hasAttribute("disabled") || this.getAttribute("aria-disabled") === "true") return;
    const root = this.closest<Stepper>("hp-stepper");
    root?.prev();
  }
}

// ---------------------------------------------------------------------------
// hp-stepper-next — next step button
// ---------------------------------------------------------------------------

@customElement("hp-stepper-next")
export class StepperNext extends HeadlessElement {
  private _boundHandleClick = this._handleClick.bind(this);

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "stepper-next");
    this.setAttribute("data-hp-stepper-nav", "next");
    this.addEventListener("click", this._boundHandleClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._boundHandleClick);
  }

  private _handleClick() {
    if (this.hasAttribute("disabled") || this.getAttribute("aria-disabled") === "true") return;
    const root = this.closest<Stepper>("hp-stepper");
    root?.next();
  }
}

// ---------------------------------------------------------------------------
// hp-stepper-finish — completes the stepper on the last step
// ---------------------------------------------------------------------------

@customElement("hp-stepper-finish")
export class StepperFinish extends HeadlessElement {
  private _boundHandleClick = this._handleClick.bind(this);

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "stepper-finish");
    this.setAttribute("data-hp-stepper-nav", "finish");
    this.addEventListener("click", this._boundHandleClick);
    // Initial state — disabled until the root syncs
    this.setAttribute("aria-disabled", "true");
    this.toggleAttribute("disabled", true);
    requestAnimationFrame(() => this.closest<Stepper>("hp-stepper")?._sync());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._boundHandleClick);
  }

  private _handleClick() {
    if (this.hasAttribute("disabled") || this.getAttribute("aria-disabled") === "true") return;
    const root = this.closest<Stepper>("hp-stepper");
    root?.complete();
  }
}
