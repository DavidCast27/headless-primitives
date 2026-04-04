/**
 * SSR-safe replacement for Lit's @customElement decorator.
 * Wraps customElements.define with a window guard and duplicate check,
 * so components can be safely imported in SSR environments (VitePress, Node).
 *
 * Usage:
 *   @customElement('hp-tabs')
 *   export class Tabs extends HeadlessElement { ... }
 */
export function customElement(tagName: string) {
  return function (constructor: CustomElementConstructor) {
    if (typeof window !== "undefined") {
      if (!customElements.get(tagName)) {
        customElements.define(tagName, constructor);
      }
    }
  };
}
