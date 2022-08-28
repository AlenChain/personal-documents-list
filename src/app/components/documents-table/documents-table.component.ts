import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, tap, Observable, of, takeUntil, switchMap, distinctUntilChanged } from 'rxjs';
import { UnsubscribeClass } from 'src/app/classes/unsubscibe-class';
import { PersonalDocument } from 'src/app/interfaces/document';
import { DocumentFilters } from 'src/app/interfaces/document-filters.interface';
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

  documents: PersonalDocument[] = [];
  matTableDocuments!: MatTableDataSource<PersonalDocument>;
  displayedColumns = ['isMainDocument', 'type', 'series', 'number', 'dateOfIssuance'];

  constructor(
    private documentsHttpService: DocumentsHttpService,
    private documentsHelpService: DocumentsHelpService
  ) {
    super();
  }

  getRowClasses(row: PersonalDocument): {[key: string]: boolean} {
    return {archived: row.isArchived, active: row.id === this.documentsHelpService.activeDocument?.id}
  }

  ngOnInit(): void {
    this.initDocuments();
    this.watchFiltersChange();
  }

  initDocuments(): void {
    this.documentsHttpService.getDocuments().pipe(
      takeUntil(this.destroy$),
      map((documents) => {
        this.documents = documents;
        this.setMatTableData(documents);
      }),
    ).subscribe();

    this.documentsHelpService.isArchivedShown$.pipe(
      takeUntil(this.destroy$),
      tap((isArchivedShown) => {
        if(this.documentsHelpService.activeDocument && !isArchivedShown && this.documents.find((document) => (document.id === this.documentsHelpService.activeDocument?.id) && document.isArchived)) {
          this.documentsHelpService.activeDocument.id = -1;
        }
        this.setMatTableData(this.documents);
      })
    ).subscribe();
  }

  watchFiltersChange(): void {
    this.documentsHelpService.filters$.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      switchMap((filters: DocumentFilters) => {
        return this.applyFilters(this.documentsHttpService.getDocuments(), filters);
      }),
      tap((documents) => {
        this.documents = documents;
        this.setMatTableData(documents);
      })
    ).subscribe();
  }

  applyFilters(documents$: Observable<PersonalDocument[]>, filters: DocumentFilters): Observable<PersonalDocument[]> {
    return documents$.pipe(
      map((documents) => {
        return documents.filter(document => {
          const type = filters.documentType ? document.type === filters.documentType : true;
          const number = filters.documentNumber ? document.number.match(new RegExp(`^${filters.documentNumber}`)) : true;
          return type && number;
        })
      })
    );
  }

  setMatTableData(documents: PersonalDocument[]): void {
    const filteredDocuments: PersonalDocument[] = this.documentsHelpService.isArchivedShown ? documents : documents.filter((document) => !document.isArchived);
    let matDataSource = new MatTableDataSource(filteredDocuments);
    matDataSource.paginator = this.paginator;
    this.matTableDocuments = matDataSource;
  }

  selectDocument(document: PersonalDocument): void {
    this.documentsHelpService.activeDocument = document;
  }
}
