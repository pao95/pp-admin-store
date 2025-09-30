import { ResetPasswordScreens } from "../../core/screens/IResetPasswordScreens";
import { IResetPasswordAction } from "../../core/actions/ResetPasswordAction";
import { ResetPasswordPresenter } from "./ResetPasswordPresenter";
import { useDependency } from "../../../../hooks/useDependency";
import { IResetPasswordPresenter } from "../../core/presentation/IResetPasswordPresenter";
import { IPresenterProvider } from "../../../../utils/IPresenterProvider";

export const resetPasswordPresenterProvider = (): IPresenterProvider<ResetPasswordScreens, IResetPasswordPresenter> => {
  const resetPasswordAction = useDependency("resetPasswordAction") as IResetPasswordAction;

  return {
    getPresenter(viewHandlers) {
      const presenter = ResetPasswordPresenter(resetPasswordAction, viewHandlers);
      return presenter;
    },
  };
};
