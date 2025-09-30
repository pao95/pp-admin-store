import i18next from "i18next";
import { jwtDecode } from "jwt-decode";
import { PermissionsObject } from "../constants/permissions";

export const decodeJWT = (token: string): any => {
  try {
    return jwtDecode(token);
  } catch (error) {
    throw new Error(i18next.t("login.errors.decodeJWT"));
  }
};

export const extractPermissionsFromToken = (decodedToken: any): PermissionsObject => {
  try {
    return decodedToken.authorities || {};
  } catch (error) {
    throw new Error(i18next.t("login.errors.extractPermissionsFromToken"));
  }
};
