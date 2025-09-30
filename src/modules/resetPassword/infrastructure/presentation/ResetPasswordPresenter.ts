import { IResetPasswordPresenter } from "../../core/presentation/IResetPasswordPresenter";
import { IResetPasswordAction } from "../../core/actions/ResetPasswordAction";
import { IResetPasswordCredentials } from "../../core/entities/IResetPasswordCredentials";
import { ResetPasswordScreens } from "../../core/screens/IResetPasswordScreens";

export const ResetPasswordPresenter = (
  resetPasswordAction: IResetPasswordAction,
  resetPasswordScreens: ResetPasswordScreens
): IResetPasswordPresenter => {
  return {
    async resetPassword(credentials: IResetPasswordCredentials) {
      await resetPasswordAction
        .execute(credentials)
        .then((_) => resetPasswordScreens.resetPasswordSuccess())
        .catch((err) => resetPasswordScreens.resetPasswordError(err));
    },
  };
};
