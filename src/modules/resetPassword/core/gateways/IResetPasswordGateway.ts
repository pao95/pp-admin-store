import { IResetPasswordCredentials } from "../entities/IResetPasswordCredentials";

export interface IResetPasswordGateway {
  resetPassword: (credentials: IResetPasswordCredentials) => Promise<any>;
}
