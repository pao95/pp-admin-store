import { useState } from "react";
import { Flex, Box } from "@mantine/core";
import { translate } from "../../../../../../hooks/useTranslator";
import { makeStyles } from "./styles";
import { SearchInput } from "../../../../../../components/SearchInput";
import CustomSelect from "../../../../../../components/CustomSelect";
import CustomButton from "../../../../../../components/CustomButton";

interface SearchAndFiltersProps {
  onSearch: (querySearch: string, state: string, sortDir: string) => void;
  loading?: boolean;
  searchQuery?: string;
  selectedState?: string;
  selectedSortDir?: string;
  selectedSortBy?: string;
}

const SearchAndFilters = ({
  onSearch,
  loading = false,
  searchQuery: externalSearchQuery = "",
  selectedState: externalSelectedState = "",
  selectedSortDir: externalselectedSortDir = "",
}: SearchAndFiltersProps) => {
  const styles = makeStyles();
  const t = translate();

  const [searchQuery, setSearchQuery] = useState(externalSearchQuery);
  const [selectedState, setSelectedState] = useState(externalSelectedState);
  const [selectedSortDir, setSelectedSortDir] = useState(externalselectedSortDir);

  const stateOptions = [
    { option: t("store.list.filters.all"), key: "all" },
    { option: t("store.list.filters.enabled"), key: "enabled" },
    { option: t("store.list.filters.disabled"), key: "disabled" },
  ];

  const orderOptions = [
    { option: t("store.list.filters.newestFirst"), key: "desc" },
    { option: t("store.list.filters.oldestFirst"), key: "asc" },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    onSearch(query, selectedState, selectedSortDir);
  };

  const handleStateChange = (value: string) => {
    if (value === selectedState) return;
    const stateValue = value || t("store.list.filters.all");
    setSelectedState(stateValue);

    onSearch(searchQuery, stateValue, selectedSortDir);
  };

  const handleOrderChange = (value: string) => {
    if (value === selectedSortDir) return;
    const orderValue = value || t("store.list.filters.newestFirst");
    setSelectedSortDir(orderValue);
    onSearch(searchQuery, selectedState, orderValue);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedState(t("store.list.filters.all"));
    setSelectedSortDir(t("store.list.filters.newestFirst"));
    onSearch("", t("store.list.filters.all"), t("store.list.filters.newestFirst"));
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedState !== t("store.list.filters.all") ||
    selectedSortDir !== t("store.list.filters.newestFirst");

  return (
    <Box style={styles.container}>
      <Flex gap="md" wrap="wrap" style={styles.mainFlex}>
        <Box style={styles.searchBox}>
          <SearchInput
            placeholder={t("store.list.filters.search_placeholder")}
            search={searchQuery}
            setSearch={setSearchQuery}
            handleSearch={handleSearch}
          />
        </Box>
        <Box style={styles.filtersBox}>
          <Flex gap="md" align="end" wrap="wrap" style={styles.filtersFlex} justify="flex-end">
            <Box>
              <CustomSelect
                label=""
                options={stateOptions}
                onChange={handleStateChange as any}
                placeholder={t("store.list.filters.state_placeholder")}
                disabled={loading}
                value={selectedState}
              />
            </Box>

            <Box>
              <CustomSelect
                label=""
                options={orderOptions}
                onChange={handleOrderChange as any}
                placeholder={t("store.list.filters.order_placeholder")}
                disabled={loading}
                value={selectedSortDir}
              />
            </Box>

            <CustomButton
              variant="light"
              onClick={handleClearFilters}
              disabled={loading || !hasActiveFilters}
              title={t("store.list.filters.clearFilters")}
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default SearchAndFilters;
