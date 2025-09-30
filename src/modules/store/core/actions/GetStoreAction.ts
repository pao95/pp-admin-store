import { IStore } from "../entities/IStore";
import { IStoreGateway } from "../gateways/IStoreGateway";

export interface IGetStoreAction {
  execute: (storeId: number) => Promise<IStore>;
}

export const GetStoreAction = (storeGateway: IStoreGateway): IGetStoreAction => {
  return {
    async execute(storeId) {
      try {
        const response = await storeGateway.getStore(storeId);
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
