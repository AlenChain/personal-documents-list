import { PersonalDocumentType } from "src/app/constants/document-types";

export interface IPersonalDocument {
    isMainDocument: boolean,
    type: PersonalDocumentType,
    series?: string,
    number: string,
    dateOfIssuance: string
}