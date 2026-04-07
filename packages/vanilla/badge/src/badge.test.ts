import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./index"; // triggers @customElement decorator registration
import type { HeadlessBadge } from "./badge";

describe("HpBadge", () => {
  let el: HeadlessBadge;

  beforeEach(() => {
    el = document.createElement("hp-badge") as HeadlessBadge;
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
  });

  it('sets data-hp-component="badge"', () => {
    expect(el.getAttribute("data-hp-component")).toBe("badge");
  });

  it('sets data-variant="default" by default', () => {
    expect(el.getAttribute("data-variant")).toBe("default");
    expect(el.variant).toBe("default");
  });

  it('sets data-size="md" by default', () => {
    expect(el.getAttribute("data-size")).toBe("md");
    expect(el.size).toBe("md");
  });

  it("reflects variant attribute to data-variant", () => {
    el.setAttribute("variant", "success");
    expect(el.getAttribute("data-variant")).toBe("success");
    expect(el.variant).toBe("success");
  });

  it("reflects all valid variants", () => {
    const variants = ["default", "success", "warning", "danger", "info"] as const;
    for (const v of variants) {
      el.setAttribute("variant", v);
      expect(el.getAttribute("data-variant")).toBe(v);
    }
  });

  it("falls back to default for invalid variant", () => {
    // @ts-ignore
    el.variant = "invalid";
    expect(el.variant).toBe("default");
    expect(el.getAttribute("data-variant")).toBe("default");
  });

  it("reflects size attribute to data-size", () => {
    el.setAttribute("size", "lg");
    expect(el.getAttribute("data-size")).toBe("lg");
    expect(el.size).toBe("lg");
  });

  it("reflects all valid sizes", () => {
    const sizes = ["sm", "md", "lg"] as const;
    for (const s of sizes) {
      el.setAttribute("size", s);
      expect(el.getAttribute("data-size")).toBe(s);
    }
  });

  it("falls back to md for invalid size", () => {
    // @ts-ignore
    el.size = "invalid";
    expect(el.size).toBe("md");
    expect(el.getAttribute("data-size")).toBe("md");
  });

  it("syncs variant and size from initial HTML attributes", () => {
    const el2 = document.createElement("hp-badge") as HeadlessBadge;
    el2.setAttribute("variant", "danger");
    el2.setAttribute("size", "sm");
    document.body.appendChild(el2);

    expect(el2.getAttribute("data-variant")).toBe("danger");
    expect(el2.getAttribute("data-size")).toBe("sm");

    el2.remove();
  });
});
