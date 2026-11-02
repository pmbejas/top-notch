import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function PaginaNoEncontrada() {
  const tMenu = useTranslations("menuInferior");
  const tMeta = useTranslations("metadatos");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#040B35] px-4 text-center text-slate-50">
      <div className="tarjeta-cristal-profunda max-w-md rounded-3xl border border-cyan-400/30 p-8">
        <span className="font-mono text-4xl font-extrabold text-cyan-300">
          404
        </span>
        <h1 className="texto-dorado-h3 mt-4 font-bold text-white">
          {tMeta("titulo")}
        </h1>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950"
        >
          {tMenu("inicio")}
        </Link>
      </div>
    </div>
  );
}
