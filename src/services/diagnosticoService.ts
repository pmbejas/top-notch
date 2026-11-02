import type { ApiResponse } from "@/types/api";
import type {
  SolicitudDiagnosticoRequest,
  SolicitudDiagnosticoResponse,
} from "@/types/programa";

const TIEMPO_SIMULACION_ENVIO_MS = 700;

/**
 * Envía la solicitud para el Global Career Diagnostic (20-30 min) respetando el contrato ApiResponse<T>.
 */
export async function registrarSolicitudDiagnosticoAsync(
  solicitud: SolicitudDiagnosticoRequest
): Promise<SolicitudDiagnosticoResponse> {
  await new Promise((resolver) =>
    setTimeout(resolver, TIEMPO_SIMULACION_ENVIO_MS)
  );

  const respuestaSimulada: ApiResponse<SolicitudDiagnosticoResponse> = {
    exitoso: true,
    mensaje: `Solicitud registrada para ${solicitud.nombreCompleto}`,
    datos: {
      idSolicitud: `GCD-${Date.now().toString().slice(-6)}`,
      fechaRegistroIso: new Date().toISOString(),
    },
    errores: [],
    traceId: null,
  };

  if (!respuestaSimulada.exitoso || !respuestaSimulada.datos) {
    throw new Error(respuestaSimulada.mensaje);
  }

  return respuestaSimulada.datos;
}
