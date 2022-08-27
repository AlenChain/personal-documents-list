import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPersonalDocument } from 'src/app/interfaces/document';
import { DocumentsHttpService } from 'src/app/services/documents-http.service';

@Component({
  selector: 'app-documents-table',
  templateUrl: './documents-table.component.html',
  styleUrls: ['./documents-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsTableComponent implements OnInit {

  documents$: Observable<IPersonalDocument[]> = of();
  displayedColumns = ['isMainDocument', 'type', 'series', 'number', 'dateOfIssuance'];

  constructor(private documentsHttpService: DocumentsHttpService) { }

  ngOnInit(): void {
    this.initDocuments();
  }

  initDocuments(): void {
    this.documents$ = this.documentsHttpService.getDocuments();
  }

}
