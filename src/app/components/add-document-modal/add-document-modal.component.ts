import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { map, Observable, switchMap, takeUntil, tap, of } from 'rxjs';
import { UnsubscribeClass } from 'src/app/classes/unsubscibe-class';
import { dateFormat } from 'src/app/constants/date-format';
import { PersonalDocumentType } from 'src/app/constants/document-types';
import { PersonalDocument } from 'src/app/interfaces/document';
import { DocumentForm } from 'src/app/interfaces/document-form';
import { DocumentsHelpService } from 'src/app/services/documents-help.service';
import { DocumentsHttpService } from 'src/app/services/documents-http.service';

@Component({
  selector: 'app-add-document-modal',
  templateUrl: './add-document-modal.component.html',
  styleUrls: ['./add-document-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MAT_DATE_FORMATS, useValue: dateFormat }]
})
export class AddDocumentModalComponent extends UnsubscribeClass implements OnInit {

  form: FormGroup<DocumentForm> = new FormGroup<DocumentForm>({
    isMainDocument: new FormControl(false, {nonNullable: true}),
    organizationType: new FormControl(),
    series: new FormControl(),
    number: new FormControl('', {nonNullable: true, validators: Validators.required }),
    type: new FormControl(null, { validators: Validators.required }),
    code: new FormControl(),
    dateOfIssuance: new FormControl(),
    isArchived: new FormControl(false, {nonNullable: true})
  })
  organizationTypeControl: FormControl<string> = new FormControl();
  organizationTypes$?: Observable<string[]>;
  documentTypes$?: Observable<PersonalDocumentType[]>;

  constructor(
    private documentsHttpService: DocumentsHttpService,
    private dateAdapter: DateAdapter<Date>,
    private dialog: MatDialogRef<AddDocumentModalComponent>,
    private documentsHelpService: DocumentsHelpService,
    @Inject(MAT_DIALOG_DATA) public selectedDocument: PersonalDocument
  ) {
    super();
  }

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
        number: this.selectedDocument.number,
        type: this.selectedDocument.type,
        isArchived: this.selectedDocument.isArchived,
      })
      this.selectedDocument.issuanceOrganization ? this.form.patchValue({organizationType: this.selectedDocument.issuanceOrganization}) : null;
      this.selectedDocument.code ? this.form.patchValue({code: this.selectedDocument.code}) : null;
      this.selectedDocument.dateOfIssuance ? this.form.patchValue({dateOfIssuance: moment(this.selectedDocument.dateOfIssuance, 'DD.MM.YYYY').toDate()}) : null;
      this.selectedDocument.series ? this.form.patchValue({series: this.selectedDocument.series}) : null;
    }
  }

  getDocumentDTO(): Observable<PersonalDocument> {
    if(this.selectedDocument) {
      return of(this.getDocumentData(this.selectedDocument.id))
    } else {
      return this.documentsHttpService.getNewId().pipe(
        map((newId: number) => {
          return this.getDocumentData(newId)
        })
      )
    }
  }

  getDocumentData(id: number): PersonalDocument {
    const rawValue = this.form.getRawValue();
    let document: PersonalDocument = {
      id: id,
      isMainDocument: rawValue.isMainDocument,
      isArchived: rawValue.isArchived,
      type: <PersonalDocumentType>rawValue.type,
      number: rawValue.number,
    }
    rawValue.series ? document.series = rawValue.series : null;
    rawValue.dateOfIssuance ? document.dateOfIssuance = moment(rawValue.dateOfIssuance).format('DD.MM.YYYY') : null;
    rawValue.code ? document.code = rawValue.code : null;
    rawValue.organizationType ? document.issuanceOrganization = rawValue.organizationType : null;
    return document;
  }

  closeModal(): void {
    this.dialog.close();
  }

  saveDocument(): void {
    this.getDocumentDTO().pipe(
      takeUntil(this.destroy$),
      switchMap((documentDTO: PersonalDocument) => {
        return this.selectedDocument ? this.documentsHttpService.editDocument(documentDTO) : this.documentsHttpService.addDocument(documentDTO);
      }),
      tap(() => {
        this.documentsHelpService.updateDocuments = true;
        this.closeModal();
      })
    ).subscribe();
  }

}
