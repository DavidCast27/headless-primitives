import { HeadlessToast, HeadlessToastContainer, type ToastOptions } from "./toast";

export { HeadlessToast, HeadlessToastContainer, type ToastOptions };

// Register custom elements (only in browser environment)
if (typeof window !== "undefined") {
  customElements.define("hp-toast", HeadlessToast);
  customElements.define("hp-toast-container", HeadlessToastContainer);
}
