import { Component } from '@angular/core';
import { RouterLinks } from '../../../../app.config';

@Component({
  selector: 'app-reset-password-instruction',
  templateUrl: './reset-password-instruction.component.html',
  styleUrls: ['./reset-password-instruction.component.scss']
})
export class ResetPasswordInstructionComponent {
  readonly routerLinks: typeof RouterLinks = RouterLinks;
}
