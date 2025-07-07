import { Directive, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective implements OnInit {
  constructor(private ngControl: NgControl) {}

  ngOnInit() {
    this.ngControl.control?.valueChanges?.subscribe(value => {
      if (typeof value === 'string' && value !== value.toUpperCase()) {
        this.ngControl.control?.setValue(value.toUpperCase(), { emitEvent: false });
      }
    });
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const upper = input.value.toUpperCase();
    this.ngControl.control?.setValue(upper, { emitEvent: false });
    input.value = upper;
  }
} 