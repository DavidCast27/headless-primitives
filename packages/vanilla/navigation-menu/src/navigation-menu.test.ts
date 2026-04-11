import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./index";
import type { NavigationMenu } from "./navigation-menu";
import type { NavigationMenuItem } from "./navigation-menu";
import type { NavigationMenuTrigger } from "./navigation-menu";
import type { NavigationMenuContent } from "./navigation-menu";
import type { NavigationMenuLink } from "./navigation-menu";

// Helper to build a full navigation menu DOM structure
function buildNav(items: Array<{ value: string; label: string }> = []): NavigationMenu {
  const nav = document.createElement("hp-navigation-menu") as NavigationMenu;
  const list = document.createElement("hp-navigation-menu-list");

  for (const { value, label } of items) {
    const item = document.createElement("hp-navigation-menu-item") as NavigationMenuItem;
    item.value = value;

    const trigger = document.createElement("hp-navigation-menu-trigger") as NavigationMenuTrigger;
    trigger.textContent = label;

    const content = document.createElement("hp-navigation-menu-content") as NavigationMenuContent;
    content.textContent = `Content for ${label}`;

    item.appendChild(trigger);
    item.appendChild(content);
    list.appendChild(item);
  }

  nav.appendChild(list);
  document.body.appendChild(nav);
  return nav;
}

describe("NavigationMenu", () => {
  let nav: NavigationMenu;

  beforeEach(() => {
    nav = buildNav([
      { value: "products", label: "Products" },
      { value: "solutions", label: "Solutions" },
      { value: "about", label: "About" },
    ]);
  });

  afterEach(() => {
    nav.remove();
  });

  it("sets data-hp-component on root", () => {
    expect(nav.getAttribute("data-hp-component")).toBe("navigation-menu");
  });

  it("sets role=navigation on root", () => {
    expect(nav.getAttribute("role")).toBe("navigation");
  });

  it("sets aria-label on root", () => {
    expect(nav.getAttribute("aria-label")).toBeTruthy();
  });

  it("list sets role=menubar", () => {
    const list = nav.querySelector("hp-navigation-menu-list");
    expect(list?.getAttribute("role")).toBe("menubar");
  });

  it("list sets aria-orientation=horizontal", () => {
    const list = nav.querySelector("hp-navigation-menu-list");
    expect(list?.getAttribute("aria-orientation")).toBe("horizontal");
  });

  it("items set role=none", () => {
    const items = nav.querySelectorAll("hp-navigation-menu-item");
    for (const item of items) {
      expect(item.getAttribute("role")).toBe("none");
    }
  });

  it("items set data-hp-component=navigation-menu-item", () => {
    const items = nav.querySelectorAll("hp-navigation-menu-item");
    for (const item of items) {
      expect(item.getAttribute("data-hp-component")).toBe("navigation-menu-item");
    }
  });

  it("triggers set role=button", () => {
    const triggers = nav.querySelectorAll("hp-navigation-menu-trigger");
    for (const trigger of triggers) {
      expect(trigger.getAttribute("role")).toBe("button");
    }
  });

  it("triggers set aria-haspopup=true", () => {
    const triggers = nav.querySelectorAll("hp-navigation-menu-trigger");
    for (const trigger of triggers) {
      expect(trigger.getAttribute("aria-haspopup")).toBe("true");
    }
  });

  it("triggers set aria-expanded=false initially", () => {
    const triggers = nav.querySelectorAll("hp-navigation-menu-trigger");
    for (const trigger of triggers) {
      expect(trigger.getAttribute("aria-expanded")).toBe("false");
    }
  });

  it("contents set role=region", () => {
    const contents = nav.querySelectorAll("hp-navigation-menu-content");
    for (const content of contents) {
      expect(content.getAttribute("role")).toBe("region");
    }
  });

  it("contents set data-state=closed initially", () => {
    const contents = nav.querySelectorAll("hp-navigation-menu-content");
    for (const content of contents) {
      expect(content.getAttribute("data-state")).toBe("closed");
    }
  });

  it("contents set aria-hidden=true initially", () => {
    const contents = nav.querySelectorAll("hp-navigation-menu-content");
    for (const content of contents) {
      expect(content.getAttribute("aria-hidden")).toBe("true");
    }
  });

  it("value property is empty string initially", () => {
    expect(nav.value).toBe("");
  });
});

