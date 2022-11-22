import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { RouterLinks } from './app.config';
import { ResetPasswordInstructionComponent } from './features/authorization/components/reset-password-instruction/reset-password-instruction.component';
import {
  ConfirmRegistrationComponent
} from './features/authorization/components/confirm-registration/confirm-registration.component';
import {
  CreateNewPasswordComponent
} from './features/authorization/components/create-new-password/create-new-password.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RouterLinks.gameRoom
  },
  {
    path: RouterLinks.gameRoom,
    loadChildren: () => import('./features/game/game.module')
      .then(m => m.GameModule)
  },
  {
    path: RouterLinks.confirmReset,
    component: ResetPasswordInstructionComponent
  },
  {
    path: RouterLinks.createNewPassword,
    component: CreateNewPasswordComponent
  },
  {
    path: RouterLinks.confirmRegistration,
    component: ConfirmRegistrationComponent
  },
  {
    path: RouterLinks.termsAndConditions,
    loadChildren: () => import('./features/terms-and-conditions/terms-and-conditions.module')
      .then(m => m.TermsAndConditionsModule)
  },
  {
    path: RouterLinks.authorization,
    loadChildren: () => import('./features/authorization/authorization.module')
      .then(m => m.AuthorizationModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
