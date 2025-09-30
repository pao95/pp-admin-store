import React from "react";
import { Box, Divider, Flex } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { translate } from "../../../../../hooks/useTranslator";
import { makeStyles } from "./styles";
import CustomTitle from "../../../../../components/CustomTitle";
import CustomFileUpload from "../../../../../components/CustomFileUpload";
import { IconCircleX } from "@tabler/icons-react";
import TextInfo from "../../../../../components/TextInfo";
import IconButton from "../../../../../components/IconButton";
import { IDocumentUpload } from "../../../core/entities/IDocument";

interface FormStep3Props {
  form: UseFormReturnType<IDocumentUpload>;
  handleCancel: () => void;
}

const FormStep3: React.FC<FormStep3Props> = ({ form, handleCancel }) => {
  const styles = makeStyles();
  const t = translate();

  const values = form.values;

  return (
    <Box style={styles.containerBox}>
      <Box style={styles.containerBoxTop}>
        <Box>
          <CustomTitle type="title2" mb={10}>
            {t("store.register.step3.title")}
          </CustomTitle>
          <CustomTitle type="subtitle">{t("store.register.step3.description")}</CustomTitle>
        </Box>
        <Box style={styles.iconClose}>
          <IconButton variant="transparent" size="md" icon={<IconCircleX />} color="default" onClick={handleCancel} />
        </Box>
      </Box>

      {/* Documentación requerida */}
      <Box style={styles.containerBoxBottom}>
        <CustomTitle type="title2" mb={10}>
          {t("store.register.step3.taxData.title")}
        </CustomTitle>
        <Flex gap="xl" wrap="wrap">
          <Box style={{ flex: 1, minWidth: 300 }}>
            <CustomFileUpload
              label={t("store.register.step3.documents.afipRegistrationDocument")}
              file={values.afipRegistrationDocument}
              setFile={(file) => form.setFieldValue("afipRegistrationDocument", file)}
              accept="application/pdf,image/png,image/jpeg"
              maxSize={10}
            />
          </Box>

          <Box style={{ flex: 1, minWidth: 300 }}>
            <CustomFileUpload
              label={t("store.register.step3.documents.iibbRegistrationDocument")}
              file={values.iibbRegistrationDocument}
              setFile={(file) => form.setFieldValue("iibbRegistrationDocument", file)}
              accept="application/pdf,image/png,image/jpeg"
              maxSize={10}
            />
          </Box>
          {/* <Box style={{ flex: 1, minWidth: 300 }}></Box> */}
        </Flex>
      </Box>
      <Divider />

      <Box style={styles.containerBoxBottom}>
        <CustomTitle type="title2" mb={10}>
          {t("store.register.step3.comercialData.title")}
        </CustomTitle>
        <Flex gap="xl" wrap="wrap" mt="md">
          <Box style={{ flex: 1, minWidth: 300 }}>
            <CustomFileUpload
              label={t("store.register.step3.documents.storeRegistrationFormDocument")}
              file={values.storeRegistrationFormDocument}
              setFile={(file) => form.setFieldValue("storeRegistrationFormDocument", file)}
              accept="application/pdf,image/png,image/jpeg"
              maxSize={10}
              tooltipText={t("store.register.step3.tooltipText.storeRegistrationFormDocument")}
            />
          </Box>
          <Box style={{ flex: 1, minWidth: 300 }}>
            <CustomFileUpload
              label={t("store.register.step3.documents.brandLogoDocument")}
              file={values.brandLogoDocument}
              setFile={(file) => form.setFieldValue("brandLogoDocument", file)}
              accept="application/pdf,image/png,image/jpeg"
              maxSize={10}
            />
          </Box>
        </Flex>
      </Box>
      <Divider />
      <Box style={styles.containerBoxBottom}>
        <CustomTitle type="title2" mb={10}>
          {t("store.register.step3.holderData.title")}
        </CustomTitle>

        <Flex gap="xl" wrap="wrap" mt="md">
          <Box style={{ flex: 1, minWidth: 300 }}>
            <CustomFileUpload
              label={t("store.register.step3.documents.dniFrontDocument")}
              file={values.dniFrontDocument}
              setFile={(file) => form.setFieldValue("dniFrontDocument", file)}
              accept="application/pdf,image/png,image/jpeg"
              maxSize={10}
            />
          </Box>

          <Box style={{ flex: 1, minWidth: 300 }}>
            <CustomFileUpload
              label={t("store.register.step3.documents.dniBackDocument")}
              file={values.dniBackDocument}
              setFile={(file) => form.setFieldValue("dniBackDocument", file)}
              accept="application/pdf,image/png,image/jpeg"
              maxSize={10}
            />
          </Box>
        </Flex>
        <Flex gap="xl" wrap="wrap" mt="md">
          <Box style={{ flex: 1, minWidth: 300 }}>
            <CustomFileUpload
              label={t("store.register.step3.documents.powerOfAttorneyDocument")}
              file={values.powerOfAttorneyDocument}
              setFile={(file) => form.setFieldValue("powerOfAttorneyDocument", file)}
              accept="application/pdf,image/png,image/jpeg"
              maxSize={10}
              tooltipText={t("store.register.step3.tooltipText.powerOfAttorneyDocument")}
            />
          </Box>
          <Box style={{ flex: 1, minWidth: 300 }}></Box>
        </Flex>
        <Flex gap="xl" wrap="wrap" mt="md">
          <TextInfo text={t("store.register.step3.fileUpload.acceptedTypes")} />
        </Flex>
      </Box>
    </Box>
  );
};

export default FormStep3;
