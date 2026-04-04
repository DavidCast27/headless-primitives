import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { HeadlessButton } from "./button"; // Registra el custom element automáticamente

if (!customElements.get("hp-button")) {
  customElements.define("hp-button", HeadlessButton);
}

describe("HpButton (Headless Primitive Button)", () => {
  let btn: HeadlessButton;

  // Setup: Crear e inyectar el componente fresco antes de cada test
  beforeEach(() => {
    btn = document.createElement("hp-button") as HeadlessButton;
    document.body.appendChild(btn);
  });

  // Teardown: Limpiar el DOM puro después de cada test
  afterEach(() => {
    btn.remove();
  });

  it("debería inicializarse con los roles de accesibilidad adecuados obligatoriamente", () => {
    expect(btn.getAttribute("role")).toBe("button");
    expect(btn.getAttribute("tabindex")).toBe("0");
  });

  it("debería volverse inaniblitado perdiendo su funcionalidad del teclado si tiene el atributo disabled", async () => {
    btn.setAttribute("disabled", "");
    await (btn as any).updateComplete;

    expect(btn.getAttribute("aria-disabled")).toBe("true");
    expect(btn.hasAttribute("tabindex")).toBe(false);

    btn.removeAttribute("disabled");
    await (btn as any).updateComplete;
    expect(btn.hasAttribute("aria-disabled")).toBe(false);
    expect(btn.getAttribute("tabindex")).toBe("0");
  });

  it("debería fungir como toggle emitiendo el evento <hp-change> al cliquearlo", () => {
    let eventoAtrapado = false;
    let estadoEnviado = false;

    // Al añadirle aria-pressed, lo volvemos un 'toggle button'
    btn.setAttribute("aria-pressed", "false");

    btn.addEventListener("hp-change", (e) => {
      eventoAtrapado = true;
      estadoEnviado = (e as CustomEvent).detail.pressed;
    });

    // Simulamos nativamente el evento click de mouse
    btn.dispatchEvent(new MouseEvent("click"));

    expect(eventoAtrapado).toBe(true);
    expect(estadoEnviado).toBe(true); // Cambió a prendido
    expect(btn.getAttribute("aria-pressed")).toBe("true");
  });

  it("debería desencadenar click al teclear Enter o Barra espaciadora (Keyboard Navigation)", () => {
    let clicked = false;
    btn.setAttribute("aria-pressed", "false");

    btn.addEventListener("click", () => {
      clicked = true;
    });

    const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
    btn.dispatchEvent(enterEvent);

    // Enter forzó un disparo de click(), que a su vez llama a _togglePressed
    expect(clicked).toBe(true);
    expect(btn.getAttribute("aria-pressed")).toBe("true");
  });
});
