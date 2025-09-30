import { IUpdateStoreRequest } from "../entities/IUpdateStoreRequest";
import { IUpdateStoreResponse } from "../entities/IUpdateStoreResponse";
import { IStoreGateway } from "../gateways/IStoreGateway";

export interface IUpdateStoreAction {
  execute: (storeData: IUpdateStoreRequest) => Promise<IUpdateStoreResponse>;
}

export const UpdateStoreAction = (storeGateway: IStoreGateway): IUpdateStoreAction => {
  return {
    async execute(storeData) {
      try {
        const response = await storeGateway.updateStore(storeData);
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
