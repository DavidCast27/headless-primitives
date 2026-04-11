<template>
  <div class="nm-root">
    <!-- ══════════════════════════════════════════════════════
         DEMO 1 — Basic: grid panel + list panel
         ══════════════════════════════════════════════════════ -->
    <div class="nm-section">
      <p class="nm-section-tag">Basic — grid + list</p>
      <hp-navigation-menu class="nm-nav" aria-label="Main navigation">
        <hp-navigation-menu-list class="nm-list">
          <hp-navigation-menu-item value="overview" class="nm-item">
            <hp-navigation-menu-trigger class="nm-trigger">
              Overview
              <svg
                class="nm-chevron"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
              >
                <path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </hp-navigation-menu-trigger>
            <hp-navigation-menu-content class="nm-content">
              <div class="nm-grid-2">
                <a
                  v-for="l in overviewLinks"
                  :key="l.title"
                  href="."
                  class="nm-link-card"
                  @click.prevent
                >
                  <strong class="nm-link-title">{{ l.title }}</strong>
                  <span class="nm-link-desc">{{ l.description }}</span>
                </a>
              </div>
            </hp-navigation-menu-content>
          </hp-navigation-menu-item>

          <hp-navigation-menu-item value="handbook" class="nm-item">
            <hp-navigation-menu-trigger class="nm-trigger">
              Handbook
              <svg
                class="nm-chevron"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
              >
                <path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </hp-navigation-menu-trigger>
            <hp-navigation-menu-content class="nm-content">
              <div class="nm-list-panel">
                <a
                  v-for="l in handbookLinks"
                  :key="l.title"
                  href="."
                  class="nm-link-card"
                  @click.prevent
                >
                  <strong class="nm-link-title">{{ l.title }}</strong>
                  <span class="nm-link-desc">{{ l.description }}</span>
                </a>
              </div>
            </hp-navigation-menu-content>
          </hp-navigation-menu-item>

          <hp-navigation-menu-item class="nm-item">
            <hp-navigation-menu-link class="nm-trigger nm-plain-link" href="." @click.prevent>
              GitHub
            </hp-navigation-menu-link>
          </hp-navigation-menu-item>
        </hp-navigation-menu-list>
        <hp-navigation-menu-indicator class="nm-indicator"></hp-navigation-menu-indicator>
      </hp-navigation-menu>
    </div>

    <!-- ══════════════════════════════════════════════════════
         DEMO 2 — Nested submenus: card inside panel → side popup
         ══════════════════════════════════════════════════════ -->
    <div class="nm-section">
      <p class="nm-section-tag">Nested submenus — card triggers a side panel</p>
      <hp-navigation-menu class="nm-nav" aria-label="Nested navigation">
        <hp-navigation-menu-list class="nm-list">
          <hp-navigation-menu-item value="overview2" class="nm-item">
            <hp-navigation-menu-trigger class="nm-trigger">
              Overview
              <svg
                class="nm-chevron"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
              >
                <path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </hp-navigation-menu-trigger>
            <hp-navigation-menu-content class="nm-content">
              <div class="nm-grid-2">
                <a
                  v-for="l in overviewLinks.slice(0, 3)"
                  :key="l.title"
                  href="."
                  class="nm-link-card"
                  @click.prevent
                >
                  <strong class="nm-link-title">{{ l.title }}</strong>
                  <span class="nm-link-desc">{{ l.description }}</span>
                </a>
                <!-- Nested trigger card -->
                <div
                  class="nm-nested-wrapper"
                  @mouseenter="nestedOpen = true"
                  @mouseleave="nestedOpen = false"
                >
                  <button
                    class="nm-link-card nm-nested-btn"
                    :aria-expanded="nestedOpen"
                    aria-haspopup="true"
                    @focus="nestedOpen = true"
                    @blur="nestedOpen = false"
                    @click="nestedOpen = !nestedOpen"
                  >
                    <strong class="nm-link-title">Handbook</strong>
                    <span class="nm-link-desc">How to use headless-primitives effectively.</span>
                    <svg
                      class="nm-nested-arrow"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M3.5 1L7.5 5L3.5 9" stroke="currentColor" stroke-width="1.5" />
                    </svg>
                  </button>
                  <div
                    v-show="nestedOpen"
                    class="nm-side-panel"
                    role="region"
                    aria-label="Handbook"
                  >
                    <div class="nm-list-panel">
                      <a
                        v-for="l in handbookLinks"
                        :key="l.title"
                        href="."
                        class="nm-link-card"
                        @click.prevent
                      >
                        <strong class="nm-link-title">{{ l.title }}</strong>
                        <span class="nm-link-desc">{{ l.description }}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </hp-navigation-menu-content>
          </hp-navigation-menu-item>

          <hp-navigation-menu-item class="nm-item">
            <hp-navigation-menu-link class="nm-trigger nm-plain-link" href="." @click.prevent>
              GitHub
            </hp-navigation-menu-link>
          </hp-navigation-menu-item>
        </hp-navigation-menu-list>
        <hp-navigation-menu-indicator class="nm-indicator"></hp-navigation-menu-indicator>
      </hp-navigation-menu>
    </div>

    <!-- ══════════════════════════════════════════════════════
         DEMO 3 — Nested inline submenus: sidebar tabs + viewport
         ══════════════════════════════════════════════════════ -->
    <div class="nm-section">
      <p class="nm-section-tag">Nested inline submenus — sidebar + viewport</p>
      <hp-navigation-menu class="nm-nav" aria-label="Product navigation" @hp-open="onProductOpen">
        <hp-navigation-menu-list class="nm-list">
          <hp-navigation-menu-item value="product" class="nm-item">
            <hp-navigation-menu-trigger class="nm-trigger">
              Product
              <svg
                class="nm-chevron"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
              >
                <path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </hp-navigation-menu-trigger>
            <hp-navigation-menu-content class="nm-content nm-content--flush">
              <div class="nm-inline-sub">
                <!-- Sidebar tabs -->
                <ul class="nm-sub-sidebar" role="list">
                  <li
                    v-for="menu in audienceMenus"
                    :key="menu.value"
                    class="nm-sub-tab"
                    :class="{ 'is-active': activeTab === menu.value }"
                  >
                    <button
                      class="nm-sub-tab-btn"
                      :aria-expanded="activeTab === menu.value"
                      @mouseenter="activeTab = menu.value"
                      @focus="activeTab = menu.value"
                      @click="activeTab = menu.value"
                    >
                      <span class="nm-sub-tab-label">{{ menu.label }}</span>
                      <span class="nm-sub-tab-hint">{{ menu.hint }}</span>
                    </button>
                  </li>
                </ul>
                <!-- Viewport -->
                <div class="nm-sub-viewport">
                  <template v-for="menu in audienceMenus" :key="menu.value">
                    <div v-show="activeTab === menu.value" class="nm-sub-panel">
                      <h4 class="nm-sub-title">{{ menu.title }}</h4>
                      <p class="nm-sub-desc">{{ menu.description }}</p>
                      <ul class="nm-sub-links">
                        <li v-for="l in menu.links" :key="l.title">
                          <a href="." class="nm-link-card" @click.prevent>
                            <strong class="nm-link-title">{{ l.title }}</strong>
                            <span class="nm-link-desc">{{ l.description }}</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </template>
                </div>
              </div>
            </hp-navigation-menu-content>
          </hp-navigation-menu-item>

          <hp-navigation-menu-item value="learn" class="nm-item">
            <hp-navigation-menu-trigger class="nm-trigger">
              Learn
              <svg
                class="nm-chevron"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
              >
                <path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </hp-navigation-menu-trigger>
            <hp-navigation-menu-content class="nm-content">
              <div class="nm-list-panel">
                <p class="nm-panel-label">Where teams usually start</p>
                <a
                  v-for="l in guideLinks"
                  :key="l.title"
                  href="."
                  class="nm-link-card"
                  @click.prevent
                >
                  <strong class="nm-link-title">{{ l.title }}</strong>
                  <span class="nm-link-desc">{{ l.description }}</span>
                </a>
              </div>
            </hp-navigation-menu-content>
          </hp-navigation-menu-item>

          <hp-navigation-menu-item class="nm-item">
            <hp-navigation-menu-link class="nm-trigger nm-plain-link" href="." @click.prevent>
              Releases
            </hp-navigation-menu-link>
          </hp-navigation-menu-item>

          <hp-navigation-menu-item class="nm-item">
            <hp-navigation-menu-link
              class="nm-trigger nm-plain-link"
              active
              href="."
              @click.prevent
            >
              GitHub
            </hp-navigation-menu-link>
          </hp-navigation-menu-item>
        </hp-navigation-menu-list>
        <hp-navigation-menu-indicator class="nm-indicator"></hp-navigation-menu-indicator>
      </hp-navigation-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// ── Demo 2 state ──────────────────────────────────────────────────────────────
