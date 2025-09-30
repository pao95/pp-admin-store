import { IAuthGateway } from "../../core/gateways/IAuthGateway";
import { ILoginCredentials } from "../../core/entities/ILoginCredentials";
import { IAuthResponse, IRefreshTokenResponse } from "../../core/entities/IAuthResponse";
import { IPermissionsResponse } from "../../core/entities/IPermissionsResponse";
import { HttpResponse, IHttpClient } from "../../../../modules/httpClient/interfaces";
import { LOGIN_API, REFRESH_TOKEN_API, LOGOUT_API, PERMISSIONS_API } from "../../../../constants/api";
import { ERROR_CODES } from "../../../../modules/httpClient/httpClientModule";
import { decodeJWT, extractPermissionsFromToken } from "../../../../utils/jwtDecoder";
import i18next from "i18next";

interface IAuthResponseApi {
  token: string;
  refreshToken: string;
  idToken: string | null;
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

interface IRefreshTokenResponseApi {
  token: string;
  refreshToken: string;
  idToken: string | null;
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

interface IPermissionsResponseApi {
  token: string;
}

export const HttpAuthGateway = (httpClient: IHttpClient): IAuthGateway => {
  const toAuthResponse = (response: HttpResponse): IAuthResponse => {
    const { data } = response as { data: IAuthResponseApi };
    return {
      token: data.token,
      refreshToken: data.refreshToken,
      idToken: data.idToken,
      accessToken: data.accessToken,
      expirationTime: parseInt(data.expiresIn.toString()),
      tokenType: data.tokenType,
    };
  };

  const toRefreshTokenResponse = (response: HttpResponse): IRefreshTokenResponse => {
    const { data } = response as { data: IRefreshTokenResponseApi };
    return {
      token: data.token,
      refreshToken: data.refreshToken,
      idToken: data.idToken,
      accessToken: data.accessToken,
      expirationTime: parseInt(data.expiresIn.toString()),
      tokenType: data.tokenType,
    };
  };

  const toPermissionsResponse = (response: HttpResponse): IPermissionsResponse => {
    try {
      const { data } = response as { data: IPermissionsResponseApi };

      const decodedToken = decodeJWT(data.token);
      const permissions = extractPermissionsFromToken(decodedToken);

      return {
        permissions: permissions,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : i18next.t("login.errors.extractPermissionsFromToken"));
    }
  };

  return {
    async login(credentials: ILoginCredentials): Promise<IAuthResponse> {
      try {
        const response = await httpClient.post(LOGIN_API, credentials);

        if (!response.status) {
          if (response?.data?.status === ERROR_CODES.PASSWORD_CHANGE_REQUIRED) {
            return Promise.reject(ERROR_CODES.PASSWORD_CHANGE_REQUIRED);
          }

          return Promise.reject(response?.error?.message || i18next.t("login.errors.login"));
        }

        return Promise.resolve(toAuthResponse(response));
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },

    async refreshToken(): Promise<IRefreshTokenResponse> {
      try {
        const response = await httpClient.post(REFRESH_TOKEN_API, {});
        if (!response.status) {
          return Promise.reject(response?.error?.message || i18next.t("login.errors.refreshToken"));
        }
        return Promise.resolve(toRefreshTokenResponse(response));
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },

    async logout(): Promise<void> {
      try {
        await httpClient.post(LOGOUT_API, {});
      } catch (error) {
        // No lanzamos error en logout para que siempre se pueda cerrar sesión
        console.warn("Error al hacer logout en el servidor:", error);
      }
    },

    async getPermissions(): Promise<IPermissionsResponse> {
      try {
        const response = await httpClient.get(PERMISSIONS_API);
        if (!response.status) {
          return Promise.reject(response?.error?.message || i18next.t("permissions.errors.getPermissions"));
        }
        return Promise.resolve(toPermissionsResponse(response));
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
  };
};
