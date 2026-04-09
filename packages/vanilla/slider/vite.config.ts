import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "HeadlessPrimitivesSlider",
      fileName: "index",
    },
    target: "esnext",
  },
  test: {
    environment: "happy-dom",
  },
});
