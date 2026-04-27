import { describe, it, expect, beforeEach } from "vitest";
import "./index";
import type { HeadlessScrollArea, HeadlessScrollAreaScrollbar } from "./scroll-area";

const raf = () => new Promise((r) => requestAnimationFrame(r));

function createScrollArea(orientation = "vertical") {
  const root = document.createElement("hp-scroll-area") as HeadlessScrollArea;
  root.setAttribute("orientation", orientation);

  const viewport = document.createElement("hp-scroll-area-viewport");
  const content = document.createElement("hp-scroll-area-content");
  viewport.appendChild(content);
  root.appendChild(viewport);

  const vScrollbar = document.createElement(
    "hp-scroll-area-scrollbar",
  ) as HeadlessScrollAreaScrollbar;
  vScrollbar.setAttribute("orientation", "vertical");
  const vThumb = document.createElement("hp-scroll-area-thumb");
  vScrollbar.appendChild(vThumb);
  root.appendChild(vScrollbar);

  const hScrollbar = document.createElement(
    "hp-scroll-area-scrollbar",
  ) as HeadlessScrollAreaScrollbar;
  hScrollbar.setAttribute("orientation", "horizontal");
  const hThumb = document.createElement("hp-scroll-area-thumb");
  hScrollbar.appendChild(hThumb);
  root.appendChild(hScrollbar);

  const corner = document.createElement("hp-scroll-area-corner");
  root.appendChild(corner);

  document.body.appendChild(root);
  return { root, viewport, content, vScrollbar, hScrollbar, vThumb, hThumb, corner };
}

describe("HeadlessScrollArea", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should register all custom elements", () => {
    expect(customElements.get("hp-scroll-area")).toBeDefined();
    expect(customElements.get("hp-scroll-area-viewport")).toBeDefined();
    expect(customElements.get("hp-scroll-area-content")).toBeDefined();
    expect(customElements.get("hp-scroll-area-scrollbar")).toBeDefined();
    expect(customElements.get("hp-scroll-area-thumb")).toBeDefined();
    expect(customElements.get("hp-scroll-area-corner")).toBeDefined();
  });

  it("should set data-hp-component on all parts", async () => {
    const { root, viewport, content, vScrollbar, vThumb, corner } = createScrollArea();
    await raf();
    expect(root.getAttribute("data-hp-component")).toBe("scroll-area");
    expect(viewport.getAttribute("data-hp-component")).toBe("scroll-area-viewport");
    expect(content.getAttribute("data-hp-component")).toBe("scroll-area-content");
    expect(vScrollbar.getAttribute("data-hp-component")).toBe("scroll-area-scrollbar");
    expect(vThumb.getAttribute("data-hp-component")).toBe("scroll-area-thumb");
    expect(corner.getAttribute("data-hp-component")).toBe("scroll-area-corner");
  });

  it("should set data-orientation on root", async () => {
    const { root } = createScrollArea("vertical");
    await raf();
    expect(root.getAttribute("data-orientation")).toBe("vertical");
  });

  it("should update data-orientation when property changes", async () => {
    const { root } = createScrollArea("vertical");
    await raf();
    root.orientation = "horizontal";
    expect(root.getAttribute("data-orientation")).toBe("horizontal");
  });

  it("should set role=scrollbar on scrollbars", async () => {
    const { vScrollbar, hScrollbar } = createScrollArea();
    await raf();
    expect(vScrollbar.getAttribute("role")).toBe("scrollbar");
    expect(hScrollbar.getAttribute("role")).toBe("scrollbar");
  });

  it("should set aria-orientation on scrollbars", async () => {
    const { vScrollbar, hScrollbar } = createScrollArea();
    await raf();
    expect(vScrollbar.getAttribute("aria-orientation")).toBe("vertical");
    expect(hScrollbar.getAttribute("aria-orientation")).toBe("horizontal");
  });

  it("should set data-orientation on scrollbars", async () => {
    const { vScrollbar, hScrollbar } = createScrollArea();
    await raf();
    expect(vScrollbar.getAttribute("data-orientation")).toBe("vertical");
    expect(hScrollbar.getAttribute("data-orientation")).toBe("horizontal");
  });

  it("should set tabindex=0 on scrollbars for keyboard navigation", async () => {
    const { vScrollbar } = createScrollArea();
    await raf();
    expect(vScrollbar.getAttribute("tabindex")).toBe("0");
  });

  it("should set aria-hidden=true on corner", async () => {
    const { corner } = createScrollArea();
    await raf();
    expect(corner.getAttribute("aria-hidden")).toBe("true");
  });

  it("should set aria-valuemin=0 on scrollbars", async () => {
    const { vScrollbar } = createScrollArea();
    await raf();
    expect(vScrollbar.getAttribute("aria-valuemin")).toBe("0");
  });

  it("should assign a unique id to viewport", async () => {
    const { viewport } = createScrollArea();
    await raf();
    expect(viewport.id).toMatch(/^hp-scroll-area-viewport-/);
  });

  it("should link scrollbar aria-controls to viewport id", async () => {
    const { viewport, vScrollbar } = createScrollArea();
    await raf();
    expect(vScrollbar.getAttribute("aria-controls")).toBe(viewport.id);
  });

  it("should update scrollbar orientation via property setter", async () => {
    const { vScrollbar } = createScrollArea();
    await raf();
    vScrollbar.orientation = "horizontal";
    expect(vScrollbar.getAttribute("data-orientation")).toBe("horizontal");
    expect(vScrollbar.getAttribute("aria-orientation")).toBe("horizontal");
  });

  it("disconnecting during drag aborts document listeners (no leak)", async () => {
    const { root, vScrollbar, vThumb, viewport } = createScrollArea();
    await raf();

    // Start drag by dispatching mousedown on the thumb
    vThumb.dispatchEvent(
      new MouseEvent("mousedown", { bubbles: true, cancelable: true, clientX: 10, clientY: 10 }),
    );
    expect(vScrollbar.hasAttribute("data-dragging")).toBe(true);

    // Capture viewport scroll before disconnect to assert listeners no longer fire.
    const scrollTopBefore = viewport.scrollTop;

    // Disconnect while dragging — signal should abort and clean up listeners
    root.remove();

    // Subsequent document mousemove/mouseup should not throw because the
    // AbortSignal removes the listeners. The drag handlers should NOT run.
    expect(() => {
      document.dispatchEvent(new MouseEvent("mousemove", { clientX: 200, clientY: 200 }));
      document.dispatchEvent(new MouseEvent("mouseup"));
    }).not.toThrow();

    // Viewport scroll must remain untouched, proving onMove was not invoked.
    expect(viewport.scrollTop).toBe(scrollTopBefore);
  });
});
