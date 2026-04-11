import "./index";
import type { HeadlessFieldset } from "./fieldset";
import type { HeadlessFieldsetLegend } from "./fieldset-legend";
import * as fc from "fast-check";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
});

// ---------------------------------------------------------------------------
// Task 6.2 — Example tests for hp-fieldset
// ---------------------------------------------------------------------------
describe("hp-fieldset", () => {
  it("sets data-hp-component='fieldset' and role='group' on connect", () => {
    const el = document.createElement("hp-fieldset") as HeadlessFieldset;
    container.appendChild(el);
    expect(el.getAttribute("data-hp-component")).toBe("fieldset");
    expect(el.getAttribute("role")).toBe("group");
  });

  it("does NOT overwrite a pre-existing role attribute", () => {
    const el = document.createElement("hp-fieldset") as HeadlessFieldset;
    el.setAttribute("role", "region");
    container.appendChild(el);
    expect(el.getAttribute("role")).toBe("region");
  });

  it("sets aria-disabled='true' when disabled=true", () => {
    const el = document.createElement("hp-fieldset") as HeadlessFieldset;
    container.appendChild(el);
    el.disabled = true;
    expect(el.getAttribute("aria-disabled")).toBe("true");
  });

  it("removes aria-disabled when disabled=false", () => {
    const el = document.createElement("hp-fieldset") as HeadlessFieldset;
    container.appendChild(el);
    el.disabled = true;
    el.disabled = false;
    expect(el.hasAttribute("aria-disabled")).toBe(false);
  });

  it("sets data-state='disabled' when disabled=true", () => {
    const el = document.createElement("hp-fieldset") as HeadlessFieldset;
    container.appendChild(el);
    el.disabled = true;
    expect(el.getAttribute("data-state")).toBe("disabled");
  });

  it("sets data-state='enabled' when disabled=false", () => {
    const el = document.createElement("hp-fieldset") as HeadlessFieldset;
    container.appendChild(el);
    el.disabled = false;
    expect(el.getAttribute("data-state")).toBe("enabled");
  });

  it("_sync() is synchronous: attributes present immediately after appendChild", () => {
    const el = document.createElement("hp-fieldset") as HeadlessFieldset;
    el.disabled = true;
    container.appendChild(el);
    // Attributes must be present immediately — no await needed
    expect(el.getAttribute("data-hp-component")).toBe("fieldset");
    expect(el.getAttribute("aria-disabled")).toBe("true");
    expect(el.getAttribute("data-state")).toBe("disabled");
  });

  it("controls added after connectedCallback sync after rAF", async () => {
    const el = document.createElement("hp-fieldset") as HeadlessFieldset;
    el.disabled = true;
    container.appendChild(el);

    // Add input AFTER connectedCallback
    const input = document.createElement("input");
    el.appendChild(input);

    // Not yet synced
    await new Promise((r) => requestAnimationFrame(r));
    expect(input.hasAttribute("disabled")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Task 6.3 — Example tests for hp-fieldset-legend
// ---------------------------------------------------------------------------
describe("hp-fieldset-legend", () => {
  it("sets data-hp-component='fieldset-legend' on connect", () => {
    const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
    const legend = document.createElement("hp-fieldset-legend") as HeadlessFieldsetLegend;
    fieldset.appendChild(legend);
    container.appendChild(fieldset);
    expect(legend.getAttribute("data-hp-component")).toBe("fieldset-legend");
  });

  it("assigns correct id derived from parent's baseId", () => {
    const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
    const legend = document.createElement("hp-fieldset-legend") as HeadlessFieldsetLegend;
    fieldset.appendChild(legend);
    container.appendChild(fieldset);
    expect(legend.id).toBe(`${fieldset.baseId}-legend`);
  });

  it("sets aria-labelledby on parent pointing to legend's id", () => {
    const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
    const legend = document.createElement("hp-fieldset-legend") as HeadlessFieldsetLegend;
    fieldset.appendChild(legend);
    container.appendChild(fieldset);
    expect(fieldset.getAttribute("aria-labelledby")).toBe(legend.id);
  });

  it("does NOT overwrite pre-existing id on legend", () => {
    const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
    const legend = document.createElement("hp-fieldset-legend") as HeadlessFieldsetLegend;
    legend.setAttribute("id", "my-custom-id");
    fieldset.appendChild(legend);
    container.appendChild(fieldset);
    expect(legend.id).toBe("my-custom-id");
  });

  it("does NOT overwrite pre-existing aria-labelledby on parent", () => {
    const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
    fieldset.setAttribute("aria-labelledby", "existing-label");
    const legend = document.createElement("hp-fieldset-legend") as HeadlessFieldsetLegend;
    fieldset.appendChild(legend);
    container.appendChild(fieldset);
    expect(fieldset.getAttribute("aria-labelledby")).toBe("existing-label");
  });

  it("without parent hp-fieldset: no error, no attribute assignment", () => {
    const legend = document.createElement("hp-fieldset-legend") as HeadlessFieldsetLegend;
    expect(() => container.appendChild(legend)).not.toThrow();
    expect(legend.hasAttribute("aria-labelledby")).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Task 6.4 — Example tests for disabled propagation
// ---------------------------------------------------------------------------
describe("hp-fieldset disabled propagation", () => {
  it("propagates disabled to native controls (input, select, textarea, button)", () => {
    const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
    const input = document.createElement("input");
    const select = document.createElement("select");
    const textarea = document.createElement("textarea");
    const button = document.createElement("button");
    fieldset.append(input, select, textarea, button);
    container.appendChild(fieldset);

    fieldset.disabled = true;
    expect(input.hasAttribute("disabled")).toBe(true);
    expect(select.hasAttribute("disabled")).toBe(true);
    expect(textarea.hasAttribute("disabled")).toBe(true);
    expect(button.hasAttribute("disabled")).toBe(true);
  });

  it("propagates aria-disabled='true' to ARIA-role controls", () => {
    const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
    const roles = ["checkbox", "switch", "combobox", "radio", "spinbutton", "slider"];
    const controls = roles.map((role) => {
      const el = document.createElement("div");
      el.setAttribute("role", role);
      fieldset.appendChild(el);
      return el;
    });
    container.appendChild(fieldset);

    fieldset.disabled = true;
    for (const el of controls) {
      expect(el.getAttribute("aria-disabled")).toBe("true");
    }
  });

  it("restores controls on re-enable (no data-hp-was-disabled remaining)", () => {
    const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
    const input = document.createElement("input");
    fieldset.appendChild(input);
    container.appendChild(fieldset);

    fieldset.disabled = true;
    fieldset.disabled = false;

    expect(input.hasAttribute("disabled")).toBe(false);
    expect(input.hasAttribute("data-hp-was-disabled")).toBe(false);
  });

  it("preserves pre-disabled controls on re-enable", () => {
    const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
    const preDisabled = document.createElement("input");
    preDisabled.setAttribute("disabled", "");
    const normal = document.createElement("input");
    fieldset.append(preDisabled, normal);
    container.appendChild(fieldset);

    fieldset.disabled = true;
    fieldset.disabled = false;

    // Pre-disabled input should remain disabled
    expect(preDisabled.hasAttribute("disabled")).toBe(true);
    // Normal input should be restored
    expect(normal.hasAttribute("disabled")).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Task 6.5 — Example tests for events
// ---------------------------------------------------------------------------
describe("hp-fieldset events", () => {
  it("emits hp-disable on false→true transition", () => {
    const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
    container.appendChild(fieldset);

    let fired = false;
    fieldset.addEventListener("hp-disable", () => {
      fired = true;
    });
    fieldset.disabled = true;
    expect(fired).toBe(true);
  });

  it("emits hp-enable on true→false transition", () => {
    const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
    container.appendChild(fieldset);
    fieldset.disabled = true;

    let fired = false;
    fieldset.addEventListener("hp-enable", () => {
      fired = true;
    });
    fieldset.disabled = false;
    expect(fired).toBe(true);
  });

  it("does NOT emit event if disabled value doesn't change", () => {
    const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
    container.appendChild(fieldset);

    let count = 0;
    fieldset.addEventListener("hp-disable", () => {
      count++;
    });
    fieldset.addEventListener("hp-enable", () => {
      count++;
    });

    // Set same value twice
    fieldset.disabled = false;
    fieldset.disabled = false;
    expect(count).toBe(0);

    fieldset.disabled = true;
    count = 0; // reset after first transition
    fieldset.disabled = true;
    expect(count).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Task 6.6 — Property test P1: baseId is stable
// ---------------------------------------------------------------------------
describe("Property tests", () => {
  // Feature: fieldset, Property 1: baseId es estable
  it("P1: baseId is stable across multiple calls", () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10 }), (n) => {
        const elements: HeadlessFieldset[] = [];
        for (let i = 0; i < n; i++) {
          const el = document.createElement("hp-fieldset") as HeadlessFieldset;
          container.appendChild(el);
          elements.push(el);
        }
        for (const el of elements) {
          const id1 = el.baseId;
          const id2 = el.baseId;
          const id3 = el.baseId;
          if (id1 !== id2 || id2 !== id3) return false;
        }
        for (const el of elements) el.remove();
        return true;
      }),
      { numRuns: 100 },
    );
  });

  // Feature: fieldset, Property 2: Legend hereda ID del padre
  it("P2: legend.id === `${fieldset.baseId}-legend`", () => {
    fc.assert(
      fc.property(fc.string(), (text) => {
        const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
        const legend = document.createElement("hp-fieldset-legend") as HeadlessFieldsetLegend;
        legend.textContent = text;
        fieldset.appendChild(legend);
        container.appendChild(fieldset);

        const result = legend.id === `${fieldset.baseId}-legend`;
        fieldset.remove();
        return result;
      }),
      { numRuns: 100 },
    );
  });

  // Feature: fieldset, Property 3: aria-labelledby apunta al id de la leyenda
  it("P3: fieldset aria-labelledby === legend.id", () => {
    fc.assert(
      fc.property(fc.string(), (text) => {
        const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
        const legend = document.createElement("hp-fieldset-legend") as HeadlessFieldsetLegend;
        legend.textContent = text;
        fieldset.appendChild(legend);
        container.appendChild(fieldset);

        const result = fieldset.getAttribute("aria-labelledby") === legend.id;
        fieldset.remove();
        return result;
      }),
      { numRuns: 100 },
    );
  });

  // Feature: fieldset, Property 4: disabled propaga a controles nativos
  it("P4: disabled propagates to all native controls", () => {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom("input", "select", "textarea", "button"), {
          minLength: 1,
          maxLength: 6,
        }),
        (tags) => {
          const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
          const controls = tags.map((tag) => {
            const el = document.createElement(tag);
            fieldset.appendChild(el);
            return el;
          });
          container.appendChild(fieldset);

          fieldset.disabled = true;
          const allDisabled = controls.every((el) => el.hasAttribute("disabled"));
          fieldset.remove();
          return allDisabled;
        },
      ),
      { numRuns: 100 },
    );
  });

  // Feature: fieldset, Property 5: disabled propaga aria-disabled a controles ARIA
  it("P5: disabled propagates aria-disabled to ARIA-role controls", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.constantFrom("checkbox", "switch", "combobox", "radio", "spinbutton", "slider"),
          { minLength: 1, maxLength: 6 },
        ),
        (roles) => {
          const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
          const controls = roles.map((role) => {
            const el = document.createElement("div");
            el.setAttribute("role", role);
            fieldset.appendChild(el);
            return el;
          });
          container.appendChild(fieldset);

          fieldset.disabled = true;
          const allAriaDisabled = controls.every(
            (el) => el.getAttribute("aria-disabled") === "true",
          );
          fieldset.remove();
          return allAriaDisabled;
        },
      ),
      { numRuns: 100 },
    );
  });

  // Feature: fieldset, Property 6: data-state refleja disabled
  it("P6: data-state always reflects disabled value", () => {
    fc.assert(
      fc.property(fc.array(fc.boolean(), { minLength: 1, maxLength: 10 }), (sequence) => {
        const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
        container.appendChild(fieldset);

        let consistent = true;
        for (const val of sequence) {
          fieldset.disabled = val;
          const expected = val ? "disabled" : "enabled";
          if (fieldset.getAttribute("data-state") !== expected) {
            consistent = false;
            break;
          }
        }
        fieldset.remove();
        return consistent;
      }),
      { numRuns: 100 },
    );
  });

  // Feature: fieldset, Property 7: Ciclo disable→enable preserva controles pre-disabled
  it("P7: disable→enable cycle preserves pre-disabled controls", () => {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom("input", "select", "textarea", "button"), {
          minLength: 1,
          maxLength: 4,
        }),
        fc.array(fc.constantFrom("input", "select", "textarea", "button"), {
          minLength: 1,
          maxLength: 4,
        }),
        (preDisabledTags, normalTags) => {
          const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;

          const preDisabled = preDisabledTags.map((tag) => {
            const el = document.createElement(tag);
            el.setAttribute("disabled", "");
            fieldset.appendChild(el);
            return el;
          });
          const normal = normalTags.map((tag) => {
            const el = document.createElement(tag);
            fieldset.appendChild(el);
            return el;
          });
          container.appendChild(fieldset);

          fieldset.disabled = true;
          fieldset.disabled = false;

          // Pre-disabled controls must remain disabled
          const prePreserved = preDisabled.every((el) => el.hasAttribute("disabled"));
          // Normal controls must be restored
          const normalRestored = normal.every((el) => !el.hasAttribute("disabled"));

          fieldset.remove();
          return prePreserved && normalRestored;
        },
      ),
      { numRuns: 100 },
    );
  });

  // Feature: fieldset, Property 8: Ciclo disable→enable limpia data-hp-was-disabled
  it("P8: disable→enable cycle cleans data-hp-was-disabled from all descendants", () => {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom("input", "select", "textarea", "button"), {
          minLength: 1,
          maxLength: 4,
        }),
        fc.array(fc.constantFrom("input", "select", "textarea", "button"), {
          minLength: 1,
          maxLength: 4,
        }),
        (preDisabledTags, normalTags) => {
          const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;

          for (const tag of preDisabledTags) {
            const el = document.createElement(tag);
            el.setAttribute("disabled", "");
            fieldset.appendChild(el);
          }
          for (const tag of normalTags) {
            const el = document.createElement(tag);
            fieldset.appendChild(el);
          }
          container.appendChild(fieldset);

          fieldset.disabled = true;
          fieldset.disabled = false;

          const allDescendants = Array.from(fieldset.querySelectorAll("*"));
          const hasMarker = allDescendants.some((el) => el.hasAttribute("data-hp-was-disabled"));
          fieldset.remove();
          return !hasMarker;
        },
      ),
      { numRuns: 100 },
    );
  });

  // Feature: fieldset, Property 9: Equivalencia de rutas de cambio de disabled
  it("P9: setAttribute('disabled','') and el.disabled=true produce same observable state", () => {
    fc.assert(
      fc.property(fc.boolean(), (val) => {
        // Path A: property assignment
        const elA = document.createElement("hp-fieldset") as HeadlessFieldset;
        const inputA = document.createElement("input");
        elA.appendChild(inputA);
        container.appendChild(elA);
        elA.disabled = val;

        // Path B: setAttribute
        const elB = document.createElement("hp-fieldset") as HeadlessFieldset;
        const inputB = document.createElement("input");
        elB.appendChild(inputB);
        container.appendChild(elB);
        if (val) {
          elB.setAttribute("disabled", "");
        } else {
          elB.removeAttribute("disabled");
        }

        const sameAriaDisabled =
          elA.getAttribute("aria-disabled") === elB.getAttribute("aria-disabled");
        const sameDataState = elA.getAttribute("data-state") === elB.getAttribute("data-state");
        const sameInputDisabled =
          inputA.hasAttribute("disabled") === inputB.hasAttribute("disabled");

        elA.remove();
        elB.remove();
        return sameAriaDisabled && sameDataState && sameInputDisabled;
      }),
      { numRuns: 100 },
    );
  });

  // Feature: fieldset, Property 10: Emisión de hp-disable en transición false→true
  it("P10: each false→true transition emits exactly one hp-disable", () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 5 }), (n) => {
        const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
        container.appendChild(fieldset);

        let count = 0;
        fieldset.addEventListener("hp-disable", () => {
          count++;
        });

        for (let i = 0; i < n; i++) {
          fieldset.disabled = false;
          fieldset.disabled = true;
        }

        fieldset.remove();
        return count === n;
      }),
      { numRuns: 100 },
    );
  });

  // Feature: fieldset, Property 11: Emisión de hp-enable en transición true→false
  it("P11: each true→false transition emits exactly one hp-enable", () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 5 }), (n) => {
        const fieldset = document.createElement("hp-fieldset") as HeadlessFieldset;
        container.appendChild(fieldset);

        let count = 0;
        fieldset.addEventListener("hp-enable", () => {
          count++;
        });

        for (let i = 0; i < n; i++) {
          fieldset.disabled = true;
          fieldset.disabled = false;
        }

        fieldset.remove();
        return count === n;
      }),
      { numRuns: 100 },
    );
  });
});
