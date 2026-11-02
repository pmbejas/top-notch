import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Outfit, DM_Sans, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ProveedorAnimaciones } from "@/components/providers/ProveedorAnimaciones";
import "../globals.css";

const fuenteSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fuenteDisplay = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const fuenteMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

interface LayoutIdiomaProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "metadatos" });

  return {
    title: tMeta("titulo"),
    description: tMeta("descripcion"),
    icons: {
      icon: "/images/isotipo-standout.svg",
    },
  };
}

export default async function LayoutIdioma({
  children,
  params,
}: LayoutIdiomaProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const mensajes = await getMessages();
  const tAccesibilidad = await getTranslations({
    locale,
    namespace: "accesibilidad",
  });

  return (
    <html
      lang={locale}
      className={`${fuenteSans.variable} ${fuenteDisplay.variable} ${fuenteMono.variable} dark`}
    >
      <body className="fondo-malla-profunda min-h-screen font-sans text-slate-50 antialiased selection:bg-cyan-400 selection:text-slate-950">
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-amber-400 focus:px-5 focus:py-2.5 focus:font-bold focus:text-slate-950"
        >
          {tAccesibilidad("saltarContenido")}
        </a>
        <NextIntlClientProvider messages={mensajes}>
          <ProveedorAnimaciones>{children}</ProveedorAnimaciones>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