describe("NavigationMenu open/close", () => {
  let nav: NavigationMenu;

  beforeEach(() => {
    nav = buildNav([
      { value: "products", label: "Products" },
      { value: "solutions", label: "Solutions" },
    ]);
  });

  afterEach(() => {
    nav.remove();
  });

  it("open() sets value and updates state", () => {
    nav.open("products");
    expect(nav.value).toBe("products");

    const items = nav.querySelectorAll("hp-navigation-menu-item");
    const firstItem = items[0];
    const firstTrigger = firstItem.querySelector("hp-navigation-menu-trigger");
    const firstContent = firstItem.querySelector("hp-navigation-menu-content");

    expect(firstTrigger?.getAttribute("aria-expanded")).toBe("true");
    expect(firstContent?.getAttribute("data-state")).toBe("open");
    expect(firstContent?.getAttribute("aria-hidden")).toBe("false");
  });

  it("close() clears value and reverts state", () => {
    nav.open("products");
    nav.close();
    expect(nav.value).toBe("");

    const contents = nav.querySelectorAll("hp-navigation-menu-content");
    for (const content of contents) {
      expect(content.getAttribute("data-state")).toBe("closed");
    }
  });

  it("toggle() opens closed item", () => {
    nav.toggle("products");
    expect(nav.value).toBe("products");
  });

  it("toggle() closes open item", () => {
    nav.open("products");
    nav.toggle("products");
    expect(nav.value).toBe("");
  });

  it("only one content panel open at a time", () => {
    nav.open("products");
    nav.open("solutions");

    expect(nav.value).toBe("solutions");

    const items = Array.from(nav.querySelectorAll("hp-navigation-menu-item"));
    const productsItem = items[0];
    const solutionsItem = items[1];

    const productsContent = productsItem.querySelector("hp-navigation-menu-content");
    const solutionsContent = solutionsItem.querySelector("hp-navigation-menu-content");

    expect(productsContent?.getAttribute("data-state")).toBe("closed");
    expect(solutionsContent?.getAttribute("data-state")).toBe("open");
  });

  it("trigger click opens content", () => {
    const items = nav.querySelectorAll("hp-navigation-menu-item");
    const firstTrigger = items[0].querySelector(
      "hp-navigation-menu-trigger",
    ) as NavigationMenuTrigger;
    firstTrigger.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(nav.value).toBe("products");
  });

  it("trigger click closes already open content", () => {
    nav.open("products");
    const items = nav.querySelectorAll("hp-navigation-menu-item");
    const firstTrigger = items[0].querySelector(
      "hp-navigation-menu-trigger",
    ) as NavigationMenuTrigger;
    firstTrigger.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(nav.value).toBe("");
  });

  it("clicking different trigger switches panel", () => {
    nav.open("products");
    const items = nav.querySelectorAll("hp-navigation-menu-item");
    const secondTrigger = items[1].querySelector(
      "hp-navigation-menu-trigger",
    ) as NavigationMenuTrigger;
    secondTrigger.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(nav.value).toBe("solutions");
  });
});

describe("NavigationMenu click outside", () => {
  let nav: NavigationMenu;

  beforeEach(() => {
    nav = buildNav([{ value: "products", label: "Products" }]);
  });

  afterEach(() => {
    nav.remove();
  });

  it("closes when clicking outside", () => {
    nav.open("products");
    expect(nav.value).toBe("products");

    const outside = document.createElement("div");
    document.body.appendChild(outside);
    outside.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(nav.value).toBe("");
    outside.remove();
  });
});

