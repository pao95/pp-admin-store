export interface IReportRequest {
  startDate: string;
  endDate: string;
  status?: string;
}

export interface IReportResponse {
  success: boolean;
  message?: string;
  downloadUrl?: string;
}
