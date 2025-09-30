import { ILocality } from "../../../store/core/entities/ILocality";
import { IGeoRefGateway } from "../gateways/IGeoRefGateway";

export interface IFetchLocalitiesAction {
  execute: (provinceName: string) => Promise<ILocality[]>;
}

export const FetchLocalitiesAction = (geoRefGateway: IGeoRefGateway): IFetchLocalitiesAction => {
  return {
    async execute(provinceName) {
      try {
        const response = await geoRefGateway.getLocalities(provinceName);
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
