import React, { useState, useEffect } from "react";
import { Box, Divider } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { IAddBranchesPresenter } from "../core/presentation/IAddBranchesPresenter";
import { AddBranchesScreens } from "../core/screens/IAddBranchesScreens";

import CustomTitle from "../../../components/CustomTitle";
import { translate } from "../../../hooks/useTranslator";
import { addBranchesPresenterProvider } from "../infrastructure/presentation/presenterProvider";
import { STORES } from "../../../routes/constants";
import { showErrorToast, showSuccessToast } from "../../../utils/toasts";
import { IProvince } from "../../store/core/entities/IProvince";
import { ILocality } from "../../store/core/entities/ILocality";
import { IBranch, IStore } from "../../store/core/entities/IStore";
import { IUpdateStoreRequest } from "../core/entities/IUpdateStoreRequest";
import FormAbmBranches from "./components/FormAbmBranches";

const AbmBranches: React.FC = () => {
  const t = translate();
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const presenterProvider = addBranchesPresenterProvider();

  const [presenter, setPresenter] = useState<IAddBranchesPresenter>({} as IAddBranchesPresenter);
  const [isLoadingCreateBranches, setIsLoadingCreateBranches] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [localities, setLocalities] = useState<ILocality[]>([]);
  const [storeData, setStoreData] = useState<IStore | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isLoadingDataStore, setIsLoadingDataStore] = useState(false);

  const viewHandlers: AddBranchesScreens = {
    updateStoreSuccess() {
      showSuccessToast(t("addBranches.errors.update_store_success"));
      setIsLoadingCreateBranches(false);
      navigate(STORES);
    },
    updateStoreError(error: string) {
      showErrorToast(t("addBranches.errors.update_store_error"), error);
      setIsLoadingCreateBranches(false);
    },
    onFetchProvincesSuccess: (fetchedProvinces: IProvince[]) => {
      setProvinces(fetchedProvinces);
    },
    onFetchProvincesError: (error: string) => {
      showErrorToast(t("addBranches.errors.get_provinces"), error);
    },
    onFetchLocalitiesSuccess: (fetchedLocalities: ILocality[]) => {
      setLocalities(fetchedLocalities);
    },
    onFetchLocalitiesError: (error: string) => {
      showErrorToast(t("addBranches.errors.get_localities"), error);
    },
    onFetchStoreSuccess: (fetchedStoreData: IStore) => {
      setStoreData(fetchedStoreData);
      setIsLoadingDataStore(false);
    },
    onFetchStoreError: (error: string) => {
      showErrorToast(t("addBranches.errors.get_store_data"), error);
      setIsLoadingDataStore(false);
    },
  };

  useEffect(() => {
    setPresenter(presenterProvider.getPresenter(viewHandlers));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded && storeId) {
      setIsLoadingDataStore(true);
      presenter?.fetchProvinces();
      presenter?.fetchStore(storeId);
    }
  }, [loaded, storeId]);

  const handleFormSubmit = async (formValues: IBranch[]) => {
    if (!storeData) {
      return;
    }

    setIsLoadingCreateBranches(true);
    const updateData: IUpdateStoreRequest = {
      ...storeData,
      branchesStore: formValues,
    };
    presenter.updateStore(updateData);
  };

  const handleCancel = () => {
    navigate(STORES);
  };

  return (
    <Box mt={20}>
      <CustomTitle type="title1" mb={10}>
        {t("addBranches.title")}
      </CustomTitle>
      <Divider mt="lg" mb="xs" />

      <CustomTitle type="subtitle" mb={10}>
        {t("addBranches.description")}
      </CustomTitle>
      <Box mt="lg">
        <FormAbmBranches
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          loading={isLoadingCreateBranches || isLoadingDataStore}
          provinces={provinces}
          localities={localities}
          onProvinceChange={(provinceName: string) => presenter?.fetchLocalities(provinceName)}
          branches={storeData?.branchesStore || []}
        />
      </Box>
    </Box>
  );
};

export default AbmBranches;
