import { HeadlessElement, customElement } from "@headless-primitives/utils";
import { property } from "lit/decorators.js";

/**
 * Breadcrumb root component.
 * Renders as a <nav> element for accessibility.
 */
@customElement("hp-breadcrumb")
export class HeadlessBreadcrumb extends HeadlessElement {
  private _label = "Breadcrumb";

  @property({ type: String, attribute: "aria-label" })
  get label() {
    return this._label;
  }
  set label(v: string) {
    this._label = v;
    this._sync();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "breadcrumb");
    if (!this.hasAttribute("role")) this.setAttribute("role", "navigation");
    this._sync();
  }

  private _sync() {
    this.setAttribute("aria-label", this._label);
  }

  protected updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has("label")) {
      this._sync();
    }
  }
}

/**
 * Breadcrumb list component.
 * Renders as an <ol> equivalent.
 */
@customElement("hp-breadcrumb-list")
export class HeadlessBreadcrumbList extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "breadcrumb-list");
  }
}

/**
 * Breadcrumb item component.
 * Renders as a <li> equivalent.
 */
@customElement("hp-breadcrumb-item")
export class HeadlessBreadcrumbItem extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "breadcrumb-item");
  }
}

/**
 * Breadcrumb link component.
 * Can be used as a link or a container for an <a> tag.
 */
@customElement("hp-breadcrumb-link")
export class HeadlessBreadcrumbLink extends HeadlessElement {
  private _href = "";

  @property({ type: String, reflect: true })
  get href() {
    return this._href;
  }
  set href(v: string) {
    this._href = v;
    this._sync();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "breadcrumb-link");
    if (!this.hasAttribute("role")) this.setAttribute("role", "link");

    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
    this._sync();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._handleClick);
    this.removeEventListener("keydown", this._handleKeyDown);
  }

  private _sync() {
    if (this._href) {
      this.setAttribute("tabindex", "0");
    } else {
      this.removeAttribute("tabindex");
    }
  }

  protected updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has("href")) {
      this._sync();
    }
  }

  private _handleClick = () => {
    if (this._href) {
      this.emit("click", { href: this._href });
    }
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  };
}

/**
 * Breadcrumb page component.
 * Represents the current page in the breadcrumb.
 */
@customElement("hp-breadcrumb-page")
export class HeadlessBreadcrumbPage extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "breadcrumb-page");
    if (!this.hasAttribute("role")) this.setAttribute("role", "link");
    this.setAttribute("aria-current", "page");
  }
}

/**
 * Breadcrumb separator component.
 */
@customElement("hp-breadcrumb-separator")
export class HeadlessBreadcrumbSeparator extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "breadcrumb-separator");
    this.setAttribute("aria-hidden", "true");
    this.setAttribute("role", "presentation");
  }
}

/**
 * Breadcrumb ellipsis component.
 */
@customElement("hp-breadcrumb-ellipsis")
export class HeadlessBreadcrumbEllipsis extends HeadlessElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-hp-component", "breadcrumb-ellipsis");
    this.setAttribute("role", "presentation");
    this.setAttribute("aria-hidden", "true");
  }
}
