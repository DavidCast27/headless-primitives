/**
 * verifyAriaContract — utilidad de desarrollo (Req 20)
 *
 * En modo producción (NODE_ENV === 'production') no hace nada.
 * Emite advertencias en consola si el elemento no cumple
 * el contrato ARIA esperado para ese componente.
 */

/**
 * @typedef {Object} AriaAttrSpec
 * @property {'state'|'context'} type
 * @property {string[]} [values]     - valores válidos (undefined = cualquier string)
 * @property {boolean}  [required]   - si debe estar siempre presente
 * @property {string}   [description]
 */

/** @type {Record<string, Record<string, AriaAttrSpec>>} */
const ARIA_CONTRACTS = {
  "hp-button": {
    "aria-disabled": { type: "state", values: ["true"] },
    "aria-pressed": { type: "state", values: ["true", "false"] },
    role: { type: "state", values: ["button"], required: true },
  },
  "hp-switch": {
    "aria-checked": { type: "state", values: ["true", "false"], required: true },
    "aria-disabled": { type: "state", values: ["true"] },
    role: { type: "state", values: ["switch"], required: true },
  },
  "hp-checkbox": {
    "aria-checked": { type: "state", values: ["true", "false", "mixed"], required: true },
    "aria-disabled": { type: "state", values: ["true"] },
    role: { type: "state", values: ["checkbox"], required: true },
  },
  "hp-radio": {
    "aria-checked": { type: "state", values: ["true", "false"], required: true },
    "aria-disabled": { type: "state", values: ["true"] },
    role: { type: "state", values: ["radio"], required: true },
  },
  "hp-radio-group": {
    role: { type: "state", values: ["radiogroup"], required: true },
  },
  "hp-toggle": {
    "aria-pressed": { type: "state", values: ["true", "false"], required: true },
    "aria-disabled": { type: "state", values: ["true"] },
  },
  "hp-collapsible-trigger": {
    "aria-expanded": { type: "state", values: ["true", "false"], required: true },
    "aria-controls": { type: "state", required: true },
  },
  "hp-accordion-trigger": {
    "aria-expanded": { type: "state", values: ["true", "false"], required: true },
    "aria-controls": { type: "state", required: true },
  },
  "hp-tab": {
    "aria-selected": { type: "state", values: ["true", "false"], required: true },
    "aria-controls": { type: "state", required: true },
    role: { type: "state", values: ["tab"], required: true },
  },
  "hp-tab-panel": {
    role: { type: "state", values: ["tabpanel"], required: true },
    "aria-labelledby": { type: "state", required: true },
  },
  "hp-popover-trigger": {
    "aria-expanded": { type: "state", values: ["true", "false"], required: true },
  },
  "hp-popover-content": {
    role: { type: "state", values: ["dialog"] },
    "aria-hidden": { type: "state", values: ["true", "false"] },
  },
  "hp-dialog-content": {
    role: { type: "state", values: ["dialog", "alertdialog"], required: true },
    "aria-modal": { type: "state", values: ["true"], required: true },
  },
  "hp-toast": {
    role: { type: "state", values: ["alert"], required: true },
    "aria-live": { type: "state", values: ["polite", "assertive"], required: true },
    "aria-atomic": { type: "state", values: ["true"], required: true },
  },
  "hp-separator": {
    role: { type: "state", values: ["separator"], required: true },
  },
  "hp-progress": {
    role: { type: "state", values: ["progressbar"], required: true },
    "aria-valuenow": { type: "state", required: true },
    "aria-valuemin": { type: "state", values: ["0"], required: true },
    "aria-valuemax": { type: "state", required: true },
  },
};

/** Atributos de contexto libre — el componente nunca debe sobreescribirlos (Req 21) */
const CONTEXT_ATTRS = ["aria-label", "aria-labelledby", "aria-describedby", "aria-details"];

/**
 * Verifica que el elemento cumple el contrato ARIA del componente.
 *
 * @param {Element} element - El elemento Custom Element a verificar
 * @param {string} componentName - Nombre del componente (ej. 'hp-checkbox')
 * @returns {boolean} true si el contrato se cumple
 */
export function verifyAriaContract(element, componentName) {
  // No-op en producción (Req 20.4)
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "production") {
    return true;
  }

  const contract = ARIA_CONTRACTS[componentName];
  if (!contract) {
    console.warn(
      `[hp-aria] No se encontró contrato ARIA para "${componentName}". ` +
        `Componentes disponibles: ${Object.keys(ARIA_CONTRACTS).join(", ")}`,
    );
    return false;
  }

  let valid = true;

  // Verificar atributos requeridos y valores válidos (Req 20.2, 20.3)
  for (const [attr, spec] of Object.entries(contract)) {
    const value = element.getAttribute(attr);

    if (spec.required && value === null) {
      console.warn(
        `[hp-aria] <${componentName}>: atributo requerido "${attr}" está ausente. ` +
          `Valores esperados: ${spec.values ? spec.values.join(" | ") : "cualquier string"}`,
      );
      valid = false;
      continue;
    }

    if (value !== null && spec.values && !spec.values.includes(value)) {
      console.warn(
        `[hp-aria] <${componentName}>: atributo "${attr}" tiene valor inválido "${value}". ` +
          `Valores esperados: ${spec.values.join(" | ")}`,
      );
      valid = false;
    }
  }

  return valid;
}

/**
 * Advierte si el Consumer ha definido atributos de contexto ARIA que el componente
 * podría estar sobreescribiendo internamente (Req 21.5).
 *
 * @param {Element} element
 * @param {string} componentName
 * @param {string} attr - El atributo de estado que el componente va a escribir
 */
export function warnIfContextAttrConflict(element, componentName, attr) {
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "production") {
    return;
  }

  if (CONTEXT_ATTRS.includes(attr)) {
    if (element.hasAttribute(attr)) {
      console.warn(
        `[hp-aria] <${componentName}>: El atributo "${attr}" es de contexto (ARIA_Context_Attribute) ` +
          `y está siendo gestionado internamente. El valor definido por el Consumer puede ser sobreescrito.`,
      );
    }
    return;
  }

  // Verificar si el Consumer definió un ARIA_State_Attribute que el componente gestiona
  const contract = ARIA_CONTRACTS[componentName];
  if (contract && contract[attr]?.type === "state" && element.hasAttribute(attr)) {
    // Ya tiene el atributo — advertir que será gestionado internamente
    const existingValue = element.getAttribute(attr);
    console.warn(
      `[hp-aria] <${componentName}>: El atributo de estado "${attr}" (valor actual: "${existingValue}") ` +
        `es gestionado internamente por el componente y puede ser sobreescrito. ` +
        `Si necesitas controlarlo manualmente, usa la API pública del componente.`,
    );
  }
}

/**
 * Retorna el contrato ARIA completo de un componente.
 *
 * @param {string} componentName
 * @returns {Record<string, AriaAttrSpec> | null}
 */
export function getAriaContract(componentName) {
  return ARIA_CONTRACTS[componentName] ?? null;
}
