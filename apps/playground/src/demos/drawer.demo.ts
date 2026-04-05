import { ComponentDemo } from "../types";
import "./drawer.css";

export const drawerDemo: ComponentDemo = {
  title: "Drawer primitive",
  description: "Slide-in panel from any viewport edge with backdrop and focus trap.",
  html: `
    <div class="demo-controls">
      <hp-drawer id="drawer-left">
        <hp-drawer-trigger>
          <button class="btn btn-primary">Left Drawer</button>
        </hp-drawer-trigger>
        <hp-drawer-backdrop class="drawer-backdrop"></hp-drawer-backdrop>
        <hp-drawer-content class="drawer-content" data-position="left">
          <div class="drawer-header">
            <h2>Navigation</h2>
            <hp-drawer-close>
              <button class="drawer-close-icon" aria-label="Close drawer">&times;</button>
            </hp-drawer-close>
          </div>
          <div class="drawer-body">
            <p>This is a left drawer. It slides in from the left edge of the viewport.</p>
            <p>Use the Escape key or click outside to close it.</p>
          </div>
          <div class="drawer-footer">
            <button class="btn" onclick="this.closest('hp-drawer').dispatchEvent(new CustomEvent('hp-hide', { bubbles: true, composed: true }))">Close</button>
          </div>
        </hp-drawer-content>
      </hp-drawer>

      <hp-drawer id="drawer-right" position="right">
        <hp-drawer-trigger>
          <button class="btn btn-primary">Right Drawer</button>
        </hp-drawer-trigger>
        <hp-drawer-backdrop class="drawer-backdrop"></hp-drawer-backdrop>
        <hp-drawer-content class="drawer-content" data-position="right">
          <div class="drawer-header">
            <h2>Settings</h2>
            <hp-drawer-close>
              <button class="drawer-close-icon" aria-label="Close drawer">&times;</button>
            </hp-drawer-close>
          </div>
          <div class="drawer-body">
            <p>This is a right drawer. It slides in from the right edge of the viewport.</p>
            <p>Use the Escape key or click outside to close it.</p>
          </div>
          <div class="drawer-footer">
            <button class="btn" onclick="this.closest('hp-drawer').dispatchEvent(new CustomEvent('hp-hide', { bubbles: true, composed: true }))">Close</button>
          </div>
        </hp-drawer-content>
      </hp-drawer>

      <hp-drawer id="drawer-bottom" position="bottom">
        <hp-drawer-trigger>
          <button class="btn btn-primary">Bottom Drawer</button>
        </hp-drawer-trigger>
        <hp-drawer-backdrop class="drawer-backdrop"></hp-drawer-backdrop>
        <hp-drawer-content class="drawer-content" data-position="bottom">
          <div class="drawer-header">
            <h2>Actions</h2>
            <hp-drawer-close>
              <button class="drawer-close-icon" aria-label="Close drawer">&times;</button>
            </hp-drawer-close>
          </div>
          <div class="drawer-body">
            <p>This is a bottom drawer. It slides up from the bottom of the viewport.</p>
            <p>Use the Escape key or click outside to close it.</p>
          </div>
          <div class="drawer-footer">
            <button class="btn" onclick="this.closest('hp-drawer').dispatchEvent(new CustomEvent('hp-hide', { bubbles: true, composed: true }))">Close</button>
          </div>
        </hp-drawer-content>
      </hp-drawer>
    </div>
  `,
  init: () => {
    // No additional init needed
  },
};
