import { ILocality } from "../entities/ILocality";
import { IGeoRefGateway } from "../gateways/IGeoRefGateway";

export interface IGetLocalitiesAction {
  execute: (stateCode: string) => Promise<ILocality[]>;
}

export const GetLocalitiesAction = (geoRefGateway: IGeoRefGateway): IGetLocalitiesAction => {
  return {
    async execute(stateCode) {
      try {
        const localities = geoRefGateway.getLocalities(stateCode);
        return localities;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
