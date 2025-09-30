import { IAuthPresenter } from "../../core/presentation/IAuthPresenter";
import { IAuthScreens } from "../../core/presentation/IAuthScreens";
import { IAuthActions } from "../../core/actions/AuthActions";
import { ILoginCredentials } from "../../core/entities/ILoginCredentials";

export const AuthPresenter = (authActions: IAuthActions, screens: IAuthScreens): IAuthPresenter => {
  return {
    async login(credentials: ILoginCredentials): Promise<void> {
      await authActions
        .login(credentials)
        .then(screens.onLoginSuccess)
        .catch((error) => screens.onLoginError(error));
    },

    async refreshToken(): Promise<void> {
      await authActions
        .refreshToken()
        .then(screens.onRefreshTokenSuccess)
        .catch((error) => screens.onRefreshTokenError(error));
    },

    async logout(): Promise<void> {
      await authActions
        .logout()
        .then(screens.onLogoutSuccess)
        .catch((error) => screens.onLogoutError(error));
    },

    async getPermissions(): Promise<void> {
      await authActions
        .getPermissions()
        .then(screens.onGetPermissionsSuccess)
        .catch((error) => {
          screens.onGetPermissionsError(error);
          throw error;
        });
    },
  };
};
