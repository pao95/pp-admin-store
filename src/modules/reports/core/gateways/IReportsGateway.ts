import { IReportRequest, IReportResponse } from "../entities/IReportRequest";

export interface IReportsGateway {
  downloadReport: (request: IReportRequest) => Promise<IReportResponse>;
}
