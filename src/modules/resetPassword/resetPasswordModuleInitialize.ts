import { DependencyManager } from "../../dependencyManager";
import { IHttpClient } from "../httpClient/interfaces";
import { ResetPasswordAction } from "./core/actions/ResetPasswordAction";
import { HttpResetPasswordGateway } from "./infrastructure/gateways/HttpResetPasswordGateway";

export const resetPasswordModuleInitialize = (dependencyManager: DependencyManager) => {
  const resetPasswordGateway = HttpResetPasswordGateway(GetHttpClientDependency(dependencyManager));
  const resetPasswordAction = ResetPasswordAction(resetPasswordGateway);

  dependencyManager.register("resetPasswordAction", resetPasswordAction);
};

export const GetHttpClientDependency = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("httpClient") as IHttpClient;
};
