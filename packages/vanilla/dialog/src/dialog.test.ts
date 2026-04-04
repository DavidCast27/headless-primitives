import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  HeadlessDialog,
  HeadlessDialogTrigger,
  HeadlessDialogContent,
  HeadlessDialogBackdrop,
} from "./dialog";

if (!customElements.get("hp-dialog")) {
  customElements.define("hp-dialog", HeadlessDialog);
}
if (!customElements.get("hp-dialog-trigger")) {
  customElements.define("hp-dialog-trigger", HeadlessDialogTrigger);
}
if (!customElements.get("hp-dialog-content")) {
  customElements.define("hp-dialog-content", HeadlessDialogContent);
}
if (!customElements.get("hp-dialog-backdrop")) {
  customElements.define("hp-dialog-backdrop", HeadlessDialogBackdrop);
}

describe("HpDialog (Headless Primitive Dialog)", () => {
  let dialog: HeadlessDialog;
  let trigger: HeadlessDialogTrigger;
  let content: HeadlessDialogContent;
  let backdrop: HeadlessDialogBackdrop;

  beforeEach(() => {
    dialog = document.createElement("hp-dialog") as HeadlessDialog;
    trigger = document.createElement("hp-dialog-trigger") as HeadlessDialogTrigger;
    content = document.createElement("hp-dialog-content") as HeadlessDialogContent;
    backdrop = document.createElement("hp-dialog-backdrop") as HeadlessDialogBackdrop;

    dialog.appendChild(trigger);
    dialog.appendChild(content);
    dialog.appendChild(backdrop);
    document.body.appendChild(dialog);
  });

  afterEach(() => {
    dialog.remove();
  });

  it("debería inicializar el trigger como focusable", () => {
    expect(trigger.getAttribute("tabindex")).toBe("0");
  });

  it("debería inicializar el content con role dialog y aria-modal", () => {
    expect(content.getAttribute("role")).toBe("dialog");
    expect(content.getAttribute("aria-modal")).toBe("true");
    expect(content.style.visibility).toBe("hidden");
    expect(content.style.opacity).toBe("0");
  });

  it("debería abrir el dialog al hacer click en el trigger", () => {
    trigger.dispatchEvent(new MouseEvent("click"));

    expect(content.style.visibility).toBe("visible");
    expect(content.style.opacity).toBe("1");
    expect(content.getAttribute("aria-hidden")).toBe("false");
    expect(backdrop.style.visibility).toBe("visible");
    expect(backdrop.style.opacity).toBe("1");
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
  });

  it("debería cerrar el dialog al hacer click en el backdrop", () => {
    trigger.dispatchEvent(new MouseEvent("click"));
    backdrop.dispatchEvent(new MouseEvent("click"));

    expect(content.style.visibility).toBe("hidden");
    expect(content.style.opacity).toBe("0");
    expect(backdrop.style.visibility).toBe("hidden");
    expect(backdrop.style.opacity).toBe("0");
  });

  it("debería cerrar el dialog al presionar Escape", () => {
    trigger.dispatchEvent(new MouseEvent("click"));
    content.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

    expect(content.style.visibility).toBe("hidden");
    expect(content.style.opacity).toBe("0");
  });

  it("debería emitir eventos hp-open y hp-close", () => {
    let openEmitted = false;
    let closeEmitted = false;

    dialog.addEventListener("hp-open", () => (openEmitted = true));
    dialog.addEventListener("hp-close", () => (closeEmitted = true));

    trigger.dispatchEvent(new MouseEvent("click"));
    expect(openEmitted).toBe(true);

    backdrop.dispatchEvent(new MouseEvent("click"));
    expect(closeEmitted).toBe(true);
  });
});
