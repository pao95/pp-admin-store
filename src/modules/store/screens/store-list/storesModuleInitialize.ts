import { DependencyManager } from "../../../../dependencyManager";
import { IHttpClient } from "../../../httpClient/interfaces";
import { GetStoresAction } from "../../core/actions/GetStoresAction";
import { HttpStoreGateway } from "../../infrastructure/gateways/HttpStoreGateway";

export const storesModuleInitialize = (dependencyManager: DependencyManager) => {
  const storesGateway = HttpStoreGateway(GetHttpClientDependency(dependencyManager));
  const getStoresAction = GetStoresAction(storesGateway);

  dependencyManager.register("getStoresAction", getStoresAction);
};

export const GetHttpClientDependency = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("httpClient") as IHttpClient;
};
