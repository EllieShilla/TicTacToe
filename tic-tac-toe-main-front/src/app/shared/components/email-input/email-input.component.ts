import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss',
    '../../../features/authorization/container/authorization.component.scss'
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailInputComponent),
      multi: true
    },
  ]
})
export class EmailInputComponent {
  @ViewChild('emailInput') emailInput!: ElementRef;

  @Input() isEmailInvalid!:boolean;

  email: string = '';
  changed!: (value: string) => void;
  touched!: () => void;

  writeValue(value: string): void {
    this.email = value;
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }
}
