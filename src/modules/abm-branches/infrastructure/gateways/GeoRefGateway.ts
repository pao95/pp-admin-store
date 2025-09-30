/* eslint-disable no-useless-catch */
import { IProvince } from "../../../store/core/entities/IProvince";
import { IGeoRefGateway } from "../../core/gateways/IGeoRefGateway";
import provinces from "../../../../assets/geoRefData/provinces.json";
import localities from "../../../../assets/geoRefData/localities.json";
import { ILocality } from "../../../store/core/entities/ILocality";

export const GeoRefGateway = (): IGeoRefGateway => {
  return {
    async getProvinces() {
      try {
        return jsonToProvinceList(provinces);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
    async getLocalities(provinceName) {
      try {
        const provinceLocalities = filterLocalities(localities, provinceName);
        return provinceLocalities;
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
  };
};

const jsonToProvinceList = (json: { provincias: { id: string; nombre: string }[] }): IProvince[] => {
  return json.provincias.map((provinciaResponse) => ({
    id: provinciaResponse.id,
    name: provinciaResponse.nombre,
  }));
};

const filterLocalities = (
  json: { localidades_censales: { id: string; nombre: string; provincia: { nombre: string } }[] },
  provinceName: string
): ILocality[] => {
  const filteredLocalities = json.localidades_censales.filter((locality) => locality.provincia.nombre === provinceName);
  return filteredLocalities.map((locality: { id: string; nombre: string }) => ({
    id: locality.id,
    name: locality.nombre,
  }));
};
