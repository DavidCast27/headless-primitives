import { ComponentDemo } from "../types";
import "../styles/fieldset.css";

export const fieldsetDemo: ComponentDemo = {
  title: "Fieldset primitive",
  description:
    "Agrupa controles de formulario relacionados con una leyenda accesible y propagación de disabled.",
  html: `
    <div class="demo-fieldset">
      <button class="toggle-btn" id="fieldset-toggle" type="button">
        Toggle disabled
      </button>

      <hp-fieldset id="demo-fieldset">
        <hp-fieldset-legend>Información de contacto</hp-fieldset-legend>

        <div class="field-row">
          <label for="fs-name">Nombre</label>
          <input id="fs-name" type="text" placeholder="Tu nombre" />
        </div>

        <div class="field-row">
          <label for="fs-email">Correo electrónico</label>
          <input id="fs-email" type="email" placeholder="correo@ejemplo.com" />
        </div>

        <div class="field-row">
          <label for="fs-country">País</label>
          <select id="fs-country">
            <option value="">Selecciona un país</option>
            <option value="mx">México</option>
            <option value="es">España</option>
            <option value="ar">Argentina</option>
          </select>
        </div>

        <div class="aria-checkbox" role="checkbox" aria-checked="false" tabindex="0">
          <span class="aria-checkbox-box"></span>
          <span>Acepto los términos y condiciones</span>
        </div>

        <button type="submit">Enviar</button>
      </hp-fieldset>
    </div>
  `,
  init: () => {
    const toggleBtn = document.getElementById("fieldset-toggle");
    const fieldset = document.getElementById("demo-fieldset") as any;

    if (toggleBtn && fieldset) {
      toggleBtn.addEventListener("click", () => {
        fieldset.disabled = !fieldset.disabled;
        toggleBtn.textContent = fieldset.disabled ? "Enable fieldset" : "Disable fieldset";
      });
    }
  },
};
