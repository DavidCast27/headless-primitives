/**
 * Drawer component event and configuration types
 */

export type DrawerPosition = "left" | "right" | "top" | "bottom";

export interface DrawerShowEvent {
  // Dispatched via "hp-show" when the drawer opens
}

export interface DrawerHideEvent {
  // Dispatched via "hp-hide" when the drawer closes
}

export interface DrawerOptions {
  /** Position of the drawer panel on screen */
  position?: DrawerPosition;
}
