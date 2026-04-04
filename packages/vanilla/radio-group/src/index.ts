import { HeadlessRadioGroup, HeadlessRadio } from "./radio-group";

if (typeof window !== "undefined") {
  if (!customElements.get("hp-radio-group")) {
    customElements.define("hp-radio-group", HeadlessRadioGroup);
  }

  if (!customElements.get("hp-radio")) {
    customElements.define("hp-radio", HeadlessRadio);
  }
}

export { HeadlessRadioGroup, HeadlessRadio };
export * from "./types";
