import { AddBranchesScreens } from "../../core/screens/IAddBranchesScreens";
import { IUpdateStoreAction } from "../../core/actions/UpdateStoreAction";
import { IFetchProvincesAction } from "../../core/actions/FetchProvincesAction";
import { IFetchLocalitiesAction } from "../../core/actions/FetchLocalitiesAction";
import { IFetchStoreAction } from "../../core/actions/FetchStoreAction";
import { AddBranchesPresenter } from "./AddBranchesPresenter";
import { IAddBranchesPresenter } from "../../core/presentation/IAddBranchesPresenter";
import { useDependency } from "../../../../hooks/useDependency";
import { IPresenterProvider } from "../../../../utils/IPresenterProvider";

export const addBranchesPresenterProvider = (): IPresenterProvider<AddBranchesScreens, IAddBranchesPresenter> => {
  const updateStoreAction = useDependency("updateBranchesStoreAction") as IUpdateStoreAction;
  const fetchProvincesAction = useDependency("fetchProvincesAction") as IFetchProvincesAction;
  const fetchLocalitiesAction = useDependency("fetchLocalitiesAction") as IFetchLocalitiesAction;
  const fetchStoreAction = useDependency("fetchStoreAction") as IFetchStoreAction;

  return {
    getPresenter(viewHandlers: AddBranchesScreens) {
      const presenter = AddBranchesPresenter(
        updateStoreAction,
        fetchProvincesAction,
        fetchLocalitiesAction,
        fetchStoreAction,
        viewHandlers
      );
      return presenter;
    },
  };
};
