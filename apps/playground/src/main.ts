import "@headless-primitives/button";
import "@headless-primitives/switch";
import "@headless-primitives/separator";

import { initButtonDemo } from "./scripts/button";
import { initSwitchDemo } from "./scripts/switch";
import { initSeparatorDemo } from "./scripts/separator";
import { addLog } from "./scripts/utils";

// Inicializar demos
initButtonDemo();
initSwitchDemo();
initSeparatorDemo();

// Iniciar log
addLog("Playground modular encendido. Workspace vinculado! 🚀");
