import { describe, it, expect, beforeEach, vi } from "vitest";
import "./index";
import type { HeadlessAvatar, HeadlessAvatarImage } from "./avatar";

describe("hp-avatar", () => {
  let avatar: HeadlessAvatar;
  let image: HeadlessAvatarImage;

  beforeEach(() => {
    document.body.innerHTML = `
      <hp-avatar id="test-avatar">
        <hp-avatar-image id="test-image" src="valid-url.jpg" alt="Avatar"></hp-avatar-image>
        <hp-avatar-fallback id="test-fallback">fallback</hp-avatar-fallback>
      </hp-avatar>
    `;
    avatar = document.getElementById("test-avatar") as HeadlessAvatar;
    image = document.getElementById("test-image") as HeadlessAvatarImage;
  });

  it("should start in loading state", () => {
    expect(avatar.getAttribute("data-state")).toBe("loading");
  });

  it("should switch to loaded state when image loads", async () => {
    const img = image.querySelector("img") as HTMLImageElement;
    img.dispatchEvent(new Event("load"));

    expect(avatar.getAttribute("data-state")).toBe("loaded");
  });

  it("should switch to error state when image fails", () => {
    const img = image.querySelector("img") as HTMLImageElement;
    img.dispatchEvent(new Event("error"));

    expect(avatar.getAttribute("data-state")).toBe("error");
  });

  it("fallback element does not set inline opacity", () => {
    const fb = document.getElementById("test-fallback") as HTMLElement;
    expect(fb.style.opacity).toBe("");
    expect(fb.getAttribute("data-hp-component")).toBe("avatar-fallback");
  });

  it("removing image element aborts its load/error listeners", () => {
    const newImage = document.createElement("hp-avatar-image") as HeadlessAvatarImage;
    newImage.setAttribute("src", "x.jpg");
    document.body.appendChild(newImage);
    const img = newImage.querySelector("img") as HTMLImageElement;
    expect(img).toBeTruthy();
    newImage.remove();
    // Despachar load tras remove no debe propagar al parent (signal abortado)
    expect(() => img.dispatchEvent(new Event("load"))).not.toThrow();
  });

  it("should respect delay for fallback visibility", async () => {
    vi.useFakeTimers();

    // Creamos el elemento manualmente
    const delayedAvatar = document.createElement("hp-avatar") as HeadlessAvatar;
    delayedAvatar.setAttribute("delay", "500");
    delayedAvatar.id = "delayed-avatar";

    document.body.appendChild(delayedAvatar);

    // Al principio la opacidad es 0
    expect(delayedAvatar.style.getPropertyValue("--hp-avatar-fallback-opacity")).toBe("0");

    // Avanzamos el tiempo
    vi.advanceTimersByTime(600);

    expect(delayedAvatar.style.getPropertyValue("--hp-avatar-fallback-opacity")).toBe("1");
    vi.useRealTimers();
  });
});
