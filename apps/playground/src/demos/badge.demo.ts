import { ComponentDemo } from "../types";
import "../styles/badge.css";

export const badgeDemo: ComponentDemo = {
  title: "Badge primitive",
  description: "Etiquetas compactas para estados, contadores y texto corto.",
  html: `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Variants -->
      <div>
        <p style="font-size: 0.8rem; color: var(--hp-text-secondary); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Variantes</p>
        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
          <hp-badge class="badge" variant="default">Default</hp-badge>
          <hp-badge class="badge" variant="success">Success</hp-badge>
          <hp-badge class="badge" variant="warning">Warning</hp-badge>
          <hp-badge class="badge" variant="danger">Danger</hp-badge>
          <hp-badge class="badge" variant="info">Info</hp-badge>
        </div>
      </div>

      <!-- Sizes -->
      <div>
        <p style="font-size: 0.8rem; color: var(--hp-text-secondary); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Tamaños</p>
        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
          <hp-badge class="badge" variant="info" size="sm">Small</hp-badge>
          <hp-badge class="badge" variant="info" size="md">Medium</hp-badge>
          <hp-badge class="badge" variant="info" size="lg">Large</hp-badge>
        </div>
      </div>

      <!-- Inline usage -->
      <div>
        <p style="font-size: 0.8rem; color: var(--hp-text-secondary); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Uso inline</p>
        <p style="font-size: 0.95rem; line-height: 1.8;">
          El componente
          <hp-badge class="badge" variant="success" size="sm">Nuevo</hp-badge>
          puede usarse dentro de un párrafo o encabezado.
          También puedes mostrar contadores
          <hp-badge class="badge" variant="danger" size="sm">3</hp-badge>
          de forma accesible.
        </p>
      </div>
    </div>
  `,
};
