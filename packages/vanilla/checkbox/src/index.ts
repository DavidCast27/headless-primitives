import { HeadlessCheckbox } from "./checkbox";

if (!customElements.get("hp-checkbox")) {
  customElements.define("hp-checkbox", HeadlessCheckbox);
}

export { HeadlessCheckbox };
export * from "./types";
