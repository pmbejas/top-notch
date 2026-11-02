"use client";

import { useTranslations } from "next-intl";
import { CalendarRange, CheckCircle2 } from "lucide-react";
import {
  LISTA_ENCUENTROS_PROGRAMA,
  LISTA_FASES_PROGRAMA,
} from "@/data/datosPrograma";
import { AnimacionAparicion } from "@/components/ui/AnimacionAparicion";

/**
 * Sección 4: Hoja de Ruta en 3 Cards (1 por cada mes),
 * nombrando únicamente las 4 semanas de cada mes sin detalle adicional.
 */
export function SeccionSyllabusDoceSemanas() {
  const tSyllabus = useTranslations("syllabus");
  const tFases = useTranslations("fases");

  const estilosPorMes = {
    cian: {
      borde: "border-cyan-400/35",
      badge: "bg-cyan-400/15 text-cyan-300 border-cyan-400/30",
      puntoSemana: "text-cyan-400",
    },
    violeta: {
      borde: "border-purple-400/40",
      badge: "bg-purple-500/20 text-purple-200 border-purple-400/35",
      puntoSemana: "text-purple-300",
    },
    ambar: {
      borde: "border-amber-400/40",
      badge: "bg-amber-500/20 text-amber-200 border-amber-400/35",
      puntoSemana: "text-amber-400",
    },
  } as const;

  return (
    <section
      id="syllabus"
      className="superficie-clara-organica relative pt-12 pb-10 sm:pt-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimacionAparicion desplazamientoY={24}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-[#040B35]/10 px-3.5 py-1 font-mono text-[11px] font-bold tracking-[0.16em] text-[#040B35] uppercase">
              {tSyllabus("insignia")}
            </span>
            <h2 className="texto-dorado-h2 mt-3 font-extrabold text-[#040B35]">
              {tSyllabus("titulo")}
            </h2>
          </div>
        </AnimacionAparicion>

        {/* 3 Cards (1 por cada mes) nombrando las 4 semanas correspondientes */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {LISTA_FASES_PROGRAMA.map((fase, indice) => {
            const estilo = estilosPorMes[fase.codigoColor];
            const semanasDelMes = LISTA_ENCUENTROS_PROGRAMA.filter(
              (encuentro) => encuentro.faseId === fase.id
            );

            return (
              <AnimacionAparicion
                key={fase.id}
                retrasoSegundos={indice * 0.1}
                desplazamientoY={36}
                escalaInicial={0.92}
                efectoHover
              >
                <article
                  className={`flex h-full flex-col justify-between rounded-3xl border ${estilo.borde} bg-gradient-to-b from-[#040B35] to-[#081554] p-6 text-white shadow-[0_20px_45px_-15px_rgba(4,11,53,0.3)] sm:p-7`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-bold ${estilo.badge}`}
                      >
                        <CalendarRange
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                        {tFases("mesLabel")} {fase.numeroMes}
                      </span>
                      <span className="font-mono text-xs text-slate-300">
                        {tFases("semanasLabel")} {fase.rangoSemanas}
                      </span>
                    </div>

                    <h3 className="texto-dorado-h3 mt-4 font-extrabold text-white">
                      {fase.tituloFase}
                    </h3>

                    <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
                      {semanasDelMes.map((semana) => (
                        <li
                          key={semana.numeroSemana}
                          className="flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5"
                        >
                          <CheckCircle2
                            className={`mt-0.5 h-4 w-4 shrink-0 ${estilo.puntoSemana}`}
                            aria-hidden="true"
                          />
                          <div className="text-xs sm:text-sm">
                            <span className="font-mono text-[11px] font-bold text-cyan-300">
                              W{String(semana.numeroSemana).padStart(2, "0")} •{" "}
                            </span>
                            <span className="font-semibold text-slate-100">
                              {semana.tituloIngles}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </AnimacionAparicion>
            );
          })}
        </div>
      </div>
    </section>
  );
}
