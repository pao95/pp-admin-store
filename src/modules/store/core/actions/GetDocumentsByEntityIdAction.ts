import { IDocument } from "../entities/IDocument";
import { IDocumentsGateway } from "../gateways/IDocumentsGateway";

export interface IGetDocumentsByEntityIdAction {
  execute(entityId: number): Promise<IDocument[]>;
}

export const GetDocumentsByEntityIdAction = (
  storeDocumentsGateway: IDocumentsGateway
): IGetDocumentsByEntityIdAction => {
  return {
    async execute(entityId: number): Promise<IDocument[]> {
      return await storeDocumentsGateway.getDocumentsByEntityId(entityId);
    },
  };
};
