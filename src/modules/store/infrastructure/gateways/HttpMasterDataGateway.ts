import { IVatCondition } from "../../core/entities/IVatCondition";
import { IIibbRegistration } from "../../core/entities/IIibbRegistration";
import { IIndustry } from "../../core/entities/IIndustry";
import { IMasterDataGateway } from "../../core/gateways/IMasterDataGateway";
import { API } from "../../../../constants/api";
import { IHttpClient } from "../../../httpClient/interfaces";

export const HttpMasterDataGateway = (httpClient: IHttpClient): IMasterDataGateway => {
  return {
    async getVatConditions() {
      try {
        const response = await httpClient.get(`${API}/master-data/vat-conditions`);
        return jsonToVatConditionList(response.data as { id: string; displayName: string }[]);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
    async getIibbRegistrations() {
      try {
        const response = await httpClient.get(`${API}/master-data/iibb-registrations`);
        return jsonToIibbRegistrationList(response.data as { id: string; displayName: string }[]);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
    async getIndustries() {
      try {
        const response = await httpClient.get(`${API}/master-data/industries`);
        return jsonToIndustryList(response.data as { id: string; displayName: string }[]);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
  };
};

const jsonToVatConditionList = (json: { id: string; displayName: string }[]): IVatCondition[] => {
  return json.map((vatConditionResponse) => ({
    id: vatConditionResponse.id,
    name: vatConditionResponse.displayName,
  }));
};

const jsonToIibbRegistrationList = (json: { id: string; displayName: string }[]): IIibbRegistration[] => {
  return json.map((iibbRegistrationResponse) => ({
    id: iibbRegistrationResponse.id,
    name: iibbRegistrationResponse.displayName,
  }));
};

const jsonToIndustryList = (json: { id: string; displayName: string }[]): IIndustry[] => {
  return json.map((industryResponse) => ({
    id: industryResponse.id,
    name: industryResponse.displayName,
  }));
};
