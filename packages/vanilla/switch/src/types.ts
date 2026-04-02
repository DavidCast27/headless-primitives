export interface SwitchOptions {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
}

export interface SwitchEvents {
  "hp-change": CustomEvent<{ checked: boolean }>;
}
