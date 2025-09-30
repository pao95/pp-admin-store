import { IHttpClient } from "../../../httpClient/interfaces";
import { IDocumentsGateway } from "../../core/gateways/IDocumentsGateway";
import {
  ALL_DOCUMENT_TYPES,
  DocumentStatus,
  DocumentType,
  documentTypeMapping,
  IDocumentUpload,
} from "../../core/entities/IDocument";
import { DOCUMENTS_API } from "../../../../constants/api";
import i18next from "i18next";
import { IDocument } from "../../core/entities/IDocument";

export interface IDocumentsApi {
  id: number;
  entityId: number;
  entityType: string;
  documentType: DocumentType;
  fileName: string;
  fileType: string;
  fileSize: number;
  createdAt: Date;
  updatedAt: Date;
  validUntil: Date;
  file: File | null;
  status: DocumentStatus;
}

export const HttpDocumentsGateway = (httpClient: IHttpClient): IDocumentsGateway => {
  const mapDocumentsToApiFormat = (documents: IDocumentUpload, entityId: number): Partial<IDocumentsApi>[] => {
    return ALL_DOCUMENT_TYPES.map((documentType) => {
      const propertyKey = documentTypeMapping[documentType];
      const file = documents[propertyKey];

      return {
        file: file || null,
        entityId: entityId,
        entityType: "COMMERCE",
        documentType: documentType,
        validUntil: new Date(),
      };
    });
  };

  // Función para subir un documento individual
  const uploadSingleDocument = async (file: File, entityId: number, documentType: string) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await httpClient.post(
        `${DOCUMENTS_API}?entityId=${entityId}&entityType=COMMERCE&documentType=${documentType}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.status) {
        throw new Error(
          response?.error?.message || `${i18next.t("storeRegister.errors.upload_documents_error")}: ${documentType}`
        );
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const mapFromApiToDocument = (documents: IDocumentsApi[]): IDocument[] => {
    return documents.map((document) => ({
      id: document.id,
      entityId: document.entityId,
      entityType: document.entityType,
      documentType: document.documentType,
      fileName: document.fileName,
      fileType: document.fileType,
      fileSize: document.fileSize,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
      validUntil: document.validUntil,
      status: document.status,
    }));
  };

  return {
    async uploadDocuments(documents: IDocumentUpload, entityId: number) {
      try {
        const uploadPromises: Promise<any>[] = [];

        // Obtener todos los documentos mapeados
        const mappedDocuments = mapDocumentsToApiFormat(documents, entityId);

        // Iterar sobre los documentos mapeados y crear promesas de subida
        mappedDocuments.forEach((document) => {
          if (document.file) {
            uploadPromises.push(
              uploadSingleDocument(document.file, document.entityId as number, document.documentType as string)
            );
          }
        });

        // Esperar a que se suban todos los documentos
        if (uploadPromises.length > 0) {
          await Promise.all(uploadPromises);
        }

        return Promise.resolve();
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
    async getDocumentsByEntityId(entityId: number): Promise<IDocument[]> {
      try {
        const response = await httpClient.get(`${DOCUMENTS_API}/COMMERCE/commerce-${entityId}`);

        if (!response.status) {
          throw new Error(response?.error?.message || i18next.t("storeRegister.errors.get_documents_error"));
        }

        return mapFromApiToDocument(response.data as IDocumentsApi[]);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
    async downloadDocument(documentId: number): Promise<Blob> {
      try {
        const response = await httpClient.getBlob(`${DOCUMENTS_API}/${documentId}`);

        if (!response.status) {
          throw new Error(response?.error?.message || i18next.t("storeRegister.errors.download_document_error"));
        }

        const blob = response.data as Blob;

        return blob;
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },

    async updateDocument(documentId: number, file: File): Promise<any> {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await httpClient.put(`${DOCUMENTS_API}/${documentId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (!response.status) {
          throw new Error(
            response?.error?.message || `${i18next.t("storeRegister.errors.update_document_error")}: ${documentId}`
          );
        }

        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },

    async updateDocumentStatus(documentId: number, status: DocumentStatus): Promise<any> {
      try {
        const response = await httpClient.put(`${DOCUMENTS_API}/${documentId}/status?status=${status}`);

        if (!response.status) {
          throw new Error(
            response?.error?.message ||
              `${i18next.t("storeRegister.errors.change_document_status_error")}: ${documentId}`
          );
        }

        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject((error instanceof Error && error.message) || "");
      }
    },
  };
};
