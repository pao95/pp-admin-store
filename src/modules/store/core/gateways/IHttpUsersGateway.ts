import { IUser } from "../entities/IUser";

export interface IHttpUsersGateway {
  getUsersByStore(storeId: number): Promise<IUser[]>;
  getUser(userId: number): Promise<IUser>;
  updateUser(userId: number, userData: IUser): Promise<any>;
}
