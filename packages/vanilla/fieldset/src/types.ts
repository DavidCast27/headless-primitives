/** Detalle del evento hp-disable / hp-enable */
export interface FieldsetDisableEventDetail {
  disabled: boolean;
}

/** Selector de controles nativos deshabilitables */
export const NATIVE_CONTROL_SELECTOR = "input, select, textarea, button";

/** Selector de controles ARIA deshabilitables */
export const ARIA_CONTROL_SELECTOR =
  "[role='checkbox'], [role='switch'], [role='combobox'], [role='radio'], [role='spinbutton'], [role='slider']";
