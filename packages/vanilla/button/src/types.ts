export interface HeadlessButtonEvents {
  /**
   * Disparado cuando el estado de `aria-pressed` cambia.
   */
  'hp-change': CustomEvent<{ pressed: boolean }>;
}
