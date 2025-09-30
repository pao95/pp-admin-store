export interface IStoresPresenter {
  getStores: (
    querySearch?: string,
    state?: string,
    sortDir?: string,
    sortBy?: string,
    page?: number,
    limit?: number
  ) => void;
}
