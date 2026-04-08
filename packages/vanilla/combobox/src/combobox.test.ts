import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./index";
import type { HeadlessCombobox } from "./combobox";

describe("HpCombobox", () => {
  let root: HeadlessCombobox;

  function createBasic() {
    const el = document.createElement("hp-combobox");
    el.innerHTML = `
      <hp-combobox-input></hp-combobox-input>
      <hp-combobox-content>
        <hp-combobox-option value="apple">Apple</hp-combobox-option>
        <hp-combobox-option value="banana">Banana</hp-combobox-option>
        <hp-combobox-option value="cherry">Cherry</hp-combobox-option>
      </hp-combobox-content>
    `;
    return el as HeadlessCombobox;
  }

  beforeEach(() => {
    root = createBasic();
    document.body.appendChild(root);
  });

  afterEach(() => {
    root.remove();
  });

  it("inicializa data-hp-component", () => {
    expect(root.getAttribute("data-hp-component")).toBe("combobox");
  });

  it("configura ARIA en el input y el contenido", () => {
    const input = root
      .querySelector("hp-combobox-input")
      ?.querySelector("input") as HTMLInputElement;
    const content = root.querySelector("hp-combobox-content");

    expect(input.getAttribute("role")).toBe("combobox");
    expect(input.getAttribute("aria-expanded")).toBe("false");
    expect(content?.getAttribute("role")).toBe("listbox");
    expect(content?.getAttribute("data-state")).toBe("closed");
  });

  it("abre y filtra opciones al escribir", () => {
    const input = root
      .querySelector("hp-combobox-input")
      ?.querySelector("input") as HTMLInputElement;
    input.focus();
    input.value = "ba";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    const content = root.querySelector("hp-combobox-content");
    const options = Array.from(root.querySelectorAll("hp-combobox-option"));

    expect(content?.getAttribute("data-state")).toBe("open");
    expect(options[0].getAttribute("data-state")).toBe("hidden");
    expect(options[1].getAttribute("data-state")).toBe("visible");
    expect(options[2].getAttribute("data-state")).toBe("hidden");
  });

  it("mantiene el binding de input después del ciclo de raf", async () => {
    const el = createBasic();
    document.body.appendChild(el);
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const input = el.querySelector("hp-combobox-input")?.querySelector("input") as HTMLInputElement;
    input.focus();
    input.value = "app";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    const content = el.querySelector("hp-combobox-content");
    expect(content?.getAttribute("data-state")).toBe("open");
    el.remove();
  });

  it("selecciona un item con click y actualiza el valor", () => {
    const input = root
      .querySelector("hp-combobox-input")
      ?.querySelector("input") as HTMLInputElement;
    input.focus();
    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true }));

    const option = root.querySelector("hp-combobox-option[value=banana]") as HTMLElement;
    option.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(root.value).toBe("banana");
    expect(input.value).toBe("Banana");
  });

  it("clear() deja el valor en null", () => {
    (root as any).select("apple");
    expect(root.value).toBe("apple");
    (root as any).clear();
    expect(root.value).toBeNull();
  });
});
