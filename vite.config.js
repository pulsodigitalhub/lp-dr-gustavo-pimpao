import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function copyStaticAssets() {
  return {
    name: "copy-static-assets",
    closeBundle() {
      const rootDir = process.cwd();
      const distDir = path.join(rootDir, "dist");
      const staticEntries = ["img", "favicon.svg", "icons.svg", "apple-touch-icon.png"];

      for (const entry of staticEntries) {
        const source = path.join(rootDir, entry);
        const target = path.join(distDir, entry);

        if (!fs.existsSync(source)) continue;

        fs.cpSync(source, target, {
          recursive: true,
        });
      }
    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), copyStaticAssets()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
});
