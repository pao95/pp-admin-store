export interface HttpParams {
  [key: string]: any;
}

export interface HttpHeaders {
  [key: string]: any;
}

export interface HttpResponse {
  code: number;
  data: any;
  error?: {
    message: string;
    details?: string;
    code?: string;
  };
  status: boolean;
  statusText?: string;
}

export interface IHttpClient {
  get: (url: string, params?: HttpParams, headers?: HttpHeaders, contentType?: string) => Promise<HttpResponse>;
  getBlob: (url: string, params?: HttpParams, headers?: HttpHeaders) => Promise<HttpResponse>;
  post: (
    url: string,
    params?: HttpParams | string,
    headers?: HttpHeaders,
    contentType?: string
  ) => Promise<HttpResponse>;
  delete: (
    url: string,
    params?: HttpParams | string,
    headers?: HttpHeaders,
    contentType?: string
  ) => Promise<HttpResponse>;
  put: (
    url: string,
    params?: HttpParams | string,
    headers?: HttpHeaders,
    contentType?: string
  ) => Promise<HttpResponse>;
}
