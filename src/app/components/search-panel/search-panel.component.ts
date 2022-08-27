import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DocumentType } from 'src/app/constants/document-types';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPanelComponent implements OnInit {

  documentType: FormControl<DocumentType> = new FormControl();
  documentNumber: FormControl<string> = new FormControl();

  mockDocumentTypes: DocumentType[] = [DocumentType.Passport, DocumentType.TransborderPassport, DocumentType.BirthCertificate];

  documentTypes: DocumentType[] = this.mockDocumentTypes;

  constructor() { }

  ngOnInit(): void {
  }

}
