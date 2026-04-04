import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  HeadlessDialog,
  HeadlessDialogTrigger,
  HeadlessDialogContent,
  HeadlessDialogBackdrop,
  HeadlessDialogTitle,
  HeadlessDialogClose,
} from "./dialog";

if (!customElements.get("hp-dialog")) customElements.define("hp-dialog", HeadlessDialog);
if (!customElements.get("hp-dialog-trigger"))
  customElements.define("hp-dialog-trigger", HeadlessDialogTrigger);
if (!customElements.get("hp-dialog-content"))
  customElements.define("hp-dialog-content", HeadlessDialogContent);
if (!customElements.get("hp-dialog-backdrop"))
  customElements.define("hp-dialog-backdrop", HeadlessDialogBackdrop);
if (!customElements.get("hp-dialog-title"))
  customElements.define("hp-dialog-title", HeadlessDialogTitle);
if (!customElements.get("hp-dialog-close"))
  customElements.define("hp-dialog-close", HeadlessDialogClose);

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
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("debería abrir el dialog al hacer click en el trigger", () => {
    trigger.dispatchEvent(new MouseEvent("click"));
    expect(content.getAttribute("data-state")).toBe("open");
    // aria-hidden is removed (not set to "false") when open — absence means visible
    expect(content.hasAttribute("aria-hidden")).toBe(false);
    expect(backdrop.getAttribute("data-state")).toBe("open");
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
  });

  it("debería cerrar el dialog al hacer click en el backdrop", () => {
    trigger.dispatchEvent(new MouseEvent("click"));
    backdrop.dispatchEvent(new MouseEvent("click"));
    expect(content.getAttribute("data-state")).toBe("closed");
    expect(backdrop.getAttribute("data-state")).toBe("closed");
  });

  it("debería cerrar el dialog al presionar Escape", () => {
    trigger.dispatchEvent(new MouseEvent("click"));
    content.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(content.getAttribute("data-state")).toBe("closed");
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

describe("HpDialogClose", () => {
  it("debería cerrar el dialog al hacer click en hp-dialog-close", () => {
    const dialog = document.createElement("hp-dialog") as HeadlessDialog;
    const trigger = document.createElement("hp-dialog-trigger") as HeadlessDialogTrigger;
    const content = document.createElement("hp-dialog-content") as HeadlessDialogContent;
    const close = document.createElement("hp-dialog-close") as HeadlessDialogClose;
    content.appendChild(close);
    dialog.appendChild(trigger);
    dialog.appendChild(content);
    document.body.appendChild(dialog);

    trigger.dispatchEvent(new MouseEvent("click"));
    expect(content.getAttribute("data-state")).toBe("open");

    close.dispatchEvent(new MouseEvent("click"));
    expect(content.getAttribute("data-state")).toBe("closed");

    dialog.remove();
  });
});

describe("HpDialog alertdialog", () => {
  it("no debería cerrar con ESC cuando data-alert está presente", () => {
    const dialog = document.createElement("hp-dialog") as HeadlessDialog;
    dialog.setAttribute("data-alert", "");
    const trigger = document.createElement("hp-dialog-trigger") as HeadlessDialogTrigger;
    const content = document.createElement("hp-dialog-content") as HeadlessDialogContent;
    const backdrop = document.createElement("hp-dialog-backdrop") as HeadlessDialogBackdrop;
    dialog.appendChild(trigger);
    dialog.appendChild(content);
    dialog.appendChild(backdrop);
    document.body.appendChild(dialog);

    trigger.dispatchEvent(new MouseEvent("click"));
    expect(content.getAttribute("data-state")).toBe("open");

    content.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(content.getAttribute("data-state")).toBe("open");

    dialog.remove();
  });

  it("debería usar role alertdialog cuando data-alert está presente", () => {
    const dialog = document.createElement("hp-dialog") as HeadlessDialog;
    dialog.setAttribute("data-alert", "");
    const content = document.createElement("hp-dialog-content") as HeadlessDialogContent;
    dialog.appendChild(content);
    document.body.appendChild(dialog);

    expect(content.getAttribute("role")).toBe("alertdialog");

    dialog.remove();
  });
});
