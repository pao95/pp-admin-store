import { StoresScreens } from "../../../core/screens/IStoresScreens";
import { useDependency } from "../../../../../hooks/useDependency";
import { IStoresPresenter } from "../../../core/presentation/IStoresPresenter";
import { IPresenterProvider } from "../../../../../utils/IPresenterProvider";
import { IGetStoresAction } from "../../../core/actions/GetStoresAction";
import { StoresPresenter } from "./StoresPresenter";

export const storesPresenterProvider = (): IPresenterProvider<StoresScreens, IStoresPresenter> => {
  const getStoresAction = useDependency("getStoresAction") as IGetStoresAction;

  return {
    getPresenter(viewHandlers) {
      const presenter = StoresPresenter(getStoresAction, viewHandlers);
      return presenter;
    },
  };
};
