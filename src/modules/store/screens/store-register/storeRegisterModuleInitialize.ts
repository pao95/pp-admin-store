import { DependencyManager } from "../../../../dependencyManager";
import { IHttpClient } from "../../../httpClient/interfaces";
import { CreateStoreAction } from "../../core/actions/CreateStoreAction";
import { HttpStoreGateway } from "../../infrastructure/gateways/HttpStoreGateway";
import { GeoRefGateway } from "../../infrastructure/gateways/GeoRefGateway";
import { GetProvincesAction } from "../../core/actions/GetProvincesAction";
import { GetLocalitiesAction } from "../../core/actions/GetLocalitiesAction";
import { GetIndustriesAction } from "../../core/actions/GetIndustriesAction";
import { GetVatConditionsAction } from "../../core/actions/GetVatConditionsAction";
import { GetIibbRegistrationsAction } from "../../core/actions/GetIibbRegistrationsAction";
import { HttpMasterDataGateway } from "../../infrastructure/gateways/HttpMasterDataGateway";
import { UploadDocumentActions } from "../../core/actions/UploadDocumentActions";
import { CreateUserAndAssignToStoreAction } from "../../core/actions/CreateUserAndAssignToStoreAction";
import { HttpDocumentsGateway } from "../../infrastructure/gateways/HttpDocumentsGateway";

export const storeRegisterModuleInitialize = (dependencyManager: DependencyManager) => {
  const httpClient = GetHttpClientDependency(dependencyManager);

  const storeGateway = HttpStoreGateway(httpClient);
  const geoRefGateway = GeoRefGateway(httpClient);
  const masterDataGateway = HttpMasterDataGateway(httpClient);
  const documentsGateway = HttpDocumentsGateway(httpClient);
  const createStoreAction = CreateStoreAction(storeGateway);
  const uploadDocumentsAction = UploadDocumentActions(documentsGateway);
  const createUserAndAssignToStoreAction = CreateUserAndAssignToStoreAction(storeGateway);
  const getProvincesAction = GetProvincesAction(geoRefGateway);
  const getLocalitiesAction = GetLocalitiesAction(geoRefGateway);
  const getIndustriesAction = GetIndustriesAction(masterDataGateway);
  const getVatConditionsAction = GetVatConditionsAction(masterDataGateway);
  const getIibbRegistrationsAction = GetIibbRegistrationsAction(masterDataGateway);

  dependencyManager.register("createStoreAction", createStoreAction);
  dependencyManager.register("uploadDocumentsAction", uploadDocumentsAction);
  dependencyManager.register("createUserAndAssignToStoreAction", createUserAndAssignToStoreAction);
  dependencyManager.register("getProvincesAction", getProvincesAction);
  dependencyManager.register("getLocalitiesAction", getLocalitiesAction);
  dependencyManager.register("getIndustriesAction", getIndustriesAction);
  dependencyManager.register("getVatConditionsAction", getVatConditionsAction);
  dependencyManager.register("getIibbRegistrationsAction", getIibbRegistrationsAction);
};

export const GetHttpClientDependency = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("httpClient") as IHttpClient;
};
