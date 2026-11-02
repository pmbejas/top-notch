"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { Toaster } from "sonner";

interface ProveedorAnimacionesProps {
  children: ReactNode;
}

/**
 * Envuelve la aplicación con configuración de accesibilidad para animaciones
 * (respeta prefers-reduced-motion) y el sistema centralizado de notificaciones.
 */
export function ProveedorAnimaciones({ children }: ProveedorAnimacionesProps) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
      <Toaster
        position="top-right"
        theme="dark"
        richColors
        closeButton
        toastOptions={{
          className:
            "!bg-[#07124A] !border !border-cyan-400/30 !text-slate-50 !shadow-2xl",
        }}
      />
    </MotionConfig>
  );
}
