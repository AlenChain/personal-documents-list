import { Injectable, OnDestroy } from "@angular/core";
import { of, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UnsubscribeClass implements OnDestroy {
    destroy$: Subject<void> = new Subject<void>();

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}