"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { AnimacionAparicion } from "@/components/ui/AnimacionAparicion";
import { cn } from "@/lib/cn";

/**
 * Sección 07: Preguntas Frecuentes (Acordeón accesible por teclado y lector de pantalla).
 */
export function SeccionPreguntasFrecuentes() {
  const tFaq = useTranslations("faq");
  const [indiceAbierto, setIndiceAbierto] = useState<number | null>(0);

  const preguntasFrecuentes = [
    {
      pregunta: tFaq("q1Pregunta"),
      respuesta: tFaq("q1Respuesta"),
    },
    {
      pregunta: tFaq("q2Pregunta"),
      respuesta: tFaq("q2Respuesta"),
    },
    {
      pregunta: tFaq("q3Pregunta"),
      respuesta: tFaq("q3Respuesta"),
    },
    {
      pregunta: tFaq("q4Pregunta"),
      respuesta: tFaq("q4Respuesta"),
    },
  ];

  function alternarPregunta(indice: number) {
    setIndiceAbierto((anterior) => (anterior === indice ? null : indice));
  }

  return (
    <section className="relative bg-[#07124A]/50 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AnimacionAparicion>
          <div className="text-center">
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-cyan-300 uppercase">
              {tFaq("insignia")}
            </span>
            <h2 className="texto-dorado-h2 mt-4 font-extrabold text-slate-50">
              {tFaq("titulo")}
            </h2>
            <p className="texto-dorado-base mt-4 text-slate-300">
              {tFaq("subtitulo")}
            </p>
          </div>
        </AnimacionAparicion>

        <div className="mt-12 space-y-4">
          {preguntasFrecuentes.map((item, indice) => {
            const estaAbierta = indiceAbierto === indice;
            const idPanel = `faq-panel-${indice}`;
            const idBoton = `faq-boton-${indice}`;

            return (
              <AnimacionAparicion
                key={item.pregunta}
                retrasoSegundos={indice * 0.06}
              >
                <div className="tarjeta-cristal-profunda overflow-hidden rounded-2xl border border-white/15">
                  <h3>
                    <button
                      id={idBoton}
                      type="button"
                      aria-expanded={estaAbierta}
                      aria-controls={idPanel}
                      onClick={() => alternarPregunta(indice)}
                      className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cyan-400"
                    >
                      <span className="texto-dorado-h3 font-bold text-white">
                        {item.pregunta}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-cyan-300 transition-transform duration-200",
                          estaAbierta && "rotate-180 text-amber-300"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  {estaAbierta && (
                    <div
                      id={idPanel}
                      role="region"
                      aria-labelledby={idBoton}
                      className="border-t border-white/10 px-6 pt-4 pb-6"
                    >
                      <p className="texto-dorado-base text-slate-200">
                        {item.respuesta}
                      </p>
                    </div>
                  )}
                </div>
              </AnimacionAparicion>
            );
          })}
        </div>
      </div>
    </section>
  );
}
