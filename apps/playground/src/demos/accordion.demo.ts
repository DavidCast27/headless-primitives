import "@headless-primitives/accordion";
import "./accordion.css";

export const accordionDemo = {
  title: "Accordion",
  description:
    "A vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content.",
  html: `
<div class="demo-section">
  <h2>Basic Accordion</h2>
  <hp-accordion class="accordion-demo">
    <hp-accordion-item class="accordion-item" value="item-1">
      <hp-accordion-trigger class="accordion-trigger">
        <span class="trigger-text">What is Headless Primitives?</span>
        <span class="trigger-icon">▼</span>
      </hp-accordion-trigger>
      <hp-accordion-content class="accordion-content">
        <p>Headless Primitives is a library of accessible, unstyled UI components that provide the behavior and accessibility foundation for building custom user interfaces.</p>
      </hp-accordion-content>
    </hp-accordion-item>
    
    <hp-accordion-item class="accordion-item" value="item-2">
      <hp-accordion-trigger class="accordion-trigger">
        <span class="trigger-text">How does it work?</span>
        <span class="trigger-icon">▼</span>
      </hp-accordion-trigger>
      <hp-accordion-content class="accordion-content">
        <p>Each primitive is a custom element that implements WAI-ARIA patterns, handles keyboard interactions, and manages accessibility attributes automatically. You provide the styling.</p>
      </hp-accordion-content>
    </hp-accordion-item>
    
    <hp-accordion-item class="accordion-item" value="item-3">
      <hp-accordion-trigger class="accordion-trigger">
        <span class="trigger-text">Why choose headless?</span>
        <span class="trigger-icon">▼</span>
      </hp-accordion-trigger>
      <hp-accordion-content class="accordion-content">
        <p>Headless components give you complete control over the visual design while ensuring accessibility and proper behavior out of the box. No fighting with component library styles.</p>
      </hp-accordion-content>
    </hp-accordion-item>
  </hp-accordion>
</div>

<div class="demo-section">
  <h2>Single Panel Accordion</h2>
  <hp-accordion class="accordion-demo" single-panel>
    <hp-accordion-item class="accordion-item" value="single-1" open>
      <hp-accordion-trigger class="accordion-trigger">
        <span class="trigger-text">Installation</span>
        <span class="trigger-icon">▲</span>
      </hp-accordion-trigger>
      <hp-accordion-content class="accordion-content">
        <p>Install any primitive with your package manager (npm/pnpm/Yarn/Bun), e.g.: <code>npm i @headless-primitives/button</code></p>
      </hp-accordion-content>
    </hp-accordion-item>
    
    <hp-accordion-item class="accordion-item" value="single-2">
      <hp-accordion-trigger class="accordion-trigger">
        <span class="trigger-text">Usage</span>
        <span class="trigger-icon">▼</span>
      </hp-accordion-trigger>
      <hp-accordion-content class="accordion-content">
        <p>Import and use the custom elements in your HTML. All accessibility is handled automatically.</p>
      </hp-accordion-content>
    </hp-accordion-item>
    
    <hp-accordion-item class="accordion-item" value="single-3">
      <hp-accordion-trigger class="accordion-trigger">
        <span class="trigger-text">Styling</span>
        <span class="trigger-icon">▼</span>
      </hp-accordion-trigger>
      <hp-accordion-content class="accordion-content">
        <p>Apply your own CSS styles or use utility classes. The components are completely unstyled.</p>
      </hp-accordion-content>
    </hp-accordion-item>
  </hp-accordion>
</div>

<div class="demo-section">
  <h2>Disabled Accordion Items</h2>
  <hp-accordion class="accordion-demo">
    <hp-accordion-item class="accordion-item" value="enabled-1">
      <hp-accordion-trigger class="accordion-trigger">
        <span class="trigger-text">Available Section</span>
        <span class="trigger-icon">▼</span>
      </hp-accordion-trigger>
      <hp-accordion-content class="accordion-content">
        <p>This section is available and can be expanded.</p>
      </hp-accordion-content>
    </hp-accordion-item>
    
    <hp-accordion-item class="accordion-item" value="disabled-1" disabled>
      <hp-accordion-trigger class="accordion-trigger">
        <span class="trigger-text">Disabled Section</span>
        <span class="trigger-icon">▼</span>
      </hp-accordion-trigger>
      <hp-accordion-content class="accordion-content">
        <p>This section is disabled and cannot be interacted with.</p>
      </hp-accordion-content>
    </hp-accordion-item>
    
    <hp-accordion-item class="accordion-item" value="enabled-2">
      <hp-accordion-trigger class="accordion-trigger">
        <span class="trigger-text">Another Available Section</span>
        <span class="trigger-icon">▼</span>
      </hp-accordion-trigger>
      <hp-accordion-content class="accordion-content">
        <p>This section is also available for interaction.</p>
      </hp-accordion-content>
    </hp-accordion-item>
  </hp-accordion>
</div>

<div class="demo-section">
  <h2>Complex Content</h2>
  <hp-accordion class="accordion-demo">
    <hp-accordion-item class="accordion-item" value="complex-1">
      <hp-accordion-trigger class="accordion-trigger">
        <span class="trigger-text">Nested Elements</span>
        <span class="trigger-icon">▼</span>
      </hp-accordion-trigger>
      <hp-accordion-content class="accordion-content">
        <h4>Subheading</h4>
        <p>Accordion content can contain complex HTML structures including:</p>
        <ul>
          <li>Multiple paragraphs</li>
          <li>Lists and nested content</li>
          <li>Interactive elements</li>
          <li>Other components</li>
        </ul>
        <p>The accessibility is maintained regardless of content complexity.</p>
      </hp-accordion-content>
    </hp-accordion-item>
    
    <hp-accordion-item class="accordion-item" value="complex-2">
      <hp-accordion-trigger class="accordion-trigger">
        <span class="trigger-text">Code Example</span>
        <span class="trigger-icon">▼</span>
      </hp-accordion-trigger>
      <hp-accordion-content class="accordion-content">
        <pre><code>&lt;hp-accordion single-panel&gt;
  &lt;hp-accordion-item value="item-1"&gt;
    &lt;hp-accordion-trigger&gt;
      Title
    &lt;/hp-accordion-trigger&gt;
    &lt;hp-accordion-content&gt;
      Content
    &lt;/hp-accordion-content&gt;
  &lt;/hp-accordion-item&gt;
&lt;/hp-accordion&gt;</code></pre>
      </hp-accordion-content>
    </hp-accordion-item>
  </hp-accordion>
</div>
`,
};
