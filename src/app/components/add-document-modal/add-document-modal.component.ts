import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-document-modal',
  templateUrl: './add-document-modal.component.html',
  styleUrls: ['./add-document-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDocumentModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
