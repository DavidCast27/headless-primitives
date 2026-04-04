import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";
import { AvatarState } from "./types";

@customElement("hp-avatar")
export class HeadlessAvatar extends HeadlessElement {
  @property({ type: Number, reflect: true }) delay = 0;

  private _state: AvatarState = "loading";
  private _delayTimeout: number | null = null;

  get state() {
    return this._state;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "avatar");
    if (!this.hasAttribute("role")) this.setAttribute("role", "img");
    this._updateState("loading");

    if (this.delay > 0) {
      this.style.setProperty("--hp-avatar-fallback-opacity", "0");
      this._delayTimeout = window.setTimeout(() => {
        if (this._state === "loading") {
          this.style.setProperty("--hp-avatar-fallback-opacity", "1");
        }
      }, this.delay);
    } else {
      this.style.setProperty("--hp-avatar-fallback-opacity", "1");
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._delayTimeout) clearTimeout(this._delayTimeout);
  }

  setImageStatus(status: "loaded" | "error") {
    this._updateState(status);
  }

  private _updateState(newState: AvatarState) {
    this._state = newState;
    this.setAttribute("data-state", newState);
    if (newState === "loaded") {
      this.style.setProperty("--hp-avatar-fallback-opacity", "0");
    }
    this.emit("state-change", { state: newState });
  }
}

@customElement("hp-avatar-image")
export class HeadlessAvatarImage extends HeadlessElement {
  @property({ type: String, reflect: true }) src = "";
  @property({ type: String, reflect: true }) alt = "";

  private _img: HTMLImageElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this._render();
  }

  protected updated(changed: Map<string, unknown>) {
    if (!this._img) return;
    if (changed.has("src")) this._img.src = this.src;
    if (changed.has("alt")) this._img.alt = this.alt;
  }

  private _render() {
    if (this._img) return;
    this._img = document.createElement("img");
    this._img.src = this.src;
    this._img.alt = this.alt;
    this._img.style.cssText = "width:100%;height:100%;object-fit:cover";
    this._img.onload = () => this._notifyParent("loaded");
    this._img.onerror = () => this._notifyParent("error");
    this.appendChild(this._img);
  }

  private _notifyParent(status: "loaded" | "error") {
    const parent = this.closest("hp-avatar") as HeadlessAvatar;
    parent?.setImageStatus(status);
  }
}

@customElement("hp-avatar-fallback")
export class HeadlessAvatarFallback extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.style.opacity = "var(--hp-avatar-fallback-opacity, 1)";
  }
}
