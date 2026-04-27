import { ComponentDemo } from "../types";
import "../styles/navigation-menu.css";

// ─── Data ────────────────────────────────────────────────────────────────────

const audienceMenus = [
  {
    value: "developers",
    label: "Developers",
    hint: "Go from idea to UI faster.",
    title: "Build product UI without giving up control",
    description:
      "Start with accessible parts and shape them to your app instead of working around a preset design system.",
    links: [
      {
        href: "#",
        title: "Quick start",
        description: "Install and get your first component on screen fast.",
      },
      {
        href: "#",
        title: "Composition",
        description: "Wrap and combine parts to match your product structure.",
      },
    ],
  },
  {
    value: "systems",
    label: "Design Systems",
    hint: "Keep patterns aligned across teams.",
    title: "Turn shared standards into working components",
    description:
      "Connect tokens, states, and accessibility rules once, then give every product team the same solid starting point.",
    links: [
      {
        href: "#",
        title: "Styling",
        description: "Map tokens and component states to your own CSS setup.",
      },
      {
        href: "#",
        title: "Accessibility",
        description: "Review keyboard support and semantic defaults.",
      },
      {
        href: "#",
        title: "Tooltip",
        description: "Set one clear pattern for lightweight help and hints.",
      },
      {
        href: "#",
        title: "Popover",
        description: "Handle richer anchored panels like menus and onboarding.",
      },
    ],
  },
  {
    value: "leads",
    label: "Engineering Leads",
    hint: "Roll out shared UI without drag.",
    title: "Give squads clear defaults and room to move",
    description:
      "Use the docs to align on quality bars, upgrades, and extension points while still leaving teams space to customize.",
    links: [
      {
        href: "#",
        title: "Releases",
        description: "Track version changes and migration notes before upgrades.",
      },
      {
        href: "#",
        title: "TypeScript",
        description: "See how the primitives type custom wrappers.",
      },
      { href: "#", title: "Forms", description: "Standardize validation and field patterns." },
    ],
  },
  {
    value: "startups",
    label: "Startups",
    hint: "Ship polished basics while things change.",
    title: "Get sturdy UI foundations in place early",
    description:
      "Cover the hard interaction details now so your team can spend more time on the product ideas that differentiate you.",
    links: [
      {
        href: "#",
        title: "Quick start",
        description: "Get the package installed and your first component working.",
      },
      {
        href: "#",
        title: "Menu",
        description: "Add action menus with keyboard support already done.",
      },
      {
        href: "#",
        title: "Dialog",
        description: "Launch settings or upgrade flows without rebuilding focus management.",
      },
    ],
  },
];

const overviewLinks = [
  { href: "#", title: "Quick Start", description: "Install and assemble your first component." },
  { href: "#", title: "Accessibility", description: "Learn how we build accessible components." },
  { href: "#", title: "Releases", description: "See what's new in the latest versions." },
  { href: "#", title: "About", description: "Learn more about the project and our mission." },
];

const handbookLinks = [
  { href: "#", title: "Styling", description: "Plain CSS, Tailwind, CSS-in-JS, or CSS Modules." },
  { href: "#", title: "Animation", description: "CSS transitions, animations, or JS libraries." },
  { href: "#", title: "Composition", description: "Replace and compose with your own components." },
];

const guideLinks = [
  {
    href: "#",
    title: "Accessibility handbook",
    description: "A practical pass over focus order, semantics, and keyboard support.",
  },
  {
    href: "#",
    title: "Composition handbook",
    description: "Learn when to wrap parts, share behavior, and expose flexible APIs.",
  },
  {
    href: "#",
    title: "Styling handbook",
    description: "Apply tokens and state styles without fighting the underlying markup.",
  },
];

// ─── HTML builders ───────────────────────────────────────────────────────────

function linkCard(link: { href: string; title: string; description: string }) {
  return `<a href="${link.href}" class="nm-link-card">
    <strong class="nm-link-title">${link.title}</strong>
    <span class="nm-link-desc">${link.description}</span>
  </a>`;
}

