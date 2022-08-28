import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonalDocument } from 'src/app/interfaces/document';
import { DocumentFilters } from 'src/app/interfaces/document-filters.interface';
import { DocumentsHttpService } from 'src/app/services/documents-http.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentsHelpService {

  updateDocuments$: BehaviorSubject<true> = new BehaviorSubject(true);
  activeDocument$: BehaviorSubject<PersonalDocument | null> = new BehaviorSubject<PersonalDocument | null>(null);
  isArchivedShown$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  filters$: BehaviorSubject<DocumentFilters> = new BehaviorSubject({});

  constructor(private documentsHttpService: DocumentsHttpService) { }

  get isArchivedShown(): boolean {
    return this.isArchivedShown$.value;
  }

  get filters(): DocumentFilters {
    return this.filters$.value;
  }

  get activeDocument(): PersonalDocument | null {
    return this.activeDocument$.value;
  }

  get updateDocuments(): true {
    return this.updateDocuments$.value;
  }

  set isArchivedShown(isArchived: boolean) {
    this.isArchivedShown$.next(isArchived);
  }

  set filters(filtersParams: DocumentFilters) {
    this.filters$.next(filtersParams);
  }

  set activeDocument(activeDocument: PersonalDocument | null) {
    this.activeDocument$.next(activeDocument);
  }

  set updateDocuments(update: true) {
    this.updateDocuments$.next(update);
  }
}
