/** Orientación del toolbar */
export type ToolbarOrientation = "horizontal" | "vertical";

/** Detalle del evento hp-focus-change */
export interface ToolbarFocusChangeEventDetail {
  index: number;
  item: HTMLElement;
}
