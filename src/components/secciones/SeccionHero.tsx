import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  CalendarCheck2,
  CheckCircle2,
  Compass,
  Globe2,
  MessageCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { AnimacionAparicion } from "@/components/ui/AnimacionAparicion";
import { DivisorOnda } from "@/components/ui/DivisorOnda";

/**
 * Sección Hero inspirada directamente en la estructura del card de pablobejas.vercel.app:
 * - Card principal con la altura del viewport (h-[calc(100dvh-1.5rem)] en mobile, ocupando toda la primera pantalla).
 * - En mobile aparece primero este card ocupando el viewport completo.
 * - Estructura interna idéntica a la imagen de referencia: retrato de fondo con degradado oscuro,
 *   píldora con punto luminoso, isotipo neón + "Top-Notch" bicolor, subtítulo monospace celeste,
 *   descripción concisa y fila inferior de botones + íconos.
 */
export function SeccionHero() {
  const tHero = useTranslations("hero");
  const tAccesibilidad = useTranslations("accesibilidad");

  return (
    <section id="inicio" className="relative overflow-hidden pt-3 pb-0 sm:pt-5">
      <div className="relative z-10 mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          {/* CARD PRINCIPAL ESTILO PABLOBEJAS.VERCEL.APP (1.º en Mobile ocupando la altura del viewport) */}
          <div className="order-1 lg:col-span-5">
            <AnimacionAparicion
              desplazamientoY={24}
              escalaInicial={0.95}
              className="h-[calc(100dvh-1.5rem)] min-h-[540px] w-full sm:h-[calc(100dvh-2.5rem)] lg:h-[calc(100dvh-3.5rem)] lg:max-h-[780px]"
            >
              <article className="relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[2.25rem] border border-cyan-400/25 bg-[#050814] p-6 shadow-[0_25px_70px_rgba(2,6,23,0.95),0_0_40px_rgba(0,229,255,0.12)] sm:p-8">
                {/* Imagen de retrato de Luciano de fondo encuadrada sobre su figura */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src="/images/coach-stand-out.jpeg"
                    alt={tAccesibilidad("retratoCoach")}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 460px"
                    className="origin-[90%_12%] scale-[1.48] object-cover object-right opacity-85"
                  />
                  {/* Degradado oscuro profundo desde abajo como en la imagen adjunta */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#040711] via-[#040B29]/82 to-[#040B35]/20"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-[#040711]/90 via-[#040711]/35 to-transparent"
                  />
                </div>

                {/* Contenido inferior superpuesto (misma estructura que la imagen adjunta) */}
                <div className="relative z-10 flex flex-col items-start">
                  {/* Píldora superior con punto luminoso */}
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-400/30 bg-[#071526]/85 px-4 py-1.5 backdrop-blur-md">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]" />
                    <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-slate-200 uppercase">
                      {tHero("insignia")}
                    </span>
                  </div>

                  {/* Isotipo Neón + Nombre "Top-Notch" bicolor */}
                  <div className="mt-4 flex items-center gap-3.5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sky-400/40 bg-sky-500/10 shadow-[0_0_25px_rgba(56,189,248,0.45)]">
                      <svg
                        viewBox="0 0 64 64"
                        className="h-10 w-10 drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M32 6C16.536 6 4 16.969 4 30.5C4 36.87 6.78 42.67 11.35 47.02L9.2 56.6L19.86 52.35C23.63 53.74 27.73 54.5 32 54.5C47.464 54.5 60 43.531 60 30C60 16.469 47.464 6 32 6Z"
                          stroke="#38BDF8"
                          strokeWidth="2.8"
                        />
                        <polygon
                          points="31,15 21,18 16,26 18,36 25,42 31,40"
                          stroke="#38BDF8"
                          strokeWidth="2"
                          fill="rgba(56,189,248,0.22)"
                        />
                        <polygon
                          points="33,15 43,18 48,26 46,36 39,42 33,40"
                          stroke="#00E5FF"
                          strokeWidth="2"
                          fill="rgba(0,229,255,0.28)"
                        />
                      </svg>
                    </div>

                    <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                      Top-<span className="text-[#38BDF8]">Notch</span>
                    </h1>
                  </div>

                  {/* Subtítulo en mayúsculas celeste */}
                  <p className="mt-3 font-mono text-xs font-bold tracking-[0.12em] text-[#38BDF8] uppercase sm:text-sm">
                    GLOBAL CAREER & INTERVIEW PERFORMANCE
                  </p>

                  {/* Descripción concisa en 3 líneas */}
                  <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-[15px]">
                    {tHero("descripcion")}
                  </p>

                  {/* Barra de botones e íconos inferior (idéntica a la referencia) */}
                  <div className="mt-6 flex w-full flex-wrap items-center gap-2.5 pb-12 sm:pb-0">
                    <a
                      href="#diagnostico"
                      className="inline-flex items-center gap-2 rounded-full bg-[#22A8F0] px-5 py-2.5 text-xs font-bold text-slate-950 shadow-[0_0_24px_rgba(34,168,240,0.45)] transition-all hover:bg-[#38BDF8] sm:text-sm"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>{tHero("botonPrimario")}</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>

                    <a
                      href="#metodo-5p"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/15 sm:text-sm"
                    >
                      <ArrowDown className="h-4 w-4 text-[#38BDF8]" aria-hidden="true" />
                      <span>5P</span>
                    </a>

                    <div
                      className="mx-1 hidden h-6 w-px bg-white/15 sm:block"
                      aria-hidden="true"
                    />

                    <div className="flex items-center gap-2">
                      <a
                        href="#fases"
                        aria-label={tHero("botonSecundario")}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition-colors hover:border-sky-400 hover:text-sky-300"
                      >
                        <Compass className="h-4 w-4" aria-hidden="true" />
                      </a>
                      <a
                        href="#syllabus"
                        aria-label={tHero("metricaDuracionValor")}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition-colors hover:border-sky-400 hover:text-sky-300"
                      >
                        <Globe2 className="h-4 w-4" aria-hidden="true" />
                      </a>
                      <a
                        href="#planes"
                        aria-label={tHero("metricaMetodoValor")}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition-colors hover:border-sky-400 hover:text-sky-300"
                      >
                        <Award className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </AnimacionAparicion>
          </div>

          {/* COLUMNA COMPLEMENTARIA (2.º en Mobile, a la derecha en Desktop, libre sin card para el titular) */}
          <div className="order-2 flex flex-col justify-center gap-8 lg:col-span-7 lg:h-[calc(100dvh-3.5rem)] lg:max-h-[780px] lg:pb-12">
            {/* Propuesta de Valor libre sobre el fondo (sin card contenedor) */}
            <AnimacionAparicion
              retrasoSegundos={0.08}
              desplazamientoY={28}
              escalaInicial={0.96}
              className="flex flex-col justify-center py-2 sm:px-2"
            >
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/35 bg-amber-500/10 px-3.5 py-1 font-mono text-[11px] font-semibold text-amber-300">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Luciano Ezequiel Caferro • Lead Coach</span>
              </div>

              <h2 className="texto-dorado-h1 mt-5 font-extrabold text-white">
                {tHero("tituloParte1")}{" "}
                <span className="bg-gradient-to-r from-[#00E5FF] via-sky-300 to-[#FF8A00] bg-clip-text text-transparent">
                  {tHero("tituloAcento")}
                </span>{" "}
                {tHero("tituloParte2")}
              </h2>

              <p className="mt-5 border-l-4 border-amber-400 pl-4 font-display text-base font-semibold italic text-amber-200 sm:text-lg">
                {tHero("tagline")}
              </p>
            </AnimacionAparicion>

            {/* 3 Cards de Métricas Clave con Animación */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <AnimacionAparicion
                retrasoSegundos={0.14}
                desplazamientoY={28}
                escalaInicial={0.92}
                efectoHover
              >
                <div className="tarjeta-cristal-profunda h-full rounded-3xl border border-cyan-400/25 p-5">
                  <CalendarCheck2
                    className="h-6 w-6 text-cyan-400"
                    aria-hidden="true"
                  />
                  <p className="mt-3 font-display text-xl font-extrabold text-white">
                    {tHero("metricaDuracionValor")}
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    {tHero("metricaDuracionLabel")}
                  </p>
                </div>
              </AnimacionAparicion>

              <AnimacionAparicion
                retrasoSegundos={0.2}
                desplazamientoY={28}
                escalaInicial={0.92}
                efectoHover
              >
                <div className="tarjeta-cristal-profunda h-full rounded-3xl border border-amber-400/30 p-5">
                  <TrendingUp
                    className="h-6 w-6 text-amber-400"
                    aria-hidden="true"
                  />
                  <p className="mt-3 font-display text-xl font-extrabold text-amber-300">
                    {tHero("metricaScoreValor")}
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    {tHero("metricaScoreLabel")}
                  </p>
                </div>
              </AnimacionAparicion>

              <AnimacionAparicion
                retrasoSegundos={0.26}
                desplazamientoY={28}
                escalaInicial={0.92}
                efectoHover
              >
                <div className="tarjeta-cristal-profunda h-full rounded-3xl border border-purple-400/30 p-5">
                  <CheckCircle2
                    className="h-6 w-6 text-purple-300"
                    aria-hidden="true"
                  />
                  <p className="mt-3 font-display text-xl font-extrabold text-white">
                    {tHero("metricaMetodoValor")}
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    {tHero("metricaMetodoLabel")}
                  </p>
                </div>
              </AnimacionAparicion>
            </div>
          </div>
        </div>
      </div>

      <DivisorOnda hacia="claro" className="mt-6" />
    </section>
  );
}
