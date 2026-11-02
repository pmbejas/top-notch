import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases condicionales de Tailwind CSS resolviendo conflictos.
 */
export function cn(...clases: ClassValue[]): string {
  return twMerge(clsx(clases));
}
