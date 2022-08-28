import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, takeUntil, tap } from 'rxjs';
import { UnsubscribeClass } from 'src/app/classes/unsubscibe-class';
import { AddDocumentModalComponent } from 'src/app/components/add-document-modal/add-document-modal.component';
import { PersonalDocument } from 'src/app/interfaces/document';
import { DocumentsHelpService } from 'src/app/services/documents-help.service';
import { DocumentsHttpService } from 'src/app/services/documents-http.service';

@Component({
  selector: 'app-work-with-documents-panel',
  templateUrl: './work-with-documents-panel.component.html',
  styleUrls: ['./work-with-documents-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkWithDocumentsPanelComponent extends UnsubscribeClass implements OnInit {

  archivedControl: FormControl<boolean> = new FormControl(false, {nonNullable: true});
  selectedDocument?: PersonalDocument | null;
  selectedDocument$?: Observable<PersonalDocument | null>;

  constructor(
    private documentsHelpService: DocumentsHelpService,
    private dialog: MatDialog, private documentsHttpService: DocumentsHttpService
  ) {
    super();
  }

  getDisabledStatus(id: number): boolean {
    return id === undefined || id === null || id === -1;
  }

  ngOnInit(): void {
    this.initControl();
    this.initDocumentSelection();
  }

  initControl(): void {
    this.archivedControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      tap((isArchivedShown: boolean) => {
        this.documentsHelpService.isArchivedShown = isArchivedShown;
      })
    ).subscribe();
  }

  initDocumentSelection(): void {
    this.selectedDocument$ = this.documentsHelpService.activeDocument$;
    this.documentsHelpService.activeDocument$.pipe(
      takeUntil(this.destroy$),
      tap((document: PersonalDocument | null) => {
        this.selectedDocument = document;
      })
    ).subscribe();
  }

  addDocument(): void {
    this.dialog.open(AddDocumentModalComponent, {
      panelClass: "no-padding",
      position: { top: '10%' }
    })
  }

  editDocument(): void {
    this.dialog.open(AddDocumentModalComponent, {
      panelClass: "no-padding",
      position: { top: '10%' },
      data: this.selectedDocument
    })
  }

  deleteDocument(): void {
    this.documentsHttpService.deleteDocument(this.documentsHelpService.activeDocument).pipe(
      takeUntil(this.destroy$),
      tap(() => {
        // (add documents array to service) here update db and set active document to null
      })
    ).subscribe();
  }

}
