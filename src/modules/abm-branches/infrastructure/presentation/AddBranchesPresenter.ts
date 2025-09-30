import { IAddBranchesPresenter } from "../../core/presentation/IAddBranchesPresenter";
import { IUpdateStoreAction } from "../../core/actions/UpdateStoreAction";
import { IFetchProvincesAction } from "../../core/actions/FetchProvincesAction";
import { IFetchLocalitiesAction } from "../../core/actions/FetchLocalitiesAction";
import { IFetchStoreAction } from "../../core/actions/FetchStoreAction";
import { AddBranchesScreens } from "../../core/screens/IAddBranchesScreens";
import { IUpdateStoreRequest } from "../../core/entities/IUpdateStoreRequest";

export const AddBranchesPresenter = (
  updateStoreAction: IUpdateStoreAction,
  fetchProvincesAction: IFetchProvincesAction,
  fetchLocalitiesAction: IFetchLocalitiesAction,
  fetchStoreAction: IFetchStoreAction,
  addBranchesScreens: AddBranchesScreens
): IAddBranchesPresenter => {
  return {
    async updateStore(storeData: IUpdateStoreRequest) {
      await updateStoreAction
        .execute(storeData)
        .then((_) => addBranchesScreens.updateStoreSuccess())
        .catch((err) => addBranchesScreens.updateStoreError(err));
    },

    fetchProvinces() {
      fetchProvincesAction
        .execute()
        .then(addBranchesScreens.onFetchProvincesSuccess)
        .catch(addBranchesScreens.onFetchProvincesError);
    },

    fetchLocalities(provinceName) {
      fetchLocalitiesAction
        .execute(provinceName)
        .then(addBranchesScreens.onFetchLocalitiesSuccess)
        .catch(addBranchesScreens.onFetchLocalitiesError);
    },

    fetchStore(storeId) {
      fetchStoreAction
        .execute(storeId)
        .then(addBranchesScreens.onFetchStoreSuccess)
        .catch(addBranchesScreens.onFetchStoreError);
    },
  };
};
