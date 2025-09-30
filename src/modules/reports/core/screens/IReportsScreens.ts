import { IReportResponse } from "../entities/IReportRequest";

export interface IReportsScreens {
  onDownloadReportSuccess: (response: IReportResponse) => void;
  onDownloadReportError: (error: string) => void;
}
