export type IdentificadorFase = "fase1" | "fase2" | "fase3";

export type IdentificadorPilar5P =
  | "position"
  | "profile"
  | "proof"
  | "performance"
  | "positioning";

export type IdentificadorPlan = "essential" | "professional" | "executive";

export interface PilarCincoP {
  id: IdentificadorPilar5P;
  numero: string;
  letra: string;
  nombre: string;
  claveSubtitulo: string;
  clavePregunta: string;
  clavesPuntos: string[];
}

export interface EncuentroPrograma {
  numeroSemana: number;
  faseId: IdentificadorFase;
  tituloIngles: string;
  claveObjetivo: string;
  preguntasClave: string[];
  frameworkMetodo: string;
  actividadCentral: string;
  entregable: string;
}

export interface FasePrograma {
  id: IdentificadorFase;
  numeroMes: number;
  rangoSemanas: string;
  codigoColor: "cian" | "violeta" | "ambar";
  tituloFase: string;
  claveSubtitulo: string;
  clavePreguntaEje: string;
  claveDescripcion: string;
}

export interface PlanComercial {
  id: IdentificadorPlan;
  codigoColor: "cian" | "violeta" | "ambar";
  esDestacado: boolean;
  nombre: string;
  claveModalidad: string;
  claveAudiencia: string;
  clavesIncluye: string[];
}

export interface SolicitudDiagnosticoRequest {
  nombreCompleto: string;
  correoElectronico: string;
  perfilLinkedin: string;
  nivelInglesActual: "intermedio" | "avanzado" | "bilingue";
  objetivoProfesional: string;
  planInteres: IdentificadorPlan;
}

export interface SolicitudDiagnosticoResponse {
  idSolicitud: string;
  fechaRegistroIso: string;
}
