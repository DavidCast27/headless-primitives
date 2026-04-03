import "@headless-primitives/collapsible";
import "./collapsible.css";

export const collapsibleDemo = {
  title: "Collapsible",
  description:
    "A disclosure widget that enables content to be either collapsed (hidden) or expanded (visible).",
  html: `
<div class="demo-section">
  <h2>Basic Collapsible</h2>
  <hp-collapsible class="collapsible-demo">
    <hp-collapsible-trigger class="trigger">
      <span class="trigger-text">Toggle Content</span>
      <span class="trigger-icon">▼</span>
    </hp-collapsible-trigger>
    <hp-collapsible-content class="content">
      <p>This is the collapsible content that can be shown or hidden. It supports full keyboard accessibility and follows the WAI-ARIA disclosure pattern.</p>
    </hp-collapsible-content>
  </hp-collapsible>
</div>

<div class="demo-section">
  <h2>Initially Open Collapsible</h2>
  <hp-collapsible class="collapsible-demo" open>
    <hp-collapsible-trigger class="trigger">
      <span class="trigger-text">Already Open</span>
      <span class="trigger-icon">▲</span>
    </hp-collapsible-trigger>
    <hp-collapsible-content class="content">
      <p>This content starts in an open state. You can close it by clicking the trigger or pressing Enter/Space when focused.</p>
    </hp-collapsible-content>
  </hp-collapsible>
</div>

<div class="demo-section">
  <h2>Disabled Collapsible</h2>
  <hp-collapsible class="collapsible-demo" disabled>
    <hp-collapsible-trigger class="trigger">
      <span class="trigger-text">Disabled Toggle</span>
      <span class="trigger-icon">▼</span>
    </hp-collapsible-trigger>
    <hp-collapsible-content class="content">
      <p>This collapsible is disabled and cannot be interacted with.</p>
    </hp-collapsible-content>
  </hp-collapsible>
</div>

<div class="demo-section">
  <h2>Nested Collapsibles</h2>
  <hp-collapsible class="collapsible-demo">
    <hp-collapsible-trigger class="trigger">
      <span class="trigger-text">Outer Collapsible</span>
      <span class="trigger-icon">▼</span>
    </hp-collapsible-trigger>
    <hp-collapsible-content class="content">
      <p>This is the outer content.</p>
      
      <hp-collapsible class="collapsible-demo nested">
        <hp-collapsible-trigger class="trigger">
          <span class="trigger-text">Inner Collapsible</span>
          <span class="trigger-icon">▼</span>
        </hp-collapsible-trigger>
        <hp-collapsible-content class="content">
          <p>This is nested content that can be independently toggled.</p>
        </hp-collapsible-content>
      </hp-collapsible>
    </hp-collapsible-content>
  </hp-collapsible>
</div>

<div class="demo-section">
  <h2>Programmatic Control</h2>
  <hp-collapsible id="controlled-collapsible" class="collapsible-demo">
    <hp-collapsible-trigger class="trigger">
      <span class="trigger-text">Programmatically Controlled</span>
      <span class="trigger-icon">▼</span>
    </hp-collapsible-trigger>
    <hp-collapsible-content class="content">
      <p>This collapsible can be controlled programmatically using the buttons below.</p>
    </hp-collapsible-content>
  </hp-collapsible>
  
  <div class="controls">
    <button id="open-btn" class="control-btn">Open</button>
    <button id="close-btn" class="control-btn">Close</button>
    <button id="toggle-btn" class="control-btn">Toggle</button>
  </div>
</div>

<div class="demo-section">
  <h2>Event Monitoring</h2>
  <hp-collapsible id="monitored-collapsible" class="collapsible-demo">
    <hp-collapsible-trigger class="trigger">
      <span class="trigger-text">Event Monitor</span>
      <span class="trigger-icon">▼</span>
    </hp-collapsible-trigger>
    <hp-collapsible-content class="content">
      <p>Monitor the console for events when you interact with this collapsible.</p>
    </hp-collapsible-content>
  </hp-collapsible>
  
  <div class="event-log">
    <h4>Event Log:</h4>
    <div id="event-output">No events yet...</div>
  </div>
</div>
  `,
  setup: () => {
    // Programmatic control setup
    const controlledCollapsible = document.getElementById("controlled-collapsible") as any;
    const openBtn = document.getElementById("open-btn");
    const closeBtn = document.getElementById("close-btn");
    const toggleBtn = document.getElementById("toggle-btn");

    if (controlledCollapsible && openBtn && closeBtn && toggleBtn) {
      openBtn.addEventListener("click", () => {
        controlledCollapsible.open = true;
      });

      closeBtn.addEventListener("click", () => {
        controlledCollapsible.open = false;
      });

      toggleBtn.addEventListener("click", () => {
        controlledCollapsible.open = !controlledCollapsible.open;
      });
    }

    // Event monitoring setup
    const monitoredCollapsible = document.getElementById("monitored-collapsible");
    const eventOutput = document.getElementById("event-output");

    if (monitoredCollapsible && eventOutput) {
      const events: string[] = [];

      monitoredCollapsible.addEventListener("hp-open", (e: any) => {
        events.push(`hp-open: ${JSON.stringify(e.detail)}`);
        eventOutput.textContent = events.slice(-5).join("\n");
      });

      monitoredCollapsible.addEventListener("hp-close", (e: any) => {
        events.push(`hp-close: ${JSON.stringify(e.detail)}`);
        eventOutput.textContent = events.slice(-5).join("\n");
      });

      monitoredCollapsible.addEventListener("hp-change", (e: any) => {
        events.push(`hp-change: ${JSON.stringify(e.detail)}`);
        eventOutput.textContent = events.slice(-5).join("\n");
      });
    }

    // Update trigger icons based on state
    document.querySelectorAll("hp-collapsible").forEach((collapsible: any) => {
      const updateIcon = () => {
        const trigger = collapsible.querySelector("hp-collapsible-trigger");
        const icon = trigger?.querySelector(".trigger-icon");
        if (icon) {
          icon.textContent = collapsible.open ? "▲" : "▼";
        }
      };

      // Initial update
      updateIcon();

      // Update on state changes
      collapsible.addEventListener("hp-change", updateIcon);
    });
  },
};
