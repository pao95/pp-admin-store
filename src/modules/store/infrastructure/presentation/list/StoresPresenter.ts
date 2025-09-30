import { IStoresPresenter } from "../../../core/presentation/IStoresPresenter";
import { StoresScreens } from "../../../core/screens/IStoresScreens";
import { IGetStoresAction } from "../../../core/actions/GetStoresAction";

export const StoresPresenter = (getStoresAction: IGetStoresAction, storesScreens: StoresScreens): IStoresPresenter => {
  return {
    getStores(querySearch = "", state = "all", sortDir = "desc", sortBy = "createdAt", page = 1, limit = 10) {
      getStoresAction
        .execute(querySearch, state, sortDir, sortBy, page, limit)
        .then(storesScreens.onGetStoresSuccess)
        .catch(storesScreens.onGetStoresError);
    },
  };
};