const nestedOpen = ref(false);

// ── Demo 3 state ──────────────────────────────────────────────────────────────
const activeTab = ref("developers");

function onProductOpen(e: Event) {
  const detail = (e as CustomEvent).detail;
  if (detail?.value === "product") {
    activeTab.value = "developers";
  }
}

// ── Data ──────────────────────────────────────────────────────────────────────
const overviewLinks = [
  { title: "Quick Start", description: "Install and assemble your first component." },
  { title: "Accessibility", description: "Learn how we build accessible components." },
  { title: "Releases", description: "See what's new in the latest versions." },
  { title: "About", description: "Learn more about the project and our mission." },
];

const handbookLinks = [
  { title: "Styling", description: "Plain CSS, Tailwind, CSS-in-JS, or CSS Modules." },
  { title: "Animation", description: "CSS transitions, animations, or JS libraries." },
  { title: "Composition", description: "Replace and compose with your own components." },
];

const guideLinks = [
  {
    title: "Accessibility handbook",
    description: "A practical pass over focus order, semantics, and keyboard support.",
  },
  {
    title: "Composition handbook",
    description: "Learn when to wrap parts, share behavior, and expose flexible APIs.",
  },
  {
    title: "Styling handbook",
    description: "Apply tokens and state styles without fighting the underlying markup.",
  },
];

