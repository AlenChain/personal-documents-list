import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, takeUntil, tap, map } from 'rxjs';
import { UnsubscribeClass } from 'src/app/classes/unsubscibe-class';
import { inputProperties } from 'src/app/constants/constants';
import { PersonalDocumentType } from 'src/app/constants/document-types';
import { DocumentFilters } from 'src/app/interfaces/document-filters.interface';
import { DocumentsHelpService } from 'src/app/services/documents-help.service';
import { DocumentsHttpService } from 'src/app/services/documents-http.service';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPanelComponent extends UnsubscribeClass implements OnInit {

  documentType: FormControl<PersonalDocumentType> = new FormControl();
  documentNumber: FormControl<string> = new FormControl();
  isArchivedShown: boolean = false;
  maxInputLength: number = inputProperties.maxInputLength;

  documentTypes$: Observable<PersonalDocumentType[]>  = of();

  constructor(
    private documentsHttpService: DocumentsHttpService,
    private documentsHelpService: DocumentsHelpService
  ) {
    super();
  }

  get applyFiltersSetStatus(): boolean {
    return !!(this.documentNumber.value || this.documentType.value)
  }

  ngOnInit(): void {
    this.initDocumentTypes();
    this.initData();
  }

  initDocumentTypes(): void {
    this.documentTypes$ = this.documentsHttpService.getDocumentTypes();
  }

  initData(): void {
    this.documentsHelpService.isArchivedShown$.pipe(
      takeUntil(this.destroy$),
      tap((isArchivedShown) => {
        this.isArchivedShown = isArchivedShown;
      })
    ).subscribe();
  }

  applyFilters(): void {
    const filters: DocumentFilters = {
      documentType: this.documentType.value,
      documentNumber: this.documentNumber.value
    }
    this.documentsHelpService.filters = filters;
  }

  clearFilters(): void {
    this.documentNumber.reset();
    this.documentType.reset();
    this.documentsHelpService.filters = {};
    this.documentsHelpService.isArchivedShown = false;
  }

}
