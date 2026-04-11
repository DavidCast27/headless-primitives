import { expect, test, describe, beforeEach } from "vitest";
import "./index";
import type { HpCarousel } from "./carousel";

describe("HpCarousel", () => {
  let carousel: HpCarousel;

  beforeEach(async () => {
    document.body.innerHTML = `
      <hp-carousel label="Test Carousel" id="carousel">
        <hp-carousel-content slot="content">
          <hp-carousel-item id="item-0">Slide 1</hp-carousel-item>
          <hp-carousel-item id="item-1">Slide 2</hp-carousel-item>
          <hp-carousel-item id="item-2">Slide 3</hp-carousel-item>
        </hp-carousel-content>
        <hp-carousel-previous id="prev">Prev</hp-carousel-previous>
        <hp-carousel-next id="next">Next</hp-carousel-next>
      </hp-carousel>
    `;
    carousel = document.querySelector("hp-carousel") as HpCarousel;
    await carousel.updateComplete;
  });

  test("should have correct ARIA roles and attributes", () => {
    expect(carousel.getAttribute("role")).toBe("region");
    expect(carousel.getAttribute("aria-roledescription")).toBe("carousel");
    expect(carousel.getAttribute("aria-label")).toBe("Test Carousel");
  });

  test("should update active slide on next()", async () => {
    carousel.next();
    await carousel.updateComplete;
    const items = document.querySelectorAll("hp-carousel-item");
    expect(items[0].getAttribute("data-state")).toBe("inactive");
    expect(items[1].getAttribute("data-state")).toBe("active");
    expect(items[1].getAttribute("aria-hidden")).toBe("false");
  });

  test("should loop if enabled", async () => {
    carousel.loop = true;
    carousel.next();
    carousel.next();
    carousel.next(); // Should wrap to 0
    await carousel.updateComplete;
    const items = document.querySelectorAll("hp-carousel-item");
    expect(items[0].getAttribute("data-state")).toBe("active");
  });

  test("should update label via sync pattern", async () => {
    carousel.label = "New Label";
    expect(carousel.getAttribute("aria-label")).toBe("New Label");
  });
});

/**
 * Bug Condition: item discovery and data-state
 *
 * Validates: Requirements 1.1, 1.2, 1.5, 1.6
 *
 * CRITICAL: These tests MUST FAIL on unfixed code — failure confirms the bugs exist.
 * They encode the expected (correct) behavior and will pass once the fix is applied.
 */
describe("Bug Condition: item discovery and data-state", () => {
  // C1 — item discovery
  // @queryAssignedElements targets the outer slot of hp-carousel, but items live
  // inside hp-carousel-content which has its own inner slot. The query never
  // matches, so this._items is always [].
  test("C1 — item discovery: _items finds all hp-carousel-item elements inside hp-carousel-content", async () => {
    document.body.innerHTML = `
      <hp-carousel id="c1">
        <hp-carousel-content>
          <hp-carousel-item id="c1-item-0">Slide 1</hp-carousel-item>
          <hp-carousel-item id="c1-item-1">Slide 2</hp-carousel-item>
          <hp-carousel-item id="c1-item-2">Slide 3</hp-carousel-item>
        </hp-carousel-content>
      </hp-carousel>
    `;
    const c = document.querySelector("hp-carousel") as HpCarousel;
    await c.updateComplete;
    c.goTo(0);
    // Cast to any to access private _items getter
    expect((c as any)._items.length).toBe(3);
  });

  // C2 — data-state assignment
  // _updateItems() sets/removes the boolean `active` attribute instead of
  // data-state="active|inactive". No CSS rule targets [active], so all slides
  // render simultaneously and the consumer has no hook to hide inactive slides.
  test("C2 — data-state: active item has data-state=active, others have data-state=inactive", async () => {
    document.body.innerHTML = `
      <hp-carousel id="c2">
        <hp-carousel-content>
          <hp-carousel-item id="c2-item-0">Slide 1</hp-carousel-item>
          <hp-carousel-item id="c2-item-1">Slide 2</hp-carousel-item>
          <hp-carousel-item id="c2-item-2">Slide 3</hp-carousel-item>
        </hp-carousel-content>
      </hp-carousel>
    `;
    const c = document.querySelector("hp-carousel") as HpCarousel;
    await c.updateComplete;
    c.goTo(1);
    const items = document.querySelectorAll("hp-carousel-item");
    expect(items[1].getAttribute("data-state")).toBe("active");
    expect(items[0].getAttribute("data-state")).toBe("inactive");
  });

  // C3 — premature autoplay
  // The autoplay setter calls this.start() unconditionally. When the browser
  // parses <hp-carousel autoplay> the setter fires before connectedCallback,
  // starting an interval with zero items available.
  test("C3 — premature autoplay: setting autoplay before connecting to DOM does not start the timer", async () => {
    const c = document.createElement("hp-carousel") as HpCarousel;
    // Set autoplay BEFORE appending to DOM (before connectedCallback)
    c.autoplay = true;
    // Timer must still be null — start() should be deferred until isConnected
    expect((c as any)._autoplayTimer).toBeNull();
    // Cleanup: append then disconnect so no interval leaks
    document.body.appendChild(c);
    c.remove();
  });

  // C4 — label reactivity
  // label uses a manual getter/setter that does not register the attribute in
  // observedAttributes. Setting the attribute via setAttribute() does not
  // trigger attributeChangedCallback, so aria-label is never updated.
  test("C4 — label reactivity: setAttribute(label) reflects to aria-label", async () => {
    document.body.innerHTML = `<hp-carousel id="c4"></hp-carousel>`;
    const c = document.querySelector("hp-carousel") as HpCarousel;
    await c.updateComplete;
    c.setAttribute("label", "Test");
    expect(c.getAttribute("aria-label")).toBe("Test");
  });
});

