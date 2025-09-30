import { IIndustry } from "../entities/IIndustry";
import { IMasterDataGateway } from "../gateways/IMasterDataGateway";

export interface IGetIndustriesAction {
  execute: () => Promise<IIndustry[]>;
}

export const GetIndustriesAction = (masterDataGateway: IMasterDataGateway): IGetIndustriesAction => {
  return {
    async execute() {
      try {
        const industries = await masterDataGateway.getIndustries();
        return industries;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
