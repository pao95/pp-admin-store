import { IStoreGateway } from "../../core/gateways/IStoreGateway";
import { HttpResponse, IHttpClient } from "../../../httpClient/interfaces";
import { STORE_API } from "../../../../constants/api";
import { IStore } from "../../../store/core/entities/IStore";
import { IUpdateStoreRequest } from "../../core/entities/IUpdateStoreRequest";

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
      branches: storeData.branchesStore?.map((branch) => ({
        id: branch.idBranch,
        storeId: branch.storeId,
        name: branch.nameBranch,
        street: branch.streetBranch,
        streetNumber: branch.streetNumberBranch,
      })),
    };
  };

  return {
    async fetchStore(storeId: string) {
      try {
        const response = await httpClient.get(`${STORE_API}/${storeId}`);
        if (!response.status) {
          return Promise.reject(response?.error?.message || "");
        }
        return Promise.resolve(mapFromApiToStore(response));
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },

    async updateStore(storeData: IUpdateStoreRequest) {
      try {
        const apiStoreData = mapStoreDataToApiFormat(storeData);
        const response = await httpClient.put(`${STORE_API}/${storeData.idStore}`, apiStoreData);
        if (!response.status) {
          return Promise.reject(response?.error?.message || "");
        }
        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
  };
};
