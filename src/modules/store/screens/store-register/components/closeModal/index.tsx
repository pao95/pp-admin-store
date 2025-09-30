import { Box, Flex, Image, useMantineTheme } from "@mantine/core";
import { makeStyles } from "./styles";
import { translate } from "../../../../../../hooks/useTranslator";
import CustomModal from "../../../../../../components/CustomModal";
import CustomButton from "../../../../../../components/CustomButton";
import CustomTitle from "../../../../../../components/CustomTitle";
import BackHand from "../../../../../../assets/images/BackHand.png";
import LogoWithSlogan from "../../../../../../assets/images/logo-consumo.svg";

type ICloseModal = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const CloseModal = ({ isVisible, onClose, onConfirm = () => null }: ICloseModal) => {
  const t = translate();
  const theme = useMantineTheme();
  const styles = makeStyles(theme);

  const handleConfirm = () => {
    onConfirm();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <CustomModal
      isVisible={isVisible}
      showCloseButton={false}
      onCloseButton={onClose}
      image={<Image src={BackHand} w="100px" mb="md" />}
      header={
        <Flex direction="column" align="center" justify="center" gap="lg">
          <CustomTitle type="title1">{t("store.register.closeModal.title")}</CustomTitle>
          <CustomTitle type="subtitle">{t("store.register.closeModal.subtitle")}</CustomTitle>
        </Flex>
      }
      buttonContainer={
        <Flex mb="md" mt="xl" gap="xl" align="center" justify="center">
          <CustomButton title={t("store.register.closeModal.confirm")} onClick={handleConfirm} variant="light" />
          <CustomButton title={t("store.register.closeModal.cancel")} onClick={handleClose} variant="primary" />
        </Flex>
      }
      logo={
        <Box style={styles.logoModalContainer}>
          <Image src={LogoWithSlogan} w="150px" />
        </Box>
      }
    />
  );
};

export default CloseModal;
