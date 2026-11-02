import { z } from "zod";

const MINIMO_CARACTERES_NOMBRE = 3;
const MINIMO_CARACTERES_OBJETIVO = 15;

/**
 * Crea el esquema de validación del formulario de Global Career Diagnostic con claves traducidas.
 */
export function crearEsquemaDiagnostico(mensajes: {
  nombreRequerido: string;
  correoInvalido: string;
  linkedinRequerido: string;
  objetivoMinimo: string;
}) {
  return z.object({
    nombreCompleto: z
      .string()
      .trim()
      .min(MINIMO_CARACTERES_NOMBRE, { message: mensajes.nombreRequerido }),
    correoElectronico: z
      .string()
      .trim()
      .email({ message: mensajes.correoInvalido }),
    perfilLinkedin: z
      .string()
      .trim()
      .min(MINIMO_CARACTERES_NOMBRE, { message: mensajes.linkedinRequerido }),
    nivelInglesActual: z.enum(["intermedio", "avanzado", "bilingue"]),
    planInteres: z.enum(["essential", "professional", "executive"]),
    objetivoProfesional: z
      .string()
      .trim()
      .min(MINIMO_CARACTERES_OBJETIVO, { message: mensajes.objetivoMinimo }),
  });
}

export type FormularioDiagnosticoValores = z.infer<
  ReturnType<typeof crearEsquemaDiagnostico>
>;
