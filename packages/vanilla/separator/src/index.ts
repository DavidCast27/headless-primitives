import { HeadlessSeparator } from "./separator";

export * from "./separator";
export * from "./types";

if (!customElements.get("hp-separator")) {
  customElements.define("hp-separator", HeadlessSeparator);
}
