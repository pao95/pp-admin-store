import { IAuthResponse, IRefreshTokenResponse } from "../entities/IAuthResponse";
import { IPermissionsResponse } from "../entities/IPermissionsResponse";

export interface IAuthScreens {
  onLoginSuccess: (authResponse: IAuthResponse) => void;
  onLoginError: (error: string) => void;
  onRefreshTokenSuccess: (refreshResponse: IRefreshTokenResponse) => void;
  onRefreshTokenError: (error: string) => void;
  onLogoutSuccess: () => void;
  onLogoutError: (error: string) => void;
  onGetPermissionsSuccess: (permissionsResponse: IPermissionsResponse) => void;
  onGetPermissionsError: (error: string) => void;
}
