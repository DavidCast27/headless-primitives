import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./index"; // triggers @customElement decorator registration
import type { Stepper } from "./stepper";

async function waitForUpdate(element?: HTMLElement) {
  if (element && "updateComplete" in element) {
    await (element as unknown as { updateComplete: Promise<unknown> }).updateComplete;
  }
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => setTimeout(resolve, 0));
}

function createStepper(value = 0, linear = false) {
  const root = document.createElement("hp-stepper") as Stepper;
  root.setAttribute("value", String(value));
  if (linear) root.setAttribute("linear", "");

  root.innerHTML = `
    <hp-stepper-list>
      <hp-stepper-item>Step 1</hp-stepper-item>
      <hp-stepper-item>Step 2</hp-stepper-item>
      <hp-stepper-item>Step 3</hp-stepper-item>
    </hp-stepper-list>
    <hp-stepper-panel>Panel 1</hp-stepper-panel>
    <hp-stepper-panel>Panel 2</hp-stepper-panel>
    <hp-stepper-panel>Panel 3</hp-stepper-panel>
    <hp-stepper-prev>Prev</hp-stepper-prev>
    <hp-stepper-next>Next</hp-stepper-next>
  `;

  document.body.appendChild(root);
  return root;
}

describe("Stepper Components", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  // --- Registration ---

  it("registers all custom elements", () => {
    expect(customElements.get("hp-stepper")).toBeDefined();
    expect(customElements.get("hp-stepper-list")).toBeDefined();
    expect(customElements.get("hp-stepper-item")).toBeDefined();
    expect(customElements.get("hp-stepper-panel")).toBeDefined();
    expect(customElements.get("hp-stepper-prev")).toBeDefined();
    expect(customElements.get("hp-stepper-next")).toBeDefined();
  });

  // --- data-hp-component attributes ---

  it("sets data-hp-component on all parts", async () => {
    const root = createStepper();
    await waitForUpdate(root);

    expect(root.getAttribute("data-hp-component")).toBe("stepper");
    expect(root.querySelector("hp-stepper-list")!.getAttribute("data-hp-component")).toBe(
      "stepper-list",
    );
    expect(root.querySelector("hp-stepper-item")!.getAttribute("data-hp-component")).toBe(
      "stepper-item",
    );
    expect(root.querySelector("hp-stepper-panel")!.getAttribute("data-hp-component")).toBe(
      "stepper-panel",
    );
    expect(root.querySelector("hp-stepper-prev")!.getAttribute("data-hp-component")).toBe(
      "stepper-prev",
    );
    expect(root.querySelector("hp-stepper-next")!.getAttribute("data-hp-component")).toBe(
      "stepper-next",
    );
  });

  // --- ARIA roles ---

  it("sets role=group on hp-stepper", async () => {
    const root = createStepper();
    await waitForUpdate(root);
    expect(root.getAttribute("role")).toBe("group");
  });

  it("sets role=tablist on hp-stepper-list", async () => {
    const root = createStepper();
    await waitForUpdate(root);
    expect(root.querySelector("hp-stepper-list")!.getAttribute("role")).toBe("tablist");
  });

  it("sets role=tab on hp-stepper-item", async () => {
    const root = createStepper();
    await waitForUpdate(root);
    const items = root.querySelectorAll("hp-stepper-item");
    items.forEach((item) => expect(item.getAttribute("role")).toBe("tab"));
  });

  it("sets role=tabpanel on hp-stepper-panel", async () => {
    const root = createStepper();
    await waitForUpdate(root);
    const panels = root.querySelectorAll("hp-stepper-panel");
    panels.forEach((panel) => expect(panel.getAttribute("role")).toBe("tabpanel"));
  });

  // --- Initial state distribution ---

  it("sets correct data-state on items for initial step=0", async () => {
    const root = createStepper(0);
    await waitForUpdate(root);

    const items = root.querySelectorAll("hp-stepper-item");
    expect(items[0].getAttribute("data-state")).toBe("active");
    expect(items[1].getAttribute("data-state")).toBe("pending");
    expect(items[2].getAttribute("data-state")).toBe("pending");
  });

  it("sets correct data-state on items for initial step=1", async () => {
    const root = createStepper(1);
    await waitForUpdate(root);

    const items = root.querySelectorAll("hp-stepper-item");
    expect(items[0].getAttribute("data-state")).toBe("completed");
    expect(items[1].getAttribute("data-state")).toBe("active");
    expect(items[2].getAttribute("data-state")).toBe("pending");
  });

  it("shows only the active panel", async () => {
    const root = createStepper(1);
    await waitForUpdate(root);

    const panels = root.querySelectorAll("hp-stepper-panel");
    expect(panels[0].getAttribute("data-state")).toBe("hidden");
    expect(panels[1].getAttribute("data-state")).toBe("active");
    expect(panels[2].getAttribute("data-state")).toBe("hidden");
  });

  it("sets aria-hidden=false on active panel", async () => {
    const root = createStepper(0);
    await waitForUpdate(root);

    const panels = root.querySelectorAll("hp-stepper-panel");
    expect(panels[0].getAttribute("aria-hidden")).toBe("false");
    expect(panels[1].getAttribute("aria-hidden")).toBe("true");
  });

  // --- aria-selected on items ---

  it("sets aria-selected=true only on the active item", async () => {
    const root = createStepper(0);
    await waitForUpdate(root);

    const items = root.querySelectorAll("hp-stepper-item");
    expect(items[0].getAttribute("aria-selected")).toBe("true");
    expect(items[1].getAttribute("aria-selected")).toBe("false");
    expect(items[2].getAttribute("aria-selected")).toBe("false");
  });

  // --- aria-current on active item (APG) ---

  it("sets aria-current=step on the active item only", async () => {
    const root = createStepper(1);
    await waitForUpdate(root);

    const items = root.querySelectorAll("hp-stepper-item");
    expect(items[0].hasAttribute("aria-current")).toBe(false);
    expect(items[1].getAttribute("aria-current")).toBe("step");
    expect(items[2].hasAttribute("aria-current")).toBe(false);
  });

  it("moves aria-current=step when value changes", async () => {
    const root = createStepper(0);
    await waitForUpdate(root);

    const items = root.querySelectorAll("hp-stepper-item");
    expect(items[0].getAttribute("aria-current")).toBe("step");

    root.next();
    await waitForUpdate(root);
    expect(items[0].hasAttribute("aria-current")).toBe(false);
    expect(items[1].getAttribute("aria-current")).toBe("step");
  });

  it("removes aria-current from all items after complete()", async () => {
    const root = createStepper(2);
    await waitForUpdate(root);

    root.complete();
    await waitForUpdate(root);

    const items = root.querySelectorAll("hp-stepper-item");
    items.forEach((item) => expect(item.hasAttribute("aria-current")).toBe(false));
  });

  // --- tabindex management ---

  it("gives tabindex=0 to the active item only", async () => {
    const root = createStepper(0);
    await waitForUpdate(root);

    const items = root.querySelectorAll("hp-stepper-item");
    expect(items[0].getAttribute("tabindex")).toBe("0");
    expect(items[1].getAttribute("tabindex")).toBe("-1");
  });

  // --- next() / prev() / goTo() ---

  it("next() advances to the next step", async () => {
    const root = createStepper(0);
    await waitForUpdate(root);

    root.next();
    await waitForUpdate(root);

    expect(root.value).toBe(1);
    const items = root.querySelectorAll("hp-stepper-item");
    expect(items[1].getAttribute("data-state")).toBe("active");
  });

  it("prev() goes back one step", async () => {
    const root = createStepper(2);
    await waitForUpdate(root);

    root.prev();
    await waitForUpdate(root);

    expect(root.value).toBe(1);
  });

  it("next() does not go beyond the last step", async () => {
    const root = createStepper(2);
    await waitForUpdate(root);

    root.next();
    await waitForUpdate(root);

    expect(root.value).toBe(2);
  });

  it("prev() does not go below 0", async () => {
    const root = createStepper(0);
    await waitForUpdate(root);

    root.prev();
    await waitForUpdate(root);

    expect(root.value).toBe(0);
  });

  it("goTo() jumps to arbitrary step", async () => {
    const root = createStepper(0);
    await waitForUpdate(root);

    root.goTo(2);
    await waitForUpdate(root);

    expect(root.value).toBe(2);
  });

  // --- hp-change event ---

  it("emits hp-change when step changes via next()", async () => {
    const root = createStepper(0);
    await waitForUpdate(root);

    let detail: unknown = null;
    root.addEventListener("hp-change", (e: Event) => {
      detail = (e as CustomEvent).detail;
    });

    root.next();
    await waitForUpdate(root);

    expect(detail).toEqual({ value: 1, prev: 0 });
  });

  it("does not emit hp-change when value does not change", async () => {
    const root = createStepper(0);
    await waitForUpdate(root);

    let count = 0;
    root.addEventListener("hp-change", () => count++);

    root.next();
    await waitForUpdate(root);
    root.next();
    await waitForUpdate(root);

    // Two advances = two events
    expect(count).toBe(2);
  });

  // --- linear mode ---

  it("linear mode: goTo() cannot skip ahead", async () => {
    const root = createStepper(0, true);
    await waitForUpdate(root);

    root.goTo(2); // skip step 1
    await waitForUpdate(root);

    // Should remain at 0 because step 2 is not yet reachable
    expect(root.value).toBe(0);
  });

  it("linear mode: goTo() allows current+1", async () => {
    const root = createStepper(0, true);
    await waitForUpdate(root);

    root.goTo(1);
    await waitForUpdate(root);

    expect(root.value).toBe(1);
  });

  it("linear mode: sets aria-disabled on unreachable items", async () => {
    const root = createStepper(0, true);
    await waitForUpdate(root);

    const items = root.querySelectorAll("hp-stepper-item");
    // Step 0 is active (reachable), step 1 is next (reachable), step 2 is not
    expect(items[2].getAttribute("aria-disabled")).toBe("true");
    expect(items[1].getAttribute("aria-disabled")).toBe("false");
  });

  // --- Item click ---

  it("clicking an item navigates to that step", async () => {
    const root = createStepper(0);
    await waitForUpdate(root);

    const items = root.querySelectorAll<HTMLElement>("hp-stepper-item");
    items[2].click();
    await waitForUpdate(root);

    expect(root.value).toBe(2);
  });

  // --- Nav buttons ---

  it("hp-stepper-prev is disabled when on first step", async () => {
    const root = createStepper(0);
    await waitForUpdate(root);

    const prevBtn = root.querySelector("hp-stepper-prev")!;
    expect(prevBtn.hasAttribute("disabled")).toBe(true);
    expect(prevBtn.getAttribute("aria-disabled")).toBe("true");
  });

  it("hp-stepper-next is disabled when on last step", async () => {
    const root = createStepper(2);
    await waitForUpdate(root);

    const nextBtn = root.querySelector("hp-stepper-next")!;
    expect(nextBtn.hasAttribute("disabled")).toBe(true);
    expect(nextBtn.getAttribute("aria-disabled")).toBe("true");
  });

  it("clicking hp-stepper-next advances the step", async () => {
    const root = createStepper(0);
    await waitForUpdate(root);

    const nextBtn = root.querySelector<HTMLElement>("hp-stepper-next")!;
    nextBtn.click();
    await waitForUpdate(root);

    expect(root.value).toBe(1);
  });

  it("clicking hp-stepper-prev goes back", async () => {
    const root = createStepper(1);
    await waitForUpdate(root);

    const prevBtn = root.querySelector<HTMLElement>("hp-stepper-prev")!;
    prevBtn.click();
    await waitForUpdate(root);

    expect(root.value).toBe(0);
  });

  // --- Keyboard navigation ---

  it("ArrowRight moves to the next step", async () => {
    const root = createStepper(0);
    await waitForUpdate(root);

    root.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    await waitForUpdate(root);

    expect(root.value).toBe(1);
  });

  it("ArrowLeft moves to the previous step", async () => {
    const root = createStepper(1);
    await waitForUpdate(root);

    root.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
    await waitForUpdate(root);

    expect(root.value).toBe(0);
  });

  it("Home moves to the first step", async () => {
    const root = createStepper(2);
    await waitForUpdate(root);

    root.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true }));
    await waitForUpdate(root);

    expect(root.value).toBe(0);
  });

  it("End moves to the last step", async () => {
    const root = createStepper(0);
    await waitForUpdate(root);

    root.dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true }));
    await waitForUpdate(root);

    expect(root.value).toBe(2);
  });

  // --- data-index attribute ---

  it("sets data-index on items and panels", async () => {
    const root = createStepper(0);
    await waitForUpdate(root);

    const items = root.querySelectorAll("hp-stepper-item");
    items.forEach((item, i) => {
      expect(item.getAttribute("data-index")).toBe(String(i));
    });

    const panels = root.querySelectorAll("hp-stepper-panel");
    panels.forEach((panel, i) => {
      expect(panel.getAttribute("data-index")).toBe(String(i));
    });
  });
});
