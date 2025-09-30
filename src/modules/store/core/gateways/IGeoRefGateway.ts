import { ILocality } from "../entities/ILocality";
import { IProvince } from "../entities/IProvince";

export interface IGeoRefGateway {
  getProvinces: () => Promise<IProvince[]>;
  getLocalities: (stateCode: string) => Promise<ILocality[]>;
}
