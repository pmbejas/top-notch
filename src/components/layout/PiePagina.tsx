import { useTranslations } from "next-intl";
import { LogoStandOut } from "@/components/ui/LogoStandOut";

/**
 * Pie de página institucional de Top-Notch con margen inferior seguro (pb-32)
 * para evitar que el Menú Flotante Inferior superponga contenido.
 */
export function PiePagina() {
  const tPie = useTranslations("piePagina");
  const tAccesibilidad = useTranslations("accesibilidad");
  const anioActual = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-[#030726] pt-12 pb-32 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-md space-y-2">
            <LogoStandOut etiquetaAccesible={tAccesibilidad("logoStandOut")} />
            <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
              {tPie("descripcionMarca")}
            </p>
            <p className="font-mono text-[11px] text-cyan-300/90">
              {tPie("direccion")}
            </p>
          </div>

          <div className="flex flex-col items-start gap-1.5 text-xs text-slate-300 md:items-end">
            <p>
              © {anioActual} Top-Notch. {tPie("derechos")}
            </p>
            <p className="text-slate-400">
              {tPie("desarrolladoPor")}{" "}
              <a
                href="https://pablobejas.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-cyan-300 underline decoration-cyan-400/40 underline-offset-4 transition-colors hover:text-amber-300"
              >
                Pablo Bejas
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
