import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { dateFormat } from 'src/app/constants/date-format';
import { PersonalDocumentType } from 'src/app/constants/document-types';
import { PersonalDocument } from 'src/app/interfaces/document';
import { DocumentForm } from 'src/app/interfaces/document-form';
import { DocumentsHttpService } from 'src/app/services/documents-http.service';

@Component({
  selector: 'app-add-document-modal',
  templateUrl: './add-document-modal.component.html',
  styleUrls: ['./add-document-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MAT_DATE_FORMATS, useValue: dateFormat }]
})
export class AddDocumentModalComponent implements OnInit {

  form: FormGroup<DocumentForm> = new FormGroup<DocumentForm>({
    isMainDocument: new FormControl(),
    organizationType: new FormControl(),
    series: new FormControl(),
    number: new FormControl('', {nonNullable: true, validators: Validators.required }),
    type: new FormControl('', {nonNullable: true, validators: Validators.required }),
    code: new FormControl(),
    dateOfIssuance: new FormControl(),
    isArchived: new FormControl()
  })
  organizationTypeControl: FormControl<string> = new FormControl();
  organizationTypes$?: Observable<string[]>;
  documentTypes$?: Observable<PersonalDocumentType[]>;

  constructor(
    private documentsHttpService: DocumentsHttpService,
    private dateAdapter: DateAdapter<Date>,
    private dialog: MatDialogRef<AddDocumentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedDocument: PersonalDocument,
    // private documentsHelpService: DocumentsHelpService
  ) { }

  ngOnInit(): void {
    this.dateAdapter.setLocale('ru');
    this.initSelectDataOptions();
    this.initDocumentData();
  }

  initSelectDataOptions(): void {
    this.organizationTypes$ = this.documentsHttpService.getOrganizationTypes();
    this.documentTypes$ = this.documentsHttpService.getDocumentTypes();
  }

  initDocumentData(): void {
    if(this.selectedDocument) {
      this.form.patchValue({
        isMainDocument: this.selectedDocument.isMainDocument,
        code: this.selectedDocument.code,
        dateOfIssuance: new Date(this.selectedDocument.dateOfIssuance ? moment(this.selectedDocument.dateOfIssuance, 'DD.MM.YYYY').toDate() : ''),
        number: this.selectedDocument.number,
        organizationType: this.selectedDocument.issuanceOrganization,
        series: this.selectedDocument.series,
        type: this.selectedDocument.type,
        isArchived: this.selectedDocument.isArchived
      })
    }
  }

  closeModal(): void {
    this.dialog.close();
  }

  saveDocument(): void {
    this.selectedDocument ? this.documentsHttpService.editDocument() : this.documentsHttpService.addDocument();
  }

}
