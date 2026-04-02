import { AvatarState } from "./types";

/**
 * Root component of the Avatar.
 * Coordinates the visibility of Image and Fallback.
 */
export class HeadlessAvatar extends HTMLElement {
  private _state: AvatarState = "loading";
  private _delayTimeout: number | null = null;

  static readonly observedAttributes = ["delay"];

  get state() {
    return this._state;
  }

  connectedCallback() {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "img");
    }
    this._updateState("loading");

    const delay = parseInt(this.getAttribute("delay") || "0", 10);
    if (delay > 0) {
      this.style.setProperty("--hp-avatar-fallback-opacity", "0");
      this._delayTimeout = window.setTimeout(() => {
        if (this._state === "loading") {
          this.style.setProperty("--hp-avatar-fallback-opacity", "1");
        }
      }, delay);
    } else {
      this.style.setProperty("--hp-avatar-fallback-opacity", "1");
    }
  }

  disconnectedCallback() {
    if (this._delayTimeout) {
      clearTimeout(this._delayTimeout);
    }
  }

  setImageStatus(status: "loaded" | "error") {
    this._updateState(status);
  }

  private _updateState(newState: AvatarState) {
    this._state = newState;
    this.setAttribute("data-state", newState);

    // El delay se sigue manejando con opacidad para transiciones suaves si el usuario quiere
    if (newState === "loaded") {
      this.style.setProperty("--hp-avatar-fallback-opacity", "0");
    }

    this.dispatchEvent(
      new CustomEvent("hp-state-change", {
        detail: { state: newState },
        bubbles: true,
      }),
    );
  }
}

/**
 * Image component of the Avatar.
 */
export class HeadlessAvatarImage extends HTMLElement {
  private _img: HTMLImageElement | null = null;

  static readonly observedAttributes = ["src", "alt"];

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue && this._img) {
      if (name === "src") this._img.src = newValue;
      if (name === "alt") this._img.alt = newValue;
    }
  }

  private _render() {
    if (this._img) return;

    this._img = document.createElement("img");
    this._img.src = this.getAttribute("src") || "";
    this._img.alt = this.getAttribute("alt") || "";
    this._img.style.width = "100%";
    this._img.style.height = "100%";
    this._img.style.objectFit = "cover";

    this._img.onload = () => this._notifyParent("loaded");
    this._img.onerror = () => this._notifyParent("error");

    this.appendChild(this._img);
  }

  private _notifyParent(status: "loaded" | "error") {
    const parent = this.closest("hp-avatar") as HeadlessAvatar;
    if (parent && typeof parent.setImageStatus === "function") {
      parent.setImageStatus(status);
    }
  }
}

/**
 * Fallback component of the Avatar.
 */
export class HeadlessAvatarFallback extends HTMLElement {
  connectedCallback() {
    this.style.opacity = "var(--hp-avatar-fallback-opacity, 1)";
  }
}
