import { SeparatorOrientation } from "./types";

export class HeadlessSeparator extends HTMLElement {
  static readonly observedAttributes = ["orientation"];

  private _orientation: SeparatorOrientation = "horizontal";

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "separator");
    }
    this._updateAria();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === "orientation") {
      this._orientation =
        (newValue as SeparatorOrientation) === "vertical" ? "vertical" : "horizontal";
      this._updateAria();
    }
  }

  /**
   * Obtiene o establece la orientación del separador.
   * Valores válidos: 'horizontal' (por defecto), 'vertical'.
   */
  get orientation(): SeparatorOrientation {
    return this._orientation;
  }

  set orientation(value: SeparatorOrientation) {
    this.setAttribute("orientation", value);
  }

  private _updateAria() {
    this.setAttribute("aria-orientation", this._orientation);
  }
}
