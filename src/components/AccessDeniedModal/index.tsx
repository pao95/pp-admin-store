import { translate } from "../../hooks/useTranslator";
import { makeStyles } from "./styles";
import CustomModal from "../CustomModal";
import { Box, Title } from "@mantine/core";
import CustomButton from "../CustomButton";

type AccessDeniedProps = {
  isVisible: boolean;
  onClose: () => void;
};

const AccessDeniedModal = ({ isVisible, onClose }: AccessDeniedProps) => {
  const translator = translate();
  const styles = makeStyles();

  return (
    <CustomModal isVisible={isVisible} showCloseButton onCloseButton={onClose}>
      <Box style={styles.accessModalContainer}>
        <Title order={1}>{translator("components.accessDeniedModal.title")}</Title>
        <Title order={2}>{translator("components.accessDeniedModal.subtitle")}</Title>
        <Box mb="xl" mt="xl" style={styles.modalButtonsContainer}>
          <CustomButton title={translator("components.accessDeniedModal.close")} size={"md"} onClick={onClose} />
        </Box>
      </Box>
    </CustomModal>
  );
};

export default AccessDeniedModal;
