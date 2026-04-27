import "@headless-primitives/stepper";
import "../styles/stepper.css";

export const stepperDemo = {
  title: "Stepper",
  description: "A step-by-step wizard indicator with full keyboard navigation and ARIA support.",
  html: `
<div class="hp-demo-section">
  <h2>Horizontal</h2>
  <hp-stepper value="0" orientation="horizontal" class="stepper">
    <hp-stepper-list class="stepper-list">
      <hp-stepper-item class="stepper-item">Account</hp-stepper-item>
      <hp-stepper-item class="stepper-item">Profile</hp-stepper-item>
      <hp-stepper-item class="stepper-item">Review</hp-stepper-item>
    </hp-stepper-list>

    <hp-stepper-panel class="stepper-panel">
      <h3>Step 1 — Account</h3>
      <p>Enter your email address and create a password to get started.</p>
    </hp-stepper-panel>
    <hp-stepper-panel class="stepper-panel">
      <h3>Step 2 — Profile</h3>
      <p>Tell us a bit about yourself so we can personalise your experience.</p>
    </hp-stepper-panel>
    <hp-stepper-panel class="stepper-panel">
      <h3>Step 3 — Review</h3>
      <p>Review your details before submitting.</p>
    </hp-stepper-panel>

    <div class="stepper-actions" data-hp-stepper-actions>
      <hp-stepper-prev class="stepper-prev">← Previous</hp-stepper-prev>
      <hp-stepper-next class="stepper-next">Next →</hp-stepper-next>
      <hp-stepper-finish class="stepper-finish">Finish ✓</hp-stepper-finish>
    </div>
  </hp-stepper>
</div>

<div class="hp-demo-section">
  <h2>Vertical</h2>
  <hp-stepper value="0" orientation="vertical" class="stepper">
    <hp-stepper-list class="stepper-list">
      <hp-stepper-item class="stepper-item">Account</hp-stepper-item>
      <hp-stepper-item class="stepper-item">Profile</hp-stepper-item>
      <hp-stepper-item class="stepper-item">Review</hp-stepper-item>
    </hp-stepper-list>

    <hp-stepper-panel class="stepper-panel">
      <h3>Step 1 — Account</h3>
      <p>Enter your email address and create a password to get started.</p>
    </hp-stepper-panel>
    <hp-stepper-panel class="stepper-panel">
      <h3>Step 2 — Profile</h3>
      <p>Tell us a bit about yourself so we can personalise your experience.</p>
    </hp-stepper-panel>
    <hp-stepper-panel class="stepper-panel">
      <h3>Step 3 — Review</h3>
      <p>Review your details before submitting.</p>
    </hp-stepper-panel>

    <div class="stepper-actions" data-hp-stepper-actions>
      <hp-stepper-prev class="stepper-prev">← Previous</hp-stepper-prev>
      <hp-stepper-next class="stepper-next">Next →</hp-stepper-next>
      <hp-stepper-finish class="stepper-finish">Finish ✓</hp-stepper-finish>
    </div>
  </hp-stepper>
</div>

<div class="hp-demo-section">
  <h2>Linear (sequential only)</h2>
  <hp-stepper value="0" linear class="stepper">
    <hp-stepper-list class="stepper-list">
      <hp-stepper-item class="stepper-item">Shipping</hp-stepper-item>
      <hp-stepper-item class="stepper-item">Payment</hp-stepper-item>
      <hp-stepper-item class="stepper-item">Confirm</hp-stepper-item>
    </hp-stepper-list>

    <hp-stepper-panel class="stepper-panel">
      <h3>Shipping Address</h3>
      <p>Enter your delivery address. You must complete this step before proceeding.</p>
    </hp-stepper-panel>
    <hp-stepper-panel class="stepper-panel">
      <h3>Payment</h3>
      <p>Provide your payment details.</p>
    </hp-stepper-panel>
    <hp-stepper-panel class="stepper-panel">
      <h3>Confirm Order</h3>
      <p>Review your order and confirm.</p>
    </hp-stepper-panel>

    <div class="stepper-actions" data-hp-stepper-actions>
      <hp-stepper-prev class="stepper-prev">← Back</hp-stepper-prev>
      <hp-stepper-next class="stepper-next">Continue →</hp-stepper-next>
      <hp-stepper-finish class="stepper-finish">Confirm Order ✓</hp-stepper-finish>
    </div>
  </hp-stepper>
</div>

<div class="hp-demo-section">
  <h2>Sin estilos (solo base.css)</h2>
  <p style="font-size:0.85rem;color:var(--hp-text-secondary);margin-bottom:1rem;">
    Solo <code>base.css</code> controla la visibilidad de los paneles vía <code>[data-hp-stepper-panel][data-state="hidden"]</code>.
  </p>
  <hp-stepper value="1">
    <hp-stepper-list>
      <hp-stepper-item>Step A</hp-stepper-item>
      <hp-stepper-item>Step B</hp-stepper-item>
      <hp-stepper-item>Step C</hp-stepper-item>
    </hp-stepper-list>
    <hp-stepper-panel>Panel A — visible por base.css</hp-stepper-panel>
    <hp-stepper-panel>Panel B — activo</hp-stepper-panel>
    <hp-stepper-panel>Panel C</hp-stepper-panel>
    <hp-stepper-prev>Prev</hp-stepper-prev>
    <hp-stepper-next>Next</hp-stepper-next>
  </hp-stepper>
</div>
`,
};
