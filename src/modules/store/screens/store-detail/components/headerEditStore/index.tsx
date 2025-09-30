import { Badge, Box, Flex, Text } from "@mantine/core";
import { IconBuildingWarehouse } from "@tabler/icons-react";
import { makeStyles } from "./style";
import { customColors } from "../../../../../../themes/customColors";
import CustomTitle from "../../../../../../components/CustomTitle";
import { translate } from "../../../../../../hooks/useTranslator";

interface IStoreForHeader {
  businessName: string;
  cuit: string;
  vatCondition: string;
  iibbRegistered: string;
  profitsRegistered: string;
  enabled: boolean;
}

export const HeaderEditStore = ({ store }: { store: IStoreForHeader }) => {
  const styles = makeStyles();
  const t = translate();
  return (
    <Box style={styles.headerContainer}>
      <Flex justify="space-between" align="center">
        <Flex align="center" gap="md">
          <Box style={styles.storeInfo}>
            <Box>
              <IconBuildingWarehouse color={customColors.primary.primary700} />
            </Box>
            <Box>
              <CustomTitle type="title2">{store.businessName}</CustomTitle>
              <CustomTitle type="subtitle">CUIT: {store.cuit}</CustomTitle>
            </Box>
          </Box>
        </Flex>
        <Flex align="center" gap="xl">
          <Box>
            <Flex direction="column">
              <Text size="xs" c={customColors.gray.gray500}>
                {store.vatCondition}
              </Text>
              <Text size="xs" c={customColors.gray.gray500}>
                {store.iibbRegistered}
              </Text>
              <Text size="xs" c={customColors.gray.gray500}>
                {t("store.edit.generalSection.fields.profitsRegisteredStore")}:{" "}
                {store.profitsRegistered === "yes" ? "Sí" : "No"}
              </Text>
            </Flex>
          </Box>

          <Badge variant="light" style={styles.statusBadge} size="lg">
            {store.enabled ? "Activo" : "Inactivo"}
          </Badge>
        </Flex>
      </Flex>
    </Box>
  );
};
