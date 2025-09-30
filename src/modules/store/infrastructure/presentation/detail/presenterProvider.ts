import { StoreDetailScreens } from "../../../core/screens/IStoreDetailScreens";
import { IGetUsersByStoreAction } from "../../../core/actions/GetUsersByStoreAction";
import { IGetUserAction } from "../../../core/actions/GetUserAction";
import { IUpdateStoreAction } from "../../../core/actions/UpdateStoreAction";
import { IUpdateUserAction } from "../../../core/actions/UpdateUserAction";
import { StoreDetailPresenter } from "./StoreDetailPresenter";
import { useDependency } from "../../../../../hooks/useDependency";
import { IStoreDetailPresenter } from "../../../core/presentation/IStoreDetailPresenter";
import { IPresenterProvider } from "../../../../../utils/IPresenterProvider";
import { IGetProvincesAction } from "../../../core/actions/GetProvincesAction";
import { IGetLocalitiesAction } from "../../../core/actions/GetLocalitiesAction";
import { IGetStoreAction } from "../../../core/actions/GetStoreAction";
import { IGetIndustriesAction } from "../../../core/actions/GetIndustriesAction";
import { IGetDocumentsByEntityIdAction } from "../../../core/actions/GetDocumentsByEntityIdAction";
import { IDownloadDocumentAction } from "../../../core/actions/DownloadDocumentAction";
import { IUploadDocumentActions } from "../../../core/actions/UploadDocumentActions";
import { IUpdateDocumentAction } from "../../../core/actions/UpdateDocumentAction";
import { IUpdateDocumentStatusAction } from "../../../core/actions/UpdateDocumentStatusAction";

export const storeDetailPresenterProvider = (): IPresenterProvider<StoreDetailScreens, IStoreDetailPresenter> => {
  const getStoreAction = useDependency("getStoreAction") as IGetStoreAction;
  const getUsersByStoreAction = useDependency("getUsersByStoreAction") as IGetUsersByStoreAction;
  const getUserAction = useDependency("getUserAction") as IGetUserAction;
  const updateStoreAction = useDependency("updateStoreAction") as IUpdateStoreAction;
  const updateUserAction = useDependency("updateUserAction") as IUpdateUserAction;
  const getProvincesAction = useDependency("getProvincesAction") as IGetProvincesAction;
  const getLocalitiesAction = useDependency("getLocalitiesAction") as IGetLocalitiesAction;
  const getIndustriesAction = useDependency("getIndustriesAction") as IGetIndustriesAction;
  const getDocumentsByEntityIdAction = useDependency("getDocumentsByEntityIdAction") as IGetDocumentsByEntityIdAction;
  const downloadDocumentAction = useDependency("downloadDocumentAction") as IDownloadDocumentAction;
  const uploadDocumentsAction = useDependency("uploadDocumentsAction") as IUploadDocumentActions;
  const updateDocumentAction = useDependency("updateDocumentAction") as IUpdateDocumentAction;
  const updateDocumentStatusAction = useDependency("updateDocumentStatusAction") as IUpdateDocumentStatusAction;

  return {
    getPresenter(viewHandlers) {
      const presenter = StoreDetailPresenter(
        getStoreAction,
        getUsersByStoreAction,
        getUserAction,
        updateStoreAction,
        updateUserAction,
        getProvincesAction,
        getLocalitiesAction,
        getIndustriesAction,
        getDocumentsByEntityIdAction,
        downloadDocumentAction,
        uploadDocumentsAction,
        updateDocumentAction,
        updateDocumentStatusAction,
        viewHandlers
      );
      return presenter;
    },
  };
};
