import { HeadlessSwitch } from "./switch";

export * from "./switch";
export * from "./types";

if (typeof window !== "undefined" && !customElements.get("hp-switch")) {
  customElements.define("hp-switch", HeadlessSwitch);
}
