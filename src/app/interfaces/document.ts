import { PersonalDocumentType } from "src/app/constants/document-types";

export interface IPersonalDocument {
    isMainDocument: boolean,
    isArchived: boolean,
    type: PersonalDocumentType,
    series?: string,
    number: string,
    dateOfIssuance: string
}