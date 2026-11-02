"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  Compass,
  Layers,
  CalendarRange,
  Briefcase,
  Sparkles,
  Home,
  Globe,
} from "lucide-react";
import { usePathname, useRouter } from "@/i18n/routing";
import type { IdiomaSoportado } from "@/i18n/routing";
import { cn } from "@/lib/cn";

interface ElementoNavegacion {
  idSeccion: string;
  claveEtiqueta:
    | "inicio"
    | "metodo5p"
    | "fases"
    | "syllabus"
    | "planes";
  icono: typeof Home;
}

const ELEMENTOS_DOCK: ElementoNavegacion[] = [
  { idSeccion: "inicio", claveEtiqueta: "inicio", icono: Home },
  { idSeccion: "metodo-5p", claveEtiqueta: "metodo5p", icono: Compass },
  { idSeccion: "fases", claveEtiqueta: "fases", icono: Layers },
  { idSeccion: "syllabus", claveEtiqueta: "syllabus", icono: CalendarRange },
  { idSeccion: "planes", claveEtiqueta: "planes", icono: Briefcase },
];

const IDIOMAS_DISPONIBLES: { codigo: IdiomaSoportado; etiqueta: string }[] = [
  { codigo: "es", etiqueta: "ES" },
  { codigo: "en", etiqueta: "EN" },
  { codigo: "pt", etiqueta: "PT" },
];

/**
 * Menú flotante ubicado en la parte inferior de la pantalla (Bottom Floating Dock).
 */
export function MenuFlotanteInferior() {
  const tMenu = useTranslations("menuInferior");
  const tAccesibilidad = useTranslations("accesibilidad");
  const idiomaActual = useLocale() as IdiomaSoportado;
  const router = useRouter();
  const pathname = usePathname();

  const [seccionActiva, setSeccionActiva] = useState<string>("inicio");
  const bloqueoScrollManualRef = useRef<boolean>(false);
  const temporizadorDesbloqueoRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  function seleccionarSeccionManual(idSeccion: string) {
    bloqueoScrollManualRef.current = true;
    setSeccionActiva(idSeccion);
    if (temporizadorDesbloqueoRef.current) {
      clearTimeout(temporizadorDesbloqueoRef.current);
    }
    temporizadorDesbloqueoRef.current = setTimeout(() => {
      bloqueoScrollManualRef.current = false;
    }, 750);
  }

  useEffect(() => {
    const idsObservados = [
      ...ELEMENTOS_DOCK.map((item) => item.idSeccion),
      "diagnostico",
    ];

    const observador = new IntersectionObserver(
      (entradas) => {
        if (bloqueoScrollManualRef.current) return;
        const entradaVisible = entradas.find((entrada) => entrada.isIntersecting);
        if (entradaVisible?.target?.id) {
          setSeccionActiva((previa) =>
            previa === entradaVisible.target.id
              ? previa
              : entradaVisible.target.id
          );
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0.05,
      }
    );

    idsObservados.forEach((id) => {
      const elementoDom = document.getElementById(id);
      if (elementoDom) {
        observador.observe(elementoDom);
      }
    });

    return () => {
      observador.disconnect();
      if (temporizadorDesbloqueoRef.current) {
        clearTimeout(temporizadorDesbloqueoRef.current);
      }
    };
  }, []);

  function cambiarIdioma(nuevoIdioma: IdiomaSoportado) {
    router.replace(pathname || "/", { locale: nuevoIdioma });
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-50 flex justify-center px-2 sm:bottom-5 sm:px-4">
      <nav
        aria-label={tAccesibilidad("navegacionFlotante")}
        className="pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-cyan-400/35 bg-[#040B35]/92 p-1.5 shadow-[0_20px_50px_rgba(2,6,23,0.9),0_0_30px_rgba(0,229,255,0.2)] backdrop-blur-xl sm:gap-1.5 sm:px-3 sm:py-2"
      >
        <ul className="flex items-center gap-1">
          {ELEMENTOS_DOCK.map((elemento) => {
            const IconoComponente = elemento.icono;
            const estaActivo = seccionActiva === elemento.idSeccion;

            return (
              <li key={elemento.idSeccion} className="relative shrink-0">
                <a
                  href={`#${elemento.idSeccion}`}
                  onClick={() => seleccionarSeccionManual(elemento.idSeccion)}
                  aria-current={estaActivo ? "location" : undefined}
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 sm:px-3.5 sm:text-xs",
                    estaActivo
                      ? "text-slate-950 font-bold"
                      : "text-slate-200 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {estaActivo && (
                    <motion.span
                      layoutId="indicadorMenuInferior"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#00E5FF] to-sky-300 shadow-[0_0_20px_rgba(0,229,255,0.5)]"
                    />
                  )}
                  <IconoComponente
                    className={cn(
                      "h-4 w-4 shrink-0",
                      estaActivo ? "text-slate-950" : "text-cyan-300"
                    )}
                    aria-hidden="true"
                  />
                  <span className="hidden md:inline">
                    {tMenu(elemento.claveEtiqueta)}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div
          className="mx-1 h-5 w-px shrink-0 bg-white/15"
          aria-hidden="true"
        />

        {/* Botón CTA destacado dentro del menú flotante inferior */}
        <a
          href="#diagnostico"
          onClick={() => seleccionarSeccionManual("diagnostico")}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold tracking-wide transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 sm:px-4",
            seccionActiva === "diagnostico"
              ? "bg-amber-400 text-slate-950 shadow-[0_0_25px_rgba(255,138,0,0.65)]"
              : "bg-gradient-to-r from-[#FF8A00] to-[#F97316] text-slate-950 shadow-[0_0_20px_rgba(255,138,0,0.35)] hover:brightness-110"
          )}
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{tMenu("diagnostico")}</span>
        </a>

        <div
          className="mx-1 hidden h-5 w-px shrink-0 bg-white/15 sm:block"
          aria-hidden="true"
        />

        {/* Selector de idioma compacto */}
        <div
          role="group"
          aria-label={tAccesibilidad("seleccionarIdioma")}
          className="hidden items-center gap-0.5 rounded-full border border-white/10 bg-[#07124A]/90 p-0.5 sm:flex"
        >
          <Globe
            className="ml-1.5 h-3.5 w-3.5 text-cyan-300/80"
            aria-hidden="true"
          />
          {IDIOMAS_DISPONIBLES.map((idioma) => {
            const esIdiomaActivo = idiomaActual === idioma.codigo;
            return (
              <button
                key={idioma.codigo}
                type="button"
                onClick={() => cambiarIdioma(idioma.codigo)}
                aria-pressed={esIdiomaActivo}
                className={cn(
                  "rounded-full px-2 py-1 font-mono text-[10px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400",
                  esIdiomaActivo
                    ? "bg-cyan-400 text-slate-950"
                    : "text-slate-300 hover:text-white"
                )}
              >
                {idioma.etiqueta}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