/**
 * Preservation: navigation behavior
 *
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8
 *
 * These tests MUST PASS on unfixed code — they verify navigation logic that is
 * not broken by the slot/data-state bugs.
 *
 * Strategy: override `items` on each instance to provide a fake array of the
 * correct length so next()/previous()/goTo() can run their index arithmetic
 * without depending on @queryAssignedElements (which is broken on unfixed code).
 */
describe("Preservation: navigation behavior", () => {
  /**
   * Helper: create a connected carousel with `n` fake items injected so that
   * navigation methods work on unfixed code.
   */
  function makeCarousel(n: number, loop = false): HpCarousel {
    document.body.innerHTML = `<hp-carousel></hp-carousel>`;
    const c = document.querySelector("hp-carousel") as HpCarousel;
    c.loop = loop;
    // Inject a fake items array so next()/previous()/goTo() can read .length
    // This is necessary because @queryAssignedElements returns undefined/[] on
    // unfixed code when items are not directly slotted into hp-carousel.
    const fakeItems = Array.from({ length: n }, () => document.createElement("hp-carousel-item"));
    Object.defineProperty(c, "_items", {
      get: () => fakeItems,
      configurable: true,
    });
    return c;
  }

  // ── Property: next() increments activeIndex by 1 ──────────────────────────
  // For any activeIndex in [0, n-2], next() must set activeIndex to activeIndex+1.
  // Tested across item counts 2–5 and all valid start indices.
  test("next() increments activeIndex by 1 for any non-last index", () => {
    for (let n = 2; n <= 5; n++) {
      for (let startIdx = 0; startIdx <= n - 2; startIdx++) {
        const c = makeCarousel(n);
        c.activeIndex = startIdx;
        c.next();
        expect(c.activeIndex).toBe(startIdx + 1);
      }
    }
  });

  // ── Property: previous() decrements activeIndex by 1 ─────────────────────
  // For any activeIndex in [1, n-1], previous() must set activeIndex to activeIndex-1.
  test("previous() decrements activeIndex by 1 for any non-first index", () => {
    for (let n = 2; n <= 5; n++) {
      for (let startIdx = 1; startIdx <= n - 1; startIdx++) {
        const c = makeCarousel(n);
        c.activeIndex = startIdx;
        c.previous();
        expect(c.activeIndex).toBe(startIdx - 1);
      }
    }
  });

  // ── Property: loop wrap-around ────────────────────────────────────────────
  // With loop=true, next() on last index wraps to 0.
  // With loop=true, previous() on index 0 wraps to last index.
  test("loop=true: next() on last index wraps to 0", () => {
    for (let n = 2; n <= 5; n++) {
      const c = makeCarousel(n, true);
      c.activeIndex = n - 1;
      c.next();
      expect(c.activeIndex).toBe(0);
    }
  });

  test("loop=true: previous() on index 0 wraps to last index", () => {
    for (let n = 2; n <= 5; n++) {
      const c = makeCarousel(n, true);
      c.activeIndex = 0;
      c.previous();
      expect(c.activeIndex).toBe(n - 1);
    }
  });

  // ── Property: goTo(i) sets activeIndex = i ────────────────────────────────
  // For any valid i in [0, n-1], goTo(i) must set activeIndex to i.
  test("goTo(i) sets activeIndex to i for any valid index", () => {
    for (let n = 1; n <= 5; n++) {
      for (let i = 0; i < n; i++) {
        const c = makeCarousel(n);
        c.goTo(i);
        expect(c.activeIndex).toBe(i);
      }
    }
  });

  // ── Property: hp-carousel-change event emitted on every activeIndex change ─
  // Every transition via activeIndex setter must emit hp-carousel-change with
  // the correct { activeIndex } in detail.
  test("every activeIndex change emits hp-carousel-change with correct detail", () => {
    for (let n = 2; n <= 4; n++) {
      const c = makeCarousel(n);
      const received: number[] = [];
      c.addEventListener("hp-carousel-change", (e: Event) => {
        received.push((e as CustomEvent).detail.activeIndex);
      });

      for (let i = 0; i < n; i++) {
        c.activeIndex = i;
      }

      expect(received).toEqual(Array.from({ length: n }, (_, i) => i));
    }
  });

  // ── Property: keyboard Enter/Space on hp-carousel-previous triggers previous() ─
  test("Enter keydown on hp-carousel-previous triggers previous()", () => {
    document.body.innerHTML = `
      <hp-carousel>
        <hp-carousel-previous id="prev">Prev</hp-carousel-previous>
        <hp-carousel-next id="next">Next</hp-carousel-next>
      </hp-carousel>
    `;
    const c = document.querySelector("hp-carousel") as HpCarousel;
    const prev = document.querySelector("hp-carousel-previous")!;
    const n = 3;
    const fakeItems = Array.from({ length: n }, () => document.createElement("hp-carousel-item"));
    Object.defineProperty(c, "_items", { get: () => fakeItems, configurable: true });

    c.activeIndex = 2;
    prev.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    expect(c.activeIndex).toBe(1);
  });

  test("Space keydown on hp-carousel-previous triggers previous()", () => {
    document.body.innerHTML = `
      <hp-carousel>
        <hp-carousel-previous id="prev">Prev</hp-carousel-previous>
        <hp-carousel-next id="next">Next</hp-carousel-next>
      </hp-carousel>
    `;
    const c = document.querySelector("hp-carousel") as HpCarousel;
    const prev = document.querySelector("hp-carousel-previous")!;
    const n = 3;
    const fakeItems = Array.from({ length: n }, () => document.createElement("hp-carousel-item"));
    Object.defineProperty(c, "_items", { get: () => fakeItems, configurable: true });

    c.activeIndex = 2;
    prev.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
    expect(c.activeIndex).toBe(1);
  });

  test("Enter keydown on hp-carousel-next triggers next()", () => {
    document.body.innerHTML = `
      <hp-carousel>
        <hp-carousel-previous id="prev">Prev</hp-carousel-previous>
        <hp-carousel-next id="next">Next</hp-carousel-next>
      </hp-carousel>
    `;
    const c = document.querySelector("hp-carousel") as HpCarousel;
    const next = document.querySelector("hp-carousel-next")!;
    const n = 3;
    const fakeItems = Array.from({ length: n }, () => document.createElement("hp-carousel-item"));
    Object.defineProperty(c, "_items", { get: () => fakeItems, configurable: true });

    c.activeIndex = 0;
    next.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    expect(c.activeIndex).toBe(1);
  });

  test("Space keydown on hp-carousel-next triggers next()", () => {
    document.body.innerHTML = `
      <hp-carousel>
        <hp-carousel-previous id="prev">Prev</hp-carousel-previous>
        <hp-carousel-next id="next">Next</hp-carousel-next>
      </hp-carousel>
    `;
    const c = document.querySelector("hp-carousel") as HpCarousel;
    const next = document.querySelector("hp-carousel-next")!;
    const n = 3;
    const fakeItems = Array.from({ length: n }, () => document.createElement("hp-carousel-item"));
    Object.defineProperty(c, "_items", { get: () => fakeItems, configurable: true });

    c.activeIndex = 0;
    next.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
    expect(c.activeIndex).toBe(1);
  });

  // ── Property: disconnectedCallback clears _autoplayTimer ─────────────────
  // After disconnectedCallback runs, _autoplayTimer must be null.
  test("after disconnectedCallback, _autoplayTimer is null", () => {
    document.body.innerHTML = `<hp-carousel></hp-carousel>`;
    const c = document.querySelector("hp-carousel") as HpCarousel;
    // Start the timer manually
    c.start();
    expect((c as any)._autoplayTimer).not.toBeNull();
    // Disconnect triggers stop() which clears the timer
    c.remove();
    expect((c as any)._autoplayTimer).toBeNull();
  });
});
