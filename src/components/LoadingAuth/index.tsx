import { Box, Loader } from "@mantine/core";
import { makeStyles } from "./styles";
import { customColors } from "../../themes/customColors";
import CustomTitle from "../CustomTitle";
import { translate } from "../../hooks/useTranslator";

export const LoadingAuth = () => {
  const styles = makeStyles();
  const t = translate();
  return (
    <Box style={styles.container}>
      <Loader color={customColors.primary.primary400} />
      <CustomTitle type="subtitle">{t("common.waiting")}</CustomTitle>
    </Box>
  );
};
