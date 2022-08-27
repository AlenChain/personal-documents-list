import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DocumentType } from 'src/app/constants/document-types';
import { IPersonalDocument } from 'src/app/interfaces/document';

@Component({
  selector: 'app-documents-table',
  templateUrl: './documents-table.component.html',
  styleUrls: ['./documents-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsTableComponent implements OnInit {

  mockDocuments: IPersonalDocument[] = [
    {   
      isMainDocument: true,
      type: DocumentType.Passport,
      series: '67 07',
      number: '738384',
      dateOfIssuance: '03.11.2004'
    },
    {   
      isMainDocument: false,
      type: DocumentType.TransborderPassport,
      series: '72',
      number: '1947218',
      dateOfIssuance: '12.05.2016'
    },
    {   
      isMainDocument: false,
      type: DocumentType.BirthCertificate,
      series: 'III-AM',
      number: '502487',
      dateOfIssuance: '20.10.2008'
    },
  ];
  documents: IPersonalDocument[] = this.mockDocuments;
  displayedColumns = ['isMainDocument', 'type', 'series', 'number', 'dateOfIssuance'];

  constructor() { }

  ngOnInit(): void {
    
  }

}
