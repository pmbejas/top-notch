"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/cn";

interface AnimacionAparicionProps {
  children: ReactNode;
  retrasoSegundos?: number;
  desplazamientoY?: number;
  desplazamientoX?: number;
  escalaInicial?: number;
  efectoHover?: boolean;
  className?: string;
}

const DURACION_ENTRADA_SEGUNDOS = 0.38;

/**
 * Contenedor de aparición fluida al hacer scroll:
 * 1. Observa un contenedor estático (sin transform) para evitar que el propio movimiento Y
 *    altere el IntersectionObserver y dispare la animación varias veces seguidas.
 * 2. Mantiene el elemento visible mientras cualquier parte siga en pantalla (amount: 0),
 *    evitando que se desvanezca o choque con otros elementos antes de salir del viewport.
 * 3. Solo se reinicia (con duración 0s) cuando salió 100% fuera de la pantalla, quedando
 *    listo para volver a animarse suavemente al regresar con el scroll.
 */
export function AnimacionAparicion({
  children,
  retrasoSegundos = 0,
  desplazamientoY = 18,
  desplazamientoX = 0,
  escalaInicial = 0.98,
  efectoHover = false,
  className,
}: AnimacionAparicionProps) {
  const referenciaContenedor = useRef<HTMLDivElement | null>(null);
  const estaEnVista = useInView(referenciaContenedor, {
    once: false,
    amount: 0,
    margin: "20px 0px 20px 0px",
  });

  const desplazamientoYSuave = Math.min(Math.max(desplazamientoY, -18), 18);
  const desplazamientoXSuave = Math.min(Math.max(desplazamientoX, -16), 16);
  const escalaSuave = Math.max(escalaInicial, 0.975);
  const retrasoSuave = Math.min(retrasoSegundos, 0.1);

  return (
    <div ref={referenciaContenedor} className={cn(className)}>
      <motion.div
        initial={{
          opacity: 0,
          y: desplazamientoYSuave,
          x: desplazamientoXSuave,
          scale: escalaSuave,
        }}
        animate={
          estaEnVista
            ? {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
              }
            : {
                opacity: 0,
                y: desplazamientoYSuave,
                x: desplazamientoXSuave,
                scale: escalaSuave,
              }
        }
        whileHover={
          efectoHover
            ? { y: -6, scale: 1.015, transition: { duration: 0.2 } }
            : undefined
        }
        transition={
          estaEnVista
            ? {
                duration: DURACION_ENTRADA_SEGUNDOS,
                delay: retrasoSuave,
                ease: [0.22, 1, 0.36, 1],
              }
            : {
                duration: 0,
                delay: 0,
              }
        }
        className="h-full w-full will-change-[transform,opacity]"
      >
        {children}
      </motion.div>
    </div>
  );
}
