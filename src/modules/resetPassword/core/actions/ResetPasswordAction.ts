import { IResetPasswordCredentials } from "../entities/IResetPasswordCredentials";
import { IResetPasswordGateway } from "../gateways/IResetPasswordGateway";

export interface IResetPasswordAction {
  execute: (credentials: IResetPasswordCredentials) => Promise<boolean>;
}

export const ResetPasswordAction = (resetPasswordGateway: IResetPasswordGateway): IResetPasswordAction => {
  return {
    async execute(credentials) {
      try {
        const result = await resetPasswordGateway.resetPassword(credentials);
        return Promise.resolve(result.success);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
