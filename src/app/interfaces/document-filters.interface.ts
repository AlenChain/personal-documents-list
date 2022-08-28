import { PersonalDocumentType } from "src/app/constants/document-types";

export interface DocumentFilters {
    documentType?: PersonalDocumentType,
    documentNumber?: string
}