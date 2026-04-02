import '@headless-primitives/button';

const logList = document.getElementById('log-list');
const toggleBtn = document.getElementById('btn-toggle');
const comunBtn = document.getElementById('btn-comun');

function addLog(message: string) {
  if (!logList) return;
  const li = document.createElement('li');
  const time = new Date().toLocaleTimeString('es-ES');
  li.innerHTML = `<span style="color: #3b82f6">[${time}]</span> ${message}`;
  logList.prepend(li);
}

// Escuchar el evento especial configurado desde la raiz HeadlessPrimitives
if (toggleBtn) {
  toggleBtn.addEventListener('hp-change', (e: Event) => {
    const customEvent = e as CustomEvent<{ pressed: boolean }>;
    const newState = customEvent.detail.pressed ? '<strong style="color: #10b981">ACTIVADO</strong>' : '<strong style="color: #ef4444">DESACTIVADO</strong>';
    addLog(`El hp-button Toggle emitió un cambio dinámico hacia el estado: ${newState}`);
  });
}

// Un mero receptor de click en test
if (comunBtn) {
  comunBtn.addEventListener('click', () => {
    addLog(`El hp-button Básico recibió el clic con total normalidad.`);
  });
}

// Iniciar log
addLog('Playground encendido correctamente. Workspace vinculado! 🚀');
