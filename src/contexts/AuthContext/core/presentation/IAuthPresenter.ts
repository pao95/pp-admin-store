import { ILoginCredentials } from "../entities/ILoginCredentials";

export interface IAuthPresenter {
  login: (credentials: ILoginCredentials) => Promise<any>;
  refreshToken: () => Promise<any>;
  logout: () => Promise<any>;
  getPermissions: () => Promise<any>;
}
