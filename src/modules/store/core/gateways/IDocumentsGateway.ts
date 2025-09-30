import { IDocumentUpload } from "../entities/IDocument";
import { IDocument, DocumentStatus } from "../entities/IDocument";

export interface IDocumentsGateway {
  uploadDocuments(documents: IDocumentUpload, entityId: number): Promise<any>;
  getDocumentsByEntityId(entityId: number): Promise<IDocument[]>;
  downloadDocument(documentId: number): Promise<Blob>;
  updateDocument(documentId: number, file: File): Promise<any>;
  updateDocumentStatus(documentId: number, status: DocumentStatus): Promise<any>;
}
