import { IResetPasswordGateway } from "../../core/gateways/IResetPasswordGateway";
import { IHttpClient } from "../../../httpClient/interfaces";
import { RESET_PASSWORD_API } from "../../../../constants/api";
import { IResetPasswordCredentials } from "../../core/entities/IResetPasswordCredentials";
import i18n from "i18next";

export const HttpResetPasswordGateway = (httpClient: IHttpClient): IResetPasswordGateway => {
  const mapDataResetPasswordToApi = (data: IResetPasswordCredentials) => {
    return {
      email: data.email,
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
  };

  return {
    async resetPassword(body) {
      try {
        const response = await httpClient.post(RESET_PASSWORD_API, mapDataResetPasswordToApi(body));
        if (!response.status) {
          return Promise.reject(response?.error?.message || i18n.t("resetPassword.errors.resetPassword"));
        }
        return Promise.resolve(response);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
  };
};
