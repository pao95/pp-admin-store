import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import HttpStatusCode from "./httpStatusCodes";
import { HttpParams, HttpResponse, IHttpClient } from "./interfaces";
import { BASE_URL } from "../../config";
import { DependencyManager } from "../../dependencyManager";

// Constants
const REFRESH_TOKEN_ENDPOINT = "/auth/refresh";
const LOGIN_ENDPOINT = "/auth/login";
const LOGOUT_ENDPOINT = "/auth/logout";
const DEFAULT_CONTENT_TYPE = "application/json";
const DEFAULT_ACCEPT = "application/json";
const BLOB_ACCEPT = "*/*";

// Error messages
const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network Error",
  DOMAIN_NOT_FOUND: "Domain Not Found",
  REQUEST_TIMEOUT: "Request Timeout",
  UNDEFINED_RESPONSE: "Undefined response",
  GENERIC_ERROR: "An error occurred",
} as const;

const ERROR_DETAILS = {
  NETWORK_ERROR: "The server is unreachable or there is a network connectivity issue",
  DOMAIN_NOT_FOUND: "The domain name could not be resolved. Please check the URL and try again.",
  NETWORK_CONNECTION: "Unable to connect to the server. Please check your internet connection.",
  REQUEST_TIMEOUT: "The request took too long to complete. Please try again.",
  GENERIC_ERROR: "Please try again later",
} as const;

// Network error codes
const NETWORK_ERROR_CODES = {
  NAME_NOT_RESOLVED: "ERR_NAME_NOT_RESOLVED",
  NETWORK: "ERR_NETWORK",
  CONNECTION_ABORTED: "ECONNABORTED",
} as const;

export const ERROR_CODES = {
  PASSWORD_CHANGE_REQUIRED: "PASSWORD_UPDATE_REQUIRED",
} as const;

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}

// Global axios instance
let axiosInstance: AxiosInstance;

// Logout callback for 401 handling
let logoutCallback: (() => void) | null = null;
let forbiddenCallback: (() => void) | null = null;

// Public API
export const httpClientModuleInitialize = (dependencyManager: DependencyManager): void => {
  axiosInstance = createAxiosInstance();
  configRetryStrategy(axiosInstance);
  configRequestInterceptor(axiosInstance);
  configResponseInterceptor(axiosInstance);
  const httpClient = createHttpClient(axiosInstance);
  dependencyManager.register("httpClient", httpClient);
};

export const setTokenProvider = (getToken: () => string | null): void => {
  if (axiosInstance) {
    axiosInstance.interceptors.request.clear();
    configRequestInterceptor(axiosInstance, getToken);
  }
};

export const setLogoutCallback = (callback: () => void): void => {
  logoutCallback = callback;
};

export const setForbiddenCallback = (callback: () => void): void => {
  forbiddenCallback = callback;
};

// Configuration functions
const createAxiosInstance = (): AxiosInstance => {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
    withCredentials: false, // Default for business endpoints
  };
  return axios.create(config);
};

const configRetryStrategy = (instance: AxiosInstance): void => {
  axiosRetry(instance, {
    retries: 0,
    retryDelay: axiosRetry.exponentialDelay,
  });
};

const configRequestInterceptor = (instance: AxiosInstance, getToken?: () => string | null): void => {
  instance.interceptors.request.use(async (request) => {
    const isAuthEndpoint =
      request.url?.includes(REFRESH_TOKEN_ENDPOINT) ||
      request.url?.includes(LOGIN_ENDPOINT) ||
      request.url?.includes(LOGOUT_ENDPOINT);
    if (isAuthEndpoint) {
      // Refresh token endpoint: use cookies, no Authorization header
      request.withCredentials = true;
    } else {
      // Business endpoints: no cookies, use Authorization header
      request.withCredentials = false;
      if (getToken) {
        const token = getToken();
        if (token) {
          request.headers.Authorization = `Bearer ${token}`;
        }
      }
    }

    return request;
  });
};

const configResponseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (!response) {
        return Promise.reject(createUndefinedResponseError());
      }

      if (isServerError(response)) {
        redirectToErrorScreen();
      }

      return response;
    },
    (error: any) => {
      // Handle 401 Unauthorized responses
      if (error.response && error.response.status === 401) {
        if (logoutCallback) {
          logoutCallback();
        }
        return Promise.reject(error);
      }
      if (error.response && error.response.status === 403) {
        if (forbiddenCallback) {
          forbiddenCallback();
        }
        return Promise.reject(error);
      }

      if (error.response && isServerError(error.response)) {
        redirectToErrorScreen();
      }
      return Promise.reject(error);
    }
  );
};

// Error handling utilities
const getNetworkErrorInfo = (errorCode: string): { message: string; details: string } => {
  switch (errorCode) {
    case NETWORK_ERROR_CODES.NAME_NOT_RESOLVED:
      return {
        message: ERROR_MESSAGES.DOMAIN_NOT_FOUND,
        details: ERROR_DETAILS.DOMAIN_NOT_FOUND,
      };
    case NETWORK_ERROR_CODES.NETWORK:
      return {
        message: ERROR_MESSAGES.NETWORK_ERROR,
        details: ERROR_DETAILS.NETWORK_CONNECTION,
      };
    case NETWORK_ERROR_CODES.CONNECTION_ABORTED:
      return {
        message: ERROR_MESSAGES.REQUEST_TIMEOUT,
        details: ERROR_DETAILS.REQUEST_TIMEOUT,
      };
    default:
      return {
        message: ERROR_MESSAGES.NETWORK_ERROR,
        details: ERROR_DETAILS.NETWORK_ERROR,
      };
  }
};

