import { DependencyManager } from "../../dependencyManager";
import { IHttpClient } from "../httpClient/interfaces";
import { FetchProvincesAction } from "./core/actions/FetchProvincesAction";
import { FetchLocalitiesAction } from "./core/actions/FetchLocalitiesAction";
import { HttpStoreGateway } from "./infrastructure/gateways/HttpStoreGateway";
import { GeoRefGateway } from "./infrastructure/gateways/GeoRefGateway";
import { UpdateStoreAction } from "./core/actions/UpdateStoreAction";
import { FetchStoreAction } from "./core/actions/FetchStoreAction";

export const abmBranchesModuleInitialize = (dependencyManager: DependencyManager) => {
  const storeGateway = HttpStoreGateway(GetHttpClientDependency(dependencyManager));
  const geoRefGateway = GeoRefGateway();

  const updateStoreAction = UpdateStoreAction(storeGateway);
  const fetchProvincesAction = FetchProvincesAction(geoRefGateway);
  const fetchLocalitiesAction = FetchLocalitiesAction(geoRefGateway);
  const fetchStoreAction = FetchStoreAction(storeGateway);

  dependencyManager.register("updateBranchesStoreAction", updateStoreAction);
  dependencyManager.register("fetchProvincesAction", fetchProvincesAction);
  dependencyManager.register("fetchLocalitiesAction", fetchLocalitiesAction);
  dependencyManager.register("fetchStoreAction", fetchStoreAction);
};

export const GetHttpClientDependency = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("httpClient") as IHttpClient;
};
