import { IStore } from "../entities/IStore";

export interface StoresScreens {
  onGetStoresSuccess: (response: {
    stores: IStore[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }) => void;
  onGetStoresError: (error: string) => void;
}
