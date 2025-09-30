import { IDocumentUpload } from "../entities/IDocument";
import { IDocumentsGateway } from "../gateways/IDocumentsGateway";

export interface IUploadDocumentActions {
  execute: (documents: IDocumentUpload, entityId: number) => Promise<any>;
}

export const UploadDocumentActions = (documentsGateway: IDocumentsGateway): IUploadDocumentActions => {
  return {
    async execute(documents, entityId) {
      try {
        const response = await documentsGateway.uploadDocuments(documents, entityId);
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
