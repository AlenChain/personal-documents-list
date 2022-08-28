import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, takeUntil, tap } from 'rxjs';
import { UnsubscribeClass } from 'src/app/classes/unsubscibe-class';
import { DocumentsHelpService } from 'src/app/services/documents-help.service';

@Component({
  selector: 'app-work-with-documents-panel',
  templateUrl: './work-with-documents-panel.component.html',
  styleUrls: ['./work-with-documents-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkWithDocumentsPanelComponent extends UnsubscribeClass implements OnInit {

  archivedControl: FormControl<boolean> = new FormControl(false, {nonNullable: true});
  selectedDocumentId: number = -1;
  selectedDocumentId$: Observable<number> = of(-1);
  disabledClass: {[key: string]: boolean} = {

  }

  constructor(private documentsHelpService: DocumentsHelpService) {
    super();
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
    this.selectedDocumentId$ = this.documentsHelpService.activeDocumentId$;
    this.documentsHelpService.activeDocumentId$.pipe(
      takeUntil(this.destroy$),
      tap((id: number) => {
        this.selectedDocumentId = id;
      })
    ).subscribe();
  }

  getDisabledClass(): {[key: string]: boolean} {
    return {disabled: this.selectedDocumentId === -1}
  }

}
