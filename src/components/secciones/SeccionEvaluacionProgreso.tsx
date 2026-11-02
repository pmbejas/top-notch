import { useTranslations } from "next-intl";
import { Award, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import {
  BLOQUES_SESION_NOVENTA_MIN,
  CRITERIOS_SCORECARD_FINAL,
  HITOS_EVOLUCION_SCORE,
} from "@/data/datosPrograma";
import { AnimacionAparicion } from "@/components/ui/AnimacionAparicion";
import { DivisorOnda } from "@/components/ui/DivisorOnda";

/**
 * Sección 05: Estructura de Sesión (90 min), Evolución Progresiva del Puntaje (54 -> 86/100)
 * y Final Scorecard (/10) + Global Career Performance Certificate.
 */
export function SeccionEvaluacionProgreso() {
  const tEval = useTranslations("evaluacion");

  return (
    <section id="evaluacion" className="relative pt-16 pb-0 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <AnimacionAparicion>
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-cyan-300 uppercase">
              {tEval("insignia")}
            </span>
            <h2 className="texto-dorado-h2 mt-4 font-extrabold text-slate-50">
              {tEval("titulo")}
            </h2>
            <p className="texto-dorado-base mt-4 text-slate-300">
              {tEval("subtitulo")}
            </p>
          </div>
        </AnimacionAparicion>

        {/* Anatomía de cada encuentro de 90 minutos */}
        <AnimacionAparicion retrasoSegundos={0.1}>
          <div className="mt-12 rounded-3xl border border-white/10 bg-[#07124A]/85 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-cyan-400" aria-hidden="true" />
              <h3 className="texto-dorado-h3 font-bold text-white">
                {tEval("anatomiaTitulo")}
              </h3>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {BLOQUES_SESION_NOVENTA_MIN.map((bloque, indice) => (
                <div
                  key={bloque.nombre}
                  className="flex flex-col justify-between rounded-2xl border border-cyan-400/20 bg-[#040B35]/90 p-4"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-amber-300">
                        {bloque.minutos}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        0{indice + 1}
                      </span>
                    </div>
                    <p className="mt-2 font-display text-xs font-extrabold tracking-wide text-white uppercase">
                      {bloque.nombre}
                    </p>
                    <p className="mt-2 text-xs text-slate-300">
                      {tEval(bloque.claveDesc)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimacionAparicion>

        {/* Evolución del Puntaje (54 -> 86/100) + Scorecard Final (/10) */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Barras de progreso evolutivo */}
          <div className="lg:col-span-7">
            <AnimacionAparicion retrasoSegundos={0.14}>
              <div className="tarjeta-cristal-profunda h-full rounded-3xl border border-cyan-400/30 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <TrendingUp
                    className="h-6 w-6 text-amber-400"
                    aria-hidden="true"
                  />
                  <h3 className="texto-dorado-h3 font-bold text-white">
                    {tEval("progresoTitulo")}
                  </h3>
                </div>

                <div className="mt-6 space-y-5">
                  {HITOS_EVOLUCION_SCORE.map((hito) => (
                    <div
                      key={hito.semana}
                      className="rounded-2xl border border-white/10 bg-[#040B35]/70 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="font-mono text-xs font-bold text-cyan-300">
                            {hito.semana}
                          </span>
                          <span className="mx-2 text-slate-500">•</span>
                          <span className="font-display text-sm font-bold text-white">
                            {hito.etapa}
                          </span>
                        </div>
                        <span className="rounded-full bg-amber-400/20 px-3 py-0.5 font-mono text-sm font-extrabold text-amber-300">
                          {hito.puntaje} / 100
                        </span>
                      </div>

                      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#00E5FF] via-purple-400 to-[#FF8A00]"
                          style={{ width: `${hito.puntaje}%` }}
                        />
                      </div>

                      <p className="mt-2 text-xs text-slate-300">
                        {tEval(hito.claveDetalle)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimacionAparicion>
          </div>

          {/* Final Scorecard (/10) y Certificación */}
          <div className="lg:col-span-5">
            <AnimacionAparicion retrasoSegundos={0.2}>
              <div className="flex h-full flex-col justify-between gap-6">
                <div className="tarjeta-vibrante-violeta rounded-3xl border border-purple-300/40 p-6 sm:p-8">
                  <h3 className="texto-dorado-h3 font-bold text-white">
                    {tEval("scorecardTitulo")}
                  </h3>
                  <p className="texto-dorado-base mt-3 text-purple-100">
                    {tEval("scorecardDesc")}
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {CRITERIOS_SCORECARD_FINAL.map((criterio) => (
                      <div
                        key={criterio}
                        className="flex items-center justify-between rounded-xl border border-white/15 bg-black/25 px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2
                            className="h-3.5 w-3.5 shrink-0 text-cyan-300"
                            aria-hidden="true"
                          />
                          <span className="text-xs font-medium text-white">
                            {criterio}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] font-bold text-amber-300">
                          /10
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tarjeta de Certificación */}
                <div className="tarjeta-vibrante-ambar rounded-3xl border border-amber-300/50 p-6 text-slate-950 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-amber-400">
                      <Award className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-extrabold text-slate-900 uppercase">
                        {tEval("certificadoBadge")}
                      </span>
                      <h4 className="font-display text-lg font-extrabold text-slate-950">
                        {tEval("certificadoTitulo")}
                      </h4>
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-medium text-slate-900">
                    {tEval("certificadoDetalle")}
                  </p>
                </div>
              </div>
            </AnimacionAparicion>
          </div>
        </div>
      </div>

      {/* Transición en Ondas hacia la sección Clara de Planes Comerciales */}
      <DivisorOnda hacia="claro" />
    </section>
  );
}
