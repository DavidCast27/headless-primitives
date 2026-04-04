import { HeadlessSeparator } from "./separator";

export * from "./separator";
export * from "./types";

if (typeof window !== "undefined" && !customElements.get("hp-separator")) {
  customElements.define("hp-separator", HeadlessSeparator);
}
