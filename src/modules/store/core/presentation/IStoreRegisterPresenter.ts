import { IStore } from "../entities/IStore";
import { IUser } from "../entities/IUser";
import { IDocumentUpload } from "../entities/IDocument";
export interface IStoreRegisterPresenter {
  createStore(storeData: IStore): void;
  uploadDocuments(documents: IDocumentUpload, entityId: number): void;
  createUserAndAssignToStore(storeId: number, userData: IUser): void;
  getProvinces: () => void;
  getLocalities: (stateCode: string) => void;
  getVatConditions: () => void;
  getIibbRegistrations: () => void;
  getIndustries: () => void;
}
