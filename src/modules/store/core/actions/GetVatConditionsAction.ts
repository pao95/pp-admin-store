import { IVatCondition } from "../entities/IVatCondition";
import { IMasterDataGateway } from "../gateways/IMasterDataGateway";

export interface IGetVatConditionsAction {
  execute: () => Promise<IVatCondition[]>;
}

export const GetVatConditionsAction = (masterDataGateway: IMasterDataGateway): IGetVatConditionsAction => {
  return {
    async execute() {
      try {
        const vatConditions = await masterDataGateway.getVatConditions();
        return vatConditions;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
