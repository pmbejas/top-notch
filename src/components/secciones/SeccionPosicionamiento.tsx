import { useTranslations } from "next-intl";
import {
  CheckCircle2,
  Globe2,
  Mic,
  Target,
  XCircle,
} from "lucide-react";
import { AnimacionAparicion } from "@/components/ui/AnimacionAparicion";
import { DivisorOnda } from "@/components/ui/DivisorOnda";

/**
 * Sección 01: Posicionamiento Estratégico sobre Superficie Clara Orgánica (#F8FAFC)
 * inspirada en el ritmo visual de SuccessMind y Preply.
 */
export function SeccionPosicionamiento() {
  const tPos = useTranslations("posicionamiento");

  const pilaresEquilibrio = [
    {
      icono: Target,
      titulo: tPos("pilar1Titulo"),
      descripcion: tPos("pilar1Desc"),
      borde: "border-cyan-500/30",
      colorIcono: "bg-cyan-500 text-white shadow-md shadow-cyan-500/25",
    },
    {
      icono: Mic,
      titulo: tPos("pilar2Titulo"),
      descripcion: tPos("pilar2Desc"),
      borde: "border-purple-500/30",
      colorIcono: "bg-purple-600 text-white shadow-md shadow-purple-600/25",
    },
    {
      icono: Globe2,
      titulo: tPos("pilar3Titulo"),
      descripcion: tPos("pilar3Desc"),
      borde: "border-amber-500/30",
      colorIcono: "bg-[#FF8A00] text-slate-950 shadow-md shadow-amber-500/25",
    },
  ];

  return (
    <section className="superficie-clara-organica relative pt-14 pb-0 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <AnimacionAparicion>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-[#040B35]/10 px-4 py-1 font-mono text-xs font-bold tracking-[0.18em] text-[#040B35] uppercase">
              {tPos("insignia")}
            </span>
            <h2 className="texto-dorado-h2 mt-4 font-extrabold text-[#040B35]">
              {tPos("titulo")}
            </h2>
            <p className="texto-dorado-base mt-4 text-slate-600">
              {tPos("subtitulo")}
            </p>
          </div>
        </AnimacionAparicion>

        {/* Banda de 3 pilares estratégicos */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pilaresEquilibrio.map((pilar, indice) => {
            const Icono = pilar.icono;
            return (
              <AnimacionAparicion
                key={pilar.titulo}
                retrasoSegundos={indice * 0.08}
              >
                <div
                  className={`tarjeta-vibrante-perla flex h-full flex-col rounded-3xl border ${pilar.borde} p-6 transition-transform duration-300 hover:-translate-y-1`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${pilar.colorIcono}`}
                    >
                      <Icono className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="texto-dorado-h3 font-extrabold text-[#040B35]">
                      {pilar.titulo}
                    </h3>
                  </div>
                  <p className="texto-dorado-base mt-4 text-slate-700">
                    {pilar.descripcion}
                  </p>
                </div>
              </AnimacionAparicion>
            );
          })}
        </div>

        {/* Comparativa de Alto Contraste */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <AnimacionAparicion retrasoSegundos={0.1}>
            <div className="h-full rounded-3xl border border-rose-200 bg-white p-8 shadow-lg">
              <span className="inline-block rounded-full bg-rose-100 px-3.5 py-1 font-mono text-xs font-bold text-rose-700">
                {tPos("enfoqueTradicionalEtiqueta")}
              </span>
              <h3 className="texto-dorado-h3 mt-4 font-bold text-slate-800">
                {tPos("enfoqueTradicionalTitulo")}
              </h3>
              <ul className="mt-6 space-y-4">
                {[
                  tPos("enfoqueTradicionalItem1"),
                  tPos("enfoqueTradicionalItem2"),
                  tPos("enfoqueTradicionalItem3"),
                ].map((texto) => (
                  <li key={texto} className="flex items-start gap-3">
                    <XCircle
                      className="mt-1 h-5 w-5 shrink-0 text-rose-500"
                      aria-hidden="true"
                    />
                    <span className="texto-dorado-base text-slate-600">
                      {texto}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimacionAparicion>

          <AnimacionAparicion retrasoSegundos={0.18}>
            <div className="h-full rounded-3xl border-2 border-[#040B35]/15 bg-gradient-to-br from-[#040B35] via-[#07124A] to-[#2E1065] p-8 text-white shadow-2xl">
              <span className="inline-block rounded-full bg-[#FF8A00] px-3.5 py-1 font-mono text-xs font-bold text-slate-950">
                {tPos("enfoqueTopNotchEtiqueta")}
              </span>
              <h3 className="texto-dorado-h3 mt-4 font-extrabold text-white">
                {tPos("enfoqueTopNotchTitulo")}
              </h3>
              <ul className="mt-6 space-y-4">
                {[
                  tPos("enfoqueTopNotchItem1"),
                  tPos("enfoqueTopNotchItem2"),
                  tPos("enfoqueTopNotchItem3"),
                ].map((texto) => (
                  <li key={texto} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-1 h-5 w-5 shrink-0 text-cyan-300"
                      aria-hidden="true"
                    />
                    <span className="texto-dorado-base font-medium text-slate-100">
                      {texto}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimacionAparicion>
        </div>
      </div>

      {/* Transición en Ondas hacia la sección Azul Noche de la Metodología 5P */}
      <DivisorOnda hacia="oscuro" />
    </section>
  );
}
