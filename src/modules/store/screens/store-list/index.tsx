import { useState, useEffect } from "react";
import { Box, Divider } from "@mantine/core";
import { translate } from "../../../../hooks/useTranslator";
import CustomTitle from "../../../../components/CustomTitle";
import { NewStore } from "./components/newStore";
import SearchAndFilters from "./components/searchFilters";
import CustomPagination from "../../../../components/CustomPagination";
import { IStoresPresenter } from "../../core/presentation/IStoresPresenter";
import { StoresScreens } from "../../core/screens/IStoresScreens";
import { storesPresenterProvider } from "../../infrastructure/presentation/list/presenterProvider";
import { showErrorToast } from "../../../../utils/toasts";
import { makeStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { IStore } from "../../core/entities/IStore";
import TableStores from "./components/tableStore";
import { STORE_DETAIL } from "../../../../routes/constants";

const Stores = () => {
  const t = translate();
  const [presenter, setPresenter] = useState<IStoresPresenter>({} as IStoresPresenter);
  const [stores, setStores] = useState<IStore[]>([]);
  const [loadingStores, setLoadingStores] = useState<boolean>(false);
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState(t("store.list.filters.all"));
  const [selectedSortDir, setSelectedSortDir] = useState(t("store.list.filters.newestFirst"));
  const [selectedSortBy] = useState("createdAt");
  const styles = makeStyles();
  const navigate = useNavigate();
  const presenterProvider = storesPresenterProvider();

  const viewHandlers: StoresScreens = {
    onGetStoresSuccess: (response: {
      stores: IStore[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    }) => {
      setStores(response.stores);
      setCurrentPage(response.page);
      setTotalPages(response.totalPages);
      setLoadingStores(false);
    },
    onGetStoresError: (error: string) => {
      showErrorToast(t("store.errors.getStores"), error);
      setLoadingStores(false);
    },
  };

  const mapStateToApiValue = (displayValue: string) => {
    switch (displayValue) {
      case t("store.list.filters.all"):
        return "all";
      case t("store.list.filters.enabled"):
        return "enabled";
      case t("store.list.filters.disabled"):
        return "disabled";
      default:
        return "all";
    }
  };

  const mapOrderToApiValue = (displayValue: string) => {
    switch (displayValue) {
      case t("store.list.filters.newestFirst"):
        return "desc";
      case t("store.list.filters.oldestFirst"):
        return "asc";
      default:
        return "desc";
    }
  };
  useEffect(() => {
    setPresenter(presenterProvider.getPresenter(viewHandlers));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded && presenter) {
      setLoadingStores(true);
      presenter.getStores("", "all", "desc", "createdAt", 1, limit);
    }
  }, [loaded, presenter, limit]);

  const callApiWithCurrentFilters = (page: number = 1) => {
    setLoadingStores(true);
    presenter?.getStores(
      searchQuery,
      mapStateToApiValue(selectedState),
      mapOrderToApiValue(selectedSortDir),
      selectedSortBy,
      page,
      limit
    );
  };

  const handleSearch = (querySearch: string, state: string, sortDir: string) => {
    setCurrentPage(1);
    setSearchQuery(querySearch);
    setSelectedState(state);
    setSelectedSortDir(sortDir);

    setLoadingStores(true);

    presenter?.getStores(querySearch, mapStateToApiValue(state), mapOrderToApiValue(sortDir), selectedSortBy, 1, limit);
  };

  const handlePageChange = (page: number) => {
    // Mantener los filtros actuales al cambiar de página
    setCurrentPage(page);
    callApiWithCurrentFilters(page);
  };

  const handleEditStore = (store: IStore) => {
    navigate(`/stores/${store.idStore}/${STORE_DETAIL.GENERAL}`);
  };

  const handleEditBranches = (storeId: number) => {
    navigate(`/stores/${storeId}`);
  };

  return (
    <Box mt={20}>
      <CustomTitle type="title1">{t("store.title")}</CustomTitle>
      <Divider mt="lg" mb="xs" />

      <CustomTitle type="subtitle">{t("store.list.description")}</CustomTitle>
      <Box style={styles.containerBox} mt="lg">
        <Box style={styles.containerBoxTop}>
          <Box display="flex">
            <Box w="100%" flex={1}>
              <CustomTitle type="title2" mb={10}>
                {t("store.list.headerBox.title")}
              </CustomTitle>
              <CustomTitle type="subtitle">{t("store.list.headerBox.description")}</CustomTitle>
            </Box>
            <Box>
              <NewStore />
            </Box>
          </Box>
        </Box>
        <Divider />

        <Box style={styles.containerBoxBottom}>
          <SearchAndFilters
            onSearch={handleSearch}
            loading={loadingStores}
            searchQuery={searchQuery}
            selectedState={selectedState}
            selectedSortDir={selectedSortDir}
          />
          <TableStores
            stores={stores}
            loading={loadingStores}
            onEditStore={handleEditStore}
            onEditBranches={handleEditBranches}
          />

          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            disabled={loadingStores}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Stores;
