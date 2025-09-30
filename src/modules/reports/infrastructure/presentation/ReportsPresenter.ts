import { IReportsPresenter } from "../../core/presentation/IReportsPresenter";
import { IReportRequest } from "../../core/entities/IReportRequest";
import { IReportsScreens } from "../../core/screens/IReportsScreens";
import { IDownloadReportAction } from "../../core/actions/DownloadReportAction";

export const ReportsPresenter = (
  downloadReportAction: IDownloadReportAction,
  reportsScreens: IReportsScreens
): IReportsPresenter => {
  return {
    downloadReport(request: IReportRequest) {
      downloadReportAction
        .execute(request)
        .then(reportsScreens.onDownloadReportSuccess)
        .catch(reportsScreens.onDownloadReportError);
    },
  };
};
