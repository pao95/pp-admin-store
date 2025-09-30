import { IReportsGateway } from "../../core/gateways/IReportsGateway";
import { HttpResponse, IHttpClient } from "../../../httpClient/interfaces";
import { REPORTS_API } from "../../../../constants/api";
import { IReportRequest, IReportResponse } from "../../core/entities/IReportRequest";

export const HttpReportsGateway = (httpClient: IHttpClient): IReportsGateway => {
  const toReportResponse = (response: HttpResponse): IReportResponse => {
    const { data } = response as {
      data: IReportResponse;
    };

    return {
      success: data.success,
      message: data.message,
      downloadUrl: data.downloadUrl,
    };
  };

  return {
    async downloadReport(request: IReportRequest) {
      try {
        const params: any = {
          startDate: request.startDate,
          endDate: request.endDate,
        };

        if (request.status) {
          params.status = request.status;
        }

        const response = await httpClient.get(`${REPORTS_API}/download`, params);

        if (!response.status) {
          return Promise.reject(response?.error?.message || "");
        }

        const result = toReportResponse(response);
        return Promise.resolve(result);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
  };
};