const createNetworkErrorResponse = (errorCode: string): HttpResponse => {
  const { message, details } = getNetworkErrorInfo(errorCode);

  return {
    code: -1,
    data: null,
    error: { message, details },
    status: false,
    statusText: message,
  };
};

const createHttpErrorResponse = (error: any): HttpResponse => {
  const { response } = error;

  return {
    code: response.status,
    data: response.data,
    error: {
      message: response.data?.message || response.statusText || ERROR_MESSAGES.GENERIC_ERROR,
      details: response.data?.details || ERROR_DETAILS.GENERIC_ERROR,
      code: response.data?.code,
    },
    status: false,
    statusText: response.statusText,
  };
};

const createUndefinedResponseError = (): HttpResponse => {
  return {
    code: -1,
    data: {},
    error: {
      message: ERROR_MESSAGES.UNDEFINED_RESPONSE,
      details: undefined,
    },
    status: false,
    statusText: ERROR_MESSAGES.UNDEFINED_RESPONSE,
  };
};

// Response utilities

const toHttpResponse = (response: AxiosResponse): HttpResponse => {
  const { data, status, statusText } = response;

  return {
    code: status,
    data,
    error: undefined,
    status: status >= 200 && status < 300,
    statusText,
  };
};

const isServerError = (response: AxiosResponse): boolean => {
  return response.status >= HttpStatusCode.INTERNAL_SERVER_ERROR;
};

// URL utilities
const buildQueryString = (params: HttpParams): string => {
  if (!params || Object.keys(params).length === 0) {
    return "";
  }

  return `?${Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&")}`;
};

const getFullUrl = (url = "", params?: HttpParams): string => {
  return `${url}${buildQueryString(params || {})}`;
};

// Request execution
const executeRequest = async (
  instance: AxiosInstance,
  method: HttpMethod,
  url: string,
  params: any,
  headers: any,
  contentType: string
): Promise<HttpResponse> => {
  const isFormData = params instanceof FormData;
  const requestHeaders = {
    Accept: DEFAULT_ACCEPT,
    ...(isFormData ? {} : { "Content-Type": contentType }),
    ...headers,
  };

  try {
    const response = await makeRequest(instance, method, url, params, requestHeaders);
    return toHttpResponse(response);
  } catch (error: any) {
    return handleRequestError(error);
  }
};

const makeRequest = async (
  instance: AxiosInstance,
  method: HttpMethod,
  url: string,
  params: any,
  headers: any
): Promise<AxiosResponse> => {
  const fullUrl = getFullUrl(url, method === HttpMethod.GET ? params : undefined);
  const requestData = method === HttpMethod.GET ? undefined : params;

  switch (method) {
    case HttpMethod.GET:
      return instance.get(fullUrl, { headers });
    case HttpMethod.DELETE:
      return instance.delete(fullUrl, { headers });
    case HttpMethod.PUT:
      return instance.put(fullUrl, requestData, { headers });
    case HttpMethod.POST:
    default:
      return instance.post(fullUrl, requestData, { headers });
  }
};

const handleRequestError = (error: any): HttpResponse => {
  if (!error.response) {
    // Network error
    const errorCode = error.code || NETWORK_ERROR_CODES.NETWORK;
    return createNetworkErrorResponse(errorCode);
  }

  // HTTP error
  if (isServerError(error.response)) {
    redirectToErrorScreen();
  }

  return createHttpErrorResponse(error);
};

// Blob download
const executeBlobDownload = async (
  instance: AxiosInstance,
  url = "",
  params = {},
  headers = {}
): Promise<HttpResponse> => {
  const requestHeaders = {
    Accept: BLOB_ACCEPT,
    ...headers,
  };

  try {
    const response = await instance.get(getFullUrl(url, params), {
      headers: requestHeaders,
      responseType: "blob",
    });
    return toHttpResponse(response);
  } catch (error: any) {
    return handleRequestError(error);
  }
};

// HTTP Client factory
const createHttpClient = (instance: AxiosInstance): IHttpClient => {
  return {
    get: (url = "", params = {}, headers = {}, contentType = DEFAULT_CONTENT_TYPE) =>
      executeRequest(instance, HttpMethod.GET, url, params, headers, contentType),

    getBlob: (url = "", params = {}, headers = {}) => executeBlobDownload(instance, url, params, headers),

    post: (url = "", params = {}, headers = {}, contentType = DEFAULT_CONTENT_TYPE) =>
      executeRequest(instance, HttpMethod.POST, url, params, headers, contentType),

    delete: (url = "", params = {}, headers = {}, contentType = DEFAULT_CONTENT_TYPE) =>
      executeRequest(instance, HttpMethod.DELETE, url, params, headers, contentType),

    put: (url = "", params = {}, headers = {}, contentType = DEFAULT_CONTENT_TYPE) =>
      executeRequest(instance, HttpMethod.PUT, url, params, headers, contentType),
  };
};

// Utility functions
const redirectToErrorScreen = (): void => {
  // TODO: Navigate to error screen
};
