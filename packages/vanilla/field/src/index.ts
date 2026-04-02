import {
  HeadlessField,
  HeadlessFieldLabel,
  HeadlessFieldDescription,
  HeadlessFieldError,
  HeadlessFieldControl,
} from "./field";

export {
  HeadlessField,
  HeadlessFieldLabel,
  HeadlessFieldDescription,
  HeadlessFieldError,
  HeadlessFieldControl,
};

// Autoregister Custom Elements if not already registered
const register = (tag: string, klass: any) => {
  if (!customElements.get(tag)) {
    customElements.define(tag, klass);
  }
};

register("hp-field", HeadlessField);
register("hp-field-label", HeadlessFieldLabel);
register("hp-field-description", HeadlessFieldDescription);
register("hp-field-error", HeadlessFieldError);
register("hp-field-control", HeadlessFieldControl);
