import { IStore } from "../entities/IStore";
import { IUser } from "../entities/IUser";

export interface IStoreGateway {
  createStore: (storeData: IStore) => Promise<any>;
  getStores: (
    querySearch?: string,
    state?: string,
    sortDir?: string,
    sortBy?: string,
    page?: number,
    limit?: number
  ) => Promise<{
    stores: IStore[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  getStore(storeId: number): Promise<IStore>;
  updateStore(storeId: number, storeData: IStore): Promise<any>;
  createUserAndAssignToStore(storeId: number, userData: IUser): Promise<any>;
}
