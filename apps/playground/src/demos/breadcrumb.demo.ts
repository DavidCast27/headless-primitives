import { ComponentDemo } from "../types";
import "./breadcrumb.css";

export const breadcrumbDemo: ComponentDemo = {
  title: "Breadcrumb primitive",
  description: "A navigation aid that helps users keep track of their location within a website.",
  html: `
    <div style="padding: 2rem;">
      <hp-breadcrumb>
        <hp-breadcrumb-list style="display: flex; list-style: none; padding: 0; margin: 0; gap: 0.5rem; align-items: center;">
          <hp-breadcrumb-item style="display: flex; align-items: center; gap: 0.5rem;">
            <hp-breadcrumb-link href="/">Home</hp-breadcrumb-link>
            <hp-breadcrumb-separator aria-hidden="true">/</hp-breadcrumb-separator>
          </hp-breadcrumb-item>
          
          <hp-breadcrumb-item style="display: flex; align-items: center; gap: 0.5rem;">
            <hp-breadcrumb-link href="/components">Components</hp-breadcrumb-link>
            <hp-breadcrumb-separator aria-hidden="true">/</hp-breadcrumb-separator>
          </hp-breadcrumb-item>
          
          <hp-breadcrumb-item style="display: flex; align-items: center; gap: 0.5rem;">
            <hp-breadcrumb-ellipsis>...</hp-breadcrumb-ellipsis>
            <hp-breadcrumb-separator aria-hidden="true">/</hp-breadcrumb-separator>
          </hp-breadcrumb-item>
          
          <hp-breadcrumb-item style="display: flex; align-items: center; gap: 0.5rem;">
            <hp-breadcrumb-page>Breadcrumb</hp-breadcrumb-page>
          </hp-breadcrumb-item>
        </hp-breadcrumb-list>
      </hp-breadcrumb>

      <style>
        hp-breadcrumb-link {
          color: #2563eb;
          text-decoration: none;
          cursor: pointer;
        }
        hp-breadcrumb-link:hover {
          text-decoration: underline;
        }
        hp-breadcrumb-page {
          color: #64748b;
          font-weight: 500;
        }
        hp-breadcrumb-separator {
          color: #94a3b8;
        }
        hp-breadcrumb-ellipsis {
          color: #94a3b8;
          cursor: default;
        }
      </style>
    </div>
  `,
  init: () => {
    // Basic JS logic if needed
  },
};
