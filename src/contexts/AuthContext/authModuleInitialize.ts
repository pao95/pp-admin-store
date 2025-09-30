import { DependencyManager } from "../../dependencyManager";
import { IHttpClient } from "../../modules/httpClient/interfaces";
import { HttpAuthGateway } from "./infrastructure/gateways/HttpAuthGateway";
import { AuthActions } from "./core/actions/AuthActions";

export const authModuleInitialize = (dependencyManager: DependencyManager) => {
  const httpClient = GetHttpClientDependency(dependencyManager);
  const authGateway = HttpAuthGateway(httpClient);
  const authActions = AuthActions(authGateway);

  dependencyManager.register("authActions", authActions);
};
export const GetHttpClientDependency = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("httpClient") as IHttpClient;
};
