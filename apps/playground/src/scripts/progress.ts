import { addLog } from "./utils";

export function initProgressDemo() {
  const prg = document.getElementById("prg-test") as any;
  const btnStart = document.getElementById("btn-prg-start");
  const btnReset = document.getElementById("btn-prg-reset");

  let interval: any = null;

  if (btnStart && prg) {
    btnStart.addEventListener("click", () => {
      if (interval) return;

      addLog("Iniciando simulación de progreso...");
      let val = 0;
      prg.value = val;

      interval = setInterval(() => {
        val += 5;
        prg.value = val;

        if (val >= 100) {
          clearInterval(interval);
          interval = null;
          addLog('<strong style="color: #10b981">¡Progreso completado!</strong>');
        }
      }, 100);
    });
  }

  if (btnReset && prg) {
    btnReset.addEventListener("click", () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
      prg.value = 0;
      addLog("Progreso reiniciado.");
    });
  }
}
