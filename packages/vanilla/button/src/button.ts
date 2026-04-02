/**
 * HeadlessButton
 * Un primitivo que extiende HTMLElement para proporcionar semántica de botón,
 * accesibilidad (a11y) nativa, manejo de teclado y un estado opcional de "toggle".
 */
export class HeadlessButton extends HTMLElement {
  static get observedAttributes(): string[] {
    return ["aria-pressed", "disabled"];
  }

  connectedCallback(): void {
    // Si el usuario no proveyó un rol explicito, asumimos botón
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "button");
    }

    // Asegurar que el elemento pueda enfocarse por teclado nativamente (como un <button>)
    if (!this.hasAttribute("tabindex") && !this.hasAttribute("disabled")) {
      this.setAttribute("tabindex", "0");
    }

    // Bindings de eventos
    this.addEventListener("click", this._onClick);
    this.addEventListener("keydown", this._onKeyDown);
  }

  disconnectedCallback(): void {
    // Limpieza estricta de memoria requerida por nuestra convención ADR
    this.removeEventListener("click", this._onClick);
    this.removeEventListener("keydown", this._onKeyDown);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue === newValue) return;

    if (name === "disabled") {
      if (newValue !== null) {
        // Remover del orden de foco cuando se desactiva
        this.removeAttribute("tabindex");
        this.setAttribute("aria-disabled", "true");
      } else {
        // Restaurar estado
        this.setAttribute("tabindex", "0");
        this.removeAttribute("aria-disabled");
      }
    }
  }

  /**
   * Evalúa y alterna el estado presionado (toggle state) si está configurado.
   */
  private _togglePressed(): void {
    if (this.hasAttribute("disabled")) return;

    // Si el usuario inicializó el componente con `aria-pressed`, actúa como Toggle
    if (this.hasAttribute("aria-pressed")) {
      const isPressed = this.getAttribute("aria-pressed") === "true";
      const newState = !isPressed;

      this.setAttribute("aria-pressed", String(newState));

      // Emitir custom event según la regla arquitectónica
      this.dispatchEvent(
        new CustomEvent("hp-change", {
          detail: { pressed: newState },
          bubbles: true,
          composed: true, // Cruza el Shadow Boundary en caso de ser inyectado allí
        }),
      );
    }
  }

  private _onClick = (e: MouseEvent): void => {
    if (this.hasAttribute("disabled")) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this._togglePressed();
  };

  /**
   * Garantiza que el primitivo funcione como botón real al usar el teclado.
   */
  private _onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click(); // Desencadena el evento nativo en lugar de duplicar lógica
    }
  };
}

// Registrar el elemento si no existe (importante para evitar errores en SSR/HMR)
if (typeof window !== "undefined" && !customElements.get("hp-button")) {
  customElements.define("hp-button", HeadlessButton);
}
