import { HeadlessTooltip, HeadlessTooltipTrigger, HeadlessTooltipContent } from "./tooltip";

export { HeadlessTooltip, HeadlessTooltipTrigger, HeadlessTooltipContent };

// Autoregister Custom Elements if not already registered (only in browser environment)
if (typeof window !== "undefined") {
  const register = (tag: string, klass: any) => {
    if (!customElements.get(tag)) {
      customElements.define(tag, klass);
    }
  };

  register("hp-tooltip", HeadlessTooltip);
  register("hp-tooltip-trigger", HeadlessTooltipTrigger);
  register("hp-tooltip-content", HeadlessTooltipContent);
}
