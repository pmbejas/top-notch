"use client";

import { useTranslations } from "next-intl";
import { LISTA_PILARES_CINCO_P } from "@/data/datosPrograma";
import { AnimacionAparicion } from "@/components/ui/AnimacionAparicion";

/**
 * Sección 2: Los 5 Cards de las 5P (The 5P Global Interview Performance Framework™).
 * Muestra únicamente las 5 tarjetas visuales con animación continua al scrollear,
 * sin desplegar el bloque de detalle inferior.
 */
export function SeccionMetodoCincoP() {
  const tMetodo = useTranslations("metodo5p");

  return (
    <section
      id="metodo-5p"
      className="superficie-clara-organica relative pt-12 pb-6 sm:pt-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimacionAparicion desplazamientoY={24}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-[#040B35]/10 px-3.5 py-1 font-mono text-[11px] font-bold tracking-[0.16em] text-[#040B35] uppercase">
              {tMetodo("insignia")}
            </span>
            <h2 className="texto-dorado-h2 mt-3 font-extrabold text-[#040B35]">
              {tMetodo("titulo")}
            </h2>
            <p className="texto-dorado-base mt-2 text-slate-600">
              {tMetodo("subtitulo")}
            </p>
          </div>
        </AnimacionAparicion>

        {/* Las 5 Cards de las 5P sin bloque de detalle adicional */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {LISTA_PILARES_CINCO_P.map((pilar, indice) => (
            <AnimacionAparicion
              key={pilar.id}
              retrasoSegundos={indice * 0.07}
              desplazamientoY={36}
              escalaInicial={0.9}
              efectoHover
            >
              <article className="flex h-full flex-col justify-between rounded-3xl border border-slate-200/90 bg-gradient-to-b from-[#040B35] to-[#0B1B69] p-5 text-white shadow-[0_18px_40px_-15px_rgba(4,11,53,0.35)]">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-300">
                      {pilar.numero}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#38BDF8] font-display text-sm font-extrabold text-slate-950 shadow-[0_0_16px_rgba(0,229,255,0.4)]">
                      {pilar.letra}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-extrabold tracking-wide text-white">
                    {pilar.nombre}
                  </h3>
                  <p className="mt-1 font-mono text-xs font-semibold text-cyan-300">
                    {tMetodo(pilar.claveSubtitulo)}
                  </p>
                </div>

                <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 font-display text-xs italic text-amber-200">
                  “{tMetodo(pilar.clavePregunta)}”
                </p>
              </article>
            </AnimacionAparicion>
          ))}
        </div>
      </div>
    </section>
  );
}
