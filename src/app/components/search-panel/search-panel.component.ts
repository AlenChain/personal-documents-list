import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { PersonalDocumentType } from 'src/app/constants/document-types';
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

  constructor(private documentsHttpService: DocumentsHttpService) { }

  ngOnInit(): void {
    this.initDocumentTypes();
  }

  initDocumentTypes(): void {
    this.documentTypes$ = this.documentsHttpService.getDocumentTypes();
  }

}
