import { IStoreRegisterPresenter } from "../../../core/presentation/IStoreRegisterPresenter";
import { ICreateStoreAction } from "../../../core/actions/CreateStoreAction";
import { IGetProvincesAction } from "../../../core/actions/GetProvincesAction";
import { IGetLocalitiesAction } from "../../../core/actions/GetLocalitiesAction";
import { StoreRegisterScreens } from "../../../core/screens/IStoreRegisterScreens";
import { IStore } from "../../../core/entities/IStore";
import { IUser } from "../../../core/entities/IUser";
import { IGetIndustriesAction } from "../../../core/actions/GetIndustriesAction";
import { IGetVatConditionsAction } from "../../../core/actions/GetVatConditionsAction";
import { IGetIibbRegistrationsAction } from "../../../core/actions/GetIibbRegistrationsAction";
import { IUploadDocumentActions } from "../../../core/actions/UploadDocumentActions";
import { ICreateUserAndAssignToStoreAction } from "../../../core/actions/CreateUserAndAssignToStoreAction";
import { IDocumentUpload } from "../../../core/entities/IDocument";

export const StoreRegisterPresenter = (
  createStoreAction: ICreateStoreAction,
  getProvincesAction: IGetProvincesAction,
  getLocalitiesAction: IGetLocalitiesAction,
  getIndustriesAction: IGetIndustriesAction,
  getVatConditionsAction: IGetVatConditionsAction,
  getIibbRegistrationsAction: IGetIibbRegistrationsAction,
  uploadDocumentsAction: IUploadDocumentActions,
  createUserAndAssignToStoreAction: ICreateUserAndAssignToStoreAction,
  storeRegisterScreens: StoreRegisterScreens
): IStoreRegisterPresenter => {
  return {
    async createStore(storeData: IStore) {
      await createStoreAction
        .execute(storeData)
        .then((idStore) => storeRegisterScreens.createStoreSuccess(idStore))
        .catch((err) => storeRegisterScreens.createStoreError(err));
    },

    uploadDocuments(documents: IDocumentUpload, entityId: number) {
      uploadDocumentsAction
        .execute(documents, entityId)
        .then(storeRegisterScreens.uploadDocumentsSuccess)
        .catch(storeRegisterScreens.uploadDocumentsError);
    },

    createUserAndAssignToStore(storeId: number, userData: IUser) {
      createUserAndAssignToStoreAction
        .execute(storeId, userData)
        .then(storeRegisterScreens.createUserAndAssignToStoreSuccess)
        .catch(storeRegisterScreens.createUserAndAssignToStoreError);
    },
    getProvinces() {
      getProvincesAction
        .execute()
        .then(storeRegisterScreens.onGetProvincesSuccess)
        .catch(storeRegisterScreens.onGetProvincesError);
    },

    getLocalities(stateCode: string) {
      getLocalitiesAction
        .execute(stateCode)
        .then(storeRegisterScreens.onGetLocalitiesSuccess)
        .catch(storeRegisterScreens.onGetLocalitiesError);
    },

    getVatConditions() {
      getVatConditionsAction
        .execute()
        .then(storeRegisterScreens.onGetVatConditionsSuccess)
        .catch(storeRegisterScreens.onGetVatConditionsError);
    },

    getIibbRegistrations() {
      getIibbRegistrationsAction
        .execute()
        .then(storeRegisterScreens.onGetIibbRegistrationsSuccess)
        .catch(storeRegisterScreens.onGetIibbRegistrationsError);
    },

    getIndustries() {
      getIndustriesAction
        .execute()
        .then(storeRegisterScreens.onGetIndustriesSuccess)
        .catch(storeRegisterScreens.onGetIndustriesError);
    },
  };
};
