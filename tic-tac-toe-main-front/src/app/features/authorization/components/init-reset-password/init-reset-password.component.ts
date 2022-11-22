import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { AuthorizationService } from '../../authorization.service';
import { InfoDialogComponent } from '../../../../shared/components/modals/info-dialog/info-dialog.component';
import { RouterLinks } from '../../../../app.config';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './init-reset-password.component.html',
  styleUrls: ['./init-reset-password.component.scss']
})
export class InitResetPasswordComponent implements OnInit{
  email!: FormControl;

  constructor(
    private authorizationService: AuthorizationService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initEmailControl();
  }

  onResetPasswordClick(): void {
    if (this.email.valid) {
      this.authorizationService.initResetPassword(this.email.value).pipe(
        take(1)
      ).subscribe(() => this.confirmModalCall());
    } else {
      this.email.markAsTouched();
    }
  }

  private confirmModalCall(): void {
    this.dialog.open(InfoDialogComponent, {
      hasBackdrop: false,
      data: {
        content: 'We successfully received your data and sent data for reset password',
        description: 'Please go to your email to reset password',
        type: 'SUCCESS'
      }
    }).afterClosed().pipe(
      tap(() => this.router.navigate([ RouterLinks.confirmReset ])),
      take(1),
    ).subscribe()
  }

  private initEmailControl() {
    this.email = new FormControl('', [Validators.required]);
  }

  get isEmailInvalid(): boolean {
    return this.email.touched && this.email.invalid;
  }
}
