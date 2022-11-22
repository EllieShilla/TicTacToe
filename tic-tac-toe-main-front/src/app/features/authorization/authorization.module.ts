import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './container/authorization.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthNavComponent } from './components/auth-nav/auth-nav.component';
import { SharedModule } from '../../shared/shared.module';
import { InitResetPasswordComponent } from './components/init-reset-password/init-reset-password.component';
import { ResetPasswordInstructionComponent } from './components/reset-password-instruction/reset-password-instruction.component';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';
import { CreateNewPasswordComponent } from './components/create-new-password/create-new-password.component';


@NgModule({
  declarations: [
    AuthorizationComponent,
    SignUpComponent,
    SignInComponent,
    AuthNavComponent,
    InitResetPasswordComponent,
    ResetPasswordInstructionComponent,
    ConfirmRegistrationComponent,
    CreateNewPasswordComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AuthorizationRoutingModule,
    SharedModule
  ]
})
export class AuthorizationModule { }
