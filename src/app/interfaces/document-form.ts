import { FormControl } from "@angular/forms";
import { PersonalDocumentType } from "src/app/constants/document-types";

export interface DocumentForm {
    isMainDocument: FormControl<boolean>,
    organizationType: FormControl<string>,
    series: FormControl<string>,
    number: FormControl<string>,
    type: FormControl<PersonalDocumentType | null>,
    code: FormControl<string>,
    dateOfIssuance: FormControl<Date>,
    isArchived: FormControl<boolean>
}
