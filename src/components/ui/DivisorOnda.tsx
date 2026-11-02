import { cn } from "@/lib/cn";

interface DivisorOndaProps {
  hacia: "claro" | "oscuro";
  invertido?: boolean;
  className?: string;
}

/**
 * Divisor orgánico en capas SVG inspirado directamente en la imagen de referencia SuccessMind.
 * Conecta con fluidez las secciones azul noche (#040B35) y las secciones claras perladas (#F8FAFC)
 * mediante ondas cálidas ámbar, violeta real y cian eléctrico.
 */
export function DivisorOnda({
  hacia,
  invertido = false,
  className,
}: DivisorOndaProps) {
  const colorCorteFinal = hacia === "claro" ? "#F8FAFC" : "#040B35";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none relative w-full overflow-hidden leading-none select-none",
        invertido && "rotate-180",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative block h-20 w-full sm:h-28 lg:h-36"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id={`ondaSuperior-${hacia}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#FF8A00" stopOpacity="0.82" />
            <stop offset="45%" stopColor="#7C3AED" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient
            id={`ondaIntermedia-${hacia}`}
            x1="100%"
            y1="0%"
            x2="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#4C1D95" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#311068" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#07124A" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Primera onda cálida/violeta/cian (como en la imagen de referencia SuccessMind) */}
        <path
          d="M0,32 C320,124 620,-18 960,54 C1180,102 1330,42 1440,16 L1440,160 L0,160 Z"
          fill={`url(#ondaSuperior-${hacia})`}
        />

        {/* Segunda onda profunda púrpura/azul */}
        <path
          d="M0,76 C360,14 720,138 1080,64 C1260,28 1370,52 1440,72 L1440,160 L0,160 Z"
          fill={`url(#ondaIntermedia-${hacia})`}
        />

        {/* Onda de encastre suave hacia la sección destino (#F8FAFC o #040B35) */}
        <path
          d="M0,118 C420,158 820,66 1200,120 C1320,136 1395,124 1440,112 L1440,160 L0,160 Z"
          fill={colorCorteFinal}
        />
      </svg>
    </div>
  );
}
