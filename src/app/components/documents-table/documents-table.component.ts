import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, tap, Observable, of, takeUntil } from 'rxjs';
import { UnsubscribeClass } from 'src/app/classes/unsubscibe-class';
import { IPersonalDocument } from 'src/app/interfaces/document';
import { DocumentsHelpService } from 'src/app/services/documents-help.service';
import { DocumentsHttpService } from 'src/app/services/documents-http.service';

@Component({
  selector: 'app-documents-table',
  templateUrl: './documents-table.component.html',
  styleUrls: ['./documents-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsTableComponent extends UnsubscribeClass implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  documents!: MatTableDataSource<IPersonalDocument>;
  displayedColumns = ['isMainDocument', 'type', 'series', 'number', 'dateOfIssuance'];

  constructor(private documentsHttpService: DocumentsHttpService, private documentsHelpService: DocumentsHelpService) {
    super();
  }

  ngOnInit(): void {
    this.initDocuments();
  }

  initDocuments(): void {
    this.documentsHttpService.getDocuments().pipe(
      takeUntil(this.destroy$),
      map((documents) => {
        let matDataSource = new MatTableDataSource(documents);
        matDataSource.paginator = this.paginator;
        return matDataSource;
      }),
      tap((matDatasource) => {
        this.documents = matDatasource;
      })
    ).subscribe();
  }

  getArchivedStatus(): Observable<boolean> {
    return this.documentsHelpService.isArchivedShown$;
  }

}
