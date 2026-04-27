import { ComponentDemo } from "../types";
import "../styles/carousel.css";

export const carouselDemo: ComponentDemo = {
  title: "Carousel primitive",
  description: "A slideshow component for cycling through elements—images or slides of text.",
  html: `
    <div class="demo-carousel-container">
      <hp-carousel label="Feature slides" loop autoplay interval="3000">
        <hp-carousel-content slot="content">
          <hp-carousel-item id="slide-1">
            <div class="demo-slide-content slide-1">
              <h3 class="slide-title">Unleash Power</h3>
              <p class="slide-desc">Performant components for modern web.</p>
            </div>
          </hp-carousel-item>
          <hp-carousel-item id="slide-2">
            <div class="demo-slide-content slide-2">
              <h3 class="slide-title">Headless Architecture</h3>
              <p class="slide-desc">Total style control with WAI-ARIA behavior.</p>
            </div>
          </hp-carousel-item>
          <hp-carousel-item id="slide-3">
            <div class="demo-slide-content slide-3">
              <h3 class="slide-title">Accessibility First</h3>
              <p class="slide-desc">Inclusive experiences for everyone.</p>
            </div>
          </hp-carousel-item>
        </hp-carousel-content>
        
        <hp-carousel-previous>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
        </hp-carousel-previous>
        
        <hp-carousel-next>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </hp-carousel-next>

        <div class="hp-carousel-pagination">
          <hp-carousel-dot index="0" active></hp-carousel-dot>
          <hp-carousel-dot index="1"></hp-carousel-dot>
          <hp-carousel-dot index="2"></hp-carousel-dot>
        </div>
      </hp-carousel>

      <div class="demo-carousel-controls">
        <button class="tbp-btn tbp-btn--secondary" id="play-btn">Reproducir</button>
        <button class="tbp-btn tbp-btn--secondary" id="pause-btn">Pausar</button>
      </div>
    </div>
  `,
  init: () => {
    const carousel = document.querySelector("hp-carousel") as any;
    const dots = document.querySelectorAll("hp-carousel-dot") as NodeListOf<any>;
    const playBtn = document.querySelector("#play-btn");
    const pauseBtn = document.querySelector("#pause-btn");

    carousel.addEventListener("hp-carousel-change", (e: any) => {
      const { activeIndex } = e.detail;
      dots.forEach((dot, index) => {
        if (index === activeIndex) dot.setAttribute("data-state", "active");
        else dot.setAttribute("data-state", "inactive");
      });
    });

    playBtn?.addEventListener("click", () => carousel.start());
    pauseBtn?.addEventListener("click", () => carousel.stop());
  },
};
