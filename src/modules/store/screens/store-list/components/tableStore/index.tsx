import { Loader, Table, Text, Box } from "@mantine/core";
import { translate } from "../../../../../../hooks/useTranslator";
import { IStore } from "../../../../core/entities/IStore";
import dayjs from "dayjs";
import { makeStyles } from "./styles";
import { CustomBadge } from "../../../../../../components/CustomBadge";
import { MenuActions } from "../menuActions";
import CustomLink from "../../../../../../components/CustomLink";

interface TableStoresProps {
  stores: IStore[];
  loading: boolean;
  onEditStore: (store: IStore) => void;
  onEditBranches: (storeId: number) => void;
}

const TableStores = ({ stores = [], loading = false, onEditStore, onEditBranches }: TableStoresProps) => {
  const styles = makeStyles();
  const t = translate();

  const formatCuit = (cuit: string) => {
    if (!cuit) return "-";
    return cuit.replace(/(\d{2})(\d{8})(\d{1})/, "$1-$2-$3");
  };

  const getStatusText = (enabled: boolean) => {
    return enabled ? t("store.list.table.active") : t("store.list.table.inactive");
  };

  const getStatusColor = (enabled: boolean) => {
    return enabled ? "success" : "warning";
  };

  return (
    <>
      <Box style={styles.tableContainer}>
        <Table withColumnBorders mt="xl" striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t("store.list.table.socialReason")}</Table.Th>
              <Table.Th>{t("store.list.table.cuit")}</Table.Th>
              <Table.Th>{t("store.list.table.status")}</Table.Th>
              <Table.Th>{t("store.list.table.createdAt")}</Table.Th>
              <Table.Th>{t("store.list.table.branches")}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {!loading &&
              stores.map((store) => (
                <Table.Tr key={store.idStore}>
                  <Table.Td>
                    <CustomLink
                      linkTo={`/stores/${store.idStore}/detail`}
                      value={store.businessNameStore}
                      textStyles={styles.link}
                    />
                  </Table.Td>

                  <Table.Td>{formatCuit(store.cuitStore)}</Table.Td>

                  <Table.Td>
                    <CustomBadge color={getStatusColor(store.enabledStore)}>
                      {getStatusText(store.enabledStore)}
                    </CustomBadge>
                  </Table.Td>

                  <Table.Td>{dayjs(store.createdAtStore).format("DD/MM/YYYY")}</Table.Td>
                  <Table.Td ta="center">{store.branchesStore?.length || 0}</Table.Td>
                  <Table.Td style={styles.actions}>
                    <MenuActions
                      onEditStore={() => onEditStore(store)}
                      onEditBranches={() => onEditBranches(store.idStore as number)}
                    />
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>
        {stores.length === 0 && !loading && (
          <Box style={styles.noRowsContainer}>
            <Text m="lg" w="100%" style={styles.noRows}>
              {t("store.list.table.noStores")}
            </Text>
          </Box>
        )}

        {loading && (
          <Box style={styles.noRowsContainer}>
            <Loader />
          </Box>
        )}
      </Box>
    </>
  );
};

export default TableStores;
