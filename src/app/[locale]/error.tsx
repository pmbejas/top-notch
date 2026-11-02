"use client";

import { useTranslations } from "next-intl";

interface ErrorPaginaProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPagina({ reset }: ErrorPaginaProps) {
  const tDiag = useTranslations("diagnostico");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#040B35] px-4 text-center text-slate-50">
      <div className="tarjeta-cristal-profunda max-w-md rounded-3xl border border-rose-400/35 p-8">
        <h2 className="texto-dorado-h3 font-bold text-white">
          {tDiag("errorTitulo")}
        </h2>
        <p className="texto-dorado-base mt-3 text-slate-300">
          {tDiag("errorDescripcion")}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-full bg-gradient-to-r from-[#FF8A00] to-[#F97316] px-6 py-3 text-sm font-bold text-slate-950"
        >
          {tDiag("botonEnviar")}
        </button>
      </div>
    </div>
  );
}
