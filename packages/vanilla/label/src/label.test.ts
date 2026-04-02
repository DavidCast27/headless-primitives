import { describe, it, expect, beforeEach, vi } from "vitest";
import "./index";
import { HeadlessLabel } from "./label";

describe("hp-label", () => {
  let label: HeadlessLabel;
  let target: HTMLInputElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <input id="target-input" />
      <hp-label for="target-input" id="test-label">Test Label</hp-label>
    `;
    label = document.getElementById("test-label") as HeadlessLabel;
    target = document.getElementById("target-input") as HTMLInputElement;
  });

  it("should focus the target element when clicked", () => {
    const focusSpy = vi.spyOn(target, "focus");
    label.click();
    expect(focusSpy).toHaveBeenCalled();
  });

  it("should have an ID and link to target via aria-labelledby", () => {
    // Forzamos vinculación
    label.setAttribute("for", "target-input");

    // Verificamos que tenga ALGÚN id (ya sea el original o uno generado)
    expect(label.id).toBeTruthy();
    expect(target.getAttribute("aria-labelledby")).toBe(label.id);

    // Si no tiene ID y cambiamos el target, debería generar uno o usar el actual
    const currentId = label.id;
    label.setAttribute("for", "target-input");
    expect(label.id).toBe(currentId);
  });

  it("should handle for attribute changes", () => {
    const newTarget = document.createElement("input");
    newTarget.id = "new-target";
    document.body.appendChild(newTarget);

    const focusSpy = vi.spyOn(newTarget, "focus");

    label.htmlFor = "new-target";
    label.click();

    expect(focusSpy).toHaveBeenCalled();
  });

  it("should prevent text selection on double click", () => {
    const event = new MouseEvent("mousedown", { detail: 2 });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");

    label.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
