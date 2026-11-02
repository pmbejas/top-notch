import { useTranslations } from "next-intl";
import { Compass, Flame, MessageSquareText, ArrowDownRight } from "lucide-react";
import { LISTA_FASES_PROGRAMA } from "@/data/datosPrograma";
import type { IdentificadorFase } from "@/types/programa";
import { AnimacionAparicion } from "@/components/ui/AnimacionAparicion";
import { DivisorOnda } from "@/components/ui/DivisorOnda";

interface SeccionFasesProgramaProps {
  alSeleccionarFase?: (faseId: IdentificadorFase) => void;
}

/**
 * Sección Las 3 Fases de Top-Notch ("Cómo te ayudamos a brillar en 12 semanas").
 * Recrea las 3 tarjetas vibrantes diferenciadas por color sobre fondo claro perlado
 * (estilo SuccessMind) con animación continua al hacer scroll.
 */
export function SeccionFasesPrograma({
  alSeleccionarFase,
}: SeccionFasesProgramaProps) {
  const tFases = useTranslations("fases");

  const configuracionEsteticaPorColor = {
    cian: {
      claseTarjeta: "tarjeta-vibrante-perla border-slate-200/90 text-[#040B35]",
      claseIcono:
        "bg-gradient-to-br from-[#FF5E3A] to-[#FF8A00] text-white shadow-[0_12px_25px_rgba(255,94,58,0.35)]",
      claseBadge: "border-[#040B35]/15 bg-[#040B35]/5 text-[#040B35]",
      claseSubtituloFase: "text-cyan-700",
      claseTitulo: "text-[#040B35]",
      clasePregunta: "bg-[#040B35]/5 text-[#040B35] border border-[#040B35]/10",
      claseDescripcion: "text-slate-600",
      claseBoton:
        "bg-gradient-to-r from-[#FF5E3A] to-[#FF8A00] text-white shadow-md hover:brightness-110",
      icono: Compass,
    },
    violeta: {
      claseTarjeta: "tarjeta-vibrante-violeta border-purple-400/40 text-white",
      claseIcono:
        "border-2 border-white/40 bg-white/15 text-white shadow-[0_12px_25px_rgba(0,0,0,0.2)]",
      claseBadge: "border-white/25 bg-white/15 text-white",
      claseSubtituloFase: "text-purple-200",
      claseTitulo: "text-white",
      clasePregunta: "bg-black/25 text-amber-200 border border-white/15",
      claseDescripcion: "text-purple-100",
      claseBoton:
        "bg-[#240B4C] text-white shadow-lg hover:bg-[#190638]",
      icono: MessageSquareText,
    },
    ambar: {
      claseTarjeta: "tarjeta-vibrante-ambar border-amber-300/60 text-slate-950",
      claseIcono:
        "bg-white/25 text-white shadow-[0_12px_25px_rgba(0,0,0,0.12)]",
      claseBadge: "border-slate-950/20 bg-white/30 text-slate-950",
      claseSubtituloFase: "text-slate-900/80",
      claseTitulo: "text-slate-950",
      clasePregunta: "bg-white/35 text-slate-950 border border-white/40",
      claseDescripcion: "text-slate-900",
      claseBoton:
        "bg-[#C2410C] text-white shadow-lg hover:bg-[#9A3412]",
      icono: Flame,
    },
  } as const;

  return (
    <section
      id="fases"
      className="superficie-clara-organica relative pt-12 pb-0 sm:pt-16"
    >
      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <AnimacionAparicion desplazamientoY={24}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-purple-900/10 px-3.5 py-1 font-mono text-[11px] font-bold tracking-[0.16em] text-purple-900 uppercase">
              {tFases("insignia")}
            </span>
            <h2 className="texto-dorado-h2 mt-3 font-extrabold text-[#040B35]">
              {tFases("titulo")}
            </h2>
            <p className="texto-dorado-base mt-2 text-slate-600">
              {tFases("subtitulo")}
            </p>
          </div>
        </AnimacionAparicion>

        {/* Las 3 Tarjetas con animación en cada scroll y efecto hover 3D */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {LISTA_FASES_PROGRAMA.map((fase, indice) => {
            const estetica = configuracionEsteticaPorColor[fase.codigoColor];
            const IconoFase = estetica.icono;

            return (
              <AnimacionAparicion
                key={fase.id}
                retrasoSegundos={indice * 0.1}
                desplazamientoY={40}
                escalaInicial={0.9}
                efectoHover
              >
                <article
                  className={`flex h-full flex-col justify-between rounded-3xl border p-6 text-center sm:p-7 ${estetica.claseTarjeta}`}
                >
                  <div className="flex flex-col items-center">
                    <span
                      className={`rounded-full border px-3 py-0.5 font-mono text-[11px] font-bold ${estetica.claseBadge}`}
                    >
                      {tFases("mesLabel")} {fase.numeroMes} •{" "}
                      {tFases("semanasLabel")} {fase.rangoSemanas}
                    </span>

                    <div
                      className={`mt-5 flex h-14 w-14 items-center justify-center rounded-full ${estetica.claseIcono}`}
                    >
                      <IconoFase className="h-7 w-7" aria-hidden="true" />
                    </div>

                    <p
                      className={`mt-4 font-mono text-[11px] font-bold tracking-wider uppercase ${estetica.claseSubtituloFase}`}
                    >
                      {fase.tituloFase}
                    </p>
                    <h3
                      className={`texto-dorado-h3 mt-1 font-extrabold ${estetica.claseTitulo}`}
                    >
                      {tFases(fase.claveSubtitulo)}
                    </h3>

                    <p
                      className={`mt-3 w-full rounded-xl px-3 py-2 font-display text-xs font-semibold italic sm:text-sm ${estetica.clasePregunta}`}
                    >
                      {tFases(fase.clavePreguntaEje)}
                    </p>

                    <p
                      className={`mt-3 text-xs leading-relaxed sm:text-sm ${estetica.claseDescripcion}`}
                    >
                      {tFases(fase.claveDescripcion)}
                    </p>
                  </div>

                  <div className="mt-6">
                    <a
                      href="#syllabus"
                      onClick={() => alSeleccionarFase?.(fase.id)}
                      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold transition-all sm:text-sm ${estetica.claseBoton}`}
                    >
                      <span>{tFases("explorarSemanasCta")}</span>
                      <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
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
