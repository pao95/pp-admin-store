import { SimpleGrid, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import CustomCard from "../../../../../components/CustomCard";
import { translate } from "../../../../../hooks/useTranslator";
import { IconBuildingStore, IconReport } from "@tabler/icons-react";
import { dashboardHomeStyles } from "./styles";
import { STORES, REPORTS } from "../../../../../routes/constants";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { useContext } from "react";
import { PERMISSIONS } from "../../../../../constants/permissions";

export const DashboardHome = () => {
  const { actions } = useContext(AuthContext);
  const t = translate();
  const styles = dashboardHomeStyles();
  const navigate = useNavigate();

  const handleStoresClick = () => {
    navigate(STORES);
  };

  const handleReportsClick = () => {
    navigate(REPORTS);
  };

  return (
    <Stack mt="xl">
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        style={{
          maxWidth: 900,
        }}
      >
        <div style={{ gridColumn: "span 2" }}>
          <CustomCard
            title={t("home.commerce.title")}
            description={t("home.commerce.description")}
            buttonText={t("home.commerce.button")}
            icon={<IconBuildingStore size={24} style={styles.icon} />}
            onClick={handleStoresClick}
            disabled={!actions.hasPermission([PERMISSIONS.STORE_VIEW])}
          />
        </div>
        <CustomCard
          title={t("home.report.title")}
          description={t("home.report.description")}
          buttonText={t("home.report.button")}
          icon={<IconReport size={24} style={styles.icon} />}
          onClick={handleReportsClick}
          disabled={!actions.hasPermission([PERMISSIONS.REPORTS_VIEW])}
        />
      </SimpleGrid>
    </Stack>
  );
};
