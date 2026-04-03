/**
 * Accordion component event types
 */

export interface AccordionChangeEvent {
  open: boolean;
  value?: string;
}

export interface AccordionOpenEvent {
  value: string;
}

export interface AccordionCloseEvent {
  value: string;
}

/**
 * Accordion item configuration
 */
export interface AccordionItemConfig {
  value?: string;
  disabled?: boolean;
  open?: boolean;
}
