import { HeadlessProgress } from "./progress";

export * from "./progress";
export * from "./types";

if (typeof window !== "undefined" && !customElements.get("hp-progress")) {
  customElements.define("hp-progress", HeadlessProgress);
}
