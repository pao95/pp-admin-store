import { IProvince } from "../entities/IProvince";
import { ILocality } from "../entities/ILocality";
import { IStore } from "../entities/IStore";
import { IUser } from "../entities/IUser";
import { IIndustry } from "../entities/IIndustry";
import { IDocument } from "../entities/IDocument";

export interface StoreDetailScreens {
  onGetStoreSuccess: (storeData: IStore) => void;
  onGetStoreError: (error: string) => void;

  onGetUsersSuccess: (users: IUser[]) => void;
  onGetUsersError: (error: string) => void;

  onGetUserSuccess: (userData: IUser) => void;
  onGetUserError: (error: string) => void;

  onUpdateStoreSuccess: (updatedStore: IStore) => void;
  onUpdateStoreError: (error: string) => void;

  onUpdateUserSuccess: (updatedUser: IUser) => void;
  onUpdateUserError: (error: string) => void;

  onGetProvincesSuccess: (provinces: IProvince[]) => void;
  onGetProvincesError: (error: string) => void;

  onGetLocalitiesSuccess: (localities: ILocality[]) => void;
  onGetLocalitiesError: (error: string) => void;

  onGetIndustriesSuccess: (industries: IIndustry[]) => void;
  onGetIndustriesError: (error: string) => void;

  onGetDocumentsSuccess: (documents: IDocument[]) => void;
  onGetDocumentsError: (error: string) => void;

  onDownloadDocumentSuccess: (blob: Blob, fileName: string) => void;
  onDownloadDocumentError: (error: string) => void;

  uploadDocumentsSuccess: () => void;
  uploadDocumentsError: (err: any) => void;

  updateDocumentSuccess: () => void;
  updateDocumentError: (err: any) => void;

  updateDocumentStatusSuccess: () => void;
  updateDocumentStatusError: (err: any) => void;
}
