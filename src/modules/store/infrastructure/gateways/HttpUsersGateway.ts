import { IHttpClient } from "../../../httpClient/interfaces";
import { IHttpUsersGateway } from "../../core/gateways/IHttpUsersGateway";
import { USER_API } from "../../../../constants/api";
import i18n from "i18next";
import { IUser } from "../../core/entities/IUser";

// Interfaz que representa la estructura de datos de la API
export interface IUserApi {
  id?: number;
  lastName: string;
  firstName: string;
  dni: string;
  cuil: string;
  dateOfBirth: Date | null;
  gender: string;
  phoneNumber: string;
  phoneNumber2: string | null;
  phoneNumber3: string | null;
  phoneNumber4: string | null;
  email: string;
  street: string;
  number: string;
  cityName: string;
  provinceName: string;
  postalCode: string;
  dateOfRegistration?: string;
  dateOfUpdate?: string;
}

export const HttpUsersGateway = (httpClient: IHttpClient): IHttpUsersGateway => {
  const toStoreUserList = (data: IUserApi): IUser => {
    return {
      idUser: data.id,
      lastNameUser: data.lastName,
      firstNameUser: data.firstName,
      dniUser: data.dni,
      cuilUser: data.cuil,
      emailUser: data.email,
      phoneNumberUser: data.phoneNumber,
      birthDateUser: data.dateOfBirth,
      genderUser: data.gender,
      addressUser: data.street,
      addressNumberUser: data.number,
      localityUser: data.cityName,
      provinceUser: data.provinceName,
      zipCodeUser: data.postalCode,
      createdAtUser: data.dateOfRegistration,
      updatedAtUser: data.dateOfUpdate,
    };
  };

  const toStoreUserDetail = (response: IUserApi): IUser => ({
    idUser: response.id,
    lastNameUser: response.lastName,
    firstNameUser: response.firstName,
    dniUser: response.dni,
    cuilUser: response.cuil,
    birthDateUser: response.dateOfBirth,
    genderUser: response.gender,
    phoneNumberUser: response.phoneNumber,
    emailUser: response.email,
    addressUser: response.street,
    addressNumberUser: response.number,
    localityUser: response.cityName,
    provinceUser: response.provinceName,
    zipCodeUser: response.postalCode,
    createdAtUser: response.dateOfRegistration,
    updatedAtUser: response.dateOfUpdate,
  });

  const mapUserDataToApiFormat = (storeData: IUser): IUserApi => {
    return {
      lastName: storeData.lastNameUser,
      firstName: storeData.firstNameUser,
      dni: storeData.dniUser,
      cuil: storeData.cuilUser,
      dateOfBirth: storeData.birthDateUser,
      gender: storeData.genderUser,
      phoneNumber: storeData.phoneNumberUser,
      phoneNumber2: null,
      phoneNumber3: null,
      phoneNumber4: null,
      email: storeData.emailUser,
      street: storeData.addressUser,
      number: storeData.addressNumberUser,
      cityName: storeData.localityUser,
      provinceName: storeData.provinceUser,
      postalCode: storeData.zipCodeUser,
    };
  };

  return {
    async getUsersByStore(storeId: number): Promise<IUser[]> {
      try {
        const response = await httpClient.get(`${USER_API}/${storeId}/list`);

        if (!response.status) {
          return Promise.reject(response?.error?.message || i18n.t("storeDetail.commons.errors.getStoreUsers"));
        }

        return (response.data as IUserApi[]).map(toStoreUserList);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },

    async getUser(userId: number): Promise<IUser> {
      try {
        const response = await httpClient.get(`${USER_API}/${userId}`);

        if (!response.status) {
          return Promise.reject(response?.error?.message || i18n.t("storeDetail.commons.errors.getStoreUser"));
        }

        return toStoreUserDetail(response.data as IUserApi);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },

    async updateUser(userId: number, userData: IUser) {
      try {
        const apiUserData = mapUserDataToApiFormat(userData);

        const response = await httpClient.put(`${USER_API}/${userId}`, apiUserData);

        if (!response.status) {
          return Promise.reject(response?.error?.message || i18n.t("storeDetail.commons.errors.updateStoreUser"));
        }

        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
  };
};
