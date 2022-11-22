import { Component, OnInit } from '@angular/core';
import {
  RouterLinks
} from '../../../../app.config';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthorizationService } from '../../authorization.service';
import { InfoDialogComponent } from 'app/shared/components/modals/info-dialog/info-dialog.component';
import { take, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: [
    './sign-in.component.scss',
    '../../container/authorization.component.scss'
  ]
})
export class SignInComponent implements OnInit {
  readonly routerLinks: typeof RouterLinks = RouterLinks;
  signInForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authorizationService: AuthorizationService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  get email(): FormControl {
    return this.signInForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.signInForm.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.autoForm();
    // this.signInForm.valueChanges.subscribe(value => console.log(value))
  }
  get isResetPasswordPage(): boolean {
    return this.router.url.includes(RouterLinks.resetPass);
  }

  private autoForm(): void {
    this.signInForm = this.fb.group({
      email: [''],
      password: [''],
    })
  }

  signIn(): void {
      const requestBody = {...this.signInForm.value};
      delete requestBody.checkbox;
      this.authorizationService.signIn(requestBody).pipe(
        take(1),
      ).subscribe(() => this.confirmModalCall());
  }

  private confirmModalCall(): void {
    this.dialog.open(InfoDialogComponent, {
      hasBackdrop: false,
      data: {
        content: 'Entry confirmed',
        description: '',
        type: 'SUCCESS'
      }
    }).afterClosed().pipe(
      take(1),
      tap(() => this.router.navigate([ RouterLinks.authorization ]))
    ).subscribe()
  }
}
