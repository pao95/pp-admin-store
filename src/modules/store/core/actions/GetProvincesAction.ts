import { IProvince } from "../entities/IProvince";
import { IGeoRefGateway } from "../gateways/IGeoRefGateway";

export interface IGetProvincesAction {
  execute: () => Promise<IProvince[]>;
}

export const GetProvincesAction = (geoRefGateway: IGeoRefGateway): IGetProvincesAction => {
  return {
    async execute() {
      try {
        const provinces = geoRefGateway.getProvinces();
        return provinces;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
