import { IStore } from "../entities/IStore";
import { IUser } from "../entities/IUser";
import { IDocumentUpload, DocumentStatus } from "../entities/IDocument";

export interface IStoreDetailPresenter {
  getStore(storeId: number): void;
  getUsersByStore(storeId: number): void;
  getUser(userId: number): void;
  updateStore(storeId: number, storeData: IStore): void;
  updateUser(userId: number, userData: IUser): void;
  getProvinces: () => void;
  getLocalities: (stateCode: string) => void;
  getIndustries: () => void;
  getDocumentsByEntityId(entityId: number): void;
  downloadDocument(documentId: number, fileName: string): void;
  uploadDocuments(documents: IDocumentUpload, entityId: number): void;
  updateDocument(documentId: number, file: File): void;
  updateDocumentStatus(documentId: number, status: DocumentStatus): void;
}
