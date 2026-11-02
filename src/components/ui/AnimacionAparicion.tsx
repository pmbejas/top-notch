"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
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

const DURACION_ANIMACION_SEGUNDOS = 0.45;

/**
 * Contenedor de aparición dinámica al hacer scroll.
 * Se activa SIEMPRE que el usuario hace scroll hacia arriba o hacia abajo (once: false)
 * y solo anima transform (x, y, scale) y opacity con duración <= 0.5s.
 */
export function AnimacionAparicion({
  children,
  retrasoSegundos = 0,
  desplazamientoY = 32,
  desplazamientoX = 0,
  escalaInicial = 0.94,
  efectoHover = false,
  className,
}: AnimacionAparicionProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: desplazamientoY,
        x: desplazamientoX,
        scale: escalaInicial,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      whileHover={
        efectoHover
          ? { y: -8, scale: 1.02, transition: { duration: 0.22 } }
          : undefined
      }
      viewport={{ once: false, amount: 0.16, margin: "-20px" }}
      transition={{
        duration: DURACION_ANIMACION_SEGUNDOS,
        delay: retrasoSegundos,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
