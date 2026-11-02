"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
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

/**
 * Animación sutil de foco y brillo por CSS puro (acelerada por GPU, 0 JS en scroll):
 * - No desplaza los elementos verticalmente contra el dedo del usuario (evita tirones en mobile).
 * - Tampoco oculta los bloques a opacidad 0 cuando hacés scroll rápido.
 * - Al entrar en pantalla, el bloque pasa suavemente a foco pleno (opacity + micro-escala)
 *   y las tarjetas reciben un destello diagonal sutil de luz.
 */
export function AnimacionAparicion({
  children,
  retrasoSegundos = 0,
  efectoHover = false,
  className,
}: AnimacionAparicionProps) {
  const referenciaElemento = useRef<HTMLDivElement | null>(null);
  const [estaEnFoco, setEstaEnFoco] = useState<boolean>(false);

  useEffect(() => {
    const nodo = referenciaElemento.current;
    if (!nodo) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada) {
          setEstaEnFoco(entrada.isIntersecting);
        }
      },
      {
        rootMargin: "-4% 0px -4% 0px",
        threshold: 0.08,
      }
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  const retrasoMs = Math.min(Math.round(retrasoSegundos * 1000), 90);
  const estiloVariables: CSSProperties =
    retrasoMs > 0
      ? ({ "--retraso-foco": `${retrasoMs}ms` } as CSSProperties)
      : {};

  return (
    <div
      ref={referenciaElemento}
      data-en-foco={estaEnFoco ? "true" : "false"}
      data-destello={efectoHover ? "true" : "false"}
      style={estiloVariables}
      className={cn("bloque-foco-sutil", className)}
    >
      {children}
    </div>
  );
}
