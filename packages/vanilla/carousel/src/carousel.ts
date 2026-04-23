import { html } from "lit";
import { property } from "lit/decorators.js";
import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { CarouselOrientation } from "./types";

/**
 * hp-carousel
 */
@customElement("hp-carousel")
export class HpCarousel extends HeadlessElement {
  @property({ type: String, reflect: true }) orientation: CarouselOrientation = "horizontal";
  @property({ type: Boolean, reflect: true }) loop = false;
  @property({ type: Number, reflect: true }) interval = 5000;

  private _autoplayTimer: any = null;
  private _activeIndex = 0;
  private _autoplay = false;
  private _label = "Carousel";

  private get _items(): HTMLElement[] {
    return Array.from(
      this.querySelector("hp-carousel-content")?.querySelectorAll("hp-carousel-item") ?? [],
    );
  }

  private get _dots(): HTMLElement[] {
    return Array.from(this.querySelectorAll("hp-carousel-dot"));
  }

  @property({ type: Boolean, reflect: true })
  get autoplay(): boolean {
    return this._autoplay;
  }
  set autoplay(val: boolean) {
    this._autoplay = val;
    if (val && this.isConnected) this.start();
    else this.stop();
  }

  @property({ type: String, reflect: true })
  get label(): string {
    return this._label;
  }
  set label(val: string) {
    this._label = val;
    this._sync();
  }

  get activeIndex(): number {
    return this._activeIndex;
  }
  set activeIndex(val: number) {
    this._activeIndex = val;
    this._updateItems();
    this._sync();
    this.emit("change", { activeIndex: val });
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "carousel");
    this.role = "region";
    this.setAttribute("aria-roledescription", "carousel");
    this._sync();
    requestAnimationFrame(() => {
      this._sync();
      requestAnimationFrame(() => {
        this._updateItems();
        // Fallback for VitePress hydration: retry if items not found yet
        if (this._items.length === 0) {
          setTimeout(() => this._updateItems(), 50);
        }
      });
    });

    if (this.autoplay) {
      this.start();
    }

    this.addEventListener("keydown", (e: KeyboardEvent) => {
      if (this.orientation === "horizontal") {
        if (e.key === "ArrowRight") this.next();
        if (e.key === "ArrowLeft") this.previous();
      } else {
        if (e.key === "ArrowDown") this.next();
        if (e.key === "ArrowUp") this.previous();
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stop();
  }

  private _sync() {
    this.setAttribute("aria-label", this.label);
  }

  private _updateItems() {
    this._items?.forEach((item, index) => {
      if (index === this.activeIndex) {
        item.setAttribute("data-state", "active");
        item.setAttribute("aria-hidden", "false");
      } else {
        item.setAttribute("data-state", "inactive");
        item.setAttribute("aria-hidden", "true");
      }
    });

    this._dots?.forEach((dot, index) => {
      dot.setAttribute("data-state", index === this.activeIndex ? "active" : "inactive");
      dot.setAttribute("aria-pressed", index === this.activeIndex ? "true" : "false");
    });
  }

  next() {
    const nextIndex = this.activeIndex + 1;
    if (nextIndex < this._items.length) {
      this.activeIndex = nextIndex;
    } else if (this.loop) {
      this.activeIndex = 0;
    }
  }

  previous() {
    const prevIndex = this.activeIndex - 1;
    if (prevIndex >= 0) {
      this.activeIndex = prevIndex;
    } else if (this.loop) {
      this.activeIndex = this._items.length - 1;
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this._items.length) {
      this.activeIndex = index;
    }
  }

  start() {
    if (this._autoplayTimer) return;
    this._autoplayTimer = setInterval(() => this.next(), this.interval);
  }

  stop() {
    if (this._autoplayTimer) {
      clearInterval(this._autoplayTimer);
      this._autoplayTimer = null;
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

/**
 * hp-carousel-content
 */
@customElement("hp-carousel-content")
export class HpCarouselContent extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "carousel-content");
    this.setAttribute("aria-live", "polite");
  }
  render() {
    return html`<slot></slot>`;
  }
}

/**
 * hp-carousel-item
 */
@customElement("hp-carousel-item")
export class HpCarouselItem extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "carousel-item");
    this.role = "group";
    this.setAttribute("aria-roledescription", "slide");
    this.setAttribute("data-state", "inactive");
  }

  render() {
    return html`<slot></slot>`;
  }
}

/**
 * hp-carousel-previous
 */
@customElement("hp-carousel-previous")
export class HpCarouselPrevious extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "carousel-previous");
    this.role = "button";
    this.tabIndex = 0;
    this.setAttribute("aria-label", "Previous slide");
    this.addEventListener("click", () => {
      const carousel = this.closest("hp-carousel") as HpCarousel;
      carousel?.previous();
    });
    this.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        (this.closest("hp-carousel") as HpCarousel)?.previous();
      }
    });
  }
  render() {
    return html`<slot></slot>`;
  }
}

/**
 * hp-carousel-next
 */
@customElement("hp-carousel-next")
export class HpCarouselNext extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "carousel-next");
    this.role = "button";
    this.tabIndex = 0;
    this.setAttribute("aria-label", "Next slide");
    this.addEventListener("click", () => {
      const carousel = this.closest("hp-carousel") as HpCarousel;
      carousel?.next();
    });
    this.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        (this.closest("hp-carousel") as HpCarousel)?.next();
      }
    });
  }
  render() {
    return html`<slot></slot>`;
  }
}

/**
 * hp-carousel-dot
 */
@customElement("hp-carousel-dot")
export class HpCarouselDot extends HeadlessElement {
  @property({ type: Number, reflect: true }) index = 0;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "carousel-dot");
    this.setAttribute("data-state", "inactive");
    this.role = "button";
    this.tabIndex = 0;
    this.setAttribute("aria-label", `Go to slide ${this.index + 1}`);
    this.addEventListener("click", () => {
      (this.closest("hp-carousel") as HpCarousel)?.goTo(this.index);
    });
    this.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        (this.closest("hp-carousel") as HpCarousel)?.goTo(this.index);
      }
    });
  }

  render() {
    return html`<slot></slot>`;
  }
}
