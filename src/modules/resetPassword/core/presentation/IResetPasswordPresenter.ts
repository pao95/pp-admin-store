import { IResetPasswordCredentials } from "../entities/IResetPasswordCredentials";

export interface IResetPasswordPresenter {
  resetPassword(credentials: IResetPasswordCredentials): void;
}
