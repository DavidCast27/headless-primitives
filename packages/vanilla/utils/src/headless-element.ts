import { LitElement } from "lit";
import { uid } from "./uid";

export class HeadlessElement extends LitElement {
  // Garantiza Light DOM (ADR 0002)
  override createRenderRoot() {
    return this;
  }

  // Utilidad para emitir eventos con prefijo hp-*
  protected emit(name: string, detail?: any) {
    const event = new CustomEvent(`hp-${name}`, {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
    return event;
  }

  // Gestión de IDs única por instancia
  protected readonly _hpId = uid();

  get hpId(): string {
    return this._hpId;
  }
}
