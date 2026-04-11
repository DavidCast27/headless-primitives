export type CarouselOrientation = "horizontal" | "vertical";

export interface CarouselOptions {
  orientation?: CarouselOrientation;
  loop?: boolean;
  autoplay?: boolean;
  interval?: number;
}
