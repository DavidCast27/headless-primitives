import { ComponentDemo } from "../types";
import "./pin-input.css";

export const pinInputDemo: ComponentDemo = {
  title: "Pin Input primitive",
  description:
    "Entrada de PIN/OTP con slots individuales por carácter, auto-avance de foco, backspace, pegado y estados completo/error.",
  html: `
    <div class="pin-demo-root">

      <!-- 1. OTP Verification -->
      <div class="pin-demo-section">
        <span class="pin-demo-label">Verificación OTP — 6 dígitos</span>
        <p class="pin-demo-description">El PIN correcto es <code style="font-family:monospace;background:rgba(255,255,255,.06);padding:.1em .4em;border-radius:4px;">123456</code>. Auto-avance al escribir cada dígito.</p>
        <div class="pin-demo-row">
          <hp-pin-input id="pin-otp" length="6" type="numeric" placeholder="·"></hp-pin-input>
        </div>
        <div class="pin-demo-row">
          <button class="pin-verify-btn" id="pin-otp-btn" disabled>Verificar</button>
          <button class="pin-reset-btn" id="pin-otp-reset">Limpiar</button>
          <span class="pin-status" id="pin-otp-status"></span>
        </div>
      </div>

      <!-- 2. Live value display -->
      <div class="pin-demo-section">
        <span class="pin-demo-label">Valor en tiempo real — numérico</span>
        <p class="pin-demo-description">Escribe y observa cómo se actualiza el valor combinado instantáneamente.</p>
        <div class="pin-demo-row">
          <hp-pin-input id="pin-live" length="4" type="numeric"></hp-pin-input>
          <span class="pin-demo-value">Valor: <code id="pin-live-code">—</code></span>
        </div>
        <div class="pin-demo-row">
          <span class="pin-status pin-status--info visible" id="pin-live-hint">
            Intenta pegar <strong>1234</strong> directamente
          </span>
        </div>
      </div>

      <!-- 3. Alphanumeric invite code with separator -->
      <div class="pin-demo-section">
        <span class="pin-demo-label">Código de invitación — alfanumérico</span>
        <p class="pin-demo-description">Acepta letras y números. El separador es visual únicamente.</p>
        <div class="pin-demo-row">
          <hp-pin-input id="pin-invite-a" length="3" type="alphanumeric" placeholder="—"></hp-pin-input>
          <span class="pin-separator">–</span>
          <hp-pin-input id="pin-invite-b" length="3" type="alphanumeric" placeholder="—"></hp-pin-input>
        </div>
        <div class="pin-demo-row">
          <span class="pin-demo-value">Código: <code id="pin-invite-code">—</code></span>
        </div>
      </div>

      <!-- 4. Masked (password-style) -->
      <div class="pin-demo-section">
        <span class="pin-demo-label">PIN enmascarado</span>
        <p class="pin-demo-description">Los inputs usan <code style="font-family:monospace;background:rgba(255,255,255,.06);padding:.1em .4em;border-radius:4px;">type="password"</code> para ocultar los caracteres.</p>
        <div class="pin-demo-row">
          <hp-pin-input id="pin-masked" length="4" type="numeric" class="pin-masked" placeholder="·"></hp-pin-input>
        </div>
        <div class="pin-demo-row">
          <span class="pin-demo-value">Valor: <code id="pin-masked-code">—</code></span>
        </div>
      </div>

      <!-- 5. Disabled -->
      <div class="pin-demo-section">
        <span class="pin-demo-label">Deshabilitado</span>
        <p class="pin-demo-description">El componente ignora clicks y teclado cuando <code style="font-family:monospace;background:rgba(255,255,255,.06);padding:.1em .4em;border-radius:4px;">disabled</code>.</p>
        <div class="pin-demo-row">
          <hp-pin-input length="4" type="numeric" disabled placeholder="·"></hp-pin-input>
        </div>
      </div>

    </div>
  `,
  init: () => {
    /* ── 1. OTP Verification ── */
    const otpEl = document.getElementById("pin-otp") as HTMLElement | null;
    const otpBtn = document.getElementById("pin-otp-btn") as HTMLButtonElement | null;
    const otpReset = document.getElementById("pin-otp-reset") as HTMLButtonElement | null;
    const otpStatus = document.getElementById("pin-otp-status") as HTMLElement | null;
    const CORRECT_OTP = "123456";

    const setOtpStatus = (type: "success" | "error" | null, msg: string) => {
      if (!otpStatus) return;
      otpStatus.className = "pin-status";
      if (type) {
        otpStatus.classList.add(`pin-status--${type}`, "visible");
        otpStatus.textContent = msg;
      } else {
        otpStatus.textContent = "";
      }
    };

    otpEl?.addEventListener("hp-change", (e: Event) => {
      const { value } = (e as CustomEvent<{ value: string }>).detail;
      if (otpBtn) otpBtn.disabled = value.length < 6;
      if (value.length < 6) {
        setOtpStatus(null, "");
        otpEl.removeAttribute("data-pin-error");
      }
    });

    otpEl?.addEventListener("hp-complete", () => {
      if (otpBtn) otpBtn.disabled = false;
    });

    otpBtn?.addEventListener("click", () => {
      const value = (otpEl as any)?.value ?? "";
      if (value === CORRECT_OTP) {
        setOtpStatus("success", "✓ PIN correcto");
        otpEl?.removeAttribute("data-pin-error");
      } else {
        setOtpStatus("error", "✗ PIN incorrecto, intenta de nuevo");
        otpEl?.setAttribute("data-pin-error", "true");
        setTimeout(() => otpEl?.removeAttribute("data-pin-error"), 500);
      }
    });

    const resetOtp = () => {
      (otpEl as any)?.clear?.();
      otpEl?.removeAttribute("data-pin-error");
      if (otpBtn) otpBtn.disabled = true;
      setOtpStatus(null, "");
    };

    otpReset?.addEventListener("click", resetOtp);

    /* ── 2. Live value display ── */
    const liveEl = document.getElementById("pin-live") as HTMLElement | null;
    const liveCode = document.getElementById("pin-live-code") as HTMLElement | null;

    liveEl?.addEventListener("hp-change", (e: Event) => {
      const { value } = (e as CustomEvent<{ value: string }>).detail;
      if (liveCode) liveCode.textContent = value || "—";
    });

    liveEl?.addEventListener("hp-complete", (e: Event) => {
      const { value } = (e as CustomEvent<{ value: string }>).detail;
      if (liveCode) liveCode.textContent = value;
    });

    /* ── 3. Alphanumeric invite code ── */
    const inviteA = document.getElementById("pin-invite-a") as HTMLElement | null;
    const inviteB = document.getElementById("pin-invite-b") as HTMLElement | null;
    const inviteCode = document.getElementById("pin-invite-code") as HTMLElement | null;

    const updateInviteCode = () => {
      const a = (inviteA as any)?.value ?? "";
      const b = (inviteB as any)?.value ?? "";
      const combined = a && b ? `${a.toUpperCase()}-${b.toUpperCase()}` : `${a || "—"}-${b || "—"}`;
      if (inviteCode) inviteCode.textContent = combined;
    };

    // Auto-jump from first group to second when complete
    inviteA?.addEventListener("hp-complete", () => {
      (inviteB?.querySelector("input[data-hp-pin-slot]") as HTMLInputElement)?.focus();
      updateInviteCode();
    });
    inviteA?.addEventListener("hp-change", updateInviteCode);
    inviteB?.addEventListener("hp-change", updateInviteCode);

    /* ── 4. Masked ── */
    const maskedEl = document.getElementById("pin-masked") as HTMLElement | null;
    const maskedCode = document.getElementById("pin-masked-code") as HTMLElement | null;

    // Switch slots to type="password" after mount
    requestAnimationFrame(() => {
      maskedEl?.querySelectorAll("input[data-hp-pin-slot]").forEach((input) => {
        (input as HTMLInputElement).type = "password";
      });
    });

    maskedEl?.addEventListener("hp-change", (e: Event) => {
      const { value } = (e as CustomEvent<{ value: string }>).detail;
      if (maskedCode) maskedCode.textContent = value ? "•".repeat(value.length) : "—";
    });
  },
};
