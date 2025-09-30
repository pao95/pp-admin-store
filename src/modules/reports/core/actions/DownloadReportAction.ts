import { IReportsGateway } from "../gateways/IReportsGateway";
import { IReportRequest, IReportResponse } from "../entities/IReportRequest";

export interface IDownloadReportAction {
  execute: (request: IReportRequest) => Promise<IReportResponse>;
}

export const DownloadReportAction = (reportsGateway: IReportsGateway): IDownloadReportAction => {
  return {
    async execute(request: IReportRequest) {
      try {
        const response = await reportsGateway.downloadReport(request);
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
