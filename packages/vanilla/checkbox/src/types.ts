export type CheckedState = boolean | "mixed";

export interface CheckboxOptions {
  checked?: CheckedState;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
}

export interface CheckboxEvents {
  "hp-change": CustomEvent<{ checked: CheckedState }>;
}
