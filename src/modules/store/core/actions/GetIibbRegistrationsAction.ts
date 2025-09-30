import { IIibbRegistration } from "../entities/IIibbRegistration";
import { IMasterDataGateway } from "../gateways/IMasterDataGateway";

export interface IGetIibbRegistrationsAction {
  execute: () => Promise<IIibbRegistration[]>;
}

export const GetIibbRegistrationsAction = (masterDataGateway: IMasterDataGateway): IGetIibbRegistrationsAction => {
  return {
    async execute() {
      try {
        const iibbRegistrations = await masterDataGateway.getIibbRegistrations();
        return iibbRegistrations;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
