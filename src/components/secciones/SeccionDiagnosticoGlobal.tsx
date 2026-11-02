"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Loader2,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";
import {
  crearEsquemaDiagnostico,
  type FormularioDiagnosticoValores,
} from "@/schemas/diagnosticoSchema";
import { registrarSolicitudDiagnosticoAsync } from "@/services/diagnosticoService";
import type { IdentificadorPlan } from "@/types/programa";
import { notificar } from "@/lib/notificaciones";
import { AnimacionAparicion } from "@/components/ui/AnimacionAparicion";

interface SeccionDiagnosticoGlobalProps {
  planPreseleccionado: IdentificadorPlan;
}

interface ResumenConfirmacionDiagnostico {
  codigo: string;
  enlaceWhatsapp: string;
}

/**
 * Sección Global Career Diagnostic reorganizada y compactada para que
 * tanto la columna izquierda (título + 3 cards pequeños) como el formulario
 * entren en el viewport, queden alineados en altura y nunca toquen el menú flotante inferior.
 */
export function SeccionDiagnosticoGlobal({
  planPreseleccionado,
}: SeccionDiagnosticoGlobalProps) {
  const tDiag = useTranslations("diagnostico");
  const [confirmacion, setConfirmacion] =
    useState<ResumenConfirmacionDiagnostico | null>(null);

  const esquemaValidacion = crearEsquemaDiagnostico({
    nombreRequerido: tDiag("validacionNombre"),
    correoInvalido: tDiag("validacionCorreo"),
    linkedinRequerido: tDiag("validacionLinkedin"),
    objetivoMinimo: tDiag("validacionObjetivo"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormularioDiagnosticoValores>({
    resolver: zodResolver(esquemaValidacion),
    mode: "onTouched",
    defaultValues: {
      nombreCompleto: "",
      correoElectronico: "",
      perfilLinkedin: "",
      nivelInglesActual: "avanzado",
      planInteres: planPreseleccionado,
      objetivoProfesional: "",
    },
  });

  useEffect(() => {
    setValue("planInteres", planPreseleccionado);
  }, [planPreseleccionado, setValue]);

  async function manejarEnvioFormulario(
    valores: FormularioDiagnosticoValores
  ) {
    try {
      const respuesta = await registrarSolicitudDiagnosticoAsync(valores);
      const textoWhatsapp = tDiag("mensajeWhatsappPlantilla", {
        codigo: respuesta.idSolicitud,
        nombre: valores.nombreCompleto,
        nivel: valores.nivelInglesActual.toUpperCase(),
        plan: valores.planInteres.toUpperCase(),
        objetivo: valores.objetivoProfesional,
      });

      const enlaceWhatsapp = `https://wa.me/?text=${encodeURIComponent(
        textoWhatsapp
      )}`;

      setConfirmacion({
        codigo: respuesta.idSolicitud,
        enlaceWhatsapp,
      });

      notificar.exito(
        tDiag("exitoTitulo"),
        tDiag("exitoDescripcion", { codigo: respuesta.idSolicitud })
      );

      reset({
        ...valores,
        nombreCompleto: "",
        correoElectronico: "",
        objetivoProfesional: "",
      });
    } catch {
      notificar.error(tDiag("errorTitulo"), tDiag("errorDescripcion"));
    }
  }

  const pasosAdmision = [
    {
      icono: ClipboardCheck,
      titulo: tDiag("paso1Titulo"),
      descripcion: tDiag("paso1Desc"),
    },
    {
      icono: Sparkles,
      titulo: tDiag("paso2Titulo"),
      descripcion: tDiag("paso2Desc"),
    },
    {
      icono: Compass,
      titulo: tDiag("paso3Titulo"),
      descripcion: tDiag("paso3Desc"),
    },
  ];

  return (
    <section
      id="diagnostico"
      className="relative flex min-h-[calc(100dvh-2rem)] items-center overflow-hidden pt-8 pb-24 sm:pt-10 sm:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-0 h-56 w-full bg-gradient-to-r from-[#FF8A00]/20 via-[#7C3AED]/25 to-[#00E5FF]/15 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          {/* Columna izquierda compacta y alineada de arriba a abajo con el formulario (5 columnas) */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <AnimacionAparicion desplazamientoY={20}>
              <div>
                <span className="inline-block rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-0.5 font-mono text-[10px] font-semibold tracking-[0.16em] text-amber-300 uppercase">
                  {tDiag("insignia")}
                </span>
                <h2 className="mt-2.5 font-display text-xl font-extrabold leading-tight text-white sm:text-2xl">
                  {tDiag("titulo")}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-[13px]">
                  {tDiag("subtitulo")}
                </p>
              </div>
            </AnimacionAparicion>

            {/* Los 3 Cards pequeños y compactos alineados con la base del formulario */}
            <div className="mt-4 flex flex-col gap-2.5 lg:mt-0">
              {pasosAdmision.map((paso, indice) => {
                const IconoPaso = paso.icono;
                return (
                  <AnimacionAparicion
                    key={paso.titulo}
                    retrasoSegundos={indice * 0.07}
                    desplazamientoY={20}
                    escalaInicial={0.95}
                    efectoHover
                  >
                    <div className="tarjeta-cristal-profunda flex items-center gap-3 rounded-2xl border border-white/15 px-3.5 py-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-300">
                        <IconoPaso className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-amber-300">
                            0{indice + 1}
                          </span>
                          <h3 className="truncate font-display text-xs font-bold text-white sm:text-sm">
                            {paso.titulo}
                          </h3>
                        </div>
                        <p className="mt-0.5 line-clamp-1 text-[11px] text-slate-300 sm:text-xs">
                          {paso.descripcion}
                        </p>
                      </div>
                    </div>
                  </AnimacionAparicion>
                );
              })}
            </div>
          </div>

          {/* Columna derecha: Formulario compacto alineado en altura (7 columnas) */}
          <div className="lg:col-span-7">
            <AnimacionAparicion
              retrasoSegundos={0.1}
              desplazamientoY={24}
              escalaInicial={0.96}
              className="h-full"
            >
              <div className="tarjeta-cristal-profunda flex h-full flex-col justify-between rounded-3xl border border-cyan-400/35 p-5 sm:p-6">
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-base font-extrabold text-white sm:text-lg">
                      {tDiag("formTitulo")}
                    </h3>
                    <span className="font-mono text-[11px] text-cyan-300">
                      20–30 MIN • 1-ON-1
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-300">
                    {tDiag("formSubtitulo")}
                  </p>
                </div>

                {confirmacion && (
                  <div
                    role="status"
                    className="mt-3 rounded-2xl border border-emerald-400/45 bg-emerald-500/15 p-3 text-emerald-100"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs">
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 text-emerald-300"
                          aria-hidden="true"
                        />
                        <span className="font-bold text-white">
                          {tDiag("exitoTitulo")} ({confirmacion.codigo})
                        </span>
                      </div>
                      <a
                        href={confirmacion.enlaceWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-400 px-3.5 py-1.5 text-xs font-extrabold text-slate-950 transition-all hover:bg-emerald-300"
                      >
                        <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit(manejarEnvioFormulario)}
                  noValidate
                  className="mt-4 space-y-3"
                >
                  {/* Fila 1: Nombre y Correo */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="campo-nombre"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        {tDiag("labelNombre")}
                      </label>
                      <input
                        id="campo-nombre"
                        type="text"
                        placeholder={tDiag("placeholderNombre")}
                        aria-invalid={Boolean(errors.nombreCompleto)}
                        aria-describedby={
                          errors.nombreCompleto ? "error-nombre" : undefined
                        }
                        {...register("nombreCompleto")}
                        className="mt-1 w-full rounded-xl border border-white/20 bg-[#040B35]/90 px-3 py-2 text-xs text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none sm:text-sm"
                      />
                      {errors.nombreCompleto && (
                        <p
                          id="error-nombre"
                          role="alert"
                          className="mt-1 text-[11px] font-medium text-rose-300"
                        >
                          {errors.nombreCompleto.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="campo-correo"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        {tDiag("labelCorreo")}
                      </label>
                      <input
                        id="campo-correo"
                        type="email"
                        placeholder={tDiag("placeholderCorreo")}
                        aria-invalid={Boolean(errors.correoElectronico)}
                        aria-describedby={
                          errors.correoElectronico ? "error-correo" : undefined
                        }
                        {...register("correoElectronico")}
                        className="mt-1 w-full rounded-xl border border-white/20 bg-[#040B35]/90 px-3 py-2 text-xs text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none sm:text-sm"
                      />
                      {errors.correoElectronico && (
                        <p
                          id="error-correo"
                          role="alert"
                          className="mt-1 text-[11px] font-medium text-rose-300"
                        >
                          {errors.correoElectronico.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Fila 2 reorganizada en 3 columnas para optimizar espacio vertical */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="campo-linkedin"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        {tDiag("labelLinkedin")}
                      </label>
                      <input
                        id="campo-linkedin"
                        type="text"
                        placeholder={tDiag("placeholderLinkedin")}
                        aria-invalid={Boolean(errors.perfilLinkedin)}
                        aria-describedby={
                          errors.perfilLinkedin ? "error-linkedin" : undefined
                        }
                        {...register("perfilLinkedin")}
                        className="mt-1 w-full rounded-xl border border-white/20 bg-[#040B35]/90 px-3 py-2 text-xs text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none sm:text-sm"
                      />
                      {errors.perfilLinkedin && (
                        <p
                          id="error-linkedin"
                          role="alert"
                          className="mt-1 text-[11px] font-medium text-rose-300"
                        >
                          {errors.perfilLinkedin.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="campo-nivel-ingles"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        {tDiag("labelNivelIngles")}
                      </label>
                      <select
                        id="campo-nivel-ingles"
                        {...register("nivelInglesActual")}
                        className="mt-1 w-full rounded-xl border border-white/20 bg-[#040B35]/90 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none sm:text-sm"
                      >
                        <option value="intermedio">
                          {tDiag("nivelIntermedio")}
                        </option>
                        <option value="avanzado">
                          {tDiag("nivelAvanzado")}
                        </option>
                        <option value="bilingue">
                          {tDiag("nivelBilingue")}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="campo-plan"
                        className="block text-xs font-semibold text-slate-200"
                      >
                        {tDiag("labelPlan")}
                      </label>
                      <select
                        id="campo-plan"
                        {...register("planInteres")}
                        className="mt-1 w-full rounded-xl border border-white/20 bg-[#040B35]/90 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none sm:text-sm"
                      >
                        <option value="essential">ESSENTIAL</option>
                        <option value="professional">PROFESSIONAL</option>
                        <option value="executive">EXECUTIVE</option>
                      </select>
                    </div>
                  </div>

                  {/* Fila 3: Objetivo compacto (2 líneas) */}
                  <div>
                    <label
                      htmlFor="campo-objetivo"
                      className="block text-xs font-semibold text-slate-200"
                    >
                      {tDiag("labelObjetivo")}
                    </label>
                    <textarea
                      id="campo-objetivo"
                      rows={2}
                      placeholder={tDiag("placeholderObjetivo")}
                      aria-invalid={Boolean(errors.objetivoProfesional)}
                      aria-describedby={
                        errors.objetivoProfesional
                          ? "error-objetivo"
                          : undefined
                      }
                      {...register("objetivoProfesional")}
                      className="mt-1 w-full resize-none rounded-xl border border-white/20 bg-[#040B35]/90 px-3 py-2 text-xs text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none sm:text-sm"
                    />
                    {errors.objetivoProfesional && (
                      <p
                        id="error-objetivo"
                        role="alert"
                        className="mt-1 text-[11px] font-medium text-rose-300"
                      >
                        {errors.objetivoProfesional.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF8A00] to-[#F97316] px-6 py-3 text-xs font-bold text-slate-950 shadow-[0_10px_24px_rgba(255,138,0,0.35)] transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-65 sm:text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2
                          className="h-4 w-4 animate-spin"
                          aria-hidden="true"
                        />
                        <span>{tDiag("botonEnviando")}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        <span>{tDiag("botonEnviar")}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </AnimacionAparicion>
          </div>
        </div>
      </div>
    </section>
  );
}