function buildDemo1() {
  return `
<!-- ══════════════════════════════════════════════════════════
     DEMO 1 — Basic: Overview (grid) + Handbook (list) + plain link
     ══════════════════════════════════════════════════════════ -->
<div class="nm-demo-block">
  <p class="nm-demo-label">Basic — grid panel + list panel</p>
  <hp-navigation-menu id="demo-nav-1" aria-label="Main navigation" close-delay="300">
    <hp-navigation-menu-list class="nm-list">

      <hp-navigation-menu-item value="overview" class="nm-item">
        <hp-navigation-menu-trigger class="nm-trigger">
          Overview
          <svg class="nm-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" stroke-width="1.5"/></svg>
        </hp-navigation-menu-trigger>
        <hp-navigation-menu-content class="nm-content">
          <div class="nm-grid-2">
            ${overviewLinks.map(linkCard).join("")}
          </div>
        </hp-navigation-menu-content>
      </hp-navigation-menu-item>

      <hp-navigation-menu-item value="handbook" class="nm-item">
        <hp-navigation-menu-trigger class="nm-trigger">
          Handbook
          <svg class="nm-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" stroke-width="1.5"/></svg>
        </hp-navigation-menu-trigger>
        <hp-navigation-menu-content class="nm-content">
          <div class="nm-list-panel">
            ${handbookLinks.map(linkCard).join("")}
          </div>
        </hp-navigation-menu-content>
      </hp-navigation-menu-item>

      <hp-navigation-menu-item class="nm-item">
        <hp-navigation-menu-link class="nm-trigger nm-plain-link" href="#">GitHub</hp-navigation-menu-link>
      </hp-navigation-menu-item>

    </hp-navigation-menu-list>
    <hp-navigation-menu-indicator class="nm-indicator"></hp-navigation-menu-indicator>
  </hp-navigation-menu>
</div>`;
}

function buildDemo2() {
  // Nested submenu: Overview grid has a "Handbook" card that is itself a trigger
  // opening a side panel (right). Uses a plain JS-driven sub-panel, no nested hp-navigation-menu.
  return `
<!-- ══════════════════════════════════════════════════════════
     DEMO 2 — Nested submenus: card inside panel opens a side popup
     ══════════════════════════════════════════════════════════ -->
<div class="nm-demo-block">
  <p class="nm-demo-label">Nested submenus — card triggers a side panel</p>
  <hp-navigation-menu id="demo-nav-2" aria-label="Nested navigation" close-delay="300">
    <hp-navigation-menu-list class="nm-list">

      <hp-navigation-menu-item value="overview2" class="nm-item">
        <hp-navigation-menu-trigger class="nm-trigger">
          Overview
          <svg class="nm-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" stroke-width="1.5"/></svg>
        </hp-navigation-menu-trigger>
        <hp-navigation-menu-content class="nm-content">
          <div class="nm-grid-2">
            ${overviewLinks.slice(0, 3).map(linkCard).join("")}
            <!-- Nested trigger card -->
            <div class="nm-nested-wrapper" data-nested="handbook2">
              <button class="nm-link-card nm-nested-trigger" aria-expanded="false" aria-haspopup="true">
                <strong class="nm-link-title">Handbook</strong>
                <span class="nm-link-desc">How to use headless-primitives effectively.</span>
                <svg class="nm-nested-arrow" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M3.5 1L7.5 5L3.5 9" stroke="currentColor" stroke-width="1.5"/></svg>
              </button>
              <!-- Side panel -->
              <div class="nm-side-panel" id="handbook2-panel" role="region" aria-label="Handbook">
                <div class="nm-list-panel">
                  ${handbookLinks.map(linkCard).join("")}
                </div>
              </div>
            </div>
          </div>
        </hp-navigation-menu-content>
      </hp-navigation-menu-item>

      <hp-navigation-menu-item class="nm-item">
        <hp-navigation-menu-link class="nm-trigger nm-plain-link" href="#">GitHub</hp-navigation-menu-link>
      </hp-navigation-menu-item>

    </hp-navigation-menu-list>
    <hp-navigation-menu-indicator class="nm-indicator"></hp-navigation-menu-indicator>
  </hp-navigation-menu>
</div>`;
}

