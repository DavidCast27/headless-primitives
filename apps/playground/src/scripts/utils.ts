export function addLog(message: string) {
  const logList = document.getElementById("log-list");
  if (!logList) return;
  const li = document.createElement("li");
  const time = new Date().toLocaleTimeString("es-ES");
  li.innerHTML = `<span style="color: #3b82f6">[${time}]</span> ${message}`;
  logList.prepend(li);
}
