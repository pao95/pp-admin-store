import { IHttpUsersGateway } from "../gateways/IHttpUsersGateway";
import { IUser } from "../entities/IUser";

export interface IUpdateUserAction {
  execute: (userId: number, userData: IUser) => Promise<any>;
}

export const UpdateUserAction = (usersGateway: IHttpUsersGateway): IUpdateUserAction => {
  return {
    async execute(userId, userData) {
      try {
        const response = await usersGateway.updateUser(userId, userData);
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
