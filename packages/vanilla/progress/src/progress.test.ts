import { describe, it, expect, beforeEach } from "vitest";
import "./index";
import type { HeadlessProgress } from "./progress";

describe("hp-progress", () => {
  let progress: HeadlessProgress;

  beforeEach(() => {
    document.body.innerHTML = '<hp-progress id="test-progress"></hp-progress>';
    progress = document.getElementById("test-progress") as HeadlessProgress;
  });

  it('should have role="progressbar" and default ARIA attributes', () => {
    expect(progress.getAttribute("role")).toBe("progressbar");
    expect(progress.getAttribute("aria-valuemin")).toBe("0");
    expect(progress.getAttribute("aria-valuemax")).toBe("100");
    expect(progress.hasAttribute("aria-valuenow")).toBe(false);
  });

  it("should update aria-valuenow when value is set", () => {
    progress.value = 50;
    expect(progress.getAttribute("aria-valuenow")).toBe("50");
    expect(progress.style.getPropertyValue("--hp-progress-percentage")).toBe("50%");
  });

  it("should handle custom min and max", () => {
    progress.min = 50;
    progress.max = 150;
    progress.value = 100;

    expect(progress.getAttribute("aria-valuemin")).toBe("50");
    expect(progress.getAttribute("aria-valuemax")).toBe("150");
    expect(progress.getAttribute("aria-valuenow")).toBe("100");
    // (100 - 50) / (150 - 50) = 50/100 = 50%
    expect(progress.style.getPropertyValue("--hp-progress-percentage")).toBe("50%");
  });

  it("should clamp value within min and max for percentage calculation", () => {
    progress.value = 200;
    expect(progress.percentage).toBe(100);

    progress.value = -10;
    expect(progress.percentage).toBe(0);
  });

  it("should handle indeterminate state (null value)", () => {
    progress.value = 50;
    expect(progress.hasAttribute("aria-valuenow")).toBe(true);

    progress.value = null;
    expect(progress.hasAttribute("aria-valuenow")).toBe(false);
    expect(progress.style.getPropertyValue("--hp-progress-percentage")).toBe("");
  });
});
