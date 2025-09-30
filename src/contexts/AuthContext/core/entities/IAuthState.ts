import { PermissionsObject } from "../../../../constants/permissions";

export interface IAuthState {
  authenticated: boolean;
  permissions: PermissionsObject;
  permissionsAreLoading: boolean;
  isLoading: boolean;
  accessToken: string;
  expirationTime: number; // Timestamp en milisegundos
}
