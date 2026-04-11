import "@headless-primitives/tree";
import "./tree.css";

export const treeDemo = {
  title: "Tree View",
  description:
    "A hierarchical tree widget for navigating nested data with keyboard support and full ARIA compliance.",
  html: `
<div class="demo-section">
  <h2>Basic Tree</h2>
  <hp-tree class="tree-demo" id="demo-tree-1">
    <hp-tree-item class="tree-item" value="documents">
      Documents
      <hp-tree-group class="tree-group">
        <hp-tree-item class="tree-item" value="reports">
          Reports
          <hp-tree-group class="tree-group">
            <hp-tree-item class="tree-item" value="q1">Q1 Report</hp-tree-item>
            <hp-tree-item class="tree-item" value="q2">Q2 Report</hp-tree-item>
          </hp-tree-group>
        </hp-tree-item>
        <hp-tree-item class="tree-item" value="invoices">Invoices</hp-tree-item>
        <hp-tree-item class="tree-item" value="contracts">Contracts</hp-tree-item>
      </hp-tree-group>
    </hp-tree-item>
    <hp-tree-item class="tree-item" value="images">
      Images
      <hp-tree-group class="tree-group">
        <hp-tree-item class="tree-item" value="photos">Photos</hp-tree-item>
        <hp-tree-item class="tree-item" value="screenshots">Screenshots</hp-tree-item>
      </hp-tree-group>
    </hp-tree-item>
    <hp-tree-item class="tree-item" value="readme">README.md</hp-tree-item>
  </hp-tree>
  <div class="event-log" id="log-1"><p>Click or use keyboard to interact…</p></div>
</div>

<div class="demo-section">
  <h2>Pre-expanded Tree</h2>
  <hp-tree class="tree-demo" id="demo-tree-2">
    <hp-tree-item class="tree-item" value="src" expanded>
      src
      <hp-tree-group class="tree-group">
        <hp-tree-item class="tree-item" value="components" expanded>
          components
          <hp-tree-group class="tree-group">
            <hp-tree-item class="tree-item" value="button">Button.ts</hp-tree-item>
            <hp-tree-item class="tree-item" value="dialog">Dialog.ts</hp-tree-item>
          </hp-tree-group>
        </hp-tree-item>
        <hp-tree-item class="tree-item" value="utils">
          utils
          <hp-tree-group class="tree-group">
            <hp-tree-item class="tree-item" value="helpers">helpers.ts</hp-tree-item>
          </hp-tree-group>
        </hp-tree-item>
        <hp-tree-item class="tree-item" value="main">main.ts</hp-tree-item>
      </hp-tree-group>
    </hp-tree-item>
    <hp-tree-item class="tree-item" value="package-json">package.json</hp-tree-item>
    <hp-tree-item class="tree-item" value="tsconfig">tsconfig.json</hp-tree-item>
  </hp-tree>
</div>

<div class="demo-section">
  <h2>With Disabled Items</h2>
  <hp-tree class="tree-demo" id="demo-tree-3">
    <hp-tree-item class="tree-item" value="active-1">Active Node</hp-tree-item>
    <hp-tree-item class="tree-item" value="disabled-1" disabled>Disabled Node</hp-tree-item>
    <hp-tree-item class="tree-item" value="active-folder">
      Active Folder
      <hp-tree-group class="tree-group">
        <hp-tree-item class="tree-item" value="child-1">Child 1</hp-tree-item>
        <hp-tree-item class="tree-item" value="child-disabled" disabled>Disabled Child</hp-tree-item>
        <hp-tree-item class="tree-item" value="child-2">Child 2</hp-tree-item>
      </hp-tree-group>
    </hp-tree-item>
  </hp-tree>
</div>

<div class="demo-section">
  <h2>Multi-select</h2>
  <hp-tree class="tree-demo" id="demo-tree-4" multi-select>
    <hp-tree-item class="tree-item" value="ms-docs">
      Documents
      <hp-tree-group class="tree-group">
        <hp-tree-item class="tree-item" value="ms-reports">Reports</hp-tree-item>
        <hp-tree-item class="tree-item" value="ms-invoices">Invoices</hp-tree-item>
      </hp-tree-group>
    </hp-tree-item>
    <hp-tree-item class="tree-item" value="ms-images">
      Images
      <hp-tree-group class="tree-group">
        <hp-tree-item class="tree-item" value="ms-photos">Photos</hp-tree-item>
        <hp-tree-item class="tree-item" value="ms-screenshots">Screenshots</hp-tree-item>
      </hp-tree-group>
    </hp-tree-item>
    <hp-tree-item class="tree-item" value="ms-readme">README.md</hp-tree-item>
  </hp-tree>
  <div class="event-log" id="log-4"><p>Click multiple items to select them…</p></div>
</div>
`,
  init: () => {
    const tree1 = document.getElementById("demo-tree-1");
    const log1 = document.getElementById("log-1");

    if (tree1 && log1) {
      tree1.addEventListener("hp-select", (e: Event) => {
        const { value } = (e as CustomEvent).detail;
        const p = document.createElement("p");
        p.textContent = `hp-select: "${value}"`;
        log1.innerHTML = "";
        log1.appendChild(p);
      });

      tree1.addEventListener("hp-expand", (e: Event) => {
        const { value } = (e as CustomEvent).detail;
        const p = document.createElement("p");
        p.textContent = `hp-expand: "${value}"`;
        log1.innerHTML = "";
        log1.appendChild(p);
      });

      tree1.addEventListener("hp-collapse", (e: Event) => {
        const { value } = (e as CustomEvent).detail;
        const p = document.createElement("p");
        p.textContent = `hp-collapse: "${value}"`;
        log1.innerHTML = "";
        log1.appendChild(p);
      });
    }

    const tree4 = document.getElementById("demo-tree-4");
    const log4 = document.getElementById("log-4");

    if (tree4 && log4) {
      tree4.addEventListener("hp-select", (e: Event) => {
        const { selectedValues } = (e as CustomEvent).detail;
        const p = document.createElement("p");
        p.textContent = `Selected: [${(selectedValues as string[]).join(", ")}]`;
        log4.innerHTML = "";
        log4.appendChild(p);
      });
    }
  },
};
