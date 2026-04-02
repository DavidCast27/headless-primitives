import "./style.css";
import "@headless-primitives/button";
import "@headless-primitives/switch";
import "@headless-primitives/separator";
import "@headless-primitives/progress";
import "@headless-primitives/label";
import "@headless-primitives/avatar";
import "@headless-primitives/field";

import { initButtonDemo } from "./scripts/button";
import { initSwitchDemo } from "./scripts/switch";
import { initSeparatorDemo } from "./scripts/separator";
import { initProgressDemo } from "./scripts/progress";
import { initLabelDemo } from "./scripts/label";
import { initAvatarDemo } from "./scripts/avatar";
import { addLog } from "./scripts/utils";

// Inicializar demos
initButtonDemo();
initSwitchDemo();
initSeparatorDemo();
initProgressDemo();
initLabelDemo();
initAvatarDemo();

// Iniciar log
addLog("Playground modular encendido. Workspace vinculado! 🚀");
