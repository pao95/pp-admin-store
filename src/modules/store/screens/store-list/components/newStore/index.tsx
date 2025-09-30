import { Box } from "@mantine/core";
import CustomButton from "../../../../../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { STORE_REGISTER } from "../../../../../../routes/constants";
import { translate } from "../../../../../../hooks/useTranslator";
import { newStoreStyles } from "./styles";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { useContext } from "react";
import { PERMISSIONS } from "../../../../../../constants/permissions";

export const NewStore = () => {
  const styles = newStoreStyles();
  const navigate = useNavigate();
  const t = translate();
  const { actions } = useContext(AuthContext);

  return (
    <Box style={styles.buttonContainer} mb={10}>
      <CustomButton
        disabled={
          !actions.hasPermission([PERMISSIONS.STORE_CREATE, PERMISSIONS.DOCUMENTATION_CREATE, PERMISSIONS.USERS_CREATE])
        }
        title={t("store.addStore")}
        variant="primary"
        onClick={() => navigate(STORE_REGISTER)}
      />
    </Box>
  );
};