const audienceMenus = [
  {
    value: "developers",
    label: "Developers",
    hint: "Go from idea to UI faster.",
    title: "Build product UI without giving up control",
    description:
      "Start with accessible parts and shape them to your app instead of working around a preset design system.",
    links: [
      { title: "Quick start", description: "Install and get your first component on screen fast." },
      {
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
      { title: "Styling", description: "Map tokens and component states to your own CSS setup." },
      { title: "Accessibility", description: "Review keyboard support and semantic defaults." },
      { title: "Tooltip", description: "Set one clear pattern for lightweight help and hints." },
      { title: "Popover", description: "Handle richer anchored panels like menus and onboarding." },
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
        title: "Releases",
        description: "Track version changes and migration notes before upgrades.",
      },
      { title: "TypeScript", description: "See how the primitives type custom wrappers." },
      { title: "Forms", description: "Standardize validation and field patterns." },
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
        title: "Quick start",
        description: "Get the package installed and your first component working.",
      },
      { title: "Menu", description: "Add action menus with keyboard support already done." },
      {
        title: "Dialog",
        description: "Launch settings or upgrade flows without rebuilding focus management.",
      },
    ],
  },
];
</script>

<style scoped>
/* ── Root wrapper ── */
.nm-root {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  font-family: var(--vp-font-family-base);
  width: 100%;
}

.nm-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow: visible;
}

.nm-section-tag {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
  margin: 0;
}

/* ── Nav root — position:relative so panels anchor here ── */
.nm-nav {
  position: relative;
  display: block;
}

