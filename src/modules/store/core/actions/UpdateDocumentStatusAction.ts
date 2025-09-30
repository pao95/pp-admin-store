import { IDocumentsGateway } from "../gateways/IDocumentsGateway";
import { DocumentStatus } from "../entities/IDocument";

export interface IUpdateDocumentStatusAction {
  execute(documentId: number, status: DocumentStatus): Promise<any>;
}

export const UpdateDocumentStatusAction = (documentsGateway: IDocumentsGateway): IUpdateDocumentStatusAction => {
  return {
    async execute(documentId, status) {
      try {
        const response = await documentsGateway.updateDocumentStatus(documentId, status);
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
