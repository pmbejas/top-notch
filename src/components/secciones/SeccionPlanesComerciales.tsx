import { useTranslations } from "next-intl";
import { Check, Crown, Sparkles, Users } from "lucide-react";
import { LISTA_PLANES_COMERCIALES } from "@/data/datosPrograma";
import type { IdentificadorPlan } from "@/types/programa";
import { AnimacionAparicion } from "@/components/ui/AnimacionAparicion";
import { DivisorOnda } from "@/components/ui/DivisorOnda";
import { cn } from "@/lib/cn";

interface SeccionPlanesComercialesProps {
  alElegirPlan?: (planId: IdentificadorPlan) => void;
}

/**
 * Sección Propuesta Comercial en 3 Niveles (Essential, Professional, Executive)
 * con diseño limpio y animaciones continuas al hacer scroll.
 */
export function SeccionPlanesComerciales({
  alElegirPlan,
}: SeccionPlanesComercialesProps) {
  const tPlanes = useTranslations("planes");

  const estilosPorPlan = {
    cian: {
      tarjeta: "tarjeta-vibrante-perla border border-slate-200/90 text-[#040B35]",
      icono: Users,
      colorIcono: "bg-gradient-to-br from-[#FF5E3A] to-[#FF8A00] text-white",
      colorModalidad: "text-slate-600",
      colorTitulo: "text-[#040B35]",
      colorAudiencia: "text-slate-600",
      colorItem: "text-slate-800",
      colorCheck: "text-[#FF5E3A]",
      colorSeparador: "bg-slate-200",
      colorNotaInversion: "bg-slate-100 text-slate-700 border-slate-200",
      boton: "bg-[#040B35] text-white hover:bg-[#0B1B69]",
    },
    violeta: {
      tarjeta:
        "tarjeta-vibrante-violeta border-2 border-purple-300/50 text-white",
      icono: Sparkles,
      colorIcono: "bg-white/20 text-white border border-white/35",
      colorModalidad: "text-purple-200",
      colorTitulo: "text-white",
      colorAudiencia: "text-purple-100",
      colorItem: "text-white",
      colorCheck: "text-cyan-300",
      colorSeparador: "bg-white/20",
      colorNotaInversion: "bg-black/25 text-amber-200 border-white/15",
      boton:
        "bg-gradient-to-r from-[#FF8A00] to-[#F97316] text-slate-950 shadow-lg hover:brightness-110",
    },
    ambar: {
      tarjeta:
        "tarjeta-vibrante-ambar border border-amber-300/60 text-slate-950",
      icono: Crown,
      colorIcono: "bg-slate-950 text-amber-400",
      colorModalidad: "text-slate-900",
      colorTitulo: "text-slate-950",
      colorAudiencia: "text-slate-900",
      colorItem: "text-slate-950 font-medium",
      colorCheck: "text-slate-950",
      colorSeparador: "bg-slate-950/15",
      colorNotaInversion: "bg-white/40 text-slate-950 border-slate-950/15",
      boton: "bg-slate-950 text-amber-300 hover:bg-slate-900",
    },
  } as const;

  return (
    <section
      id="planes"
      className="superficie-clara-organica relative pt-12 pb-0 sm:pt-16"
    >
      <div className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8">
        <AnimacionAparicion desplazamientoY={24}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-purple-900/10 px-3.5 py-1 font-mono text-[11px] font-bold tracking-[0.16em] text-purple-900 uppercase">
              {tPlanes("insignia")}
            </span>
            <h2 className="texto-dorado-h2 mt-3 font-extrabold text-[#040B35]">
              {tPlanes("titulo")}
            </h2>
            <p className="texto-dorado-base mt-2 text-slate-600">
              {tPlanes("subtitulo")}
            </p>
          </div>
        </AnimacionAparicion>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {LISTA_PLANES_COMERCIALES.map((plan, indice) => {
            const estilo = estilosPorPlan[plan.codigoColor];
            const IconoPlan = estilo.icono;

            return (
              <AnimacionAparicion
                key={plan.id}
                retrasoSegundos={indice * 0.1}
                desplazamientoY={40}
                escalaInicial={0.9}
                efectoHover
              >
                <article
                  className={cn(
                    "relative flex h-full flex-col justify-between rounded-3xl p-6 sm:p-7",
                    estilo.tarjeta
                  )}
                >
                  {plan.esDestacado && (
                    <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-[#FF8A00] to-amber-400 px-3.5 py-0.5 font-mono text-[11px] font-extrabold text-slate-950 shadow-lg">
                      {tPlanes("masElegido")}
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${estilo.colorIcono}`}
                      >
                        <IconoPlan className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span
                        className={`font-mono text-xs font-bold ${estilo.colorModalidad}`}
                      >
                        {tPlanes(plan.claveModalidad)}
                      </span>
                    </div>

                    <h3
                      className={`texto-dorado-h2 mt-4 font-extrabold ${estilo.colorTitulo}`}
                    >
                      {plan.nombre}
                    </h3>
                    <p className={`mt-2 text-xs sm:text-sm ${estilo.colorAudiencia}`}>
                      {tPlanes(plan.claveAudiencia)}
                    </p>

                    <div
                      className={`my-4 h-px w-full ${estilo.colorSeparador}`}
                    />

                    <ul className="space-y-2.5">
                      {plan.clavesIncluye.slice(0, 4).map((claveItem) => (
                        <li
                          key={claveItem}
                          className={`flex items-start gap-2.5 text-xs sm:text-sm ${estilo.colorItem}`}
                        >
                          <Check
                            className={`mt-0.5 h-4 w-4 shrink-0 ${estilo.colorCheck}`}
                            aria-hidden="true"
                          />
                          <span>{tPlanes(claveItem)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-2">
                    <div
                      className={`mb-3 rounded-xl border px-3 py-1.5 text-center font-mono text-[10px] font-semibold ${estilo.colorNotaInversion}`}
                    >
                      {tPlanes("inversionPersonalizada")}
                    </div>

                    <a
                      href="#diagnostico"
                      onClick={() => alElegirPlan?.(plan.id)}
                      className={cn(
                        "inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-xs font-bold transition-all duration-200 sm:text-sm",
                        estilo.boton
                      )}
                    >
                      {tPlanes("seleccionarPlanCta")}
                    </a>
                  </div>
                </article>
              </AnimacionAparicion>
            );
          })}
        </div>
      </div>

      <DivisorOnda hacia="oscuro" />
    </section>
  );
}
