import React, { useMemo } from "react";
import { Box, Text } from "@mantine/core";
import { translate } from "../../../../../../hooks/useTranslator";
import CustomTitle from "../../../../../../components/CustomTitle";
import {
  IDocument,
  ALL_DOCUMENT_TYPES,
  ALL_DOCUMENT_STATUSES_ENUM,
  DocumentType,
} from "../../../../core/entities/IDocument";
import DocumentsTable from "./table";

interface DocumentsTabProps {
  documents: IDocument[];
  loading: boolean;
  storeId?: number;
  onDownloadDocument?: (document: IDocument) => void;
  onViewDocument?: (document: IDocument) => void;
  onDeleteDocument?: (document: IDocument) => void;
  onChangeDocumentStatus?: (documentId: number, newStatus: string) => void;
  onUpdateDocument?: (file: File, documentId: number) => void;
  onUploadDocument?: (file: File, documentType: DocumentType, entityId: number) => void;
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({
  documents,
  loading,
  storeId,
  onDownloadDocument,
  onChangeDocumentStatus,
  onUpdateDocument,
  onUploadDocument,
}) => {
  const t = translate();

  // Generar documentos faltantes y combinarlos con los existentes
  const allDocuments = useMemo(() => {
    const existingDocumentsMap = new Map<string, IDocument>();
    documents.forEach((doc) => {
      existingDocumentsMap.set(doc.documentType, doc);
    });

    const allDocuments: Partial<IDocument>[] = [];

    ALL_DOCUMENT_TYPES.forEach((documentType) => {
      const existingDoc = existingDocumentsMap.get(documentType);

      if (existingDoc) {
        allDocuments.push(existingDoc);
      } else {
        allDocuments.push({
          documentType,
          status: ALL_DOCUMENT_STATUSES_ENUM.MISSING,
        });
      }
    });

    return allDocuments.sort((a, b) => {
      const aIsMissing = a.status === ALL_DOCUMENT_STATUSES_ENUM.MISSING;
      const bIsMissing = b.status === ALL_DOCUMENT_STATUSES_ENUM.MISSING;

      if (aIsMissing && !bIsMissing) return -1;
      if (!aIsMissing && bIsMissing) return 1;

      return 0;
    });
  }, [documents]);

  if (loading) {
    return (
      <Box p="md">
        <CustomTitle type="title2">{t("store.edit.commons.tabs.documents")}</CustomTitle>
        <Text>{t("store.edit.documentsSection.loading")}</Text>
      </Box>
    );
  }

  if (documents.length === 0) {
    return (
      <Box p="md">
        <CustomTitle type="title2">{t("store.edit.commons.tabs.documents")}</CustomTitle>
        <Text>{t("store.edit.documentsSection.noDocuments")}</Text>
      </Box>
    );
  }

  return (
    <Box p="md">
      <CustomTitle type="title2">{t("store.edit.commons.tabs.documents")}</CustomTitle>

      <DocumentsTable
        documents={allDocuments}
        storeId={storeId}
        onDownloadDocument={onDownloadDocument}
        onChangeDocumentStatus={onChangeDocumentStatus}
        onUpdateDocument={onUpdateDocument}
        onUploadDocument={onUploadDocument}
      />
    </Box>
  );
};

export default DocumentsTab;
