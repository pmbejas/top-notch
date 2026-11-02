import { useTranslations } from "next-intl";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { LogoStandOut } from "@/components/ui/LogoStandOut";

/**
 * Cabecera superior liviana de identidad institucional.
 * La navegación principal del sitio reside en el Menú Flotante Inferior (Dock).
 */
export function CabeceraSuperior() {
  const tCabecera = useTranslations("cabecera");
  const tAccesibilidad = useTranslations("accesibilidad");

  return (
    <header className="relative z-30 w-full border-b border-white/10 bg-[#040B35]/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          className="rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
        >
          <LogoStandOut etiquetaAccesible={tAccesibilidad("logoStandOut")} />
        </a>

        <div className="hidden items-center gap-3 md:flex">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-[#07124A]/80 px-4 py-1.5 text-xs font-medium text-slate-200">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
            <span>{tCabecera("instituto")}</span>
            <span className="text-cyan-400/60">•</span>
            <span className="font-mono text-cyan-300">
              {tCabecera("programa")}
            </span>
          </div>
        </div>

        <a
          href="#diagnostico"
          className="inline-flex items-center gap-2 rounded-full border border-amber-400/45 bg-gradient-to-r from-[#FF8A00]/20 to-[#F97316]/30 px-4 py-2 text-xs font-semibold text-amber-200 transition-all duration-200 hover:border-amber-300 hover:bg-amber-500/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 sm:text-sm"
        >
          <span>{tCabecera("agendarCta")}</span>
          <ArrowUpRight className="h-4 w-4 text-amber-300" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
