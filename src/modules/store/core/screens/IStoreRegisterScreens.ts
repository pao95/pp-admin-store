import { IIibbRegistration } from "../entities/IIibbRegistration";
import { IIndustry } from "../entities/IIndustry";
import { ILocality } from "../entities/ILocality";
import { IProvince } from "../entities/IProvince";
import { IVatCondition } from "../entities/IVatCondition";

export interface StoreRegisterScreens {
  createStoreSuccess: (idStore: number) => void;
  createStoreError: (err: any) => void;

  uploadDocumentsSuccess: () => void;
  uploadDocumentsError: (err: any) => void;

  createUserAndAssignToStoreSuccess: () => void;
  createUserAndAssignToStoreError: (err: any) => void;

  onGetProvincesSuccess: (provinces: IProvince[]) => void;
  onGetProvincesError: (error: string) => void;

  onGetLocalitiesSuccess: (localities: ILocality[]) => void;
  onGetLocalitiesError: (error: string) => void;

  onGetIndustriesSuccess: (industries: IIndustry[]) => void;
  onGetIndustriesError: (error: string) => void;

  onGetVatConditionsSuccess: (vatConditions: IVatCondition[]) => void;
  onGetVatConditionsError: (error: string) => void;

  onGetIibbRegistrationsSuccess: (iibbRegistrations: IIibbRegistration[]) => void;
  onGetIibbRegistrationsError: (error: string) => void;
}
