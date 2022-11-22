import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterLinks } from '../../../../app.config';
import { Router } from '@angular/router';
import { DialogWindowService } from '../../../../features/dialog-window/dialog-window.service';

@Component({
  selector: 'app-save-score',
  templateUrl: './save-score.component.html',
  styleUrls: ['./save-score.component.scss']
})
export class SaveScoreComponent {
  readonly routerLinks: typeof RouterLinks = RouterLinks;
  readonly routerConfig = {
    signIn: ['/', RouterLinks.authorization, RouterLinks.signIn],
    signUp: ['/', RouterLinks.authorization, RouterLinks.signUp]
  }

  constructor(
    public dialogRef: MatDialogRef<SaveScoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dialogService: DialogWindowService
  ) { }

  onSignUp(): void {
    this.dialogService.isRedirectToSignUp = true;
    this.router.navigate(this.routerConfig.signUp);
  }

  onSignIn(): void {
    this.dialogService.isRedirectToSignIn = true;
    this.router.navigate(this.routerConfig.signIn);
  }
}
