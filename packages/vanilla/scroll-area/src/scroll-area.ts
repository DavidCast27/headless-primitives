import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";
import type { ScrollAreaOrientation } from "./types";

/**
 * hp-scroll-area
 *
 * Contenedor de área de scroll con scrollbars personalizados y accesibles.
 * Sigue el patrón WAI-ARIA scrollbar (role="scrollbar").
 *
 * Anatomía:
 *   <hp-scroll-area>
 *     <hp-scroll-area-viewport>
 *       <hp-scroll-area-content>...</hp-scroll-area-content>
 *     </hp-scroll-area-viewport>
 *     <hp-scroll-area-scrollbar orientation="vertical">
 *       <hp-scroll-area-thumb></hp-scroll-area-thumb>
 *     </hp-scroll-area-scrollbar>
 *     <hp-scroll-area-scrollbar orientation="horizontal">
 *       <hp-scroll-area-thumb></hp-scroll-area-thumb>
 *     </hp-scroll-area-scrollbar>
 *     <hp-scroll-area-corner></hp-scroll-area-corner>
 *   </hp-scroll-area>
 */
@customElement("hp-scroll-area")
export class HeadlessScrollArea extends HeadlessElement {
  @property({ type: String, reflect: true })
  get orientation(): ScrollAreaOrientation {
    return this._orientation;
  }
  set orientation(v: ScrollAreaOrientation) {
    this._orientation = v;
    this._sync();
  }

  private _orientation: ScrollAreaOrientation = "vertical";

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "scroll-area");
    this._sync();
    requestAnimationFrame(() => this._sync());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private _sync() {
    this.setAttribute("data-orientation", this._orientation);
  }
}

/**
 * hp-scroll-area-viewport
 *
 * El contenedor scrollable real. Oculta los scrollbars nativos del navegador
 * para que los scrollbars personalizados tomen el control visual.
 */
@customElement("hp-scroll-area-viewport")
export class HeadlessScrollAreaViewport extends HeadlessElement {
  private _viewportId = "";

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "scroll-area-viewport");
    this._viewportId = `hp-scroll-area-viewport-${this.hpId}`;
    if (!this.id) this.id = this._viewportId;

    this.addEventListener("scroll", this._handleScroll, { passive: true });
    requestAnimationFrame(() => this._updateScrollbars());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("scroll", this._handleScroll);
  }

  private _handleScroll = () => {
    this._updateScrollbars();
    this._updateOverflowAttributes();
    this.emit("scroll", {
      scrollTop: this.scrollTop,
      scrollLeft: this.scrollLeft,
      scrollHeight: this.scrollHeight,
      scrollWidth: this.scrollWidth,
      clientHeight: this.clientHeight,
      clientWidth: this.clientWidth,
    });
  };

  private _updateScrollbars() {
    const root = this.closest("hp-scroll-area");
    if (!root) return;

    // Update vertical scrollbar thumb
    const vScrollbar = root.querySelector<HeadlessScrollAreaScrollbar>(
      'hp-scroll-area-scrollbar[orientation="vertical"]',
    );
    if (vScrollbar) {
      const thumb = vScrollbar.querySelector<HeadlessScrollAreaThumb>("hp-scroll-area-thumb");
      if (thumb) {
        const trackHeight = vScrollbar.clientHeight;
        const thumbHeight = Math.max(20, (this.clientHeight / this.scrollHeight) * trackHeight);
        const thumbTop =
          (this.scrollTop / (this.scrollHeight - this.clientHeight)) * (trackHeight - thumbHeight);
        thumb.style.height = `${thumbHeight}px`;
        thumb.style.transform = `translateY(${thumbTop}px)`;
      }
      // Show/hide scrollbar based on overflow
      const hasOverflow = this.scrollHeight > this.clientHeight;
      vScrollbar.setAttribute("data-state", hasOverflow ? "visible" : "hidden");
      vScrollbar.setAttribute("aria-valuenow", String(Math.round(this.scrollTop)));
      vScrollbar.setAttribute(
        "aria-valuemax",
        String(Math.round(this.scrollHeight - this.clientHeight)),
      );
    }

    // Update horizontal scrollbar thumb
    const hScrollbar = root.querySelector<HeadlessScrollAreaScrollbar>(
      'hp-scroll-area-scrollbar[orientation="horizontal"]',
    );
    if (hScrollbar) {
      const thumb = hScrollbar.querySelector<HeadlessScrollAreaThumb>("hp-scroll-area-thumb");
      if (thumb) {
        const trackWidth = hScrollbar.clientWidth;
        const thumbWidth = Math.max(20, (this.clientWidth / this.scrollWidth) * trackWidth);
        const thumbLeft =
          (this.scrollLeft / (this.scrollWidth - this.clientWidth)) * (trackWidth - thumbWidth);
        thumb.style.width = `${thumbWidth}px`;
        thumb.style.transform = `translateX(${thumbLeft}px)`;
      }
      const hasOverflow = this.scrollWidth > this.clientWidth;
      hScrollbar.setAttribute("data-state", hasOverflow ? "visible" : "hidden");
      hScrollbar.setAttribute("aria-valuenow", String(Math.round(this.scrollLeft)));
      hScrollbar.setAttribute(
        "aria-valuemax",
        String(Math.round(this.scrollWidth - this.clientWidth)),
      );
    }

    // Update corner visibility
    const corner = root.querySelector("hp-scroll-area-corner");
    if (corner) {
      const hasV = this.scrollHeight > this.clientHeight;
      const hasH = this.scrollWidth > this.clientWidth;
      corner.setAttribute("data-state", hasV && hasH ? "visible" : "hidden");
    }
  }

  private _updateOverflowAttributes() {
    const root = this.closest("hp-scroll-area");
    if (!root) return;

    const hasOverflowY = this.scrollHeight > this.clientHeight;
    const hasOverflowX = this.scrollWidth > this.clientWidth;
    const atTopY = this.scrollTop <= 0;
    const atBottomY = this.scrollTop + this.clientHeight >= this.scrollHeight - 1;
    const atStartX = this.scrollLeft <= 0;
    const atEndX = this.scrollLeft + this.clientWidth >= this.scrollWidth - 1;

    root.toggleAttribute("data-has-overflow-y", hasOverflowY);
    root.toggleAttribute("data-has-overflow-x", hasOverflowX);
    root.toggleAttribute("data-overflow-y-start", hasOverflowY && !atTopY);
    root.toggleAttribute("data-overflow-y-end", hasOverflowY && !atBottomY);
    root.toggleAttribute("data-overflow-x-start", hasOverflowX && !atStartX);
    root.toggleAttribute("data-overflow-x-end", hasOverflowX && !atEndX);

    // CSS custom properties for gradient fade effect
    const overflowYStart = this.scrollTop;
    const overflowYEnd = this.scrollHeight - this.clientHeight - this.scrollTop;
    const overflowXStart = this.scrollLeft;
    const overflowXEnd = this.scrollWidth - this.clientWidth - this.scrollLeft;

    this.style.setProperty("--scroll-area-overflow-y-start", `${overflowYStart}px`);
    this.style.setProperty("--scroll-area-overflow-y-end", `${overflowYEnd}px`);
    this.style.setProperty("--scroll-area-overflow-x-start", `${overflowXStart}px`);
    this.style.setProperty("--scroll-area-overflow-x-end", `${overflowXEnd}px`);
  }

  /** Expone el método para que los scrollbars puedan forzar una actualización */
  syncScrollbars() {
    this._updateScrollbars();
    this._updateOverflowAttributes();
  }
}

