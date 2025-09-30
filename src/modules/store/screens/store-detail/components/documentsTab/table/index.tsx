import React, { useState, useContext } from "react";
import { Table, Text, Group, ActionIcon, Tooltip, Box } from "@mantine/core";
import {
  IconDownload,
  IconAlertCircle,
  IconCircleCheck,
  IconCircleX,
  IconAlarm,
  IconProgressCheck,
  IconFileUpload,
  IconUpload,
  IconCircleCheckFilled,
  IconCircleXFilled,
} from "@tabler/icons-react";
import {
  IDocument,
  DOCUMENT_TYPE_TRANSLATION_KEYS,
  DocumentType,
  DocumentStatus,
  ALL_DOCUMENT_STATUSES_ENUM,
} from "../../../../../core/entities/IDocument";

import { translate } from "../../../../../../../hooks/useTranslator";
import dayjs from "dayjs";
import { customColors } from "../../../../../../../themes/customColors";
import CustomLink from "../../../../../../../components/CustomLink";
import { makeStyles } from "./styles";
import UploadDocumentModal from "../upload";
import UpdateDocumentModal from "../update";
import ChangeStatusModal from "../state";
import { AuthContext } from "../../../../../../../contexts/AuthContext";
import { PERMISSIONS } from "../../../../../../../constants/permissions";

interface DocumentStatusInfo {
  icon: React.ReactNode;
  color: string;
  tooltip: string;
}

interface DocumentAction {
  id: string;
  icon: React.ReactNode;
  onClick: () => void;
  tooltip: string;
  disabled: boolean;
}

