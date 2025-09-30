import { IStore } from "../entities/IStore";
import { IStoreGateway } from "../gateways/IStoreGateway";

export interface IUpdateStoreAction {
  execute: (storeId: number, storeData: IStore) => Promise<any>;
}

export const UpdateStoreAction = (storeGateway: IStoreGateway): IUpdateStoreAction => {
  return {
    async execute(storeId, storeData) {
      try {
        const response = await storeGateway.updateStore(storeId, storeData);
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