/**
 * hp-scroll-area-content
 *
 * Wrapper del contenido dentro del viewport. Permite que el contenido
 * sea más grande que el viewport para activar el scroll.
 */
@customElement("hp-scroll-area-content")
export class HeadlessScrollAreaContent extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "scroll-area-content");
  }
}

/**
 * hp-scroll-area-scrollbar
 *
 * Scrollbar personalizado. Soporta orientación vertical y horizontal.
 * Implementa role="scrollbar" con atributos ARIA correctos.
 */
@customElement("hp-scroll-area-scrollbar")
export class HeadlessScrollAreaScrollbar extends HeadlessElement {
  @property({ type: String, reflect: true })
  get orientation(): "vertical" | "horizontal" {
    return this._orientation;
  }
  set orientation(v: "vertical" | "horizontal") {
    this._orientation = v;
    this._sync();
  }

  private _orientation: "vertical" | "horizontal" = "vertical";
  private _isDragging = false;
  private _dragStartPos = 0;
  private _dragStartScroll = 0;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "scroll-area-scrollbar");
    this.setAttribute("role", "scrollbar");
    this.setAttribute("tabindex", "0");
    this._sync();

    this.addEventListener("mousedown", this._handleTrackClick);
    this.addEventListener("keydown", this._handleKeyDown);
    requestAnimationFrame(() => this._initAria());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mousedown", this._handleTrackClick);
    this.removeEventListener("keydown", this._handleKeyDown);
  }

  private _sync() {
    this.setAttribute("data-orientation", this._orientation);
    this.setAttribute("aria-orientation", this._orientation);
  }

  private _initAria() {
    const viewport = this._getViewport();
    if (!viewport) return;
    if (viewport.id) this.setAttribute("aria-controls", viewport.id);
    this.setAttribute("aria-valuemin", "0");
    this.setAttribute("aria-valuenow", "0");
    const max =
      this._orientation === "vertical"
        ? Math.max(0, viewport.scrollHeight - viewport.clientHeight)
        : Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    this.setAttribute("aria-valuemax", String(Math.round(max)));
  }

  private _getViewport(): HeadlessScrollAreaViewport | null {
    const root = this.closest("hp-scroll-area");
    return root?.querySelector<HeadlessScrollAreaViewport>("hp-scroll-area-viewport") ?? null;
  }

  private _handleTrackClick = (e: MouseEvent) => {
    const thumb = this.querySelector<HeadlessScrollAreaThumb>("hp-scroll-area-thumb");
    if (!thumb) return;
    // If click is on the thumb itself, delegate to thumb drag
    if (e.target === thumb || thumb.contains(e.target as Node)) return;

    const viewport = this._getViewport();
    if (!viewport) return;

    const rect = this.getBoundingClientRect();
    if (this._orientation === "vertical") {
      const clickRatio = (e.clientY - rect.top) / rect.height;
      viewport.scrollTop = clickRatio * (viewport.scrollHeight - viewport.clientHeight);
    } else {
      const clickRatio = (e.clientX - rect.left) / rect.width;
      viewport.scrollLeft = clickRatio * (viewport.scrollWidth - viewport.clientWidth);
    }
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    const viewport = this._getViewport();
    if (!viewport) return;

    const step = 40;
    const pageStep =
      this._orientation === "vertical" ? viewport.clientHeight : viewport.clientWidth;

    switch (e.key) {
      case "ArrowDown":
        if (this._orientation === "vertical") {
          e.preventDefault();
          viewport.scrollTop += step;
        }
        break;
      case "ArrowUp":
        if (this._orientation === "vertical") {
          e.preventDefault();
          viewport.scrollTop -= step;
        }
        break;
      case "ArrowRight":
        if (this._orientation === "horizontal") {
          e.preventDefault();
          viewport.scrollLeft += step;
        }
        break;
      case "ArrowLeft":
        if (this._orientation === "horizontal") {
          e.preventDefault();
          viewport.scrollLeft -= step;
        }
        break;
      case "PageDown":
        e.preventDefault();
        if (this._orientation === "vertical") viewport.scrollTop += pageStep;
        else viewport.scrollLeft += pageStep;
        break;
      case "PageUp":
        e.preventDefault();
        if (this._orientation === "vertical") viewport.scrollTop -= pageStep;
        else viewport.scrollLeft -= pageStep;
        break;
      case "Home":
        e.preventDefault();
        if (this._orientation === "vertical") viewport.scrollTop = 0;
        else viewport.scrollLeft = 0;
        break;
      case "End":
        e.preventDefault();
        if (this._orientation === "vertical") viewport.scrollTop = viewport.scrollHeight;
        else viewport.scrollLeft = viewport.scrollWidth;
        break;
    }
  };

  startThumbDrag(startPos: number, startScroll: number) {
    this._isDragging = true;
    this._dragStartPos = startPos;
    this._dragStartScroll = startScroll;
    this.setAttribute("data-dragging", "");

    const onMove = (e: MouseEvent) => {
      if (!this._isDragging) return;
      const viewport = this._getViewport();
      if (!viewport) return;

      const delta =
        this._orientation === "vertical"
          ? e.clientY - this._dragStartPos
          : e.clientX - this._dragStartPos;

      const trackSize = this._orientation === "vertical" ? this.clientHeight : this.clientWidth;
      const contentSize =
        this._orientation === "vertical" ? viewport.scrollHeight : viewport.scrollWidth;
      const viewportSize =
        this._orientation === "vertical" ? viewport.clientHeight : viewport.clientWidth;

      const scrollRatio =
        (contentSize - viewportSize) / (trackSize - (viewportSize / contentSize) * trackSize);
      const scrollDelta = delta * scrollRatio;

      if (this._orientation === "vertical") {
        viewport.scrollTop = this._dragStartScroll + scrollDelta;
      } else {
        viewport.scrollLeft = this._dragStartScroll + scrollDelta;
      }
    };

    const onUp = () => {
      this._isDragging = false;
      this.removeAttribute("data-dragging");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }
}

