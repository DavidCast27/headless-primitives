import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./index";
import type { HeadlessToolbar } from "./toolbar";

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
});

// ---------------------------------------------------------------------------
// Basic structure and attributes
// ---------------------------------------------------------------------------
describe("hp-toolbar — structure", () => {
  it("sets data-hp-component='toolbar' on connect", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    container.appendChild(el);
    expect(el.getAttribute("data-hp-component")).toBe("toolbar");
  });

  it("sets role='toolbar' on connect", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    container.appendChild(el);
    expect(el.getAttribute("role")).toBe("toolbar");
  });

  it("sets aria-orientation='horizontal' by default", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    container.appendChild(el);
    expect(el.getAttribute("aria-orientation")).toBe("horizontal");
  });

  it("sets aria-label='Toolbar' as fallback when no label provided", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    container.appendChild(el);
    expect(el.getAttribute("aria-label")).toBe("Toolbar");
  });

  it("reflects orientation attribute", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    container.appendChild(el);
    expect(el.getAttribute("orientation")).toBe("horizontal");
  });
});

// ---------------------------------------------------------------------------
// Orientation property
// ---------------------------------------------------------------------------
describe("hp-toolbar — orientation", () => {
  it("updates aria-orientation when orientation property changes to 'vertical'", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    container.appendChild(el);
    el.orientation = "vertical";
    expect(el.getAttribute("aria-orientation")).toBe("vertical");
  });

  it("updates aria-orientation back to 'horizontal'", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    container.appendChild(el);
    el.orientation = "vertical";
    el.orientation = "horizontal";
    expect(el.getAttribute("aria-orientation")).toBe("horizontal");
  });

  it("reflects orientation='vertical' to attribute", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    container.appendChild(el);
    el.orientation = "vertical";
    expect(el.getAttribute("orientation")).toBe("vertical");
  });
});

// ---------------------------------------------------------------------------
// Label property
// ---------------------------------------------------------------------------
describe("hp-toolbar — label", () => {
  it("sets aria-label when label property is set", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    container.appendChild(el);
    el.label = "Formatting tools";
    expect(el.getAttribute("aria-label")).toBe("Formatting tools");
  });

  it("sets aria-label before append when label is set", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    el.label = "Text editor toolbar";
    container.appendChild(el);
    expect(el.getAttribute("aria-label")).toBe("Text editor toolbar");
  });

  it("updates aria-label when label property changes", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    container.appendChild(el);
    el.label = "First label";
    el.label = "Second label";
    expect(el.getAttribute("aria-label")).toBe("Second label");
  });
});

// ---------------------------------------------------------------------------
// Roving tabindex
// ---------------------------------------------------------------------------
describe("hp-toolbar — roving tabindex", () => {
  it("sets first button to tabindex='0' and others to tabindex='-1'", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    const btn3 = document.createElement("button");
    el.append(btn1, btn2, btn3);
    container.appendChild(el);

    // rAF cycle needed for _initRovingTabindex on connectedCallback
    expect(btn1.getAttribute("tabindex")).toBe("0");
    expect(btn2.getAttribute("tabindex")).toBe("-1");
    expect(btn3.getAttribute("tabindex")).toBe("-1");
  });

  it("does not modify tabindex if an item already has tabindex='0'", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    btn2.setAttribute("tabindex", "0");
    el.append(btn1, btn2);
    container.appendChild(el);

    // btn2 was already tabindex=0, so btn1 should be -1
    expect(btn2.getAttribute("tabindex")).toBe("0");
    expect(btn1.getAttribute("tabindex")).toBe("-1");
  });
});

