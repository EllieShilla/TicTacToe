import { Component, OnInit } from '@angular/core';
import { PasswordInputTitle, PasswordRulesStartValue, RouterLinks } from '../../../../app.config';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, take, tap } from 'rxjs';
import { PASSWORD_VALIDATION_RULES } from '../../../../core/models/authorization.models';
import { validatePassword } from '../../../../shared/utils';
import { AuthorizationService } from '../../authorization.service';
import { InfoDialogComponent } from '../../../../shared/components/modals/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: [
    './create-new-password.component.scss',
    '../../container/authorization.component.scss'
  ]
})
export class CreateNewPasswordComponent implements OnInit {
  readonly passwordTitle: string = PasswordInputTitle.createNewPassword;

  createPasswordForm!: FormGroup;
  passwordSubscription$!: Observable<string>;

  isPasswordRulesValid: PASSWORD_VALIDATION_RULES = PasswordRulesStartValue;

  constructor(
    private fb: FormBuilder,
    private authorizationService: AuthorizationService,
    private dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.checkPassword();
  }

  onSubmit(): void {
    const { value } = this.createPasswordForm;
    if (this.createPasswordForm.valid) {
      this.authorizationService.createNewPassword(value).subscribe(() => this.confirmModalCall());
    } else {
      this.createPasswordForm.markAllAsTouched();
    }
  }

  private confirmModalCall(): void {
    this.dialog.open(InfoDialogComponent, {
      hasBackdrop: false,
      data: {
        content: 'Password successfully reseted',
        description: 'Please login',
        type: 'SUCCESS'
      }
    }).afterClosed().pipe(
      take(1),
      tap(() => this.router.navigate([ '/', RouterLinks.authorization, RouterLinks.signIn ]))
    ).subscribe()
  }

  private initForm(): void {
    this.createPasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      verificationCode: ['', [Validators.required]],
      email: ['', [Validators.required]]
    })
  }

  private checkPassword(): void {
    this.passwordSubscription$ = this.password.valueChanges.pipe(
      tap(value => this.isPasswordRulesValid = validatePassword(value)),
    );
  }

  get isEmailInvalid(): boolean {
    return this.email.touched && this.email.invalid;
  }

  get isCodeInvalid(): boolean {
    return this.verificationCode.touched && this.verificationCode.invalid;
  }

  get password(): FormControl {
    return this.createPasswordForm.get('password') as FormControl;
  }

  get email(): FormControl {
    return this.createPasswordForm.get('email') as FormControl;
  }

  get verificationCode(): FormControl {
    return this.createPasswordForm.get('verificationCode') as FormControl;
  }

  get isPasswordTouched(): boolean {
    return this.password.touched;
  }

  get isPasswordValid(): boolean {
    return this.password.valid;
  }
}
