import { IReportsScreens } from "../../core/screens/IReportsScreens";
import { ReportsPresenter } from "./ReportsPresenter";
import { useDependency } from "../../../../hooks/useDependency";
import { IReportsPresenter } from "../../core/presentation/IReportsPresenter";
import { IPresenterProvider } from "../../../../utils/IPresenterProvider";
import { IDownloadReportAction } from "../../core/actions/DownloadReportAction";

export const reportsPresenterProvider = (): IPresenterProvider<IReportsScreens, IReportsPresenter> => {
  const downloadReportAction = useDependency("downloadReportAction") as IDownloadReportAction;

  return {
    getPresenter(viewHandlers) {
      const presenter = ReportsPresenter(downloadReportAction, viewHandlers);
      return presenter;
    },
  };
};
