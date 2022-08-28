import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DocumentFilters } from 'src/app/interfaces/document-filters.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentsHelpService {

  isArchivedShown$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  filters$: BehaviorSubject<DocumentFilters> = new BehaviorSubject({});

  get isArchivedShown(): boolean {
    return this.isArchivedShown$.value;
  }

  set isArchivedShown(isArchived: boolean) {
    this.isArchivedShown$.next(isArchived);
  }

  get filters(): DocumentFilters {
    return this.filters$.value;
  }

  set filters(filtersParams: DocumentFilters) {
    this.filters$.next(filtersParams);
  }

  constructor() { }
}
