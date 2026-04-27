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

  // AbortController por ciclo connect/disconnect.
  // Se aborta automáticamente en disconnectedCallback y se renueva en connectedCallback.
  private _abortController: AbortController | null = null;

  /**
   * AbortSignal que se cancela automáticamente cuando el elemento se desconecta del DOM.
   * Pásalo como `{ signal: this.signal }` a `addEventListener` para cleanup automático.
   */
  get signal(): AbortSignal {
    if (!this._abortController || this._abortController.signal.aborted) {
      this._abortController = new AbortController();
    }
    return this._abortController.signal;
  }

  override connectedCallback() {
    super.connectedCallback();
    if (!this._abortController || this._abortController.signal.aborted) {
      this._abortController = new AbortController();
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._abortController?.abort();
    this._abortController = null;
  }
}