/* ── List ── */
.nm-list {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  gap: 0.125rem;
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* position:static → content anchors to .nm-nav, not the item */
.nm-item {
  position: static;
}

/* ── Trigger ── */
.nm-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.nm-trigger:hover {
  background: var(--vp-c-bg-soft);
}

.nm-trigger[aria-expanded="true"] {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.nm-trigger:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -1px;
}

.nm-plain-link[data-active] {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.nm-chevron {
  transition: transform 0.2s ease;
  flex-shrink: 0;
  opacity: 0.5;
}

.nm-trigger[aria-expanded="true"] .nm-chevron {
  transform: rotate(180deg);
  opacity: 1;
}

/* ── Content panel — anchored to .nm-nav ── */
.nm-content {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  box-shadow:
    0 6px 24px rgb(0 0 0 / 0.1),
    0 1px 4px rgb(0 0 0 / 0.06);
  padding: 0.5rem;
  z-index: 100;
  overflow: visible;
}

.nm-content[data-state="closed"] {
  display: none;
}
.nm-content[data-state="open"] {
  display: block;
}

.nm-content--flush {
  padding: 0;
  overflow: hidden;
}

/* ── Grid 2-col ── */
.nm-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.25rem;
  min-width: 400px;
}

/* ── List panel ── */
.nm-list-panel {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 260px;
}

.nm-panel-label {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
  padding: 0.25rem 0.625rem 0.125rem;
  margin: 0;
}

/* ── Link card ── */
.nm-link-card {
  display: flex;
  flex-direction: column;
  padding: 0.5625rem 0.75rem;
  border-radius: 7px;
  text-decoration: none;
  color: inherit;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
  transition: background-color 0.12s ease;
}

.nm-link-card:hover {
  background: var(--vp-c-bg-soft);
}

.nm-link-card:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.nm-link-title {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.125rem;
}

.nm-link-desc {
  display: block;
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
  line-height: 1.4;
}

/* ── Indicator ── */
.nm-indicator {
  position: absolute;
  bottom: -2px;
  height: 2px;
  background: var(--vp-c-brand-1);
  border-radius: 1px;
  pointer-events: none;
  transition:
    left 0.2s ease,
    width 0.2s ease;
}

.nm-indicator[data-state="hidden"] {
  opacity: 0;
}

/* ══════════════════════════════════════════════════════
   DEMO 2 — Nested submenu
   ══════════════════════════════════════════════════════ */

.nm-nested-wrapper {
  position: relative;
}

.nm-nested-btn {
  position: relative;
  padding-right: 2rem;
}

.nm-nested-arrow {
  position: absolute;
  top: 50%;
  right: 0.625rem;
  transform: translateY(-50%);
  opacity: 0.4;
  transition:
    opacity 0.12s ease,
    transform 0.12s ease;
}

.nm-nested-btn:hover .nm-nested-arrow,
.nm-nested-btn[aria-expanded="true"] .nm-nested-arrow {
  opacity: 1;
  transform: translateY(-50%) translateX(2px);
}

.nm-side-panel {
  position: absolute;
  top: 0;
  left: calc(100% + 0.5rem);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  box-shadow:
    0 6px 24px rgb(0 0 0 / 0.1),
    0 1px 4px rgb(0 0 0 / 0.06);
  z-index: 110;
  min-width: 240px;
  padding: 0.5rem;
}

/* ══════════════════════════════════════════════════════
   DEMO 3 — Nested inline submenus
   ══════════════════════════════════════════════════════ */

.nm-inline-sub {
  display: grid;
  grid-template-columns: 12rem minmax(0, 1fr);
  min-width: 560px;
  min-height: 240px;
  overflow: hidden;
  border-radius: 10px;
}

/* Sidebar */
.nm-sub-sidebar {
  list-style: none;
  margin: 0;
  padding: 0.625rem;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  background: var(--vp-c-bg-soft);
  border-right: 1px solid var(--vp-c-divider);
  overflow-y: auto;
}

.nm-sub-tab {
  /* no extra styles needed */
}

.nm-sub-tab-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1875rem;
  width: 100%;
  padding: 0.5625rem 0.75rem;
  border: none;
  border-radius: 7px;
  background: transparent;
  color: inherit;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.12s ease;
}

.nm-sub-tab-btn:hover {
  background: var(--vp-c-bg-mute);
}

.nm-sub-tab.is-active .nm-sub-tab-btn {
  background: var(--vp-c-bg);
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.08);
}

.nm-sub-tab-btn:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -1px;
}

.nm-sub-tab-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  line-height: 1.2;
}

.nm-sub-tab-hint {
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
  line-height: 1.35;
}

/* Viewport */
.nm-sub-viewport {
  padding: 1.25rem;
  overflow-y: auto;
  background: var(--vp-c-bg);
}

.nm-sub-panel {
  /* shown via v-show */
}

.nm-sub-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

.nm-sub-desc {
  margin: 0.375rem 0 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.nm-sub-links {
  list-style: none;
  padding: 0;
  margin: 0.625rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}
</style>
