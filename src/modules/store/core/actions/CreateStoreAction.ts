import { IStoreGateway } from "../gateways/IStoreGateway";
import { IStore } from "../entities/IStore";

export interface ICreateStoreAction {
  execute: (storeData: IStore) => Promise<any>;
}

export const CreateStoreAction = (storeGateway: IStoreGateway): ICreateStoreAction => {
  return {
    async execute(storeData) {
      try {
        const response = await storeGateway.createStore(storeData);
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
