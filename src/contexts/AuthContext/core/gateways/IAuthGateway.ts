import { IAuthResponse } from "../entities/IAuthResponse";
import { IRefreshTokenResponse } from "../entities/IAuthResponse";
import { ILoginCredentials } from "../entities/ILoginCredentials";
import { IPermissionsResponse } from "../entities/IPermissionsResponse";

export interface IAuthGateway {
  login: (credentials: ILoginCredentials) => Promise<IAuthResponse>;
  refreshToken: () => Promise<IRefreshTokenResponse>;
  logout: () => Promise<void>;
  getPermissions: () => Promise<IPermissionsResponse>;
}
