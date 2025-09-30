import { IUser } from "../entities/IUser";
import { IHttpUsersGateway } from "../gateways/IHttpUsersGateway";

export interface IGetUsersByStoreAction {
  execute: (storeId: number) => Promise<IUser[]>;
}

export const GetUsersByStoreAction = (usersGateway: IHttpUsersGateway): IGetUsersByStoreAction => {
  return {
    async execute(storeId) {
      try {
        const response = await usersGateway.getUsersByStore(storeId);
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
