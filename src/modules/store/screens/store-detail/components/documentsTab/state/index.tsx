import React from "react";
import { Text, Group, Stack } from "@mantine/core";
import { IconAlertCircle, IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { ALL_DOCUMENT_STATUSES_ENUM, DocumentStatus } from "../../../../../core/entities/IDocument";
import { translate } from "../../../../../../../hooks/useTranslator";
import { customColors } from "../../../../../../../themes/customColors";
import CustomModal from "../../../../../../../components/CustomModal";
import CustomButton from "../../../../../../../components/CustomButton";
import CustomTitle from "../../../../../../../components/CustomTitle";

interface ChangeStatusModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  newStatus: DocumentStatus;
  documentType: string;
  name: string;
}

const ChangeStatusModal: React.FC<ChangeStatusModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  newStatus,
  documentType,
  name,
}) => {
  const t = translate();

  const getStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case ALL_DOCUMENT_STATUSES_ENUM.APPROVED:
        return <IconCircleCheckFilled size={16} color={customColors.icons.green} />;
      case ALL_DOCUMENT_STATUSES_ENUM.REJECTED:
        return <IconCircleXFilled size={16} color={customColors.icons.red} />;

      default:
        return <IconAlertCircle size={16} color={customColors.icons.gray} />;
    }
  };

  const isApproving = newStatus === ALL_DOCUMENT_STATUSES_ENUM.APPROVED;
  const isRejecting = newStatus === ALL_DOCUMENT_STATUSES_ENUM.REJECTED;

  return (
    <CustomModal isVisible={isVisible} showCloseButton={false} onCloseButton={() => {}}>
      <Stack gap="md">
        <Group gap="xs">
          {getStatusIcon(newStatus)}
          <CustomTitle type="title2">
            {isApproving
              ? t("store.edit.documents.changeStatus.approveTitle")
              : isRejecting
              ? t("store.edit.documents.changeStatus.rejectTitle")
              : t("store.edit.documents.changeStatus.changeTitle")}
          </CustomTitle>
        </Group>
        <CustomTitle type="subtitle">
          {isApproving
            ? t("store.edit.documents.changeStatus.approveMessage")
            : isRejecting
            ? t("store.edit.documents.changeStatus.rejectMessage")
            : t("store.edit.documents.changeStatus.changeMessage")}
        </CustomTitle>

        <Group gap="xs">
          <Text size="sm" fw={500}>
            {t("store.edit.documents.changeStatus.name")}:
          </Text>
          <Text size="sm">{name}</Text>
        </Group>
        <Group gap="xs">
          <Text size="sm" fw={500}>
            {t("store.edit.documents.changeStatus.documentType")}:
          </Text>
          <Text size="sm">{documentType}</Text>
        </Group>

        <Group justify="flex-end" gap="sm">
          <CustomButton variant="outline" onClick={onClose} title={t("store.edit.documents.changeStatus.cancel")} />

          <CustomButton
            variant="primary"
            title={
              isApproving
                ? t("store.edit.documents.changeStatus.approve")
                : isRejecting
                ? t("store.edit.documents.changeStatus.reject")
                : t("store.edit.documents.changeStatus.confirm")
            }
            onClick={onConfirm}
          />
        </Group>
      </Stack>
    </CustomModal>
  );
};

export default ChangeStatusModal;
