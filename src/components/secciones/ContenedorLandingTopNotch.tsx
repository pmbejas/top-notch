"use client";

import { useState } from "react";
import type { IdentificadorPlan } from "@/types/programa";
import { SeccionHero } from "@/components/secciones/SeccionHero";
import { SeccionMetodoCincoP } from "@/components/secciones/SeccionMetodoCincoP";
import { SeccionFasesPrograma } from "@/components/secciones/SeccionFasesPrograma";
import { SeccionSyllabusDoceSemanas } from "@/components/secciones/SeccionSyllabusDoceSemanas";
import { SeccionPlanesComerciales } from "@/components/secciones/SeccionPlanesComerciales";
import { SeccionDiagnosticoGlobal } from "@/components/secciones/SeccionDiagnosticoGlobal";

/**
 * Orquesta las secciones esenciales de Top-Notch:
 * 1. Hero (con el card de altura de viewport primero en mobile)
 * 2. Método 5P (los 5 cards sin detalle extra)
 * 3. Las 3 Fases (3 cards vibrantes)
 * 4. Hoja de Ruta (3 cards — 1 por cada mes — nombrando cada semana)
 * 5. Planes Comerciales
 * 6. Diagnóstico Global + WhatsApp
 */
export function ContenedorLandingTopNotch() {
  const [planPreseleccionado, setPlanPreseleccionado] =
    useState<IdentificadorPlan>("professional");

  return (
    <>
      <SeccionHero />
      <SeccionMetodoCincoP />
      <SeccionFasesPrograma />
      <SeccionSyllabusDoceSemanas />
      <SeccionPlanesComerciales alElegirPlan={setPlanPreseleccionado} />
      <SeccionDiagnosticoGlobal planPreseleccionado={planPreseleccionado} />
    </>
  );
}
