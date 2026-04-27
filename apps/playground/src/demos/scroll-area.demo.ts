import "@headless-primitives/scroll-area";
import "../styles/scroll-area.css";

export const scrollAreaDemo = {
  title: "Scroll Area",
  description:
    "A scrollable container with custom, accessible scrollbars that replace native browser scrollbars.",
  html: `
<div class="hp-demo-section">
  <h2>Vertical Scroll</h2>
  <hp-scroll-area class="scroll-box" orientation="vertical">
    <hp-scroll-area-viewport>
      <hp-scroll-area-content>
        <p>Line 1 — Scroll down to see more content</p>
        <p>Line 2</p>
        <p>Line 3</p>
        <p>Line 4</p>
        <p>Line 5</p>
        <p>Line 6</p>
        <p>Line 7</p>
        <p>Line 8</p>
        <p>Line 9</p>
        <p>Line 10</p>
        <p>Line 11</p>
        <p>Line 12</p>
        <p>Line 13</p>
        <p>Line 14</p>
        <p>Line 15 — End of content</p>
      </hp-scroll-area-content>
    </hp-scroll-area-viewport>
    <hp-scroll-area-scrollbar orientation="vertical">
      <hp-scroll-area-thumb></hp-scroll-area-thumb>
    </hp-scroll-area-scrollbar>
  </hp-scroll-area>
</div>

<div class="hp-demo-section">
  <h2>Horizontal Scroll</h2>
  <hp-scroll-area class="scroll-box-h" orientation="horizontal">
    <hp-scroll-area-viewport>
      <hp-scroll-area-content class="h-content">
        <span>Item 1</span>
        <span>Item 2</span>
        <span>Item 3</span>
        <span>Item 4</span>
        <span>Item 5</span>
        <span>Item 6</span>
        <span>Item 7</span>
        <span>Item 8</span>
        <span>Item 9</span>
        <span>Item 10</span>
      </hp-scroll-area-content>
    </hp-scroll-area-viewport>
    <hp-scroll-area-scrollbar orientation="horizontal">
      <hp-scroll-area-thumb></hp-scroll-area-thumb>
    </hp-scroll-area-scrollbar>
  </hp-scroll-area>
</div>

<div class="hp-demo-section">
  <h2>Both Scrollbars</h2>
  <hp-scroll-area class="scroll-box" orientation="both">
    <hp-scroll-area-viewport>
      <hp-scroll-area-content class="both-content">
        <p>This content is wider and taller than the container.</p>
        <p>Scroll in any direction to explore the content area.</p>
        <p>Both vertical and horizontal scrollbars are active.</p>
        <p>Line 4 — with some extra wide text to force horizontal overflow in this demo area</p>
        <p>Line 5</p>
        <p>Line 6</p>
        <p>Line 7</p>
        <p>Line 8</p>
        <p>Line 9</p>
        <p>Line 10 — End</p>
      </hp-scroll-area-content>
    </hp-scroll-area-viewport>
    <hp-scroll-area-scrollbar orientation="vertical">
      <hp-scroll-area-thumb></hp-scroll-area-thumb>
    </hp-scroll-area-scrollbar>
    <hp-scroll-area-scrollbar orientation="horizontal">
      <hp-scroll-area-thumb></hp-scroll-area-thumb>
    </hp-scroll-area-scrollbar>
    <hp-scroll-area-corner></hp-scroll-area-corner>
  </hp-scroll-area>
</div>
  `,
  setup: () => {
    // Trigger initial scrollbar sync after layout
    requestAnimationFrame(() => {
      document.querySelectorAll("hp-scroll-area-viewport").forEach((vp: any) => {
        if (typeof vp.syncScrollbars === "function") vp.syncScrollbars();
      });
    });
  },
};
