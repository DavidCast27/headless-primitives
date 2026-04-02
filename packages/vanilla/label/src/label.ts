export class HeadlessLabel extends HTMLElement {
  static readonly observedAttributes = ["for", "id"];

  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
  }

  connectedCallback() {
    this.addEventListener("click", this._handleClick);
    this.addEventListener("mousedown", this._handleMouseDown);

    // Asegurar cursor pointer si no hay estilos
    if (!this.style.cursor) {
      this.style.cursor = "default";
    }

    // Evitar selección de texto por defecto al hacer click (como label nativo)
    if (!this.style.userSelect) {
      this.style.userSelect = "none";
    }

    this._updateAriaLink();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._handleClick);
    this.removeEventListener("mousedown", this._handleMouseDown);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === "for" || name === "id") {
      this._updateAriaLink();
    }
  }

  get htmlFor(): string | null {
    return this.getAttribute("for");
  }

  set htmlFor(value: string | null) {
    if (value) {
      this.setAttribute("for", value);
    } else {
      this.removeAttribute("for");
    }
  }

  private _handleClick(event: MouseEvent) {
    const targetId = this.htmlFor;
    if (!targetId) return;

    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    // Disparar el foco del elemento destino
    targetElement.focus();

    // Si el elemento es clickeable (como un switch), también disparamos el click
    // Pero evitamos recursión si el target es el mismo label (no debería pasar)
    if (targetElement !== event.target) {
      targetElement.click();
    }
  }

  private _handleMouseDown(event: MouseEvent) {
    // Evitar que el doble click seleccione el texto de la etiqueta
    if (event.detail > 1) {
      event.preventDefault();
    }
  }

  /**
   * Intenta vincular automáticamente el label con el elemento destino vía ARIA
   */
  private _updateAriaLink() {
    const targetId = this.htmlFor;
    if (!targetId) return;

    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    // Asegurar que el label tenga un ID para referenciarlo
    if (!this.id) {
      this.id = `hp-label-${Math.random().toString(36).slice(2, 9)}`;
    }

    // Vincular vía aria-labelledby. Se sobreescribe para asegurar sincronía.
    targetElement.setAttribute("aria-labelledby", this.id);
  }
}
