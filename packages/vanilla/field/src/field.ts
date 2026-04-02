/**
 * Headless Field Primitive
 *
 * A coordination component for form fields that automatically links
 * labels, descriptions, and error messages to a control element.
 */
export class HeadlessField extends HTMLElement {
  private _baseId = `hp-field-${Math.random().toString(36).slice(2, 9)}`;
  private _observer: MutationObserver | null = null;

  get baseId() {
    return this._baseId;
  }

  connectedCallback() {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "group");
    }

    // Observamos cambios en los hijos para notificar al control
    this._observer = new MutationObserver(() => this.notifyControl());
    this._observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    this._observer?.disconnect();
  }

  notifyControl() {
    const control = this.querySelector("hp-field-control") as any;
    if (control && typeof control.updateControl === "function") {
      control.updateControl();
    }
  }
}

/**
 * Field Label - Automatically links to the field's control.
 */
export class HeadlessFieldLabel extends HTMLElement {
  connectedCallback() {
    const parent = this.closest("hp-field") as HeadlessField;
    if (parent) {
      if (!this.hasAttribute("for")) {
        this.setAttribute("for", `${parent.baseId}-control`);
      }

      if (!this.id) {
        this.id = `${parent.baseId}-label`;
      }
    }
  }
}

/**
 * Field Description - Automatically sets ID for linking.
 */
export class HeadlessFieldDescription extends HTMLElement {
  connectedCallback() {
    const parent = this.closest("hp-field") as HeadlessField;
    if (parent && !this.id) {
      this.id = `${parent.baseId}-description`;
    }
  }
}

/**
 * Field Error - Automatically sets ID and handles visibility.
 */
export class HeadlessFieldError extends HTMLElement {
  connectedCallback() {
    const parent = this.closest("hp-field") as HeadlessField;
    if (parent && !this.id) {
      this.id = `${parent.baseId}-error`;
    }

    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "alert");
    }
  }
}

/**
 * Field Control - Injects necessary ARIA attributes into the slotted control.
 */
export class HeadlessFieldControl extends HTMLElement {
  private _observer: MutationObserver | null = null;

  connectedCallback() {
    // Observamos cambios en los hijos directos (el input/control)
    this._observer = new MutationObserver(() => this.updateControl());
    this._observer.observe(this, { childList: true, subtree: true });

    // Intentar actualización inicial
    this.updateControl();
  }

  disconnectedCallback() {
    this._observer?.disconnect();
  }

  updateControl() {
    const parent = this.closest("hp-field") as HeadlessField;
    if (!parent) return;

    const control = this._findControl();
    if (!control) return;

    // 1. Asignar ID al control si no tiene
    if (!control.id) {
      control.id = `${parent.baseId}-control`;
    }

    // 2. Vincular vía aria-describedby
    const descriptions: string[] = [];
    const description = parent.querySelector("hp-field-description");
    const error = parent.querySelector("hp-field-error");

    if (description && description.id) descriptions.push(description.id);
    if (error && error.id) descriptions.push(error.id);

    if (descriptions.length > 0) {
      control.setAttribute("aria-describedby", descriptions.join(" "));
    } else {
      control.removeAttribute("aria-describedby");
    }

    // 3. Vincular vía aria-labelledby
    const label = parent.querySelector("hp-field-label");
    if (label && label.id) {
      control.setAttribute("aria-labelledby", label.id);
    }
  }

  private _findControl(): HTMLElement | null {
    // Buscamos inputs nativos o primitivos con roles adecuados
    return this.querySelector(
      "input, select, textarea, [role='checkbox'], [role='switch'], [role='combobox'], [role='progressbar']",
    );
  }
}
