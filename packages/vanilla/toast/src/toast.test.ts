import { describe, it, expect, vi } from "vitest";
import "@headless-primitives/toast"; // Import to register custom elements
import { HeadlessToast, HeadlessToastContainer } from "./toast";

describe("HeadlessToast", () => {
  it("renders with correct ARIA attributes", () => {
    const toast = document.createElement("hp-toast") as HeadlessToast;
    document.body.appendChild(toast);

    expect(toast.getAttribute("role")).toBe("alert");
    expect(toast.getAttribute("aria-live")).toBe("polite");
    expect(toast.getAttribute("aria-atomic")).toBe("true");
  });

  it("renders with correct data-hp attributes", () => {
    const toast = document.createElement("hp-toast") as HeadlessToast;
    document.body.appendChild(toast);

    expect(toast.getAttribute("data-hp-component")).toBe("toast");
    expect(toast.getAttribute("role")).toBe("alert");
    expect(toast.getAttribute("aria-live")).toBe("polite");
    expect(toast.getAttribute("aria-atomic")).toBe("true");
  });

  it("closes toast on close() call", async () => {
    const toast = document.createElement("hp-toast") as HeadlessToast;
    document.body.appendChild(toast);

    const dismissSpy = vi.fn();
    toast.addEventListener("hp-dismiss", dismissSpy);

    toast.close();

    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(dismissSpy).toHaveBeenCalled();
  });

  it("dispatchs hp-dismiss event on close", async () => {
    const toast = document.createElement("hp-toast") as HeadlessToast;
    document.body.appendChild(toast);

    const dismissSpy = vi.fn();
    toast.addEventListener("hp-dismiss", dismissSpy);

    toast.close();

    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(dismissSpy).toHaveBeenCalledWith(expect.any(CustomEvent));
  });
});

describe("HeadlessToastContainer", () => {
  it("renders as fixed positioned container", () => {
    const container = document.createElement("hp-toast-container") as HeadlessToastContainer;
    document.body.appendChild(container);

    expect(container.style.position).toBe("fixed");
    expect(container.getAttribute("data-hp-component")).toBe("toast-container");

    document.body.removeChild(container);
  });

  it("applies position from data-position attribute", () => {
    const container = document.createElement("hp-toast-container") as HeadlessToastContainer;
    container.setAttribute("data-position", "bottom-left");
    document.body.appendChild(container);

    expect(container.style.bottom).toMatch(/^0/);
    expect(container.style.left).toMatch(/^0/);

    document.body.removeChild(container);
  });

  it("addToast() creates and appends a new toast", () => {
    const container = document.createElement("hp-toast-container") as HeadlessToastContainer;
    document.body.appendChild(container);

    const toast = container.addToast("Test message");

    expect(toast).toBeDefined();
    expect(toast.textContent).toBe("Test message");
    expect(container.contains(toast)).toBe(true);

    document.body.removeChild(container);
  });

  it("addToast() respects options", () => {
    const container = document.createElement("hp-toast-container") as HeadlessToastContainer;
    document.body.appendChild(container);

    const toast = container.addToast("Test", {
      duration: 500,
      id: "test-toast-1",
    });

    expect(toast.id).toBe("test-toast-1");
    expect(toast.getAttribute("data-duration")).toBe("500");

    document.body.removeChild(container);
  });

  it("clearAll() closes all child toasts", async () => {
    const container = document.createElement("hp-toast-container") as HeadlessToastContainer;
    document.body.appendChild(container);

    container.addToast("Toast 1");
    container.addToast("Toast 2");

    const dismissSpy = vi.fn();
    const toasts = container.querySelectorAll("hp-toast");
    toasts.forEach((toast) => {
      toast.addEventListener("hp-dismiss", dismissSpy);
    });

    container.clearAll();

    await new Promise((resolve) => setTimeout(resolve, 250));
    expect(dismissSpy).toHaveBeenCalled();

    document.body.removeChild(container);
  });
});
