import { IProvince } from "../../../store/core/entities/IProvince";
import { ILocality } from "../../../store/core/entities/ILocality";

export interface IGeoRefGateway {
  getProvinces(): Promise<IProvince[]>;
  getLocalities(provinceName: string): Promise<ILocality[]>;
}
