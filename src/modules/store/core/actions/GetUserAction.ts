import { IUser } from "../entities/IUser";
import { IHttpUsersGateway } from "../gateways/IHttpUsersGateway";

export interface IGetUserAction {
  execute: (userId: number) => Promise<IUser>;
}

export const GetUserAction = (usersGateway: IHttpUsersGateway): IGetUserAction => {
  return {
    async execute(userId) {
      try {
        const response = await usersGateway.getUser(userId);
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
