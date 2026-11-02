import { getRequestConfig } from "next-intl/server";
import { routing, type IdiomaSoportado } from "./routing";
import mensajesEs from "../messages/es.json";

function esIdiomaValido(valor: string | undefined): valor is IdiomaSoportado {
  return (
    typeof valor === "string" &&
    (routing.locales as readonly string[]).includes(valor)
  );
}

export default getRequestConfig(async ({ requestLocale }) => {
  const solicitado = await requestLocale;
  const locale: IdiomaSoportado = esIdiomaValido(solicitado)
    ? solicitado
    : routing.defaultLocale;

  const moduloIdioma = (await import(`../messages/${locale}.json`)) as {
    default: typeof mensajesEs;
  };

  return {
    locale,
    messages: {
      ...mensajesEs,
      ...moduloIdioma.default,
    },
  };
});
