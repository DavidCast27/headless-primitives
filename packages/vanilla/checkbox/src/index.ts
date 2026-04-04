import { HeadlessCheckbox } from "./checkbox";

if (typeof window !== "undefined" && !customElements.get("hp-checkbox")) {
  customElements.define("hp-checkbox", HeadlessCheckbox);
}

export { HeadlessCheckbox };
export * from "./types";
