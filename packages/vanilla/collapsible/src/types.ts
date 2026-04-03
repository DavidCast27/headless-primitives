export interface CollapsibleEvents {
  "hp-open": CustomEvent<{ value: boolean }>;
  "hp-close": CustomEvent<{ value: boolean }>;
  "hp-change": CustomEvent<{ open: boolean }>;
}

export type CollapsibleOpenEvent = CollapsibleEvents["hp-open"];
export type CollapsibleCloseEvent = CollapsibleEvents["hp-close"];
export type CollapsibleChangeEvent = CollapsibleEvents["hp-change"];
