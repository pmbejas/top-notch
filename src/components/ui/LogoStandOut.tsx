import { cn } from "@/lib/cn";

interface LogoStandOutProps {
  etiquetaAccesible: string;
  mostrarSubtitulo?: boolean;
  className?: string;
}

/**
 * Logotipo vectorial de Top-Notch (Global Career & Interview Performance)
 * con el cerebro poligonal luminoso dentro de una burbuja de diálogo.
 */
export function LogoStandOut({
  etiquetaAccesible,
  mostrarSubtitulo = true,
  className,
}: LogoStandOutProps) {
  return (
    <div
      className={cn("inline-flex items-center gap-3 select-none", className)}
      aria-label={etiquetaAccesible}
    >
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/35 bg-[#07124A]/90 shadow-[0_0_20px_rgba(0,229,255,0.22)]">
        <svg
          viewBox="0 0 64 64"
          className="h-7 w-7"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="gradienteBurbujaLogo"
              x1="6"
              y1="6"
              x2="58"
              y2="58"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="55%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#FF8A00" />
            </linearGradient>
            <linearGradient
              id="gradienteCerebroIzq"
              x1="14"
              y1="16"
              x2="32"
              y2="46"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FF8A00" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient
              id="gradienteCerebroDer"
              x1="32"
              y1="16"
              x2="50"
              y2="46"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="55%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          <path
            d="M32 6C16.536 6 4 16.969 4 30.5C4 36.87 6.78 42.67 11.35 47.02L9.2 56.6L19.86 52.35C23.63 53.74 27.73 54.5 32 54.5C47.464 54.5 60 43.531 60 30C60 16.469 47.464 6 32 6Z"
            stroke="url(#gradienteBurbujaLogo)"
            strokeWidth="2.8"
            fill="#040B35"
          />
          <polygon
            points="31,15 21,18 16,26 18,36 25,42 31,40"
            fill="url(#gradienteCerebroIzq)"
            opacity="0.9"
          />
          <polyline
            points="31,15 24,25 16,26 24,33 31,28 25,42"
            stroke="#F8FAFC"
            strokeWidth="1"
            strokeOpacity="0.55"
          />
          <polygon
            points="33,15 43,18 48,26 46,36 39,42 33,40"
            fill="url(#gradienteCerebroDer)"
            opacity="0.92"
          />
          <polyline
            points="33,15 40,25 48,26 40,33 33,28 39,42"
            stroke="#F8FAFC"
            strokeWidth="1"
            strokeOpacity="0.55"
          />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-tight text-slate-50 sm:text-xl">
          Top-
          <span className="bg-gradient-to-r from-[#00E5FF] via-sky-300 to-[#FF8A00] bg-clip-text text-transparent">
            Notch
          </span>
        </span>
        {mostrarSubtitulo && (
          <span className="mt-0.5 font-mono text-[10px] font-semibold tracking-[0.14em] text-cyan-300/90 uppercase">
            Stand Out • Interviews
          </span>
        )}
      </div>
    </div>
  );
}
