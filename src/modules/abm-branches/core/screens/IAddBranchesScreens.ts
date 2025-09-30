import { ILocality } from "../../../store/core/entities/ILocality";
import { IProvince } from "../../../store/core/entities/IProvince";
import { IStore } from "../../../store/core/entities/IStore";

export interface AddBranchesScreens {
  updateStoreSuccess(): void;
  updateStoreError(error: string): void;
  onFetchProvincesSuccess: (provinces: IProvince[]) => void;
  onFetchProvincesError: (error: string) => void;
  onFetchLocalitiesSuccess: (localities: ILocality[]) => void;
  onFetchLocalitiesError: (error: string) => void;
  onFetchStoreSuccess: (storeData: IStore) => void;
  onFetchStoreError: (error: string) => void;
}
