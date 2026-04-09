import { ComponentDemo } from "../types";
import "./slider.css";

export const sliderDemo: ComponentDemo = {
  title: "Slider primitive",
  description:
    "Control deslizante accesible con label y valor integrados, teclado, arrastrar, orientación vertical, paso personalizable y estados.",
  html: `
    <div class="slider-demo-root">

      <!-- 1. Con label y valor (horizontal) -->
      <div class="slider-demo-section">
        <span class="slider-demo-label">Label + valor en tiempo real</span>
        <hp-slider
          id="slider-basic"
          value="40" min="0" max="100" step="1"
          label="Volumen"
          show-value
          value-suffix="%"
        ></hp-slider>
      </div>

      <!-- 2. Con paso personalizado -->
      <div class="slider-demo-section">
        <span class="slider-demo-label">Paso de 10 — rango 0–200</span>
        <hp-slider
          id="slider-step"
          value="80" min="0" max="200" step="10"
          label="Balance"
          show-value
        ></hp-slider>
        <div class="slider-demo-meta">
          <span class="slider-marks">
            <span>0</span><span>50</span><span>100</span><span>150</span><span>200</span>
          </span>
        </div>
      </div>

      <!-- 3. Rango decimal -->
      <div class="slider-demo-section">
        <span class="slider-demo-label">Paso decimal — 0.1</span>
        <hp-slider
          id="slider-decimal"
          value="1.0" min="0" max="2" step="0.1"
          label="Opacidad"
          show-value
        ></hp-slider>
      </div>

      <!-- 4. Sin label (uso simple) -->
      <div class="slider-demo-section">
        <span class="slider-demo-label">Sin label (solo control)</span>
        <hp-slider id="slider-plain" value="55" min="0" max="100"></hp-slider>
        <div class="slider-demo-meta">
          <span>Valor: <code id="slider-plain-val">55</code></span>
        </div>
      </div>

      <!-- 5. Vertical -->
      <div class="slider-demo-section">
        <span class="slider-demo-label">Orientación vertical</span>
        <div class="slider-demo-row" style="align-items: flex-start; gap: 2rem;">
          <hp-slider
            id="slider-vert-vol"
            class="slider-vertical"
            orientation="vertical"
            value="60" min="0" max="100"
            label="Vol"
            show-value
            value-suffix="%"
          ></hp-slider>
          <hp-slider
            id="slider-vert-bass"
            class="slider-vertical"
            orientation="vertical"
            value="30" min="0" max="100"
            label="Bass"
            show-value
            value-suffix="%"
          ></hp-slider>
          <hp-slider
            id="slider-vert-treble"
            class="slider-vertical"
            orientation="vertical"
            value="80" min="0" max="100"
            label="Treble"
            show-value
            value-suffix="%"
          ></hp-slider>
        </div>
      </div>

      <!-- 6. Deshabilitado -->
      <div class="slider-demo-section">
        <span class="slider-demo-label">Deshabilitado</span>
        <hp-slider
          value="65" min="0" max="100"
          label="Brillo"
          show-value
          value-suffix="%"
          disabled
        ></hp-slider>
      </div>

    </div>
  `,
  init: () => {
    // Plain slider (sin show-value) — actualiza display externo
    const plain = document.getElementById("slider-plain") as HTMLElement | null;
    const plainVal = document.getElementById("slider-plain-val");
    plain?.addEventListener("hp-input", (e: Event) => {
      const { value } = (e as CustomEvent<{ value: number }>).detail;
      if (plainVal) plainVal.textContent = String(value);
    });
  },
};
