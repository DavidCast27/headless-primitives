import { HeadlessPopover, HeadlessPopoverTrigger, HeadlessPopoverContent } from "./popover";

export { HeadlessPopover, HeadlessPopoverTrigger, HeadlessPopoverContent };

// Autoregister Custom Elements if not already registered (only in browser environment)
if (typeof window !== "undefined") {
  const register = (tag: string, klass: any) => {
    if (!customElements.get(tag)) {
      customElements.define(tag, klass);
    }
  };

  register("hp-popover", HeadlessPopover);
  register("hp-popover-trigger", HeadlessPopoverTrigger);
  register("hp-popover-content", HeadlessPopoverContent);
}
