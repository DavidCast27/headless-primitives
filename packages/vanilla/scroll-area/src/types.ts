export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";

export interface ScrollAreaScrollEvent {
  scrollTop: number;
  scrollLeft: number;
  scrollHeight: number;
  scrollWidth: number;
  clientHeight: number;
  clientWidth: number;
}

export interface ScrollAreaEvents {
  "hp-scroll": CustomEvent<ScrollAreaScrollEvent>;
}
