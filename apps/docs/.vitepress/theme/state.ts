import { ref, watchEffect } from "vue";

export type StylePreference = "css" | "tailwind";

// El estado inicial intenta leer de localStorage si estamos en el cliente
const getInitialPreference = (): StylePreference => {
  if (typeof window === "undefined") return "css";
  const saved = localStorage.getItem("hp-style-preference");
  return (saved === "tailwind" ? "tailwind" : "css") as StylePreference;
};

export const stylePreference = ref<StylePreference>(getInitialPreference());

export function setStylePreference(pref: StylePreference) {
  stylePreference.value = pref;
  if (typeof window !== "undefined") {
    localStorage.setItem("hp-style-preference", pref);
  }
}
