/**
 * Toast component types
 */

export interface ToastOptions {
  /** Milliseconds before auto-dismiss. 0 = manual dismiss only. Default: 3000 */
  duration?: number;
  /** Optional unique ID for the toast element */
  id?: string;
}

export interface ToastDismissEvent {
  // Dispatched via "hp-dismiss" when the toast is closed and removed from DOM
}
