import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { UnsubscribeClass } from 'src/app/classes/unsubscibe-class';

@Component({
  selector: 'app-work-with-documents-panel',
  templateUrl: './work-with-documents-panel.component.html',
  styleUrls: ['./work-with-documents-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkWithDocumentsPanelComponent extends UnsubscribeClass implements OnInit {

  showArchivedControl: FormControl<boolean> = new FormControl(false, {nonNullable: true});

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initControl();
  }

  initControl(): void {
    this.showArchivedControl.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe((value) => {
      // tell service to change table display
    })
  }

}
