import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { redwood } from "rwsdk/vite";
import { defineConfig } from "vite";
import inspect from "vite-plugin-inspect";

export default defineConfig({
  environments: {
    ssr: {},
  },
  plugins: [inspect(), redwood(), tailwindcss()],
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "./src/"),
    },
  },
});