/**
 * hp-scroll-area-thumb
 *
 * El indicador de posición dentro del scrollbar.
 * Su tamaño y posición se calculan dinámicamente según el contenido.
 */
@customElement("hp-scroll-area-thumb")
export class HeadlessScrollAreaThumb extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "scroll-area-thumb");
    this.addEventListener("mousedown", this._handleMouseDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mousedown", this._handleMouseDown);
  }

  private _handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const scrollbar = this.closest<HeadlessScrollAreaScrollbar>("hp-scroll-area-scrollbar");
    if (!scrollbar) return;

    const viewport = scrollbar
      .closest("hp-scroll-area")
      ?.querySelector<HeadlessScrollAreaViewport>("hp-scroll-area-viewport");
    if (!viewport) return;

    const startPos = scrollbar.orientation === "vertical" ? e.clientY : e.clientX;
    const startScroll =
      scrollbar.orientation === "vertical" ? viewport.scrollTop : viewport.scrollLeft;

    scrollbar.startThumbDrag(startPos, startScroll);
  };
}

/**
 * hp-scroll-area-corner
 *
 * Esquina donde se intersectan los dos scrollbars.
 * Solo visible cuando ambos scrollbars están activos.
 */
@customElement("hp-scroll-area-corner")
export class HeadlessScrollAreaCorner extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "scroll-area-corner");
    this.setAttribute("aria-hidden", "true");
  }
}
