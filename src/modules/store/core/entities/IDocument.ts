export interface IDocumentUpload {
  afipRegistrationDocument: File | null;
  iibbRegistrationDocument: File | null;
  dniFrontDocument: File | null;
  dniBackDocument: File | null;
  powerOfAttorneyDocument: File | null;
  storeRegistrationFormDocument: File | null;
  brandLogoDocument: File | null;
}

export interface IDocument {
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
  status: DocumentStatus;
}

// Definición de todos los tipos de documento posibles
export const ALL_DOCUMENT_TYPES = [
  "AFIP_REGISTRATION",
  "GROSS_INCOME_REGISTRATION",
  "DNI_FRONT",
  "DNI_BACK",
  "HOLDER_POWER_OF_ATTORNEY",
  "BUSINESS_REGISTRATION_FORM",
  "BRAND_ICON",
] as const;

export const ALL_DOCUMENT_STATUSES_ENUM = {
  PENDING_VALIDATION: "PENDING_VALIDATION",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  EXPIRED: "EXPIRED",
  MISSING: "MISSING",
} as const;

// Mapeo de tipos de documento a propiedades de IDocumentUpload
export const documentTypeMapping: Record<DocumentType, keyof IDocumentUpload> = {
  AFIP_REGISTRATION: "afipRegistrationDocument",
  GROSS_INCOME_REGISTRATION: "iibbRegistrationDocument",
  DNI_FRONT: "dniFrontDocument",
  DNI_BACK: "dniBackDocument",
  HOLDER_POWER_OF_ATTORNEY: "powerOfAttorneyDocument",
  BUSINESS_REGISTRATION_FORM: "storeRegistrationFormDocument",
  BRAND_ICON: "brandLogoDocument",
};

export type DocumentType = (typeof ALL_DOCUMENT_TYPES)[number];
export type DocumentStatus = (typeof ALL_DOCUMENT_STATUSES_ENUM)[keyof typeof ALL_DOCUMENT_STATUSES_ENUM];

// Mapeo de tipos de documento a claves de traducción
export const DOCUMENT_TYPE_TRANSLATION_KEYS: Record<DocumentType, string> = {
  AFIP_REGISTRATION: "store.edit.documentsSection.table.afipRegistration",
  GROSS_INCOME_REGISTRATION: "store.edit.documentsSection.table.iibbRegistration",
  DNI_FRONT: "store.edit.documentsSection.table.dniFront",
  DNI_BACK: "store.edit.documentsSection.table.dniBack",
  HOLDER_POWER_OF_ATTORNEY: "store.edit.documentsSection.table.powerOfAttorney",
  BUSINESS_REGISTRATION_FORM: "store.edit.documentsSection.table.businessRegistrationForm",
  BRAND_ICON: "store.edit.documentsSection.table.brandIcon",
};
