import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";

/**
 * Shell - Utility for rendering consistent component demos in the playground.
 */
export const Shell = {
  render(config: {
    title: string;
    description: string;
    html: string;
    footer?: string;
    init?: (container: HTMLElement) => void;
  }) {
    const viewport = document.getElementById("playground-viewport");
    const header = document.getElementById("comp-header");
    if (!viewport || !header) return;

    // 1. Render Header
    header.innerHTML = `
      <div class="comp-header">
        <h2 class="comp-title">${config.title}</h2>
        <span class="hp-status">Nuevo</span>
      </div>
    `;

    // 2. Render Main Demo Card
    viewport.innerHTML = `
      <p class="tagline" style="margin-bottom: 2rem; color: var(--text-secondary);">${config.description}</p>
      
      <section class="demo-card">
        <div class="demo-area" id="demo-area">
          ${config.html}
        </div>
        ${config.footer ? `<div class="card-footer">${config.footer}</div>` : ""}
      </section>

      <section class="code-section">
        <div class="code-header">
          <span class="code-label">HTML SOURCE</span>
          <button class="copy-btn" id="copy-code">Copiar</button>
        </div>
        <pre class="code-block h-full"><code class="language-markup" id="code-content"></code></pre>
      </section>
    `;

    // 3. Highlight Code
    const codeElement = document.getElementById("code-content");
    if (codeElement) {
      // Función para quitar los espacios comunes de la izquierda (dedent)
      const lines = config.html.split("\n");
      const minIndent = lines
        .filter((l) => l.trim().length > 0)
        .reduce((min, line) => {
          const match = line.match(/^(\s+)/);
          return match ? Math.min(min, match[1].length) : min;
        }, Infinity);

      const formattedHtml = lines
        .map((l) => l.substring(minIndent === Infinity ? 0 : minIndent))
        .join("\n")
        .trim();

      codeElement.textContent = formattedHtml;
      Prism.highlightElement(codeElement);
    }

    // 4. Setup Copy Button
    document.getElementById("copy-code")?.addEventListener("click", () => {
      navigator.clipboard.writeText(config.html);
      const btn = document.getElementById("copy-code") as HTMLButtonElement;
      btn.textContent = "¡Copiado!";
      setTimeout(() => (btn.textContent = "Copiar"), 2000);
    });

    // 5. Initialize Logic (if any)
    const demoArea = document.getElementById("demo-area");
    if (demoArea && config.init) {
      config.init(demoArea);
    }
  },
};