function buildDemo3() {
  const tabs = audienceMenus
    .map(
      (m) => `
    <li class="nm-sub-item" data-value="${m.value}">
      <button class="nm-sub-trigger" aria-expanded="false">
        <span class="nm-sub-label">${m.label}</span>
        <span class="nm-sub-hint">${m.hint}</span>
      </button>
      <div class="nm-sub-panel" role="region" aria-label="${m.label}">
        <h4 class="nm-sub-title">${m.title}</h4>
        <p class="nm-sub-desc">${m.description}</p>
        <ul class="nm-sub-links">
          ${m.links.map((l) => `<li>${linkCard(l)}</li>`).join("")}
        </ul>
      </div>
    </li>`,
    )
    .join("");

  return `
<!-- ══════════════════════════════════════════════════════════
     DEMO 3 — Nested inline submenus: sidebar tabs + viewport
     ══════════════════════════════════════════════════════════ -->
<div class="nm-demo-block">
  <p class="nm-demo-label">Nested inline submenus — sidebar + viewport</p>
  <hp-navigation-menu id="demo-nav-3" aria-label="Product navigation" close-delay="300">
    <hp-navigation-menu-list class="nm-list">

      <hp-navigation-menu-item value="product" class="nm-item">
        <hp-navigation-menu-trigger class="nm-trigger">
          Product
          <svg class="nm-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" stroke-width="1.5"/></svg>
        </hp-navigation-menu-trigger>
        <hp-navigation-menu-content class="nm-content nm-content--flush">
          <div class="nm-inline-sub">
            <ul class="nm-sub-list" role="list" id="demo3-sub-list">
              ${tabs}
            </ul>
            <div class="nm-sub-viewport" id="demo3-viewport"></div>
          </div>
        </hp-navigation-menu-content>
      </hp-navigation-menu-item>

      <hp-navigation-menu-item value="learn" class="nm-item">
        <hp-navigation-menu-trigger class="nm-trigger">
          Learn
          <svg class="nm-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" stroke-width="1.5"/></svg>
        </hp-navigation-menu-trigger>
        <hp-navigation-menu-content class="nm-content">
          <div class="nm-list-panel">
            <p class="nm-section-label">Where teams usually start</p>
            ${guideLinks.map(linkCard).join("")}
          </div>
        </hp-navigation-menu-content>
      </hp-navigation-menu-item>

      <hp-navigation-menu-item class="nm-item">
        <hp-navigation-menu-link class="nm-trigger nm-plain-link" href="#">Releases</hp-navigation-menu-link>
      </hp-navigation-menu-item>

      <hp-navigation-menu-item class="nm-item">
        <hp-navigation-menu-link class="nm-trigger nm-plain-link" active href="#">GitHub</hp-navigation-menu-link>
      </hp-navigation-menu-item>

    </hp-navigation-menu-list>
    <hp-navigation-menu-indicator class="nm-indicator"></hp-navigation-menu-indicator>
  </hp-navigation-menu>
</div>`;
}

// ─── Demo export ─────────────────────────────────────────────────────────────

