import React, { useState } from "react";
import { Box, Group, Text } from "@mantine/core";
import { translate } from "../../../../../../../hooks/useTranslator";
import CustomModal from "../../../../../../../components/CustomModal";
import CustomFileUpload from "../../../../../../../components/CustomFileUpload";
import CustomTitle from "../../../../../../../components/CustomTitle";
import { DocumentType } from "../../../../../core/entities/IDocument";
import CustomButton from "../../../../../../../components/CustomButton";

interface UpdateDocumentModalProps {
  isVisible: boolean;
  onClose: () => void;
  documentType: DocumentType;
  onUpdate: (file: File) => void;
  getDocumentTypeLabel: (documentType: DocumentType) => string;
}

const UpdateDocumentModal: React.FC<UpdateDocumentModalProps> = ({
  isVisible,
  onClose,
  documentType,
  onUpdate,
  getDocumentTypeLabel,
}) => {
  const t = translate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (selectedFile) {
      onUpdate(selectedFile);
      setSelectedFile(null);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    onClose();
  };

  return (
    <CustomModal isVisible={isVisible} showCloseButton={false} onCloseButton={() => {}}>
      <Box p="md" w="100%">
        <CustomTitle type="title2" mb="md">
          {t("store.edit.documentsSection.update.title")}
        </CustomTitle>
        <Text size="sm" c="dimmed" mb="lg">
          {t("store.edit.documentsSection.update.description")}
        </Text>

        <CustomFileUpload
          label={getDocumentTypeLabel(documentType)}
          file={selectedFile}
          setFile={setSelectedFile}
          accept="application/pdf,image/png,image/jpeg"
          maxSize={10}
          isMandatory={true}
        />

        <Text size="xs" c="dimmed" mt="sm">
          {t("store.register.step3.fileUpload.acceptedTypes")}
        </Text>

        <Group justify="flex-end" mt="xl">
          <CustomButton variant="light" onClick={handleClose} title={t("common.cancel")} />
          <CustomButton
            onClick={handleUpload}
            disabled={!selectedFile}
            variant="primary"
            title={t("store.edit.documentsSection.update.submit")}
          />
        </Group>
      </Box>
    </CustomModal>
  );
};

export default UpdateDocumentModal;
