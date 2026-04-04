import { HeadlessElement, customElement } from "@headless-primitives/utils";

@customElement("hp-field")
export class HeadlessField extends HeadlessElement {
  get baseId() {
    return `hp-field-${this.hpId}`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "field");
    if (!this.hasAttribute("role")) this.setAttribute("role", "group");
    this.addEventListener("slotchange", () => this.notifyControl());
    // Double rAF to ensure children are connected when injected via innerHTML
    requestAnimationFrame(() => requestAnimationFrame(() => this.notifyControl()));
  }

  notifyControl() {
    const control = this.querySelector("hp-field-control") as HeadlessFieldControl | null;
    control?.updateControl();
  }
}

@customElement("hp-field-label")
export class HeadlessFieldLabel extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "field-label");
    const parent = this.closest("hp-field") as HeadlessField | null;
    if (!parent) return;
    if (!this.hasAttribute("for")) this.setAttribute("for", `${parent.baseId}-control`);
    if (!this.id) this.id = `${parent.baseId}-label`;
  }
}

@customElement("hp-field-description")
export class HeadlessFieldDescription extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "field-description");
    const parent = this.closest("hp-field") as HeadlessField | null;
    if (parent && !this.id) this.id = `${parent.baseId}-description`;
  }
}

@customElement("hp-field-error")
export class HeadlessFieldError extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "field-error");
    const parent = this.closest("hp-field") as HeadlessField | null;
    if (parent && !this.id) this.id = `${parent.baseId}-error`;
    if (!this.hasAttribute("role")) this.setAttribute("role", "alert");
  }
}

@customElement("hp-field-control")
export class HeadlessFieldControl extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "field-control");
    this.addEventListener("slotchange", () => this.updateControl());
    this.updateControl();
  }

  updateControl() {
    const parent = this.closest("hp-field") as HeadlessField | null;
    if (!parent) return;
    const control = this._findControl();
    if (!control) return;

    if (!control.id) control.id = `${parent.baseId}-control`;

    const descriptions: string[] = [];
    const description = parent.querySelector("hp-field-description");
    const error = parent.querySelector("hp-field-error");
    if (description?.id) descriptions.push(description.id);
    if (error?.id) descriptions.push(error.id);

    if (descriptions.length > 0) {
      control.setAttribute("aria-describedby", descriptions.join(" "));
    } else {
      control.removeAttribute("aria-describedby");
    }

    const label = parent.querySelector("hp-field-label");
    if (label?.id) control.setAttribute("aria-labelledby", label.id);
  }

  private _findControl(): HTMLElement | null {
    return this.querySelector(
      "input, select, textarea, [role='checkbox'], [role='switch'], [role='combobox'], [role='progressbar']",
    );
  }
}
