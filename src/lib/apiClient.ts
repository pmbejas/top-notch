import axios from "axios";

const TIEMPO_MAXIMO_ESPERA_MS = 15000;

/**
 * Cliente único de Axios configurado con la URL base del entorno.
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1",
  timeout: TIEMPO_MAXIMO_ESPERA_MS,
  headers: {
    "Content-Type": "application/json",
  },
});
