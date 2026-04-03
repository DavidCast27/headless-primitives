export interface RadioGroupOptions {
  value?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  orientation?: "horizontal" | "vertical";
}

export interface RadioOptions {
  value: string;
  disabled?: boolean;
}

export interface RadioGroupEvents {
  "hp-change": CustomEvent<{ value: string }>;
}
