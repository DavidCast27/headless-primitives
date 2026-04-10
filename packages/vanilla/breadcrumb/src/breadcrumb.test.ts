import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "./index";
import type {
  HeadlessBreadcrumb,
  HeadlessBreadcrumbLink,
  HeadlessBreadcrumbPage,
} from "./breadcrumb";

describe("Breadcrumb", () => {
  let breadcrumb: HeadlessBreadcrumb;

  beforeEach(() => {
    breadcrumb = document.createElement("hp-breadcrumb") as HeadlessBreadcrumb;
    document.body.appendChild(breadcrumb);
  });

  afterEach(() => {
    breadcrumb.remove();
  });

  it("should have correct data-hp-component attribute", () => {
    expect(breadcrumb.getAttribute("data-hp-component")).toBe("breadcrumb");
  });

  it("should have navigation role by default", () => {
    expect(breadcrumb.getAttribute("role")).toBe("navigation");
  });

  it("should have default aria-label", () => {
    expect(breadcrumb.getAttribute("aria-label")).toBe("Breadcrumb");
  });

  it("should update aria-label when property changes", async () => {
    breadcrumb.label = "Custom Label";
    // We use requestAnimationFrame in connectedCallback, and Lit updates are async.
    // In happy-dom with our _sync pattern, it should be sync if we call _sync in setter.
    expect(breadcrumb.getAttribute("aria-label")).toBe("Custom Label");
  });
});

describe("BreadcrumbLink", () => {
  let link: HeadlessBreadcrumbLink;

  beforeEach(() => {
    link = document.createElement("hp-breadcrumb-link") as HeadlessBreadcrumbLink;
    document.body.appendChild(link);
  });

  afterEach(() => {
    link.remove();
  });

  it("should have role link", () => {
    expect(link.getAttribute("role")).toBe("link");
  });

  it("should have tabindex 0 if href is provided", () => {
    link.href = "/home";
    expect(link.getAttribute("tabindex")).toBe("0");
  });

  it("should not have tabindex if href is missing", () => {
    expect(link.hasAttribute("tabindex")).toBe(false);
  });
});

describe("BreadcrumbPage", () => {
  let page: HeadlessBreadcrumbPage;

  beforeEach(() => {
    page = document.createElement("hp-breadcrumb-page") as HeadlessBreadcrumbPage;
    document.body.appendChild(page);
  });

  afterEach(() => {
    page.remove();
  });

  it("should have aria-current='page'", () => {
    expect(page.getAttribute("aria-current")).toBe("page");
  });
});
