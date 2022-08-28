import { FormControl } from "@angular/forms";

export interface DocumentForm {
    isMainDocument: FormControl<boolean>,
    organizationType: FormControl<string>,
    series: FormControl<string>,
    number: FormControl<string>,
    type: FormControl<string>,
    code: FormControl<string>,
    dateOfIssuance: FormControl<Date>,
    isArchived: FormControl<boolean>
}
