import { Box, Text } from "@mantine/core";
import { translate } from "../../hooks/useTranslator";
import { makeStyles } from "./styles";
import CustomTitle from "../CustomTitle";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../routes/constants";
import { IconArrowLeft, IconBan, IconHome, IconUser } from "@tabler/icons-react";
import { customColors } from "../../themes/customColors";
import CustomButtonWithIcon from "../CustomButtonWithIcon";

export const ProtectedPageInfo = () => {
  const styles = makeStyles();
  const t = translate();
  const navigate = useNavigate();
  return (
    <Box style={styles.container}>
      <Box style={styles.iconsContainer}>
        <Text style={styles.title403}>403</Text>
        <IconUser size={120} color={customColors.gray.gray300} />
        <IconBan size={50} color={customColors.gray.gray300} />
      </Box>

      <CustomTitle type="title1"> {t("protected_page_info.title")}</CustomTitle>

      <CustomTitle type="subtitle">{t("protected_page_info.description")}</CustomTitle>

      <CustomButtonWithIcon
        variant="primary"
        title={t("protected_page_info.button")}
        onClick={() => {
          navigate(HOME);
        }}
        leftSection={<IconArrowLeft />}
        rightSection={<IconHome />}
      />
    </Box>
  );
};
