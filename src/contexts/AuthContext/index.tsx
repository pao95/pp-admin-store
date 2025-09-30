// Exportar el nuevo AuthProvider y hook
export { AuthProvider } from "./AuthProvider";
export { AuthContext } from "./AuthProvider";

// Mantener compatibilidad con el tipo anterior
export type { IAuthState as UserAuthState } from "./core/entities/IAuthState";
