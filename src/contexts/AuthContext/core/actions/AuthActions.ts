import { IAuthGateway } from "../gateways/IAuthGateway";
import { ILoginCredentials } from "../entities/ILoginCredentials";
import { IAuthResponse, IRefreshTokenResponse } from "../entities/IAuthResponse";
import { IPermissionsResponse } from "../entities/IPermissionsResponse";

export interface IAuthActions {
  login: (credentials: ILoginCredentials) => Promise<IAuthResponse>;
  refreshToken: () => Promise<IRefreshTokenResponse>;
  logout: () => Promise<void>;
  getPermissions: () => Promise<IPermissionsResponse>;
}

export const AuthActions = (authGateway: IAuthGateway): IAuthActions => {
  return {
    async login(credentials: ILoginCredentials): Promise<IAuthResponse> {
      try {
        const authResponse = await authGateway.login(credentials);

        return Promise.resolve(authResponse);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async refreshToken(): Promise<IRefreshTokenResponse> {
      try {
        const refreshResponse = await authGateway.refreshToken();

        return Promise.resolve(refreshResponse);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async logout(): Promise<void> {
      try {
        await authGateway.logout();
        return Promise.resolve();
      } catch (error) {
        // Aún así permitimos el logout local
        return Promise.resolve();
      }
    },

    async getPermissions(): Promise<IPermissionsResponse> {
      try {
        const permissionsResponse = await authGateway.getPermissions();
        return Promise.resolve(permissionsResponse);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };
};
