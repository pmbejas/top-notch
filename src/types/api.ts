/**
 * Contrato estándar de respuesta de la API (coincide con el backend).
 */
export interface ApiResponse<T> {
  exitoso: boolean;
  mensaje: string;
  datos: T | null;
  errores: string[];
  traceId?: string | null;
}

/**
 * Contrato estándar de resultados paginados.
 */
export interface PagedResult<T> {
  datos: T[];
  totalRegistros: number;
  totalPaginas: number;
  paginaActual: number;
}
