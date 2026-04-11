/**
 * Tree View component event types
 */

export interface TreeSelectEvent {
  value: string;
  item: HTMLElement;
}

export interface TreeExpandEvent {
  value: string;
  item: HTMLElement;
}

export interface TreeCollapseEvent {
  value: string;
  item: HTMLElement;
}
