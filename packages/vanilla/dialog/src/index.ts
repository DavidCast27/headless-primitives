import {
  HeadlessDialog,
  HeadlessDialogTrigger,
  HeadlessDialogContent,
  HeadlessDialogBackdrop,
} from "./dialog";

export { HeadlessDialog, HeadlessDialogTrigger, HeadlessDialogContent, HeadlessDialogBackdrop };

// Autoregister Custom Elements if not already registered (only in browser environment)
if (typeof window !== "undefined") {
  const register = (tag: string, klass: any) => {
    if (!customElements.get(tag)) {
      customElements.define(tag, klass);
    }
  };

  register("hp-dialog", HeadlessDialog);
  register("hp-dialog-trigger", HeadlessDialogTrigger);
  register("hp-dialog-content", HeadlessDialogContent);
  register("hp-dialog-backdrop", HeadlessDialogBackdrop);
}
