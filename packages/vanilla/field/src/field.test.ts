import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./index"; // Registra los elementos

describe("HeadlessField (Molecule)", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it("should generate a unique base ID for children", () => {
    container.innerHTML = `
      <hp-field id="f1">
        <hp-field-label id="lbl">Label</hp-field-label>
        <hp-field-control id="ctrl">
          <input type="text" id="inp">
        </hp-field-control>
      </hp-field>
    `;

    const field = document.getElementById("f1") as any;
    const label = document.getElementById("lbl") as any;
    const input = document.getElementById("inp") as HTMLInputElement;

    const baseId = field.baseId;
    expect(baseId).toBeDefined();

    // El label debe apuntar al control
    expect(label.getAttribute("for")).toBe(`${baseId}-control`);

    // El input debe tener el ID del control si no lo tenía, o mantener el suyo y estar vinculado
    expect(input.id).toBe("inp"); // No sobreescribimos si ya existe uno específico?
    // Wait, mi lógica actual dice: if (!control.id) control.id = ...
    // Pero si ya tiene uno, debemos usarlo?
  });

  it("should link description via aria-describedby", async () => {
    container.innerHTML = `
      <hp-field>
        <hp-field-control>
          <input id="my-input">
        </hp-field-control>
        <hp-field-description>Help text</hp-field-description>
      </hp-field>
    `;

    const field = container.querySelector("hp-field") as any;
    const input = container.querySelector("input")!;
    const baseId = field.baseId;

    // Esperar a que el MutationObserver procese los cambios (un tick de timeout suele ser más seguro que Promise.resolve)
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(input.getAttribute("aria-describedby")).toBe(`${baseId}-description`);
    expect(container.querySelector("hp-field-description")?.id).toBe(`${baseId}-description`);
  });

  it("should link error and description simultaneously", async () => {
    container.innerHTML = `
      <hp-field>
        <hp-field-control>
          <input>
        </hp-field-control>
        <hp-field-description>Help</hp-field-description>
        <hp-field-error>Error</hp-field-error>
      </hp-field>
    `;

    const field = container.querySelector("hp-field") as any;
    const input = container.querySelector("input")!;
    const baseId = field.baseId;

    // Esperar a que el MutationObserver procese los cambios
    await new Promise((resolve) => setTimeout(resolve, 0));

    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toContain(`${baseId}-description`);
    expect(describedBy).toContain(`${baseId}-error`);
  });
});