interface DocumentsTableProps {
  documents: Partial<IDocument>[];
  storeId?: number;
  onDownloadDocument?: (document: IDocument) => void;
  onChangeDocumentStatus?: (documentId: number, newStatus: string) => void;
  onUpdateDocument?: (file: File, documentId: number) => void;
  onUploadDocument?: (file: File, documentType: DocumentType, entityId: number) => void;
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({
  documents,
  storeId,
  onDownloadDocument,
  onChangeDocumentStatus,
  onUpdateDocument,
  onUploadDocument,
}) => {
  const styles = makeStyles();
  const t = translate();
  const { actions: authActions } = useContext(AuthContext);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [changeStatusModalVisible, setChangeStatusModalVisible] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState<DocumentType | null>(null);
  const [selectedDocumentForStatusChange, setSelectedDocumentForStatusChange] = useState<{
    id: number;
    currentStatus: DocumentStatus;
    newStatus: DocumentStatus;
    documentType: string;
    name: string;
  } | null>(null);

  const getDocumentTypeLabel = (documentType: string): string => {
    const translationKey = DOCUMENT_TYPE_TRANSLATION_KEYS[documentType as DocumentType];
    return translationKey ? t(translationKey) : documentType;
  };

  const getDocumentStatusInfo = (status: DocumentStatus): DocumentStatusInfo => {
    switch (status) {
      case ALL_DOCUMENT_STATUSES_ENUM.MISSING:
        return {
          icon: <IconAlertCircle size={20} />,
          color: customColors.icons.gray,
          tooltip: t("store.edit.documentsSection.statuses.missing"),
        };
      case ALL_DOCUMENT_STATUSES_ENUM.PENDING_VALIDATION:
        return {
          icon: <IconProgressCheck size={20} />,
          color: customColors.icons.yellow,
          tooltip: t("store.edit.documentsSection.statuses.pending"),
        };
      case ALL_DOCUMENT_STATUSES_ENUM.APPROVED:
        return {
          icon: <IconCircleCheck size={20} />,
          color: customColors.icons.green,
          tooltip: t("store.edit.documentsSection.statuses.approved"),
        };
      case ALL_DOCUMENT_STATUSES_ENUM.REJECTED:
        return {
          icon: <IconCircleX size={20} />,
          color: customColors.icons.red,
          tooltip: t("store.edit.documentsSection.statuses.rejected"),
        };
      case ALL_DOCUMENT_STATUSES_ENUM.EXPIRED:
        return {
          icon: <IconAlarm size={20} />,
          color: customColors.icons.orange,
          tooltip: t("store.edit.documentsSection.statuses.expired"),
        };
    }
  };

  const getDocumentActions = (status: DocumentStatus, document: Partial<IDocument>): DocumentAction[] => {
    const actions: DocumentAction[] = [];

    switch (status) {
      case ALL_DOCUMENT_STATUSES_ENUM.PENDING_VALIDATION:
        // Para documentos pendientes, permitir aprobar o rechazar
        if (onChangeDocumentStatus && document.id) {
          actions.push({
            id: "approve",
            icon: <IconCircleCheckFilled size={16} color={customColors.icons.green} />,
            onClick: () => {
              setSelectedDocumentForStatusChange({
                id: document.id as number,
                currentStatus: document.status as DocumentStatus,
                newStatus: ALL_DOCUMENT_STATUSES_ENUM.APPROVED,
                documentType: getDocumentTypeLabel(document.documentType as string),
                name: document.fileName as string,
              });
              setChangeStatusModalVisible(true);
            },
            tooltip: t("store.edit.documentsSection.actions.approveTooltip"),
            disabled: !authActions.hasPermission([PERMISSIONS.DOCUMENTATION_EDIT]),
          });

          actions.push({
            id: "reject",
            icon: <IconCircleXFilled size={16} color={customColors.icons.red} />,
            onClick: () => {
              setSelectedDocumentForStatusChange({
                id: document.id as number,
                currentStatus: document.status as DocumentStatus,
                newStatus: ALL_DOCUMENT_STATUSES_ENUM.REJECTED,
                documentType: getDocumentTypeLabel(document.documentType as string),
                name: document.fileName as string,
              });
              setChangeStatusModalVisible(true);
            },
            tooltip: t("store.edit.documentsSection.actions.rejectTooltip"),
            disabled: !authActions.hasPermission([PERMISSIONS.DOCUMENTATION_EDIT]),
          });
        }
        break;

      case ALL_DOCUMENT_STATUSES_ENUM.APPROVED:
      case ALL_DOCUMENT_STATUSES_ENUM.REJECTED:
      case ALL_DOCUMENT_STATUSES_ENUM.EXPIRED:
        // Para documentos aprobados, rechazados o vencidos, permitir actualizar
        if (document.id) {
          actions.push({
            id: "update",
            icon: <IconFileUpload size={16} />,
            onClick: () => {
              setSelectedDocumentType(document.documentType as DocumentType);
              setUpdateModalVisible(true);
            },
            tooltip: t("store.edit.documentsSection.actions.updateTooltip"),
            disabled: !authActions.hasPermission([PERMISSIONS.DOCUMENTATION_EDIT]),
          });
        }
        break;

      case ALL_DOCUMENT_STATUSES_ENUM.MISSING:
        // Para documentos faltantes, permitir subir
        actions.push({
          id: "upload",
          icon: <IconUpload size={16} />,
          onClick: () => {
            setSelectedDocumentType(document.documentType as DocumentType);
            setUploadModalVisible(true);
          },
          tooltip: t("store.edit.documentsSection.actions.uploadTooltip"),
          disabled: !authActions.hasPermission([PERMISSIONS.DOCUMENTATION_CREATE]),
        });
        break;
      default:
        // Para otros estados, por ahora no hay acciones disponibles
        // En el futuro se pueden agregar más acciones según los requerimientos
        break;
    }

    return actions;
  };

  const handleUploadDocument = (file: File) => {
    if (onUploadDocument && selectedDocumentType && storeId) {
      onUploadDocument(file, selectedDocumentType, storeId);
      setUploadModalVisible(false);
    }
  };
  const handleUpdateDocument = (file: File) => {
    if (onUpdateDocument && selectedDocumentType) {
      const existingDocument = documents.find((doc) => doc.documentType === selectedDocumentType);
      if (existingDocument && existingDocument.id) {
        onUpdateDocument(file, existingDocument.id);
        setUpdateModalVisible(false);
      }
    }
  };

  const handleConfirmStatusChange = () => {
    if (onChangeDocumentStatus && selectedDocumentForStatusChange) {
      onChangeDocumentStatus(selectedDocumentForStatusChange.id, selectedDocumentForStatusChange.newStatus);
      setChangeStatusModalVisible(false);
      setSelectedDocumentForStatusChange(null);
    }
  };

  return (
    <>
      <Table withColumnBorders mt="xl" striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{t("store.edit.documentsSection.table.type")}</Table.Th>
            <Table.Th>{t("store.edit.documentsSection.table.name")}</Table.Th>

            <Table.Th>{t("store.edit.documentsSection.table.date")}</Table.Th>
            <Table.Th>{t("store.edit.documentsSection.table.status")}</Table.Th>
            <Table.Th>{t("store.edit.documentsSection.table.actions")}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {documents.map((document) => {
            const isMissing = document.status === ALL_DOCUMENT_STATUSES_ENUM.MISSING;
            const statusInfo = getDocumentStatusInfo(document.status as DocumentStatus);
            const availableActions = getDocumentActions(document.status as DocumentStatus, document);

            return (
              <Table.Tr key={isMissing ? `missing-${document.documentType}` : document.id}>
                <Table.Td>
                  <Text size="sm">{getDocumentTypeLabel(document.documentType as DocumentType)}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs" align="center">
                    {isMissing ? (
                      <Text size="sm" fw={500}>
                        N/A
                      </Text>
                    ) : (
                      <CustomLink linkTo={`#`} value={document.fileName || ""} textStyles={styles.link} />
                    )}

                    {!isMissing && onDownloadDocument && (
                      <Tooltip label={t("store.edit.documentsSection.actions.download")}>
                        <ActionIcon
                          variant="subtle"
                          color="green"
                          size="sm"
                          disabled={!authActions.hasPermission([PERMISSIONS.DOCUMENTATION_VIEW])}
                          onClick={() => onDownloadDocument(document as IDocument)}
                        >
                          <IconDownload size={14} />
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </Group>
                </Table.Td>

                <Table.Td>
                  <Text size="sm" c={isMissing ? "dimmed" : undefined}>
                    {isMissing ? "N/A" : dayjs(document.createdAt).format("DD/MM/YYYY")}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Box style={styles.statusInfo}>
                    <Box
                      style={{
                        color: statusInfo.color,
                        ...styles.statusInfoIcon,
                      }}
                    >
                      {statusInfo.icon}
                    </Box>
                    <Text size="xs">{statusInfo.tooltip}</Text>
                  </Box>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    {availableActions.length > 0 ? (
                      availableActions.map((action) => (
                        <Tooltip key={action.id} label={action.tooltip}>
                          <ActionIcon
                            variant="subtle"
                            size="sm"
                            onClick={action.onClick}
                            mt="xs"
                            mb="xs"
                            disabled={action.disabled}
                          >
                            {action.icon}
                          </ActionIcon>
                        </Tooltip>
                      ))
                    ) : (
                      <Text size="sm" c="dimmed">
                        {isMissing
                          ? t("store.edit.documentsSection.actions.notAvailable")
                          : t("store.edit.documentsSection.actions.noActions")}
                      </Text>
                    )}
                  </Group>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>

      <UploadDocumentModal
        isVisible={uploadModalVisible}
        onClose={() => setUploadModalVisible(false)}
        documentType={selectedDocumentType as DocumentType}
        onUpload={handleUploadDocument}
        getDocumentTypeLabel={getDocumentTypeLabel}
      />
      <UpdateDocumentModal
        isVisible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
        documentType={selectedDocumentType as DocumentType}
        onUpdate={handleUpdateDocument}
        getDocumentTypeLabel={getDocumentTypeLabel}
      />
      <ChangeStatusModal
        isVisible={changeStatusModalVisible}
        onClose={() => {
          setChangeStatusModalVisible(false);
          setSelectedDocumentForStatusChange(null);
        }}
        onConfirm={handleConfirmStatusChange}
        newStatus={selectedDocumentForStatusChange?.newStatus as DocumentStatus}
        documentType={selectedDocumentForStatusChange?.documentType || ""}
        name={selectedDocumentForStatusChange?.name || ""}
      />
    </>
  );
};

export default DocumentsTable;
