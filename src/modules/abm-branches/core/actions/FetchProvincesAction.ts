import { IProvince } from "../../../store/core/entities/IProvince";
import { IGeoRefGateway } from "../gateways/IGeoRefGateway";

export interface IFetchProvincesAction {
  execute: () => Promise<IProvince[]>;
}

export const FetchProvincesAction = (geoRefGateway: IGeoRefGateway): IFetchProvincesAction => {
  return {
    async execute() {
      try {
        const response = await geoRefGateway.getProvinces();
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
