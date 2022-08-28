import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';
import { UnsubscribeClass } from 'src/app/classes/unsubscibe-class';
import { DocumentsHelpService } from 'src/app/services/documents-help.service';

@Component({
  selector: 'app-work-with-documents-panel',
  templateUrl: './work-with-documents-panel.component.html',
  styleUrls: ['./work-with-documents-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkWithDocumentsPanelComponent extends UnsubscribeClass implements OnInit {

  showArchivedControl: FormControl<boolean> = new FormControl(false, {nonNullable: true});

  constructor(private documentsHelpService: DocumentsHelpService) {
    super();
  }

  ngOnInit(): void {
    this.initControl();
  }

  initControl(): void {
    this.showArchivedControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      tap((isArchivedShown) => {
        this.documentsHelpService.isArchivedShown = isArchivedShown;
      })
    ).subscribe();
  }

}
