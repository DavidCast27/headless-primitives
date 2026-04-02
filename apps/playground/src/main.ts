import "./style.css";
import "@headless-primitives/button";
import "@headless-primitives/switch";

import { initButtonDemo } from "./scripts/button";
import { initSwitchDemo } from "./scripts/switch";
import { addLog } from "./scripts/utils";

// Inicializar demos
initButtonDemo();
initSwitchDemo();

// Iniciar log
addLog("Playground modular encendido. Workspace vinculado! 🚀");
