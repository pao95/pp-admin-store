import { IDocumentsGateway } from "../gateways/IDocumentsGateway";

export interface IUpdateDocumentAction {
  execute(documentId: number, file: File): Promise<any>;
}

export const UpdateDocumentAction = (documentsGateway: IDocumentsGateway): IUpdateDocumentAction => {
  return {
    async execute(documentId, file) {
      try {
        const response = await documentsGateway.updateDocument(documentId, file);
        return Promise.resolve(response);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
