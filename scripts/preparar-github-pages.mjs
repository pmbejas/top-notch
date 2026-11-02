import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const directorioRaiz = path.resolve(import.meta.dirname, "..");
const directorioOut = path.join(directorioRaiz, "out");
const rutaBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "/top-notch";

console.log(`Compilando sitio estático para GitHub Pages (basePath: ${rutaBase})...`);

execSync("npx next build", {
  cwd: directorioRaiz,
  stdio: "inherit",
  env: {
    ...process.env,
    GITHUB_PAGES: "true",
    NEXT_PUBLIC_BASE_PATH: rutaBase,
  },
});

const origenIndexEs = path.join(directorioOut, "es", "index.html");
const destinoIndexRaiz = path.join(directorioOut, "index.html");
const destino404 = path.join(directorioOut, "404.html");
const archivoNoJekyll = path.join(directorioOut, ".nojekyll");

if (fs.existsSync(origenIndexEs)) {
  fs.copyFileSync(origenIndexEs, destinoIndexRaiz);
  fs.copyFileSync(origenIndexEs, destino404);
  console.log("✔ Se generó out/index.html y out/404.html a partir de out/es/index.html");
}

fs.writeFileSync(archivoNoJekyll, "", "utf8");
console.log("✔ Se creó out/.nojekyll para habilitar los recursos _next/ en GitHub Pages.");
