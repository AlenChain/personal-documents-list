import { DocumentType } from "src/app/constants/document-types";

export interface IPersonalDocument {
    isMainDocument: boolean,
    type: DocumentType,
    series?: string,
    number: string,
    dateOfIssuance: string
}