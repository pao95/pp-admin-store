import { IUser } from "../entities/IUser";
import { IStoreGateway } from "../gateways/IStoreGateway";

export interface ICreateUserAndAssignToStoreAction {
  execute: (storeId: number, userData: IUser) => Promise<any>;
}

export const CreateUserAndAssignToStoreAction = (storeGateway: IStoreGateway): ICreateUserAndAssignToStoreAction => {
  return {
    async execute(storeId, userData) {
      try {
        const response = await storeGateway.createUserAndAssignToStore(storeId, userData);
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
