import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[dateInputFilter]'
})
export class InputFilterDirective {
    lastKey!: string | null;

    constructor(private el: ElementRef) {

    }

    @HostListener('keydown', ['$event']) onKeyDown(event: Event) {
        const e = <KeyboardEvent> event;
        const isValidKey = Number.isNaN(Number(e.key)) && e.key !== 'Backspace' && e.key !== '.' && !e.ctrlKey || (e.key === this.lastKey && this.lastKey === '.');
        if (isValidKey) {
           e.preventDefault();
        }
        this.lastKey = e.key;
    }
}