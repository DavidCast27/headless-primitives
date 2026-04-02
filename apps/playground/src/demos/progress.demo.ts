import { ComponentDemo } from "../types";
import "./progress.css";

export const progressDemo: ComponentDemo = {
  title: "Progress primitive",
  description: "Indicador de carga que expone el porcentaje vía variables CSS.",
  html: `
    <div style="width: 100%; display: flex; flex-direction: column; gap: 2.5rem;">
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
          <span style="font-size: 0.85rem; font-weight: 500;">Dynamic progress</span>
          <span id="prg-val" style="font-size: 0.75rem; color: var(--primary-color);">0%</span>
        </div>
        <hp-progress id="prg-dyn" class="progress" value="0"></hp-progress>
        <div style="display: flex; gap: 12px; margin-top: 0.5rem;">
          <button id="btn-start" class="btn btn-primary" style="padding: 6px 12px; font-size: 0.75rem;">Simulate Load</button>
          <button id="btn-reset" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.75rem;">Reset</button>
        </div>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <span style="font-size: 0.85rem; font-weight: 500;">Indeterminate state</span>
        <hp-progress class="progress"></hp-progress>
      </div>
    </div>
  `,
  init: () => {
    const prg = document.getElementById("prg-dyn") as any;
    const prgVal = document.getElementById("prg-val");
    const btnStart = document.getElementById("btn-start");
    const btnReset = document.getElementById("btn-reset");
    let interval: any;

    btnStart?.addEventListener("click", () => {
      if (interval) clearInterval(interval);
      let val = 0;
      interval = setInterval(() => {
        val += 1;
        if (prg) prg.value = val;
        if (prgVal) prgVal.textContent = `${val}%`;
        if (val >= 100) clearInterval(interval);
      }, 40);
    });

    btnReset?.addEventListener("click", () => {
      if (interval) clearInterval(interval);
      if (prg) prg.value = 0;
      if (prgVal) prgVal.textContent = `0%`;
    });
  },
};
