import "@headless-primitives/tabs";
import "../styles/tabs.css";

export const tabsDemo = {
  title: "Tabs",
  description: "An accessible tabs component with keyboard navigation and ARIA support.",
  html: `
<div class="hp-demo-section">
  <h2>Basic Tabs</h2>
  <hp-tabs value="profile">
    <hp-tab-list class="tab-list">
      <hp-tab value="profile" class="tab-trigger">Profile</hp-tab>
      <hp-tab value="settings" class="tab-trigger">Settings</hp-tab>
      <hp-tab value="notifications" class="tab-trigger">Notifications</hp-tab>
    </hp-tab-list>

    <hp-tab-panel value="profile" class="tab-panel">
      <h3>Profile</h3>
      <p>Manage your profile information and personal details.</p>
      <ul>
        <li>Update your name and email</li>
        <li>Change your profile picture</li>
        <li>Set your bio and interests</li>
      </ul>
    </hp-tab-panel>

    <hp-tab-panel value="settings" class="tab-panel">
      <h3>Settings</h3>
      <p>Configure your application preferences and settings.</p>
      <ul>
        <li>Theme preferences</li>
        <li>Language and region</li>
        <li>Privacy and security</li>
      </ul>
    </hp-tab-panel>

    <hp-tab-panel value="notifications" class="tab-panel">
      <h3>Notifications</h3>
      <p>Control how and when you receive notifications.</p>
      <ul>
        <li>Email notifications</li>
        <li>Push notifications</li>
        <li>Notification frequency</li>
      </ul>
    </hp-tab-panel>
  </hp-tabs>
</div>

<div class="hp-demo-section">
  <h2>With Disabled Tab</h2>
  <hp-tabs value="active-1">
    <hp-tab-list class="tab-list">
      <hp-tab value="active-1" class="tab-trigger">Active</hp-tab>
      <hp-tab value="disabled-1" class="tab-trigger" disabled>Disabled</hp-tab>
      <hp-tab value="active-2" class="tab-trigger">Another</hp-tab>
    </hp-tab-list>

    <hp-tab-panel value="active-1" class="tab-panel">
      <p>This tab is active and accessible.</p>
    </hp-tab-panel>

    <hp-tab-panel value="disabled-1" class="tab-panel">
      <p>This panel belongs to a disabled tab.</p>
    </hp-tab-panel>

    <hp-tab-panel value="active-2" class="tab-panel">
      <p>Another active tab panel.</p>
    </hp-tab-panel>
  </hp-tabs>
</div>

<div class="hp-demo-section">
  <h2>Pure Headless (solo base.css)</h2>
  <p style="font-size:0.85rem;color:var(--hp-text-secondary);margin-bottom:1rem;">
    Sin clases de demo. Solo <code>base.css</code> controla la visibilidad de los paneles.
  </p>
  <hp-tabs value="a">
    <hp-tab-list>
      <hp-tab value="a">Tab A</hp-tab>
      <hp-tab value="b">Tab B</hp-tab>
      <hp-tab value="c">Tab C</hp-tab>
    </hp-tab-list>
    <hp-tab-panel value="a"><p>Panel A — visible por base.css vía [data-state="selected"]</p></hp-tab-panel>
    <hp-tab-panel value="b"><p>Panel B</p></hp-tab-panel>
    <hp-tab-panel value="c"><p>Panel C</p></hp-tab-panel>
  </hp-tabs>
</div>
`,
};
