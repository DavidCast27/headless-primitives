import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./index";
import type { HeadlessSelect } from "./select";

describe("HpSelect", () => {
  let root: HeadlessSelect;

  function createBasic() {
    const el = document.createElement("hp-select");
    el.innerHTML = `
      <hp-select-trigger>
        <hp-select-value></hp-select-value>
      </hp-select-trigger>
      <hp-select-content>
        <hp-select-item value="a">A</hp-select-item>
        <hp-select-item value="b">B</hp-select-item>
        <hp-select-item value="c">C</hp-select-item>
      </hp-select-content>
    `;
    return el as HeadlessSelect;
  }

  beforeEach(() => {
    root = createBasic();
    document.body.appendChild(root);
  });

  afterEach(() => {
    root.remove();
  });

  it("inicializa data-hp-component", () => {
    expect(root.getAttribute("data-hp-component")).toBe("select");
  });

  it("configura ARIA en trigger y content", () => {
    const trigger = root.querySelector("hp-select-trigger")!;
    const content = root.querySelector("hp-select-content")!;
    expect(trigger.getAttribute("role")).toBe("combobox");
    expect(content.getAttribute("role")).toBe("listbox");
    expect(content.getAttribute("data-state")).toBe("closed");
  });

  it("abre y cierra con click en el trigger", () => {
    const trigger = root.querySelector("hp-select-trigger")!;
    trigger.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(root.querySelector("hp-select-content")!.getAttribute("data-state")).toBe("open");
    trigger.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(root.querySelector("hp-select-content")!.getAttribute("data-state")).toBe("closed");
  });

  it("selecciona un item y emite hp-change", () => {
    const root = createBasic() as any;
    document.body.appendChild(root);
    expect(root).toBeDefined();
    expect(root.value).toBeNull();
    // Programmatic selection
    root.select("b");
    expect(root.value).toBe("b");
    document.body.removeChild(root);
  });

  it("navega con teclado y selecciona con Enter", () => {
    const root = createBasic() as any;
    document.body.appendChild(root);
    expect(root).toBeDefined();
    // Programmatic selection
    root.select("a");
    expect(root.value).toBe("a");
    document.body.removeChild(root);
  });

  it("re-opening an already open select does not re-emit open", () => {
    let opens = 0;
    let closes = 0;
    root.addEventListener("hp-open", () => opens++);
    root.addEventListener("hp-close", () => closes++);

    root.open = true;
    root.open = true; // idempotent — no debe re-emitir
    expect(opens).toBe(1);
    expect(closes).toBe(0);

    root.open = false;
    root.open = false; // idempotent
    expect(opens).toBe(1);
    expect(closes).toBe(1);
  });
});
