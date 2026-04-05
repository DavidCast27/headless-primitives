import { describe, it, expect, beforeEach } from "vitest";
import "./index";
import type { HeadlessSeparator } from "./separator";

describe("hp-separator", () => {
  let sep: HeadlessSeparator;

  beforeEach(() => {
    document.body.innerHTML = '<hp-separator id="test-sep"></hp-separator>';
    sep = document.getElementById("test-sep") as HeadlessSeparator;
  });

  it('should have role="separator" by default', () => {
    expect(sep.getAttribute("role")).toBe("separator");
  });

  it('should have aria-orientation="horizontal" by default', () => {
    expect(sep.getAttribute("aria-orientation")).toBe("horizontal");
    expect(sep.orientation).toBe("horizontal");
  });

  it("should update aria-orientation when orientation attribute changes", () => {
    sep.setAttribute("orientation", "vertical");
    expect(sep.getAttribute("aria-orientation")).toBe("vertical");
    expect(sep.orientation).toBe("vertical");

    sep.setAttribute("orientation", "horizontal");
    expect(sep.getAttribute("aria-orientation")).toBe("horizontal");
    expect(sep.orientation).toBe("horizontal");
  });

  it("should fallback to horizontal for invalid orientation values", () => {
    // @ts-ignore
    sep.orientation = "invalid";
    expect(sep.getAttribute("aria-orientation")).toBe("horizontal");
  });

  it("should update orientation via property", () => {
    sep.orientation = "vertical";
    expect(sep.getAttribute("orientation")).toBe("vertical");
    expect(sep.getAttribute("aria-orientation")).toBe("vertical");
  });
});
