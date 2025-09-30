import { IStore } from "../entities/IStore";
import { IStoreGateway } from "../gateways/IStoreGateway";

export interface IGetStoresAction {
  execute: (
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
}

export const GetStoresAction = (storesGateway: IStoreGateway): IGetStoresAction => {
  return {
    async execute(querySearch = "", state = "all", sortDir = "desc", sortBy = "idStore", page = 1, limit = 10) {
      try {
        const response = await storesGateway.getStores(querySearch, state, sortDir, sortBy, page, limit);
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
