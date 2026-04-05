import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./index"; // triggers @customElement decorator registration
import type {
  HeadlessDialog,
  HeadlessDialogTrigger,
  HeadlessDialogContent,
  HeadlessDialogBackdrop,
  HeadlessDialogClose,
} from "./dialog";

describe("HpDialog", () => {
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

  it("inicializa el trigger como focusable con role button", () => {
    expect(trigger.getAttribute("tabindex")).toBe("0");
    expect(trigger.getAttribute("role")).toBe("button");
  });

  it("inicializa el content con role dialog, aria-modal y data-state closed", () => {
    expect(content.getAttribute("role")).toBe("dialog");
    expect(content.getAttribute("aria-modal")).toBe("true");
    expect(content.getAttribute("data-state")).toBe("closed");
    expect(content.getAttribute("aria-hidden")).toBe("true");
  });

  it("abre el dialog al hacer click en el trigger", () => {
    trigger.dispatchEvent(new MouseEvent("click"));
    expect(content.getAttribute("data-state")).toBe("open");
    expect(content.hasAttribute("aria-hidden")).toBe(false);
    expect(backdrop.getAttribute("data-state")).toBe("open");
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
  });

  it("cierra el dialog al hacer click en el backdrop", () => {
    trigger.dispatchEvent(new MouseEvent("click"));
    backdrop.dispatchEvent(new MouseEvent("click"));
    expect(content.getAttribute("data-state")).toBe("closed");
    expect(backdrop.getAttribute("data-state")).toBe("closed");
  });

  it("cierra el dialog al presionar Escape", () => {
    trigger.dispatchEvent(new MouseEvent("click"));
    content.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("emite hp-open y hp-close en cada transición", () => {
    let openCount = 0;
    let closeCount = 0;
    dialog.addEventListener("hp-open", () => openCount++);
    dialog.addEventListener("hp-close", () => closeCount++);

    trigger.dispatchEvent(new MouseEvent("click"));
    expect(openCount).toBe(1);

    backdrop.dispatchEvent(new MouseEvent("click"));
    expect(closeCount).toBe(1);
  });

  it("open()/close() API pública funciona correctamente", () => {
    dialog.open();
    expect(content.getAttribute("data-state")).toBe("open");
    dialog.close();
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("no emite eventos duplicados en llamadas repetidas", () => {
    let openCount = 0;
    dialog.addEventListener("hp-open", () => openCount++);
    dialog.open();
    dialog.open(); // no-op
    expect(openCount).toBe(1);
  });
});

describe("HpDialogClose", () => {
  it("cierra el dialog al hacer click en hp-dialog-close", () => {
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
  it("no cierra con ESC cuando data-alert está presente", () => {
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

  it("usa role alertdialog cuando data-alert está presente", () => {
    const dialog = document.createElement("hp-dialog") as HeadlessDialog;
    dialog.setAttribute("data-alert", "");
    const content = document.createElement("hp-dialog-content") as HeadlessDialogContent;
    dialog.appendChild(content);
    document.body.appendChild(dialog);

    expect(content.getAttribute("role")).toBe("alertdialog");

    dialog.remove();
  });
});

describe("HpDialogTrigger disabled", () => {
  it("disabled agrega aria-disabled y quita tabindex", () => {
    const trigger = document.createElement("hp-dialog-trigger") as HeadlessDialogTrigger;
    document.body.appendChild(trigger);

    trigger.setAttribute("disabled", "");
    expect(trigger.getAttribute("aria-disabled")).toBe("true");
    expect(trigger.hasAttribute("tabindex")).toBe(false);

    trigger.removeAttribute("disabled");
    expect(trigger.getAttribute("tabindex")).toBe("0");
    expect(trigger.hasAttribute("aria-disabled")).toBe(false);

    trigger.remove();
  });
});
