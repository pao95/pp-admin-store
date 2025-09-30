import { IBranch } from "../../../store/core/entities/IStore";

export type IUpdateStoreResponse = {
  id: string;
  name: string;
  socialReason: string;
  cuit: string;
  email?: string;
  branches: IBranch[];
  message?: string;
};
