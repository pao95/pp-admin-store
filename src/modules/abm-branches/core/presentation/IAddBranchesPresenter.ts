import { IUpdateStoreRequest } from "../entities/IUpdateStoreRequest";

export interface IAddBranchesPresenter {
  updateStore(storeData: IUpdateStoreRequest): void;
  fetchProvinces: () => void;
  fetchLocalities: (provinceName: string) => void;
  fetchStore: (storeId: string) => void;
}
