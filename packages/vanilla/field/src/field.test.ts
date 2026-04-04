import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./index";

const raf = () =>
  new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

describe("HeadlessField (Molecule)", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it("should generate a unique base ID for children", async () => {
    container.innerHTML = `
      <hp-field>
        <hp-field-label>Label</hp-field-label>
        <hp-field-control>
          <input type="text">
        </hp-field-control>
      </hp-field>
    `;
    await raf();
    const field = container.querySelector("hp-field") as any;
    const label = container.querySelector("hp-field-label")!;
    const baseId = field.baseId;
    expect(baseId).toBeDefined();
    expect(label.getAttribute("for")).toBe(`${baseId}-control`);
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
    await raf();
    const field = container.querySelector("hp-field") as any;
    const input = container.querySelector("input")!;
    const baseId = field.baseId;
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
    await raf();
    const field = container.querySelector("hp-field") as any;
    const input = container.querySelector("input")!;
    const baseId = field.baseId;
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toContain(`${baseId}-description`);
    expect(describedBy).toContain(`${baseId}-error`);
  });
});
