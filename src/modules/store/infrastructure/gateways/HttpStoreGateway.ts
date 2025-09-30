import { IStoreGateway } from "../../core/gateways/IStoreGateway";
import { HttpResponse, IHttpClient } from "../../../httpClient/interfaces";
import { STORE_API } from "../../../../constants/api";
import i18n from "i18next";
import { IStore } from "../../core/entities/IStore";
import { IUserApi } from "./HttpUsersGateway";
import { IUser } from "../../core/entities/IUser";

// Interfaz que representa la estructura de datos de la API
export interface IStoreApi {
  id?: number;
  cuit: string;
  name: string;
  socialReason: string;
  street: string;
  streetNumber: string;
  floor?: string;
  apartment?: string;
  zipCode: string;
  locality: string;
  province: string;
  email: string;
  vatCondition: string;
  iibbRegistered: string;
  profitsRegistered: boolean;
  industry: string[];
  enabled: boolean;
  vigencia: string;
  planId: string;
  createdAt?: string;
  updatedAt?: string;
  branches?: IBranchApi[];
  branchesCount?: number;
}

// Interfaz para la respuesta de creación de store
export interface ICreateStoreResponse {
  id: number;
  [key: string]: any; // Para otros campos que pueda devolver la API
}

export interface IBranchApi {
  id?: string | number;
  storeId: number;
  name: string;
  street?: string;
  streetNumber?: string;
  locality?: string;
  province?: string;
  email?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const HttpStoreGateway = (httpClient: IHttpClient): IStoreGateway => {
  const mapStoreDataToApiFormat = (storeData: IStore): IStoreApi => {
    return {
      cuit: storeData.cuitStore,
      name: storeData.tradeNameStore,
      socialReason: storeData.businessNameStore,
      street: storeData.streetStore,
      streetNumber: storeData.streetNumberStore?.toString() || "",
      floor: storeData.floorStore,
      apartment: storeData.apartmentStore,
      zipCode: storeData.zipCodeStore,
      locality: storeData.localityStore,
      province: storeData.provinceStore,
      email: storeData.emailStore,
      vatCondition: storeData.vatConditionStore,
      iibbRegistered: storeData.iibbRegisteredStore,
      profitsRegistered: storeData.profitsRegisteredStore === "yes" ? true : false,
      industry: storeData.categoryStore,
      enabled: storeData.enabledStore,
      vigencia: new Date().toISOString(),
      planId: "PLAN_001",
    };
  };

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
  const mapFromApiToStoreList = (
    response: HttpResponse
  ): {
    stores: IStore[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } => {
    const { data } = response as {
      data: {
        stores: IStoreApi[];
        totalElements: number;
        number: number;
        size: number;
        totalPages: number;
      };
    };

    // La respuesta del mock service ya incluye la estructura de paginación
    return {
      stores: data.stores.map((store) => ({
        idStore: store.id,
        businessNameStore: store.socialReason,
        tradeNameStore: store.name,
        streetStore: store.street,
        streetNumberStore: store.streetNumber ? parseInt(store.streetNumber) : null,
        floorStore: store.floor || "",
        apartmentStore: store.apartment || "",
        zipCodeStore: store.zipCode,
        localityStore: store.locality,
        provinceStore: store.province,
        vatConditionStore: store.vatCondition,
        cuitStore: store.cuit,
        iibbRegisteredStore: store.iibbRegistered || "",
        profitsRegisteredStore: store.profitsRegistered ? "yes" : "no",
        categoryStore: store.industry,
        emailStore: store.email,
        enabledStore: store.enabled,
        createdAtStore: store.createdAt,
        updatedAtStore: store.updatedAt,
        branchesStore: store.branches?.map((branch) => ({
          idBranch: branch.id?.toString(),
          nameBranch: branch.name,
          streetBranch: branch.street || "",
          streetNumberBranch: branch.streetNumber || "",
          localityBranch: branch.locality || "",
          provinceBranch: branch.province || "",
          emailBranch: branch.email || "",
          storeId: branch.storeId,
          createdAtBranch: branch.createdAt,
          updatedAtBranch: branch.updatedAt,
        })),
      })),
      total: data.totalElements,
      page: data.number,
      limit: data.size,
      totalPages: data.totalPages,
    };
  };
  const mapFromApiToStore = (response: HttpResponse): IStore => {
    const { data } = response as {
      data: IStoreApi;
    };

    return {
      idStore: data.id,
      businessNameStore: data.socialReason,
      tradeNameStore: data.name,
      streetStore: data.street,
      streetNumberStore: data.streetNumber ? parseInt(data.streetNumber) : null,
      floorStore: data.floor || "",
      apartmentStore: data.apartment || "",
      zipCodeStore: data.zipCode,
      localityStore: data.locality,
      provinceStore: data.province,
      vatConditionStore: data.vatCondition,
      cuitStore: data.cuit,
      iibbRegisteredStore: data.iibbRegistered || "",
      profitsRegisteredStore: data.profitsRegistered ? "yes" : "no",
      categoryStore: data.industry,
      emailStore: data.email,
      enabledStore: data.enabled,
      createdAtStore: data.createdAt,
      updatedAtStore: data.updatedAt,
      branchesStore: data.branches?.map((branch) => ({
        idBranch: branch.id?.toString(),
        nameBranch: branch.name,
        streetBranch: branch.street || "",
        streetNumberBranch: branch.streetNumber || "",
        localityBranch: branch.locality || "",
        provinceBranch: branch.province || "",
        emailBranch: branch.email || "",
        storeId: branch.storeId,
        createdAtBranch: branch.createdAt,
        updatedAtBranch: branch.updatedAt,
      })),
    };
  };

  return {
    async createStore(storeData: IStore) {
      try {
        const apiStoreData = mapStoreDataToApiFormat(storeData);

        const createStoreResponse = await httpClient.post(`${STORE_API}`, apiStoreData);

        if (!createStoreResponse.status) {
          return Promise.reject(
            createStoreResponse?.error?.message || i18n.t("storeRegister.errors.create_store_error")
          );
        }

        // Type assertion para acceder a la propiedad id de manera segura
        const responseData = createStoreResponse.data as ICreateStoreResponse;
        const idStore = responseData.id;

        return Promise.resolve(idStore);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
    async getStores(querySearch = "", state = "all", sortDir = "desc", sortBy = "createdAt", page = 1, limit = 10) {
      try {
        const params: any = {
          page,
          size: limit,
        };

        if (querySearch) {
          params.identifier = querySearch;
        }

        if (state && state !== "all") {
          params.enabled = state === "enabled";
        }

        if (sortDir) {
          params.sortDir = sortDir;
        }
        if (sortBy) {
          params.sortBy = sortBy;
        }

        const response = await httpClient.get(`${STORE_API}/list`, params);

        if (!response.status) {
          return Promise.reject(response?.error?.message || "");
        }

        const result = mapFromApiToStoreList(response);
        return Promise.resolve(result);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
    async getStore(storeId: number): Promise<IStore> {
      try {
        const response = await httpClient.get(`${STORE_API}/${storeId}`);

        if (!response.status) {
          return Promise.reject(response?.error?.message || i18n.t("storeDetail.commons.errors.getStoreGeneral"));
        }

        return mapFromApiToStore(response);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },

    async updateStore(storeId: number, storeData: IStore) {
      try {
        const apiStoreData = mapStoreDataToApiFormat(storeData);

        const response = await httpClient.put(`${STORE_API}/${storeId}`, apiStoreData);

        if (!response.status) {
          return Promise.reject(response?.error?.message || i18n.t("storeDetail.commons.errors.updateStoreGeneral"));
        }

        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
    async createUserAndAssignToStore(storeId: number, userData: IUser) {
      try {
        const data = mapUserDataToApiFormat(userData);

        const associateHolderResponse = await httpClient.post(`${STORE_API}/stores-association/${storeId}`, data);

        if (!associateHolderResponse.status) {
          return Promise.reject(
            associateHolderResponse?.error?.message || i18n.t("storeRegister.errors.associate_holder_error")
          );
        }
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
  };
};