export const navigationMenuDemo: ComponentDemo = {
  title: "Navigation Menu primitive",
  description:
    "WAI-ARIA navigation menu with horizontal trigger list, flyout panels, hover intent, and full keyboard support.",
  html: `
<div style="display:flex;flex-direction:column;gap:2.5rem;width:100%;">
  ${buildDemo1()}
  ${buildDemo2()}
  ${buildDemo3()}

  <div class="nm-event-log">
    <div class="nm-event-log-title">Event Log:</div>
    <div id="nav-event-log" class="nm-event-log-entries">(events will appear here)</div>
  </div>
</div>`,

  init: () => {
    const eventLog = document.getElementById("nav-event-log")!;
    let logCount = 0;

    function logEvent(msg: string) {
      logCount++;
      const ts = new Date().toLocaleTimeString();
      eventLog.textContent = `[${logCount}] ${ts}: ${msg}\n${eventLog.textContent}`;
      if (logCount > 30) {
        eventLog.textContent = eventLog.textContent.split("\n").slice(0, 30).join("\n");
      }
    }

    // Log events from all three navs
    ["demo-nav-1", "demo-nav-2", "demo-nav-3"].forEach((id) => {
      const nav = document.getElementById(id) as any;
      if (!nav) return;
      nav.addEventListener("hp-open", (e: any) => logEvent(`[${id}] opened: "${e.detail.value}"`));
      nav.addEventListener("hp-close", (e: any) => logEvent(`[${id}] closed: "${e.detail.value}"`));
    });

    // ── Demo 2: nested trigger card ──────────────────────────────────────────
    function initNestedTriggers() {
      document.querySelectorAll<HTMLElement>(".nm-nested-wrapper").forEach((wrapper) => {
        const btn = wrapper.querySelector<HTMLButtonElement>(".nm-nested-trigger");
        const panel = wrapper.querySelector<HTMLElement>(".nm-side-panel");
        if (!btn || !panel) return;

        const show = () => {
          btn.setAttribute("aria-expanded", "true");
          panel.classList.add("is-open");
        };
        const hide = () => {
          btn.setAttribute("aria-expanded", "false");
          panel.classList.remove("is-open");
        };

        btn.addEventListener("mouseenter", show);
        btn.addEventListener("focus", show);
        btn.addEventListener("mouseleave", (e) => {
          if (!panel.contains(e.relatedTarget as Node)) hide();
        });
        panel.addEventListener("mouseleave", (e) => {
          if (!wrapper.contains(e.relatedTarget as Node)) hide();
        });
        btn.addEventListener("click", () => {
          if (panel.classList.contains("is-open")) {
            hide();
          } else {
            show();
          }
        });
        btn.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            hide();
            btn.focus();
          }
        });
      });
    }

    // ── Demo 3: inline sub-menu tabs ─────────────────────────────────────────
    function initInlineSub(navId: string) {
      const nav = document.getElementById(navId) as any;
      if (!nav) return;

      nav.addEventListener("hp-open", (e: any) => {
        if (e.detail.value !== "product") return;
        requestAnimationFrame(() => activateSubTab("developers"));
      });

      function activateSubTab(value: string) {
        const items = document.querySelectorAll<HTMLElement>(`#demo3-sub-list .nm-sub-item`);
        const viewport = document.getElementById("demo3-viewport");
        if (!viewport) return;

        items.forEach((item) => {
          const isActive = item.dataset.value === value;
          const btn = item.querySelector<HTMLButtonElement>(".nm-sub-trigger");
          item.classList.toggle("is-active", isActive);
          btn?.setAttribute("aria-expanded", String(isActive));
        });

        const activeItem = document.querySelector<HTMLElement>(
          `#demo3-sub-list .nm-sub-item[data-value="${value}"]`,
        );
        const panel = activeItem?.querySelector<HTMLElement>(".nm-sub-panel");
        if (panel) {
          viewport.innerHTML = panel.innerHTML;
        }
      }

      // Bind hover/focus/click on sub-triggers
      document
        .querySelectorAll<HTMLButtonElement>("#demo3-sub-list .nm-sub-trigger")
        .forEach((btn) => {
          const item = btn.closest<HTMLElement>(".nm-sub-item");
          if (!item) return;
          const activate = () => activateSubTab(item.dataset.value!);
          btn.addEventListener("mouseenter", activate);
          btn.addEventListener("focus", activate);
          btn.addEventListener("click", activate);
        });
    }

    initNestedTriggers();
    initInlineSub("demo-nav-3");

    logEvent("Demo initialized — hover or click triggers to open flyouts!");
  },
};
