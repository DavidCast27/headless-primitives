import { HeadlessLabel } from "./label";

export * from "./label";
export * from "./types";

if (typeof window !== "undefined" && !customElements.get("hp-label")) {
  customElements.define("hp-label", HeadlessLabel);
}
