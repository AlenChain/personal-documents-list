import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DocumentFilters } from 'src/app/interfaces/document-filters.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentsHelpService {

  activeDocumentId$: BehaviorSubject<number> = new BehaviorSubject(-1);
  isArchivedShown$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  filters$: BehaviorSubject<DocumentFilters> = new BehaviorSubject({});

  get isArchivedShown(): boolean {
    return this.isArchivedShown$.value;
  }

  get filters(): DocumentFilters {
    return this.filters$.value;
  }

  get activeDocumentId(): number {
    return this.activeDocumentId$.value;
  }

  set isArchivedShown(isArchived: boolean) {
    this.isArchivedShown$.next(isArchived);
  }

  set filters(filtersParams: DocumentFilters) {
    this.filters$.next(filtersParams);
  }

  set activeDocumentId(activeDocumentId: number) {
    this.activeDocumentId$.next(activeDocumentId);
  }

  constructor() { }
}
