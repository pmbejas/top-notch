import fs from "node:fs";
import path from "node:path";

const RUTA_MENSAJES = path.resolve(process.cwd(), "src/messages");
const IDIOMAS = ["es", "en", "pt"];

function aplanarClaves(objeto, prefijo = "") {
  const resultado = {};
  for (const [clave, valor] of Object.entries(objeto)) {
    const rutaActual = prefijo ? `${prefijo}.${clave}` : clave;
    if (valor && typeof valor === "object" && !Array.isArray(valor)) {
      Object.assign(resultado, aplanarClaves(valor, rutaActual));
    } else {
      resultado[rutaActual] = valor;
    }
  }
  return resultado;
}

const diccionariosPorIdioma = {};

for (const idioma of IDIOMAS) {
  const rutaArchivo = path.join(RUTA_MENSAJES, `${idioma}.json`);
  const contenido = JSON.parse(fs.readFileSync(rutaArchivo, "utf-8"));
  diccionariosPorIdioma[idioma] = aplanarClaves(contenido);
}

const clavesBase = Object.keys(diccionariosPorIdioma.es);
let huboErrores = false;

for (const idioma of IDIOMAS) {
  const mapaActual = diccionariosPorIdioma[idioma];
  for (const clave of clavesBase) {
    if (!(clave in mapaActual)) {
      console.error(`[i18n] Falta la clave "${clave}" en ${idioma}.json`);
      huboErrores = true;
    } else if (
      typeof mapaActual[clave] !== "string" ||
      mapaActual[clave].trim().length === 0
    ) {
      console.error(`[i18n] Valor vacío para "${clave}" en ${idioma}.json`);
      huboErrores = true;
    }
  }

  for (const claveExtra of Object.keys(mapaActual)) {
    if (!clavesBase.includes(claveExtra)) {
      console.error(
        `[i18n] Clave sobrante "${claveExtra}" en ${idioma}.json que no existe en es.json`
      );
      huboErrores = true;
    }
  }
}

if (huboErrores) {
  process.exit(1);
}

console.log(
  `✓ Verificación i18n exitosa: ${clavesBase.length} claves sincronizadas en ES, EN y PT.`
);
