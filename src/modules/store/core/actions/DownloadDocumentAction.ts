import { IDocumentsGateway } from "../gateways/IDocumentsGateway";

export interface IDownloadDocumentAction {
  execute(documentId: number): Promise<Blob>;
}

export const DownloadDocumentAction = (documentsGateway: IDocumentsGateway): IDownloadDocumentAction => {
  return {
    async execute(documentId) {
      try {
        const blob = await documentsGateway.downloadDocument(documentId);
        return Promise.resolve(blob);
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
};
