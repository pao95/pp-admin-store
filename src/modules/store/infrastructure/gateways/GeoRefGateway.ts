import { IProvince } from "../../core/entities/IProvince";
import { IGeoRefGateway } from "../../core/gateways/IGeoRefGateway";
import { ILocality } from "../../core/entities/ILocality";
import { API } from "../../../../constants/api";
import { IHttpClient } from "../../../httpClient/interfaces";

export const GeoRefGateway = (httpClient: IHttpClient): IGeoRefGateway => {
  return {
    async getProvinces() {
      try {
        const response = await httpClient.get(`${API}/states/by-country/AR`);
        return jsonToProvinceList(response.data as { code: string; name: string }[]);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
    async getLocalities(stateCode) {
      try {
        const response = await httpClient.get(`${API}/cities/by-state/${stateCode}`);
        return jsonToLocalityList(response.data as { code: string; name: string }[]);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
  };
};

const jsonToProvinceList = (json: { code: string; name: string }[]): IProvince[] => {
  return json.map((provinciaResponse) => ({
    id: provinciaResponse.code,
    name: provinciaResponse.name,
  }));
};

const jsonToLocalityList = (json: { code: string; name: string }[]): ILocality[] => {
  return json.map((localityResponse) => ({
    id: localityResponse.code,
    name: localityResponse.name,
  }));
};
