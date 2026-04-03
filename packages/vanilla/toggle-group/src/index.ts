import { HeadlessToggleGroup, HeadlessToggle } from "./toggle-group";
export type { ToggleGroupOptions, ToggleOptions, ToggleGroupEvents } from "./types";

// Registrar los elementos si no existen (importante para evitar errores en SSR/HMR)
if (typeof window !== "undefined") {
  if (!customElements.get("hp-toggle-group")) {
    customElements.define("hp-toggle-group", HeadlessToggleGroup);
  }
  if (!customElements.get("hp-toggle")) {
    customElements.define("hp-toggle", HeadlessToggle);
  }
}
