import { setRequestLocale } from "next-intl/server";
import { MenuFlotanteInferior } from "@/components/layout/MenuFlotanteInferior";
import { PiePagina } from "@/components/layout/PiePagina";
import { ContenedorLandingTopNotch } from "@/components/secciones/ContenedorLandingTopNotch";

interface PaginaPrincipalProps {
  params: Promise<{ locale: string }>;
}

/**
 * Página principal de Top-Notch sin barra superior (top bar),
 * con navegación concentrada en el Menú Flotante Inferior.
 */
export default async function PaginaPrincipal({ params }: PaginaPrincipalProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative flex min-h-screen flex-col">
      <main id="contenido-principal" className="flex-1">
        <ContenedorLandingTopNotch />
      </main>
      <PiePagina />
      <MenuFlotanteInferior />
    </div>
  );
}
