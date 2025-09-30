import { IVatCondition } from "../entities/IVatCondition";
import { IIibbRegistration } from "../entities/IIibbRegistration";
import { IIndustry } from "../entities/IIndustry";

export interface IMasterDataGateway {
  getVatConditions: () => Promise<IVatCondition[]>;
  getIibbRegistrations: () => Promise<IIibbRegistration[]>;
  getIndustries: () => Promise<IIndustry[]>;
}
