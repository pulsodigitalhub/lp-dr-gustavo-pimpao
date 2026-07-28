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
      const staticEntries = ["img", "videos", "favicon.svg", "icons.svg", "apple-touch-icon.png"];

      for (const entry of staticEntries) {
        const source = path.join(rootDir, entry);
        const target = path.join(distDir, entry);

        if (!fs.existsSync(source)) continue;

        fs.cpSync(source, target, {
          recursive: true,
        });
      }

      const routeEntries = ["infiltracao", "infiltracao-joelho", "infiltracao-ombro", "medico-especialista-joelho", "medico-especialista-coluna", "medico-especialista-ombro", "medico-especialista-quadril", "medico-especialista-mao-punho", "medico-especialista-pe-tornozelo", "ortopedista-aguas-claras", "ortopedista-asa-sul", "ortopedista-taguatinga", "convenios-meta", "convenio-meta", "meta-convenios"];
      const indexFile = path.join(distDir, "index.html");

      if (fs.existsSync(indexFile)) {
        for (const route of routeEntries) {
          const routeDir = path.join(distDir, route);
          fs.mkdirSync(routeDir, { recursive: true });
          fs.copyFileSync(indexFile, path.join(routeDir, "index.html"));

          for (const entry of ["assets", ...staticEntries]) {
            const source = path.join(distDir, entry);
            const target = path.join(routeDir, entry);

            if (!fs.existsSync(source)) continue;

            fs.cpSync(source, target, {
              recursive: true,
            });
          }
        }
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