// ---------------------------------------------------------------------------
// Keyboard navigation — horizontal
// ---------------------------------------------------------------------------
describe("hp-toolbar — keyboard navigation (horizontal)", () => {
  it("ArrowRight moves focus to next item", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    const btn3 = document.createElement("button");
    el.append(btn1, btn2, btn3);
    container.appendChild(el);

    btn1.focus();
    btn1.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));

    expect(btn2.getAttribute("tabindex")).toBe("0");
    expect(btn1.getAttribute("tabindex")).toBe("-1");
  });

  it("ArrowLeft moves focus to previous item", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    el.append(btn1, btn2);
    container.appendChild(el);

    // Set focus state to btn2
    btn2.setAttribute("tabindex", "0");
    btn1.setAttribute("tabindex", "-1");
    btn2.focus();
    btn2.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));

    expect(btn1.getAttribute("tabindex")).toBe("0");
    expect(btn2.getAttribute("tabindex")).toBe("-1");
  });

  it("Home moves focus to first item", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    const btn3 = document.createElement("button");
    el.append(btn1, btn2, btn3);
    container.appendChild(el);

    btn3.setAttribute("tabindex", "0");
    btn1.setAttribute("tabindex", "-1");
    btn2.setAttribute("tabindex", "-1");
    btn3.focus();
    btn3.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true }));

    expect(btn1.getAttribute("tabindex")).toBe("0");
    expect(btn3.getAttribute("tabindex")).toBe("-1");
  });

  it("End moves focus to last item", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    const btn3 = document.createElement("button");
    el.append(btn1, btn2, btn3);
    container.appendChild(el);

    btn1.focus();
    btn1.dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true }));

    expect(btn3.getAttribute("tabindex")).toBe("0");
    expect(btn1.getAttribute("tabindex")).toBe("-1");
  });

  it("ArrowDown does NOT navigate in horizontal orientation", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    el.append(btn1, btn2);
    container.appendChild(el);

    btn1.focus();
    btn1.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));

    // btn1 should still be the active item
    expect(btn1.getAttribute("tabindex")).toBe("0");
  });
});

// ---------------------------------------------------------------------------
// Keyboard navigation — vertical
// ---------------------------------------------------------------------------
describe("hp-toolbar — keyboard navigation (vertical)", () => {
  it("ArrowDown moves focus to next item in vertical orientation", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    el.orientation = "vertical";
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    el.append(btn1, btn2);
    container.appendChild(el);

    btn1.focus();
    btn1.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));

    expect(btn2.getAttribute("tabindex")).toBe("0");
    expect(btn1.getAttribute("tabindex")).toBe("-1");
  });

  it("ArrowUp moves focus to previous item in vertical orientation", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    el.orientation = "vertical";
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    el.append(btn1, btn2);
    container.appendChild(el);

    btn2.setAttribute("tabindex", "0");
    btn1.setAttribute("tabindex", "-1");
    btn2.focus();
    btn2.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }));

    expect(btn1.getAttribute("tabindex")).toBe("0");
    expect(btn2.getAttribute("tabindex")).toBe("-1");
  });

  it("ArrowRight does NOT navigate in vertical orientation", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    el.orientation = "vertical";
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    el.append(btn1, btn2);
    container.appendChild(el);

    btn1.focus();
    btn1.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));

    expect(btn1.getAttribute("tabindex")).toBe("0");
  });
});

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------
describe("hp-toolbar — events", () => {
  it("emits hp-focus-change when keyboard navigation moves focus", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    el.append(btn1, btn2);
    container.appendChild(el);

    let detail: unknown = null;
    el.addEventListener("hp-focus-change", (e: Event) => {
      detail = (e as CustomEvent).detail;
    });

    btn1.focus();
    btn1.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));

    expect(detail).toBeDefined();
    expect((detail as { index: number }).index).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// Sync pattern — attributes set synchronously
// ---------------------------------------------------------------------------
describe("hp-toolbar — sync pattern", () => {
  it("attributes are set immediately on appendChild without awaiting", () => {
    const el = document.createElement("hp-toolbar") as HeadlessToolbar;
    el.orientation = "vertical";
    el.label = "My toolbar";
    container.appendChild(el);

    expect(el.getAttribute("role")).toBe("toolbar");
    expect(el.getAttribute("data-hp-component")).toBe("toolbar");
    expect(el.getAttribute("aria-orientation")).toBe("vertical");
    expect(el.getAttribute("aria-label")).toBe("My toolbar");
  });
});
