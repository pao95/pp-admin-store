import { IAuthPresenter } from "../../core/presentation/IAuthPresenter";
import { IAuthScreens } from "../../core/presentation/IAuthScreens";
import { AuthPresenter } from "./AuthPresenter";
import { IAuthActions } from "../../core/actions/AuthActions";
import { useDependency } from "../../../../hooks/useDependency";
import { IPresenterProvider } from "../../../../utils/IPresenterProvider";

export const authPresenterProvider = (): IPresenterProvider<IAuthScreens, IAuthPresenter> => {
  const authActions = useDependency("authActions") as IAuthActions;

  return {
    getPresenter(viewHandlers) {
      const presenter = AuthPresenter(authActions, viewHandlers);
      return presenter;
    },
  };
};
