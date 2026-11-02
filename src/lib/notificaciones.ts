import { toast } from "sonner";

const DURACION_EXITO_MS = 4500;
const DURACION_ERROR_MS = 9000;

/**
 * Funciones fábrica sobre sonner para mantener duración y accesibilidad consistentes.
 */
export const notificar = {
  exito: (titulo: string, descripcion?: string): void => {
    toast.success(titulo, {
      description: descripcion,
      duration: DURACION_EXITO_MS,
    });
  },
  error: (titulo: string, descripcion?: string): void => {
    toast.error(titulo, {
      description: descripcion,
      duration: DURACION_ERROR_MS,
    });
  },
};
