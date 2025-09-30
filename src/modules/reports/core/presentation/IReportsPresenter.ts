import { IReportRequest } from "../entities/IReportRequest";

export interface IReportsPresenter {
  downloadReport: (request: IReportRequest) => void;
}
