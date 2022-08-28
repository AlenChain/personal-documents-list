import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { map, tap, Observable, of, takeUntil, switchMap, distinctUntilChanged } from 'rxjs';
import { UnsubscribeClass } from 'src/app/classes/unsubscibe-class';
import { PersonalDocument } from 'src/app/interfaces/document';
import { DocumentFilters } from 'src/app/interfaces/document-filters.interface';
import { DocumentsHelpService } from 'src/app/services/documents-help.service';
import { DocumentsHttpService } from 'src/app/services/documents-http.service';
import { personalDocumentProperty } from 'src/app/types/document-property';

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

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private documentsHttpService: DocumentsHttpService,
    private documentsHelpService: DocumentsHelpService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initDocuments();
    this.watchFiltersChange();
  }

  getRowClasses(row: PersonalDocument): {[key: string]: boolean} {
    return {archived: row.isArchived, active: row.id === this.documentsHelpService.activeDocument?.id}
  }

  initDocuments(): void {
    this.getDocuments().subscribe();

    this.documentsHelpService.isArchivedShown$.pipe(
      takeUntil(this.destroy$),
      tap((isArchivedShown) => {
        if(this.documentsHelpService.activeDocument && !isArchivedShown && this.documents.find((document) => (document.id === this.documentsHelpService.activeDocument?.id) && document.isArchived)) {
          this.documentsHelpService.activeDocument.id = -1;
        }
        this.setMatTableData(this.documents);
      })
    ).subscribe();

    this.documentsHelpService.updateDocuments$.pipe(
      takeUntil(this.destroy$),
      switchMap(() => {
        return this.getDocuments();
      })
    ).subscribe()
  }

  getDocuments(): Observable<PersonalDocument[]> {
    return this.documentsHttpService.getDocuments().pipe(
      takeUntil(this.destroy$),
      tap((documents) => {
        this.documents = documents;
        this.setMatTableData(documents);
      }),
    )
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
    this.setMatSorting();
  }

  setMatSorting(): void {
    this.matTableDocuments.sortingDataAccessor = (document: PersonalDocument, sortHeaderId: string): string | number => {
      switch(sortHeaderId) {
        case 'dateOfIssuance': {
          return moment(document.dateOfIssuance, 'DD.MM.YYYY').toDate().getTime();
        };
        default: return document[sortHeaderId as personalDocumentProperty] ?? '';
      }
    }
    this.matTableDocuments.sort = this.sort;
  }

  selectDocument(document: PersonalDocument): void {
    this.documentsHelpService.activeDocument = document;
  }
}
