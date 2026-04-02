import { HeadlessSwitch } from "./switch";

export * from "./switch";
export * from "./types";

if (!customElements.get("hp-switch")) {
  customElements.define("hp-switch", HeadlessSwitch);
}
