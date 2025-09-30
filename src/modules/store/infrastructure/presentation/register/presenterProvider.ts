import { StoreRegisterScreens } from "../../../core/screens/IStoreRegisterScreens";
import { ICreateStoreAction } from "../../../core/actions/CreateStoreAction";
import { StoreRegisterPresenter } from "./StoreRegisterPresenter";
import { useDependency } from "../../../../../hooks/useDependency";
import { IStoreRegisterPresenter } from "../../../core/presentation/IStoreRegisterPresenter";
import { IPresenterProvider } from "../../../../../utils/IPresenterProvider";
import { IGetProvincesAction } from "../../../core/actions/GetProvincesAction";
import { IGetLocalitiesAction } from "../../../core/actions/GetLocalitiesAction";
import { IGetIndustriesAction } from "../../../core/actions/GetIndustriesAction";
import { IGetVatConditionsAction } from "../../../core/actions/GetVatConditionsAction";
import { IGetIibbRegistrationsAction } from "../../../core/actions/GetIibbRegistrationsAction";
import { IUploadDocumentActions } from "../../../core/actions/UploadDocumentActions";
import { ICreateUserAndAssignToStoreAction } from "../../../core/actions/CreateUserAndAssignToStoreAction";

export const storeRegisterPresenterProvider = (): IPresenterProvider<StoreRegisterScreens, IStoreRegisterPresenter> => {
  const createStoreAction = useDependency("createStoreAction") as ICreateStoreAction;
  const getProvincesAction = useDependency("getProvincesAction") as IGetProvincesAction;
  const getLocalitiesAction = useDependency("getLocalitiesAction") as IGetLocalitiesAction;
  const getIndustriesAction = useDependency("getIndustriesAction") as IGetIndustriesAction;
  const getVatConditionsAction = useDependency("getVatConditionsAction") as IGetVatConditionsAction;
  const getIibbRegistrationsAction = useDependency("getIibbRegistrationsAction") as IGetIibbRegistrationsAction;
  const uploadDocumentsAction = useDependency("uploadDocumentsAction") as IUploadDocumentActions;
  const createUserAndAssignToStoreAction = useDependency(
    "createUserAndAssignToStoreAction"
  ) as ICreateUserAndAssignToStoreAction;

  return {
    getPresenter(viewHandlers) {
      const presenter = StoreRegisterPresenter(
        createStoreAction,
        getProvincesAction,
        getLocalitiesAction,
        getIndustriesAction,
        getVatConditionsAction,
        getIibbRegistrationsAction,
        uploadDocumentsAction,
        createUserAndAssignToStoreAction,
        viewHandlers
      );
      return presenter;
    },
  };
};
