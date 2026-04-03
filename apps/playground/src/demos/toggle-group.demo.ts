import { ComponentDemo } from "../types";
import "./toggle-group.css";

export const toggleGroupDemo: ComponentDemo = {
  title: "Toggle Group",
  description:
    "A set of two-state buttons that can be toggled on or off, grouped together in a single component.",
  html: `
    <div class="toggle-group-demo">
      <h3>Single Toggle Group</h3>
      <hp-toggle-group type="single" value="bold" class="demo-group">
        <hp-toggle value="bold" class="demo-toggle">
          <span>B</span>
        </hp-toggle>
        <hp-toggle value="italic" class="demo-toggle">
          <span>I</span>
        </hp-toggle>
        <hp-toggle value="underline" class="demo-toggle">
          <span>U</span>
        </hp-toggle>
      </hp-toggle-group>

      <h3>Multiple Toggle Group</h3>
      <hp-toggle-group type="multiple" value="left,right" class="demo-group">
        <hp-toggle value="left" class="demo-toggle">
          <span>←</span>
        </hp-toggle>
        <hp-toggle value="center" class="demo-toggle">
          <span>↔</span>
        </hp-toggle>
        <hp-toggle value="right" class="demo-toggle">
          <span>→</span>
        </hp-toggle>
      </hp-toggle-group>

      <h3>Vertical Orientation</h3>
      <hp-toggle-group type="multiple" orientation="vertical" value="top" class="demo-group vertical">
        <hp-toggle value="top" class="demo-toggle">
          <span>↑</span>
        </hp-toggle>
        <hp-toggle value="middle" class="demo-toggle">
          <span>↕</span>
        </hp-toggle>
        <hp-toggle value="bottom" class="demo-toggle">
          <span>↓</span>
        </hp-toggle>
      </hp-toggle-group>

      <h3>Disabled State</h3>
      <hp-toggle-group type="single" disabled value="option1" class="demo-group">
        <hp-toggle value="option1" class="demo-toggle">
          <span>Option 1</span>
        </hp-toggle>
        <hp-toggle value="option2" class="demo-toggle">
          <span>Option 2</span>
        </hp-toggle>
      </hp-toggle-group>
    </div>
  `,
  init: () => {
    // No initialization needed - the component handles state internally
  },
};
