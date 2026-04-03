export interface ToggleGroupOptions {
  value?: string[];
  disabled?: boolean;
  required?: boolean;
  orientation?: "horizontal" | "vertical";
  type?: "single" | "multiple";
}

export interface ToggleOptions {
  value: string;
  disabled?: boolean;
  pressed?: boolean;
}

export interface ToggleGroupEvents {
  "hp-change": CustomEvent<{ value: string[] }>;
}
