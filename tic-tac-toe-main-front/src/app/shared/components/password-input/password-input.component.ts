import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: [
    './password-input.component.scss',
    '../../../features/authorization/container/authorization.component.scss'
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true
    },
  ]
})
export class PasswordInputComponent implements ControlValueAccessor {
  @Input() title!: string;
  @Input() isPasswordValid!: boolean;
  @Input() isPasswordTouched!: boolean;

  @ViewChild('passwordInput') passwordInput!: ElementRef;

  private isPasswordVisible: boolean = false;

  iconSrc: string = '../../../../assets/img/eye.svg';
  password: string = '';
  changed!: (value: string) => void;
  touched!: () => void;

  writeValue(value: string) {
    this.password = value;
  }

  registerOnChange(fn: any) {
    this.changed = fn;
  }

  registerOnTouched(fn: any) {
    this.touched = fn;
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.changeInputType();
    this.toggleImg();
  }

  private changeInputType() {
    this.passwordInput.nativeElement.type = this.isPasswordVisible ? 'text': 'password';
  }

  toggleImg(): void {
    this.iconSrc = this.isPasswordVisible ? '../../../../assets/img/crossed-eye.svg':  '../../../../assets/img/eye.svg';
  }
}
