import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsHelpService {

  isArchivedShown$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get isArchivedShown() {
    return this.isArchivedShown$.value;
  }

  set isArchivedShown(isArchived: boolean) {
    this.isArchivedShown$.next(isArchived);
  }

  constructor() { }
}
