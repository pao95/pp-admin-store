import { IStore } from "../../../store/core/entities/IStore";
import { IStoreGateway } from "../gateways/IStoreGateway";

export interface IFetchStoreAction {
  execute: (storeId: string) => Promise<IStore>;
}

export const FetchStoreAction = (storeGateway: IStoreGateway): IFetchStoreAction => {
  return {
    async execute(storeId) {
      try {
        const response = await storeGateway.fetchStore(storeId);
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
