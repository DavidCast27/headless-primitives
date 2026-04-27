/**
 * Utilities shared by overlay components (popover, dropdown-menu, context-menu, select).
 * Centralizes scroll-parent detection and a rAF-driven position recompute loop.
 */

/**
 * Walks up the DOM ancestors of `el` and returns every scrollable parent
 * plus `window`. Useful for attaching `scroll` listeners that should
 * reposition an overlay anchored to a trigger.
 */
export function getScrollParents(el: HTMLElement): EventTarget[] {
  const parents: EventTarget[] = [];
  let node: HTMLElement | null = el.parentElement;
  while (node) {
    const { overflow, overflowY, overflowX } = getComputedStyle(node);
    if (/auto|scroll|overlay/.test(overflow + overflowY + overflowX)) parents.push(node);
    node = node.parentElement;
  }
  parents.push(window);
  return parents;
}

/**
 * Repeatedly invokes `compute` on every animation frame until `signal`
 * is aborted. Returns no handle: cancellation is driven entirely by the
 * AbortSignal so callers can plug it into HeadlessElement's per-open
 * AbortController and have positioning stop automatically when the
 * overlay closes or the host disconnects.
 */
export function startPositionLoop(compute: () => void, signal: AbortSignal): void {
  if (signal.aborted) return;
  let rafId = 0;
  const tick = () => {
    if (signal.aborted) return;
    compute();
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
  signal.addEventListener("abort", () => cancelAnimationFrame(rafId), { once: true });
}
