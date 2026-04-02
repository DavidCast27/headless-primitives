import { HeadlessAvatar, HeadlessAvatarImage, HeadlessAvatarFallback } from "./avatar";

export * from "./avatar";
export * from "./types";

if (!customElements.get("hp-avatar")) {
  customElements.define("hp-avatar", HeadlessAvatar);
}

if (!customElements.get("hp-avatar-image")) {
  customElements.define("hp-avatar-image", HeadlessAvatarImage);
}

if (!customElements.get("hp-avatar-fallback")) {
  customElements.define("hp-avatar-fallback", HeadlessAvatarFallback);
}
