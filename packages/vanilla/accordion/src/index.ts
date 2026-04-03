import {
  HeadlessAccordion,
  HeadlessAccordionItem,
  HeadlessAccordionTrigger,
  HeadlessAccordionContent,
} from "./accordion";

export {
  HeadlessAccordion,
  HeadlessAccordionItem,
  HeadlessAccordionTrigger,
  HeadlessAccordionContent,
} from "./accordion";

export type {
  AccordionChangeEvent,
  AccordionOpenEvent,
  AccordionCloseEvent,
  AccordionItemConfig,
} from "./types";

// Registrar los elementos si no existen (importante para evitar errores en SSR/HMR)
if (typeof window !== "undefined") {
  if (!customElements.get("hp-accordion")) {
    customElements.define("hp-accordion", HeadlessAccordion);
  }
  if (!customElements.get("hp-accordion-item")) {
    customElements.define("hp-accordion-item", HeadlessAccordionItem);
  }
  if (!customElements.get("hp-accordion-trigger")) {
    customElements.define("hp-accordion-trigger", HeadlessAccordionTrigger);
  }
  if (!customElements.get("hp-accordion-content")) {
    customElements.define("hp-accordion-content", HeadlessAccordionContent);
  }
}
