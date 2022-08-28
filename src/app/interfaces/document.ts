import { PersonalDocumentType } from "src/app/constants/document-types";

export interface PersonalDocument {
    id: number,
    isMainDocument: boolean,
    isArchived: boolean,
    type: PersonalDocumentType,
    series?: string,
    number: string,
    dateOfIssuance: string,
    code: string,
    issuanceOrganization: string
}