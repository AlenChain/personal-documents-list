import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
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
export class SearchPanelComponent implements OnInit {

  documentType: FormControl<PersonalDocumentType> = new FormControl();
  documentNumber: FormControl<string> = new FormControl();

  documentTypes$: Observable<PersonalDocumentType[]>  = of();

  constructor(
    private documentsHttpService: DocumentsHttpService,
    private documentsHelpService: DocumentsHelpService
  ) { }

  ngOnInit(): void {
    this.initDocumentTypes();
  }

  initDocumentTypes(): void {
    this.documentTypes$ = this.documentsHttpService.getDocumentTypes();
  }

  getFiltersSetStatus(): boolean {
    return !!(this.documentNumber.value || this.documentType.value)
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
  }

}
