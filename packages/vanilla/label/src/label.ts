import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

@customElement("hp-label")
export class HeadlessLabel extends HeadlessElement {
  @property({ type: String, reflect: true, attribute: "for" })
  get htmlFor(): string | null {
    return this._htmlFor;
  }
  set htmlFor(val: string | null) {
    const old = this._htmlFor;
    this._htmlFor = val;
    this.requestUpdate("htmlFor", old);
    if (this.isConnected) this._updateAriaLink();
  }
  private _htmlFor: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "label");
    // Read initial 'for' attribute
    const forAttr = this.getAttribute("for");
    if (forAttr) this._htmlFor = forAttr;
    this.addEventListener("click", this._handleClick.bind(this));
    this.addEventListener("mousedown", this._handleMouseDown.bind(this));
    requestAnimationFrame(() => this._updateAriaLink());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._handleClick.bind(this));
    this.removeEventListener("mousedown", this._handleMouseDown.bind(this));
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("htmlFor")) this._updateAriaLink();
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null) {
    super.attributeChangedCallback(name, old, next);
    if (name === "for" && old !== next && this.isConnected) {
      this._htmlFor = next;
      this._updateAriaLink();
    }
  }

  private _handleClick(event: MouseEvent) {
    if (!this.htmlFor) return;
    const target = document.getElementById(this.htmlFor);
    if (!target) return;
    target.focus();
    if (target !== event.target) target.click();
  }

  private _handleMouseDown(event: MouseEvent) {
    if (event.detail > 1) event.preventDefault();
  }

  private _updateAriaLink() {
    if (!this.htmlFor) return;
    const target = document.getElementById(this.htmlFor);
    if (!target) return;
    if (!this.id) this.id = `hp-label-${this.hpId}`;
    target.setAttribute("aria-labelledby", this.id);
  }
}
