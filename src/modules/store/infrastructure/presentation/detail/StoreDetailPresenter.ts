import { IStoreDetailPresenter } from "../../../core/presentation/IStoreDetailPresenter";
import { IGetStoreAction } from "../../../core/actions/GetStoreAction";
import { IGetUsersByStoreAction } from "../../../core/actions/GetUsersByStoreAction";
import { IGetUserAction } from "../../../core/actions/GetUserAction";
import { IUpdateStoreAction } from "../../../core/actions/UpdateStoreAction";
import { IUpdateUserAction } from "../../../core/actions/UpdateUserAction";

import { StoreDetailScreens } from "../../../core/screens/IStoreDetailScreens";
import { IGetProvincesAction } from "../../../core/actions/GetProvincesAction";
import { IGetLocalitiesAction } from "../../../core/actions/GetLocalitiesAction";
import { IStore } from "../../../core/entities/IStore";
import { IUser } from "../../../core/entities/IUser";
import { IGetIndustriesAction } from "../../../core/actions/GetIndustriesAction";
import { IGetDocumentsByEntityIdAction } from "../../../core/actions/GetDocumentsByEntityIdAction";
import { IDownloadDocumentAction } from "../../../core/actions/DownloadDocumentAction";
import { IUploadDocumentActions } from "../../../core/actions/UploadDocumentActions";
import { IUpdateDocumentAction } from "../../../core/actions/UpdateDocumentAction";
import { IUpdateDocumentStatusAction } from "../../../core/actions/UpdateDocumentStatusAction";
import { IDocumentUpload, DocumentStatus } from "../../../core/entities/IDocument";

export const StoreDetailPresenter = (
  getStoreAction: IGetStoreAction,
  getUsersByStoreAction: IGetUsersByStoreAction,
  getUserAction: IGetUserAction,
  updateStoreAction: IUpdateStoreAction,
  updateUserAction: IUpdateUserAction,
  getProvincesAction: IGetProvincesAction,
  getLocalitiesAction: IGetLocalitiesAction,
  getIndustriesAction: IGetIndustriesAction,
  getDocumentsByEntityIdAction: IGetDocumentsByEntityIdAction,
  downloadDocumentAction: IDownloadDocumentAction,
  uploadDocumentsAction: IUploadDocumentActions,
  updateDocumentAction: IUpdateDocumentAction,
  updateDocumentStatusAction: IUpdateDocumentStatusAction,
  storeDetailScreens: StoreDetailScreens
): IStoreDetailPresenter => {
  return {
    async getStore(storeId: number) {
      await getStoreAction
        .execute(storeId)
        .then(storeDetailScreens.onGetStoreSuccess)
        .catch(storeDetailScreens.onGetStoreError);
    },

    async getUsersByStore(storeId: number) {
      await getUsersByStoreAction
        .execute(storeId)
        .then(storeDetailScreens.onGetUsersSuccess)
        .catch(storeDetailScreens.onGetUsersError);
    },

    async getUser(userId: number) {
      await getUserAction
        .execute(userId)
        .then(storeDetailScreens.onGetUserSuccess)
        .catch(storeDetailScreens.onGetUserError);
    },

    async updateStore(storeId: number, storeData: IStore) {
      await updateStoreAction
        .execute(storeId, storeData)
        .then(storeDetailScreens.onUpdateStoreSuccess)
        .catch(storeDetailScreens.onUpdateStoreError);
    },

    async updateUser(userId: number, userData: IUser) {
      await updateUserAction
        .execute(userId, userData)
        .then(storeDetailScreens.onUpdateStoreSuccess)
        .catch(storeDetailScreens.onUpdateStoreError);
    },

    async getProvinces() {
      await getProvincesAction
        .execute()
        .then(storeDetailScreens.onGetProvincesSuccess)
        .catch(storeDetailScreens.onGetProvincesError);
    },

    async getLocalities(stateCode: string) {
      await getLocalitiesAction
        .execute(stateCode)
        .then(storeDetailScreens.onGetLocalitiesSuccess)
        .catch(storeDetailScreens.onGetLocalitiesError);
    },

    async getIndustries() {
      await getIndustriesAction
        .execute()
        .then(storeDetailScreens.onGetIndustriesSuccess)
        .catch(storeDetailScreens.onGetIndustriesError);
    },

    async getDocumentsByEntityId(entityId: number) {
      await getDocumentsByEntityIdAction
        .execute(entityId)
        .then(storeDetailScreens.onGetDocumentsSuccess)
        .catch(storeDetailScreens.onGetDocumentsError);
    },

    async downloadDocument(documentId: number, fileName: string) {
      await downloadDocumentAction
        .execute(documentId)
        .then((blob) => {
          storeDetailScreens.onDownloadDocumentSuccess(blob, `${fileName}`);
        })
        .catch(storeDetailScreens.onDownloadDocumentError);
    },

    uploadDocuments(documents: IDocumentUpload, entityId: number) {
      uploadDocumentsAction
        .execute(documents, entityId)
        .then(storeDetailScreens.uploadDocumentsSuccess)
        .catch(storeDetailScreens.uploadDocumentsError);
    },

    updateDocument(documentId: number, file: File) {
      updateDocumentAction
        .execute(documentId, file)
        .then(storeDetailScreens.updateDocumentSuccess)
        .catch(storeDetailScreens.updateDocumentError);
    },

    updateDocumentStatus(documentId: number, status: DocumentStatus) {
      updateDocumentStatusAction
        .execute(documentId, status)
        .then(storeDetailScreens.updateDocumentStatusSuccess)
        .catch(storeDetailScreens.updateDocumentStatusError);
    },
  };
};
