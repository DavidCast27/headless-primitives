export function initLabelDemo() {
  const inputs = document.querySelectorAll("#label-demo input, #label-demo hp-switch");
  const logTerminal = document.querySelector(".terminal-log");

  const addLog = (msg: string) => {
    if (!logTerminal) return;
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement("div");
    entry.innerHTML = `<span style="color: var(--primary-color)">[${time}]</span> ${msg}`;
    logTerminal.prepend(entry);
  };

  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      addLog(`Elemento "${input.id}" recibió el foco vía Label.`);
    });
  });

  console.log("✔ Label demo initialized");
}
