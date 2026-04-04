/**
 * Dialog component event and configuration types
 */

export interface DialogOpenEvent {
  // Dispatched via "hp-open" when the dialog opens
}

export interface DialogCloseEvent {
  // Dispatched via "hp-close" when the dialog closes
}

export interface DialogOptions {
  /** When true (data-alert), ESC and backdrop click do not close the dialog */
  alert?: boolean;
}
