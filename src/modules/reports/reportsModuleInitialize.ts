import { DependencyManager } from "../../dependencyManager";
import { IHttpClient } from "../httpClient/interfaces";
import { DownloadReportAction } from "./core/actions/DownloadReportAction";
import { HttpReportsGateway } from "./infrastructure/gateways/HttpReportsGateway";

export const reportsModuleInitialize = (dependencyManager: DependencyManager) => {
  const reportsGateway = HttpReportsGateway(GetHttpClientDependency(dependencyManager));
  const downloadReportAction = DownloadReportAction(reportsGateway);

  dependencyManager.register("downloadReportAction", downloadReportAction);
};

const GetHttpClientDependency = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("httpClient") as IHttpClient;
};
