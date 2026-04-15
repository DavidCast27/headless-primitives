import { ComponentDemo } from "../types";
import "./toolbar.css";

export const toolbarDemo: ComponentDemo = {
  title: "Toolbar primitive",
  description:
    "Contenedor de controles (botones, toggles, separadores) con navegación por teclado mediante roving tabindex (WAI-ARIA toolbar pattern).",
  html: `
<div class="demo-toolbar">

  <section class="demo-section">
    <h3 class="demo-label">Horizontal (default)</h3>
    <hp-toolbar label="Text formatting" class="toolbar-example">
      <button type="button" title="Bold" aria-pressed="false" id="btn-bold">
        <strong>B</strong>
      </button>
      <button type="button" title="Italic" aria-pressed="false" id="btn-italic">
        <em>I</em>
      </button>
      <button type="button" title="Underline" aria-pressed="false" id="btn-underline">
        <u>U</u>
      </button>
      <div role="separator" aria-orientation="vertical"></div>
      <button type="button" title="Align left">&#8676;</button>
      <button type="button" title="Align center">&#8596;</button>
      <button type="button" title="Align right">&#8677;</button>
      <div role="separator" aria-orientation="vertical"></div>
      <button type="button" title="Insert link">&#128279;</button>
      <button type="button" title="Insert image">&#128444;</button>
    </hp-toolbar>
  </section>

  <section class="demo-section">
    <h3 class="demo-label">Vertical</h3>
    <hp-toolbar orientation="vertical" label="Drawing tools" class="toolbar-example toolbar-vertical">
      <button type="button" title="Select">&#9654;</button>
      <button type="button" title="Pen">&#9998;</button>
      <button type="button" title="Eraser">&#9003;</button>
      <div role="separator" aria-orientation="horizontal"></div>
      <button type="button" title="Shape">&#9723;</button>
      <button type="button" title="Text">T</button>
    </hp-toolbar>
  </section>

  <section class="demo-section">
    <h3 class="demo-label">With disabled items</h3>
    <hp-toolbar label="Actions" class="toolbar-example">
      <button type="button">Cut</button>
      <button type="button">Copy</button>
      <button type="button" disabled>Paste</button>
      <div role="separator" aria-orientation="vertical"></div>
      <button type="button" id="btn-undo">Undo</button>
      <button type="button" id="btn-redo" disabled>Redo</button>
    </hp-toolbar>
  </section>

  <section class="demo-section">
    <h3 class="demo-label">Event log</h3>
    <p class="event-log" id="event-log">Interact with toolbar items to see events...</p>
  </section>

</div>
  `,
  init: () => {
    const log = document.getElementById("event-log");

    // Toggle aria-pressed on bold/italic/underline
    ["btn-bold", "btn-italic", "btn-underline"].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener("click", () => {
          const pressed = btn.getAttribute("aria-pressed") === "true";
          btn.setAttribute("aria-pressed", String(!pressed));
          btn.classList.toggle("active", !pressed);
        });
      }
    });

    // Log focus-change events from all toolbars
    document.querySelectorAll("hp-toolbar").forEach((toolbar) => {
      toolbar.addEventListener("hp-focus-change", (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (log) {
          log.textContent = `hp-focus-change fired — item index: ${detail.index}`;
        }
      });
    });
  },
};
