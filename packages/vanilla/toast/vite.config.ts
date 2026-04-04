import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "HeadlessToast",
      fileName: (format) => (format === "umd" ? "index.umd.cjs" : "index.js"),
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
  test: {
    environment: "happy-dom",
  },
});
