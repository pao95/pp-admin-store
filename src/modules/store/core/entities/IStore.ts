export type IStore = {
  idStore?: number;
  businessNameStore: string;
  tradeNameStore: string;
  streetStore: string;
  streetNumberStore: number | null;
  floorStore: string;
  apartmentStore: string;
  zipCodeStore: string;
  localityStore: string;
  provinceStore: string;
  vatConditionStore: string;
  cuitStore: string;
  iibbRegisteredStore: string;
  profitsRegisteredStore: string;
  categoryStore: string[];
  emailStore: string;
  enabledStore: boolean;
  createdAtStore?: string;
  updatedAtStore?: string;
  branchesStore?: IBranch[];
};

export type IBranch = {
  idBranch?: string;
  nameBranch: string;
  streetBranch: string;
  streetNumberBranch: string;
  localityBranch: string;
  provinceBranch: string;
  emailBranch: string;
  storeId: number;
  createdAtBranch?: string;
  updatedAtBranch?: string;
};
