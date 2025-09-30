import { IStore } from "../../../store/core/entities/IStore";
import { IUpdateStoreRequest } from "../entities/IUpdateStoreRequest";
import { IUpdateStoreResponse } from "../entities/IUpdateStoreResponse";

export interface IStoreGateway {
  fetchStore(storeId: string): Promise<IStore>;
  updateStore(storeData: IUpdateStoreRequest): Promise<IUpdateStoreResponse>;
}
