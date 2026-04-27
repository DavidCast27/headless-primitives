import "@headless-primitives/accordion";
import "../styles/accordion.css";

export const accordionDemo = {
  title: "Accordion",
  description:
    "A vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content.",
  html: `
<div class="hp-demo-section">
  <h2>Basic Accordion</h2>
  <hp-accordion class="hp-demo-acc">
    <hp-hp-demo-acc-item class="hp-demo-acc-item" value="item-1">
      <hp-hp-demo-acc-trigger class="hp-demo-acc-trigger">
        <span class="hp-demo-acc-text">What is Headless Primitives?</span>
        <span class="hp-demo-acc-icon">▼</span>
      </hp-hp-demo-acc-trigger>
      <hp-hp-demo-acc-content class="hp-demo-acc-content">
        <p>Headless Primitives is a library of accessible, unstyled UI components that provide the behavior and accessibility foundation for building custom user interfaces.</p>
      </hp-hp-demo-acc-content>
    </hp-hp-demo-acc-item>
    
    <hp-hp-demo-acc-item class="hp-demo-acc-item" value="item-2">
      <hp-hp-demo-acc-trigger class="hp-demo-acc-trigger">
        <span class="hp-demo-acc-text">How does it work?</span>
        <span class="hp-demo-acc-icon">▼</span>
      </hp-hp-demo-acc-trigger>
      <hp-hp-demo-acc-content class="hp-demo-acc-content">
        <p>Each primitive is a custom element that implements WAI-ARIA patterns, handles keyboard interactions, and manages accessibility attributes automatically. You provide the styling.</p>
      </hp-hp-demo-acc-content>
    </hp-hp-demo-acc-item>
    
    <hp-hp-demo-acc-item class="hp-demo-acc-item" value="item-3">
      <hp-hp-demo-acc-trigger class="hp-demo-acc-trigger">
        <span class="hp-demo-acc-text">Why choose headless?</span>
        <span class="hp-demo-acc-icon">▼</span>
      </hp-hp-demo-acc-trigger>
      <hp-hp-demo-acc-content class="hp-demo-acc-content">
        <p>Headless components give you complete control over the visual design while ensuring accessibility and proper behavior out of the box. No fighting with component library styles.</p>
      </hp-hp-demo-acc-content>
    </hp-hp-demo-acc-item>
  </hp-accordion>
</div>

<div class="hp-demo-section">
  <h2>Single Panel Accordion</h2>
  <hp-accordion class="hp-demo-acc" single-panel>
    <hp-hp-demo-acc-item class="hp-demo-acc-item" value="single-1" open>
      <hp-hp-demo-acc-trigger class="hp-demo-acc-trigger">
        <span class="hp-demo-acc-text">Installation</span>
        <span class="hp-demo-acc-icon">▲</span>
      </hp-hp-demo-acc-trigger>
      <hp-hp-demo-acc-content class="hp-demo-acc-content">
        <p>Install any primitive with your package manager (npm/pnpm/Yarn/Bun), e.g.: <code>npm i @headless-primitives/button</code></p>
      </hp-hp-demo-acc-content>
    </hp-hp-demo-acc-item>
    
    <hp-hp-demo-acc-item class="hp-demo-acc-item" value="single-2">
      <hp-hp-demo-acc-trigger class="hp-demo-acc-trigger">
        <span class="hp-demo-acc-text">Usage</span>
        <span class="hp-demo-acc-icon">▼</span>
      </hp-hp-demo-acc-trigger>
      <hp-hp-demo-acc-content class="hp-demo-acc-content">
        <p>Import and use the custom elements in your HTML. All accessibility is handled automatically.</p>
      </hp-hp-demo-acc-content>
    </hp-hp-demo-acc-item>
    
    <hp-hp-demo-acc-item class="hp-demo-acc-item" value="single-3">
      <hp-hp-demo-acc-trigger class="hp-demo-acc-trigger">
        <span class="hp-demo-acc-text">Styling</span>
        <span class="hp-demo-acc-icon">▼</span>
      </hp-hp-demo-acc-trigger>
      <hp-hp-demo-acc-content class="hp-demo-acc-content">
        <p>Apply your own CSS styles or use utility classes. The components are completely unstyled.</p>
      </hp-hp-demo-acc-content>
    </hp-hp-demo-acc-item>
  </hp-accordion>
</div>

<div class="hp-demo-section">
  <h2>Disabled Accordion Items</h2>
  <hp-accordion class="hp-demo-acc">
    <hp-hp-demo-acc-item class="hp-demo-acc-item" value="enabled-1">
      <hp-hp-demo-acc-trigger class="hp-demo-acc-trigger">
        <span class="hp-demo-acc-text">Available Section</span>
        <span class="hp-demo-acc-icon">▼</span>
      </hp-hp-demo-acc-trigger>
      <hp-hp-demo-acc-content class="hp-demo-acc-content">
        <p>This section is available and can be expanded.</p>
      </hp-hp-demo-acc-content>
    </hp-hp-demo-acc-item>
    
    <hp-hp-demo-acc-item class="hp-demo-acc-item" value="disabled-1" disabled>
      <hp-hp-demo-acc-trigger class="hp-demo-acc-trigger">
        <span class="hp-demo-acc-text">Disabled Section</span>
        <span class="hp-demo-acc-icon">▼</span>
      </hp-hp-demo-acc-trigger>
      <hp-hp-demo-acc-content class="hp-demo-acc-content">
        <p>This section is disabled and cannot be interacted with.</p>
      </hp-hp-demo-acc-content>
    </hp-hp-demo-acc-item>
    
    <hp-hp-demo-acc-item class="hp-demo-acc-item" value="enabled-2">
      <hp-hp-demo-acc-trigger class="hp-demo-acc-trigger">
        <span class="hp-demo-acc-text">Another Available Section</span>
        <span class="hp-demo-acc-icon">▼</span>
      </hp-hp-demo-acc-trigger>
      <hp-hp-demo-acc-content class="hp-demo-acc-content">
        <p>This section is also available for interaction.</p>
      </hp-hp-demo-acc-content>
    </hp-hp-demo-acc-item>
  </hp-accordion>
</div>

<div class="hp-demo-section">
  <h2>Complex Content</h2>
  <hp-accordion class="hp-demo-acc">
    <hp-hp-demo-acc-item class="hp-demo-acc-item" value="complex-1">
      <hp-hp-demo-acc-trigger class="hp-demo-acc-trigger">
        <span class="hp-demo-acc-text">Nested Elements</span>
        <span class="hp-demo-acc-icon">▼</span>
      </hp-hp-demo-acc-trigger>
      <hp-hp-demo-acc-content class="hp-demo-acc-content">
        <h4>Subheading</h4>
        <p>Accordion content can contain complex HTML structures including:</p>
        <ul>
          <li>Multiple paragraphs</li>
          <li>Lists and nested content</li>
          <li>Interactive elements</li>
          <li>Other components</li>
        </ul>
        <p>The accessibility is maintained regardless of content complexity.</p>
      </hp-hp-demo-acc-content>
    </hp-hp-demo-acc-item>
    
    <hp-hp-demo-acc-item class="hp-demo-acc-item" value="complex-2">
      <hp-hp-demo-acc-trigger class="hp-demo-acc-trigger">
        <span class="hp-demo-acc-text">Code Example</span>
        <span class="hp-demo-acc-icon">▼</span>
      </hp-hp-demo-acc-trigger>
      <hp-hp-demo-acc-content class="hp-demo-acc-content">
        <pre><code>&lt;hp-accordion single-panel&gt;
  &lt;hp-hp-demo-acc-item value="item-1"&gt;
    &lt;hp-hp-demo-acc-trigger&gt;
      Title
    &lt;/hp-hp-demo-acc-trigger&gt;
    &lt;hp-hp-demo-acc-content&gt;
      Content
    &lt;/hp-hp-demo-acc-content&gt;
  &lt;/hp-hp-demo-acc-item&gt;
&lt;/hp-accordion&gt;</code></pre>
      </hp-hp-demo-acc-content>
    </hp-hp-demo-acc-item>
  </hp-accordion>
</div>
`,
};