describe("NavigationMenu keyboard navigation", () => {
  let nav: NavigationMenu;

  beforeEach(() => {
    nav = buildNav([
      { value: "products", label: "Products" },
      { value: "solutions", label: "Solutions" },
      { value: "about", label: "About" },
    ]);
  });

  afterEach(() => {
    nav.remove();
  });

  it("Escape closes open content", () => {
    nav.open("products");
    const items = nav.querySelectorAll("hp-navigation-menu-item");
    const firstTrigger = items[0].querySelector(
      "hp-navigation-menu-trigger",
    ) as NavigationMenuTrigger;
    firstTrigger.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(nav.value).toBe("");
  });

  it("Enter on trigger opens content", () => {
    const items = nav.querySelectorAll("hp-navigation-menu-item");
    const firstTrigger = items[0].querySelector(
      "hp-navigation-menu-trigger",
    ) as NavigationMenuTrigger;
    firstTrigger.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    expect(nav.value).toBe("products");
  });

  it("Space on trigger opens content", () => {
    const items = nav.querySelectorAll("hp-navigation-menu-item");
    const firstTrigger = items[0].querySelector(
      "hp-navigation-menu-trigger",
    ) as NavigationMenuTrigger;
    firstTrigger.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
    expect(nav.value).toBe("products");
  });

  it("Tab on trigger closes open content", () => {
    nav.open("products");
    const items = nav.querySelectorAll("hp-navigation-menu-item");
    const firstTrigger = items[0].querySelector(
      "hp-navigation-menu-trigger",
    ) as NavigationMenuTrigger;
    firstTrigger.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true }));
    expect(nav.value).toBe("");
  });

  it("global Escape closes open content", () => {
    nav.open("products");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(nav.value).toBe("");
  });
});

describe("NavigationMenu events", () => {
  let nav: NavigationMenu;

  beforeEach(() => {
    nav = buildNav([
      { value: "products", label: "Products" },
      { value: "solutions", label: "Solutions" },
    ]);
  });

  afterEach(() => {
    nav.remove();
  });

  it("emits hp-open when opening", () => {
    let detail: unknown = null;
    nav.addEventListener("hp-open", (e: Event) => {
      detail = (e as CustomEvent).detail;
    });
    nav.open("products");
    expect(detail).toEqual({ value: "products" });
  });

  it("emits hp-close when closing", () => {
    nav.open("products");
    let detail: unknown = null;
    nav.addEventListener("hp-close", (e: Event) => {
      detail = (e as CustomEvent).detail;
    });
    nav.close();
    expect(detail).toEqual({ value: "products" });
  });

  it("emits hp-close for previous item when switching", () => {
    nav.open("products");
    let closedValue: string | null = null;
    nav.addEventListener("hp-close", (e: Event) => {
      closedValue = ((e as CustomEvent).detail as { value: string }).value;
    });
    nav.open("solutions");
    expect(closedValue).toBe("products");
  });
});

describe("NavigationMenuLink", () => {
  let link: NavigationMenuLink;

  beforeEach(() => {
    link = document.createElement("hp-navigation-menu-link") as NavigationMenuLink;
    document.body.appendChild(link);
  });

  afterEach(() => {
    link.remove();
  });

  it("sets data-hp-component", () => {
    expect(link.getAttribute("data-hp-component")).toBe("navigation-menu-link");
  });

  it("sets tabindex=0 by default", () => {
    expect(link.getAttribute("tabindex")).toBe("0");
  });

  it("active=true sets data-active and aria-current=page", () => {
    link.active = true;
    expect(link.hasAttribute("data-active")).toBe(true);
    expect(link.getAttribute("aria-current")).toBe("page");
  });

  it("active=false removes data-active and aria-current", () => {
    link.active = true;
    link.active = false;
    expect(link.hasAttribute("data-active")).toBe(false);
    expect(link.hasAttribute("aria-current")).toBe(false);
  });
});

describe("NavigationMenuIndicator", () => {
  let indicator: Element;

  beforeEach(() => {
    indicator = document.createElement("hp-navigation-menu-indicator");
    document.body.appendChild(indicator);
  });

  afterEach(() => {
    indicator.remove();
  });

  it("sets data-hp-component", () => {
    expect(indicator.getAttribute("data-hp-component")).toBe("navigation-menu-indicator");
  });

  it("sets aria-hidden=true", () => {
    expect(indicator.getAttribute("aria-hidden")).toBe("true");
  });
});
